export const START_DATE = "2026-05-21";
export const TODAY = new Date().toISOString().split("T")[0];

export function isFirstDay() {
  return TODAY <= START_DATE;
}

export function nowStr() {
  return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

export function emptyDay() {
  return { items: {}, extras: [], bp: false, bpTime: null, cook: {} };
}

export const MEDICINES = [
  { id: "md1", em: "💜", en: "Telzun H 40mg (BP)", dt: "Morning · empty stomach", ir: 0, pr: 0, ca: 0, vi: 0 },
  { id: "md2", em: "🔴", en: "Ferallmin — Iron tablet", dt: "After breakfast", ir: 100, pr: 0, ca: 0, vi: 0 },
  { id: "md3", em: "🟡", en: "Astymin Forte capsule", dt: "After breakfast", ir: 0, pr: 0, ca: 0, vi: 0 },
  { id: "md4", em: "🟠", en: "Ascorbic Acid 500mg (Vit C)", dt: "After lunch", ir: 0, pr: 0, ca: 0, vi: 500 },
  { id: "md5", em: "🟣", en: "Methycal tablet", dt: "After dinner", ir: 0, pr: 0, ca: 0, vi: 0 },
  { id: "md6", em: "💊", en: "Paracetamol 500mg if pain/fever", dt: "As needed", ir: 0, pr: 0, ca: 0, vi: 0 },
];

// Build today's diet sections from a cook pattern
export function buildDaySections(cookPattern) {
  const mp = cookPattern.morningCook;
  const ep = cookPattern.eveningCook;
  const porridge = mp.find(i => i.type === "porridge");
  const mDal = mp.find(i => i.type === "dal");
  const mCurry = mp.find(i => i.type === "curry");
  const eRoti = ep.find(i => i.type === "roti");
  const eDal = ep.find(i => i.type === "dal");
  const eCurry = ep.find(i => i.type === "curry");

  return {
    morning: [
      { id: "m-almonds", em: "🌰", en: "Soaked Almonds (5) + Dates (3)", te: "నానబెట్టిన బాదం (5) + ఖర్జూరం (3)", dt: "Empty stomach", dte: "పరగడుపున", owner: "sister" },
      { id: porridge.id, em: "🥣", en: porridge.name, te: porridge.teName, dt: "Breakfast — cooked by sister", dte: "ఉదయం బ్రేక్‌ఫాస్ట్ (సిస్టర్ వండినది)", owner: "sister" },
      { id: "m-apple", em: "🍎", en: "Apple with skin + lemon squeeze", te: "చెక్కుతో ఉన్న ఆపిల్ + నిమ్మకాయ", dt: "After breakfast", dte: "బ్రేక్‌ఫాస్ట్ తర్వాత", owner: "sister" },
      { id: "m-juice", em: "🌿", en: "Pomegranate or Beetroot juice", te: "దానిమ్మ లేదా బీట్‌రూట్ జ్యూస్", dt: "No sugar added", dte: "చక్కెర వేయకుండా", owner: "sister" },
      { id: mDal.id, em: "🫘", en: mDal.name, te: mDal.teName, dt: "With breakfast (sister cooked)", dte: "అల్పాహారంతో (సిస్టర్ వండినది)", owner: "sister" },
      { id: mCurry.id, em: "🥗", en: mCurry.name, te: mCurry.teName, dt: "With breakfast (sister cooked)", dte: "అల్పాహారంతో (సిస్టర్ వండినది)", owner: "sister" },
    ],
    afternoon: [
      { id: "a-rice-lunch", em: "🍱", en: `Rice + ${mDal.name} + ${mCurry.name} + Curd`, te: "అన్నం + పప్పు + కూర + పెరుగు", dt: "Lunch — family rice + morning cook items", dte: "మధ్యాహ్న భోజనం — ఉదయం వండినవి", owner: "you" },
      { id: "a-coconut", em: "🥥", en: "Tender Coconut water", te: "లేత కొబ్బరి నీళ్లు", dt: "After lunch", dte: "భోజనం తర్వాత", owner: "you" },
      { id: "a-fruit", em: "🍌", en: "Banana or Guava", te: "అరటిపండు లేదా జామకాయ", dt: "Afternoon fruit", dte: "మధ్యాహ్నం పండు", owner: "you" },
    ],
    evening: [
      { id: "e-snack", em: "🫙", en: "Horse gram soup or roasted peanuts", te: "ఉలవచారు లేదా వేరుశెనగ గుళ్లు", dt: "Snack · 4:00–6:00 PM", dte: "చిరుతిండి · 4:00–6:00 PM", owner: "you" },
      { id: "e-ors", em: "🥛", en: "ORS water", te: "ఓ.ఆర్.ఎస్ (ORS) నీళ్లు", dt: "With snack", dte: "స్నాక్‌తో పాటు", owner: "you" },
    ],
    night: [
      { id: eRoti.id, em: "🫓", en: eRoti.name, te: eRoti.teName, dt: "Dinner · 7:30–9:00 PM", dte: "రాత్రి భోజనం · 7:30–9:00 PM", owner: "sister" },
      { id: eDal.id, em: "🍲", en: eDal.name, te: eDal.teName, dt: "Dinner · 7:30–9:00 PM", dte: "రాత్రి భోజనం · 7:30–9:00 PM", owner: "sister" },
      { id: eCurry.id, em: "🥘", en: eCurry.name, te: eCurry.teName, dt: "Dinner · 7:30–9:00 PM", dte: "రాత్రి భోజనం · 7:30–9:00 PM", owner: "sister" },
      { id: "n-milk", em: "🥛", en: "Turmeric milk (warm)", te: "పసుపు పాలు (గోరువెచ్చని)", dt: "Bedtime", dte: "పడుకునే ముందు", owner: "sister" },
    ],
    medicine: MEDICINES,
  };
}
