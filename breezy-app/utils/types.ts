import { Key } from 'react';

export interface invoiceFields {
  _id: Key;
  fullName: String;
  phoneNumber: Number;
  email: String;
  clientFullName: String;
  clientAddress: String;
  clientPhoneNumber: Number | null;
  clientEmail: String;
  purchaseOrderNumber: Number;
  description: String;
  rate: Number;
  date: Date;
  paid: Boolean;
  address: String;
}

export interface Params {
  params: {
    id: String;
  };
}

export interface dateFormatted {
  date: {
    year: String;
    month: String;
    day: String;
    hour: String;
    minute: String;
    seconds: String;
  }
}
