import { useLang } from '../../context/LanguageContext';

export default function HistoryDetailModal({ open, dayKey, dayData, allItems, onClose, onReport }) {
  const { lang, t } = useLang();

  if (!dayData) {
    return (
      <div className={`ov${open ? ' open' : ''}`} onClick={onClose}>
        <div className="mod" onClick={e => e.stopPropagation()}>
          <div className="mtitle">{dayKey}</div>
          <div className="empty">No data</div>
          <button className="mbtn btn-gr" onClick={onClose}>{t('close')}</button>
        </div>
      </div>
    );
  }

  const items = dayData.items || {};
  const extras = dayData.extras || [];
  const bp = dayData.bp;
  const bpTime = dayData.bpTime;

  const givenItems = allItems.filter(i => items[i.id] && items[i.id].status === 'done');
  const skippedItems = allItems.filter(i => items[i.id] && items[i.id].status === 'skipped');

  return (
    <div className={`ov${open ? ' open' : ''}`} onClick={onClose}>
      <div className="mod" onClick={e => e.stopPropagation()}>
        <div className="mtitle">{dayKey}</div>

        {/* BP Status */}
        <div style={{ marginBottom: '12px' }}>
          <span className={`hstat ${bp ? 'hs-g' : 'hs-r'}`}>
            💊 BP: {bp ? `${t('given')} ${bpTime ? '· ' + bpTime : ''}` : 'Not marked'}
          </span>
        </div>

        {/* Given */}
        {givenItems.length > 0 && (
          <div style={{ marginBottom: '12px' }}>
            <div className="sec-div">{t('given')} ({givenItems.length})</div>
            {givenItems.map(item => {
              const name = lang === 'te' && item.te ? item.te : item.en;
              const time = items[item.id]?.time || '';
              return (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', fontSize: '13px' }}>
                  <span style={{ color: '#27ae60', fontWeight: 800 }}>✓</span>
                  <span>{item.em} {name}</span>
                  {time && <span style={{ fontSize: '10px', color: '#718096' }}>{time}</span>}
                </div>
              );
            })}
          </div>
        )}

        {/* Skipped */}
        {skippedItems.length > 0 && (
          <div style={{ marginBottom: '12px' }}>
            <div className="sec-div">{t('skipped')} ({skippedItems.length})</div>
            {skippedItems.map(item => {
              const name = lang === 'te' && item.te ? item.te : item.en;
              return (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', fontSize: '13px' }}>
                  <span style={{ color: '#e74c3c', fontWeight: 800 }}>✗</span>
                  <span>{item.em} {name}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Extras */}
        {extras.length > 0 && (
          <div style={{ marginBottom: '12px' }}>
            <div className="sec-div">{t('extras')} ({extras.length})</div>
            {extras.map((ex, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', fontSize: '13px' }}>
                <span>➕ {ex.name}</span>
                {ex.time && <span style={{ fontSize: '10px', color: '#718096' }}>{ex.time}</span>}
              </div>
            ))}
          </div>
        )}

        <button className="rpb" onClick={onReport}>{t('pdf')}</button>
        <button className="mbtn btn-gr" onClick={onClose}>{t('close')}</button>
      </div>
    </div>
  );
}
