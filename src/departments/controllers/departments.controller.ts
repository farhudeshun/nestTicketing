import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DepartmentsService } from '../services/departments.service';
import { CreateDepartmentDto } from '../dto/create-department.dto';
import { UpdateDepartmentDto } from '../dto/update-department.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
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
  @ApiResponse({
    status: 201,
    description: 'The department has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all departments' })
  @ApiResponse({ status: 200, description: 'Returns all departments.' })
  findAll() {
    return this.departmentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a department by ID' })
  @ApiResponse({ status: 200, description: 'Returns the department.' })
  @ApiResponse({ status: 404, description: 'Department not found.' })
  findOne(@Param('id') id: string) {
    return this.departmentsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRoleEnum.SUPERADMIN)
  @ApiOperation({ summary: 'Update a department by ID (Superadmin only)' })
  @ApiResponse({
    status: 200,
    description: 'The department has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Department not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  update(
    @Param('id') id: string,
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
  })
  @ApiResponse({ status: 404, description: 'Department not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string) {
    return this.departmentsService.remove(id);
  }
}
