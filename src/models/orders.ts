export class Order {
  id: string;
  items: Object;
  totalAmount: number;
  date: Date;
  constructor(id: string, items: Object, totalAmount: number, date: Date) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }
}
