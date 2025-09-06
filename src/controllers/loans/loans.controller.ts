import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateLoanDto } from 'src/interfaces/loans/CreateloansDto.interfaces';
import { LoansService } from 'src/service/loans/loans.service';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Get()
  async findAll() {
    return this.loansService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.loansService.findById(id);
  }

  @Get('employee/:employeeId')
  async findByEmployeeId(@Param('employeeId') employeeId: string) {
    return this.loansService.findByEmployeeId(employeeId);
  }

  @Post()
  async create(@Body() body: CreateLoanDto) {
    return this.loansService.create(body);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'aprovado' | 'rejeitado' | 'pendente',
  ) {
    return this.loansService.updateStatus(id, status);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.loansService.delete(id);
  }
}
