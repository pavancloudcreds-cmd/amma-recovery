import { useLang } from '../../context/LanguageContext';

export default function ItemActionModal({ open, onDone, onSkip, onBack }) {
  const { t } = useLang();

  return (
    <div className={`ov${open ? ' open' : ''}`} onClick={onBack}>
      <div className="mod" onClick={e => e.stopPropagation()}>
        <div className="mtitle">{t('whatHap')}</div>
        <button className="abtn" onClick={onDone}>
          <span className="ai">✅</span>
          {t('giveEat')}
        </button>
        <button className="abtn" onClick={onSkip}>
          <span className="ai">❌</span>
          {t('skipIt')}
        </button>
        <button className="mbtn btn-gr" onClick={onBack}>
          {t('goBack')}
        </button>
      </div>
    </div>
  );
}
