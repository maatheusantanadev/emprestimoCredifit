import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  Company,
  CreateCompanyDto,
} from 'src/interfaces/companies/CreateCompanyDto.interfaces';

import { CompaniesRepository } from 'src/repository/companies/companies.repository';
import { PostgrestError } from '@supabase/supabase-js';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesRepo: CompaniesRepository) {}

  @Get()
  async getAll(): Promise<Company[]> {
    try {
      return await this.companiesRepo.findAll();
    } catch (error: unknown) {
      const supabaseError = error as PostgrestError;

      throw new HttpException(
        {
          message: 'Erro ao buscar empresas',
          details: supabaseError?.message ?? 'Erro desconhecido',
          code: supabaseError?.code,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Company> {
    try {
      const company = await this.companiesRepo.findById(id);
      if (!company) {
        throw new HttpException('Empresa não encontrada', HttpStatus.NOT_FOUND);
      }
      return company;
    } catch (error: unknown) {
      const supabaseError = error as PostgrestError;

      throw new HttpException(
        {
          message: 'Erro ao buscar empresas',
          details: supabaseError?.message ?? 'Erro desconhecido',
          code: supabaseError?.code,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async create(@Body() body: CreateCompanyDto): Promise<Company> {
    try {
      return await this.companiesRepo.create(body);
    } catch (error: unknown) {
      const supabaseError = error as PostgrestError;

      throw new HttpException(
        {
          message: 'Erro ao criar empresas',
          details: supabaseError?.message ?? 'Erro desconhecido',
          code: supabaseError?.code,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: Partial<CreateCompanyDto>,
  ): Promise<Company> {
    try {
      const company = await this.companiesRepo.update(id, body);
      if (!company) {
        throw new HttpException('Empresa não encontrada', HttpStatus.NOT_FOUND);
      }
      return company;
    } catch (error: unknown) {
      const supabaseError = error as PostgrestError;

      throw new HttpException(
        {
          message: 'Erro ao atualizar empresa',
          details: supabaseError?.message ?? 'Erro desconhecido',
          code: supabaseError?.code,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    try {
      return await this.companiesRepo.delete(id);
    } catch (error: unknown) {
      const supabaseError = error as PostgrestError;

      throw new HttpException(
        {
          message: 'Erro ao deletar empresa',
          details: supabaseError?.message ?? 'Erro desconhecido',
          code: supabaseError?.code,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
