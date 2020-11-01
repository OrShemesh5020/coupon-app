export class Coupon {
  constructor(
    public companyName: string,
    public categoryName: string,
    public title: string,
    public description: string,
    public startDate: string,
    public endDate: string,
    public amount: number,
    public price: number,
    public image: string,
    public id?: number
    ) {}
  }

  // public startDate: Date,
