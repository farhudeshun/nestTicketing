import { Model } from 'sequelize-typescript';
export declare enum AuditResultType {
    SUCCESSFUL = "SUCCESSFUL",
    FAILED = "FAILED"
}
export declare class SecurityLog extends Model<SecurityLog> {
    id: number;
    title: string;
    eventResult: AuditResultType;
    userId: string;
    username: string;
    ipAddress: string;
    agent: string;
    isVisibleToUser: boolean;
    timestamp: Date;
    index: number;
}
