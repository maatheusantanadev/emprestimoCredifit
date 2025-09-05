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
import { EmployeesRepository } from 'src/repository/employees/employees.repository';
import {
  Employee,
  CreateEmployeeDto,
} from 'src/interfaces/employees/CreateEmployeesDto.interfaces';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesRepository: EmployeesRepository) {}

  // Listar todos os funcionários
  @Get()
  async findAll(): Promise<Employee[]> {
    return this.employeesRepository.findAll();
  }

  // Buscar funcionário por ID
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Employee | null> {
    return this.employeesRepository.findById(id);
  }

  // Buscar todos os funcionários de uma empresa
  @Get('company/:company_id')
  async findByCompany(
    @Param('company_id') company_id: string,
  ): Promise<Employee[]> {
    return this.employeesRepository.findByCompany(company_id);
  }

  // Criar novo funcionário
  @Post()
  async create(@Body() employee: CreateEmployeeDto): Promise<Employee> {
    return this.employeesRepository.create(employee);
  }

  // Atualizar funcionário
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updates: Partial<CreateEmployeeDto>,
  ): Promise<Employee | null> {
    return this.employeesRepository.update(id, updates);
  }

  // Deletar funcionário
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.employeesRepository.delete(id);
  }
}
