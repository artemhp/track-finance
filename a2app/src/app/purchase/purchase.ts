export class Purchase {
  constructor(
    public name: string,
    public price: number,    
    public date: string,
    public shop: string,
    public user: string,
    public category: string,
    public photo?: string,
  ) {
      
  }
}