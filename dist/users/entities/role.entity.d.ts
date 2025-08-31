import { Model } from 'sequelize-typescript';
import { User } from './user.entity';
export declare class Role extends Model<Role> {
    id: string;
    name: string;
    users: User[];
}
