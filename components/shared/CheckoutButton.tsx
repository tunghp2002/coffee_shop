import { CartItem } from '@/lib/database/models/coffee.model';
import { SignedOut, SignedIn, useUser } from '@clerk/nextjs';
import { Button } from '../ui/button';
import Checkout from './Checkout';
import Link from 'next/link';

const CheckoutButton = ({ cart }: { cart: CartItem }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;

  return (
    <div className="flex items-center gap-3 w-full mt-6">
      <SignedOut>
        <Button asChild className="rounded-md" size="lg">
          <Link href="/sign-in">Get Coffee</Link>
        </Button>
      </SignedOut>
      <SignedIn>
        <Checkout cart={cart} userId={userId} />
      </SignedIn>
    </div>
  );
};

export default CheckoutButton;
