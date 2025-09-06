import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { InstallmentsService } from 'src/service/installments/installments.service';
import { CreateInstallmentDto } from 'src/interfaces/installments/CreateinstallmentsDto.interfaces';

@Controller('installments')
export class InstallmentsController {
  constructor(private readonly installmentsService: InstallmentsService) {}

  @Get()
  async findAll() {
    return this.installmentsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.installmentsService.findById(id);
  }

  @Get('loan/:loanId')
  async findByLoanId(@Param('loanId') loanId: string) {
    return this.installmentsService.findByLoanId(loanId);
  }

  @Post()
  async create(@Body() body: CreateInstallmentDto) {
    return this.installmentsService.create(body);
  }

  @Patch(':id/pay')
  async markAsPaid(@Param('id') id: string) {
    return this.installmentsService.markAsPaid(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.installmentsService.delete(id);
  }
}
