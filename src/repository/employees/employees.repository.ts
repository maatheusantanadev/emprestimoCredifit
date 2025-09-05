// src/repository/employees.repository.ts
import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import {
  Employee,
  CreateEmployeeDto,
} from 'src/interfaces/employees/CreateEmployeesDto.interfaces';

@Injectable()
export class EmployeesRepository {
  constructor(@Inject('SUPABASE_CLIENT') private supabase: SupabaseClient) {}

  async findAll(): Promise<Employee[]> {
    const { data, error } = await this.supabase
      .from('employees')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data ?? []) as Employee[];
  }

  async findById(id: string): Promise<Employee | null> {
    const { data, error }: { data: Employee | null; error: any } =
      await this.supabase.from('employees').select('*').eq('id', id).single();

    if (error) {
      if (error === 'PGRST116') return null; // registro não encontrado
      throw error;
    }
    return (data ?? null) as Employee;
  }

  async findByCompany(company_id: string): Promise<Employee[]> {
    const { data, error } = await this.supabase
      .from('employees')
      .select('*')
      .eq('company_id', company_id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data ?? []) as Employee[];
  }

  async create(employee: CreateEmployeeDto): Promise<Employee> {
    const { data, error }: { data: Employee | null; error: any } =
      await this.supabase
        .from('employees')
        .insert([employee])
        .select()
        .single();

    if (error) throw error;
    return (data ?? null) as Employee;
  }

  async update(
    id: string,
    updates: Partial<CreateEmployeeDto>,
  ): Promise<Employee | null> {
    const { data, error }: { data: Employee | null; error: any } =
      await this.supabase
        .from('employees')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
      if (error === 'PGRST116') return null;
      throw error;
    }
    return (data ?? null) as Employee;
  }

  async delete(id: string): Promise<{ message: string }> {
    const { error } = await this.supabase
      .from('employees')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { message: 'Funcionário deletado com sucesso' };
  }
}
