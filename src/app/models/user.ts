import { Injectable } from '@angular/core';
import { SendToken } from '../service/interseptors/send-token';

@Injectable({
  providedIn: 'root',
})
export class User {
  constructor(
    public id: number,
    public email: string,
    public password: string,
    public clientType: ClientType,
    public token?: string,
    // public expirationDate: Date
  ) {}
}

export enum ClientType {
  ADMINISTRATOR = 'ADMINISTRATOR',
  COMPANY = 'COMPANY',
  CUSTOMER = 'CUSTOMER',
}

