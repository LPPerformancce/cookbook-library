import { glossary, safetySources, starterRecipes } from "./data.js?v=combined-book-1";

const importedKey = "chatCookbook.importedRecipes";
const completedKey = "chatCookbook.completed";
const savedKey = "chatCookbook.saved";
const stepsKey = "chatCookbook.steps";

const app = document.querySelector("#app");

let state = {
  view: "recipes",
  query: "",
  tag: "all",
  activeId: starterRecipes[0].id,
  multiplier: 1,
  imported: loadJson(importedKey, []),
  completed: new Set(loadJson(completedKey, [])),
  saved: new Set(loadJson(savedKey, [])),
  steps: loadJson(stepsKey, {}),
  importMessage: "",
};

function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function allRecipes() {
  return [...state.imported, ...starterRecipes];
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function getTags() {
  return unique(allRecipes().flatMap((recipe) => recipe.tags || [])).sort((a, b) =>
    a.localeCompare(b),
  );
}

function getActiveRecipe() {
  const recipes = allRecipes();
  return recipes.find((recipe) => recipe.id === state.activeId) || recipes[0];
}

function getFilteredRecipes() {
  const query = state.query.trim().toLowerCase();
  return allRecipes().filter((recipe) => {
    const haystack = [
      recipe.title,
      recipe.subtitle,
      recipe.chapter,
      recipe.origin,
      ...(recipe.tags || []),
      ...(recipe.indexIngredients || []),
    ]
      .join(" ")
      .toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    const matchesTag = state.tag === "all" || (recipe.tags || []).includes(state.tag);
    return matchesQuery && matchesTag;
  });
}

function formatAmount(amount) {
  if (amount === null || amount === undefined || amount === "") return "";
  const scaled = Number(amount) * state.multiplier;
  if (!Number.isFinite(scaled)) return amount;
  const rounded = Math.round(scaled * 4) / 4;
  const whole = Math.trunc(rounded);
  const fraction = Math.round((rounded - whole) * 4);
  const fractionMap = ["", "1/4", "1/2", "3/4"];
  if (rounded === 0) return "";
  if (fraction === 0) return String(whole);
  if (whole === 0) return fractionMap[fraction];
  return `${whole} ${fractionMap[fraction]}`;
}

function renderIngredient(ingredient) {
  const amount = formatAmount(ingredient.amount);
  const unit = ingredient.unit ? `${escapeHtml(ingredient.unit)} ` : "";
  const prefix = amount ? `${escapeHtml(amount)} ${unit}` : unit;
  return `<li>${prefix}${escapeHtml(ingredient.item)}</li>`;
}

function render(options = {}) {
  const recipes = getFilteredRecipes();
  const active = getActiveRecipe();
  if (!recipes.some((recipe) => recipe.id === active.id) && recipes[0]) {
    state.activeId = recipes[0].id;
  }

  app.innerHTML = `
    <div class="cookbook-shell">
      ${renderHeader()}
      <div class="cookbook-layout">
        ${renderRail(recipes)}
        <main class="main-stage">
          ${state.view === "recipes" ? renderRecipeView(getActiveRecipe(), recipes) : ""}
          ${state.view === "glossary" ? renderGlossary() : ""}
          ${state.view === "index" ? renderIndex() : ""}
          ${state.view === "import" ? renderImport() : ""}
        </main>
      </div>
    </div>
  `;

  if (options.focusSearch) {
    const searchInput = document.querySelector("#search");
    if (searchInput) {
      const start = options.selectionStart ?? searchInput.value.length;
      const end = options.selectionEnd ?? start;
      searchInput.focus();
      searchInput.setSelectionRange(start, end);
    }
  }
}

function renderHeader() {
  const total = allRecipes().length;
  const imported = state.imported.length;
  const completed = state.completed.size;
  return `
    <header class="book-header">
      <button class="brand" data-view="recipes">
        <span class="brand-mark">CB</span>
        <span>
          <strong>Your Cookbook Library</strong>
          <small>${total} recipes &middot; ${imported} imported &middot; ${completed} cooked</small>
        </span>
      </button>
      <nav class="top-nav" aria-label="Cookbook sections">
        ${navButton("recipes", "Recipes")}
        ${navButton("glossary", "Glossary")}
        ${navButton("index", "Index")}
        ${navButton("import", "Import")}
      </nav>
    </header>
  `;
}

function navButton(view, label) {
  const active = state.view === view ? "is-active" : "";
  return `<button class="${active}" data-view="${view}">${label}</button>`;
}

function renderRail(recipes) {
  const tags = getTags();
  return `
    <aside class="recipe-rail">
      <section class="search-panel">
        <label for="search">Search</label>
        <input id="search" type="search" value="${escapeHtml(state.query)}" placeholder="Recipe, ingredient, tag" />
      </section>
      <section class="tag-panel">
        <button class="${state.tag === "all" ? "is-active" : ""}" data-tag="all">All</button>
        ${tags
          .map(
            (tag) =>
              `<button class="${state.tag === tag ? "is-active" : ""}" data-tag="${escapeHtml(tag)}">${escapeHtml(tag)}</button>`,
          )
          .join("")}
      </section>
      <section class="recipe-list" aria-label="Recipes">
        ${recipes.map((recipe) => renderRecipeListItem(recipe)).join("") || renderEmptyList()}
      </section>
    </aside>
  `;
}

function renderRecipeListItem(recipe) {
  const active = recipe.id === state.activeId ? "is-active" : "";
  const completed = state.completed.has(recipe.id) ? " &middot; cooked" : "";
  return `
    <button class="recipe-list-item ${active}" data-recipe="${escapeHtml(recipe.id)}" data-view="recipes">
      <span>${escapeHtml(recipe.chapter)}</span>
      <strong>${escapeHtml(recipe.title)}</strong>
      <small>${escapeHtml(recipe.origin)}${completed}</small>
    </button>
  `;
}

function renderEmptyList() {
  return `
    <div class="empty-state">
      <strong>No recipes match.</strong>
      <span>Try another ingredient or tag.</span>
    </div>
  `;
}

function renderRecipeView(recipe) {
  const currentSteps = state.steps[recipe.id] || [];
  const completeCount = currentSteps.filter(Boolean).length;
  const progress = recipe.steps?.length ? Math.round((completeCount / recipe.steps.length) * 100) : 0;
  const isCompleted = state.completed.has(recipe.id);
  const isSaved = state.saved.has(recipe.id);

  return `
    <article class="recipe-detail">
      <div class="recipe-hero">
        <img src="${escapeHtml(recipe.image)}" alt="${escapeHtml(recipe.title)}" />
        <div class="recipe-hero-copy">
          <span class="chapter-label">${escapeHtml(recipe.chapter)} &middot; ${escapeHtml(recipe.origin)}</span>
          <h1>${escapeHtml(recipe.title)}</h1>
          <p>${escapeHtml(recipe.subtitle)}</p>
          <div class="stat-row">
            <span><strong>Yield</strong>${escapeHtml(recipe.yield)}</span>
            <span><strong>Active</strong>${escapeHtml(recipe.activeTime)}</span>
            <span><strong>Total</strong>${escapeHtml(recipe.totalTime)}</span>
          </div>
        </div>
      </div>

      <section class="control-band">
        <div class="serving-control" aria-label="Serving scale">
          <span>Scale</span>
          ${[0.5, 1, 1.5, 2].map((value) => scaleButton(value)).join("")}
        </div>
        <div class="recipe-actions">
          <button data-save="${escapeHtml(recipe.id)}">${isSaved ? "Saved" : "Save"}</button>
          <button data-complete="${escapeHtml(recipe.id)}">${isCompleted ? "Cooked" : "Mark cooked"}</button>
          <button data-reset-steps="${escapeHtml(recipe.id)}">Reset steps</button>
        </div>
      </section>

      <section class="recipe-grid">
        <div class="recipe-section ingredients-panel">
          <div class="section-heading">
            <span>Ingredients</span>
            <strong>${state.multiplier}x</strong>
          </div>
          <ul class="ingredient-list">
            ${(recipe.ingredients || []).map(renderIngredient).join("")}
          </ul>
        </div>

        <div class="recipe-section method-panel">
          <div class="section-heading">
            <span>Cook Mode</span>
            <strong>${progress}%</strong>
          </div>
          <div class="progress-track"><span style="width: ${progress}%"></span></div>
          <ol class="method-list">
            ${(recipe.steps || []).map((step, index) => renderStep(recipe.id, step, index, currentSteps[index])).join("")}
          </ol>
        </div>
      </section>

      <section class="notes-layout">
        <div class="recipe-section">
          <div class="section-heading">
            <span>Notes</span>
          </div>
          <ul class="note-list">
            ${(recipe.notes || []).map((note) => `<li>${escapeHtml(note)}</li>`).join("")}
          </ul>
        </div>
        <div class="recipe-section">
          <div class="section-heading">
            <span>Tags</span>
          </div>
          <div class="pill-row">
            ${(recipe.tags || []).map((tag) => `<button data-tag="${escapeHtml(tag)}">${escapeHtml(tag)}</button>`).join("")}
          </div>
        </div>
      </section>
    </article>
  `;
}

function scaleButton(value) {
  const active = state.multiplier === value ? "is-active" : "";
  return `<button class="${active}" data-scale="${value}">${value}x</button>`;
}

function renderStep(recipeId, step, index, done) {
  const checked = done ? "checked" : "";
  const tone = done ? "is-done" : "";
  return `
    <li class="${tone}">
      <label>
        <input type="checkbox" data-step="${index}" data-step-recipe="${escapeHtml(recipeId)}" ${checked} />
        <span>${escapeHtml(step)}</span>
      </label>
    </li>
  `;
}

function renderGlossary() {
  return `
    <section class="reference-view">
      <div class="page-title">
        <span>Back Matter</span>
        <h1>Glossary</h1>
      </div>
      <div class="glossary-grid">
        ${glossary
          .map(
            (item) => `
              <article class="reference-entry" id="term-${slugify(item.term)}">
                <h2>${escapeHtml(item.term)}</h2>
                <p>${escapeHtml(item.definition)}</p>
              </article>
            `,
          )
          .join("")}
      </div>
      <section class="source-strip">
        <strong>Food safety references</strong>
        ${safetySources.map((source) => `<a href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">${escapeHtml(source.title)}</a>`).join("")}
      </section>
    </section>
  `;
}

function buildIndex() {
  const byLetter = {};
  for (const recipe of allRecipes()) {
    const entries = [recipe.title, ...(recipe.indexIngredients || []), ...(recipe.tags || [])];
    for (const entry of entries) {
      const clean = String(entry).trim();
      if (!clean) continue;
      const letter = clean[0].toUpperCase();
      byLetter[letter] ??= [];
      byLetter[letter].push({ label: clean, recipeId: recipe.id, title: recipe.title });
    }
  }
  return Object.entries(byLetter)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([letter, entries]) => [
      letter,
      entries.sort((a, b) => a.label.localeCompare(b.label)),
    ]);
}

function renderIndex() {
  const index = buildIndex();
  return `
    <section class="reference-view">
      <div class="page-title">
        <span>Back Matter</span>
        <h1>Index</h1>
      </div>
      <div class="index-grid">
        ${index
          .map(
            ([letter, entries]) => `
              <section class="index-letter">
                <h2>${escapeHtml(letter)}</h2>
                ${entries
                  .map(
                    (entry) => `
                      <button data-recipe="${escapeHtml(entry.recipeId)}" data-view="recipes">
                        <span>${escapeHtml(entry.label)}</span>
                        <small>${escapeHtml(entry.title)}</small>
                      </button>
                    `,
                  )
                  .join("")}
              </section>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderImport() {
  return `
    <section class="import-view">
      <div class="page-title">
        <span>Past Chat Recipes</span>
        <h1>Import</h1>
      </div>
      <div class="import-grid">
        <section class="import-panel">
          <label for="chat-file">Chat export file</label>
          <input id="chat-file" type="file" accept=".json,.txt,.md,.html" />
          <label for="chat-text">Paste chat text</label>
          <textarea id="chat-text" rows="12" placeholder="Paste recipe chat text here"></textarea>
          <div class="import-actions">
            <button data-import-text>Import pasted text</button>
            <button data-clear-imports>Clear imported</button>
          </div>
          ${state.importMessage ? `<p class="import-message">${escapeHtml(state.importMessage)}</p>` : ""}
        </section>
        <section class="import-panel">
          <div class="section-heading">
            <span>Imported recipes</span>
            <strong>${state.imported.length}</strong>
          </div>
          <div class="mini-recipe-stack">
            ${
              state.imported.length
                ? state.imported.map((recipe) => renderMiniImported(recipe)).join("")
                : `<div class="empty-state"><strong>No chat recipes imported yet.</strong><span>The starter cookbook is ready while you gather the export.</span></div>`
            }
          </div>
        </section>
      </div>
    </section>
  `;
}

function renderMiniImported(recipe) {
  return `
    <button class="mini-imported" data-recipe="${escapeHtml(recipe.id)}" data-view="recipes">
      <strong>${escapeHtml(recipe.title)}</strong>
      <span>${escapeHtml(recipe.chapter)} &middot; ${escapeHtml(recipe.origin)}</span>
    </button>
  `;
}

function parseChatJson(value) {
  const messages = [];
  const visit = (node) => {
    if (!node || typeof node !== "object") return;
    if (node.message?.content?.parts) {
      messages.push(...node.message.content.parts.filter((part) => typeof part === "string"));
    }
    if (node.content?.parts) {
      messages.push(...node.content.parts.filter((part) => typeof part === "string"));
    }
    for (const child of Object.values(node)) {
      if (child && typeof child === "object") visit(child);
    }
  };
  visit(value);
  return messages.join("\n\n");
}

function extractRecipeCandidates(text, sourceName = "Chat import") {
  const normalized = String(text || "").replace(/\r\n/g, "\n");
  const blocks = normalized
    .split(/\n{2,}(?=(?:#{1,3}\s*)?[A-Z][^\n]{3,90}\n|\bRecipe\b|\bIngredients\b)/)
    .map((block) => block.trim())
    .filter(Boolean);

  const candidates = [];
  for (const block of blocks) {
    const lower = block.toLowerCase();
    const recipeSignals = ["ingredients", "method", "instructions", "yield", "serves", "bake", "simmer", "roast", "cook"];
    const signalCount = recipeSignals.filter((signal) => lower.includes(signal)).length;
    if (signalCount < 2) continue;
    candidates.push(parseRecipeBlock(block, sourceName));
  }
  return candidates.slice(0, 40);
}

function parseRecipeBlock(block, sourceName) {
  const lines = block
    .split("\n")
    .map((line) => line.trim().replace(/^[-*#\d.)\s]+/, "").trim())
    .filter(Boolean);
  const title = pickTitle(lines);
  const ingredients = extractSection(lines, /ingredients?/i, /(method|instructions?|directions?|steps?)/i);
  const steps = extractSection(lines, /(method|instructions?|directions?|steps?)/i, /(notes?|storage|variation)/i);

  return {
    id: `imported-${slugify(title)}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    title,
    chapter: "Imported From Chats",
    origin: sourceName,
    status: "Imported",
    subtitle: "Captured from your chat history and ready for a clean editorial pass.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    yield: findValue(block, /(serves|yield|makes)\s*:?\s*([^\n]+)/i) || "Not specified",
    activeTime: findValue(block, /(active time|prep time)\s*:?\s*([^\n]+)/i) || "Not specified",
    totalTime: findValue(block, /(total time|cook time)\s*:?\s*([^\n]+)/i) || "Not specified",
    tags: ["chat import"],
    equipment: [],
    ingredients: ingredients.length
      ? ingredients.map((item) => ({ amount: null, unit: "", item }))
      : [{ amount: null, unit: "", item: "Ingredient list needs editorial cleanup" }],
    steps: steps.length ? steps : ["Review the imported chat text and split the method into clear steps."],
    notes: ["Imported recipes may need yields, times, and safety checks before publication."],
    glossary: [],
    indexIngredients: ingredients.slice(0, 8).map((item) => item.replace(/^\d+(\.\d+)?\s*/, "")),
  };
}

function pickTitle(lines) {
  const blocked = /^(recipe|ingredients?|method|instructions?|directions?|steps?|yield|serves|notes?)$/i;
  return lines.find((line) => line.length > 3 && line.length < 80 && !blocked.test(line)) || "Imported Recipe";
}

function extractSection(lines, startPattern, endPattern) {
  const start = lines.findIndex((line) => startPattern.test(line));
  if (start === -1) return [];
  const out = [];
  for (let index = start + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (endPattern.test(line)) break;
    if (line.length > 2) out.push(line);
  }
  return out.slice(0, 30);
}

function findValue(text, pattern) {
  const match = text.match(pattern);
  return match?.[2]?.trim() || "";
}

function importRecipesFromText(text, sourceName) {
  const recipes = extractRecipeCandidates(text, sourceName);
  if (!recipes.length) {
    state.importMessage = "No recipe-shaped sections found.";
    render();
    return;
  }
  state.imported = [...recipes, ...state.imported];
  saveJson(importedKey, state.imported);
  state.activeId = recipes[0].id;
  state.view = "recipes";
  state.importMessage = `${recipes.length} recipe${recipes.length === 1 ? "" : "s"} imported.`;
  render();
}

app.addEventListener("input", (event) => {
  if (event.target.id === "search") {
    const selectionStart = event.target.selectionStart;
    const selectionEnd = event.target.selectionEnd;
    state.query = event.target.value;
    render({ focusSearch: true, selectionStart, selectionEnd });
  }
});

app.addEventListener("change", async (event) => {
  if (event.target.id === "chat-file") {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    let importText = text;
    if (file.name.toLowerCase().endsWith(".json")) {
      try {
        importText = parseChatJson(JSON.parse(text));
      } catch {
        state.importMessage = "JSON could not be read.";
        render();
        return;
      }
    }
    importRecipesFromText(importText, file.name);
  }
});

app.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.view) {
    state.view = button.dataset.view;
  }
  if (button.dataset.recipe) {
    state.activeId = button.dataset.recipe;
    state.view = "recipes";
    state.multiplier = 1;
  }
  if (button.dataset.tag) {
    state.tag = button.dataset.tag;
    state.view = "recipes";
  }
  if (button.dataset.scale) {
    state.multiplier = Number(button.dataset.scale);
  }
  if (button.dataset.save) {
    toggleSet(state.saved, button.dataset.save, savedKey);
  }
  if (button.dataset.complete) {
    toggleSet(state.completed, button.dataset.complete, completedKey);
  }
  if (button.dataset.resetSteps) {
    state.steps[button.dataset.resetSteps] = [];
    saveJson(stepsKey, state.steps);
  }
  if (button.dataset.importText !== undefined) {
    const text = document.querySelector("#chat-text")?.value || "";
    importRecipesFromText(text, "Pasted chat");
    return;
  }
  if (button.dataset.clearImports !== undefined) {
    state.imported = [];
    saveJson(importedKey, state.imported);
    state.importMessage = "Imported recipes cleared.";
  }
  render();
});

app.addEventListener("change", (event) => {
  if (event.target.matches("[data-step]")) {
    const recipeId = event.target.dataset.stepRecipe;
    const index = Number(event.target.dataset.step);
    state.steps[recipeId] ??= [];
    state.steps[recipeId][index] = event.target.checked;
    saveJson(stepsKey, state.steps);
    render();
  }
});

function toggleSet(set, value, key) {
  if (set.has(value)) {
    set.delete(value);
  } else {
    set.add(value);
  }
  saveJson(key, [...set]);
}

render();
