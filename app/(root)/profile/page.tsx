import Collection from '@/components/shared/Collection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const ProfilePage = () => {
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">
            My Favourite Coffee
          </h3>
          <Button asChild className="button hidden sm:flex">
            <Link href="/#coffee">Explore more coffee</Link>
          </Button>
        </div>
      </section>
      {/* <section className='wrapper my-8'>
      <Collection
          data={coffee?.data}
          emptyTitle="No Coffee Favourite"
          emptyStateSubtext="Come back later"
          collectionType="My_Favourite"
          limit={3}
          page={1}
          totalPages={2}
        />
      </section> */}
    </>
  );
};

export default ProfilePage;
