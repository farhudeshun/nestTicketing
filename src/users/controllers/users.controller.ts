import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserGuard } from 'src/libs/auth.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@UseGuards(UserGuard)
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Create a new user' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get all users' })
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get user by ID' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Update user' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Delete user' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
