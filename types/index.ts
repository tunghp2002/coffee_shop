// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

// ====== COFFEE PARAMS
export type CreateCoffeeParams = {
  userId: string;
  coffee: {
    title: string;
    description: string;
    imageUrl: string;
    categoryId: string;
    price: string;
  };
  path: string;
};

export type UpdateCoffeeParams = {
  userId: string;
  coffee: {
    _id: string;
    title: string;
    imageUrl: string;
    description: string;
    categoryId: string;
    price: string;
  };
  path: string;
};

export type DeleteCoffeeParams = {
  coffeeId: string;
  path: string;
};

export type GetAllCoffeeParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
};

export type GetCoffeeByUserParams = {
  userId: string;
  limit?: number;
  page: number;
};

export type GetRelatedCoffeeByCategoryParams = {
  categoryId: string;
  coffeeId: string;
  limit?: number;
  page: number | string;
};

export type Coffee = {
  _id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  organizer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  category: {
    _id: string;
    name: string;
  };
};

// ====== CATEGORY PARAMS
export type CreateCategoryParams = {
  categoryName: string;
};

// ====== ORDER PARAMS
export type CheckoutOrderParams = {
  coffeeTitle: string;
  coffeeId: string;
  price: string;
  quantity: string;
  buyerId: string;
};

export type CreateOrderParams = {
  stripeId: string;
  coffeeId: string[];
  buyerId: string;
  totalAmount: string;
  createdAt: Date;
};

export type GetOrdersByCoffeeParams = {
  coffeeId: string;
  searchString: string;
};

export type GetOrdersByUserParams = {
  userId: string | null;
  limit?: number;
  page: string | number | null;
};

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
