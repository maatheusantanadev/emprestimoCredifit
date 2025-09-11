import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { LoansRepository } from './../../repository/loans/loans.repository';
import { EmployeesRepository } from './../../repository/employees/employees.repository';
import { CreateLoanDto } from './../../interfaces/loans/CreateloansDto.interfaces';

@Injectable()
export class LoansService {
  constructor(
    private readonly loansRepo: LoansRepository,
    private readonly employeesRepo: EmployeesRepository,
  ) {}

  async findAll() {
    return this.loansRepo.findAll();
  }

  async findById(id: string) {
    const loan = await this.loansRepo.findById(id);
    if (!loan) throw new NotFoundException('Empréstimo não encontrado');
    return loan;
  }

  async findByEmployeeId(employeeId: string) {
    return this.loansRepo.findByEmployeeId(employeeId);
  }

  async create(dto: CreateLoanDto) {
    // validação: número de parcelas entre 1 e 4
    if (dto.installments < 1 || dto.installments > 4) {
      throw new BadRequestException(
        'O número de parcelas deve estar entre 1 e 4',
      );
    }

    // validação: funcionário deve existir
    const employee = await this.employeesRepo.findById(dto.employee_id);
    if (!employee) {
      throw new BadRequestException('Funcionário não encontrado');
    }

    return this.loansRepo.create(dto);
  }

  async updateStatus(
    id: string,
    status: 'aprovado' | 'rejeitado' | 'pendente',
  ) {
    return this.loansRepo.updateStatus(id, status);
  }

  async delete(id: string) {
    return this.loansRepo.delete(id);
  }
}
