export type CheckoutPackage = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  regularPrice?: number;
  currency: string;
  features: string[];
};
