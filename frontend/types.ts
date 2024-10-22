export type User = {
    _id: string;
    email: string;
    name: string;
    addressLine1: string;
    city: string;
    country: string;
  };
  
  export type MenuItem = {
    _id: string;
    name: string;
    price: number;
  };
  
  export type Restraunt = {
    _id: string;
    user: string;
    restrauntName: string;
    city: string;
    country: string;
    deliveryPrice: number;
    estimatedDeliveryTime: number;
    cuisines: string[];
    menuItems: MenuItem[];
    imageUrl: string;
    lastUpdated: string;
  };
  
  export type OrderStatus =
    | "placed"
    | "paid"
    | "inProgress"
    | "outForDelivery"
    | "delivered";
  
  export type Order = {
    _id: string;
    restraunt: Restraunt;
    user: User;
    cartItems: {
      menuItemId: string;
      name: string;
      quantity: string;
    }[];
    deliveryDetails: {
      name: string;
      addressLine1: string;
      city: string;
      email: string;
    };
    totalAmount: number;
    status: OrderStatus;
    createdAt: string;
    restrauntId: string;
  };
  
  export type RestrauntSearchResponse = {
    data: Restraunt[];
    pagination: {
      total: number;
      page: number;
      pages: number;
    };
  };