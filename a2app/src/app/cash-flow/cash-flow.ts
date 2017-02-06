export class CashFlow {
  constructor(
    public type: string,
    public amount: number,
    public currency: string,
    public category: string,
    public date: string
  ) { }
}
