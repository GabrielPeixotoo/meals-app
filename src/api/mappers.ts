export type Ingredient = {
  name: string;
  measure: string;
};

type RawMealFields = Record<string, unknown>;

const MAX_INGREDIENTS = 20;

export function parseIngredients(raw: RawMealFields): Ingredient[] {
  const ingredients: Ingredient[] = [];

  for (let i = 1; i <= MAX_INGREDIENTS; i++) {
    const name = raw[`strIngredient${i}`];
    const measure = raw[`strMeasure${i}`];

    if (typeof name !== "string" || name.trim() === "") continue;

    ingredients.push({
      name: name.trim(),
      measure: typeof measure === "string" ? measure.trim() : "",
    });
  }

  return ingredients;
}

// Lines like "STEP 1", "Step 2:" or "3." that only label the next step.
const STEP_LABEL = /^(step\s*)?\d+[.:)]?$/i;
// Leading numbering such as "1. " or "Step 2: " before the actual text.
const STEP_PREFIX = /^(step\s*)?\d+[.:)]\s*/i;

/** Splits the single strInstructions text into clean, ordered steps. */
export function parseInstructions(instructions: string | null): string[] {
  if (!instructions) return [];

  return instructions
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line !== "" && !STEP_LABEL.test(line))
    .map((line) => line.replace(STEP_PREFIX, ""));
}

/** "Meat,Casserole" -> ["Meat", "Casserole"] */
export function parseTags(tags: string | null): string[] {
  if (!tags) return [];

  return tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}
