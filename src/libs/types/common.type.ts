import { ReactNode } from 'react';

export interface IOption {
  label: string;
  value: string;
  render?: ReactNode;
}
