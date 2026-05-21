import { useLang } from '../../context/LanguageContext';
import { COOK_HOW, COOK_TIPS } from '../../data/cookRecipes';

export default function HowToCookModal({ open, itemId, itemName, onClose }) {
  const { lang, t } = useLang();

  const stepsObj = itemId ? COOK_HOW[itemId] : null;
  const steps = stepsObj ? (stepsObj[lang] || stepsObj.en) : null;
  const tip = itemId ? COOK_TIPS[itemId] : null;

  return (
    <div
      className={`ov${open ? ' open' : ''}`}
      style={{ alignItems: 'center' }}
      onClick={onClose}
    >
      <div className="mod mod-center" onClick={e => e.stopPropagation()}>
        <div className="mtitle">
          {t('howTo')}: {itemName || ''}
        </div>

        {tip && (
          <div style={{
            background: '#eafaf1',
            border: '1px solid #27ae60',
            borderRadius: '12px',
            padding: '12px',
            marginBottom: '16px',
            fontSize: '13px',
            color: '#1a202c',
            lineHeight: '1.5'
          }}>
            <div style={{ fontWeight: 800, marginBottom: '4px' }}>{t('healthTip')}</div>
            {lang === 'te' ? tip.te : tip.en}
          </div>
        )}

        <div style={{ fontWeight: 800, marginBottom: '12px', fontSize: '13px', color: '#718096' }}>
          {t('cookGuide')}
        </div>

        {steps ? steps.map((step, i) => (
          <div key={i} className="how-step">
            <div className="step-num">{i + 1}</div>
            <div className="step-text">{step}</div>
          </div>
        )) : (
          <div className="empty">{t('noRecipe')}</div>
        )}

        <button className="mbtn btn-g" onClick={onClose} style={{ marginTop: '8px' }}>
          {t('gotIt')}
        </button>
      </div>
    </div>
  );
}
