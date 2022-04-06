export interface ClientInterface {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: AdressInterface;
    birthDate: string;
    __v: number;
  }
  
  interface AdressInterface {
    city: string;
    zipCode: string;
    street: string;
    district: string;
    complement: string;
  }