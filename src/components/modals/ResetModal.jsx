import { useLang } from '../../context/LanguageContext';

export default function ResetModal({ open, onReset, onCancel }) {
  const { t } = useLang();

  return (
    <div className={`ov${open ? ' open' : ''}`} onClick={onCancel}>
      <div className="mod" onClick={e => e.stopPropagation()}>
        <div className="mtitle" style={{ color: '#e74c3c' }}>{t('resetConfirm')}</div>
        <div style={{
          background: '#fff5f5',
          border: '1px solid #fca5a5',
          borderRadius: '12px',
          padding: '14px',
          marginBottom: '16px',
          fontSize: '13px',
          color: '#718096',
          textAlign: 'center'
        }}>
          {t('resetWarn')}
        </div>
        <button className="mbtn btn-r" onClick={onReset}>
          {t('resetYes')}
        </button>
        <button className="mbtn btn-gr" onClick={onCancel}>
          {t('resetNo')}
        </button>
      </div>
    </div>
  );
}
