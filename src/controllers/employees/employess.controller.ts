// src/controllers/employees.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EmployeesService } from './../../service/employees/employees.service';
import {
  Employee,
  CreateEmployeeDto,
} from './../../interfaces/employees/CreateEmployeesDto.interfaces';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  // Listar todos os funcionários
  @Get()
  async findAll(): Promise<Employee[]> {
    return this.employeesService.findAll();
  }

  // Buscar funcionário por ID
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Employee | null> {
    return this.employeesService.findById(id);
  }

  // Buscar todos os funcionários de uma empresa
  @Get('company/:company_id')
  async findByCompany(
    @Param('company_id') company_id: string,
  ): Promise<Employee[]> {
    return this.employeesService.findByCompany(company_id);
  }

  // Criar novo funcionário
  @Post()
  async create(@Body() employee: CreateEmployeeDto): Promise<Employee> {
    return this.employeesService.create(employee);
  }

  // Atualizar funcionário
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updates: Partial<CreateEmployeeDto>,
  ): Promise<Employee | null> {
    return this.employeesService.update(id, updates);
  }

  // Deletar funcionário
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.employeesService.delete(id);
  }
}
