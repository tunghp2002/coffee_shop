import CategoryFilter from '@/components/shared/CategoryFilter';
import Collection from '@/components/shared/Collection';
import Search from '@/components/shared/Search';
import { Button } from '@/components/ui/button';
import { getAllCoffee } from '@/lib/actions/coffee.actions';
import { SearchParamProps } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';

  const coffee = await getAllCoffee({
    query: searchText,
    category: category,
    page: page,
    limit: 6,
  });

  return (
    <main>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h2-bold text-primary">Discover the best coffee</h1>
            <p className="p-regular-20 md:p-regular-24">
              Taste Coffee is a coffee shop that provides you with quality
              coffee that helps boost your productivity and helps build your
              mood. Having a cup of coffee is good, but having a cup of real
              coffee is greater. There is no doubt that you will enjoy this
              coffee more than others you have ever tasted.
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#coffee">Order Now</Link>
            </Button>
          </div>
          <Image
            src="assets/images/hero.svg"
            alt="logo"
            width={1000}
            height={1000}
            className="max-h[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>
      <section
        id="coffee"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">
          Trust by <br /> Thousands of Customers{' '}
        </h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>
        <Collection
          data={coffee?.data}
          emptyTitle="No Coffee Found"
          emptyStateSubtext="Come back later"
          limit={6}
          page={1}
          totalPages={coffee?.totalPages}
        />
      </section>
    </main>
  );
}
