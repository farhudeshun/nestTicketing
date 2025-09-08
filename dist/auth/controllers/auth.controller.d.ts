import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dto/register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        id: number;
        email?: string;
        phone?: string;
        state: import("@ngn-net/giftcard-shared").userState;
        userid: string;
        fullName: string;
        roles: import("../../users/entities/role.entity").Role[];
        department: import("../../departments/entities/department.entity").Department;
        createdTickets: import("../../tickets/entities/ticket.entity").Ticket[];
        assignedTickets: import("../../tickets/entities/ticket.entity").Ticket[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(req: any): Promise<{
        access_token: string;
    }>;
}
