import CoffeeForm from '@/components/shared/CoffeeForm';
import { auth } from '@clerk/nextjs/server';

const CreateCoffee = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover ">
        <h3 className="wrapper h3-bold text-center sm:text-left text-primary">
          Create Coffee
        </h3>
      </section>
      <div className="wrapper my-8">
        <CoffeeForm userId={userId} type="Create" />
      </div>
    </>
  );
};

export default CreateCoffee;
