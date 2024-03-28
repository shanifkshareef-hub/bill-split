export interface Resp<T> {
  status: boolean | number;
  message?: string;
  numberOfRecords?: number;
  data?: T;
}

export interface IExpense {
  id: string;
  name: string;
  createdAt: string;
  orders: IOrder[];
  participants: IParticipant[];
}

export interface IOrder {
  id: string;
  name: string;
  amount: number;
  expenseType: IExpense;
  expenseTypeId: string;
  createdAt: string;
}

export interface IParticipant {
  id: string;
  name: string;
  amount: number;
  expenseType: IExpense;
  expenseTypeId: string;
  createdAt: string;
}

export namespace ExpenseForm {
  export interface Create {
    name: string;
  }
}

export namespace OrderForm {
  export interface Create {
    name: string;
    amount: number;
    expenseTypeId: string;
  }
}

export namespace ParticipantForm {
  export interface Create {
    name: string;
    expenseTypeId: string;
  }
}

export interface CreateForm<T> {
  isOpen: boolean;
  callback(): void;
  selected?: T;
  toggleModal(): void;
}
