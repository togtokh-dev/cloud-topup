export type ChargeTemplateT = {
  charge_field_name: string;
  alias: string;
  placeholder: string;
  sortord: number;
  type: "options" | "text";
  options: {
    id: number;
    name: string;
    parent_id: number;
  }[];
};
export type ItemT = {
  id: string;
  product_id: string;
  name: string;
  face_value: number;
  item_type: "Direct charging" | "Card code";
  price: number;
  currency: "MNT";
  active: boolean;
  stock: boolean;
  charge_template: ChargeTemplateT[];
};
export type ProductT = {
  id: string;
  name: string;
  group: string;
  region: string[];
  active: boolean;
  type: "Direct charging" | "Card code";
};
export type GroupT = {
  id: string;
  name: string;
};
export type RegionT = {
  id: string;
  name: string;
  image: string;
};
export interface ProductAddItemT extends ProductT {
  items: ItemT[];
}
export type CardT = {
  card_no: string;
  card_pwd: string;
  card_deadline: string;
};
export type OrderT = {
  id: string;
  order_id: string;
  user_order_id: string;
  status:
    | "created"
    | "paid"
    | "pending"
    | "success"
    | "failed"
    | "refund"
    | "payment-failed";
  item_id: string;
  buy_num: number;
  amount: number;
  payment_id: string;
  refund_id: string | null;
  failed_desc: string | null;
  callback: string;
  callback_log: string | null;
  order_info: Record<string, unknown>;
  created_date: string | null;
  _created_date: string | null;
  paid_date: string | null;
  _paid_date: string | null;
  pending_date: string | null;
  _pending_date: string | null;
  success_date: string | null;
  _success_date: string | null;
  failed_date: string | null;
  _failed_date: string | null;
  refund_date: string | null;
  _refund_date: string | null;
  cards: CardT[];
};
export type AccountT = {
  DEFAULT: {
    balance: number;
  };
  NONE_TAX: {
    balance: number;
  };
};
