'use server';
import {
  CreateCoffeeParams,
  DeleteCoffeeParams,
  GetAllCoffeeParams,
  GetRelatedCoffeeByCategoryParams,
  UpdateCoffeeParams,
} from '@/types';
import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import Category from '../database/models/category.model';
import Coffee from '../database/models/coffee.model';
import User from '../database/models/user.model';
import { revalidatePath } from 'next/cache';

const popularCoffee = async (query: any) => {
  return query
    .populate({
      path: 'organizer',
      model: User,
      select: '_id firstName lastName',
    })
    .populate({
      path: 'category',
      model: Category,
      select: '_id name',
    });
};

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: 'i' } });
};

export const createCoffee = async ({
  coffee,
  userId,
  path,
}: CreateCoffeeParams) => {
  try {
    await connectToDatabase();
    const organizer = await User.findById(userId);
    if (!organizer) {
      throw new Error('Organizer not found');
    }

    const newCoffee = await Coffee.create({
      ...coffee,
      category: coffee.categoryId,
      organizer: userId,
    });
    revalidatePath(path);
    return JSON.parse(JSON.stringify(newCoffee));
  } catch (error) {
    handleError(error);
  }
};

export const getCoffeeById = async (coffeeId: string) => {
  try {
    await connectToDatabase();
    const coffee = await popularCoffee(Coffee.findById(coffeeId));
    if (!coffee) {
      throw new Error('Coffee not found');
    }
    return JSON.parse(JSON.stringify(coffee));
  } catch (error) {
    handleError(error);
  }
};

//GET ALL COFFEE
export const getAllCoffee = async ({
  query,
  limit = 6,
  page,
  category,
}: GetAllCoffeeParams) => {
  try {
    await connectToDatabase();
    const titleCondition = query
      ? { title: { $regex: query, $options: 'i' } }
      : {};
    const categoryCondition = category
      ? await getCategoryByName(category)
      : null;
    const conditions = {
      $and: [
        titleCondition,
        categoryCondition ? { category: categoryCondition._id } : {},
      ],
    };
    const skipAmount = (Number(page) - 1) * limit;
    const coffeeQuery = Coffee.find(conditions)
      .sort({ createAt: 'desc' })
      .skip(0)
      .limit(limit);
    const coffee = await popularCoffee(coffeeQuery);
    const coffeeCount = await Coffee.countDocuments(conditions);
    return {
      data: JSON.parse(JSON.stringify(coffee)),
      totalPages: Math.ceil(coffeeCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
};
// DELETE
export const deleteCoffee = async ({ coffeeId, path }: DeleteCoffeeParams) => {
  try {
    await connectToDatabase();
    const deleteCoffee = await Coffee.findByIdAndDelete(coffeeId);
    if (!deleteCoffee) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
};

// UPDATE
export async function updateCoffee({
  userId,
  coffee,
  path,
}: UpdateCoffeeParams) {
  try {
    await connectToDatabase();

    const coffeeToUpdate = await Coffee.findById(coffee._id);
    if (!coffeeToUpdate || coffeeToUpdate.organizer.toHexString() !== userId) {
      throw new Error('Unauthorized or coffee not found');
    }

    const updatedCoffee = await Coffee.findByIdAndUpdate(
      coffee._id,
      { ...coffee, category: coffee.categoryId },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedCoffee));
  } catch (error) {
    handleError(error);
  }
}

export async function getRelatedCoffeeByCategory({
  categoryId,
  coffeeId,
  limit = 3,
  page = 1,
}: GetRelatedCoffeeByCategoryParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = {
      $and: [{ category: categoryId }, { _id: { $ne: coffeeId } }],
    };

    const coffeeQuery = Coffee.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit);

    const coffee = await popularCoffee(coffeeQuery);
    const coffeeCount = await Coffee.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(coffee)),
      totalPages: Math.ceil(coffeeCount / limit),
    };
  } catch (error) {
    console.error('Error fetching related coffee:', error);
    throw new Error('Unable to fetch related coffee');
  }
}
