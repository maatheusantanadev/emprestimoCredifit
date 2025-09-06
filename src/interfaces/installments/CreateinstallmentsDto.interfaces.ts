export interface Installment {
  id: string;
  loan_id: string;
  installment_number: number;
  due_date: string;
  amount: number;
  paid: boolean;
  created_at?: string;
}

export interface CreateInstallmentDto {
  loan_id: string;
  installment_number: number;
  due_date: string;
  amount: number;
}
