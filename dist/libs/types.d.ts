export type ActionType = 'CREATE' | 'EDIT' | 'DELETE' | 'RESTORE' | 'PERMANENT_DELETE';
export declare const ActionTypeItems: string[];
export declare const getRoutingKeys: () => {
    security_audit: string;
    security_setting: string;
    system_event: string;
    user_audit: string;
    provider_audit: string;
    purchase_audit: string;
};
export declare class SearchAuditDto {
    offset?: number;
    limit?: number;
    readonly dateFrom?: string;
    readonly dateTo?: string;
    id?: number;
    name?: string;
    userId?: number;
}
