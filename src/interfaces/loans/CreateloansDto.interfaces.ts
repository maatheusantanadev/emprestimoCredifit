export interface Loan {
  id: string;
  employee_id: string;
  amount: number;
  installments: number;
  status: 'aprovado' | 'rejeitado' | 'pendente';
  score: number;
  created_at?: string;
}

export interface CreateLoanDto {
  employee_id: string;
  amount: number;
  installments: number;
  status: 'aprovado' | 'rejeitado' | 'pendente';
  score: number;
}
