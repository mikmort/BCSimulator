import Dexie from 'dexie';
import type { Table } from 'dexie';

export interface Customer {
  id?: number;
  no: number;
  name: string;
  locationCode: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  phoneNumber?: string;
  mobilePhoneNumber?: string;
  email?: string;
  homePage?: string;
  creditLimit?: number;
  contact?: string;
}

class AppDB extends Dexie {
  customers!: Table<Customer, number>;

  constructor() {
    super('AppDB');
    this.version(1).stores({
      customers:
        '++id,no,name,locationCode,address,city,state,zipCode,country,' +
        'phoneNumber,mobilePhoneNumber,email,homePage,creditLimit,contact',
    });
  }
}

export const db = new AppDB();
