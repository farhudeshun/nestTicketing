import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dto/register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        id: string;
        email: string;
        name: string;
        role: import("../../users/entities/user.entity").UserRoleEnum;
        departmentId: string;
        department: import("../../departments/entities/department.entity").Department;
        createdTickets: import("../../tickets/entities/ticket.entity").Ticket[];
        assignedTickets: import("../../tickets/entities/ticket.entity").Ticket[];
        messages: import("../../messages/entities/message.entity").Message[];
        roles: import("../../users/entities/role.entity").Role[];
        createdAt: Date;
        updatedAt: Date;
        deletedAt?: Date | any;
        version?: number | any;
        _attributes: import("../../users/entities/user.entity").User;
        dataValues: import("../../users/entities/user.entity").User;
        _creationAttributes: import("../../users/entities/user.entity").User;
        isNewRecord: boolean;
        sequelize: import("sequelize").Sequelize;
        _model: import("sequelize").Model<import("../../users/entities/user.entity").User, import("../../users/entities/user.entity").User>;
    }>;
    login(req: any): Promise<{
        access_token: string;
    }>;
}
