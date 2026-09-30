import { parseIngredients, parseInstructions, parseTags } from "../mappers";

describe("parseIngredients", () => {
  it("pairs each ingredient with its measure", () => {
    const raw = {
      strIngredient1: "soy sauce",
      strMeasure1: "3/4 cup",
      strIngredient2: "water",
      strMeasure2: "1/2 cup",
    };

    expect(parseIngredients(raw)).toEqual([
      { name: "soy sauce", measure: "3/4 cup" },
      { name: "water", measure: "1/2 cup" },
    ]);
  });

  it("skips empty, blank and null slots", () => {
    const raw = {
      strIngredient1: "salt",
      strMeasure1: "1 tsp",
      strIngredient2: "",
      strMeasure2: "",
      strIngredient3: "   ",
      strIngredient4: null,
      strMeasure4: null,
    };

    expect(parseIngredients(raw)).toEqual([{ name: "salt", measure: "1 tsp" }]);
  });

  it("keeps ingredients after a gap and trims whitespace", () => {
    const raw = {
      strIngredient1: " eggs ",
      strMeasure1: " 2 ",
      strIngredient5: "flour",
    };

    expect(parseIngredients(raw)).toEqual([
      { name: "eggs", measure: "2" },
      { name: "flour", measure: "" },
    ]);
  });

  it("reads up to 20 ingredients", () => {
    const raw = Object.fromEntries(
      Array.from({ length: 21 }, (_, i) => [
        `strIngredient${i + 1}`,
        `item ${i + 1}`,
      ]),
    );

    const ingredients = parseIngredients(raw);
    expect(ingredients).toHaveLength(20);
    expect(ingredients.at(-1)?.name).toBe("item 20");
  });
});

describe("parseInstructions", () => {
  it("splits instructions into trimmed steps", () => {
    expect(
      parseInstructions("Preheat oven.\r\n  Mix it all.  \nBake."),
    ).toEqual(["Preheat oven.", "Mix it all.", "Bake."]);
  });

  it("drops blank lines and standalone step labels", () => {
    expect(
      parseInstructions("STEP 1\r\nChop onions.\r\n\r\nstep 2:\r\n3.\r\nFry."),
    ).toEqual(["Chop onions.", "Fry."]);
  });

  it("removes numbering prefixes", () => {
    expect(
      parseInstructions("1. Chop onions.\nStep 2: Fry.\n3) Serve."),
    ).toEqual(["Chop onions.", "Fry.", "Serve."]);
  });

  it("returns an empty list for missing instructions", () => {
    expect(parseInstructions(null)).toEqual([]);
    expect(parseInstructions("")).toEqual([]);
  });
});

describe("parseTags", () => {
  it("splits a comma separated list", () => {
    expect(parseTags("Meat, Casserole,,")).toEqual(["Meat", "Casserole"]);
  });

  it("returns an empty list for missing tags", () => {
    expect(parseTags(null)).toEqual([]);
  });
});
