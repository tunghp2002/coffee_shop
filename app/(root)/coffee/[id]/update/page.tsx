import CoffeeForm from '@/components/shared/CoffeeForm';
import { getCoffeeById } from '@/lib/actions/coffee.actions';
import { auth } from '@clerk/nextjs/server';

type UpdateEventProps = {
  params: {
    id: string;
  };
};

const UpdateCoffee = async ({ params: { id } }: UpdateCoffeeProps) => {
  const { sessionClaims } = await auth();

  const userId = sessionClaims?.userId as string;
  const coffee = await getCoffeeById(id);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Update Event
        </h3>
      </section>

      <div className="wrapper my-8">
        <CoffeeForm
          userId={userId}
          type="Update"
          coffee={coffee}
          coffeeId={coffee._id}
        />
      </div>
    </>
  );
};

export default UpdateCoffee;
