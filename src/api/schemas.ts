import { z } from "zod";
import { parseIngredients, parseInstructions, parseTags } from "./mappers";

// Field rules follow TheMealDB's OpenAPI spec: ids may be numbers or strings,
// and every field except idMeal/strMeal may be null or missing.
const id = z.union([z.string(), z.number()]).transform(String);
const optionalText = z
  .string()
  .nullish()
  .transform((value) => value?.trim() || null);

// `meals` may be an array, null, or a legacy "no data" string/object.
function mealsResponse<Item extends z.ZodType>(item: Item) {
  return z
    .object({
      meals: z.union([z.array(item), z.string(), z.looseObject({}), z.null()]),
    })
    .transform((res): z.output<Item>[] =>
      Array.isArray(res.meals) ? res.meals : [],
    );
}

export const categorySchema = z
  .object({
    idCategory: id,
    strCategory: optionalText,
    strCategoryThumb: optionalText,
    strCategoryDescription: optionalText,
  })
  .transform((raw) => ({
    id: raw.idCategory,
    name: raw.strCategory,
    thumbnail: raw.strCategoryThumb,
    description: raw.strCategoryDescription ?? "",
  }));

// A category without a name can't be used to filter meals, so it's dropped.
export const categoriesResponseSchema = z
  .object({ categories: z.array(categorySchema) })
  .transform((res) =>
    res.categories.flatMap(({ name, ...category }) =>
      name ? [{ ...category, name }] : [],
    ),
  );

export const mealSummarySchema = z
  .object({
    idMeal: id,
    strMeal: z.string(),
    strMealThumb: optionalText,
  })
  .transform((raw) => ({
    id: raw.idMeal,
    name: raw.strMeal,
    thumbnail: raw.strMealThumb,
  }));

export const mealSummariesResponseSchema = mealsResponse(mealSummarySchema);

export const mealDetailSchema = z
  .object({
    idMeal: id,
    strMeal: z.string(),
    strMealThumb: optionalText,
    strCategory: optionalText,
    strArea: optionalText,
    strInstructions: optionalText,
    strTags: optionalText,
    strYoutube: optionalText,
    strSource: optionalText,
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
    youtubeUrl: raw.strYoutube,
    sourceUrl: raw.strSource,
  }));

export const mealDetailsResponseSchema = mealsResponse(mealDetailSchema);

export const areasResponseSchema = z
  .object({
    meals: z.array(z.object({ strArea: optionalText })).nullable(),
  })
  .transform((res) =>
    (res.meals ?? []).flatMap(({ strArea }) => (strArea ? [strArea] : [])),
  );

export type Category = z.output<typeof categoriesResponseSchema>[number];
export type MealSummary = z.output<typeof mealSummarySchema>;
export type MealDetail = z.output<typeof mealDetailSchema>;
