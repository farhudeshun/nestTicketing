import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
export declare class UsersService {
    private userModel;
    constructor(userModel: typeof User);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<[number, User[]]>;
    remove(id: string): Promise<void>;
}
