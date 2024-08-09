export default interface IProduct {
  id?: string,
  name: string,
  picture?: string,
  basePrice: number,
  stock: number,
  discountPercentage: number,
  categories?: string[],
  description?: string,
  urlName?: string
}
