import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { starterRecipes } from "../data.js";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const cachePath = join(scriptDir, "photo-cache.json");
const outputPath = join(scriptDir, "..", "photoMap.js");
const apiUrl = "https://api.openverse.org/v1/images/";

const stopWords = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "by",
  "for",
  "from",
  "in",
  "into",
  "made",
  "of",
  "on",
  "or",
  "over",
  "the",
  "to",
  "with",
  "your",
  "quick",
  "easy",
  "ready",
  "library",
]);

const unwantedTitleWords = [
  "advert",
  "banner",
  "brand",
  "booth",
  "body",
  "cartoon",
  "ceramic",
  "clipart",
  "collage",
  "container",
  "diagram",
  "drawing",
  "flyer",
  "front",
  "game",
  "goods",
  "graphic",
  "hand",
  "icon",
  "ingredients",
  "label",
  "logo",
  "mall",
  "mart",
  "market",
  "menu",
  "museum",
  "packet",
  "packaging",
  "painting",
  "people",
  "person",
  "poster",
  "printer",
  "road",
  "sign",
  "shop",
  "shopping",
  "stand",
  "sticker",
  "street",
  "super",
  "syrup",
  "tableware",
  "tonic",
  "vector",
  "vessel",
];

const genericFoodWords = new Set([
  "bake",
  "baked",
  "biscuits",
  "bowl",
  "bowls",
  "bread",
  "breads",
  "charred",
  "cake",
  "cakes",
  "cook",
  "cookies",
  "creamy",
  "crisp",
  "crispy",
  "dessert",
  "dinner",
  "dish",
  "food",
  "foods",
  "fresh",
  "golden",
  "green",
  "herb",
  "herby",
  "loaf",
  "meal",
  "pie",
  "pies",
  "plate",
  "recipe",
  "recipes",
  "roast",
  "roasted",
  "salad",
  "slow",
  "smoky",
  "soup",
  "spiced",
  "sweet",
  "toasted",
  "tray",
  "traybake",
]);

const chapterHints = [
  ["Cake", "cake"],
  ["Pastry", "pastry"],
  ["Bread", "bread"],
  ["Biscuits", "biscuits"],
  ["Pies", "pie"],
  ["Soup", "soup"],
  ["Stew", "stew"],
  ["Pasta", "pasta"],
  ["Noodles", "noodles"],
  ["Bowl", "bowl"],
  ["Grains", "grain bowl"],
  ["Roasts", "roasted dinner"],
  ["Traybakes", "traybake"],
  ["Salad", "salad"],
  ["No-Cook", "salad"],
  ["Share", "sharing plate"],
  ["Sweet", "dessert"],
  ["Comfort", "comfort food"],
];

function loadCache() {
  try {
    return JSON.parse(readFileSync(cachePath, "utf8"));
  } catch {
    return {};
  }
}

function saveCache(cache) {
  writeFileSync(cachePath, `${JSON.stringify(cache, null, 2)}\n`);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function words(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 1 && !stopWords.has(word));
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function chapterHint(recipe) {
  const haystack = `${recipe.chapter || ""} ${(recipe.tags || []).join(" ")}`;
  const match = chapterHints.find(([needle]) => haystack.toLowerCase().includes(needle.toLowerCase()));
  return match ? match[1] : "food";
}

function conciseTitle(recipe) {
  return String(recipe.title || "")
    .replace(/\bwith\b.+$/i, "")
    .replace(/\bon\b.+$/i, "")
    .replace(/\bfor\b.+$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function ingredientPhrase(recipe) {
  return (recipe.indexIngredients || [])
    .slice(0, 3)
    .map((value) => String(value).replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join(" ");
}

function dessertFallbackQueries(recipe) {
  const title = String(recipe.title || "");
  const form = [
    "Layer Cake",
    "Loaf Cake",
    "Traybake",
    "Bundt Cake",
    "Drizzle Cake",
    "Turnovers",
    "Tartlets",
    "Danish Pastries",
    "Palmiers",
    "Napoleons",
    "Sweet Bread",
    "Brioche Buns",
    "Swirl Loaf",
    "Tea Bread",
    "Pull-Apart Bread",
    "Sandwich Biscuits",
    "Thumbprints",
    "Shorties",
    "Crisp Biscuits",
    "Biscuits",
    "Hand Pies",
    "Slab Pie",
    "Mini Pies",
    "Deep-Dish Pie",
    "Pie",
  ].find((candidate) => title.toLowerCase().endsWith(candidate.toLowerCase()));

  if (!form) return [];

  const flavour = title.slice(0, Math.max(0, title.length - form.length)).trim();
  const base = flavour || title;
  const lowerForm = form.toLowerCase();
  const normalizedForm = lowerForm
    .replace("deep-dish ", "")
    .replace("hand pies", "pie")
    .replace("slab pie", "pie")
    .replace("mini pies", "pie")
    .replace("crisp biscuits", "cookies")
    .replace("sandwich biscuits", "cookies")
    .replace("thumbprints", "thumbprint cookies")
    .replace("shorties", "shortbread cookies")
    .replace("biscuits", "cookies")
    .replace("danish pastries", "danish pastry")
    .replace("tartlets", "tart")
    .replace("napoleons", "napoleon pastry");

  return unique([
    `${base} ${normalizedForm}`,
    `${base} ${chapterHint(recipe)}`,
    `${base} dessert`,
    lowerForm.includes("bread") || lowerForm.includes("loaf") ? `${base} loaf bread` : "",
    lowerForm.includes("cake") ? `${base} cake slice` : "",
    lowerForm.includes("pie") ? `${base} fruit pie` : "",
    lowerForm.includes("pastr") || lowerForm.includes("turnover") ? `${base} pastry` : "",
    lowerForm.includes("cookie") || lowerForm.includes("biscuit") ? `${base} cookies` : "",
  ]);
}

function recipeQueries(recipe) {
  const hint = chapterHint(recipe);
  const title = recipe.title;
  const shortTitle = conciseTitle(recipe);
  const ingredients = ingredientPhrase(recipe);
  const titleTokens = words(title).slice(0, 5).join(" ");
  const firstIngredient = recipe.indexIngredients?.[0];
  const secondIngredient = recipe.indexIngredients?.[1];
  const firstIngredientTokens = words(firstIngredient).filter((word) => !genericFoodWords.has(word));
  const trimmedFirstIngredient = firstIngredientTokens.slice(1).join(" ");
  const lastFirstIngredientPair = firstIngredientTokens.slice(-2).join(" ");
  const distinctiveTokens = unique([
    ...words(title),
    ...(recipe.indexIngredients || []).flatMap(words),
  ])
    .filter((word) => !genericFoodWords.has(word))
    .slice(0, 4);
  const distinctive = distinctiveTokens.join(" ");
  const distinctivePairs = distinctiveTokens
    .flatMap((token, index) => {
      const next = distinctiveTokens[index + 1];
      const third = distinctiveTokens[index + 2];
      return [
        next ? `${token} ${next}` : "",
        next && third ? `${token} ${next} ${third}` : "",
      ];
    })
    .filter(Boolean);

  return unique([
    title,
    `"${title}"`,
    shortTitle && shortTitle !== title ? shortTitle : "",
    ...dessertFallbackQueries(recipe),
    shortTitle ? `${shortTitle} ${hint}` : "",
    firstIngredient ? `${firstIngredient} ${hint}` : "",
    trimmedFirstIngredient ? `${trimmedFirstIngredient} ${hint}` : "",
    lastFirstIngredientPair && lastFirstIngredientPair !== trimmedFirstIngredient
      ? `${lastFirstIngredientPair} ${hint}`
      : "",
    firstIngredient && secondIngredient ? `${firstIngredient} ${secondIngredient}` : "",
    trimmedFirstIngredient && secondIngredient ? `${trimmedFirstIngredient} ${secondIngredient}` : "",
    ingredients ? `${ingredients} ${hint}` : "",
    distinctive ? `${distinctive} ${hint}` : "",
    ...distinctivePairs.map((phrase) => `${phrase} ${hint}`),
    ...distinctivePairs.map((phrase) => `${phrase} food`),
    ...distinctiveTokens.map((token) => `${token} food`),
    titleTokens ? `${titleTokens} ${hint}` : "",
  ]);
}

function resultUrl(result) {
  return result?.url || result?.thumbnail;
}

function isUsableImage(result) {
  const url = resultUrl(result);
  if (!url || !/^https?:\/\//i.test(url)) return false;
  if (result.mature) return false;
  const width = Number(result.width || 0);
  const height = Number(result.height || 0);
  if (width && width < 520) return false;
  if (height && height < 390) return false;
  const title = words(result.title).join(" ");
  if (title.includes("super bowl")) return false;
  if (title.includes("food sources")) return false;
  if (unwantedTitleWords.some((word) => title.includes(word))) return false;
  return true;
}

function scoreResult(result, recipe, query) {
  const recipeTokens = new Set([
    ...words(recipe.title),
    ...words(recipe.chapter),
    ...(recipe.tags || []).flatMap(words),
    ...(recipe.indexIngredients || []).flatMap(words),
  ]);
  const importantTokens = [...recipeTokens].filter((word) => !genericFoodWords.has(word));
  const titleTokens = new Set(words(result.title));
  const queryTokens = new Set(words(query).filter((word) => !genericFoodWords.has(word)));
  const titleText = String(result.title || "").toLowerCase();
  const queryText = String(query || "").replaceAll('"', "").toLowerCase();
  const meaningfulQueryTokens = [...queryTokens].filter((word) => !genericFoodWords.has(word));
  let score = 0;
  let importantMatches = 0;

  for (const token of importantTokens) {
    if (titleTokens.has(token)) {
      score += 18;
      importantMatches += 1;
    }
  }
  for (const token of queryTokens) {
    if (titleTokens.has(token)) score += 6;
  }

  if (meaningfulQueryTokens.length > 1 && titleText.includes(queryText) && queryText.length > 4) {
    score += 36;
  }
  if (titleText.includes(chapterHint(recipe).split(" ")[0])) score += 12;
  if (Number(result.width || 0) >= 900 && Number(result.height || 0) >= 600) score += 8;
  if (Number(result.width || 0) >= 1200) score += 5;
  if (["wikimedia", "wordpress", "flickr"].includes(String(result.source || result.provider || "").toLowerCase())) {
    score += 3;
  }
  if (!titleTokens.size) score -= 12;
  if (unwantedTitleWords.some((word) => titleTokens.has(word))) score -= 80;
  if (!importantMatches) score -= 35;
  return { score, importantMatches };
}

async function openverseSearch(query, cache) {
  const key = `open-license-v2:${query.toLowerCase()}`;
  if (cache[key]) return cache[key];

  const url = new URL(apiUrl);
  url.searchParams.set("q", query);
  url.searchParams.set("page_size", "20");
  url.searchParams.set("categories", "photograph");

  for (let attempt = 0; attempt < 5; attempt += 1) {
    let response;
    try {
      response = await fetch(url, {
        headers: {
          "User-Agent": "cookbook-library-photo-curation/1.0",
        },
      });
    } catch (error) {
      const waitSeconds = Math.min(45, 5 * (attempt + 1));
      console.log(`Network hiccup; waiting ${waitSeconds}s before retrying "${query}"`);
      await sleep(waitSeconds * 1000);
      continue;
    }

    if (response.status === 429) {
      const waitSeconds = Number(response.headers.get("retry-after") || 30);
      console.log(`Rate limited; waiting ${waitSeconds}s before retrying "${query}"`);
      await sleep(waitSeconds * 1000);
      continue;
    }

    if (!response.ok) {
      throw new Error(`Openverse ${response.status} for query "${query}"`);
    }

    const payload = await response.json();
    cache[key] = payload.results || [];
    saveCache(cache);
    await sleep(220);
    return cache[key];
  }

  return [];
}

function creditFor(result, recipe, query, score) {
  const license = result.license_version
    ? `CC ${String(result.license || "").toUpperCase()} ${result.license_version}`
    : `CC ${String(result.license || "").toUpperCase()}`;

  return {
    image: resultUrl(result),
    title: result.title || recipe.title,
    creator: result.creator || "Unknown creator",
    license,
    licenseUrl: result.license_url || "",
    landingUrl: result.foreign_landing_url || result.url,
    source: result.source || result.provider || "Openverse",
    openverseUrl: result.url ? `https://openverse.org/image/${result.id}` : "",
    query,
    score,
  };
}

async function findPhoto(recipe, cache, usedUrls) {
  const fallbackCandidates = [];

  for (const query of recipeQueries(recipe)) {
    const results = await openverseSearch(query, cache);
    const scored = results
      .filter(isUsableImage)
      .map((result) => ({ result, query, ...scoreResult(result, recipe, query) }))
      .sort((a, b) => b.score - a.score);

    fallbackCandidates.push(...scored);
  }

  const strongCandidates = fallbackCandidates
    .filter(({ score, importantMatches }) => score >= 24 && importantMatches > 0)
    .sort((a, b) => b.score - a.score);
  const strong = strongCandidates.find(({ result }) => !usedUrls.has(resultUrl(result))) || strongCandidates[0];
  if (strong) {
    usedUrls.add(resultUrl(strong.result));
    return creditFor(strong.result, recipe, strong.query, strong.score);
  }

  const fallback =
    fallbackCandidates.find(
      ({ result, importantMatches }) => importantMatches > 0 && !usedUrls.has(resultUrl(result)),
    ) ||
    fallbackCandidates.find(({ importantMatches }) => importantMatches > 0) ||
    fallbackCandidates.find(({ result }) => !usedUrls.has(resultUrl(result))) ||
    fallbackCandidates[0];
  if (!fallback) {
    throw new Error(`No usable photo found for ${recipe.title}`);
  }
  usedUrls.add(resultUrl(fallback.result));
  return creditFor(fallback.result, recipe, fallback.query || "fallback", fallback.score);
}

function renderOutput(photoMap) {
  return `export const recipePhotoMap = ${JSON.stringify(photoMap, null, 2)};\n`;
}

async function loadExistingOutput() {
  try {
    const moduleUrl = new URL(`../photoMap.js?cache=${Date.now()}`, import.meta.url);
    const { recipePhotoMap } = await import(moduleUrl.href);
    return recipePhotoMap || {};
  } catch {
    return {};
  }
}

const cache = loadCache();
const existing = await loadExistingOutput();
const usedUrls = new Set(Object.values(existing).map((photo) => photo.image).filter(Boolean));

for (const [index, recipe] of starterRecipes.entries()) {
  if (existing[recipe.id]) {
    console.log(`${String(index + 1).padStart(3, "0")}/${starterRecipes.length} ${recipe.title} -> already curated`);
    continue;
  }
  const photo = await findPhoto(recipe, cache, usedUrls);
  existing[recipe.id] = photo;
  writeFileSync(outputPath, renderOutput(existing));
  console.log(`${String(index + 1).padStart(3, "0")}/${starterRecipes.length} ${recipe.title} -> ${photo.title} (${photo.source}, ${photo.score})`);
}

writeFileSync(outputPath, renderOutput(existing));
console.log(`Wrote ${Object.keys(existing).length} recipe photos to ${outputPath}`);
