export declare class SystemEventDto {
    title: string;
    timestamp: number;
}
export declare class SystemEventResponseDto extends SystemEventDto {
    index: number;
    isValid: boolean;
}
export declare class SearchSystemEventDto {
    title?: string;
    readonly dateFrom?: string;
    readonly dateTo?: string;
    sortOrder?: 'asc' | 'desc';
    sortBy?: 'timestamp' | 'title';
    offset?: number;
    limit?: number;
}
