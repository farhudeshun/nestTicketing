"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_entity_1 = require("../entities/user.entity");
let UsersService = class UsersService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(createUserDto) {
        return this.userModel.create(createUserDto);
    }
    async findAll() {
        return this.userModel.findAll();
    }
    async findOne(id) {
        return this.userModel.findByPk(id);
    }
    async findByEmail(email) {
        return this.userModel.findOne({ where: { email } });
    }
    async update(id, updateUserDto) {
        return this.userModel.update(updateUserDto, {
            where: { id },
            returning: true,
        });
    }
    async remove(id) {
        const user = await this.findOne(id);
        await user.destroy();
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_entity_1.User)),
    __metadata("design:paramtypes", [Object])
], UsersService);
//# sourceMappingURL=users.service.js.map