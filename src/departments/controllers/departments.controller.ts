import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { DepartmentsService } from '../services/departments.service';
import { CreateDepartmentDto } from '../dto/create-department.dto';
import { UpdateDepartmentDto } from '../dto/update-department.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { UserGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRoleEnum } from '../../users/entities/user.entity';

@ApiTags('Departments')
@ApiBearerAuth()
@UseGuards(UserGuard, RolesGuard)
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  @Roles(UserRoleEnum.SUPERADMIN)
  @ApiOperation({ summary: 'Create a new department (Superadmin only)' })
  @ApiBody({
    type: CreateDepartmentDto,
    examples: {
      example1: {
        summary: 'Sample department creation',
        value: { name: 'Office' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The department has been successfully created.',
    schema: {
      example: {
        id: 1,
        name: 'Office',
        createdAt: '2025-09-06T10:00:00.000Z',
        updatedAt: '2025-09-06T10:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all departments' })
  @ApiResponse({
    status: 200,
    description: 'Returns all departments.',
    schema: {
      example: [
        {
          id: 1,
          name: 'Office',
          createdAt: '2025-09-06T10:00:00.000Z',
          updatedAt: '2025-09-06T10:00:00.000Z',
        },
        {
          id: 2,
          name: 'HR',
          createdAt: '2025-09-06T10:05:00.000Z',
          updatedAt: '2025-09-06T10:05:00.000Z',
        },
      ],
    },
  })
  findAll() {
    return this.departmentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a department by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the department.',
    schema: {
      example: {
        id: 1,
        name: 'Office',
        createdAt: '2025-09-06T10:00:00.000Z',
        updatedAt: '2025-09-06T10:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Department not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.departmentsService.findById(id);
  }

  @Patch(':id')
  @Roles(UserRoleEnum.SUPERADMIN)
  @ApiOperation({ summary: 'Update a department by ID (Superadmin only)' })
  @ApiBody({
    type: UpdateDepartmentDto,
    examples: {
      example1: {
        summary: 'Update department name',
        value: { name: 'New Office Name' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The department has been successfully updated.',
    schema: {
      example: {
        id: 1,
        name: 'New Office Name',
        createdAt: '2025-09-06T10:00:00.000Z',
        updatedAt: '2025-09-06T11:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Department not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentsService.update(id, updateDepartmentDto);
  }

  @Delete(':id')
  @Roles(UserRoleEnum.SUPERADMIN)
  @ApiOperation({ summary: 'Delete a department by ID (Superadmin only)' })
  @ApiResponse({
    status: 200,
    description: 'The department has been successfully deleted.',
    schema: {
      example: {
        id: 1,
        name: 'Office',
        createdAt: '2025-09-06T10:00:00.000Z',
        updatedAt: '2025-09-06T10:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Department not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.departmentsService.remove(id);
  }
}
