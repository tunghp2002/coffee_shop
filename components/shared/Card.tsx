'use client';
import { useState } from 'react';
import { ICoffee } from '@/lib/database/models/coffee.model';
import Link from 'next/link';
import { Button } from '../ui/button';
import IconPlusCircle from '@/public/assets/icons/IconPlusCircle';
import IconBxsEditAlt from '@/public/assets/icons/IconBxsEditAlt';
import { DeleteConfirmation } from './DeleteConfirmation';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import IconHeart from '@/public/assets/icons/IconHeart';
import IconHeartFill from '@/public/assets/icons/IconHeartFill';
import { useUser } from '@clerk/clerk-react';

type CardProps = {  
  coffee: ICoffee;
};

const Card = ({ coffee }: CardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const words = coffee.title.split(' ');
  const firstWord = words.shift();
  const remainingWords = words.join(' ');

  const { isLoaded, user } = useUser();
  const userId =
    user && user.publicMetadata ? user.publicMetadata.userId : null;
  const isCoffeeCreator =
    isLoaded && userId === coffee.organizer._id.toString();

  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(coffee));
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    setIsLiked((prev) => !prev);
  };

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link
        href={`/coffee/${coffee._id}`}
        style={{ backgroundImage: `url(${coffee.imageUrl})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-gray-500"
      />
      {isCoffeeCreator && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/coffee/${coffee._id}/update`}>
            <IconBxsEditAlt width={20} height={20} className="text-primary" />
          </Link>
          <DeleteConfirmation coffeeId={coffee._id} />
        </div>
      )}
      <Link
        href={`/coffee/${coffee._id}`}
        className="flex min-h-[200px] flex-col gap-3 p-5 md:gap-4"
      >
        <div className="mb-2">
          <span className="p-bold-20">{firstWord}</span>
          <span className="block p-bold-16">{remainingWords}</span>
        </div>
        <div className="flex gap-2 justify-between items-center">
          <span className="p-semibold-18 rounded-full bg-gray-100 px-4 py-3 text-primary ">
            {coffee.price} VND
          </span>
        </div>
      </Link>
      <Button
        className="rounded-full px-3 gap-2 w-2/5 absolute right-5 bottom-14"
        onClick={handleAddToCart}
      >
        <IconPlusCircle width={20} height={20} />
        Add to Cart
      </Button>
      <div
        className="absolute right-8 bottom-36 cursor-pointer"
        onClick={handleLikeClick}
      >
        {isLiked ? (
          <IconHeartFill
            width={30}
            height={30}
            className="text-primary transition-transform ease-in-out duration-300 transform scale-110"
          />
        ) : (
          <IconHeart
            width={30}
            height={30}
            className="text-primary transition-transform ease-in-out duration-300"
          />
        )}
      </div>
    </div>
  );
};

export default Card;
