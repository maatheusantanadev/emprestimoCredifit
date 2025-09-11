import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

import {
  Company,
  CreateCompanyDto,
} from './../../interfaces/companies/CreateCompanyDto.interfaces';

@Injectable()
export class CompaniesRepository {
  constructor(@Inject('SUPABASE_CLIENT') private supabase: SupabaseClient) {}

  async findAll(): Promise<Company[]> {
    const { data, error } = await this.supabase
      .from('companies')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data ?? []) as Company[];
  }

  async findById(id: string): Promise<Company | null> {
    const { data, error }: { data: Company | null; error: any } =
      await this.supabase.from('companies').select('*').eq('id', id).single();

    if (error) {
      if (error === 'PGRST116') return null; // registro não encontrado
      throw error;
    }
    return (data ?? []) as Company;
  }

  async create(company: CreateCompanyDto): Promise<Company> {
    const { data, error }: { data: Company | null; error: any } =
      await this.supabase.from('companies').insert([company]).select().single();

    if (error) throw error;
    return (data ?? []) as Company;
  }

  async update(
    id: string,
    updates: Partial<CreateCompanyDto>,
  ): Promise<Company | null> {
    const { data, error }: { data: Company | null; error: any } =
      await this.supabase
        .from('companies')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
      if (error === 'PGRST116') return null;
      throw error;
    }
    return (data ?? []) as Company;
  }

  async delete(id: string): Promise<{ message: string }> {
    const { error } = await this.supabase
      .from('companies')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { message: 'Empresa deletada com sucesso' };
  }
}
