"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchUserAuditDto = exports.AddUserDto = void 0;
const types_1 = require("../../libs/types");
class AddUserDto {
    id;
    userid;
    firstName;
    lastName;
    email;
    phone;
    username;
    status;
    source;
    createdAt;
    updatedAt;
}
exports.AddUserDto = AddUserDto;
class SearchUserAuditDto extends types_1.SearchAuditDto {
}
exports.SearchUserAuditDto = SearchUserAuditDto;
//# sourceMappingURL=user.dto.js.map