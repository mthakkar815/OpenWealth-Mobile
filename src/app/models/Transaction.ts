import { Asset } from "@models/Asset";

export interface Transaction {
  id: string;
  asset: Asset;
  type: string;
  amount: number;
  date: string
}
