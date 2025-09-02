export declare class BloomFilter {
    private bitArray;
    private size;
    private totalElements;
    private hashFunctions;
    constructor(size: number, hashFunctions: ((input: string) => number)[]);
    private falsePositiveProbability;
    private hash;
    getFalsePositiveP(): void;
    add(input: string): void;
    has(input: string): boolean;
}
export declare class TimeBasedStackedBloomFilter {
    private layers;
    private hashFunctions;
    private layerSize;
    private ttl;
    private stackTtl;
    constructor(options: {
        layerSize: number;
        ttl?: number;
        filterCount: number;
    }, hashFunctions: ((input: string) => number)[]);
    add(input: string): void;
    has(input: string): boolean;
}
