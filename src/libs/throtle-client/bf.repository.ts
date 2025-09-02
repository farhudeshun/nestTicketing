import { randomUUID } from 'crypto';

export class BloomFilter {
  private bitArray: Uint8Array;
  private size: number;
  private totalElements: number = 0;
  private hashFunctions: ((input: string) => number)[];

  constructor(size: number, hashFunctions: ((input: string) => number)[]) {
    this.size = size;
    this.bitArray = new Uint8Array(size);
    this.hashFunctions = [...hashFunctions, murmurHash3, djb2];
  }

  private falsePositiveProbability(n: number): number {
    const exponent = (-this.hashFunctions.length * n) / this.size;
    const probability = Math.pow(
      1 - Math.exp(exponent),
      this.hashFunctions.length,
    );
    return probability;
  }

  private hash(input: string): number[] {
    return this.hashFunctions.map((fn) => fn(input) % this.size);
  }

  getFalsePositiveP() {
    const fpProbability = this.falsePositiveProbability(this.totalElements);
    console.log(`False positive probability: ${fpProbability * 100}%`);
  }

  add(input: string): void {
    const hashValues = this.hash(input);
    for (const hash of hashValues) {
      this.bitArray[hash] = 1;
    }
    ++this.totalElements;
  }

  has(input: string): boolean {
    const hashValues = this.hash(input);
    for (const hash of hashValues) {
      if (this.bitArray[hash] === 0) {
        return false;
      }
    }
    return true;
  }
}

const murmurHash3 = (input: string, seed = 0): number => {
  let h1 = seed;
  const remainder = input.length & 3; // input.length % 4
  const bytes = input.length - remainder;

  for (let i = 0; i < bytes; i += 4) {
    let k1 =
      (input.charCodeAt(i) & 0xff) |
      ((input.charCodeAt(i + 1) & 0xff) << 8) |
      ((input.charCodeAt(i + 2) & 0xff) << 16) |
      ((input.charCodeAt(i + 3) & 0xff) << 24);

    k1 =
      (k1 & 0xffff) * 0xcc9e2d51 +
      ((((k1 >>> 16) * 0xcc9e2d51) & 0xffff) << 16);
    k1 = (k1 << 15) | (k1 >>> 17);
    k1 =
      (k1 & 0xffff) * 0x1b873593 +
      ((((k1 >>> 16) * 0x1b873593) & 0xffff) << 16);

    h1 ^= k1;
    h1 = (h1 << 13) | (h1 >>> 19);
    const h1b = (h1 & 0xffff) * 5 + ((((h1 >>> 16) * 5) & 0xffff) << 16);
    h1 = (h1b & 0xffff) + 0x6b64 + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16);
  }

  let k1 = 0;
  switch (remainder) {
    case 3:
      k1 ^= (input.charCodeAt(bytes + 2) & 0xff) << 16;
    case 2:
      k1 ^= (input.charCodeAt(bytes + 1) & 0xff) << 8;
    case 1:
      k1 ^= input.charCodeAt(bytes) & 0xff;
      k1 =
        (k1 & 0xffff) * 0xcc9e2d51 +
        ((((k1 >>> 16) * 0xcc9e2d51) & 0xffff) << 16);
      k1 = (k1 << 15) | (k1 >>> 17);
      k1 =
        (k1 & 0xffff) * 0x1b873593 +
        ((((k1 >>> 16) * 0x1b873593) & 0xffff) << 16);
      h1 ^= k1;
  }

  h1 ^= input.length;
  h1 ^= h1 >>> 16;
  h1 =
    (h1 & 0xffff) * 0x85ebca6b + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16);
  h1 ^= h1 >>> 13;
  h1 =
    (h1 & 0xffff) * 0xc2b2ae35 + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16);
  h1 ^= h1 >>> 16;

  return h1 >>> 0;
};

const djb2 = (input: string): number => {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) + hash + input.charCodeAt(i); // hash * 33 + c
  }
  return hash >>> 0; // Ensure unsigned 32-bit integer
};

class StackedBloomFilter {
  private layers: BloomFilter[];
  private layerSize: number;
  private maxLayers: number;
  private hashFunctions: ((input: string) => number)[];

  constructor(
    layerSize: number,
    maxLayers: number,
    hashFunctions: ((input: string) => number)[],
  ) {
    this.layerSize = layerSize;
    this.maxLayers = maxLayers;
    this.hashFunctions = hashFunctions;
    this.layers = [new BloomFilter(1000, hashFunctions)];
  }

  add(input: string): void {
    const currentLayer = this.layers[this.layers.length - 1];
    currentLayer.add(input);
  }

  has(input: string): boolean {
    for (const layer of this.layers) {
      if (layer.has(input)) {
        return true;
      }
    }
    return false;
  }

  rotateLayer(): void {
    if (this.layers.length >= this.maxLayers) {
      this.layers.shift(); // Remove the oldest layer
    }
    this.layers.push(new BloomFilter(this.layerSize, this.hashFunctions));
  }
}

export class TimeBasedStackedBloomFilter {
  private layers: { filter: BloomFilter; ts: number }[];
  private hashFunctions: ((input: string) => number)[];
  private layerSize: number;
  private ttl: number;
  private stackTtl: number;

  constructor(
    options: { layerSize: number; ttl?: number; filterCount: number },
    hashFunctions: ((input: string) => number)[],
  ) {
    this.layerSize = options.layerSize;
    this.ttl = options.ttl || 2 * 60000;
    this.hashFunctions = hashFunctions;
    this.stackTtl = this.ttl / options.filterCount;
    this.layers = [
      {
        ts: new Date().getTime(),
        filter: new BloomFilter(this.layerSize, hashFunctions),
      },
    ];
  }

  add(input: string): void {
    const now = new Date().getTime();
    let currentLayer = this.layers[this.layers.length - 1];
    if (now - currentLayer.ts > this.stackTtl) {
      currentLayer = {
        ts: new Date().getTime(),
        filter: new BloomFilter(this.layerSize, this.hashFunctions),
      };
      this.layers.push(currentLayer);
    }
    currentLayer.filter.add(input);
  }

  has(input: string): boolean {
    const now = new Date().getTime();
    for (const layer of this.layers) {
      if (now - layer.ts > this.ttl + this.stackTtl) {
        // removing expired filters
        this.layers.shift();
        continue;
      }
      if (layer.filter.has(input)) return true;
    }
    return false;
  }
}

const layerSize = 100;
const maxLayers = 3;

const filter = new BloomFilter(100000, []);

for (let index = 0; index < 500; index++) {
  const uuid = randomUUID();
  filter.add(uuid);
  filter.add(uuid.split('').reverse().join(''));
}
filter.getFalsePositiveP();
