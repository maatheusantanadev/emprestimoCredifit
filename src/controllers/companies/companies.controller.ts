// src/controllers/companies/companies.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  Company,
  CreateCompanyDto,
} from './../../interfaces/companies/CreateCompanyDto.interfaces';
import { CompaniesService } from './../../service/companies/companies.service';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  async getAll(): Promise<Company[]> {
    try {
      return await this.companiesService.findAll();
    } catch (err) {
      throw new HttpException(
        {
          message: 'Erro ao buscar empresas',
          details: (err as Error).message,
        },
        500,
      );
    }
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Company> {
    return this.companiesService.findById(id);
  }

  @Post()
  async create(@Body() body: CreateCompanyDto): Promise<Company> {
    return this.companiesService.create(body);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: Partial<CreateCompanyDto>,
  ): Promise<Company> {
    return this.companiesService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.companiesService.delete(id);
  }
}
