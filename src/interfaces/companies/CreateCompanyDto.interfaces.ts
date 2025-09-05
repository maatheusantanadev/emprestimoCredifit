export interface CreateCompanyDto {
  cnpj: string;
  corporate_name: string;
  representative_name: string;
  representative_cpf: string;
  email: string;
  password: string; // já deve vir criptografada
}

export interface Company {
  id: string;
  cnpj: string;
  corporate_name: string;
  representative_name: string;
  representative_cpf: string;
  email: string;
  password: string;
  created_at: Date; // ou Date se preferir
}
