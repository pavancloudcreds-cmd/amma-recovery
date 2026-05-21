import { useLang } from '../context/LanguageContext';
import { NUTRITION } from '../data/nutrition';

const GOALS = { ir: 27, pr: 60, ca: 1800, vi: 65 };

export default function NutritionCard({ allItems, markedItems }) {
  const { t } = useLang();

  const totals = { ir: 0, pr: 0, ca: 0, vi: 0 };
  allItems.forEach(item => {
    if (markedItems && markedItems[item.id] && markedItems[item.id].status === 'done') {
      const n = NUTRITION[item.id];
      if (n) {
        totals.ir += n.ir || 0;
        totals.pr += n.pr || 0;
        totals.ca += n.ca || 0;
        totals.vi += n.vi || 0;
      }
    }
  });

  const pct = (val, goal) => Math.min(100, Math.round((val / goal) * 100));

  return (
    <div className="card">
      <div style={{ fontWeight: 900, fontSize: '14px', marginBottom: '12px' }}>{t('nut')}</div>

      <div className="nut-sec">
        <div className="nut-lbl">
          <span>{t('iron')}</span>
          <span>{totals.ir.toFixed(1)} / {GOALS.ir} mg</span>
        </div>
        <div className="nut-bar">
          <div className="nut-fill f-iron" style={{ width: `${pct(totals.ir, GOALS.ir)}%` }} />
        </div>
      </div>

      <div className="nut-sec">
        <div className="nut-lbl">
          <span>{t('prot')}</span>
          <span>{totals.pr.toFixed(1)} / {GOALS.pr} g</span>
        </div>
        <div className="nut-bar">
          <div className="nut-fill f-prot" style={{ width: `${pct(totals.pr, GOALS.pr)}%` }} />
        </div>
      </div>

      <div className="nut-sec">
        <div className="nut-lbl">
          <span>{t('cal')}</span>
          <span>{totals.ca} / {GOALS.ca} kcal</span>
        </div>
        <div className="nut-bar">
          <div className="nut-fill f-cal" style={{ width: `${pct(totals.ca, GOALS.ca)}%` }} />
        </div>
      </div>

      <div className="nut-sec">
        <div className="nut-lbl">
          <span>{t('vit')}</span>
          <span>{totals.vi} / {GOALS.vi} mg</span>
        </div>
        <div className="nut-bar">
          <div className="nut-fill f-vit" style={{ width: `${pct(totals.vi, GOALS.vi)}%` }} />
        </div>
      </div>
    </div>
  );
}
