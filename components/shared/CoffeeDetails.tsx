'use client';

import { ICoffee } from '@/lib/database/models/coffee.model';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Collection from '@/components/shared/Collection';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';

type CoffeeDetailsProps = {
  coffee: ICoffee;
  relatedCoffee: { data: ICoffee[] };
};

const CoffeeDetails = ({ coffee, relatedCoffee }: CoffeeDetailsProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(coffee));
  };

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <Image
            src={coffee.imageUrl}
            alt="Detail image"
            width={1000}
            height={1000}
            className="h-full min-h-[300px] object-cover object-center"
          />
          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className="h5-bold">{coffee.title}</h2>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                    {coffee.category.name}
                  </p>
                </div>
              </div>
              <div className="h6-bold ">About</div>
              <div className="p-regular-20">{coffee.description}</div>
              <Button className="rounded-full" onClick={handleAddToCart}>
                Add to cart | {coffee.price} VND
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Related Coffee</h2>
        <Collection
          data={relatedCoffee.data}
          emptyTitle="No Coffee Found"
          emptyStateSubtext="Come back later"
          limit={6}
          page={1}
          totalPages={2}
        />
      </section>
    </>
  );
};

export default CoffeeDetails;
