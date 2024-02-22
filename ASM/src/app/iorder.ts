import { ICart } from "./icart";

export interface IOrder {
    id: string;
    customer_name: string;
    customer_address: string;
    customer_email: string;
    customer_phone_number: string;
    status: string;
    createdAt: Date;
    products: ICart[];
  }