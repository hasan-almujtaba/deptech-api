type Item = {
  productId: number;
  quantity: number;
};

export type TTransactionRequestBody = {
  type: "STOCK_IN" | "STOCK_OUT";
  items: Item[];
};
