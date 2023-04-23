import { StringLiteral } from 'typescript';

export interface Student {
  id?: string;
  name: string;
  age: number;
  mark: number;
  gender: 'male' | 'female';
  city: StringLiteral;
  createdAt?: number;
  updatedAt?: number;
}
