import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// ===== FIREBASE =====
const firebaseConfig = {
  apiKey: "AIzaSyB4JPBOFz6mpZXgExQ_Sw4jku6RNlau9Nc",
  authDomain: "recovery-6720d.firebaseapp.com",
  databaseURL: "https://recovery-6720d-default-rtdb.firebaseio.com",
  projectId: "recovery-6720d",
  storageBucket: "recovery-6720d.firebasestorage.app",
  messagingSenderId: "488755256889",
  appId: "1:488755256889:web:041b60e868b34477d777e8"
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
const DB_KEY = "amma-diet-v1";

// ===== STATE =====
let lang = "en";
let appData = {};
let synced = false;
let currentItemId = null;
let currentHistKey = null;
let currentCookSession = null;
let cookToastVisible = false;
const TODAY = new Date().toISOString().split("T")[0];

function nowStr() {
  return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}
function emptyDay() {
  return { items: {}, extras: [], bp: false, bpTime: null, cook: {} };
}
function getToday() {
  if (!appData[TODAY]) appData[TODAY] = emptyDay();
  if (!appData[TODAY].extras) appData[TODAY].extras = [];
  if (!appData[TODAY].cook) appData[TODAY].cook = {};
  return appData[TODAY];
}

// ===== MEAL PLAN =====
// Day index 0=Mon,1=Tue,2=Wed,3=Thu,4=Fri (cycles)
const MEAL_PLAN = [
  { // Pattern A
    morningCook: [
      { id: "mc-ragi", name: "Ragi Porridge with jaggery", teName: "రాగి గంజి బెల్లంతో" },
      { id: "mc-palak-dal", name: "Palak Dal", teName: "పాలక్ పప్పు" },
      { id: "mc-carrot", name: "Carrot stir fry", teName: "క్యారెట్ వేపుడు" },
    ],
    eveningCook: [
      { id: "ec-methi-roti", name: "Methi Roti (2)", teName: "మేథి రొట్టె (2)" },
      { id: "ec-toor-dal", name: "Toor Dal", teName: "కందిపప్పు" },
      { id: "ec-bottlegourd", name: "Bottle gourd curry", teName: "సొరకాయ కూర" },
    ]
  },
  { // Pattern B
    morningCook: [
      { id: "mc-oats", name: "Oats porridge with jaggery", teName: "ఓట్స్ గంజి బెల్లంతో" },
      { id: "mc-moong-dal", name: "Moong Dal", teName: "పెసరపప్పు" },
      { id: "mc-beetroot", name: "Beetroot curry", teName: "బీట్రూట్ కూర" },
    ],
    eveningCook: [
      { id: "ec-ragi-roti", name: "Ragi Roti (2)", teName: "రాగి రొట్టె (2)" },
      { id: "ec-horse-gram", name: "Horse gram soup (Ulavacharu)", teName: "ఉలవల చారు" },
      { id: "ec-drumstick", name: "Drumstick sambar", teName: "మురుంగకాయ సాంబారు" },
    ]
  },
  { // Pattern C
    morningCook: [
      { id: "mc-ragi2", name: "Ragi Porridge with jaggery", teName: "రాగి గంజి బెల్లంతో" },
      { id: "mc-toor2", name: "Toor Dal", teName: "కందిపప్పు" },
      { id: "mc-ladiesfinger", name: "Ladies finger fry", teName: "బెండకాయ వేపుడు" },
    ],
    eveningCook: [
      { id: "ec-wheat-roti", name: "Wheat Roti (2)", teName: "గోధుమ రొట్టె (2)" },
      { id: "ec-moong2", name: "Moong Dal", teName: "పెసరపప్పు" },
      { id: "ec-bittergourd", name: "Bitter gourd fry", teName: "కారెళ్ళ వేపుడు" },
    ]
  }
];

const COOK_HOW = {
  "mc-ragi": ["Boil 2 cups water", "Add 3 tbsp ragi flour slowly, stirring continuously", "Cook on low flame 5 min stirring", "Add jaggery to taste, mix well", "Serve warm — no lumps"],
  "mc-ragi2": ["Boil 2 cups water", "Add 3 tbsp ragi flour slowly, stirring continuously", "Cook on low flame 5 min stirring", "Add jaggery to taste, mix well", "Serve warm — no lumps"],
  "mc-oats": ["Boil 1.5 cups water or milk", "Add 3 tbsp rolled oats", "Cook 5 min stirring", "Add small piece jaggery, pinch turmeric", "Serve warm"],
  "mc-palak-dal": ["Wash and chop palak (spinach)", "Pressure cook moong dal 2 whistles", "Temper: oil, mustard, cumin, garlic, onion", "Add tomato, turmeric, salt — cook 3 min", "Add dal + palak, simmer 5 min, serve"],
  "mc-carrot": ["Peel and chop carrots into thin rounds", "Heat oil, add mustard seeds, curry leaves", "Add carrots, turmeric, salt", "Cover and cook 8 min on low flame", "Garnish with coriander"],
  "mc-beetroot": ["Peel and grate or chop beetroot", "Heat oil, add mustard, curry leaves, onion", "Add beetroot, turmeric, salt, mix well", "Cook covered 10 min", "Add lemon juice before serving"],
  "mc-moong-dal": ["Wash moong dal thoroughly", "Pressure cook 2 whistles with turmeric", "Temper: oil, mustard, cumin, garlic", "Add tomato, onion, cook 3 min", "Add dal, boil 3 min, add coriander"],
  "mc-moong2": ["Wash moong dal thoroughly", "Pressure cook 2 whistles with turmeric", "Temper: oil, mustard, cumin, garlic", "Add tomato, onion, cook 3 min", "Add dal, boil 3 min, add coriander"],
  "mc-toor2": ["Wash toor dal", "Pressure cook 3 whistles with turmeric", "Temper: oil, mustard, cumin, dried chilli", "Add tomato, onion — cook 4 min", "Mix in dal, simmer 5 min"],
  "mc-ladiesfinger": ["Wash and chop ladies finger into 1 inch pieces", "Dry roast on pan first 5 min — reduces sliminess", "Heat oil, add onion, garlic, cook 3 min", "Add ladies finger, turmeric, salt, chilli powder", "Cook uncovered 10 min stirring occasionally"],
  "ec-methi-roti": ["Mix methi leaves with wheat flour, salt, little oil", "Add water slowly and knead into soft dough", "Rest 10 min", "Roll into thin rotis", "Cook on tawa 2 min each side with little oil/ghee"],
  "ec-ragi-roti": ["Mix ragi flour with salt, little onion, cumin", "Add hot water slowly and mix into dough", "Shape into flat rotis with wet hands", "Cook on hot tawa 3 min each side", "Serve with dal or chutney"],
  "ec-wheat-roti": ["Take wheat atta, add salt, little oil", "Add water slowly and knead 5 min into smooth dough", "Rest 10 min covered", "Roll into thin rotis", "Cook on hot tawa 1 min each side"],
  "ec-toor-dal": ["Wash toor dal, pressure cook 3 whistles", "Temper: oil, mustard, cumin, dried chilli", "Add chopped onion, tomato — cook 4 min", "Add dal, salt, turmeric, boil 5 min", "Add coriander leaves, serve"],
  "ec-moong2": ["Wash moong dal", "Pressure cook 2 whistles with turmeric", "Temper: oil, mustard, cumin, garlic", "Add tomato — cook 3 min", "Mix dal, simmer 3 min"],
  "ec-bottlegourd": ["Peel and cube bottle gourd", "Heat oil, add mustard, curry leaves, onion", "Add bottle gourd, turmeric, salt", "Add 2 tbsp water, cover and cook 12 min", "Garnish coriander, serve"],
  "ec-horse-gram": ["Soak horse gram overnight — important!", "Pressure cook 4 whistles with tamarind, tomato", "Temper: oil, mustard, dried chilli, onion, garlic", "Pour over cooked gram, boil together 5 min", "Add jaggery tiny piece, coriander, serve hot"],
  "ec-drumstick": ["Cut drumstick into 3 inch pieces", "Boil with tamarind water, tomato, turmeric 10 min", "Temper: oil, mustard, onion, curry leaves", "Add sambar powder, salt, cooked drumstick", "Simmer 8 min, add coriander"],
  "ec-bittergourd": ["Slice bitter gourd thin, sprinkle salt, rest 10 min — removes bitterness", "Squeeze out water from slices", "Heat oil, fry onion till golden", "Add bitter gourd slices, turmeric, chilli, salt", "Fry on medium flame 12 min till crisp"],
};

function getTodayCookPlan() {
  const dayOfWeek = new Date().getDay(); // 0=Sun,1=Mon...
  return MEAL_PLAN[dayOfWeek % MEAL_PLAN.length];
}

// ===== DIET PLAN =====
const PLAN = {
  morning: [
    { id: "m1", em: "🌰", en: "Soaked Almonds (5) + Dates (3)", te: "నానబెట్టిన బాదాంలు + ఖర్జూరాలు", dt: "Empty stomach", ir: 1.2, pr: 3, ca: 120, vi: 0 },
    { id: "m2", em: "🥣", en: "Ragi/Oats Porridge", te: "రాగి / ఓట్స్ గంజి", dt: "Breakfast (cooked by sister)", ir: 3.9, pr: 7, ca: 280, vi: 0 },
    { id: "m3", em: "🍎", en: "Apple with skin + lemon", te: "ఆపిల్ తొక్కతో + నిమ్మరసం", dt: "After breakfast", ir: 0.3, pr: 0.5, ca: 95, vi: 8 },
    { id: "m4", em: "🌿", en: "Pomegranate or Beetroot juice", te: "దానిమ్మ లేదా బీట్రూట్ రసం", dt: "No sugar", ir: 0.8, pr: 1, ca: 90, vi: 12 },
  ],
  afternoon: [
    { id: "a1", em: "🍱", en: "Rice + Dal + Curry (family rice)", te: "అన్నం + పప్పు + కూర (వంట అన్నం)", dt: "Lunch — from morning cook", ir: 4.5, pr: 12, ca: 450, vi: 15 },
    { id: "a2", em: "🥥", en: "Tender Coconut water", te: "కొబ్బరి నీళ్ళు", dt: "After lunch", ir: 0.1, pr: 0, ca: 45, vi: 3 },
    { id: "a3", em: "🍌", en: "Banana or Guava", te: "అరటి పండు లేదా జామ", dt: "Afternoon fruit", ir: 0.3, pr: 1, ca: 100, vi: 15 },
  ],
  evening: [
    { id: "e1", em: "🫙", en: "Horse gram soup or peanuts", te: "ఉలవల చారు లేదా వేరుశెనగలు", dt: "Snack", ir: 2.5, pr: 5, ca: 120, vi: 2 },
    { id: "e2", em: "🥥", en: "ORS water", te: "ORS నీళ్ళు", dt: "With snack", ir: 0, pr: 0, ca: 0, vi: 0 },
  ],
  night: [
    { id: "n1", em: "🫓", en: "Roti + Dal + Curry", te: "రొట్టె + పప్పు + కూర", dt: "Dinner — from evening cook", ir: 3.5, pr: 10, ca: 350, vi: 5 },
    { id: "n2", em: "🥛", en: "Turmeric milk (warm)", te: "పసుపు పాలు", dt: "Bedtime", ir: 0.1, pr: 4, ca: 150, vi: 2 },
  ],
  medicine: [
    { id: "md1", em: "💜", en: "Telzun H 40mg (BP)", te: "టెల్జున్ H 40mg (BP)", dt: "Morning empty stomach", ir: 0, pr: 0, ca: 0, vi: 0 },
    { id: "md2", em: "🔴", en: "Ferallmin — Iron tablet", te: "ఫెరాల్మిన్ ఇనుము మాత్ర", dt: "After breakfast", ir: 100, pr: 0, ca: 0, vi: 0 },
    { id: "md3", em: "🟡", en: "Astymin Forte capsule", te: "ఆస్టిమిన్ ఫోర్టె", dt: "After breakfast", ir: 0, pr: 0, ca: 0, vi: 0 },
    { id: "md4", em: "🟠", en: "Ascorbic Acid 500mg (Vit C)", te: "విటమిన్ C 500mg", dt: "After lunch", ir: 0, pr: 0, ca: 0, vi: 500 },
    { id: "md5", em: "🟣", en: "Methycal tablet", te: "మెథికల్ మాత్ర", dt: "After dinner", ir: 0, pr: 0, ca: 0, vi: 0 },
    { id: "md6", em: "💊", en: "Paracetamol 500mg if pain", te: "పారాసిటమాల్ నొప్పి ఉంటే", dt: "As needed", ir: 0, pr: 0, ca: 0, vi: 0 },
  ],
};

const ALL_FOOD = [...PLAN.morning, ...PLAN.afternoon, ...PLAN.evening, ...PLAN.night];
const ALL_ITEMS = [...ALL_FOOD, ...PLAN.medicine];

const AVOID = [
  { em: "🍵", en: "Tea / Coffee", te: "టీ / కాఫీ", enR: "Blocks iron absorption completely", teR: "ఇనుము శోషణను నిరోధిస్తుంది" },
  { em: "🥭", en: "Mango", te: "మామిడి", enR: "Very high sugar", teR: "చాలా ఎక్కువ చక్కెర" },
  { em: "🍇", en: "Grapes", te: "ద్రాక్ష", enR: "High sugar, raises BP", teR: "అధిక చక్కెర, BP పెంచుతుంది" },
  { em: "🍍", en: "Pineapple", te: "అనాస", enR: "Increases bleeding post biopsy", teR: "రక్తస్రావం పెంచుతుంది" },
  { em: "🫙", en: "Pickles (Avakaya/Gongura)", te: "ఊరగాయలు", enR: "Very high salt, raises BP", teR: "చాలా ఉప్పు, BP పెంచుతుంది" },
  { em: "🍭", en: "Sweets / Mithai / Halwa", te: "మిఠాయిలు / హల్వా", enR: "Raises blood sugar", teR: "రక్తంలో చక్కెర పెంచుతుంది" },
  { em: "🍞", en: "Maida / White bread / Biscuits", te: "మైదా / తెల్ల బ్రెడ్", enR: "Raises sugar rapidly", teR: "చక్కెర వేగంగా పెంచుతుంది" },
  { em: "🥤", en: "Cold drinks / Soft drinks", te: "శీతల పానీయాలు", enR: "Sugar and raises BP", teR: "చక్కెర, BP పెంచుతుంది" },
  { em: "🍟", en: "Fried foods (Bajji, Samosa)", te: "వేయించిన ఆహారాలు", enR: "Hard to digest, bad for recovery", teR: "జీర్ణించుకోవడం కష్టం" },
  { em: "🧂", en: "Papad / Namkeen / Salted snacks", te: "పాపడ్ / నమ్కీన్", enR: "High salt, raises BP", teR: "అధిక ఉప్పు, BP పెంచుతుంది" },
  { em: "🧃", en: "Packaged fruit juices", te: "ప్యాకేజ్డ్ రసాలు", enR: "Sugar and preservatives", teR: "చక్కెర, పరిరక్షకాలు" },
  { em: "🍈", en: "Raw papaya", te: "పచ్చి బొప్పాయి", enR: "Stimulates uterus — avoid completely", teR: "గర్భాశయాన్ని ఉత్తేజపరుస్తుంది" },
  { em: "🍔", en: "Fast food / Outside food", te: "ఫాస్ట్ ఫుడ్ / బయట తిండి", enR: "Unknown salt, oil, hygiene", teR: "తెలియని ఉప్పు, నూనె" },
  { em: "🍫", en: "Chocolates / Candy", te: "చాక్లెట్లు", enR: "High sugar", teR: "అధిక చక్కెర" },
  { em: "🍺", en: "Alcohol", te: "మద్యం", enR: "Never — especially pre surgery", teR: "అసలే వద్దు" },
  { em: "🧊", en: "Refrigerated leftover food", te: "ఫ్రిజ్ మిగిలిన ఆహారం", enR: "Infection risk pre surgery", teR: "సర్జరీ ముందు ఇన్ఫెక్షన్ రిస్క్" },
  { em: "🌾", en: "Sesame seeds (large amounts)", te: "నువ్వులు (పెద్ద మొత్తంలో)", enR: "Stimulates uterus pre surgery", teR: "సర్జరీ ముందు గర్భాశయాన్ని ఉత్తేజపరుస్తుంది" },
  { em: "🫚", en: "Excess oil / Fried curries", te: "అధిక నూనె / వేయించిన కూరలు", enR: "Heavy digestion post biopsy", teR: "జీర్ణానికి కష్టం" },
];

// ===== TRANSLATIONS =====
const TX = {
  en: {
    title: "Amma Recovery", sub: "Mrs. Jayalakshmi · Pre-Surgery",
    badge: "🏥 Surgery Prep Mode", bpT: "Telzun H 40mg — BP Tablet",
    bpS: "Every morning without fail", bpDone: "✓ Done", bpMark: "✅ Given",
    nut: "Nutrition Progress", iron: "🩸 Iron", prot: "💪 Protein",
    cal: "🔥 Calories", vit: "🍊 Vitamin C",
    add: "+ Add Extra Item", nToday: "Today", nHist: "History",
    nCook: "Cook", nAvoid: "Avoid",
    morn: "🌅 Morning — Sister", aft: "☀️ Afternoon — You",
    eve: "🌆 Evening — You", nite: "🌙 Night — Sister", med: "💊 Medicines",
    whatHap: "What happened?", giveEat: "Given / Eaten", skipIt: "Skipped",
    goBack: "Go Back", undoTitle: "Undo this item?",
    yesReset: "Yes, reset to Pending", noKeep: "No, keep as is",
    bpUndo: "Undo BP Tablet mark?", yesR: "Yes, reset", noK: "No, keep",
    addTitle: "Add Extra Item", save: "Save", cancel: "Cancel",
    viewDet: "View", pdf: "📄 Report", close: "Close",
    synced: "✅ Synced — both phones see same data",
    local: "⚠️ Not synced — check connection",
    srch: "Search foods to avoid...",
    noHist: "No history yet. Start tracking today!",
    given: "Given", skipped: "Skipped", extras: "Extras",
    resetDay: "🗑️ Reset Today", resetConfirm: "Reset entire day?",
    resetWarn: "This will clear ALL items marked today. This cannot be undone.",
    resetYes: "Yes, Reset Everything", resetNo: "Cancel",
    cookMorn: "🍳 Morning Cook Schedule",
    cookEve: "🌙 Evening Cook Schedule",
    cookDone: "✅ All Cooked!",
    howTo: "How to Cook",
    markCooked: "Mark Cooked",
    allCookedMsg: "All items cooked! Great job!",
    cookPage: "Cook Schedule",
    cookInstructions: "Step-by-step cooking guide",
  },
  te: {
    title: "అమ్మ రికవరీ", sub: "శ్రీమతి జయలక్ష్మి · సర్జరీకి ముందు",
    badge: "🏥 సర్జరీ సన్నాహక మోడ్", bpT: "టెల్జున్ H 40mg — BP మాత్ర",
    bpS: "ప్రతి రోజూ ఉదయం ఇవ్వండి", bpDone: "✓ ఇచ్చాను", bpMark: "✅ ఇచ్చారు",
    nut: "పోషణ పురోగతి", iron: "🩸 ఇనుము", prot: "💪 ప్రొటీన్",
    cal: "🔥 కేలరీలు", vit: "🍊 విటమిన్ C",
    add: "+ అదనపు ఆహారం జోడించు", nToday: "ఈరోజు", nHist: "చరిత్ర",
    nCook: "వంట", nAvoid: "నిషేధం",
    morn: "🌅 ఉదయం — అక్క బాధ్యత", aft: "☀️ మధ్యాహ్నం — మీ బాధ్యత",
    eve: "🌆 సాయంత్రం — మీ బాధ్యత", nite: "🌙 రాత్రి — అక్క బాధ్యత", med: "💊 మందులు",
    whatHap: "ఏం జరిగింది?", giveEat: "ఇచ్చారు / తిన్నారు", skipIt: "వదిలేశారు",
    goBack: "వెనక్కి", undoTitle: "ఈ గుర్తు తీసివేయాలా?",
    yesReset: "అవును, తీసివేయి", noKeep: "వద్దు, ఉంచు",
    bpUndo: "BP మాత్ర తీసివేయాలా?", yesR: "అవును తీసివేయి", noK: "వద్దు ఉంచు",
    addTitle: "అదనపు ఆహారం జోడించు", save: "సేవ్ చేయి", cancel: "రద్దు",
    viewDet: "చూడు", pdf: "📄 రిపోర్ట్", close: "మూయి",
    synced: "✅ సింక్ అయింది — రెండు ఫోన్లలో ఒకే డేటా",
    local: "⚠️ సింక్ కాలేదు — కనెక్షన్ చెక్ చేయండి",
    srch: "నిషేధిత ఆహారాలు వెతకండి...",
    noHist: "ఇంకా చరిత్ర లేదు. ఈరోజు నుండి ట్రాక్ చేయండి!",
    given: "ఇచ్చారు", skipped: "వదిలారు", extras: "అదనపు",
    resetDay: "🗑️ ఈరోజు రీసెట్", resetConfirm: "ఈ రోజు మొత్తం రీసెట్ చేయాలా?",
    resetWarn: "ఈరోజు మార్క్ చేసిన అన్నీ తొలగించబడతాయి. ఇది చేయలేము.",
    resetYes: "అవును, అన్నీ రీసెట్ చేయి", resetNo: "రద్దు",
    cookMorn: "🍳 ఉదయం వంట షెడ్యూల్",
    cookEve: "🌙 సాయంత్రం వంట షెడ్యూల్",
    cookDone: "✅ వంట అయింది!",
    howTo: "ఎలా వండాలి",
    markCooked: "వంటైంది",
    allCookedMsg: "అన్నీ వండారు! చాలా బాగు!",
    cookPage: "వంట షెడ్యూల్",
    cookInstructions: "దశల వారీ వంట గైడ్",
  }
};

function t(k) { return TX[lang][k] || TX.en[k] || k; }

// ===== FIREBASE SYNC =====
function saveToFirebase() {
  set(ref(db, DB_KEY), appData)
    .then(() => { synced = true; updateSyncUI(); })
    .catch(() => { synced = false; updateSyncUI(); });
}

function startFirebaseListener() {
  onValue(ref(db, DB_KEY), (snapshot) => {
    const data = snapshot.val();
    if (data) {
      appData = data;
      synced = true;
    } else {
      synced = true;
    }
    updateSyncUI();
    renderCurrentPage();
  }, () => {
    synced = false;
    updateSyncUI();
  });
}

function updateSyncUI() {
  const dot = document.querySelector(".sync-dot");
  const bar = document.getElementById("syncBar");
  const msg = document.getElementById("syncMsg");
  if (!dot || !bar || !msg) return;
  if (synced) {
    dot.className = "sync-dot sync-live";
    bar.className = "sync-bar sync-ok";
    msg.textContent = t("synced");
  } else {
    dot.className = "sync-dot sync-off";
    bar.className = "sync-bar sync-err";
    msg.textContent = t("local");
  }
}

// ===== RENDER =====
let currentPage = "today";
function renderCurrentPage() {
  if (currentPage === "today") renderToday();
  else if (currentPage === "history") renderHistory();
  else if (currentPage === "cook") renderCook();
  else if (currentPage === "avoid") renderAvoid();
}

function renderToday() {
  const d = getToday();
  const dateEl = document.getElementById("dateDisp");
  if (dateEl) dateEl.textContent = new Date().toLocaleDateString(
    lang === "te" ? "te-IN" : "en-IN",
    { weekday: "long", year: "numeric", month: "long", day: "numeric" }
  );

  // BP button
  const bpBtn = document.getElementById("bpBtn");
  if (bpBtn) {
    bpBtn.textContent = d.bp ? (t("bpMark") + (d.bpTime ? " " + d.bpTime : "")) : t("bpDone");
    bpBtn.className = "bpb " + (d.bp ? "bpb-done" : "bpb-pending");
  }

  // Nutrition
  let ti = 0, tp = 0, tc = 0, tv = 0;
  ALL_ITEMS.forEach(item => {
    if (d.items[item.id] === "done") {
      ti += item.ir; tp += item.pr; tc += item.ca; tv += item.vi;
    }
  });
  const setBar = (id, val, max, unit, valId) => {
    const bar = document.getElementById(id);
    const label = document.getElementById(valId);
    if (bar) bar.style.width = Math.min(100, (val / max) * 100) + "%";
    if (label) label.textContent = (val % 1 === 0 ? val : val.toFixed(1)) + unit + " / " + max + unit;
  };
  setBar("iBar", ti, 18, "mg", "iVl");
  setBar("pBar", tp, 50, "g", "pVl");
  setBar("cBar", tc, 1800, "kcal", "cVl");
  setBar("vBar", tv, 500, "mg", "vVl");

  // Diet sections
  const sec = document.getElementById("dietSec");
  if (!sec) return;
  sec.innerHTML = "";

  const shifts = [
    { k: "morning", cls: "sl-m", lb: t("morn"), owner: "sister" },
    { k: "afternoon", cls: "sl-a", lb: t("aft"), owner: "you" },
    { k: "evening", cls: "sl-e", lb: t("eve"), owner: "you" },
    { k: "night", cls: "sl-n", lb: t("nite"), owner: "sister" },
    { k: "medicine", cls: "sl-med", lb: t("med"), owner: null },
  ];

  shifts.forEach(sh => {
    const items = PLAN[sh.k];
    const wrap = document.createElement("div");
    const lbl = document.createElement("div");
    lbl.className = "sl " + sh.cls;
    lbl.textContent = sh.lb;
    wrap.appendChild(lbl);

    items.forEach(item => {
      const st = d.items[item.id] || "pending";
      const nm = lang === "te" ? item.te : item.en;
      const div = document.createElement("div");
      div.className = "di" + (st === "done" ? " done" : st === "skipped" ? " skipped" : "") + (sh.k === "medicine" ? " med" : "");

      let ownerTag = "";
      if (sh.owner === "you") ownerTag = `<span class="tag tag-you">${lang === "te" ? "మీరు" : "You"}</span>`;
      else if (sh.owner === "sister") ownerTag = `<span class="tag tag-sis">${lang === "te" ? "అక్క" : "Sister"}</span>`;

      const tm = d.items[item.id + "_t"] ? `<div class="itime">✓ ${d.items[item.id + "_t"]}</div>` : "";
      div.innerHTML = `<div class="chk">${st === "done" ? "✓" : st === "skipped" ? "✗" : ""}</div>
        <div class="ii"><div class="iname">${nm}${ownerTag}</div><div class="idet">${item.dt}</div>${tm}</div>
        <div class="iem">${item.em}</div>`;
      div.addEventListener("click", () => onItemClick(item.id));
      wrap.appendChild(div);
    });
    sec.appendChild(wrap);
  });

  // Extras
  if (d.extras && d.extras.length > 0) {
    const ediv = document.createElement("div");
    const elbl = document.createElement("div");
    elbl.className = "sec-div";
    elbl.textContent = "➕ " + (lang === "te" ? "అదనపు" : "Extras Added");
    ediv.appendChild(elbl);
    d.extras.forEach(ex => {
      const xd = document.createElement("div");
      xd.className = "di done";
      xd.innerHTML = `<div class="chk">✓</div><div class="ii"><div class="iname">${ex.name}</div>
        <div class="idet">${ex.shift} · ${ex.time}</div></div><div class="iem">➕</div>`;
      ediv.appendChild(xd);
    });
    sec.appendChild(ediv);
  }
}

function renderHistory() {
  const hl = document.getElementById("hiList");
  if (!hl) return;
  hl.innerHTML = "";
  const keys = Object.keys(appData).filter(k => k !== TODAY).sort().reverse();
  if (!keys.length) {
    hl.innerHTML = `<div class="empty">📭 ${t("noHist")}</div>`;
    return;
  }
  keys.forEach(key => {
    const d = appData[key] || { items: {}, bp: false, extras: [] };
    const dn = ALL_FOOD.filter(i => d.items && d.items[i.id] === "done").length;
    const sk = ALL_FOOD.filter(i => d.items && d.items[i.id] === "skipped").length;
    const ex = (d.extras || []).length;
    const ds = new Date(key).toLocaleDateString(lang === "te" ? "te-IN" : "en-IN", { weekday: "long", month: "long", day: "numeric" });
    const dv = document.createElement("div");
    dv.className = "hday";
    dv.innerHTML = `<div style="font-size:15px;font-weight:800;margin-bottom:9px;display:flex;justify-content:space-between;">
      <span>${ds}</span><span>${d.bp ? "💊✅" : "💊❌"}</span></div>
      <span class="hstat hs-g">✅ ${dn} ${t("given")}</span>
      <span class="hstat hs-r">❌ ${sk} ${t("skipped")}</span>
      ${ex ? `<span class="hstat hs-b">➕ ${ex} ${t("extras")}</span>` : ""}
      <div style="margin-top:9px;display:flex;gap:8px;">
        <button class="vb" style="background:var(--bll);color:var(--bl);border:none;border-radius:10px;padding:7px 14px;font-weight:800;font-size:12px;cursor:pointer;font-family:var(--fn);">${t("viewDet")}</button>
        <button class="pb" style="background:var(--grl);color:var(--gr);border:none;border-radius:10px;padding:7px 14px;font-weight:800;font-size:12px;cursor:pointer;font-family:var(--fn);">${t("pdf")}</button>
      </div>`;
    dv.querySelector(".vb").addEventListener("click", () => showHistDetail(key));
    dv.querySelector(".pb").addEventListener("click", () => dlReport(key));
    hl.appendChild(dv);
  });
}

function renderCook() {
  const cookPlan = getTodayCookPlan();
  const d = getToday();
  const hour = new Date().getHours();
  const isMorning = hour < 14;
  const session = isMorning ? "morning" : "evening";
  const items = isMorning ? cookPlan.morningCook : cookPlan.eveningCook;
  const title = isMorning ? t("cookMorn") : t("cookEve");

  const pg = document.getElementById("pg-cook");
  if (!pg) return;
  pg.innerHTML = `
    <div style="font-size:12px;color:var(--sb);font-weight:700;margin-bottom:9px;">
      ${new Date().toLocaleDateString(lang === "te" ? "te-IN" : "en-IN", { weekday: "long", month: "long", day: "numeric" })}
    </div>
    <div class="card">
      <div style="font-size:16px;font-weight:900;margin-bottom:4px;">${title}</div>
      <div style="font-size:12px;color:var(--sb);margin-bottom:14px;">
        ${lang === "te" ? "ఈ వంట ఉదయం + మధ్యాహ్నం భోజనానికి సరిపోతుంది" : (isMorning ? "This cook serves Breakfast + Lunch" : "This cook serves Dinner + next morning")}
      </div>
      <div id="cookItemsList"></div>
      <button id="nextSessionBtn" class="rpb" style="margin-top:10px;display:none;">
        ${lang === "te" ? "తదుపరి వంట షెడ్యూల్ చూడు" : "View Next Cook Schedule"}
      </button>
    </div>
    <div class="card" style="margin-top:8px;">
      <div style="font-size:14px;font-weight:800;margin-bottom:10px;">
        ${lang === "te" ? "ఈరోజు వంట గురించి" : "Today's Cook Summary"}
      </div>
      <div style="font-size:13px;color:var(--sb);line-height:1.7;">
        🌅 <strong>${lang === "te" ? "ఉదయం వంట" : "Morning cook"}</strong>: ${cookPlan.morningCook.map(i => lang === "te" ? i.teName : i.name).join(", ")}<br>
        🌙 <strong>${lang === "te" ? "సాయంత్రం వంట" : "Evening cook"}</strong>: ${cookPlan.eveningCook.map(i => lang === "te" ? i.teName : i.name).join(", ")}
      </div>
    </div>`;

  renderCookItems(session, items);

  const nextBtn = document.getElementById("nextSessionBtn");
  if (nextBtn) {
    const allCooked = items.every(i => d.cook && d.cook[session + "_" + i.id]);
    if (allCooked) nextBtn.style.display = "block";
    nextBtn.addEventListener("click", () => {
      const otherSession = isMorning ? "evening" : "morning";
      const otherItems = isMorning ? cookPlan.eveningCook : cookPlan.morningCook;
      const otherTitle = isMorning ? t("cookEve") : t("cookMorn");
      const list = document.getElementById("cookItemsList");
      if (list) {
        document.querySelector(".card div:first-child").textContent = otherTitle;
        renderCookItems(otherSession, otherItems);
        nextBtn.style.display = "none";
      }
    });
  }
}

function renderCookItems(session, items) {
  const list = document.getElementById("cookItemsList");
  if (!list) return;
  list.innerHTML = "";
  const d = getToday();

  items.forEach(item => {
    const cookKey = session + "_" + item.id;
    const isCooked = d.cook && d.cook[cookKey];
    const div = document.createElement("div");
    div.className = "cook-item" + (isCooked ? " cooked" : "");
    const nm = lang === "te" ? item.teName : item.name;
    div.innerHTML = `
      <div class="cook-chk">${isCooked ? "✓" : ""}</div>
      <div class="cook-name">${nm}</div>
      <button class="cook-how">${t("howTo")}</button>`;

    div.querySelector(".cook-chk").addEventListener("click", () => {
      const d2 = getToday();
      if (!d2.cook) d2.cook = {};
      if (d2.cook[cookKey]) {
        delete d2.cook[cookKey];
      } else {
        d2.cook[cookKey] = nowStr();
      }
      appData[TODAY] = d2;
      saveToFirebase();
      renderCook();
    });

    div.querySelector(".cook-how").addEventListener("click", () => {
      showHowToCook(item.id, nm);
    });

    list.appendChild(div);
  });

  // All cooked check
  const allCooked = items.every(i => d.cook && d.cook[session + "_" + i.id]);
  if (allCooked) {
    const done = document.createElement("div");
    done.style.cssText = "text-align:center;padding:14px;background:var(--grl);border-radius:12px;color:var(--gr);font-weight:800;font-size:15px;margin-top:8px;";
    done.textContent = t("cookDone");
    list.appendChild(done);
    const nextBtn = document.getElementById("nextSessionBtn");
    if (nextBtn) nextBtn.style.display = "block";
  }
}

function showHowToCook(itemId, itemName) {
  const steps = COOK_HOW[itemId] || ["No recipe available yet"];
  const modal = document.getElementById("howMod");
  const title = document.getElementById("howTitle");
  const content = document.getElementById("howContent");
  if (!modal || !title || !content) return;
  title.textContent = `🍳 ${itemName}`;
  content.innerHTML = steps.map((step, i) =>
    `<div class="how-step"><div class="step-num">${i + 1}</div><div class="step-text">${step}</div></div>`
  ).join("");
  openModal("howMod");
}

function renderAvoid() {
  const q = (document.getElementById("avSrch") || {}).value || "";
  const ql = q.toLowerCase();
  const al = document.getElementById("avList");
  if (!al) return;
  al.innerHTML = "";
  AVOID.filter(i => !q || i.en.toLowerCase().includes(ql) || i.te.includes(q) || i.enR.toLowerCase().includes(ql))
    .forEach(item => {
      const dv = document.createElement("div");
      dv.className = "av-item";
      dv.innerHTML = `<div style="font-size:22px;">${item.em}</div>
        <div><div style="font-size:14px;font-weight:700;">${lang === "te" ? item.te : item.en}</div>
        <div style="font-size:11px;color:var(--sb);">${lang === "te" ? item.teR : item.enR}</div></div>`;
      al.appendChild(dv);
    });
}

// ===== COOK TOAST =====
function checkCookToast() {
  const hour = new Date().getHours();
  const isMorningTime = hour >= 6 && hour < 9;
  const isEveningTime = hour >= 17 && hour < 20;
  if ((isMorningTime || isEveningTime) && !cookToastVisible) {
    showCookToast();
  }
}

function showCookToast() {
  const existing = document.getElementById("cookToast");
  if (existing) existing.remove();
  const hour = new Date().getHours();
  const isMorning = hour < 14;
  const cookPlan = getTodayCookPlan();
  const session = isMorning ? "morning" : "evening";
  const items = isMorning ? cookPlan.morningCook : cookPlan.eveningCook;
  const title = isMorning ? t("cookMorn") : t("cookEve");
  const d = getToday();
  const allCooked = items.every(i => d.cook && d.cook[session + "_" + i.id]);
  if (allCooked) return;

  const toast = document.createElement("div");
  toast.id = "cookToast";
  toast.className = "cook-toast";
  toast.innerHTML = `
    <div class="cook-toast-hdr">
      <div><div class="cook-toast-title">${title}</div>
      <div class="cook-toast-sub">${lang === "te" ? "వంట చేయాల్సిన అంశాలు" : "Items to cook now"}</div></div>
      <button class="cook-toast-close" id="toastClose">✕</button>
    </div>
    <div id="toastItems"></div>
    <button class="cook-done-btn" id="toastViewAll">${lang === "te" ? "వంట పేజీ తెరవు" : "Open Cook Page"}</button>`;

  const itemsDiv = toast.querySelector("#toastItems");
  items.forEach(item => {
    const cookKey = session + "_" + item.id;
    const isCooked = d.cook && d.cook[cookKey];
    const row = document.createElement("div");
    row.className = "cook-item" + (isCooked ? " cooked" : "");
    row.innerHTML = `<div class="cook-chk">${isCooked ? "✓" : ""}</div>
      <div class="cook-name">${lang === "te" ? item.teName : item.name}</div>
      <button class="cook-how">${t("howTo")}</button>`;
    row.querySelector(".cook-chk").addEventListener("click", () => {
      const d2 = getToday();
      if (!d2.cook) d2.cook = {};
      if (d2.cook[cookKey]) delete d2.cook[cookKey];
      else d2.cook[cookKey] = nowStr();
      appData[TODAY] = d2;
      saveToFirebase();
      showCookToast();
    });
    row.querySelector(".cook-how").addEventListener("click", () => {
      showHowToCook(item.id, lang === "te" ? item.teName : item.name);
    });
    itemsDiv.appendChild(row);
  });

  document.body.appendChild(toast);
  cookToastVisible = true;
  toast.querySelector("#toastClose").addEventListener("click", () => {
    toast.remove(); cookToastVisible = false;
  });
  toast.querySelector("#toastViewAll").addEventListener("click", () => {
    toast.remove(); cookToastVisible = false;
    showPage("cook");
  });
}

// ===== ITEM CLICK =====
function onItemClick(id) {
  currentItemId = id;
  const d = getToday();
  const st = d.items[id] || "pending";
  if (st === "done" || st === "skipped") {
    const item = ALL_ITEMS.find(i => i.id === id);
    const nm = lang === "te" ? item.te : item.en;
    document.getElementById("uName").textContent = nm + " — " + (st === "done" ? t("giveEat") : t("skipIt"));
    openModal("undoMod");
  } else {
    openModal("itmMod");
  }
}

function markItem(st) {
  const d = getToday();
  d.items[currentItemId] = st;
  if (st === "done") d.items[currentItemId + "_t"] = nowStr();
  else delete d.items[currentItemId + "_t"];
  appData[TODAY] = d;
  saveToFirebase();
  closeModal("itmMod");
  renderToday();
}

function undoItem() {
  const d = getToday();
  delete d.items[currentItemId];
  delete d.items[currentItemId + "_t"];
  appData[TODAY] = d;
  saveToFirebase();
  closeModal("undoMod");
  renderToday();
}

function markBP() {
  const d = getToday();
  if (d.bp) { openModal("bpUndoMod"); return; }
  d.bp = true; d.bpTime = nowStr();
  appData[TODAY] = d;
  saveToFirebase();
  renderToday();
}

function bpUndo() {
  const d = getToday();
  d.bp = false; d.bpTime = null;
  appData[TODAY] = d;
  saveToFirebase();
  closeModal("bpUndoMod");
  renderToday();
}

function resetDay() {
  appData[TODAY] = emptyDay();
  saveToFirebase();
  closeModal("resetMod");
  renderToday();
}

function saveExtra() {
  const name = document.getElementById("exN").value.trim();
  if (!name) { alert("Please enter item name"); return; }
  const time = document.getElementById("exTm").value.trim() || nowStr();
  const shift = document.getElementById("exSh").value;
  const d = getToday();
  if (!d.extras) d.extras = [];
  d.extras.push({ name, time, shift });
  appData[TODAY] = d;
  saveToFirebase();
  closeModal("exMod");
  document.getElementById("exN").value = "";
  document.getElementById("exTm").value = "";
  renderToday();
}

function showHistDetail(key) {
  currentHistKey = key;
  const d = appData[key] || { items: {}, extras: [] };
  let html = "";
  ALL_ITEMS.forEach(item => {
    const st = (d.items && d.items[item.id]) || "pending";
    const nm = lang === "te" ? item.te : item.en;
    const col = st === "done" ? "var(--gr)" : st === "skipped" ? "var(--re)" : "var(--sb)";
    const ic = st === "done" ? "✅" : st === "skipped" ? "❌" : "⬜";
    const tm = d.items && d.items[item.id + "_t"] ? " · " + d.items[item.id + "_t"] : "";
    html += `<div style="display:flex;gap:9px;align-items:center;padding:8px 0;border-bottom:1px solid var(--bd);">
      <span>${ic}</span><div><div style="font-size:13px;font-weight:700;color:${col};">${nm}</div>
      <div style="font-size:10px;color:var(--sb);">${item.dt}${tm}</div></div></div>`;
  });
  if (d.extras && d.extras.length) {
    html += `<div style="font-weight:800;margin:11px 0 6px;">➕ Extras</div>`;
    d.extras.forEach(ex => {
      html += `<div style="padding:7px 0;border-bottom:1px solid var(--bd);">
        <div style="font-weight:700;">${ex.name}</div>
        <div style="font-size:11px;color:var(--sb);">${ex.shift} · ${ex.time}</div></div>`;
    });
  }
  document.getElementById("hdC").innerHTML = html;
  document.getElementById("hdT").textContent = new Date(key).toLocaleDateString(
    lang === "te" ? "te-IN" : "en-IN", { weekday: "long", month: "long", day: "numeric" }
  );
  openModal("hdMod");
}

function dlReport(key) {
  const d = appData[key] || { items: {}, extras: [], bp: false };
  const ds = new Date(key).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const n = ALL_ITEMS.reduce((a, i) => {
    if (d.items && d.items[i.id] === "done") { a.ir += i.ir; a.pr += i.pr; a.ca += i.ca; a.vi += i.vi; }
    return a;
  }, { ir: 0, pr: 0, ca: 0, vi: 0 });
  const rows = ALL_ITEMS.map(i => {
    const st = (d.items && d.items[i.id]) || "pending";
    const tm = (d.items && d.items[i.id + "_t"]) || "";
    const bg = st === "done" ? "#eafaf1" : st === "skipped" ? "#fdecea" : "#fafafa";
    const col = st === "done" ? "#27ae60" : st === "skipped" ? "#e74c3c" : "#888";
    return `<tr style="background:${bg}"><td style="color:${col};font-weight:700;padding:8px">${st.toUpperCase()}</td>
      <td style="padding:8px;font-weight:600">${i.en}</td>
      <td style="padding:8px;color:#888">${i.dt}</td>
      <td style="padding:8px;color:${col}">${tm}</td></tr>`;
  }).join("");
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Diet Report</title>
    <style>body{font-family:Arial,sans-serif;padding:24px;max-width:800px;margin:0 auto}
    h1{color:#1a3a5c}h2{color:#1a6bbf;margin-top:20px}
    table{width:100%;border-collapse:collapse;font-size:13px;margin-top:8px}
    th{background:#1a6bbf;color:white;padding:8px;text-align:left}
    .bar{height:12px;background:#e2e8f0;border-radius:6px;overflow:hidden;margin:4px 0}
    .fill{height:100%;border-radius:6px}</style></head><body>
    <h1>Amma Recovery — Daily Diet Report</h1>
    <p><strong>Date:</strong> ${ds}</p>
    <p><strong>BP Tablet:</strong> ${d.bp ? `<span style="background:#27ae60;color:white;padding:3px 8px;border-radius:4px">GIVEN ${d.bpTime || ""}</span>` : `<span style="background:#e74c3c;color:white;padding:3px 8px;border-radius:4px">NOT MARKED</span>`}</p>
    <h2>Nutrition</h2>
    <table><tr><th>Nutrient</th><th>Consumed</th><th>Target</th><th>Progress</th></tr>
    <tr><td>Iron</td><td>${n.ir.toFixed(1)}mg</td><td>18mg</td><td><div class="bar"><div class="fill" style="width:${Math.min(100,(n.ir/18)*100).toFixed(0)}%;background:#e74c3c"></div></div></td></tr>
    <tr><td>Protein</td><td>${n.pr.toFixed(1)}g</td><td>50g</td><td><div class="bar"><div class="fill" style="width:${Math.min(100,(n.pr/50)*100).toFixed(0)}%;background:#27ae60"></div></div></td></tr>
    <tr><td>Calories</td><td>${Math.round(n.ca)}</td><td>1800</td><td><div class="bar"><div class="fill" style="width:${Math.min(100,(n.ca/1800)*100).toFixed(0)}%;background:#f39c12"></div></div></td></tr>
    <tr><td>Vitamin C</td><td>${n.vi}mg</td><td>500mg</td><td><div class="bar"><div class="fill" style="width:${Math.min(100,(n.vi/500)*100).toFixed(0)}%;background:#7d3c98"></div></div></td></tr>
    </table>
    <h2>Diet Items</h2><table><tr><th>Status</th><th>Item</th><th>When</th><th>Time</th></tr>${rows}</table>
    <p style="color:#888;font-size:11px;margin-top:20px">Generated: ${new Date().toLocaleString("en-IN")}</p>
    </body></html>`;
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `amma-diet-${key}.html`; a.click();
  URL.revokeObjectURL(url);
}

// ===== MODAL HELPERS =====
function openModal(id) { document.getElementById(id).classList.add("open"); }
function closeModal(id) { document.getElementById(id).classList.remove("open"); }

// ===== PAGE NAV =====
function showPage(name) {
  currentPage = name;
  document.querySelectorAll(".pg").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".nb").forEach(b => b.classList.remove("active"));
  const pg = document.getElementById("pg-" + name);
  const nb = document.getElementById("nb-" + name);
  if (pg) pg.classList.add("active");
  if (nb) nb.classList.add("active");
  renderCurrentPage();
}

// ===== APPLY LANGUAGE =====
function applyLang() {
  const map = {
    hT: "title", hS: "sub", sBdg: "badge", bpT2: "bpT", bpS2: "bpS",
    nTitle: "nut", iLb: "iron", pLb: "prot", cLb: "cal", vLb: "vit",
    addBtn: "add", imT: "whatHap", aD: "giveEat", aSkip: "skipIt", aBk: "goBack",
    uT: "undoTitle", uY: "yesReset", uN: "noKeep",
    buT: "bpUndo", buY: "yesR", buN: "noK",
    exT: "addTitle", exSvBtn: "save", exCnBtn: "cancel",
    hdCl: "close", dPdf: "pdf",
    rTitle: "resetConfirm", rWarn: "resetWarn", rYes: "resetYes", rNo: "resetNo",
    resetBtn: "resetDay",
  };
  Object.keys(map).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = t(map[id]);
  });
  const srch = document.getElementById("avSrch");
  if (srch) srch.placeholder = t("srch");
  document.getElementById("nb-today").querySelector("span:last-child").textContent = t("nToday");
  document.getElementById("nb-history").querySelector("span:last-child").textContent = t("nHist");
  document.getElementById("nb-cook").querySelector("span:last-child").textContent = t("nCook");
  document.getElementById("nb-avoid").querySelector("span:last-child").textContent = t("nAvoid");
  renderCurrentPage();
}

// ===== BUILD HTML =====
function buildApp() {
  document.getElementById("app").innerHTML = `
  <!-- HEADER -->
  <div class="hdr">
    <div class="hdr-top">
      <div><div class="htitle">🌿 <span id="hT">Amma Recovery</span></div><div class="hsub" id="hS">Mrs. Jayalakshmi</div></div>
      <button class="lbtn" id="lBtn">తెలుగు</button>
    </div>
    <div class="hdr-bottom">
      <div class="sbadge" id="sBdg">Surgery Prep</div>
      <div style="font-size:11px;color:rgba(255,255,255,.85);font-weight:700;">
        <span class="sync-dot sync-off"></span><span id="syncLive">Connecting...</span>
      </div>
    </div>
  </div>

  <!-- SYNC BAR -->
  <div class="sync-bar sync-err" id="syncBar">
    <span>⚠️</span><span id="syncMsg">Connecting to cloud...</span>
  </div>

  <!-- TODAY PAGE -->
  <div class="pg active" id="pg-today">
    <div id="dateDisp" style="font-size:12px;color:var(--sb);font-weight:700;margin-bottom:9px;"></div>
    <div class="bpa">
      <span style="font-size:26px;">💊</span>
      <div style="flex:1;">
        <div id="bpT2" style="font-size:14px;font-weight:700;">Telzun H 40mg</div>
        <div style="font-size:11px;opacity:.9;" id="bpS2">Every morning</div>
      </div>
      <button class="bpb bpb-pending" id="bpBtn">✓ Done</button>
    </div>
    <div class="card">
      <div style="font-size:14px;font-weight:800;margin-bottom:11px;">📊 <span id="nTitle">Nutrition Progress</span></div>
      <div class="nut-sec"><div class="nut-lbl"><span id="iLb">🩸 Iron</span><span id="iVl">0/18mg</span></div><div class="nut-bar"><div class="nut-fill f-iron" id="iBar" style="width:0%"></div></div></div>
      <div class="nut-sec"><div class="nut-lbl"><span id="pLb">💪 Protein</span><span id="pVl">0/50g</span></div><div class="nut-bar"><div class="nut-fill f-prot" id="pBar" style="width:0%"></div></div></div>
      <div class="nut-sec"><div class="nut-lbl"><span id="cLb">🔥 Calories</span><span id="cVl">0/1800</span></div><div class="nut-bar"><div class="nut-fill f-cal" id="cBar" style="width:0%"></div></div></div>
      <div class="nut-sec"><div class="nut-lbl"><span id="vLb">🍊 Vit C</span><span id="vVl">0/500mg</span></div><div class="nut-bar"><div class="nut-fill f-vit" id="vBar" style="width:0%"></div></div></div>
    </div>
    <div id="dietSec"></div>
    <button class="add-btn" id="addBtn">+ Add Extra Item</button>
    <div class="danger-box">
      <div class="danger-title">⚠️ <span id="resetBtn">🗑️ Reset Today</span></div>
      <div class="danger-sub" id="rWarnSmall">Clears all marks for today</div>
      <button class="reset-btn" id="resetTrigger">🗑️ Reset Entire Day</button>
    </div>
  </div>

  <!-- HISTORY PAGE -->
  <div class="pg" id="pg-history">
    <div style="font-size:14px;font-weight:800;margin-bottom:11px;">📅 History</div>
    <div id="hiList"></div>
  </div>

  <!-- COOK PAGE -->
  <div class="pg" id="pg-cook"></div>

  <!-- AVOID PAGE -->
  <div class="pg" id="pg-avoid">
    <input type="text" class="srch" id="avSrch" placeholder="Search foods to avoid..."/>
    <div id="avList"></div>
  </div>

  <!-- BOTTOM NAV -->
  <div class="bnav">
    <button class="nb active" id="nb-today"><span class="ni">🌿</span><span>Today</span></button>
    <button class="nb" id="nb-history"><span class="ni">📅</span><span>History</span></button>
    <button class="nb" id="nb-cook"><span class="ni">🍳</span><span>Cook</span></button>
    <button class="nb" id="nb-avoid"><span class="ni">🚫</span><span>Avoid</span></button>
  </div>

  <!-- ITEM MODAL -->
  <div class="ov" id="itmMod">
    <div class="mod">
      <div class="mtitle" id="imT">What happened?</div>
      <button class="abtn" id="bDone" style="border-color:var(--gr);"><span class="ai">✅</span><span id="aD">Given / Eaten</span></button>
      <button class="abtn" id="bSkip" style="border-color:var(--re);"><span class="ai">❌</span><span id="aSkip">Skipped</span></button>
      <button class="abtn" id="bBk" style="border-color:var(--bd);"><span class="ai">↩️</span><span id="aBk">Go Back</span></button>
    </div>
  </div>

  <!-- UNDO MODAL -->
  <div class="ov" id="undoMod">
    <div class="mod">
      <div class="mtitle" id="uT">Undo this item?</div>
      <div id="uName" style="text-align:center;font-size:13px;color:var(--sb);padding:10px;background:var(--bg);border-radius:10px;margin-bottom:15px;"></div>
      <button class="abtn" id="bUY" style="border-color:var(--or);"><span class="ai">↩️</span><span id="uY">Yes, reset to Pending</span></button>
      <button class="abtn" id="bUN" style="border-color:var(--bd);"><span class="ai">✅</span><span id="uN">No, keep as is</span></button>
    </div>
  </div>

  <!-- BP UNDO MODAL -->
  <div class="ov" id="bpUndoMod">
    <div class="mod">
      <div class="mtitle" id="buT">Undo BP Tablet?</div>
      <button class="abtn" id="bBUY" style="border-color:var(--or);"><span class="ai">↩️</span><span id="buY">Yes, reset</span></button>
      <button class="abtn" id="bBUN" style="border-color:var(--bd);"><span class="ai">✅</span><span id="buN">No, keep</span></button>
    </div>
  </div>

  <!-- RESET DAY MODAL -->
  <div class="ov" id="resetMod">
    <div class="mod">
      <div class="mtitle" style="color:var(--re);">⚠️ <span id="rTitle">Reset Today?</span></div>
      <div style="background:#fff5f5;border:2px solid var(--re);border-radius:12px;padding:14px;margin-bottom:14px;text-align:center;">
        <div style="font-size:32px;margin-bottom:8px;">🗑️</div>
        <div style="font-size:13px;color:#666;" id="rWarn">This will clear ALL items. Cannot be undone.</div>
      </div>
      <button class="mbtn btn-r" id="rYes">Yes, Reset Everything</button>
      <button class="mbtn btn-gr" id="rNo">Cancel</button>
    </div>
  </div>

  <!-- ADD EXTRA MODAL -->
  <div class="ov" id="exMod">
    <div class="mod">
      <div class="mtitle" id="exT">Add Extra Item</div>
      <input type="text" class="minput" id="exN" placeholder="Item name"/>
      <input type="text" class="minput" id="exTm" placeholder="Time (e.g. 3:30 PM)"/>
      <select class="minput" id="exSh">
        <option value="morning">Morning</option>
        <option value="afternoon">Afternoon</option>
        <option value="evening">Evening</option>
        <option value="night">Night</option>
      </select>
      <button class="mbtn btn-g" id="exSvBtn">Save</button>
      <button class="mbtn btn-gr" id="exCnBtn">Cancel</button>
    </div>
  </div>

  <!-- HISTORY DETAIL MODAL -->
  <div class="ov" id="hdMod">
    <div class="mod">
      <div class="mtitle" id="hdT">Day Details</div>
      <button class="rpb" id="dPdf">📄 Download Report</button>
      <div id="hdC"></div>
      <button class="mbtn btn-gr" id="hdCl">Close</button>
    </div>
  </div>

  <!-- HOW TO COOK MODAL (CENTER) -->
  <div class="ov" id="howMod" style="align-items:center;">
    <div class="mod mod-center">
      <div class="mtitle" id="howTitle">How to Cook</div>
      <div id="howContent"></div>
      <button class="mbtn btn-b" id="howCl">Got it!</button>
    </div>
  </div>
  `;

  // Wire events
  document.getElementById("lBtn").addEventListener("click", () => {
    lang = lang === "en" ? "te" : "en";
    document.getElementById("lBtn").textContent = lang === "en" ? "తెలుగు" : "English";
    applyLang();
  });
  document.getElementById("nb-today").addEventListener("click", () => showPage("today"));
  document.getElementById("nb-history").addEventListener("click", () => showPage("history"));
  document.getElementById("nb-cook").addEventListener("click", () => showPage("cook"));
  document.getElementById("nb-avoid").addEventListener("click", () => showPage("avoid"));
  document.getElementById("bpBtn").addEventListener("click", markBP);
  document.getElementById("bDone").addEventListener("click", () => markItem("done"));
  document.getElementById("bSkip").addEventListener("click", () => markItem("skipped"));
  document.getElementById("bBk").addEventListener("click", () => closeModal("itmMod"));
  document.getElementById("bUY").addEventListener("click", undoItem);
  document.getElementById("bUN").addEventListener("click", () => closeModal("undoMod"));
  document.getElementById("bBUY").addEventListener("click", bpUndo);
  document.getElementById("bBUN").addEventListener("click", () => closeModal("bpUndoMod"));
  document.getElementById("addBtn").addEventListener("click", () => openModal("exMod"));
  document.getElementById("exSvBtn").addEventListener("click", saveExtra);
  document.getElementById("exCnBtn").addEventListener("click", () => closeModal("exMod"));
  document.getElementById("hdCl").addEventListener("click", () => closeModal("hdMod"));
  document.getElementById("dPdf").addEventListener("click", () => { if (currentHistKey) dlReport(currentHistKey); });
  document.getElementById("howCl").addEventListener("click", () => closeModal("howMod"));
  document.getElementById("resetTrigger").addEventListener("click", () => openModal("resetMod"));
  document.getElementById("rYes").addEventListener("click", resetDay);
  document.getElementById("rNo").addEventListener("click", () => closeModal("resetMod"));
  document.getElementById("avSrch").addEventListener("input", renderAvoid);
  document.querySelectorAll(".ov").forEach(o => {
    o.addEventListener("click", e => { if (e.target === o) o.classList.remove("open"); });
  });

  applyLang();
  checkCookToast();
  setInterval(checkCookToast, 60000);
}

// ===== INIT =====
buildApp();
startFirebaseListener();
