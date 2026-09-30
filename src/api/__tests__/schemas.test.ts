import {
  areasResponseSchema,
  categoriesResponseSchema,
  mealDetailsResponseSchema,
  mealSummariesResponseSchema,
} from "../schemas";

describe("mealSummariesResponseSchema", () => {
  it("maps raw fields to the app's shape", () => {
    const result = mealSummariesResponseSchema.parse({
      meals: [
        { idMeal: "52772", strMeal: "Teriyaki", strMealThumb: "https://x" },
      ],
    });

    expect(result).toEqual([
      { id: "52772", name: "Teriyaki", thumbnail: "https://x" },
    ]);
  });

  it("accepts numeric ids and a null thumbnail", () => {
    const result = mealSummariesResponseSchema.parse({
      meals: [{ idMeal: 52772, strMeal: "Teriyaki", strMealThumb: null }],
    });

    expect(result).toEqual([
      { id: "52772", name: "Teriyaki", thumbnail: null },
    ]);
  });

  it.each([
    ["null", null],
    ["a legacy string", "no data found"],
    ["a legacy object", { message: "premium only" }],
  ])("returns an empty list when meals is %s", (_, meals) => {
    expect(mealSummariesResponseSchema.parse({ meals })).toEqual([]);
  });

  it("rejects a meal without a name", () => {
    expect(
      mealSummariesResponseSchema.safeParse({ meals: [{ idMeal: "1" }] })
        .success,
    ).toBe(false);
  });
});

describe("mealDetailsResponseSchema", () => {
  it("builds ingredients, steps and tags from the raw record", () => {
    const [meal] = mealDetailsResponseSchema.parse({
      meals: [
        {
          idMeal: "52772",
          strMeal: "Teriyaki Chicken Casserole",
          strMealThumb: "https://x",
          strCategory: "Chicken",
          strArea: "Japanese",
          strInstructions: "Preheat oven.\r\nBake.",
          strTags: "Meat,Casserole",
          strYoutube: "https://youtube.com/watch?v=1",
          strSource: "",
          strIngredient1: "soy sauce",
          strMeasure1: "3/4 cup",
          strIngredient2: "",
          strMeasure2: "",
        },
      ],
    });

    expect(meal).toEqual({
      id: "52772",
      name: "Teriyaki Chicken Casserole",
      thumbnail: "https://x",
      category: "Chicken",
      area: "Japanese",
      tags: ["Meat", "Casserole"],
      ingredients: [{ name: "soy sauce", measure: "3/4 cup" }],
      steps: ["Preheat oven.", "Bake."],
      youtubeUrl: "https://youtube.com/watch?v=1",
      sourceUrl: null,
    });
  });

  it("falls back to the country when there is no area", () => {
    const [meal] = mealDetailsResponseSchema.parse({
      meals: [
        { idMeal: "1", strMeal: "Amok", strArea: null, strCountry: "Cambodia" },
      ],
    });

    expect(meal.area).toBe("Cambodia");
  });

  it("fills missing optional fields with null or empty lists", () => {
    const [meal] = mealDetailsResponseSchema.parse({
      meals: [{ idMeal: "1", strMeal: "Plain" }],
    });

    expect(meal).toMatchObject({
      thumbnail: null,
      category: null,
      area: null,
      tags: [],
      ingredients: [],
      steps: [],
      youtubeUrl: null,
    });
  });
});

describe("categoriesResponseSchema", () => {
  it("drops categories without a name", () => {
    const result = categoriesResponseSchema.parse({
      categories: [
        { idCategory: 1, strCategory: null },
        {
          idCategory: "2",
          strCategory: "Beef",
          strCategoryThumb: null,
          strCategoryDescription: null,
        },
      ],
    });

    expect(result).toEqual([
      { id: "2", name: "Beef", thumbnail: null, description: "" },
    ]);
  });
});

describe("areasResponseSchema", () => {
  it("keeps the area name and the country used for filtering", () => {
    const result = areasResponseSchema.parse({
      meals: [
        { strArea: "Brazilian", strCountry: "Brazil" },
        { strArea: "Dominican", strCountry: "Dominica" },
        { strArea: "Dominican", strCountry: "Dominican Republic" },
      ],
    });

    expect(result).toEqual([
      { name: "Brazilian", country: "Brazil" },
      { name: "Dominican", country: "Dominica" },
      { name: "Dominican", country: "Dominican Republic" },
    ]);
  });

  it("falls back to the area name and skips empty entries", () => {
    const result = areasResponseSchema.parse({
      meals: [{ strArea: "Italian" }, { strArea: null }, {}],
    });

    expect(result).toEqual([{ name: "Italian", country: "Italian" }]);
  });
});
