import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { InstallmentsRepository } from 'src/repository/installments/installments.repository';
import { CreateInstallmentDto } from 'src/interfaces/installments/CreateinstallmentsDto.interfaces';

@Controller('installments')
export class InstallmentsController {
  constructor(private readonly installmentsRepo: InstallmentsRepository) {}

  @Get()
  async findAll() {
    return this.installmentsRepo.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.installmentsRepo.findById(id);
  }

  @Get('loan/:loanId')
  async findByLoanId(@Param('loanId') loanId: string) {
    return this.installmentsRepo.findByLoanId(loanId);
  }

  @Post()
  async create(@Body() body: CreateInstallmentDto) {
    return this.installmentsRepo.create(body);
  }

  @Patch(':id/pay')
  async markAsPaid(@Param('id') id: string) {
    return this.installmentsRepo.markAsPaid(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.installmentsRepo.delete(id);
  }
}
