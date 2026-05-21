import { useLang } from '../context/LanguageContext';

export default function HistoryPage({ appData, today, allItems, onViewDay, onReport }) {
  const { t } = useLang();

  if (!appData) {
    return (
      <div className="pg active">
        <div className="empty">{t('noHist')}</div>
      </div>
    );
  }

  const pastDays = Object.keys(appData)
    .filter(k => k !== today && k.match(/^\d{4}-\d{2}-\d{2}$/))
    .sort((a, b) => b.localeCompare(a));

  if (pastDays.length === 0) {
    return (
      <div className="pg active">
        <div className="empty">{t('noHist')}</div>
      </div>
    );
  }

  return (
    <div className="pg active">
      {pastDays.map(dayKey => {
        const dayData = appData[dayKey] || {};
        const items = dayData.items || {};
        const extras = dayData.extras || [];
        const bp = dayData.bp;

        const givenCount = Object.values(items).filter(v => v.status === 'done').length;
        const skippedCount = Object.values(items).filter(v => v.status === 'skipped').length;

        const dateStr = new Date(dayKey + 'T00:00:00').toLocaleDateString('en-IN', {
          weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
        });

        return (
          <div key={dayKey} className="hday">
            <div style={{ fontWeight: 900, fontSize: '15px', marginBottom: '8px', color: '#1a3a5c' }}>
              {dateStr}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <span className={`hstat ${bp ? 'hs-g' : 'hs-r'}`}>
                💊 BP: {bp ? t('given') : 'Not marked'}
              </span>
              <span className="hstat hs-g">✓ {givenCount} {t('given')}</span>
              {skippedCount > 0 && (
                <span className="hstat hs-r">✗ {skippedCount} {t('skipped')}</span>
              )}
              {extras.length > 0 && (
                <span className="hstat hs-b">+ {extras.length} {t('extras')}</span>
              )}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className="mbtn btn-b"
                style={{ flex: 1, padding: '10px', fontSize: '13px', marginBottom: 0 }}
                onClick={() => onViewDay(dayKey, dayData)}
              >
                {t('viewDet')}
              </button>
              <button
                className="rpb"
                style={{ flex: 1, marginBottom: 0 }}
                onClick={() => onReport(dayKey)}
              >
                {t('pdf')}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
