import { User } from '../../users/entities/user.entity';
import { Department } from '../../departments/entities/department.entity';
import { Message } from '../../messages/entities/message.entity';
export declare enum TicketStatus {
    OPEN = "open",
    IN_PROGRESS = "in-progress",
    CLOSED = "closed",
    CANCELED_BY_USER = "canceled by user"
}
export declare enum TicketPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high"
}
export declare class Ticket {
    id: number;
    title: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
    assignedDate: Date;
    createBy: User;
    assignTo: User;
    department: Department;
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
}
