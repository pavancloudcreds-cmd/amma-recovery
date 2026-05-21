import { useLang } from '../../context/LanguageContext';

export default function UndoModal({ open, itemLabel, onReset, onKeep }) {
  const { t } = useLang();

  return (
    <div className={`ov${open ? ' open' : ''}`} onClick={onKeep}>
      <div className="mod" onClick={e => e.stopPropagation()}>
        <div className="mtitle">{t('undoTitle')}</div>
        {itemLabel && (
          <div style={{ textAlign: 'center', color: '#718096', marginBottom: '16px', fontSize: '14px' }}>
            {itemLabel}
          </div>
        )}
        <button className="mbtn btn-r" onClick={onReset}>
          {t('yesReset')}
        </button>
        <button className="mbtn btn-gr" onClick={onKeep}>
          {t('noKeep')}
        </button>
      </div>
    </div>
  );
}
