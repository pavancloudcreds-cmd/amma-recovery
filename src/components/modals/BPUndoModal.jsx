import { useLang } from '../../context/LanguageContext';

export default function BPUndoModal({ open, onReset, onKeep }) {
  const { t } = useLang();

  return (
    <div className={`ov${open ? ' open' : ''}`} onClick={onKeep}>
      <div className="mod" onClick={e => e.stopPropagation()}>
        <div className="mtitle">{t('bpUndo')}</div>
        <div style={{ textAlign: 'center', marginBottom: '16px', fontSize: '22px' }}>💊</div>
        <button className="mbtn btn-r" onClick={onReset}>
          {t('yesR')}
        </button>
        <button className="mbtn btn-gr" onClick={onKeep}>
          {t('noK')}
        </button>
      </div>
    </div>
  );
}
