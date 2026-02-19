import { useState, useEffect, useCallback } from "react";

// ─── SHELF LIFE DATABASE (days) ───────────────────────────────────────────────
const SHELF_LIFE = {
  // Indian aromatics & veg
  onions: 30,
  potatoes: 21,
  sweet_potato: 14,
  beetroot: 14,
  tomatoes: 6,
  capsicum: 7,
  brinjal: 5,
  baingan: 5,
  cauliflower: 5,
  gobi: 5,
  bottle_gourd: 7,
  lauki: 7,
  ridge_gourd: 5,
  bitter_gourd: 5,
  karela: 5,
  raw_banana: 5,
  radish: 7,
  mooli: 7,
  drumstick: 5,
  okra: 4,
  bhindi: 4,
  corn: 3,
  green_peas: 4,
  spinach: 4,
  palak: 4,
  methi: 4,
  kale: 5,
  coriander_leaves: 5,
  curry_leaves: 7,
  mint: 5,
  basil: 3,
  garlic: 30,
  ginger: 14,
  green_chillies: 7,
  shallots: 21,
  leek: 7,
  celery: 7,
  asparagus: 3,
  zucchini: 5,
  broccoli: 4,
  mushrooms: 4,
  cucumber: 6,
  lettuce: 4,
  avocado: 4,
  bell_pepper: 7,
  // Dairy
  paneer: 5,
  curd: 7,
  dahi: 7,
  milk: 5,
  yogurt: 7,
  butter: 21,
  ghee: 180,
  cream: 7,
  malai: 7,
  mozzarella: 5,
  parmesan: 30,
  feta: 14,
  cheddar: 21,
  sour_cream: 14,
  ricotta: 7,
  // Proteins
  tofu: 4,
  tempeh: 7,
  eggs: 21,
  // Fruits
  lemon: 14,
  lime: 14,
  banana: 5,
  mango: 5,
  apple: 21,
  berries: 4,
  grapes: 7,
  orange: 14,
  tomato: 6,
  // Fresh coconut
  coconut: 7,
  // Dals & legumes
  toor_dal: 365,
  moong_dal: 365,
  masoor_dal: 365,
  chana_dal: 365,
  urad_dal: 365,
  rajma: 365,
  kabuli_chana: 365,
  kala_chana: 365,
  canned_chickpeas: 730,
  canned_beans: 730,
  canned_tomatoes: 730,
  lentils: 365,
  black_beans: 365,
  // Grains & pasta
  basmati_rice: 365,
  rice: 365,
  idli_rice: 365,
  poha: 180,
  rava: 180,
  sooji: 180,
  oats: 180,
  wheat_flour: 180,
  atta: 180,
  maida: 180,
  besan: 180,
  rice_flour: 180,
  ragi_flour: 90,
  pasta: 365,
  spaghetti: 365,
  penne: 365,
  noodles: 365,
  quinoa: 365,
  couscous: 365,
  bread: 4,
  tortilla: 5,
  // Spices & condiments
  mustard_seeds: 365,
  cumin_seeds: 365,
  coriander_powder: 365,
  turmeric_powder: 365,
  garam_masala: 365,
  red_chilli_powder: 365,
  chaat_masala: 365,
  kasuri_methi: 365,
  hing: 365,
  amchur: 365,
  oregano: 365,
  thyme: 365,
  rosemary: 365,
  paprika: 365,
  cumin: 365,
  cayenne: 365,
  bay_leaves: 365,
  soy_sauce: 365,
  fish_sauce: 365,
  oyster_sauce: 365,
  miso_paste: 180,
  tahini: 180,
  harissa: 180,
  olive_oil: 365,
  oil: 180,
  sesame_oil: 365,
  vinegar: 365,
  balsamic: 365,
  apple_cider_vinegar: 365,
  tamarind: 180,
  jaggery: 365,
  sugar: 999,
  salt: 999,
  tomato_paste: 14,
  pesto: 7,
  // Nuts
  cashews: 180,
  peanuts: 180,
  almonds: 180,
  pine_nuts: 180,
  walnuts: 180,
  sesame_seeds: 365,
  desiccated_coconut: 180,
};

// ─── ALL CATEGORIES (Indian + World) ─────────────────────────────────────────
const CATEGORIES = {
  "🥦 Vegetables": [
    "Onions",
    "Tomatoes",
    "Potatoes",
    "Sweet Potato",
    "Cauliflower (Gobi)",
    "Brinjal (Baingan)",
    "Bottle Gourd (Lauki)",
    "Bitter Gourd (Karela)",
    "Capsicum / Bell Pepper",
    "Okra (Bhindi)",
    "Radish (Mooli)",
    "Drumstick (Moringa)",
    "Corn",
    "Green Peas",
    "Beetroot",
    "Zucchini",
    "Broccoli",
    "Mushrooms",
    "Cucumber",
    "Lettuce",
    "Celery",
    "Asparagus",
    "Leek",
    "Avocado",
    "Shallots",
  ],
  "🌿 Leafy & Herbs": [
    "Spinach (Palak)",
    "Methi (Fenugreek Leaves)",
    "Coriander Leaves",
    "Curry Leaves",
    "Mint (Pudina)",
    "Kale",
    "Basil",
    "Rosemary",
    "Thyme",
  ],
  "🌶 Aromatics": [
    "Garlic",
    "Ginger",
    "Green Chillies",
    "Dry Red Chillies",
    "Lemongrass",
    "Galangal",
  ],
  "🧀 Dairy & Eggs": [
    "Paneer",
    "Curd (Dahi)",
    "Yogurt",
    "Milk",
    "Butter",
    "Ghee",
    "Cream (Malai)",
    "Mozzarella",
    "Parmesan",
    "Feta",
    "Cheddar",
    "Sour Cream",
    "Ricotta",
    "Eggs",
  ],
  "🌱 Plant Proteins": [
    "Tofu",
    "Tempeh",
    "Kabuli Chana (Chickpeas)",
    "Kala Chana",
    "Canned Chickpeas",
    "Canned Black Beans",
    "Canned Kidney Beans",
  ],
  "🫘 Indian Dals": [
    "Toor Dal",
    "Moong Dal (Yellow)",
    "Masoor Dal (Red)",
    "Chana Dal",
    "Urad Dal (Black)",
    "Urad Dal (White)",
    "Rajma",
  ],
  "🌾 Grains & Pasta": [
    "Basmati Rice",
    "Idli Rice",
    "Poha",
    "Rava / Sooji",
    "Wheat Flour (Atta)",
    "Maida",
    "Besan",
    "Rice Flour",
    "Ragi Flour",
    "Oats",
    "Pasta / Spaghetti",
    "Penne",
    "Noodles",
    "Quinoa",
    "Couscous",
    "Bread",
    "Tortilla",
  ],
  "🧂 Indian Spices": [
    "Turmeric Powder",
    "Red Chilli Powder",
    "Coriander Powder",
    "Garam Masala",
    "Cumin Seeds (Jeera)",
    "Mustard Seeds",
    "Chaat Masala",
    "Kasuri Methi",
    "Hing (Asafoetida)",
    "Amchur",
    "Cardamom",
    "Cloves",
    "Cinnamon",
    "Fenugreek Seeds",
    "Sambar Powder",
  ],
  "🌍 World Spices": [
    "Oregano",
    "Paprika",
    "Cumin Powder",
    "Cayenne",
    "Thyme",
    "Bay Leaves",
    "Za'atar",
    "Sumac",
    "Smoked Paprika",
  ],
  "🍯 Sauces & Condiments": [
    "Soy Sauce",
    "Miso Paste",
    "Tahini",
    "Harissa",
    "Tomato Paste",
    "Pesto",
    "Sesame Oil",
    "Olive Oil",
    "Balsamic Vinegar",
    "Tamarind (Imli)",
    "Jaggery (Gud)",
  ],
  "🌰 Nuts & Seeds": [
    "Cashews (Kaju)",
    "Peanuts",
    "Almonds",
    "Pine Nuts",
    "Sesame Seeds",
    "Walnuts",
    "Desiccated Coconut",
    "Coconut (Fresh)",
  ],
  "🥫 Pantry Staples": ["Canned Tomatoes", "Oil", "Sugar", "Salt", "Vinegar"],
};

// ─── CUISINE TYPES ────────────────────────────────────────────────────────────
const CUISINES = [
  "Any (surprise me)",
  "Indian — North (Dal Makhani, Sabzi, Paratha)",
  "Indian — South (Sambar, Dosa, Rasam)",
  "Indian — Gujarati / Maharashtrian",
  "Italian (Pasta, Risotto, Pizza)",
  "Mexican (Tacos, Burritos, Quesadillas)",
  "Asian — Chinese (Noodles, Fried Rice, Stir Fry)",
  "Asian — Japanese (Miso Soup, Donburi, Ramen)",
  "Asian — Thai (Curries, Pad Thai)",
  "Mediterranean (Hummus, Falafel, Shakshuka)",
  "Lebanese / Middle Eastern",
  "Continental (Soups, Gratins, Stir-fries)",
  "Mexican-Indian Fusion",
];

function getShelfLife(itemName) {
  const key = itemName
    .toLowerCase()
    .replace(/[\s()\/\-]/g, "_")
    .replace(/_+/g, "_");
  return SHELF_LIFE[key] || 7;
}

function getDaysUntilExpiry(item) {
  const bought = new Date(item.boughtDate);
  const expiry = new Date(bought);
  expiry.setDate(expiry.getDate() + item.shelfLife);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
}

function urgencyColor(days) {
  if (days <= 1)
    return {
      bg: "#fee2e2",
      text: "#dc2626",
      badge: "#dc2626",
      label: "Use today!",
    };
  if (days <= 3)
    return {
      bg: "#fed7aa",
      text: "#c2410c",
      badge: "#ea580c",
      label: `${days}d left`,
    };
  if (days <= 7)
    return {
      bg: "#fef9c3",
      text: "#92400e",
      badge: "#ca8a04",
      label: `${days}d left`,
    };
  return {
    bg: "#f0fdf4",
    text: "#166534",
    badge: "#16a34a",
    label: `${days}d left`,
  };
}

// ─── FILE HELPERS ─────────────────────────────────────────────────────────────
function pantryToCSV(items) {
  const header =
    "Name,Category,Quantity,Unit,Bought Date,Shelf Life (days),Expiry Date\n";
  const rows = items.map((i) => {
    const exp = new Date(i.boughtDate);
    exp.setDate(exp.getDate() + i.shelfLife);
    return `"${i.name}","${i.category}","${i.quantity}","${i.unit}","${
      i.boughtDate
    }","${i.shelfLife}","${exp.toISOString().slice(0, 10)}"`;
  });
  return header + rows.join("\n");
}

function recipesToCSV(recipes) {
  const header = "Date,Meal,Title,Cuisine,Ingredients,Instructions\n";
  const rows = recipes.flatMap((r) =>
    r.meals.map(
      (m) =>
        `"${r.date}","${m.type}","${m.title}","${
          m.cuisine || ""
        }","${m.ingredients?.join("; ")}","${m.instructions}"`
    )
  );
  return header + rows.join("\n");
}

function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── CLAUDE API ───────────────────────────────────────────────────────────────
async function generateRecipes(
  pantryItems,
  familySize,
  preferences,
  cuisinePref
) {
  const urgentItems = [...pantryItems]
    .sort((a, b) => getDaysUntilExpiry(a) - getDaysUntilExpiry(b))
    .slice(0, 15)
    .map((i) => `${i.name} (${getDaysUntilExpiry(i)}d left)`);

  const allItems = pantryItems.map((i) => i.name).join(", ");

  const cuisineInstruction =
    cuisinePref === "Any (surprise me)"
      ? "Mix cuisines across the 3 meals — e.g. an Indian breakfast, an Italian or Asian lunch, and a Mexican or Mediterranean dinner. Be creative and varied."
      : `All 3 meals should be in this style: ${cuisinePref}`;

  const prompt = `You are a world-class vegetarian home chef. Generate 3 vegetarian meals (Breakfast, Lunch, Dinner) for a family of ${familySize}.

PANTRY — prioritise items expiring soonest:
Urgent: ${urgentItems.join(", ")}
All available: ${allItems}

Cuisine preference: ${cuisineInstruction}

Additional preferences: ${
    preferences || "family-friendly, balanced nutrition, practical home cooking"
  }

Rules:
- 100% vegetarian (no meat, no fish — eggs and dairy are OK unless user says otherwise)
- Only use ingredients listed in the pantry above
- Name the specific cuisine for each meal (e.g. "South Indian", "Italian", "Mexican", "Thai")
- Keep instructions practical and clear for a home cook — 4-5 sentences
- Flag usesUrgent: true if the meal uses items expiring within 3 days

Respond ONLY with a valid JSON array (no markdown, no extra text):
[
  {
    "type": "Breakfast",
    "title": "Recipe Name",
    "cuisine": "South Indian",
    "ingredients": ["ingredient 1", "ingredient 2"],
    "instructions": "Step by step instructions for a home cook.",
    "prepTime": "20 mins",
    "serves": ${familySize},
    "usesUrgent": false
  },
  { "type": "Lunch", ... },
  { "type": "Dinner", ... }
]`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1400,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await response.json();
  const text = data.content?.map((c) => c.text || "").join("") || "";
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

// ─── CUISINE FLAG MAP ─────────────────────────────────────────────────────────
const CUISINE_ICON = {
  "South Indian": "🌴",
  "North Indian": "🏔",
  Punjabi: "🌾",
  Gujarati: "🎨",
  Maharashtrian: "🌊",
  Rajasthani: "🏜",
  Indian: "🪔",
  Chettinad: "🌶",
  Italian: "🍝",
  Mexican: "🌮",
  Thai: "🍜",
  Japanese: "🍱",
  Chinese: "🥢",
  Korean: "🥗",
  Mediterranean: "🫒",
  Lebanese: "🧆",
  "Middle Eastern": "🥙",
  Continental: "🍲",
  French: "🥐",
  Greek: "🫙",
};

function getCuisineIcon(cuisine = "") {
  for (const [key, icon] of Object.entries(CUISINE_ICON)) {
    if (cuisine.includes(key)) return icon;
  }
  return "🍽";
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function AddItemForm({ onAdd }) {
  const today = new Date().toISOString().slice(0, 10);
  const [name, setName] = useState("");
  const [qty, setQty] = useState("1");
  const [unit, setUnit] = useState("units");
  const [category, setCategory] = useState("🥦 Vegetables");
  const [boughtDate, setBoughtDate] = useState(today);
  const [customShelf, setCustomShelf] = useState("");
  const [showSugs, setShowSugs] = useState(false);

  const catItems = CATEGORIES[category] || [];
  const suggestions =
    name.length > 1
      ? catItems
          .filter((i) => i.toLowerCase().includes(name.toLowerCase()))
          .slice(0, 5)
      : [];
  const computedShelf = customShelf || (name ? getShelfLife(name) : 7);

  const handle = () => {
    if (!name.trim()) return;
    onAdd({
      id: Date.now(),
      name: name.trim(),
      quantity: qty,
      unit,
      category,
      boughtDate,
      shelfLife: Number(computedShelf),
    });
    setName("");
    setQty("1");
    setCustomShelf("");
    setShowSugs(false);
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg,#fffbf0,#fff8e8)",
        border: "1.5px solid #e8c97a",
        borderRadius: 18,
        padding: "20px 22px",
        marginBottom: 24,
        position: "relative",
      }}
    >
      <p
        style={{
          margin: "0 0 14px",
          fontFamily: "'Noto Serif',Georgia,serif",
          fontSize: 16,
          color: "#7c3d0a",
          fontWeight: 700,
        }}
      >
        🛒 Add item to pantry
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gap: 10,
          marginBottom: 10,
        }}
      >
        <div style={{ position: "relative" }}>
          <label style={labelSt}>Item name</label>
          <input
            style={inputSt}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setShowSugs(true);
            }}
            onBlur={() => setTimeout(() => setShowSugs(false), 150)}
            placeholder="e.g. Spinach, Pasta, Tofu, Mozzarella"
            onKeyDown={(e) => e.key === "Enter" && handle()}
          />
          {showSugs && suggestions.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                background: "white",
                border: "1.5px solid #e8c97a",
                borderRadius: 10,
                zIndex: 100,
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              }}
            >
              {suggestions.map((s) => (
                <div
                  key={s}
                  onMouseDown={() => {
                    setName(s);
                    setCustomShelf("");
                    setShowSugs(false);
                  }}
                  style={{
                    padding: "8px 12px",
                    cursor: "pointer",
                    fontSize: 13,
                    color: "#3d1f0a",
                    borderBottom: "1px solid #f0e0c0",
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <label style={labelSt}>Qty</label>
          <input
            style={inputSt}
            type="number"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            min="0.1"
            step="0.5"
          />
        </div>
        <div>
          <label style={labelSt}>Unit</label>
          <select
            style={inputSt}
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            {[
              "units",
              "kg",
              "g",
              "L",
              "ml",
              "bunch",
              "can",
              "packet",
              "tbsp",
              "tsp",
              "dozen",
            ].map((u) => (
              <option key={u}>{u}</option>
            ))}
          </select>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gap: 10,
          marginBottom: 14,
        }}
      >
        <div>
          <label style={labelSt}>Category</label>
          <select
            style={inputSt}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {Object.keys(CATEGORIES).map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelSt}>Date bought</label>
          <input
            style={inputSt}
            type="date"
            value={boughtDate}
            onChange={(e) => setBoughtDate(e.target.value)}
          />
        </div>
        <div>
          <label style={labelSt}>Shelf life (days)</label>
          <input
            style={inputSt}
            type="number"
            value={customShelf || computedShelf}
            onChange={(e) => setCustomShelf(e.target.value)}
          />
        </div>
      </div>
      <button onClick={handle} style={primaryBtn}>
        + Add to Pantry
      </button>
    </div>
  );
}

function PantryItem({ item, onRemove }) {
  const days = getDaysUntilExpiry(item);
  const c = urgencyColor(days);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 14px",
        background: c.bg,
        borderRadius: 12,
        marginBottom: 7,
        borderLeft: `4px solid ${c.badge}`,
      }}
    >
      <div style={{ flex: 1 }}>
        <span
          style={{
            fontWeight: 700,
            color: "#2d1200",
            fontFamily: "'Noto Serif',Georgia,serif",
          }}
        >
          {item.name}
        </span>
        <span style={{ marginLeft: 8, fontSize: 13, color: "#7c4a1e" }}>
          {item.quantity} {item.unit}
        </span>
        <span style={{ marginLeft: 8, fontSize: 12, color: "#9a7050" }}>
          · {item.category.replace(/^.{2}/, "").trim()}
        </span>
      </div>
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: c.text,
          background: "rgba(255,255,255,0.65)",
          padding: "3px 9px",
          borderRadius: 20,
          whiteSpace: "nowrap",
        }}
      >
        {c.label}
      </span>
      <button
        onClick={() => onRemove(item.id)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#c0a08a",
          fontSize: 20,
          lineHeight: 1,
        }}
      >
        ×
      </button>
    </div>
  );
}

function MealCard({ meal, index }) {
  const mealIcon = { Breakfast: "🍳", Lunch: "🥘", Dinner: "🍲" };
  const schemes = [
    { bg: "#fffbf0", border: "#f59e0b", accent: "#b45309" },
    { bg: "#f0fdf4", border: "#22c55e", accent: "#15803d" },
    { bg: "#fdf4ff", border: "#c084fc", accent: "#7e22ce" },
  ];
  const col = schemes[index % 3];
  return (
    <div
      style={{
        background: col.bg,
        border: `1.5px solid ${col.border}`,
        borderRadius: 20,
        padding: "18px 22px",
        marginBottom: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <span style={{ fontSize: 34, lineHeight: 1 }}>
          {mealIcon[meal.type] || "🍽"}
        </span>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1.2,
              color: col.accent,
            }}
          >
            {meal.type}
          </div>
          <div
            style={{
              fontFamily: "'Noto Serif',Georgia,serif",
              fontSize: 19,
              fontWeight: 700,
              color: "#1a0800",
              lineHeight: 1.2,
            }}
          >
            {meal.title}
          </div>
          <div style={{ marginTop: 4, fontSize: 12, color: "#9a7050" }}>
            {getCuisineIcon(meal.cuisine)} {meal.cuisine} · {meal.serves} serves
            · {meal.prepTime}
          </div>
        </div>
        {meal.usesUrgent && (
          <span
            style={{
              background: "#fef3c7",
              color: "#b45309",
              fontSize: 11,
              fontWeight: 700,
              padding: "3px 9px",
              borderRadius: 20,
              border: `1px solid ${col.border}`,
              whiteSpace: "nowrap",
            }}
          >
            ⚡ Uses expiring
          </span>
        )}
      </div>
      <div style={{ marginBottom: 10 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: col.accent,
            marginBottom: 6,
            textTransform: "uppercase",
            letterSpacing: 0.8,
          }}
        >
          Ingredients
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {meal.ingredients?.map((ing, i) => (
            <span
              key={i}
              style={{
                fontSize: 12,
                background: "rgba(255,255,255,0.8)",
                border: `1px solid ${col.border}`,
                padding: "2px 9px",
                borderRadius: 20,
                color: "#3d1f0a",
              }}
            >
              {ing}
            </span>
          ))}
        </div>
      </div>
      <div
        style={{
          background: "rgba(255,255,255,0.55)",
          borderRadius: 12,
          padding: "10px 14px",
          fontSize: 13,
          color: "#3d1800",
          lineHeight: 1.75,
        }}
      >
        {meal.instructions}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("pantry");
  const [pantry, setPantry] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("larder_pantry") || "[]");
    } catch {
      return [];
    }
  });
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("larder_recipes") || "[]");
    } catch {
      return [];
    }
  });
  const [todayMeals, setTodayMeals] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [familySize, setFamilySize] = useState(
    () => localStorage.getItem("larder_size") || "4"
  );
  const [familyName, setFamilyName] = useState(
    () => localStorage.getItem("larder_name") || "Our Family"
  );
  const [preferences, setPreferences] = useState(
    () => localStorage.getItem("larder_prefs") || ""
  );
  const [cuisinePref, setCuisinePref] = useState(
    () => localStorage.getItem("larder_cuisine") || "Any (surprise me)"
  );
  const [filterCat, setFilterCat] = useState("All");
  const [sortBy, setSortBy] = useState("expiry");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("larder_pantry", JSON.stringify(pantry));
  }, [pantry]);
  useEffect(() => {
    localStorage.setItem("larder_recipes", JSON.stringify(history));
  }, [history]);
  useEffect(() => {
    localStorage.setItem("larder_size", familySize);
  }, [familySize]);
  useEffect(() => {
    localStorage.setItem("larder_name", familyName);
  }, [familyName]);
  useEffect(() => {
    localStorage.setItem("larder_prefs", preferences);
  }, [preferences]);
  useEffect(() => {
    localStorage.setItem("larder_cuisine", cuisinePref);
  }, [cuisinePref]);

  const addItem = useCallback((item) => setPantry((p) => [item, ...p]), []);
  const removeItem = useCallback(
    (id) => setPantry((p) => p.filter((i) => i.id !== id)),
    []
  );

  const expiring = pantry.filter((i) => getDaysUntilExpiry(i) <= 3);
  const categories = ["All", ...Object.keys(CATEGORIES)];
  const filtered = pantry
    .filter((i) => filterCat === "All" || i.category === filterCat)
    .filter(
      (i) =>
        !searchTerm || i.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortBy === "expiry"
        ? getDaysUntilExpiry(a) - getDaysUntilExpiry(b)
        : a.name.localeCompare(b.name)
    );

  const handleGenerate = async () => {
    if (pantry.length === 0) {
      setError("Add some items to your pantry first!");
      return;
    }
    setGenerating(true);
    setError("");
    try {
      const meals = await generateRecipes(
        pantry,
        familySize,
        preferences,
        cuisinePref
      );
      const entry = {
        date: new Date().toLocaleDateString("en-IN", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        generatedAt: new Date().toISOString(),
        cuisinePreference: cuisinePref,
        meals,
      };
      setTodayMeals(entry);
      setHistory((h) => [entry, ...h]);
      setTab("recipes");
    } catch (e) {
      setError(
        "Could not generate recipes — check your API connection or pantry items."
      );
      console.error(e);
    }
    setGenerating(false);
  };

  const tabs = [
    { id: "pantry", label: "🧺 Pantry", count: pantry.length },
    { id: "recipes", label: "🍽 Today's Meals" },
    { id: "history", label: "📚 Archive", count: history.length },
    { id: "setup", label: "⚙ Setup" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fdf8f0",
        fontFamily: "'Noto Sans',sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;600;700&family=Noto+Sans:wght@300;400;600&display=swap');
        * { box-sizing: border-box; } body { margin: 0; }
        input:focus, select:focus, textarea:focus { border-color: #d97706 !important; box-shadow: 0 0 0 3px rgba(217,119,6,0.15); }
        input, select, textarea { outline: none; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.3s ease both; }
        ::-webkit-scrollbar { width:5px; } ::-webkit-scrollbar-thumb { background:#e8c97a; border-radius:3px; }
      `}</style>

      {/* Header */}
      <div
        style={{
          background:
            "linear-gradient(135deg,#1a0800 0%,#7c2d12 45%,#d97706 100%)",
          padding: "24px 20px 0",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -40,
            right: 20,
            width: 200,
            height: 200,
            background: "rgba(255,255,255,0.04)",
            borderRadius: "50%",
          }}
        />
        <div style={{ maxWidth: 760, margin: "0 auto", position: "relative" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 14,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  opacity: 0.65,
                  letterSpacing: 2.5,
                  textTransform: "uppercase",
                  marginBottom: 4,
                }}
              >
                Larder · Family Kitchen
              </div>
              <h1
                style={{
                  margin: 0,
                  fontFamily: "'Noto Serif',serif",
                  fontSize: 26,
                  fontWeight: 700,
                }}
              >
                {familyName} 🏠
              </h1>
              <div style={{ marginTop: 3, opacity: 0.8, fontSize: 13 }}>
                Family of {familySize} · {pantry.length} pantry items ·
                Vegetarian
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {expiring.length > 0 && (
                <div
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    borderRadius: 12,
                    padding: "8px 12px",
                    textAlign: "center",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <div style={{ fontSize: 18, fontWeight: 800 }}>
                    {expiring.length}
                  </div>
                  <div style={{ fontSize: 10, opacity: 0.85 }}>expiring</div>
                </div>
              )}
              <div
                style={{
                  background: "rgba(255,255,255,0.12)",
                  borderRadius: 12,
                  padding: "8px 12px",
                  textAlign: "center",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 800 }}>
                  {history.length}
                </div>
                <div style={{ fontSize: 10, opacity: 0.85 }}>recipes</div>
              </div>
            </div>
          </div>

          {/* Cuisine picker + Generate */}
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              marginBottom: 16,
              flexWrap: "wrap",
            }}
          >
            <select
              value={cuisinePref}
              onChange={(e) => setCuisinePref(e.target.value)}
              style={{
                padding: "9px 14px",
                borderRadius: 50,
                border: "1.5px solid rgba(255,255,255,0.3)",
                background: "rgba(255,255,255,0.12)",
                color: "white",
                fontSize: 13,
                fontFamily: "'Noto Sans',sans-serif",
                cursor: "pointer",
                flex: 1,
                minWidth: 200,
              }}
            >
              {CUISINES.map((c) => (
                <option
                  key={c}
                  style={{ color: "#1a0800", background: "white" }}
                >
                  {c}
                </option>
              ))}
            </select>
            <button
              onClick={handleGenerate}
              disabled={generating}
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "1.5px solid rgba(255,255,255,0.45)",
                color: "white",
                borderRadius: 50,
                padding: "10px 22px",
                fontSize: 14,
                fontWeight: 600,
                cursor: generating ? "not-allowed" : "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "'Noto Sans',sans-serif",
                whiteSpace: "nowrap",
              }}
            >
              {generating ? (
                <>
                  <span
                    style={{
                      display: "inline-block",
                      width: 14,
                      height: 14,
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTopColor: "white",
                      borderRadius: "50%",
                      animation: "spin 0.8s linear infinite",
                    }}
                  />
                  Generating…
                </>
              ) : (
                "✨ Generate 3 Meals"
              )}
            </button>
          </div>
          {error && (
            <div style={{ marginBottom: 10, fontSize: 13, color: "#fde68a" }}>
              {error}
            </div>
          )}
        </div>

        {/* Tabs */}
        <div
          style={{
            maxWidth: 760,
            margin: "0 auto",
            display: "flex",
            borderTop: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                flex: 1,
                background: "none",
                border: "none",
                borderBottom:
                  tab === t.id ? "3px solid white" : "3px solid transparent",
                padding: "11px 4px",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 600,
                color: tab === t.id ? "white" : "rgba(255,255,255,0.5)",
                fontFamily: "'Noto Sans',sans-serif",
                transition: "all 0.2s",
              }}
            >
              {t.label}
              {t.count !== undefined ? ` (${t.count})` : ""}
            </button>
          ))}
        </div>
      </div>

      {/* Page content */}
      <div
        style={{ maxWidth: 760, margin: "0 auto", padding: "22px 14px" }}
        className="fade-up"
        key={tab}
      >
        {/* ── PANTRY ── */}
        {tab === "pantry" && (
          <>
            <AddItemForm onAdd={addItem} />
            {expiring.length > 0 && (
              <div
                style={{
                  background: "#fff7ed",
                  border: "1.5px solid #fed7aa",
                  borderRadius: 14,
                  padding: "12px 16px",
                  marginBottom: 18,
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 24 }}>⚠️</span>
                <div>
                  <div
                    style={{ fontWeight: 700, color: "#c2410c", fontSize: 14 }}
                  >
                    Use these soon!
                  </div>
                  <div style={{ fontSize: 13, color: "#9a3412" }}>
                    {expiring.map((i) => i.name).join(" · ")}
                  </div>
                </div>
              </div>
            )}
            <div
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 14,
                flexWrap: "wrap",
                alignItems: "flex-end",
              }}
            >
              <div style={{ flex: 1, minWidth: 140 }}>
                <label style={labelSt}>Search</label>
                <input
                  style={inputSt}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                />
              </div>
              <div style={{ flex: 1, minWidth: 160 }}>
                <label style={labelSt}>Category</label>
                <select
                  style={inputSt}
                  value={filterCat}
                  onChange={(e) => setFilterCat(e.target.value)}
                >
                  {categories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelSt}>Sort</label>
                <select
                  style={inputSt}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="expiry">Expiry first</option>
                  <option value="name">A–Z</option>
                </select>
              </div>
              <div style={{ alignSelf: "flex-end", display: "flex", gap: 6 }}>
                <button
                  onClick={() =>
                    downloadFile(pantryToCSV(pantry), "pantry.csv", "text/csv")
                  }
                  style={smallBtn}
                >
                  ⬇ CSV
                </button>
                <button
                  onClick={() =>
                    downloadFile(
                      JSON.stringify(pantry, null, 2),
                      "pantry.json",
                      "application/json"
                    )
                  }
                  style={smallBtn}
                >
                  ⬇ JSON
                </button>
              </div>
            </div>
            {filtered.length === 0 ? (
              <div
                style={{ textAlign: "center", padding: 48, color: "#c0a080" }}
              >
                <div style={{ fontSize: 52 }}>🧺</div>
                <div
                  style={{
                    fontFamily: "'Noto Serif',serif",
                    fontSize: 18,
                    color: "#7c4a1e",
                    marginTop: 12,
                  }}
                >
                  Your pantry is empty
                </div>
                <div style={{ fontSize: 13, marginTop: 4 }}>
                  Add your dal, pasta, veggies, spices and more above
                </div>
              </div>
            ) : (
              filtered.map((item) => (
                <PantryItem key={item.id} item={item} onRemove={removeItem} />
              ))
            )}
          </>
        )}

        {/* ── TODAY'S MEALS ── */}
        {tab === "recipes" && (
          <>
            {!todayMeals ? (
              <div
                style={{ textAlign: "center", padding: 56, color: "#c0a080" }}
              >
                <div style={{ fontSize: 60, marginBottom: 16 }}>🍽️</div>
                <div
                  style={{
                    fontFamily: "'Noto Serif',serif",
                    fontSize: 20,
                    color: "#7c4a1e",
                  }}
                >
                  No meals generated yet
                </div>
                <div style={{ fontSize: 14, marginTop: 6 }}>
                  Choose a cuisine from the dropdown above and hit Generate
                </div>
              </div>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                    flexWrap: "wrap",
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Noto Serif',serif",
                      fontSize: 15,
                      color: "#9a7050",
                    }}
                  >
                    📅 {todayMeals.date}
                  </div>
                  <span
                    style={{
                      fontSize: 12,
                      background: "#fff7ed",
                      border: "1px solid #fed7aa",
                      padding: "3px 10px",
                      borderRadius: 20,
                      color: "#c2410c",
                      fontWeight: 600,
                    }}
                  >
                    {todayMeals.cuisinePreference}
                  </span>
                </div>
                {todayMeals.meals.map((m, i) => (
                  <MealCard key={i} meal={m} index={i} />
                ))}
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                    marginTop: 8,
                  }}
                >
                  <button
                    onClick={() =>
                      downloadFile(
                        JSON.stringify(history, null, 2),
                        "recipes.json",
                        "application/json"
                      )
                    }
                    style={smallBtn}
                  >
                    ⬇ recipes.json
                  </button>
                  <button
                    onClick={() =>
                      downloadFile(
                        recipesToCSV(history),
                        "recipes.csv",
                        "text/csv"
                      )
                    }
                    style={smallBtn}
                  >
                    ⬇ recipes.csv
                  </button>
                  <button
                    onClick={handleGenerate}
                    disabled={generating}
                    style={{ ...primaryBtn, fontSize: 13 }}
                  >
                    🔄 Regenerate
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {/* ── ARCHIVE ── */}
        {tab === "history" && (
          <>
            {history.length === 0 ? (
              <div
                style={{ textAlign: "center", padding: 48, color: "#c0a080" }}
              >
                <div style={{ fontSize: 48, marginBottom: 12 }}>📚</div>
                <div style={{ fontFamily: "'Noto Serif',serif", fontSize: 18 }}>
                  Your family cookbook is empty — generate some meals!
                </div>
              </div>
            ) : (
              <>
                {/* Cuisine breakdown */}
                <div style={{ marginBottom: 20 }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#9a7050",
                      textTransform: "uppercase",
                      letterSpacing: 0.8,
                      marginBottom: 8,
                    }}
                  >
                    Cuisines in your archive
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {[
                      ...new Set(
                        history
                          .flatMap((r) => r.meals.map((m) => m.cuisine))
                          .filter(Boolean)
                      ),
                    ].map((c) => (
                      <span
                        key={c}
                        style={{
                          fontSize: 12,
                          background: "#fff7ed",
                          border: "1px solid #fed7aa",
                          padding: "3px 10px",
                          borderRadius: 20,
                          color: "#c2410c",
                        }}
                      >
                        {getCuisineIcon(c)} {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 8,
                    marginBottom: 16,
                  }}
                >
                  <button
                    onClick={() =>
                      downloadFile(
                        JSON.stringify(history, null, 2),
                        "recipes.json",
                        "application/json"
                      )
                    }
                    style={smallBtn}
                  >
                    ⬇ JSON
                  </button>
                  <button
                    onClick={() =>
                      downloadFile(
                        recipesToCSV(history),
                        "recipes.csv",
                        "text/csv"
                      )
                    }
                    style={smallBtn}
                  >
                    ⬇ CSV
                  </button>
                </div>
                {history.map((entry, ei) => (
                  <div key={ei} style={{ marginBottom: 30 }}>
                    <div
                      style={{
                        fontFamily: "'Noto Serif',serif",
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#7c2d12",
                        marginBottom: 10,
                        paddingBottom: 6,
                        borderBottom: "1.5px solid #e8c97a",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span>📅 {entry.date}</span>
                      {entry.cuisinePreference && (
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: "#c2410c",
                            background: "#fff7ed",
                            padding: "2px 8px",
                            borderRadius: 20,
                            border: "1px solid #fed7aa",
                          }}
                        >
                          {entry.cuisinePreference.split("(")[0].trim()}
                        </span>
                      )}
                    </div>
                    {entry.meals.map((m, mi) => (
                      <MealCard key={mi} meal={m} index={mi} />
                    ))}
                  </div>
                ))}
              </>
            )}
          </>
        )}

        {/* ── SETUP ── */}
        {tab === "setup" && (
          <div>
            <div style={cardSt}>
              <p style={cardTitle}>👨‍👩‍👧‍👦 Family settings</p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr",
                  gap: 12,
                  marginBottom: 14,
                }}
              >
                <div>
                  <label style={labelSt}>Family name</label>
                  <input
                    style={inputSt}
                    value={familyName}
                    onChange={(e) => setFamilyName(e.target.value)}
                  />
                </div>
                <div>
                  <label style={labelSt}>Family size</label>
                  <input
                    style={inputSt}
                    type="number"
                    min={1}
                    max={20}
                    value={familySize}
                    onChange={(e) => setFamilySize(e.target.value)}
                  />
                </div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={labelSt}>Default cuisine preference</label>
                <select
                  style={inputSt}
                  value={cuisinePref}
                  onChange={(e) => setCuisinePref(e.target.value)}
                >
                  {CUISINES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelSt}>Dietary preferences & notes</label>
                <textarea
                  style={{ ...inputSt, height: 80, resize: "vertical" }}
                  value={preferences}
                  onChange={(e) => setPreferences(e.target.value)}
                  placeholder="e.g. No onion no garlic on Tuesdays, kids dislike bitter gourd, loves pasta nights on Fridays, gluten-free lunches, prefer Hebbars Kitchen style Indian meals..."
                />
              </div>
            </div>

            <div style={cardSt}>
              <p style={cardTitle}>📱 WhatsApp daily setup</p>
              <p style={{ margin: "0 0 12px", fontSize: 13, color: "#9a7050" }}>
                GitHub Actions (free) + CallMeBot (free) = 3 meals on your
                WhatsApp at 7am every day.
              </p>
              <div
                style={{
                  background: "#1a0800",
                  borderRadius: 12,
                  padding: "14px 18px",
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: "#fcd34d",
                  lineHeight: 2,
                  overflowX: "auto",
                }}
              >
                <div style={{ color: "#86efac" }}>
                  # GitHub repo → Settings → Secrets → Actions
                </div>
                <div>ANTHROPIC_API_KEY = sk-ant-...</div>
                <div>CALLMEBOT_PHONE = 91XXXXXXXXXX</div>
                <div>CALLMEBOT_APIKEY = 123456</div>
              </div>
              <a
                href="https://www.callmebot.com/cel/whatsapp/"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: 10,
                  fontSize: 13,
                  color: "#c2773b",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                → Get free CallMeBot key
              </a>
            </div>

            <div style={cardSt}>
              <p style={cardTitle}>💾 Data</p>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  marginBottom: 14,
                }}
              >
                <button
                  onClick={() =>
                    downloadFile(
                      JSON.stringify(pantry, null, 2),
                      "pantry.json",
                      "application/json"
                    )
                  }
                  style={primaryBtn}
                >
                  ⬇ pantry.json
                </button>
                <button
                  onClick={() =>
                    downloadFile(
                      JSON.stringify(history, null, 2),
                      "recipes.json",
                      "application/json"
                    )
                  }
                  style={smallBtn}
                >
                  ⬇ recipes.json
                </button>
                <button
                  onClick={() =>
                    downloadFile(pantryToCSV(pantry), "pantry.csv", "text/csv")
                  }
                  style={smallBtn}
                >
                  ⬇ pantry.csv
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("Clear all pantry?")) setPantry([]);
                  }}
                  style={{
                    ...smallBtn,
                    borderColor: "#fca5a5",
                    color: "#dc2626",
                  }}
                >
                  🗑 Clear Pantry
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("Clear all saved recipes?"))
                      setHistory([]);
                  }}
                  style={{
                    ...smallBtn,
                    borderColor: "#fca5a5",
                    color: "#dc2626",
                  }}
                >
                  🗑 Clear Recipes
                </button>
              </div>
              <label style={labelSt}>Import pantry.json</label>
              <input
                type="file"
                accept=".json"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const r = new FileReader();
                  r.onload = (ev) => {
                    try {
                      const d = JSON.parse(ev.target.result);
                      if (Array.isArray(d)) {
                        setPantry(d);
                        alert(`✅ Imported ${d.length} items!`);
                      }
                    } catch {
                      alert("Invalid JSON file");
                    }
                  };
                  r.readAsText(file);
                }}
                style={{ fontSize: 13, color: "#7c4a1e" }}
              />
            </div>

            <div style={cardSt}>
              <p style={cardTitle}>🌍 Supported cuisines</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {CUISINES.filter((c) => c !== "Any (surprise me)").map((c) => (
                  <span
                    key={c}
                    style={{
                      fontSize: 12,
                      background: "#fff7ed",
                      border: "1px solid #fed7aa",
                      padding: "4px 11px",
                      borderRadius: 20,
                      color: "#7c3d0a",
                    }}
                  >
                    {c.split("(")[0].trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SHARED STYLES ────────────────────────────────────────────────────────────
const labelSt = {
  display: "block",
  fontSize: 11,
  fontWeight: 700,
  color: "#9a7050",
  textTransform: "uppercase",
  letterSpacing: 0.8,
  marginBottom: 5,
};
const inputSt = {
  width: "100%",
  padding: "9px 12px",
  border: "1.5px solid #e8c97a",
  borderRadius: 10,
  fontSize: 13,
  color: "#2d1200",
  background: "white",
  fontFamily: "'Noto Sans',sans-serif",
  transition: "border-color 0.2s, box-shadow 0.2s",
};
const primaryBtn = {
  background: "linear-gradient(135deg,#c2410c,#d97706)",
  color: "white",
  border: "none",
  borderRadius: 50,
  padding: "10px 20px",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "'Noto Sans',sans-serif",
};
const smallBtn = {
  background: "white",
  color: "#7c4a1e",
  border: "1.5px solid #e8c97a",
  borderRadius: 50,
  padding: "8px 16px",
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "'Noto Sans',sans-serif",
};
const cardSt = {
  background: "linear-gradient(135deg,#fffbf0,#fff8e8)",
  border: "1.5px solid #e8c97a",
  borderRadius: 18,
  padding: "20px 22px",
  marginBottom: 20,
};
const cardTitle = {
  margin: "0 0 14px",
  fontFamily: "'Noto Serif',Georgia,serif",
  fontSize: 16,
  color: "#7c3d0a",
  fontWeight: 700,
};
