import CoffeeDetails from '@/components/shared/CoffeeDetails';
import {
  getCoffeeById,
  getRelatedCoffeeByCategory,
} from '@/lib/actions/coffee.actions';
import { SearchParamProps } from '@/types';

const CoffeeDetailsPage = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const coffee = await getCoffeeById(id);
  const relatedCoffee = await getRelatedCoffeeByCategory({
    categoryId: coffee.category._id,
    coffeeId: coffee._id,
    page: searchParams.page as string,
  });

  return <CoffeeDetails coffee={coffee} relatedCoffee={relatedCoffee} />;
};

export default CoffeeDetailsPage;
