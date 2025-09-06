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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { UserRoleEnum } from '../entities/user.entity';

@UseGuards(UserGuard)
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    type: CreateUserDto,
    examples: {
      example1: {
        summary: 'A sample user',
        value: {
          name: 'Sabi',
          email: 'sabi@example.com',
          password: 'Password123',
          role: 'ADMIN',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of all users',
    // example array of users
    schema: {
      example: [
        {
          id: 'uuid-1',
          name: 'Sabi',
          email: 'sabi@example.com',
          role: 'ADMIN',
          createdAt: '2025-09-06T10:00:00.000Z',
          updatedAt: '2025-09-06T10:00:00.000Z',
        },
      ],
    },
  })
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({
    status: 200,
    description: 'User found',
    schema: {
      example: {
        id: 'uuid-1',
        name: 'Sabi',
        email: 'sabi@example.com',
        role: 'ADMIN',
        createdAt: '2025-09-06T10:00:00.000Z',
        updatedAt: '2025-09-06T10:00:00.000Z',
      },
    },
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Update user' })
  @ApiBody({
    type: UpdateUserDto,
    examples: {
      example1: {
        summary: 'Update user info',
        value: {
          name: 'Sabi Updated',
          email: 'sabi.updated@example.com',
          password: 'NewPass123',
          role: UserRoleEnum.SUPERADMIN,
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
