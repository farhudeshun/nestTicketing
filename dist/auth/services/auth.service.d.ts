import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/users.service';
import { RegisterDto } from '../dto/register.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
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
}
