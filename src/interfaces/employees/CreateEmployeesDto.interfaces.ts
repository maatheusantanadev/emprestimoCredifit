export interface CreateEmployeeDto {
  company_id: string;
  full_name: string;
  cpf: string;
  email: string;
  password: string;
  salary: number;
}

export interface Employee {
  id: string;
  company_id: string;
  full_name: string;
  cpf: string;
  email: string;
  salary: number;
  created_at: Date;
}
