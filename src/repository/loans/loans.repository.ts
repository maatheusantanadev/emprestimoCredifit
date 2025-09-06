// src/repository/loans/loans.repository.ts
import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import {
  Loan,
  CreateLoanDto,
} from 'src/interfaces/loans/CreateloansDto.interfaces';

@Injectable()
export class LoansRepository {
  constructor(@Inject('SUPABASE_CLIENT') private supabase: SupabaseClient) {}

  async findAll(): Promise<Loan[]> {
    const { data, error } = await this.supabase
      .from('loans')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data ?? []) as Loan[];
  }

  async findById(id: string): Promise<Loan | null> {
    const { data, error }: { data: Loan | null; error: any } =
      await this.supabase.from('loans').select('*').eq('id', id).single();

    if (error) {
      if (error === 'PGRST116') return null;
      throw error;
    }
    return data;
  }

  async findByEmployeeId(employee_id: string): Promise<Loan[]> {
    const { data, error } = await this.supabase
      .from('loans')
      .select('*')
      .eq('employee_id', employee_id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data ?? []) as Loan[];
  }

  async create(dto: CreateLoanDto): Promise<Loan> {
    const { data, error }: { data: Loan | null; error: any } =
      await this.supabase.from('loans').insert([dto]).select().single();

    if (error) throw error;
    return data!;
  }

  async updateStatus(
    id: string,
    status: 'aprovado' | 'rejeitado' | 'pendente',
  ): Promise<Loan | null> {
    const { data, error }: { data: Loan | null; error: any } =
      await this.supabase
        .from('loans')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

    if (error) {
      if (error === 'PGRST116') return null;
      throw error;
    }
    return data;
  }

  async delete(id: string): Promise<{ message: string }> {
    const { error } = await this.supabase.from('loans').delete().eq('id', id);

    if (error) throw error;
    return { message: 'Empréstimo deletado com sucesso' };
  }
}
