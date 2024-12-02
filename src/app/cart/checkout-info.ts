export const LOCAL_STORAGE_CHECKOUT_KEY = 'e-shop-checkout-info';

export type CheckoutInfo = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: DeliveryAddress;
  payment: 'cash' | 'credit_card';
  email?: string;
  creditCard?: CreditCard;
}

export type DeliveryAddress = {
  city: string;
  street: string;
  zip: string;
  additionalInfo?: string;
}

export type CreditCard = {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
}
