export interface WithdrawItem {
  item_count_day: number;
  delay_day: number;
  first_percent: number;
  second_percent: number;
}

export interface WithdrawItemResponse {
  withdraw: WithdrawItem;
}
