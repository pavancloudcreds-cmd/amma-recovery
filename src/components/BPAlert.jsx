import { useLang } from '../context/LanguageContext';

export default function BPAlert({ bpData, onMarkBP }) {
  const { t } = useLang();
  const isDone = bpData && bpData.bp;

  return (
    <div className="bpa">
      <span style={{ fontSize: '28px' }}>💊</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 900, fontSize: '14px' }}>{t('bpT')}</div>
        <div style={{ fontSize: '11px', opacity: 0.85, marginTop: '2px' }}>
          {isDone ? `${t('bpDone')} · ${bpData.bpTime || ''}` : t('bpS')}
        </div>
      </div>
      <button
        className={`bpb ${isDone ? 'bpb-done' : 'bpb-pending'}`}
        onClick={onMarkBP}
      >
        {isDone ? t('bpDone') : t('bpMark')}
      </button>
    </div>
  );
}
