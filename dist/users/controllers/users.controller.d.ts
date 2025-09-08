import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("../entities/user.entity").User>;
    findAll(): Promise<import("../entities/user.entity").User[]>;
    findOne(id: number): Promise<import("../entities/user.entity").User | null>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<import("../entities/user.entity").User>;
    remove(id: number): Promise<void>;
}
