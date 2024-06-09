'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { coffeeFormSchema } from '@/lib/validator';
import { coffeeDefaultValues } from '@/constants';
import Dropdown from './Dropdown';
import { Textarea } from '../ui/textarea';
import { useUploadThing } from '@/lib/uploadthing';
import { useState } from 'react';
import IconMoneyDollarCircleLine from '@/public/assets/icons/IconMoneyDollarCircleLine';
import { useRouter } from 'next/navigation';
import { createCoffee, updateCoffee } from '@/lib/actions/coffee.actions';
import { FileUploader } from './FileUploader';
import { ICoffee } from '@/lib/database/models/coffee.model';

type CoffeeFormProps = {
  userId: string;
  type: 'Create' | 'Update';
  coffee?: ICoffee;
  coffeeId?: string;
};

const CoffeeForm = ({ userId, type, coffee, coffeeId }: CoffeeFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const initialValues =
    coffee && type === 'Update' ? { ...coffee } : coffeeDefaultValues;

  const router = useRouter();
  const { startUpload } = useUploadThing('imageUploader');

  const form = useForm<z.infer<typeof coffeeFormSchema>>({
    resolver: zodResolver(coffeeFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof coffeeFormSchema>) {
    console.log(values);
    let uploadedImageUrl = values.imageUrl;
    if (files.length > 0) {
      const uploadedImages = await startUpload(files);
      if (!uploadedImages) {
        return;
      }
      uploadedImageUrl = uploadedImages[0].url;
    }
    if (type === 'Create') {
      try {
        const newCoffee = await createCoffee({
          coffee: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: '/profile',
        });
        if (newCoffee) {
          form.reset();
          router.push(`/coffee/${newCoffee._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === 'Update') {
      if (!coffeeId) {
        router.back();
        return;
      }
      try {
        const updatedCoffee = await updateCoffee({
          userId,
          coffee: { ...values, imageUrl: uploadedImageUrl, _id: coffeeId },
          path: `/coffee/${coffeeId}`,
        });
        if (updatedCoffee) {
          form.reset();
          router.push(`/coffee/${updatedCoffee._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Coffee Title"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea
                    placeholder="Description"
                    {...field}
                    className="text-area rounded-2xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <IconMoneyDollarCircleLine height={24} width={24} />
                    <Input
                      type="number"
                      min={0}
                      step={1000}
                      placeholder="Price"
                      {...field}
                      className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? 'Submitting...' : `${type} Coffee `}
        </Button>
      </form>
    </Form>
  );
};

export default CoffeeForm;
