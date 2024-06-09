'use client';
import Link from 'next/link';
import Image from 'next/image';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import { Button } from '../ui/button';
import NavItems from './NavItems';
import MobileNav from './MobileNav';
import CartIcon from '@/public/assets/icons/IconCart';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const Header = () => {
  const { isSignedIn, user } = useUser();
  const cart = useSelector((state: RootState) => state.cart);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="w-full border-b sticky top-0 z-50 bg-white">
      <div className="wrapper flex items-center justify-between">
        <Link href={'/'} className="w-36">
          <Image
            src="/assets/images/logo.svg"
            width={128}
            height={38}
            alt="logo"
          />
        </Link>

        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs">
            <NavItems />
          </nav>
        </SignedIn>

        <div className="flex w-32 justify-end gap-3 items-center">
          <SignedIn>
            {isSignedIn && user && (
              <Link href={`/cart/${user.id}`} className="relative mr-3">
                <CartIcon width={35} height={35} />
                <div className="absolute -top-2 -right-1 bg-primary rounded-full px-2 text-white">
                  {cartCount > 0 ? cartCount : 0}
                </div>
              </Link>
            )}
            <UserButton afterSignOutUrl="/" />
            <MobileNav />
          </SignedIn>
          <SignedOut>
            <Button asChild className="rounded-full size-lg px-6">
              <Link href={'/sign-in'}>Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
