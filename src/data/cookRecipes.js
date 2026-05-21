export const COOK_PATTERNS = [
  { // Pattern A (0,3,6 -> days Wed,Sat,Tue)
    morningCook: [
      { id: "mc-ragi", name: "Ragi Porridge with jaggery", teName: "బెల్లంతో రాగి జావ", type: "porridge" },
      { id: "mc-palak-dal", name: "Palak Dal", teName: "పాలకూర పప్పు", type: "dal" },
      { id: "mc-carrot", name: "Carrot stir fry", teName: "క్యారెట్ వేపుడు", type: "curry" },
    ],
    eveningCook: [
      { id: "ec-methi-roti", name: "Methi Roti (2)", teName: "మెంతి రోటీ (2)", type: "roti" },
      { id: "ec-toor-dal", name: "Toor Dal", teName: "కందిపప్పు", type: "dal" },
      { id: "ec-bottlegourd", name: "Bottle gourd curry", teName: "సొరకాయ కూర", type: "curry" },
    ]
  },
  { // Pattern B (1,4 -> Thu,Sun)
    morningCook: [
      { id: "mc-oats", name: "Oats porridge with jaggery", teName: "బెల్లంతో ఓట్స్ జావ", type: "porridge" },
      { id: "mc-moong-dal", name: "Moong Dal", teName: "పెసరపప్పు", type: "dal" },
      { id: "mc-beetroot", name: "Beetroot curry", teName: "బీట్‌రూట్ కూర", type: "curry" },
    ],
    eveningCook: [
      { id: "ec-ragi-roti", name: "Ragi Roti (2)", teName: "రాగి రొట్టె (2)", type: "roti" },
      { id: "ec-horse-gram", name: "Horse gram soup (Ulavacharu)", teName: "ఉలవచారు", type: "dal" },
      { id: "ec-drumstick", name: "Drumstick sambar", teName: "మునగకాయ సాంబారు", type: "curry" },
    ]
  },
  { // Pattern C (2,5 -> Fri,Mon)
    morningCook: [
      { id: "mc-ragi2", name: "Ragi Porridge with jaggery", teName: "బెల్లంతో రాగి జావ", type: "porridge" },
      { id: "mc-toor2", name: "Toor Dal", teName: "కందిపప్పు", type: "dal" },
      { id: "mc-ladiesfinger", name: "Ladies finger fry", teName: "బెండకాయ వేపుడు", type: "curry" },
    ],
    eveningCook: [
      { id: "ec-wheat-roti", name: "Wheat Roti (2)", teName: "గోధుమ రొట్టె (2)", type: "roti" },
      { id: "ec-moong2", name: "Moong Dal", teName: "పెసరపప్పు", type: "dal" },
      { id: "ec-bittergourd", name: "Bitter gourd fry", teName: "కాకరకాయ వేపుడు", type: "curry" },
    ]
  }
];

export const COOK_TIPS = {
  "mc-ragi":       { en: "💚 Use only jaggery — no sugar. Low flame prevents lumps. No salt needed.", te: "💚 బెల్లమే వాడండి — చక్కెర వద్దు. తక్కువ మంటపై వండండి. ఉప్పు అవసరం లేదు." },
  "mc-ragi2":      { en: "💚 Use only jaggery — no sugar. Low flame prevents lumps. No salt needed.", te: "💚 బెల్లమే వాడండి — చక్కెర వద్దు. తక్కువ మంటపై వండండి. ఉప్పు అవసరం లేదు." },
  "mc-oats":       { en: "💚 Jaggery only, no sugar. Add a pinch of turmeric — boosts immunity. Minimal salt.", te: "💚 బెల్లమే వాడండి. పసుపు కొంచెం వేయండి — రోగనిరోధకత పెరుగుతుంది. ఉప్పు చాలా తక్కువ." },
  "mc-palak-dal":  { en: "💚 Less oil, less salt. No extra chilli. Turmeric must. Don't overcook spinach — iron is lost.", te: "💚 నూనె తక్కువ, ఉప్పు తక్కువ. మిరప వద్దు. పసుపు తప్పకుండా. పాలకూర ఎక్కువసేపు వేయించకండి — ఐరన్ పోతుంది." },
  "mc-carrot":     { en: "💚 Minimal oil. No extra salt — BP care. Lemon at end boosts iron absorption.", te: "💚 నూనె చాలా తక్కువ. ఉప్పు తక్కువ — బీపీ జాగ్రత్త. చివరలో నిమ్మరసం వేస్తే ఐరన్ బాగా ఒంటపడుతుంది." },
  "mc-beetroot":   { en: "💚 No extra salt. Lemon squeeze after cooking — keeps colour and boosts iron. Minimal oil.", te: "💚 ఉప్పు తక్కువ. వండిన తర్వాత నిమ్మరసం పిండండి — రంగు మారదు, ఐరన్ బాగా ఒంటపడుతుంది." },
  "mc-moong-dal":  { en: "💚 Less oil, low salt. No tamarind — hard on digestion. Turmeric essential.", te: "💚 నూనె తక్కువ, ఉప్పు తక్కువ. చింతపండు వద్దు — అరగడం కష్టం. పసుపు తప్పకుండా వేయండి." },
  "mc-toor2":      { en: "💚 Low salt — BP care. Minimal oil for tempering. Turmeric must. No excess chilli.", te: "💚 ఉప్పు తక్కువ — బీపీ జాగ్రత్త. దండి నూనె వద్దు. పసుపు తప్పకుండా. మిరప ఎక్కువ వేయకండి." },
  "mc-ladiesfinger":{ en: "💚 Dry roast first — reduces sliminess without oil. Less salt. No tamarind.", te: "💚 ముందు నూనె లేకుండా వేయించండి — జిగట పోతుంది. ఉప్పు తక్కువ. చింతపండు వద్దు." },
  "ec-methi-roti": { en: "💚 Less oil on tawa. No salt in dough — BP care. Methi leaves reduce blood sugar.", te: "💚 తవ్వపై నూనె తక్కువ. పిండిలో ఉప్పు తక్కువ — బీపీ జాగ్రత్త. మెంతి ఆకులు చక్కెర తగ్గిస్తాయి." },
  "ec-ragi-roti":  { en: "💚 No sugar, minimal salt. Ragi is high iron — excellent for her. Cook on medium flame.", te: "💚 చక్కెర వద్దు, ఉప్పు తక్కువ. రాగిలో ఐరన్ చాలా ఎక్కువ — ఆమెకు చాలా మంచిది. మంటపై మధ్యస్తంగా వేయించండి." },
  "ec-wheat-roti": { en: "💚 Minimal oil. Low salt. Whole wheat only — no maida mixing. Easy on stomach.", te: "💚 నూనె తక్కువ. ఉప్పు తక్కువ. గోధుమ పిండి మాత్రమే — మైదా కలపకండి. జీర్ణానికి తేలిక." },
  "ec-toor-dal":   { en: "💚 Less oil, low salt. No excess tamarind — use just a small piece. Turmeric must.", te: "💚 నూనె తక్కువ, ఉప్పు తక్కువ. చింతపండు చాలా తక్కువ వాడండి. పసుపు తప్పకుండా." },
  "ec-moong2":     { en: "💚 Minimal oil. Low salt. Easy to digest — best for night. Turmeric essential.", te: "💚 నూనె తక్కువ. ఉప్పు తక్కువ. రాత్రికి అరగడం తేలిక — రాత్రి భోజనానికి చాలా అనువైనది." },
  "ec-bottlegourd":{ en: "💚 Very low oil. Low salt — BP care. Don't add tamarind. Bottle gourd cools the body.", te: "💚 నూనె చాలా తక్కువ. ఉప్పు తక్కువ — బీపీ జాగ్రత్త. చింతపండు వేయకండి. సొరకాయ శరీరాన్ని చల్లబరుస్తుంది." },
  "ec-horse-gram": { en: "💚 Soak overnight — reduces gas. Low salt. A tiny jaggery piece — controls sugar. High iron.", te: "💚 రాత్రంతా నానబెట్టండి — గ్యాస్ తగ్గుతుంది. ఉప్పు తక్కువ. చిన్న బెల్లం ముక్క — చక్కెర నియంత్రిస్తుంది. ఐరన్ చాలా ఎక్కువ." },
  "ec-drumstick":  { en: "💚 Low salt. Less tamarind. Drumstick boosts immunity and iron. No excess oil.", te: "💚 ఉప్పు తక్కువ. చింతపండు తక్కువ. మునగకాయ రోగనిరోధకత మరియు ఐరన్ పెంచుతుంది. నూనె ఎక్కువ వేయకండి." },
  "ec-bittergourd":{ en: "💚 Salt-soak removes bitterness — squeeze water out before frying. Less oil. Controls blood sugar.", te: "💚 ఉప్పులో నానిస్తే చేదు పోతుంది — నీళ్లు పిండేసి వేయించండి. నూనె తక్కువ. రక్తంలో చక్కెర నియంత్రిస్తుంది." },
};

export const COOK_HOW = {
  "mc-ragi": {
    en: ["Boil 2 cups water on medium flame", "Slowly add 3 tbsp ragi flour while stirring constantly", "Reduce to low flame, cook 5 min stirring", "Add jaggery to taste, mix well till dissolved", "Serve warm — should be smooth, no lumps"],
    te: ["మీడియం మంటపై 2 కప్పుల నీళ్లు మరగించండి", "నిరంతరం కలుపుతూ 3 చెంచాల రాగి పిండిని నెమ్మదిగా వేయండి", "తక్కువ మంటకు తగ్గించి, 5 నిమిషాలు కలుపుతూ వండండి", "రుచికి తగినంత బెల్లం వేసి, కరిగేంత వరకు బాగా కలపండి", "గోరువెచ్చగా వడ్డించండి — నున్నగా, గడ్డలు లేకుండా ఉండాలి"],
  },
  "mc-ragi2": {
    en: ["Boil 2 cups water on medium flame", "Slowly add 3 tbsp ragi flour while stirring constantly", "Reduce to low flame, cook 5 min stirring", "Add jaggery to taste, mix well till dissolved", "Serve warm — should be smooth, no lumps"],
    te: ["మీడియం మంటపై 2 కప్పుల నీళ్లు మరగించండి", "నిరంతరం కలుపుతూ 3 చెంచాల రాగి పిండిని నెమ్మదిగా వేయండి", "తక్కువ మంటకు తగ్గించి, 5 నిమిషాలు కలుపుతూ వండండి", "రుచికి తగినంత బెల్లం వేసి, కరిగేంత వరకు బాగా కలపండి", "గోరువెచ్చగా వడ్డించండి — నున్నగా, గడ్డలు లేకుండా ఉండాలి"],
  },
  "mc-oats": {
    en: ["Boil 1.5 cups water", "Add 3 tbsp rolled oats, stir well", "Cook 5 min on medium flame stirring", "Add small piece jaggery, pinch turmeric, mix", "Serve warm"],
    te: ["1.5 కప్పుల నీళ్లు మరగించండి", "3 చెంచాల ఓట్స్ వేసి బాగా కలపండి", "మీడియం మంటపై 5 నిమిషాలు కలుపుతూ వండండి", "చిన్న బెల్లం ముక్క, పసుపు కొంచెం వేసి కలపండి", "గోరువెచ్చగా వడ్డించండి"],
  },
  "mc-palak-dal": {
    en: ["Wash palak (spinach) and chop roughly", "Pressure cook moong dal with turmeric — 2 whistles", "Heat little oil, add mustard, cumin, garlic, onion — cook 2 min", "Add tomato, turmeric, very little salt — cook 3 min", "Add cooked dal + palak, simmer 4 min, serve"],
    te: ["పాలకూర కడిగి చిన్నగా తరగండి", "పసుపుతో పాటు పెసరపప్పు ప్రెషర్ కుక్‌లో 2 విజిల్స్ వండండి", "కొంచెం నూనె వేడి చేసి, ఆవాలు, జీలకర్ర, వెల్లుల్లి, ఉల్లిపాయ వేసి 2 నిమిషాలు వేయించండి", "టమాటా, పసుపు, చాలా తక్కువ ఉప్పు వేసి 3 నిమిషాలు వండండి", "వండిన పప్పు + పాలకూర వేసి 4 నిమిషాలు మరగించి వడ్డించండి"],
  },
  "mc-carrot": {
    en: ["Peel and chop carrots into thin rounds", "Heat very little oil, add mustard seeds, curry leaves", "Add carrots, pinch turmeric, very little salt", "Cover and cook 8 min on low flame", "Squeeze lemon at end, garnish coriander"],
    te: ["క్యారెట్లు వలిచి సన్నని వలయాలుగా తరగండి", "చాలా తక్కువ నూనె వేడి చేసి, ఆవాలు, కరివేపాకు వేయండి", "క్యారెట్లు, పసుపు కొంచెం, చాలా తక్కువ ఉప్పు వేయండి", "మూత పెట్టి తక్కువ మంటపై 8 నిమిషాలు వండండి", "చివరలో నిమ్మరసం పిండి, కొత్తిమీర చల్లండి"],
  },
  "mc-beetroot": {
    en: ["Peel and chop or grate beetroot", "Heat little oil, add mustard, curry leaves, onion", "Add beetroot, turmeric, very little salt", "Cook covered 10 min on low flame", "Squeeze lemon before serving — keeps colour bright"],
    te: ["బీట్‌రూట్ వలిచి చిన్నగా తరగండి లేదా తురమండి", "కొంచెం నూనె వేడి చేసి, ఆవాలు, కరివేపాకు, ఉల్లిపాయ వేయండి", "బీట్‌రూట్, పసుపు, చాలా తక్కువ ఉప్పు వేయండి", "మూత పెట్టి తక్కువ మంటపై 10 నిమిషాలు వండండి", "వడ్డించే ముందు నిమ్మరసం పిండండి — రంగు మారదు"],
  },
  "mc-moong-dal": {
    en: ["Wash moong dal thoroughly", "Pressure cook 2 whistles with turmeric", "Heat little oil, add mustard, cumin, garlic", "Add tomato, cook 3 min. Very little salt", "Add dal, boil 3 min, add fresh coriander"],
    te: ["పెసరపప్పు బాగా కడగండి", "పసుపుతో పాటు ప్రెషర్ కుక్‌లో 2 విజిల్స్ వండండి", "కొంచెం నూనె వేడి చేసి, ఆవాలు, జీలకర్ర, వెల్లుల్లి వేయండి", "టమాటా వేసి 3 నిమిషాలు వండండి. చాలా తక్కువ ఉప్పు వేయండి", "పప్పు వేసి 3 నిమిషాలు మరగించి, తాజా కొత్తిమీర వేయండి"],
  },
  "mc-toor2": {
    en: ["Wash toor dal", "Pressure cook 3 whistles with turmeric", "Heat little oil, add mustard, cumin, 1 dried chilli", "Add tomato, onion, very little salt — cook 4 min", "Mix in dal, simmer 5 min"],
    te: ["కందిపప్పు కడగండి", "పసుపుతో పాటు ప్రెషర్ కుక్‌లో 3 విజిల్స్ వండండి", "కొంచెం నూనె వేడి చేసి, ఆవాలు, జీలకర్ర, 1 ఎండుమిరప వేయండి", "టమాటా, ఉల్లిపాయ, చాలా తక్కువ ఉప్పు వేసి 4 నిమిషాలు వండండి", "పప్పు కలిపి 5 నిమిషాలు మరగించండి"],
  },
  "mc-ladiesfinger": {
    en: ["Wash and chop ladies finger into 1 inch pieces", "Dry roast on pan without oil for 5 min — reduces sliminess", "Heat little oil, add onion, garlic, cook 2 min", "Add ladies finger, turmeric, very little salt, pinch chilli", "Cook uncovered 10 min stirring"],
    te: ["బెండకాయలు కడిగి 1 అంగుళం ముక్కలుగా తరగండి", "నూనె వేయకుండా పాన్‌పై 5 నిమిషాలు వేయించండి — జిగట పోతుంది", "కొంచెం నూనె వేడి చేసి, ఉల్లిపాయ, వెల్లుల్లి వేసి 2 నిమిషాలు వేయించండి", "బెండకాయలు, పసుపు, చాలా తక్కువ ఉప్పు, కొంచెం మిరపకాయ వేయండి", "మూత తీసి మీడియం మంటపై 10 నిమిషాలు కలుపుతూ వండండి"],
  },
  "ec-methi-roti": {
    en: ["Pick fresh methi leaves, wash well", "Mix methi with wheat flour, very little salt, little oil", "Add water slowly and knead into soft dough. Rest 10 min", "Roll into thin rotis", "Cook on tawa 2 min each side with minimal oil"],
    te: ["తాజా మెంతి ఆకులు తీసి బాగా కడగండి", "గోధుమ పిండిలో మెంతి, చాలా తక్కువ ఉప్పు, కొంచెం నూనె కలపండి", "నెమ్మదిగా నీళ్లు పోసి మెత్తని పిండి తయారు చేయండి. 10 నిమిషాలు విశ్రాంతి ఇవ్వండి", "సన్నని రొట్టెలుగా చేయండి", "తవ్వపై ప్రతి వైపు 2 నిమిషాలు కనీస నూనెతో కాల్చండి"],
  },
  "ec-ragi-roti": {
    en: ["Mix ragi flour with very little salt, cumin, tiny onion pieces", "Add hot water slowly and mix into soft dough", "Shape into flat rotis with wet hands", "Cook on hot tawa 3 min each side", "Serve with dal or chutney"],
    te: ["రాగి పిండిలో చాలా తక్కువ ఉప్పు, జీలకర్ర, చిన్న ఉల్లిపాయ ముక్కలు కలపండి", "వేడి నీళ్లు నెమ్మదిగా పోసి మెత్తని పిండి తయారు చేయండి", "తడిచేతులతో చదునైన రొట్టెలు చేయండి", "వేడి తవ్వపై ప్రతి వైపు 3 నిమిషాలు కాల్చండి", "పప్పు లేదా చట్నీతో వడ్డించండి"],
  },
  "ec-wheat-roti": {
    en: ["Take wheat atta, add very little salt, little oil", "Add water slowly and knead 5 min into smooth dough", "Rest 10 min covered", "Roll into thin rotis", "Cook on hot tawa 1 min each side with minimal oil"],
    te: ["గోధుమ పిండిలో చాలా తక్కువ ఉప్పు, కొంచెం నూనె వేయండి", "నెమ్మదిగా నీళ్లు పోసి 5 నిమిషాలు బాగా పిసకండి", "మూత పెట్టి 10 నిమిషాలు విశ్రాంతి ఇవ్వండి", "సన్నని రొట్టెలుగా చేయండి", "వేడి తవ్వపై ప్రతి వైపు 1 నిమిషం కనీస నూనెతో కాల్చండి"],
  },
  "ec-toor-dal": {
    en: ["Wash toor dal, pressure cook 3 whistles with turmeric", "Heat little oil, add mustard, cumin, 1 dried chilli", "Add chopped onion, tomato, very little salt — cook 3 min", "Add dal, boil 4 min", "Add fresh coriander leaves, serve"],
    te: ["కందిపప్పు కడిగి పసుపుతో ప్రెషర్ కుక్‌లో 3 విజిల్స్ వండండి", "కొంచెం నూనె వేడి చేసి, ఆవాలు, జీలకర్ర, 1 ఎండుమిరప వేయండి", "ఉల్లిపాయ, టమాటా, చాలా తక్కువ ఉప్పు వేసి 3 నిమిషాలు వండండి", "పప్పు వేసి 4 నిమిషాలు మరగించండి", "తాజా కొత్తిమీర వేసి వడ్డించండి"],
  },
  "ec-moong2": {
    en: ["Wash moong dal", "Pressure cook 2 whistles with turmeric", "Heat little oil, add mustard, cumin, garlic", "Add tomato, very little salt — cook 3 min", "Mix dal, simmer 3 min"],
    te: ["పెసరపప్పు కడగండి", "పసుపుతో ప్రెషర్ కుక్‌లో 2 విజిల్స్ వండండి", "కొంచెం నూనె వేడి చేసి, ఆవాలు, జీలకర్ర, వెల్లుల్లి వేయండి", "టమాటా, చాలా తక్కువ ఉప్పు వేసి 3 నిమిషాలు వండండి", "పప్పు కలిపి 3 నిమిషాలు మరగించండి"],
  },
  "ec-bottlegourd": {
    en: ["Peel and cube bottle gourd", "Heat very little oil, add mustard, curry leaves, onion", "Add bottle gourd, turmeric, very little salt", "Add 2 tbsp water, cover and cook 12 min on low flame", "Garnish coriander, serve warm"],
    te: ["సొరకాయ వలిచి చిన్న ముక్కలుగా తరగండి", "చాలా తక్కువ నూనె వేడి చేసి, ఆవాలు, కరివేపాకు, ఉల్లిపాయ వేయండి", "సొరకాయ, పసుపు, చాలా తక్కువ ఉప్పు వేయండి", "2 చెంచాల నీళ్లు వేసి మూత పెట్టి తక్కువ మంటపై 12 నిమిషాలు వండండి", "కొత్తిమీర చల్లి గోరువెచ్చగా వడ్డించండి"],
  },
  "ec-horse-gram": {
    en: ["Soak horse gram overnight — very important!", "Pressure cook 4 whistles with small tamarind piece, tomato, turmeric", "Heat little oil, add mustard, dried chilli, onion, garlic", "Pour tempering over cooked gram, boil together 5 min", "Add tiny jaggery piece, fresh coriander, serve hot"],
    te: ["ఉలవలు ముందురోజు రాత్రే నానబెట్టండి — చాలా ముఖ్యం!", "చిన్న చింతపండు ముక్క, టమాటా, పసుపుతో ప్రెషర్ కుక్‌లో 4 విజిల్స్ వండండి", "కొంచెం నూనె వేడి చేసి, ఆవాలు, ఎండుమిరప, ఉల్లిపాయ, వెల్లుల్లి వేయండి", "తాళింపు వండిన ఉలవల పైన పోసి కలిపి 5 నిమిషాలు మరగించండి", "చిన్న బెల్లం ముక్క, తాజా కొత్తిమీర వేసి వేడిగా వడ్డించండి"],
  },
  "ec-drumstick": {
    en: ["Cut drumstick into 3 inch pieces", "Boil with little tamarind water, tomato, turmeric 10 min", "Heat little oil, add mustard, onion, curry leaves", "Add sambar powder, very little salt, cooked drumstick", "Simmer 8 min, add coriander"],
    te: ["మునగకాయలను 3 అంగుళాల ముక్కలుగా తరగండి", "కొంచెం చింతపండు నీళ్లు, టమాటా, పసుపుతో 10 నిమిషాలు ఉడకబెట్టండి", "కొంచెం నూనె వేడి చేసి, ఆవాలు, ఉల్లిపాయ, కరివేపాకు వేయండి", "సాంబారు పొడి, చాలా తక్కువ ఉప్పు, వండిన మునగకాయలు వేయండి", "8 నిమిషాలు మరగించి కొత్తిమీర వేయండి"],
  },
  "ec-bittergourd": {
    en: ["Slice bitter gourd thin, sprinkle salt, rest 10 min", "Squeeze out water from slices thoroughly — removes bitterness", "Heat little oil, fry onion till golden", "Add bitter gourd, turmeric, very little salt, pinch chilli", "Fry on medium flame 12 min till slightly crisp"],
    te: ["కాకరకాయలను సన్నగా తరిగి ఉప్పు చల్లి 10 నిమిషాలు ఉంచండి", "ముక్కలను బాగా నలిపి నీళ్లు పిండేయండి — చేదు పోతుంది", "కొంచెం నూనె వేడి చేసి ఉల్లిపాయ బంగారు రంగు వచ్చేంత వరకు వేయించండి", "కాకరకాయ, పసుపు, చాలా తక్కువ ఉప్పు, కొంచెం మిరపకాయ వేయండి", "మీడియం మంటపై 12 నిమిషాలు కొంచెం మురుకు వచ్చేంత వరకు వేయించండి"],
  },
};

export function getTodayCookPattern() {
  return COOK_PATTERNS[new Date().getDay() % COOK_PATTERNS.length];
}
