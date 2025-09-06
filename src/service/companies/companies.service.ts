// src/service/companies.service.ts
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CompaniesRepository } from 'src/repository/companies/companies.repository';
import {
  Company,
  CreateCompanyDto,
} from 'src/interfaces/companies/CreateCompanyDto.interfaces';

@Injectable()
export class CompaniesService {
  constructor(private readonly companiesRepo: CompaniesRepository) {}

  async findAll(): Promise<Company[]> {
    return this.companiesRepo.findAll();
  }

  async findById(id: string): Promise<Company> {
    const company = await this.companiesRepo.findById(id);
    if (!company) throw new NotFoundException('Empresa não encontrada');
    return company;
  }

  async create(dto: CreateCompanyDto): Promise<Company> {
    // Exemplo de validação: não permitir nomes duplicados
    const all = await this.companiesRepo.findAll();
    if (all.some((c) => c.corporate_name === dto.corporate_name)) {
      throw new BadRequestException('Já existe uma empresa com esse nome');
    }
    return this.companiesRepo.create(dto);
  }

  async update(
    id: string,
    updates: Partial<CreateCompanyDto>,
  ): Promise<Company> {
    const company = await this.companiesRepo.update(id, updates);
    if (!company) throw new NotFoundException('Empresa não encontrada');
    return company;
  }

  async delete(id: string): Promise<{ message: string }> {
    await this.findById(id); // valida se existe
    return this.companiesRepo.delete(id);
  }
}
