import Dexie from 'dexie';
import type { Table } from 'dexie';

export interface Customer {
  id?: number;
  no: number;
  name: string;
  locationCode: string;
  phoneNumber: string;
  contact: string;
}

class AppDB extends Dexie {
  customers!: Table<Customer, number>;

  constructor() {
    super('AppDB');
    this.version(1).stores({
      customers: '++id,no,name,locationCode,phoneNumber,contact',
    });
  }
}

export const db = new AppDB();
