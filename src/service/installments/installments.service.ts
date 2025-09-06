import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InstallmentsRepository } from 'src/repository/installments/installments.repository';
import {
  Installment,
  CreateInstallmentDto,
} from 'src/interfaces/installments/CreateinstallmentsDto.interfaces';

@Injectable()
export class InstallmentsService {
  constructor(private readonly installmentsRepo: InstallmentsRepository) {}

  async findAll(): Promise<Installment[]> {
    return this.installmentsRepo.findAll();
  }

  async findById(id: string): Promise<Installment> {
    const installment = await this.installmentsRepo.findById(id);
    if (!installment) {
      throw new NotFoundException('Parcela não encontrada');
    }
    return installment;
  }

  async findByLoanId(loanId: string): Promise<Installment[]> {
    return this.installmentsRepo.findByLoanId(loanId);
  }

  async create(dto: CreateInstallmentDto): Promise<Installment> {
    // validações básicas
    if (!dto.loan_id) {
      throw new BadRequestException('O campo loan_id é obrigatório');
    }
    if (dto.amount <= 0) {
      throw new BadRequestException(
        'O valor da parcela deve ser maior que zero',
      );
    }
    if (!dto.due_date) {
      throw new BadRequestException('A data de vencimento é obrigatória');
    }

    return this.installmentsRepo.create(dto);
  }

  async markAsPaid(id: string): Promise<Installment> {
    const updated = await this.installmentsRepo.markAsPaid(id);
    if (!updated) {
      throw new NotFoundException('Parcela não encontrada para pagamento');
    }
    return updated;
  }

  async delete(id: string): Promise<{ message: string }> {
    const installment = await this.findById(id);
    if (!installment) {
      throw new NotFoundException('Parcela não encontrada para exclusão');
    }
    return this.installmentsRepo.delete(id);
  }
}
