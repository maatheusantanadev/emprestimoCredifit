// src/services/employees/employees.service.ts
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { EmployeesRepository } from 'src/repository/employees/employees.repository';
import {
  Employee,
  CreateEmployeeDto,
} from 'src/interfaces/employees/CreateEmployeesDto.interfaces';

@Injectable()
export class EmployeesService {
  constructor(private readonly employeesRepository: EmployeesRepository) {}

  async findAll(): Promise<Employee[]> {
    return this.employeesRepository.findAll();
  }

  async findById(id: string): Promise<Employee> {
    const employee = await this.employeesRepository.findById(id);
    if (!employee) {
      throw new NotFoundException('Funcionário não encontrado');
    }
    return employee;
  }

  async findByCompany(company_id: string): Promise<Employee[]> {
    const employees = await this.employeesRepository.findByCompany(company_id);
    if (!employees || employees.length === 0) {
      throw new NotFoundException(
        'Nenhum funcionário encontrado para esta empresa',
      );
    }
    return employees;
  }

  async create(employee: CreateEmployeeDto): Promise<Employee> {
    // validações básicas de exemplo
    if (!employee.full_name || !employee.email) {
      throw new BadRequestException(
        'Nome e e-mail do funcionário são obrigatórios',
      );
    }

    return this.employeesRepository.create(employee);
  }

  async update(
    id: string,
    updates: Partial<CreateEmployeeDto>,
  ): Promise<Employee> {
    const updated = await this.employeesRepository.update(id, updates);
    if (!updated) {
      throw new NotFoundException('Funcionário não encontrado para atualizar');
    }
    return updated;
  }

  async delete(id: string): Promise<{ message: string }> {
    // garantir que o funcionário exista antes de deletar
    const employee = await this.employeesRepository.findById(id);
    if (!employee) {
      throw new NotFoundException('Funcionário não encontrado para exclusão');
    }

    return this.employeesRepository.delete(id);
  }
}
