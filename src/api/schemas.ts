import { z } from "zod";
import { parseIngredients, parseInstructions, parseTags } from "./mappers";

/*
 * Each schema validates TheMealDB's raw response and transforms it into the
 * app's domain shape, so the rest of the app never sees "strMeal" & co.
 */

export const categorySchema = z
  .object({
    idCategory: z.string(),
    strCategory: z.string(),
    strCategoryThumb: z.string(),
    strCategoryDescription: z.string(),
  })
  .transform((raw) => ({
    id: raw.idCategory,
    name: raw.strCategory,
    thumbnail: raw.strCategoryThumb,
    description: raw.strCategoryDescription,
  }));

export const categoriesResponseSchema = z
  .object({ categories: z.array(categorySchema) })
  .transform((res) => res.categories);

export const mealSummarySchema = z
  .object({
    idMeal: z.string(),
    strMeal: z.string(),
    strMealThumb: z.string(),
  })
  .transform((raw) => ({
    id: raw.idMeal,
    name: raw.strMeal,
    thumbnail: raw.strMealThumb,
  }));

export const mealSummariesResponseSchema = z
  .object({ meals: z.array(mealSummarySchema).nullable() })
  .transform((res) => res.meals ?? []);

export const mealDetailSchema = z
  .object({
    idMeal: z.string(),
    strMeal: z.string(),
    strMealThumb: z.string(),
    strCategory: z.string().nullable(),
    strArea: z.string().nullable(),
    strInstructions: z.string().nullable(),
    strTags: z.string().nullable(),
    strYoutube: z.string().nullable(),
    strSource: z.string().nullable(),
  })
  .catchall(z.unknown())
  .transform((raw) => ({
    id: raw.idMeal,
    name: raw.strMeal,
    thumbnail: raw.strMealThumb,
    category: raw.strCategory,
    area: raw.strArea,
    tags: parseTags(raw.strTags),
    ingredients: parseIngredients(raw),
    steps: parseInstructions(raw.strInstructions),
    youtubeUrl: raw.strYoutube || null,
    sourceUrl: raw.strSource || null,
  }));

export const mealDetailsResponseSchema = z
  .object({ meals: z.array(mealDetailSchema).nullable() })
  .transform((res) => res.meals ?? []);

export const areasResponseSchema = z
  .object({ meals: z.array(z.object({ strArea: z.string() })).nullable() })
  .transform((res) => (res.meals ?? []).map((area) => area.strArea));

export type Category = z.output<typeof categorySchema>;
export type MealSummary = z.output<typeof mealSummarySchema>;
export type MealDetail = z.output<typeof mealDetailSchema>;
