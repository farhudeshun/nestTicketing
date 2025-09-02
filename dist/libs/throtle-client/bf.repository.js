"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeBasedStackedBloomFilter = exports.BloomFilter = void 0;
const crypto_1 = require("crypto");
class BloomFilter {
    bitArray;
    size;
    totalElements = 0;
    hashFunctions;
    constructor(size, hashFunctions) {
        this.size = size;
        this.bitArray = new Uint8Array(size);
        this.hashFunctions = [...hashFunctions, murmurHash3, djb2];
    }
    falsePositiveProbability(n) {
        const exponent = (-this.hashFunctions.length * n) / this.size;
        const probability = Math.pow(1 - Math.exp(exponent), this.hashFunctions.length);
        return probability;
    }
    hash(input) {
        return this.hashFunctions.map((fn) => fn(input) % this.size);
    }
    getFalsePositiveP() {
        const fpProbability = this.falsePositiveProbability(this.totalElements);
        console.log(`False positive probability: ${fpProbability * 100}%`);
    }
    add(input) {
        const hashValues = this.hash(input);
        for (const hash of hashValues) {
            this.bitArray[hash] = 1;
        }
        ++this.totalElements;
    }
    has(input) {
        const hashValues = this.hash(input);
        for (const hash of hashValues) {
            if (this.bitArray[hash] === 0) {
                return false;
            }
        }
        return true;
    }
}
exports.BloomFilter = BloomFilter;
const murmurHash3 = (input, seed = 0) => {
    let h1 = seed;
    const remainder = input.length & 3;
    const bytes = input.length - remainder;
    for (let i = 0; i < bytes; i += 4) {
        let k1 = (input.charCodeAt(i) & 0xff) |
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
const djb2 = (input) => {
    let hash = 5381;
    for (let i = 0; i < input.length; i++) {
        hash = (hash << 5) + hash + input.charCodeAt(i);
    }
    return hash >>> 0;
};
class StackedBloomFilter {
    layers;
    layerSize;
    maxLayers;
    hashFunctions;
    constructor(layerSize, maxLayers, hashFunctions) {
        this.layerSize = layerSize;
        this.maxLayers = maxLayers;
        this.hashFunctions = hashFunctions;
        this.layers = [new BloomFilter(1000, hashFunctions)];
    }
    add(input) {
        const currentLayer = this.layers[this.layers.length - 1];
        currentLayer.add(input);
    }
    has(input) {
        for (const layer of this.layers) {
            if (layer.has(input)) {
                return true;
            }
        }
        return false;
    }
    rotateLayer() {
        if (this.layers.length >= this.maxLayers) {
            this.layers.shift();
        }
        this.layers.push(new BloomFilter(this.layerSize, this.hashFunctions));
    }
}
class TimeBasedStackedBloomFilter {
    layers;
    hashFunctions;
    layerSize;
    ttl;
    stackTtl;
    constructor(options, hashFunctions) {
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
    add(input) {
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
    has(input) {
        const now = new Date().getTime();
        for (const layer of this.layers) {
            if (now - layer.ts > this.ttl + this.stackTtl) {
                this.layers.shift();
                continue;
            }
            if (layer.filter.has(input))
                return true;
        }
        return false;
    }
}
exports.TimeBasedStackedBloomFilter = TimeBasedStackedBloomFilter;
const layerSize = 100;
const maxLayers = 3;
const filter = new BloomFilter(100000, []);
for (let index = 0; index < 500; index++) {
    const uuid = (0, crypto_1.randomUUID)();
    filter.add(uuid);
    filter.add(uuid.split('').reverse().join(''));
}
filter.getFalsePositiveP();
//# sourceMappingURL=bf.repository.js.map