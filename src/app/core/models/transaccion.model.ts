export type TipoTransaccion = 'income' | 'expense';

export interface Transaccion {
  id?: string;
  type: TipoTransaccion;
  category: string;
  amount: number;
  date: string;
  description?: string;
  image?: string; 
}

export interface User {
  uid: string;
  email: string;
  password?: string;
  name: string;
}

export interface ResumenFinanciero {
  saldoActual: number;
  totalIngresos: number;
  totalGastos: number;
}