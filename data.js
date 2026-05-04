export const safetySources = [
  {
    title: "USDA FSIS Safe Minimum Internal Temperature Chart",
    url: "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/safe-temperature-chart",
  },
  {
    title: "FoodSafety.gov Safe Minimum Internal Temperatures",
    url: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures",
  },
];

function slugRecipe(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function makeRecipe({
  title,
  chapter,
  subtitle,
  image,
  yieldText,
  activeTime,
  totalTime,
  tags,
  equipment,
  ingredients,
  steps,
  notes,
  glossaryTerms,
  indexIngredients,
}) {
  return {
    id: `library-${slugRecipe(title)}`,
    title,
    chapter,
    origin: "Expanded library",
    status: "Ready to cook",
    subtitle,
    image,
    yield: yieldText,
    activeTime,
    totalTime,
    tags: [...tags, "expanded library"],
    equipment,
    ingredients,
    steps,
    notes,
    glossary: glossaryTerms,
    indexIngredients,
  };
}

const libraryImages = {
  bowl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
  soup: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80",
  pasta: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1200&q=80",
  salad: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=1200&q=80",
  tray: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
  sweet: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80",
};

const bowlVariations = [
  ["Sesame Sweet Potato", "brown rice", "miso tahini", "pickled cucumber", "vegetarian"],
  ["Lime Black Bean", "quinoa", "coriander yoghurt", "charred corn", "vegetarian"],
  ["Crispy Tofu Satay", "jasmine rice", "peanut lime", "shredded carrot", "vegan"],
  ["Harissa Chickpea", "couscous", "lemon tahini", "cucumber ribbons", "vegan"],
  ["Mushroom Miso", "soba noodles", "ginger soy", "spring onions", "vegan"],
  ["Roasted Cauliflower Shawarma", "bulgur wheat", "garlic yoghurt", "tomato salad", "vegetarian"],
  ["Pesto White Bean", "farro", "basil pesto", "rocket", "vegetarian"],
  ["Coconut Lentil", "basmati rice", "lime coconut", "crispy shallots", "vegan"],
  ["Smoky Aubergine", "pearl barley", "mint tahini", "pomegranate", "vegan"],
  ["Chilli Crisp Edamame", "sushi rice", "sesame soy", "avocado", "vegan"],
  ["Herby Halloumi", "freekeh", "lemon herb oil", "roasted peppers", "vegetarian"],
  ["Ginger Carrot", "millet", "miso sesame", "steamed greens", "vegan"],
  ["Tomato Butter Bean", "orzo", "garlic yoghurt", "basil", "vegetarian"],
  ["Turmeric Chickpea", "brown rice", "mango chutney yoghurt", "spinach", "vegetarian"],
  ["Za'atar Squash", "couscous", "tahini lemon", "toasted almonds", "vegan"],
  ["Peanut Broccoli", "rice noodles", "lime peanut", "coriander", "vegan"],
  ["Crispy Lentil Feta", "quinoa", "oregano dressing", "cucumber", "vegetarian"],
  ["Roasted Beetroot", "wild rice", "horseradish yoghurt", "dill", "vegetarian"],
  ["Smoky Pepper Tofu", "brown rice", "paprika tomato", "lime slaw", "vegan"],
  ["Maple Brussels", "farro", "mustard vinaigrette", "apple", "vegan"],
  ["Saffron Butter Bean", "couscous", "lemon olive oil", "parsley", "vegan"],
  ["Kimchi Cucumber Tofu", "sushi rice", "sesame mayo", "nori", "vegetarian"],
  ["Cumin Carrot Chickpea", "bulgur wheat", "mint yoghurt", "pumpkin seeds", "vegetarian"],
  ["Lemony Artichoke", "orzo", "green olive dressing", "rocket", "vegan"],
  ["Crispy Tempeh", "jasmine rice", "tamarind glaze", "cabbage", "vegan"],
  ["Courgette Feta", "pearl barley", "dill lemon", "peas", "vegetarian"],
  ["Pomegranate Lentil", "freekeh", "sumac yoghurt", "herbs", "vegetarian"],
  ["Miso Pumpkin", "brown rice", "ginger sesame", "kale", "vegan"],
  ["Charred Corn Halloumi", "quinoa", "lime crema", "jalapeno", "vegetarian"],
  ["Spiced Tomato Chickpea", "basmati rice", "cucumber yoghurt", "mint", "vegetarian"],
];

const soupVariations = [
  ["Carrot Ginger", "red lentils", "coconut milk", "lime", "vegan"],
  ["Tomato White Bean", "cannellini beans", "basil oil", "sourdough", "vegetarian"],
  ["Mushroom Barley", "pearl barley", "thyme", "creme fraiche", "vegetarian"],
  ["Green Pea Mint", "peas", "lemon", "feta", "vegetarian"],
  ["Smoky Corn Chowder", "sweetcorn", "potato", "spring onions", "vegetarian"],
  ["Harissa Chickpea", "chickpeas", "preserved lemon", "parsley", "vegan"],
  ["Golden Cauliflower", "split peas", "turmeric", "chilli oil", "vegan"],
  ["Roasted Pepper", "butter beans", "smoked paprika", "almonds", "vegan"],
  ["Broccoli Cheddar", "broccoli", "mature cheddar", "mustard", "vegetarian"],
  ["Lemon Orzo", "orzo", "spinach", "dill", "vegetarian"],
  ["Miso Squash", "butternut squash", "white miso", "sesame", "vegan"],
  ["Celeriac Apple", "celeriac", "apple", "hazelnuts", "vegetarian"],
  ["Tuscan Kale", "borlotti beans", "tomato", "Parmesan", "vegetarian"],
  ["Coconut Courgette", "courgette", "green curry paste", "basil", "vegan"],
  ["Sweet Potato Peanut", "sweet potato", "peanut butter", "coriander", "vegan"],
  ["French Onion Lentil", "green lentils", "onions", "Gruyere toast", "vegetarian"],
  ["Beetroot Dill", "beetroot", "potato", "sour cream", "vegetarian"],
  ["Leek Potato", "leeks", "chives", "black pepper", "vegetarian"],
  ["Spiced Parsnip", "parsnips", "cumin", "pumpkin seeds", "vegan"],
  ["Black Bean Lime", "black beans", "cumin", "avocado", "vegan"],
  ["Saffron Tomato Rice", "short-grain rice", "saffron", "parsley", "vegan"],
  ["Minestrone Verde", "small pasta", "greens", "pesto", "vegetarian"],
  ["Roast Garlic White Bean", "white beans", "roasted garlic", "rosemary", "vegan"],
  ["Pumpkin Sage", "pumpkin", "sage butter", "pecans", "vegetarian"],
  ["Red Pepper Tomato", "red peppers", "tomatoes", "goat cheese", "vegetarian"],
  ["Curried Lentil Spinach", "red lentils", "spinach", "yoghurt", "vegetarian"],
  ["Celery Walnut", "celery", "potato", "walnuts", "vegetarian"],
  ["Chickpea Noodle", "chickpeas", "noodles", "lemon", "vegan"],
  ["Roasted Onion Miso", "onions", "miso", "mushrooms", "vegan"],
  ["Coconut Tomato Lentil", "brown lentils", "coconut milk", "ginger", "vegan"],
];

const pastaVariations = [
  ["Lemony Courgette", "spaghetti", "ricotta", "mint", "vegetarian"],
  ["Roasted Pepper", "rigatoni", "almond crumb", "basil", "vegan"],
  ["Mushroom Miso", "tagliatelle", "butter", "chives", "vegetarian"],
  ["Tomato Fennel", "penne", "fennel seeds", "capers", "vegan"],
  ["Broccoli Garlic", "orecchiette", "chilli flakes", "Parmesan", "vegetarian"],
  ["Spinach Walnut", "fusilli", "walnut pesto", "lemon", "vegan"],
  ["Caramelized Onion", "pappardelle", "thyme", "goat cheese", "vegetarian"],
  ["Harissa Tomato", "linguine", "chickpeas", "parsley", "vegan"],
  ["Pea Tarragon", "farfalle", "creme fraiche", "lemon", "vegetarian"],
  ["Aubergine Olive", "casarecce", "green olives", "oregano", "vegan"],
  ["Brown Butter Sage", "gnocchi", "hazelnuts", "lemon", "vegetarian"],
  ["Cauliflower Caper", "bucatini", "breadcrumbs", "parsley", "vegan"],
  ["Pumpkin Mac", "macaroni", "cheddar", "mustard", "vegetarian"],
  ["Artichoke Lemon", "orzo", "spinach", "feta", "vegetarian"],
  ["Coconut Peanut", "rice noodles", "broccoli", "lime", "vegan"],
  ["Tomato Butter Bean", "conchiglie", "basil", "pecorino", "vegetarian"],
  ["Charred Corn", "spaghetti", "lime butter", "coriander", "vegetarian"],
  ["Miso Leek", "udon", "sesame", "spring onions", "vegetarian"],
  ["Beetroot Goat Cheese", "penne", "dill", "walnuts", "vegetarian"],
  ["Smoky Lentil", "rigatoni", "smoked paprika", "tomato", "vegan"],
  ["Saffron Tomato", "linguine", "white beans", "parsley", "vegan"],
  ["Kale Almond", "fusilli", "almond cream", "garlic", "vegan"],
  ["Creamy Pesto Pea", "trofie", "peas", "basil", "vegetarian"],
  ["Roasted Garlic Mushroom", "fettuccine", "rosemary", "Parmesan", "vegetarian"],
  ["Crispy Chickpea", "orecchiette", "lemon", "rocket", "vegan"],
  ["Red Pesto Potato", "gnocchi", "sun-dried tomatoes", "spinach", "vegetarian"],
  ["Courgette Olive", "casarecce", "black olives", "basil", "vegan"],
  ["Cacio Miso", "spaghetti", "miso", "black pepper", "vegetarian"],
  ["Green Herb", "orzo", "parsley", "toasted seeds", "vegan"],
  ["Spiced Squash", "pappardelle", "chilli oil", "sage", "vegetarian"],
];

const saladVariations = [
  ["Watermelon Feta", "cucumber", "mint", "lime dressing", "vegetarian"],
  ["Roasted Beetroot", "lentils", "dill", "mustard vinaigrette", "vegan"],
  ["Tomato Peach", "burrata", "basil", "olive oil", "vegetarian"],
  ["Green Bean Almond", "potatoes", "tarragon", "lemon dressing", "vegan"],
  ["Charred Courgette", "white beans", "parsley", "capers", "vegan"],
  ["Crispy Chickpea", "romaine", "tahini", "pitta chips", "vegan"],
  ["Orange Fennel", "olives", "rocket", "almonds", "vegan"],
  ["Pear Blue Cheese", "walnuts", "endive", "honey mustard", "vegetarian"],
  ["Sesame Cabbage", "edamame", "carrot", "ginger dressing", "vegan"],
  ["Grilled Halloumi", "tomatoes", "cucumber", "oregano", "vegetarian"],
  ["Black Bean Corn", "avocado", "lime", "coriander", "vegan"],
  ["Roasted Squash", "farro", "cranberries", "maple dressing", "vegan"],
  ["Radish Butter Bean", "celery", "parsley", "lemon", "vegan"],
  ["Mango Cucumber", "peanuts", "mint", "chilli lime", "vegan"],
  ["Apple Cheddar", "kale", "pumpkin seeds", "cider dressing", "vegetarian"],
  ["Carrot Harissa", "chickpeas", "yoghurt", "coriander", "vegetarian"],
  ["Greek Orzo", "feta", "tomatoes", "olives", "vegetarian"],
  ["Herby Potato", "spring onions", "dill", "mustard", "vegan"],
  ["Shaved Brussels", "Parmesan", "lemon", "hazelnuts", "vegetarian"],
  ["Citrus Avocado", "quinoa", "pistachios", "herbs", "vegan"],
  ["Roasted Pepper", "chickpeas", "parsley", "sherry vinegar", "vegan"],
  ["Cucumber Yoghurt", "radishes", "dill", "sumac", "vegetarian"],
  ["Broccoli Crunch", "sunflower seeds", "raisins", "tahini", "vegan"],
  ["Tomato White Bean", "basil", "red onion", "red wine vinegar", "vegan"],
  ["Spinach Strawberry", "goat cheese", "almonds", "balsamic", "vegetarian"],
  ["Lemony Lentil", "rocket", "feta", "mint", "vegetarian"],
  ["Rice Noodle", "cabbage", "peanuts", "lime", "vegan"],
  ["Artichoke Olive", "chickpeas", "parsley", "lemon", "vegan"],
  ["Charred Corn", "tomatoes", "avocado", "lime crema", "vegetarian"],
  ["Pea Mint", "little gems", "ricotta", "lemon", "vegetarian"],
];

const trayVariations = [
  ["Maple Mustard Roots", "carrots", "parsnips", "chickpeas", "vegan"],
  ["Harissa Cauliflower", "cauliflower", "red onion", "tahini", "vegan"],
  ["Lemon Herb Potatoes", "new potatoes", "green beans", "feta", "vegetarian"],
  ["Miso Aubergine", "aubergine", "spring onions", "sesame", "vegan"],
  ["Tomato Halloumi", "cherry tomatoes", "courgette", "basil", "vegetarian"],
  ["Smoky Sweet Potato", "sweet potato", "black beans", "lime", "vegan"],
  ["Za'atar Squash", "butternut squash", "chickpeas", "yoghurt", "vegetarian"],
  ["Garlic Mushroom", "mushrooms", "polenta", "parsley", "vegetarian"],
  ["Pepper and Butter Bean", "red peppers", "butter beans", "oregano", "vegan"],
  ["Broccoli Cheddar", "broccoli", "potatoes", "cheddar", "vegetarian"],
  ["Crispy Tofu", "tofu", "broccoli", "peanut sauce", "vegan"],
  ["Roasted Fennel", "fennel", "white beans", "lemon", "vegan"],
  ["Carrot Lentil", "carrots", "green lentils", "dill yoghurt", "vegetarian"],
  ["Courgette Tomato", "courgette", "orzo", "mozzarella", "vegetarian"],
  ["Cumin Cabbage", "cabbage wedges", "chickpeas", "mint", "vegan"],
  ["Sage Pumpkin", "pumpkin", "gnocchi", "brown butter", "vegetarian"],
  ["Green Olive Potato", "potatoes", "green olives", "lemon", "vegan"],
  ["Gochujang Sprouts", "Brussels sprouts", "tofu", "sesame", "vegan"],
  ["Ricotta Tomato", "tomatoes", "bread", "ricotta", "vegetarian"],
  ["Coconut Curry Veg", "cauliflower", "potatoes", "coconut milk", "vegan"],
  ["Balsamic Onion", "red onions", "lentils", "goat cheese", "vegetarian"],
  ["Tahini Broccoli", "broccoli", "chickpeas", "pomegranate", "vegan"],
  ["Herby Leek Bean", "leeks", "cannellini beans", "mustard", "vegetarian"],
  ["Paprika Pepper Potato", "potatoes", "peppers", "parsley", "vegan"],
  ["Pesto Courgette", "courgette", "white beans", "Parmesan", "vegetarian"],
  ["Roast Radish", "radishes", "butter beans", "dill", "vegetarian"],
  ["Sesame Carrot Tofu", "carrots", "tofu", "ginger", "vegan"],
  ["Tomato Chickpea Bake", "chickpeas", "tomatoes", "feta", "vegetarian"],
  ["Mushroom Potato Gratin", "mushrooms", "potatoes", "cream", "vegetarian"],
  ["Lime Corn Squash", "squash", "corn", "coriander", "vegan"],
];

const sweetVariations = [
  ["Apple Tahini", "oats", "maple syrup", "cinnamon", "vegan"],
  ["Pear Ginger", "almonds", "honey", "yoghurt", "vegetarian"],
  ["Chocolate Orange", "cocoa", "olive oil", "orange zest", "vegetarian"],
  ["Raspberry Lemon", "polenta", "almonds", "lemon", "vegetarian"],
  ["Banana Peanut", "oats", "peanut butter", "dark chocolate", "vegetarian"],
  ["Blueberry Coconut", "coconut milk", "lime", "vanilla", "vegan"],
  ["Plum Cardamom", "brown sugar", "pistachios", "cream", "vegetarian"],
  ["Date Walnut", "spelt flour", "coffee", "cinnamon", "vegetarian"],
  ["Strawberry Basil", "shortcakes", "cream", "basil sugar", "vegetarian"],
  ["Mango Lime", "rice pudding", "coconut", "mint", "vegan"],
  ["Cherry Almond", "frangipane", "butter", "vanilla", "vegetarian"],
  ["Peach Oat", "crumble", "ginger", "yoghurt", "vegetarian"],
  ["Blackberry Rye", "rye flour", "brown butter", "sugar", "vegetarian"],
  ["Pineapple Rum", "coconut", "lime", "brown sugar", "vegan"],
  ["Lemon Poppy Seed", "yoghurt", "olive oil", "poppy seeds", "vegetarian"],
  ["Fig Honey", "walnuts", "ricotta", "thyme", "vegetarian"],
  ["Carrot Walnut", "cream cheese", "spices", "orange", "vegetarian"],
  ["Cranberry Pistachio", "shortbread", "vanilla", "lemon", "vegetarian"],
  ["Apricot Almond", "semolina", "honey", "rose water", "vegetarian"],
  ["Mocha Hazelnut", "espresso", "hazelnuts", "cocoa", "vegetarian"],
  ["Sesame Banana", "tahini", "sesame seeds", "maple", "vegan"],
  ["Rhubarb Custard", "vanilla", "ginger", "pastry", "vegetarian"],
  ["Orange Olive Oil", "almonds", "polenta", "yoghurt", "vegetarian"],
  ["Coconut Date", "oats", "cocoa", "sea salt", "vegan"],
  ["Mint Chocolate", "cream", "dark chocolate", "biscuits", "vegetarian"],
  ["Grape Rosemary", "focaccia", "olive oil", "sugar", "vegan"],
  ["Lime Avocado", "cocoa", "maple", "pistachio", "vegan"],
  ["Spiced Pumpkin", "oats", "pecans", "maple", "vegetarian"],
  ["Lemon Ricotta", "pancakes", "blueberries", "honey", "vegetarian"],
  ["Cinnamon Peach", "yoghurt", "granola", "almonds", "vegetarian"],
];

function buildBowlRecipes() {
  return bowlVariations.map(([name, grain, sauce, topping, diet]) =>
    makeRecipe({
      title: `${name} Bowl with ${sauce}`,
      chapter: "Bowls and Grains",
      subtitle: `${name} layered with ${grain}, ${sauce}, and ${topping} for a flexible lunch or dinner bowl.`,
      image: libraryImages.bowl,
      yieldText: "2 servings",
      activeTime: "20 min",
      totalTime: "30 min",
      tags: [diet, "bowl", "30 min", "lunch"],
      equipment: ["large skillet", "mixing bowl", "small whisk"],
      ingredients: [
        { amount: 300, unit: "g", item: `${grain}, cooked` },
        { amount: 250, unit: "g", item: `${name.toLowerCase()} vegetables or protein, bite-size` },
        { amount: 1, unit: "tbsp", item: "olive oil or neutral oil" },
        { amount: 0.5, unit: "tsp", item: "fine salt" },
        { amount: 3, unit: "tbsp", item: sauce },
        { amount: 1, unit: "handful", item: topping },
        { amount: 1, unit: "", item: "lemon or lime, cut into wedges" },
      ],
      steps: [
        `Warm the ${grain} and divide it between two bowls.`,
        `Cook the ${name.toLowerCase()} vegetables or protein in oil over medium-high heat until browned at the edges and tender.`,
        `Whisk the ${sauce} with 1 tablespoon water until spoonable.`,
        `Arrange the cooked mixture over the ${grain}, then add ${topping}.`,
        "Finish with citrus wedges and eat while the warm and cool elements still contrast.",
      ],
      notes: [
        "Storage: Keep sauce separate and refrigerate components for up to 3 days.",
        "Variation: Add toasted seeds, chilli crisp, or quick pickles.",
      ],
      glossaryTerms: ["Mise en place", "Emulsify"],
      indexIngredients: [name, grain, sauce, topping],
    }),
  );
}

function buildSoupRecipes() {
  return soupVariations.map(([name, body, accent, finish, diet]) =>
    makeRecipe({
      title: `${name} Soup with ${finish}`,
      chapter: "Soups, Stews and Spoon Food",
      subtitle: `A comforting ${name.toLowerCase()} soup built with ${body}, lifted by ${accent}, and finished with ${finish}.`,
      image: libraryImages.soup,
      yieldText: "4 servings",
      activeTime: "20 min",
      totalTime: "40 min",
      tags: [diet, "soup", "make ahead"],
      equipment: ["large saucepan", "wooden spoon", "blender or potato masher"],
      ingredients: [
        { amount: 1, unit: "tbsp", item: "olive oil" },
        { amount: 1, unit: "", item: "onion, diced" },
        { amount: 2, unit: "cloves", item: "garlic, sliced" },
        { amount: 450, unit: "g", item: body },
        { amount: 1, unit: "tsp", item: accent },
        { amount: 900, unit: "ml", item: "vegetable stock" },
        { amount: 1, unit: "handful", item: finish },
      ],
      steps: [
        "Warm the oil in a large saucepan over medium heat. Cook onion until soft and glossy, 6 to 8 minutes.",
        "Add garlic and the accent ingredient. Stir until fragrant, about 30 seconds.",
        `Add ${body} and vegetable stock. Simmer gently until everything is tender.`,
        "Blend smooth, mash lightly, or leave chunky depending on the texture you want.",
        `Taste for salt and serve with ${finish}.`,
      ],
      notes: [
        "Storage: Refrigerate for up to 4 days or freeze in portions.",
        "Serving: Add toast, rice, or a simple salad to make it a meal.",
      ],
      glossaryTerms: ["Aromatics", "Bloom", "Simmer"],
      indexIngredients: [name, body, accent, finish],
    }),
  );
}

function buildPastaRecipes() {
  return pastaVariations.map(([name, pasta, sauceBase, finish, diet]) =>
    makeRecipe({
      title: `${name} ${pasta}`,
      chapter: "Pasta, Noodles and Sauces",
      subtitle: `${pasta} tossed with ${sauceBase}, ${finish}, and enough pasta water to make the sauce glossy.`,
      image: libraryImages.pasta,
      yieldText: "3 servings",
      activeTime: "20 min",
      totalTime: "30 min",
      tags: [diet, "pasta", "30 min"],
      equipment: ["large saucepan", "large skillet", "tongs"],
      ingredients: [
        { amount: 280, unit: "g", item: pasta },
        { amount: 1, unit: "tbsp", item: "olive oil" },
        { amount: 2, unit: "cloves", item: "garlic, finely sliced" },
        { amount: 220, unit: "g", item: sauceBase },
        { amount: 80, unit: "ml", item: "reserved pasta water" },
        { amount: 1, unit: "handful", item: finish },
        { amount: null, unit: "", item: "black pepper" },
      ],
      steps: [
        `Cook the ${pasta} in salted water until al dente. Reserve pasta water before draining.`,
        "Warm oil in a skillet and soften the garlic without letting it brown hard.",
        `Add ${sauceBase} and cook until it smells rounded and the edges look glossy.`,
        "Toss in the pasta with splashes of pasta water until the sauce clings.",
        `Finish with ${finish} and black pepper.`,
      ],
      notes: [
        "Storage: Refrigerate leftovers for up to 3 days; reheat with a splash of water.",
        "Variation: Add greens, beans, or toasted breadcrumbs.",
      ],
      glossaryTerms: ["Al dente", "Emulsify", "Reduction"],
      indexIngredients: [name, pasta, sauceBase, finish],
    }),
  );
}

function buildSaladRecipes() {
  return saladVariations.map(([name, body, accent, dressing, diet]) =>
    makeRecipe({
      title: `${name} Salad`,
      chapter: "No-Cook and Low-Cook",
      subtitle: `A crisp, bright salad with ${body}, ${accent}, and ${dressing}.`,
      image: libraryImages.salad,
      yieldText: "3 servings",
      activeTime: "15 min",
      totalTime: "15 min",
      tags: [diet, "salad", "15 min", "no cook"],
      equipment: ["large mixing bowl", "small jar", "knife"],
      ingredients: [
        { amount: 300, unit: "g", item: body },
        { amount: 120, unit: "g", item: accent },
        { amount: 2, unit: "tbsp", item: dressing },
        { amount: 1, unit: "tbsp", item: "olive oil" },
        { amount: 1, unit: "tsp", item: "lemon juice or vinegar" },
        { amount: 1, unit: "handful", item: "soft herbs or salad leaves" },
        { amount: null, unit: "", item: "salt and black pepper" },
      ],
      steps: [
        `Prepare the ${body} so every piece is easy to eat with a fork.`,
        `Add ${accent} and herbs to a large mixing bowl.`,
        `Shake ${dressing}, olive oil, and lemon juice or vinegar in a jar until glossy.`,
        "Toss the salad gently, then let it sit for 5 minutes if the ingredients are sturdy.",
        "Taste and adjust with more acid, salt, or pepper before serving.",
      ],
      notes: [
        "Storage: Best fresh, though sturdy salads keep for 2 days without delicate leaves.",
        "Variation: Add cooked grains, beans, cheese, or toasted nuts.",
      ],
      glossaryTerms: ["Macerate", "Emulsify"],
      indexIngredients: [name, body, accent, dressing],
    }),
  );
}

function buildTrayRecipes() {
  return trayVariations.map(([name, vegetable, support, finish, diet]) =>
    makeRecipe({
      title: `${name} Traybake`,
      chapter: "Roasts and Traybakes",
      subtitle: `${vegetable} and ${support} roasted until browned, then finished with ${finish}.`,
      image: libraryImages.tray,
      yieldText: "4 servings",
      activeTime: "20 min",
      totalTime: "45 min",
      tags: [diet, "traybake", "make ahead"],
      equipment: ["large roasting tray", "mixing bowl", "spatula"],
      ingredients: [
        { amount: 550, unit: "g", item: vegetable },
        { amount: 300, unit: "g", item: support },
        { amount: 2, unit: "tbsp", item: "olive oil" },
        { amount: 1, unit: "tsp", item: "fine salt" },
        { amount: 1, unit: "tsp", item: "smoked paprika or dried herbs" },
        { amount: 1, unit: "handful", item: finish },
        { amount: 1, unit: "", item: "lemon, cut into wedges" },
      ],
      steps: [
        "Heat the oven to 220 C / 425 F and line a large roasting tray if needed.",
        `Toss ${vegetable} and ${support} with olive oil, salt, and smoked paprika or dried herbs.`,
        "Roast in a single layer, turning once, until the edges are browned and the centers are tender.",
        `Scatter over ${finish} while the tray is hot.`,
        "Serve with lemon wedges and any tray juices spooned over the top.",
      ],
      notes: [
        "Storage: Refrigerate leftovers promptly for up to 3 days.",
        "Serving: Add yoghurt sauce, grains, or warm flatbread.",
      ],
      glossaryTerms: ["Carryover cooking", "Rest"],
      indexIngredients: [name, vegetable, support, finish],
    }),
  );
}

function buildSweetRecipes() {
  return sweetVariations.map(([name, base, accent, finish, diet]) =>
    makeRecipe({
      title: `${name} Sweet Bake`,
      chapter: "Sweet Things",
      subtitle: `A small-batch sweet built around ${base}, ${accent}, and ${finish}.`,
      image: libraryImages.sweet,
      yieldText: "8 portions",
      activeTime: "20 min",
      totalTime: "45 min",
      tags: [diet, "dessert", "baking", "make ahead"],
      equipment: ["mixing bowl", "20 cm baking dish", "whisk"],
      ingredients: [
        { amount: 180, unit: "g", item: base },
        { amount: 90, unit: "g", item: "plain flour or oat flour" },
        { amount: 70, unit: "g", item: "sugar" },
        { amount: 1, unit: "tsp", item: accent },
        { amount: 1, unit: "tsp", item: "baking powder" },
        { amount: 80, unit: "ml", item: "milk or plant milk" },
        { amount: 1, unit: "handful", item: finish },
      ],
      steps: [
        "Heat the oven to 180 C / 350 F and lightly grease the baking dish.",
        `Stir ${base}, flour, sugar, ${accent}, and baking powder in a mixing bowl.`,
        "Add milk or plant milk and mix just until no dry patches remain.",
        `Fold through ${finish}, then scrape into the prepared dish.`,
        "Bake until the center springs back lightly and the edges are golden. Rest before slicing.",
      ],
      notes: [
        "Storage: Keep covered at room temperature for 2 days or refrigerate for 4 days.",
        "Serving: Good warm with yoghurt, cream, or fruit.",
      ],
      glossaryTerms: ["Fold", "Rest"],
      indexIngredients: [name, base, accent, finish],
    }),
  );
}

const generatedRecipeLibrary = [
  ...buildBowlRecipes(),
  ...buildSoupRecipes(),
  ...buildPastaRecipes(),
  ...buildSaladRecipes(),
  ...buildTrayRecipes(),
  ...buildSweetRecipes(),
];

export const glossary = [
  {
    term: "Al dente",
    definition:
      "Cooked through but still firm at the center. Most common for pasta, noodles, and some vegetables.",
  },
  {
    term: "Aromatics",
    definition:
      "Ingredients such as onion, garlic, ginger, celery, carrot, and spices that build the base flavor of a dish.",
  },
  {
    term: "Bloom",
    definition:
      "To warm spices, tomato paste, cocoa, or gelatin in fat or liquid so flavor and color open up before the next ingredient goes in.",
  },
  {
    term: "Carryover cooking",
    definition:
      "The heat that keeps moving through food after it leaves the oven, pan, or grill.",
  },
  {
    term: "Deglaze",
    definition:
      "To add liquid to a hot pan and scrape up browned bits so they become part of the sauce.",
  },
  {
    term: "Emulsify",
    definition:
      "To bring fat and liquid together into a smooth sauce, often with whisking, starch, mustard, egg yolk, or miso.",
  },
  {
    term: "Fold",
    definition:
      "To combine gently with a lifting motion so delicate mixtures keep their air or texture.",
  },
  {
    term: "Headnote",
    definition:
      "The short introduction before a recipe that tells the reader why it matters, when to cook it, or what to expect.",
  },
  {
    term: "Macerate",
    definition:
      "To toss fruit or vegetables with sugar, salt, acid, or alcohol until they soften and release juice.",
  },
  {
    term: "Mise en place",
    definition:
      "The prep habit of measuring, chopping, and arranging ingredients before cooking starts.",
  },
  {
    term: "Reduction",
    definition:
      "A liquid simmered until some water evaporates and the flavor becomes more concentrated.",
  },
  {
    term: "Rest",
    definition:
      "To pause after cooking so juices settle, starches finish hydrating, or structure firms before serving.",
  },
  {
    term: "Simmer",
    definition:
      "Gentle bubbling below a full boil, useful for soups, sauces, stews, grains, and poaching.",
  },
  {
    term: "Umami",
    definition:
      "A savory depth found in ingredients such as miso, mushrooms, tomatoes, Parmesan, anchovies, soy sauce, and browned meat.",
  },
];

const curatedRecipes = [
  {
    id: "miso-butter-beans-toast",
    title: "Miso Butter Beans on Charred Toast",
    chapter: "Weeknight Wonders",
    origin: "New idea",
    status: "Ready to cook",
    subtitle:
      "Creamy beans, miso butter, lemon, and greens spooned over crisp toast for a fast pantry supper.",
    image:
      "https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=1200&q=80",
    yield: "2 generous servings",
    activeTime: "15 min",
    totalTime: "20 min",
    tags: ["vegetarian", "20 min", "pantry", "new idea"],
    equipment: ["large skillet", "toaster or grill pan", "microplane or fine grater"],
    ingredients: [
      { amount: 2, unit: "tbsp", item: "unsalted butter" },
      { amount: 1, unit: "tbsp", item: "white miso" },
      { amount: 1, unit: "small", item: "shallot, finely sliced" },
      { amount: 2, unit: "cloves", item: "garlic, finely grated" },
      { amount: 400, unit: "g", item: "canned butter beans, drained and rinsed" },
      { amount: 80, unit: "ml", item: "vegetable stock or water" },
      { amount: 2, unit: "handfuls", item: "spinach or shredded kale" },
      { amount: 0.5, unit: "", item: "lemon, zest and juice" },
      { amount: 2, unit: "thick slices", item: "sourdough or country bread, toasted" },
      { amount: null, unit: "", item: "black pepper and flaky salt" },
    ],
    steps: [
      "Melt the butter in a large skillet over medium heat. Stir in the miso until it loosens and smells nutty, about 30 seconds.",
      "Add the shallot and cook until softened at the edges, 2 to 3 minutes. Stir in the garlic for 20 seconds.",
      "Add the butter beans and stock. Simmer gently, pressing a few beans with the spoon, until the sauce turns creamy.",
      "Fold in the greens until just wilted. Finish with lemon zest, lemon juice, black pepper, and a small pinch of salt.",
      "Spoon the beans over charred toast and serve while the toast still has crunch.",
    ],
    notes: [
      "Storage: Keep beans and toast separate. Refrigerate beans for up to 3 days.",
      "Variation: Add chilli crisp or a soft herb oil for a richer finish.",
    ],
    glossary: ["Bloom", "Emulsify", "Umami"],
    indexIngredients: ["butter beans", "miso", "shallot", "spinach", "sourdough"],
  },
  {
    id: "lemon-tarragon-chicken-potatoes",
    title: "Lemon Tarragon Chicken with Crispy Potatoes",
    chapter: "Roasts and Traybakes",
    origin: "New idea",
    status: "Ready to cook",
    subtitle:
      "A bright traybake with mustardy pan juices, crisp potatoes, and enough tarragon to feel quietly fancy.",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1200&q=80",
    yield: "4 servings",
    activeTime: "20 min",
    totalTime: "55 min",
    tags: ["chicken", "traybake", "weekend", "new idea"],
    equipment: ["large roasting tray", "instant-read thermometer", "mixing bowl"],
    ingredients: [
      { amount: 700, unit: "g", item: "baby potatoes, halved" },
      { amount: 2, unit: "tbsp", item: "olive oil" },
      { amount: 1.25, unit: "tsp", item: "fine salt, divided" },
      { amount: 4, unit: "", item: "bone-in chicken thighs" },
      { amount: 1, unit: "tbsp", item: "Dijon mustard" },
      { amount: 1, unit: "", item: "lemon, zest and juice" },
      { amount: 3, unit: "cloves", item: "garlic, crushed" },
      { amount: 1, unit: "tbsp", item: "fresh tarragon, chopped" },
      { amount: 120, unit: "ml", item: "chicken stock" },
    ],
    steps: [
      "Heat the oven to 220 C / 425 F. Toss potatoes with half the oil and half the salt on a large tray, then roast for 15 minutes.",
      "Mix the remaining oil, mustard, lemon zest, lemon juice, garlic, tarragon, and remaining salt in a bowl.",
      "Coat the chicken with the mustard mixture. Nestle it skin-side up among the potatoes and pour the stock into the tray.",
      "Roast until the potatoes are crisp and the chicken reaches 74 C / 165 F in the thickest part, 30 to 35 minutes more.",
      "Rest for 5 minutes, then spoon the lemony pan juices over everything.",
    ],
    notes: [
      "Storage: Refrigerate leftovers promptly and reheat until steaming hot.",
      "Safety: Use a thermometer; color alone is not a reliable doneness check for poultry.",
    ],
    glossary: ["Carryover cooking", "Rest"],
    indexIngredients: ["chicken thighs", "potatoes", "tarragon", "Dijon mustard", "lemon"],
  },
  {
    id: "gochujang-salmon-rice-bowls",
    title: "Crispy Gochujang Salmon Rice Bowls",
    chapter: "Bowls and Grains",
    origin: "New idea",
    status: "Ready to cook",
    subtitle:
      "Sticky-spicy salmon with cool cucumber, sesame rice, and a lime yoghurt drizzle.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80",
    yield: "2 servings",
    activeTime: "20 min",
    totalTime: "25 min",
    tags: ["fish", "25 min", "rice bowl", "new idea"],
    equipment: ["nonstick skillet", "small bowl", "instant-read thermometer"],
    ingredients: [
      { amount: 2, unit: "fillets", item: "salmon, skin removed if preferred" },
      { amount: 1, unit: "tbsp", item: "gochujang" },
      { amount: 1, unit: "tbsp", item: "soy sauce" },
      { amount: 2, unit: "tsp", item: "honey" },
      { amount: 1, unit: "tsp", item: "rice vinegar" },
      { amount: 1, unit: "tsp", item: "neutral oil" },
      { amount: 300, unit: "g", item: "cooked rice" },
      { amount: 0.5, unit: "", item: "cucumber, thinly sliced" },
      { amount: 3, unit: "tbsp", item: "plain yoghurt" },
      { amount: 0.5, unit: "", item: "lime, juiced" },
      { amount: 1, unit: "tsp", item: "toasted sesame seeds" },
    ],
    steps: [
      "Stir the gochujang, soy sauce, honey, and rice vinegar together in a small bowl.",
      "Pat the salmon dry. Heat oil in a nonstick skillet over medium-high heat and sear the salmon until browned, 2 to 3 minutes.",
      "Turn the salmon, lower the heat to medium, and brush with the gochujang glaze. Cook until the fish reaches 63 C / 145 F or flakes easily.",
      "Whisk yoghurt with lime juice and a pinch of salt. Divide rice between bowls.",
      "Top rice with salmon, cucumber, yoghurt drizzle, and sesame seeds.",
    ],
    notes: [
      "Variation: Swap rice for soba noodles or shredded cabbage.",
      "Make ahead: Cook rice in advance and chill quickly; reheat until steaming.",
    ],
    glossary: ["Carryover cooking", "Umami"],
    indexIngredients: ["salmon", "gochujang", "rice", "cucumber", "yoghurt"],
  },
  {
    id: "charred-broccoli-galette",
    title: "Charred Broccoli, Cheddar and Mustard Galette",
    chapter: "Comfort With Greens",
    origin: "New idea",
    status: "Ready to cook",
    subtitle:
      "A rustic free-form tart with sharp cheddar, mustard cream, and broccoli that gets just enough char.",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80",
    yield: "4 servings",
    activeTime: "25 min",
    totalTime: "55 min",
    tags: ["vegetarian", "baking", "comfort", "new idea"],
    equipment: ["baking sheet", "rolling pin", "parchment paper"],
    ingredients: [
      { amount: 1, unit: "sheet", item: "ready-rolled shortcrust pastry" },
      { amount: 250, unit: "g", item: "broccoli florets, sliced small" },
      { amount: 1, unit: "tbsp", item: "olive oil" },
      { amount: 2, unit: "tbsp", item: "sour cream or creme fraiche" },
      { amount: 1, unit: "tbsp", item: "wholegrain mustard" },
      { amount: 90, unit: "g", item: "mature cheddar, grated" },
      { amount: 1, unit: "", item: "egg, beaten" },
      { amount: null, unit: "", item: "black pepper" },
    ],
    steps: [
      "Heat the oven to 200 C / 400 F. Toss broccoli with olive oil and a pinch of salt.",
      "Unroll the pastry onto parchment. Mix sour cream with mustard and spread over the center, leaving a 5 cm border.",
      "Scatter cheddar over the mustard cream, then add broccoli and black pepper.",
      "Fold the pastry border over the filling, pleating as needed. Brush pastry with beaten egg.",
      "Bake until the pastry is deeply golden and the broccoli edges are charred, 30 to 35 minutes.",
    ],
    notes: [
      "Serving: Excellent with a sharp green salad.",
      "Variation: Add caramelized onions under the cheddar.",
    ],
    glossary: ["Fold", "Rest"],
    indexIngredients: ["broccoli", "cheddar", "mustard", "shortcrust pastry", "egg"],
  },
  {
    id: "harissa-lentil-carrot-soup",
    title: "Harissa Lentil and Roast Carrot Soup",
    chapter: "Soups, Stews and Spoon Food",
    origin: "New idea",
    status: "Ready to cook",
    subtitle:
      "A velvety red lentil soup with roasted carrot sweetness, smoky harissa, and lemony yoghurt.",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
    yield: "4 servings",
    activeTime: "20 min",
    totalTime: "45 min",
    tags: ["vegetarian", "soup", "make ahead", "new idea"],
    equipment: ["sheet pan", "large saucepan", "blender"],
    ingredients: [
      { amount: 500, unit: "g", item: "carrots, cut into chunks" },
      { amount: 2, unit: "tbsp", item: "olive oil, divided" },
      { amount: 1, unit: "", item: "onion, chopped" },
      { amount: 2, unit: "cloves", item: "garlic, sliced" },
      { amount: 1.5, unit: "tbsp", item: "rose harissa" },
      { amount: 180, unit: "g", item: "red lentils, rinsed" },
      { amount: 900, unit: "ml", item: "vegetable stock" },
      { amount: 1, unit: "", item: "lemon, juiced" },
      { amount: 4, unit: "tbsp", item: "plain yoghurt, to serve" },
    ],
    steps: [
      "Heat the oven to 210 C / 410 F. Toss carrots with half the oil and roast until browned at the edges, 25 minutes.",
      "Warm the remaining oil in a saucepan over medium heat. Cook onion until soft, 6 to 8 minutes.",
      "Add garlic and harissa. Stir for 30 seconds until fragrant.",
      "Add lentils, stock, and roasted carrots. Simmer until the lentils collapse, about 15 minutes.",
      "Blend until smooth, brighten with lemon juice, and serve with yoghurt.",
    ],
    notes: [
      "Storage: Refrigerate for up to 4 days or freeze in portions.",
      "Variation: Use coconut milk instead of yoghurt for a dairy-free finish.",
    ],
    glossary: ["Aromatics", "Bloom", "Simmer"],
    indexIngredients: ["carrots", "harissa", "red lentils", "vegetable stock", "yoghurt"],
  },
  {
    id: "coconut-lime-chickpea-noodles",
    title: "Coconut Lime Chickpea Noodles",
    chapter: "Bowls and Grains",
    origin: "New idea",
    status: "Ready to cook",
    subtitle:
      "Creamy coconut noodles with crispy chickpeas, lime, herbs, and a glossy sauce that clings.",
    image:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80",
    yield: "3 servings",
    activeTime: "20 min",
    totalTime: "30 min",
    tags: ["vegan", "noodles", "30 min", "new idea"],
    equipment: ["large skillet", "saucepan", "colander"],
    ingredients: [
      { amount: 200, unit: "g", item: "rice noodles" },
      { amount: 1, unit: "tbsp", item: "neutral oil" },
      { amount: 400, unit: "g", item: "canned chickpeas, drained and patted dry" },
      { amount: 2, unit: "cloves", item: "garlic, grated" },
      { amount: 1, unit: "tbsp", item: "ginger, grated" },
      { amount: 200, unit: "ml", item: "coconut milk" },
      { amount: 1, unit: "tbsp", item: "soy sauce" },
      { amount: 1, unit: "", item: "lime, zest and juice" },
      { amount: 2, unit: "handfuls", item: "fresh herbs, such as coriander, basil, or mint" },
    ],
    steps: [
      "Soak or cook the noodles according to the packet, stopping just before fully tender. Reserve a mug of noodle water.",
      "Heat oil in a large skillet over medium-high heat. Cook chickpeas until golden and lightly crisp, 6 to 8 minutes.",
      "Add garlic and ginger for 30 seconds, then pour in coconut milk, soy sauce, lime zest, and lime juice.",
      "Add noodles and toss until the sauce coats them. Loosen with noodle water if needed.",
      "Fold through herbs just before serving.",
    ],
    notes: [
      "Variation: Add shredded greens with the coconut milk.",
      "Storage: Best fresh; leftovers reheat gently with a splash of water.",
    ],
    glossary: ["Al dente", "Fold", "Emulsify"],
    indexIngredients: ["rice noodles", "chickpeas", "coconut milk", "lime", "herbs"],
  },
  {
    id: "mushroom-walnut-ragu",
    title: "Smoky Mushroom and Walnut Ragu",
    chapter: "Comfort With Greens",
    origin: "New idea",
    status: "Ready to cook",
    subtitle:
      "A deep vegetarian ragu built from browned mushrooms, walnuts, tomato, and a little smoked paprika.",
    image:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80",
    yield: "4 servings",
    activeTime: "25 min",
    totalTime: "50 min",
    tags: ["vegetarian", "pasta", "make ahead", "new idea"],
    equipment: ["large saute pan", "food processor or knife", "wooden spoon"],
    ingredients: [
      { amount: 350, unit: "g", item: "mixed mushrooms, finely chopped" },
      { amount: 80, unit: "g", item: "walnuts, finely chopped" },
      { amount: 2, unit: "tbsp", item: "olive oil" },
      { amount: 1, unit: "", item: "onion, finely diced" },
      { amount: 1, unit: "", item: "carrot, finely diced" },
      { amount: 2, unit: "tbsp", item: "tomato paste" },
      { amount: 1, unit: "tsp", item: "smoked paprika" },
      { amount: 400, unit: "g", item: "canned crushed tomatoes" },
      { amount: 300, unit: "g", item: "pasta, cooked al dente" },
      { amount: null, unit: "", item: "Parmesan or nutritional yeast, to serve" },
    ],
    steps: [
      "Brown mushrooms in a dry large pan over medium-high heat until their moisture cooks off and the edges darken.",
      "Add walnuts and olive oil. Cook for 2 minutes until the walnuts smell toasted.",
      "Stir in onion and carrot. Cook until softened, about 6 minutes.",
      "Add tomato paste and smoked paprika. Stir until the paste darkens slightly.",
      "Pour in crushed tomatoes and simmer until thick, 15 to 20 minutes. Toss with pasta and serve.",
    ],
    notes: [
      "Make ahead: The ragu improves overnight.",
      "Variation: Add a splash of red wine before the tomatoes and reduce by half.",
    ],
    glossary: ["Al dente", "Bloom", "Reduction", "Simmer"],
    indexIngredients: ["mushrooms", "walnuts", "tomato paste", "smoked paprika", "pasta"],
  },
  {
    id: "beef-kofta-pickled-onions",
    title: "Spiced Beef Kofta with Quick Pickled Onions",
    chapter: "Plates to Share",
    origin: "New idea",
    status: "Ready to cook",
    subtitle:
      "Juicy skillet kofta with warm spices, cool yoghurt, herbs, and bright onions for flatbread dinners.",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    yield: "4 servings",
    activeTime: "25 min",
    totalTime: "35 min",
    tags: ["beef", "sharing", "35 min", "new idea"],
    equipment: ["mixing bowl", "large skillet", "instant-read thermometer"],
    ingredients: [
      { amount: 500, unit: "g", item: "ground beef" },
      { amount: 1, unit: "tsp", item: "ground cumin" },
      { amount: 1, unit: "tsp", item: "ground coriander" },
      { amount: 0.5, unit: "tsp", item: "smoked paprika" },
      { amount: 2, unit: "cloves", item: "garlic, grated" },
      { amount: 1, unit: "small", item: "red onion, thinly sliced" },
      { amount: 3, unit: "tbsp", item: "red wine vinegar" },
      { amount: 1, unit: "tsp", item: "sugar" },
      { amount: 120, unit: "g", item: "plain yoghurt" },
      { amount: 4, unit: "", item: "flatbreads, warmed" },
      { amount: 1, unit: "handful", item: "fresh herbs" },
    ],
    steps: [
      "Toss red onion with vinegar, sugar, and a pinch of salt. Set aside while you cook.",
      "Mix beef with cumin, coriander, smoked paprika, garlic, and 1 teaspoon salt. Shape into 8 short logs.",
      "Heat a large skillet over medium-high heat. Cook kofta, turning often, until browned all over.",
      "Continue cooking until the center reaches 71 C / 160 F. Rest for 3 minutes.",
      "Serve in warm flatbreads with yoghurt, herbs, and pickled onions.",
    ],
    notes: [
      "Storage: Refrigerate cooked kofta promptly and reheat until steaming hot.",
      "Variation: Add grated cucumber and lemon zest to the yoghurt.",
    ],
    glossary: ["Macerate", "Rest"],
    indexIngredients: ["ground beef", "cumin", "red onion", "yoghurt", "flatbread"],
  },
  {
    id: "tomato-peach-burrata-toasts",
    title: "Tomato Peach Burrata Toasts",
    chapter: "No-Cook and Low-Cook",
    origin: "New idea",
    status: "Ready to cook",
    subtitle:
      "A summer plate of juicy tomatoes, ripe peach, creamy burrata, basil oil, and crisp toast.",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80",
    yield: "2 servings",
    activeTime: "15 min",
    totalTime: "15 min",
    tags: ["vegetarian", "no cook", "15 min", "new idea"],
    equipment: ["mixing bowl", "small knife", "toaster"],
    ingredients: [
      { amount: 250, unit: "g", item: "ripe tomatoes, sliced" },
      { amount: 1, unit: "", item: "ripe peach, sliced" },
      { amount: 1, unit: "ball", item: "burrata" },
      { amount: 2, unit: "tbsp", item: "olive oil" },
      { amount: 1, unit: "tsp", item: "red wine vinegar" },
      { amount: 1, unit: "handful", item: "basil leaves, torn" },
      { amount: 2, unit: "thick slices", item: "toast or focaccia" },
      { amount: null, unit: "", item: "flaky salt and black pepper" },
    ],
    steps: [
      "Toss tomatoes and peach with vinegar, half the olive oil, a pinch of salt, and black pepper.",
      "Let the fruit sit for 5 minutes until glossy and juicy.",
      "Tear burrata over toast or focaccia.",
      "Spoon tomatoes, peach, and their juices over the burrata.",
      "Finish with basil, remaining olive oil, flaky salt, and more black pepper.",
    ],
    notes: [
      "Serving: Eat immediately so the toast stays crisp.",
      "Variation: Add toasted pistachios or thinly sliced chilli.",
    ],
    glossary: ["Headnote", "Macerate"],
    indexIngredients: ["tomatoes", "peach", "burrata", "basil", "focaccia"],
  },
  {
    id: "brown-butter-banana-oat-skillet-cake",
    title: "Brown Butter Banana Oat Skillet Cake",
    chapter: "Sweet Things",
    origin: "New idea",
    status: "Ready to cook",
    subtitle:
      "A soft banana cake with toasted oats, brown butter, and crisp edges from the skillet.",
    image:
      "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=1200&q=80",
    yield: "8 slices",
    activeTime: "20 min",
    totalTime: "45 min",
    tags: ["dessert", "baking", "make ahead", "new idea"],
    equipment: ["20 cm ovenproof skillet", "mixing bowl", "whisk"],
    ingredients: [
      { amount: 85, unit: "g", item: "unsalted butter" },
      { amount: 2, unit: "", item: "ripe bananas, mashed" },
      { amount: 90, unit: "g", item: "brown sugar" },
      { amount: 1, unit: "", item: "egg" },
      { amount: 1, unit: "tsp", item: "vanilla extract" },
      { amount: 120, unit: "g", item: "plain flour" },
      { amount: 60, unit: "g", item: "rolled oats" },
      { amount: 1, unit: "tsp", item: "baking powder" },
      { amount: 0.5, unit: "tsp", item: "fine salt" },
      { amount: 80, unit: "ml", item: "milk" },
    ],
    steps: [
      "Heat the oven to 180 C / 350 F. Melt butter in the skillet over medium heat until it smells nutty and turns amber.",
      "Pour most of the brown butter into a bowl, leaving enough to coat the skillet.",
      "Whisk banana, brown sugar, egg, vanilla, and milk into the butter.",
      "Fold in flour, oats, baking powder, and salt until no dry patches remain.",
      "Scrape batter into the skillet and bake until the center springs back lightly, 22 to 26 minutes.",
    ],
    notes: [
      "Storage: Keep covered at room temperature for 2 days.",
      "Serving: Excellent warm with yoghurt, creme fraiche, or vanilla ice cream.",
    ],
    glossary: ["Fold", "Rest"],
    indexIngredients: ["banana", "brown butter", "oats", "brown sugar", "vanilla"],
  },
  {
    id: "green-olive-lemon-chickpea-salad",
    title: "Green Olive, Lemon and Chickpea Salad",
    chapter: "No-Cook and Low-Cook",
    origin: "New idea",
    status: "Ready to cook",
    subtitle:
      "A punchy lunchbox salad with chickpeas, olives, celery, lemon, parsley, and a mustardy dressing.",
    image:
      "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?auto=format&fit=crop&w=1200&q=80",
    yield: "3 servings",
    activeTime: "15 min",
    totalTime: "15 min",
    tags: ["vegan", "no cook", "lunch", "new idea"],
    equipment: ["mixing bowl", "small jar", "knife"],
    ingredients: [
      { amount: 400, unit: "g", item: "canned chickpeas, drained and rinsed" },
      { amount: 80, unit: "g", item: "green olives, sliced" },
      { amount: 2, unit: "stalks", item: "celery, finely sliced" },
      { amount: 1, unit: "small", item: "shallot, finely diced" },
      { amount: 1, unit: "", item: "lemon, zest and juice" },
      { amount: 2, unit: "tbsp", item: "olive oil" },
      { amount: 1, unit: "tsp", item: "Dijon mustard" },
      { amount: 1, unit: "handful", item: "parsley, chopped" },
      { amount: null, unit: "", item: "black pepper" },
    ],
    steps: [
      "Shake lemon juice, lemon zest, olive oil, Dijon mustard, and black pepper in a small jar.",
      "Combine chickpeas, olives, celery, shallot, and parsley in a mixing bowl.",
      "Pour over the dressing and toss until glossy.",
      "Let sit for 10 minutes if you have time, then taste and adjust with more lemon or pepper.",
      "Serve as a salad, toast topping, or flatbread filling.",
    ],
    notes: [
      "Storage: Refrigerate for up to 3 days.",
      "Variation: Add tuna, feta, or roasted peppers if desired.",
    ],
    glossary: ["Macerate", "Emulsify"],
    indexIngredients: ["chickpeas", "green olives", "celery", "shallot", "parsley"],
  },
];

const dessertImages = {
  cake: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80",
  pastry: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=1200&q=80",
  bread: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
  biscuits: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1200&q=80",
  pies: "https://images.unsplash.com/photo-1572383672419-ab35444a6934?auto=format&fit=crop&w=1200&q=80",
};

function makeDessertRecipe({
  category,
  title,
  subtitle,
  image,
  yieldText,
  activeTime,
  totalTime,
  tags,
  equipment,
  ingredients,
  steps,
  notes,
  glossaryTerms,
  indexIngredients,
}) {
  return {
    id: `dessert-${slugRecipe(category)}-${slugRecipe(title)}`,
    title,
    chapter: category,
    origin: "Dessert collection",
    status: "Ready to bake",
    subtitle,
    image,
    yield: yieldText,
    activeTime,
    totalTime,
    tags: ["dessert", category.toLowerCase(), ...tags],
    equipment,
    ingredients,
    steps,
    notes,
    glossary: glossaryTerms,
    indexIngredients: [category, ...indexIngredients],
  };
}

const cakeBases = [
  ["Lemon", "lemon zest and juice", "bright citrus crumb"],
  ["Vanilla Bean", "vanilla bean paste", "soft buttery crumb"],
  ["Chocolate Fudge", "cocoa powder and dark chocolate", "deep cocoa richness"],
  ["Coffee Walnut", "espresso powder and chopped walnuts", "old-fashioned cafe flavor"],
  ["Carrot Spice", "grated carrot and mixed spice", "warm spice and tender crumb"],
  ["Orange Almond", "orange zest and ground almonds", "fragrant nutty sweetness"],
];

const cakeForms = ["Drizzle Cake", "Layer Cake", "Loaf Cake", "Traybake", "Bundt Cake"];

function buildCakeDesserts() {
  return cakeBases.flatMap(([flavour, feature, promise]) =>
    cakeForms.map((form) =>
      makeDessertRecipe({
        category: "Cake",
        title: `${flavour} ${form}`,
        subtitle: `A polished ${form.toLowerCase()} with ${feature}, made for a generous afternoon slice and a ${promise}.`,
        image: dessertImages.cake,
        yieldText: form === "Layer Cake" ? "10 slices" : "8 slices",
        activeTime: "25 min",
        totalTime: form === "Layer Cake" ? "1 hr 10 min" : "55 min",
        tags: ["cake", "baking", "afternoon tea"],
        equipment: ["mixing bowl", "electric whisk", "cake tin", "wire rack"],
        ingredients: [
          { amount: 180, unit: "g", item: "unsalted butter, room temperature" },
          { amount: 180, unit: "g", item: "caster sugar" },
          { amount: 3, unit: "", item: "large eggs" },
          { amount: 180, unit: "g", item: "self-raising flour" },
          { amount: 1, unit: "tsp", item: "baking powder" },
          { amount: 1, unit: "pinch", item: "fine salt" },
          { amount: 2, unit: "tbsp", item: feature },
          { amount: 2, unit: "tbsp", item: "milk, plus more if needed" },
          { amount: 80, unit: "g", item: "icing sugar, for finishing" },
        ],
        steps: [
          "Heat the oven to 180 C / 350 F. Grease and line the tin that best suits the cake form.",
          "Beat butter and sugar until pale and fluffy, scraping down the bowl so no dense pockets remain.",
          "Beat in eggs one at a time, then fold in flour, baking powder, salt, and the featured flavoring.",
          "Loosen with milk until the batter drops softly from the spoon, then scrape into the prepared tin.",
          "Bake until risen, golden, and a skewer inserted into the center comes out clean. Cool before icing.",
        ],
        notes: [
          "Storage: Keep covered at room temperature for 2 days or refrigerate for 4 days.",
          "Variation: Add a thin layer of jam, curd, buttercream, or glaze to suit the flavor.",
        ],
        glossaryTerms: ["Fold", "Rest"],
        indexIngredients: [flavour, feature, "self-raising flour", "butter", "eggs"],
      }),
    ),
  );
}

const pastryBases = [
  ["Apple Cinnamon", "diced apple and cinnamon sugar", "warm orchard filling"],
  ["Raspberry Almond", "raspberries and almond cream", "bright berry sharpness"],
  ["Chocolate Hazelnut", "dark chocolate and chopped hazelnuts", "rich patisserie flavor"],
  ["Pear Ginger", "ripe pear and stem ginger", "gentle heat and fruit"],
  ["Custard Rhubarb", "thick vanilla custard and rhubarb", "creamy tang"],
  ["Apricot Pistachio", "apricot jam and pistachios", "glossy fruit and crunch"],
];

const pastryForms = ["Turnovers", "Tartlets", "Danish Pastries", "Palmiers", "Napoleons"];

function buildPastryDesserts() {
  return pastryBases.flatMap(([flavour, filling, promise]) =>
    pastryForms.map((form) =>
      makeDessertRecipe({
        category: "Pastry",
        title: `${flavour} ${form}`,
        subtitle: `Crisp pastry filled with ${filling} for ${promise} in a bakery-style dessert.`,
        image: dessertImages.pastry,
        yieldText: form === "Napoleons" ? "6 portions" : "8 pastries",
        activeTime: "30 min",
        totalTime: "55 min",
        tags: ["pastry", "baking", "dessert"],
        equipment: ["baking sheet", "parchment paper", "rolling pin", "pastry brush"],
        ingredients: [
          { amount: 1, unit: "sheet", item: "ready-rolled puff pastry, chilled" },
          { amount: 180, unit: "g", item: filling },
          { amount: 2, unit: "tbsp", item: "caster sugar" },
          { amount: 1, unit: "", item: "egg, beaten" },
          { amount: 1, unit: "tbsp", item: "plain flour, for dusting" },
          { amount: 2, unit: "tbsp", item: "icing sugar, for dusting" },
          { amount: 1, unit: "pinch", item: "fine salt" },
        ],
        steps: [
          "Heat the oven to 200 C / 400 F and line a baking sheet with parchment.",
          "Unroll the pastry on a lightly floured surface and cut or fold it according to the pastry form.",
          "Spoon the filling onto the pastry, leaving clean borders so the edges seal or rise neatly.",
          "Brush exposed pastry with beaten egg and chill for 10 minutes to help the layers puff.",
          "Bake until deeply golden and crisp. Cool slightly, then dust with icing sugar before serving.",
        ],
        notes: [
          "Storage: Pastry is best the day it is baked, though it can be refreshed briefly in a warm oven.",
          "Variation: Add lemon zest, orange zest, chopped nuts, or a little jam under the filling.",
        ],
        glossaryTerms: ["Rest", "Fold"],
        indexIngredients: [flavour, filling, "puff pastry", "egg wash", "icing sugar"],
      }),
    ),
  );
}

const breadBases = [
  ["Cinnamon Raisin", "raisins and cinnamon sugar", "classic sweet-shop warmth"],
  ["Chocolate Orange", "dark chocolate chips and orange zest", "rich breakfast treat"],
  ["Cardamom Vanilla", "ground cardamom and vanilla", "soft Scandinavian-style sweetness"],
  ["Lemon Blueberry", "blueberries and lemon zest", "fresh fruit brightness"],
  ["Apple Toffee", "diced apple and toffee pieces", "sticky autumn comfort"],
  ["Banana Walnut", "mashed banana and chopped walnuts", "tender nutty sweetness"],
];

const breadForms = ["Sweet Bread", "Brioche Buns", "Swirl Loaf", "Tea Bread", "Pull-Apart Bread"];

function buildBreadDesserts() {
  return breadBases.flatMap(([flavour, filling, promise]) =>
    breadForms.map((form) =>
      makeDessertRecipe({
        category: "Bread",
        title: `${flavour} ${form}`,
        subtitle: `A dessert bread with ${filling}, baked for ${promise} and a soft enriched crumb.`,
        image: dessertImages.bread,
        yieldText: form === "Brioche Buns" ? "10 buns" : "1 loaf",
        activeTime: "35 min",
        totalTime: "2 hr 35 min",
        tags: ["bread", "sweet bread", "baking"],
        equipment: ["mixing bowl", "loaf tin or baking tray", "dough scraper", "wire rack"],
        ingredients: [
          { amount: 500, unit: "g", item: "strong white bread flour" },
          { amount: 7, unit: "g", item: "instant yeast" },
          { amount: 60, unit: "g", item: "caster sugar" },
          { amount: 1, unit: "tsp", item: "fine salt" },
          { amount: 250, unit: "ml", item: "warm milk" },
          { amount: 75, unit: "g", item: "unsalted butter, softened" },
          { amount: 1, unit: "", item: "large egg" },
          { amount: 160, unit: "g", item: filling },
        ],
        steps: [
          "Mix flour, yeast, sugar, and salt in a bowl. Add warm milk and egg, then bring together to a soft dough.",
          "Knead in the butter a little at a time until the dough is smooth, elastic, and slightly glossy.",
          "Cover and leave to rise until doubled, about 1 hour depending on room temperature.",
          "Pat out the dough, scatter over the filling, shape for the chosen bread form, and leave to rise again.",
          "Bake at 180 C / 350 F until golden and cooked through. Cool before slicing so the crumb sets.",
        ],
        notes: [
          "Storage: Keep wrapped for 2 days or toast slices from day two onward.",
          "Variation: Brush with honey, syrup, or melted butter while warm.",
        ],
        glossaryTerms: ["Rest", "Fold"],
        indexIngredients: [flavour, filling, "bread flour", "yeast", "butter"],
      }),
    ),
  );
}

const biscuitBases = [
  ["Ginger Treacle", "ground ginger and black treacle", "deep warmth"],
  ["Lemon Poppy Seed", "lemon zest and poppy seeds", "bright crunch"],
  ["Double Chocolate", "cocoa and dark chocolate chips", "proper cocoa depth"],
  ["Vanilla Shortbread", "vanilla and rice flour", "buttery snap"],
  ["Oat Raisin", "rolled oats and raisins", "homely chew"],
  ["Almond Cherry", "almond extract and dried cherries", "sweet almond fragrance"],
];

const biscuitForms = ["Biscuits", "Sandwich Biscuits", "Thumbprints", "Shorties", "Crisp Biscuits"];

function buildBiscuitDesserts() {
  return biscuitBases.flatMap(([flavour, feature, promise]) =>
    biscuitForms.map((form) =>
      makeDessertRecipe({
        category: "Biscuits",
        title: `${flavour} ${form}`,
        subtitle: `A biscuit tin favorite with ${feature}, baked for ${promise} and a neat finish.`,
        image: dessertImages.biscuits,
        yieldText: "24 biscuits",
        activeTime: "25 min",
        totalTime: "45 min",
        tags: ["biscuits", "cookies", "baking", "afternoon tea"],
        equipment: ["mixing bowl", "baking sheets", "parchment paper", "wire rack"],
        ingredients: [
          { amount: 150, unit: "g", item: "unsalted butter, room temperature" },
          { amount: 95, unit: "g", item: "caster sugar" },
          { amount: 1, unit: "", item: "egg yolk" },
          { amount: 220, unit: "g", item: "plain flour" },
          { amount: 1, unit: "pinch", item: "fine salt" },
          { amount: 2, unit: "tbsp", item: feature },
          { amount: 2, unit: "tbsp", item: "demerara sugar or icing sugar, to finish" },
        ],
        steps: [
          "Heat the oven to 170 C / 340 F and line two baking sheets with parchment.",
          "Beat butter and sugar until creamy, then mix in the egg yolk.",
          "Stir in flour, salt, and the featured flavoring until a soft dough forms.",
          "Shape the dough for the biscuit form, spacing pieces apart so they bake evenly.",
          "Bake until the edges are set and lightly golden. Cool on the tray for 5 minutes, then move to a rack.",
        ],
        notes: [
          "Storage: Keep in an airtight tin for up to 5 days.",
          "Variation: Dip half of each biscuit in melted chocolate once cool.",
        ],
        glossaryTerms: ["Rest", "Fold"],
        indexIngredients: [flavour, feature, "plain flour", "butter", "caster sugar"],
      }),
    ),
  );
}

const pieBases = [
  ["Apple Blackberry", "apples and blackberries", "sharp autumn fruit"],
  ["Cherry Almond", "cherries and almond extract", "Bakewell-style fragrance"],
  ["Lemon Meringue", "lemon curd filling and meringue", "bright citrus lift"],
  ["Chocolate Silk", "dark chocolate custard", "smooth dinner-party richness"],
  ["Pear Frangipane", "pears and almond frangipane", "elegant nutty sweetness"],
  ["Treacle Walnut", "golden syrup and walnuts", "sticky old-school comfort"],
];

const pieForms = ["Pie", "Hand Pies", "Slab Pie", "Mini Pies", "Deep-Dish Pie"];

function buildPieDesserts() {
  return pieBases.flatMap(([flavour, filling, promise]) =>
    pieForms.map((form) =>
      makeDessertRecipe({
        category: "Pies",
        title: `${flavour} ${form}`,
        subtitle: `A generous ${form.toLowerCase()} filled with ${filling}, made for ${promise} and a crisp pastry edge.`,
        image: dessertImages.pies,
        yieldText: form === "Hand Pies" || form === "Mini Pies" ? "8 pies" : "8 slices",
        activeTime: "35 min",
        totalTime: "1 hr 20 min",
        tags: ["pies", "pastry", "baking", "dessert"],
        equipment: ["pie dish or baking sheet", "rolling pin", "mixing bowl", "pastry brush"],
        ingredients: [
          { amount: 500, unit: "g", item: "shortcrust pastry, chilled" },
          { amount: 450, unit: "g", item: filling },
          { amount: 90, unit: "g", item: "caster sugar" },
          { amount: 1, unit: "tbsp", item: "cornflour" },
          { amount: 1, unit: "pinch", item: "fine salt" },
          { amount: 1, unit: "", item: "egg, beaten" },
          { amount: 1, unit: "tbsp", item: "demerara sugar, for sprinkling" },
        ],
        steps: [
          "Heat the oven to 190 C / 375 F. Roll the pastry on a lightly floured surface.",
          "Line the dish or cut shapes for the chosen pie form, keeping the pastry cool as you work.",
          "Toss the filling with sugar, cornflour, and salt, then spoon it into the pastry.",
          "Top, seal, crimp, and brush with beaten egg. Cut vents in covered pies so steam can escape.",
          "Bake until the pastry is golden and the filling bubbles at the center. Rest before serving.",
        ],
        notes: [
          "Storage: Keep covered in the refrigerator for up to 3 days.",
          "Serving: Best slightly warm with cream, custard, or ice cream.",
        ],
        glossaryTerms: ["Rest", "Reduction"],
        indexIngredients: [flavour, filling, "shortcrust pastry", "egg wash", "caster sugar"],
      }),
    ),
  );
}

const dessertRecipeLibrary = [
  ...buildCakeDesserts(),
  ...buildPastryDesserts(),
  ...buildBreadDesserts(),
  ...buildBiscuitDesserts(),
  ...buildPieDesserts(),
];

const combinedRecipeLibrary = [
  ...curatedRecipes,
  ...generatedRecipeLibrary,
  ...dessertRecipeLibrary,
];

const artStyles = {
  cake: {
    label: "Cake",
    bg: "#fff2e7",
    wash: "#f7c6a3",
    accent: "#9d3f35",
    deep: "#5b2f31",
    kind: "cake",
  },
  pastry: {
    label: "Pastry",
    bg: "#fff5df",
    wash: "#e5b96f",
    accent: "#b5752a",
    deep: "#694119",
    kind: "pastry",
  },
  bread: {
    label: "Bread",
    bg: "#fff6df",
    wash: "#d9a05d",
    accent: "#9a5f2f",
    deep: "#60401f",
    kind: "bread",
  },
  biscuits: {
    label: "Biscuits",
    bg: "#fbf0df",
    wash: "#d7ad74",
    accent: "#8d5f37",
    deep: "#533822",
    kind: "biscuits",
  },
  pies: {
    label: "Pies",
    bg: "#fff0e6",
    wash: "#d88a72",
    accent: "#a64a43",
    deep: "#613034",
    kind: "pie",
  },
  soup: {
    label: "Soup",
    bg: "#fff5e8",
    wash: "#e8a04f",
    accent: "#c4513d",
    deep: "#6b3227",
    kind: "bowl",
  },
  pasta: {
    label: "Pasta",
    bg: "#fff8dc",
    wash: "#e8c45d",
    accent: "#bb7e28",
    deep: "#5d4120",
    kind: "noodles",
  },
  salad: {
    label: "Fresh",
    bg: "#f3faed",
    wash: "#a9cf89",
    accent: "#637b46",
    deep: "#304125",
    kind: "salad",
  },
  roast: {
    label: "Traybake",
    bg: "#fff0e6",
    wash: "#df896d",
    accent: "#a9543a",
    deep: "#5d3025",
    kind: "tray",
  },
  bowl: {
    label: "Bowl",
    bg: "#eef8f4",
    wash: "#8cc9b6",
    accent: "#23536a",
    deep: "#1f3d4d",
    kind: "bowl",
  },
  sweet: {
    label: "Sweet",
    bg: "#fff0f5",
    wash: "#d994ad",
    accent: "#9d4b68",
    deep: "#5c2d42",
    kind: "cake",
  },
  plate: {
    label: "Recipe",
    bg: "#fffaf0",
    wash: "#d7e7df",
    accent: "#23536a",
    deep: "#2b2624",
    kind: "plate",
  },
};

function getArtStyle(recipe) {
  const key = `${recipe.chapter} ${(recipe.tags || []).join(" ")} ${recipe.title}`.toLowerCase();
  if (key.includes("cake")) return artStyles.cake;
  if (key.includes("pastry") || key.includes("danish") || key.includes("turnover")) return artStyles.pastry;
  if (key.includes("bread") || key.includes("brioche") || key.includes("loaf")) return artStyles.bread;
  if (key.includes("biscuit") || key.includes("cookie") || key.includes("shortbread")) return artStyles.biscuits;
  if (key.includes("pie") || key.includes("frangipane")) return artStyles.pies;
  if (key.includes("soup") || key.includes("stew")) return artStyles.soup;
  if (key.includes("pasta") || key.includes("noodle") || key.includes("orzo") || key.includes("gnocchi")) return artStyles.pasta;
  if (key.includes("salad") || key.includes("no-cook")) return artStyles.salad;
  if (key.includes("tray") || key.includes("roast") || key.includes("kofta")) return artStyles.roast;
  if (key.includes("bowl") || key.includes("grain") || key.includes("rice")) return artStyles.bowl;
  if (key.includes("sweet") || key.includes("dessert")) return artStyles.sweet;
  return artStyles.plate;
}

function escapeSvg(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function titleLines(title) {
  const words = String(title).split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > 22 && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

function ingredientLabels(recipe) {
  const labels = (recipe.indexIngredients || recipe.tags || [])
    .map((item) => String(item).replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .filter((item) => item.length <= 24)
    .slice(0, 3);
  return labels.length ? labels : [recipe.chapter];
}

function foodIcon(kind, accent, wash, deep) {
  if (kind === "cake") {
    return `
      <rect x="710" y="392" width="300" height="110" rx="20" fill="${deep}" opacity="0.18"/>
      <rect x="690" y="345" width="340" height="86" rx="18" fill="${wash}"/>
      <rect x="720" y="295" width="280" height="74" rx="16" fill="#fff7ed"/>
      <path d="M722 352 C770 386 826 320 876 352 C926 384 970 330 1000 352" fill="none" stroke="${accent}" stroke-width="18" stroke-linecap="round"/>
      <circle cx="760" cy="283" r="18" fill="${accent}"/>
      <circle cx="858" cy="269" r="18" fill="${accent}"/>
      <circle cx="955" cy="283" r="18" fill="${accent}"/>
    `;
  }
  if (kind === "pastry") {
    return `
      <path d="M700 392 L848 260 L1030 392 L882 525 Z" fill="${wash}"/>
      <path d="M742 392 L850 300 L988 392 L880 482 Z" fill="#fff7e6"/>
      <path d="M760 390 C828 350 900 350 970 390" fill="none" stroke="${accent}" stroke-width="18" stroke-linecap="round"/>
      <path d="M748 444 C826 410 900 410 976 444" fill="none" stroke="${deep}" stroke-width="10" opacity="0.35"/>
    `;
  }
  if (kind === "bread") {
    return `
      <ellipse cx="862" cy="430" rx="218" ry="108" fill="${deep}" opacity="0.14"/>
      <path d="M678 406 C702 285 830 254 910 284 C1016 324 1054 448 996 505 C932 568 724 536 686 464 C676 446 673 426 678 406 Z" fill="${wash}"/>
      <path d="M770 326 C746 382 748 430 776 476" fill="none" stroke="#fff6dd" stroke-width="22" stroke-linecap="round"/>
      <path d="M868 300 C832 372 834 432 874 500" fill="none" stroke="#fff6dd" stroke-width="22" stroke-linecap="round"/>
      <path d="M954 338 C928 388 930 434 960 480" fill="none" stroke="#fff6dd" stroke-width="20" stroke-linecap="round"/>
    `;
  }
  if (kind === "biscuits") {
    return `
      <circle cx="782" cy="405" r="92" fill="${wash}"/>
      <circle cx="930" cy="405" r="92" fill="#f4d6a6"/>
      <circle cx="828" cy="515" r="86" fill="#e6b97b"/>
      <circle cx="750" cy="388" r="10" fill="${deep}"/>
      <circle cx="805" cy="430" r="9" fill="${deep}"/>
      <circle cx="920" cy="370" r="9" fill="${deep}"/>
      <circle cx="956" cy="425" r="10" fill="${deep}"/>
      <circle cx="810" cy="502" r="9" fill="${deep}"/>
      <circle cx="856" cy="546" r="8" fill="${deep}"/>
    `;
  }
  if (kind === "pie") {
    return `
      <ellipse cx="864" cy="460" rx="222" ry="92" fill="${deep}" opacity="0.14"/>
      <path d="M670 430 C700 292 1015 292 1058 430 C1010 520 726 524 670 430 Z" fill="${wash}"/>
      <path d="M724 368 L1010 468 M784 326 L1036 430 M678 424 L948 314" stroke="#fff0d3" stroke-width="18" stroke-linecap="round"/>
      <path d="M702 432 C772 458 952 462 1030 432" fill="none" stroke="${accent}" stroke-width="18" stroke-linecap="round"/>
    `;
  }
  if (kind === "noodles") {
    return `
      <path d="M684 392 C720 548 1000 548 1038 392 Z" fill="${deep}" opacity="0.18"/>
      <ellipse cx="861" cy="392" rx="190" ry="74" fill="#fff8e5"/>
      <path d="M742 386 C790 348 834 430 882 386 C924 348 966 430 1008 386" fill="none" stroke="${wash}" stroke-width="16" stroke-linecap="round"/>
      <path d="M754 426 C816 390 886 468 958 420" fill="none" stroke="${accent}" stroke-width="12" stroke-linecap="round"/>
      <circle cx="800" cy="376" r="14" fill="${accent}"/>
      <circle cx="928" cy="404" r="14" fill="${accent}"/>
    `;
  }
  if (kind === "salad") {
    return `
      <ellipse cx="862" cy="448" rx="214" ry="92" fill="${deep}" opacity="0.14"/>
      <ellipse cx="862" cy="400" rx="202" ry="94" fill="#fffaf0"/>
      <path d="M748 410 C748 328 836 322 846 396 C808 448 766 456 748 410 Z" fill="${wash}"/>
      <path d="M850 404 C842 320 944 316 956 394 C916 452 872 458 850 404 Z" fill="${accent}"/>
      <circle cx="786" cy="392" r="18" fill="#d95148"/>
      <circle cx="932" cy="384" r="18" fill="#f0c969"/>
      <circle cx="884" cy="426" r="14" fill="#d95148"/>
    `;
  }
  if (kind === "tray") {
    return `
      <rect x="680" y="312" width="360" height="236" rx="34" fill="${deep}" opacity="0.18"/>
      <rect x="704" y="284" width="324" height="236" rx="30" fill="#fff8ec" stroke="${accent}" stroke-width="14"/>
      <circle cx="780" cy="366" r="34" fill="${wash}"/>
      <circle cx="892" cy="360" r="38" fill="${accent}"/>
      <circle cx="816" cy="454" r="34" fill="#6f8a4d"/>
      <circle cx="946" cy="450" r="36" fill="${wash}"/>
    `;
  }
  if (kind === "bowl") {
    return `
      <path d="M684 390 C722 550 1000 550 1038 390 Z" fill="${deep}" opacity="0.16"/>
      <ellipse cx="862" cy="392" rx="196" ry="78" fill="#fffaf0"/>
      <ellipse cx="862" cy="392" rx="150" ry="48" fill="${wash}"/>
      <circle cx="792" cy="376" r="22" fill="${accent}"/>
      <circle cx="902" cy="390" r="20" fill="#f0c969"/>
      <path d="M760 426 C820 394 900 460 964 416" fill="none" stroke="${deep}" stroke-width="12" stroke-linecap="round" opacity="0.45"/>
    `;
  }
  return `
    <ellipse cx="862" cy="440" rx="212" ry="104" fill="${deep}" opacity="0.14"/>
    <circle cx="862" cy="390" r="132" fill="#fffaf0"/>
    <circle cx="862" cy="390" r="84" fill="${wash}"/>
    <path d="M790 410 C836 350 902 350 946 410" fill="none" stroke="${accent}" stroke-width="18" stroke-linecap="round"/>
  `;
}

function recipeArtwork(recipe) {
  const style = getArtStyle(recipe);
  const lines = titleLines(recipe.title);
  const labels = ingredientLabels(recipe);
  const titleMarkup = lines
    .map((line, index) => `<tspan x="92" dy="${index === 0 ? 0 : 70}">${escapeSvg(line)}</tspan>`)
    .join("");
  const labelMarkup = labels
    .map((label, index) => {
      const y = 660 + index * 48;
      return `
        <rect x="92" y="${y - 28}" width="${Math.min(330, 96 + label.length * 10)}" height="36" rx="18" fill="#fffaf0" opacity="0.76"/>
        <text x="112" y="${y - 4}" fill="${style.deep}" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="700">${escapeSvg(label)}</text>
      `;
    })
    .join("");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${style.bg}"/>
          <stop offset="1" stop-color="#fffaf0"/>
        </linearGradient>
        <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse">
          <path d="M44 0H0V44" fill="none" stroke="${style.deep}" stroke-opacity="0.05" stroke-width="2"/>
        </pattern>
      </defs>
      <rect width="1200" height="900" fill="url(#bg)"/>
      <rect width="1200" height="900" fill="url(#grid)"/>
      <circle cx="992" cy="146" r="238" fill="${style.wash}" opacity="0.24"/>
      <circle cx="930" cy="706" r="148" fill="${style.accent}" opacity="0.12"/>
      <rect x="58" y="54" width="1084" height="792" rx="40" fill="#fffdf8" opacity="0.58" stroke="${style.deep}" stroke-opacity="0.14"/>
      <text x="92" y="146" fill="${style.accent}" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="900" letter-spacing="3">${escapeSvg(style.label.toUpperCase())}</text>
      <line x1="92" y1="178" x2="470" y2="178" stroke="${style.accent}" stroke-width="6" stroke-linecap="round"/>
      <text x="92" y="292" fill="${style.deep}" font-family="Georgia, 'Times New Roman', serif" font-size="66" font-weight="700">${titleMarkup}</text>
      ${labelMarkup}
      ${foodIcon(style.kind, style.accent, style.wash, style.deep)}
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export const starterRecipes = combinedRecipeLibrary.map((recipe) => ({
  ...recipe,
  image: recipeArtwork(recipe),
}));
