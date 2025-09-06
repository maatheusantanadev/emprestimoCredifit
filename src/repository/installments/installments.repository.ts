import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import {
  Installment,
  CreateInstallmentDto,
} from 'src/interfaces/installments/CreateinstallmentsDto.interfaces';
@Injectable()
export class InstallmentsRepository {
  constructor(@Inject('SUPABASE_CLIENT') private supabase: SupabaseClient) {}

  async findAll(): Promise<Installment[]> {
    const { data, error } = await this.supabase
      .from('installments')
      .select('*')
      .order('due_date', { ascending: true });

    if (error) throw error;
    return (data ?? []) as Installment[];
  }

  async findById(id: string): Promise<Installment | null> {
    const { data, error }: { data: Installment | null; error: any } =
      await this.supabase
        .from('installments')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
      if (error === 'PGRST116') return null; // registro não encontrado
      throw error;
    }
    return data;
  }

  async findByLoanId(loan_id: string): Promise<Installment[]> {
    const { data, error } = await this.supabase
      .from('installments')
      .select('*')
      .eq('loan_id', loan_id)
      .order('installment_number', { ascending: true });

    if (error) throw error;
    return (data ?? []) as Installment[];
  }

  async create(dto: CreateInstallmentDto): Promise<Installment> {
    const { data, error }: { data: Installment | null; error: any } =
      await this.supabase.from('installments').insert([dto]).select().single();

    if (error) throw error;
    return data!;
  }

  async markAsPaid(id: string): Promise<Installment | null> {
    const { data, error }: { data: Installment | null; error: any } =
      await this.supabase
        .from('installments')
        .update({ paid: true })
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
    const { error } = await this.supabase
      .from('installments')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { message: 'Parcela deletada com sucesso' };
  }
}
