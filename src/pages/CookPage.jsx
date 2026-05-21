import { useLang } from '../context/LanguageContext';

export default function CookPage({ appData, today, cookPattern, saveData, onHowTo }) {
  const { lang, t } = useLang();

  if (!cookPattern) {
    return <div className="pg active"><div className="empty">No cook pattern</div></div>;
  }

  const todayData = (appData && appData[today]) || { items: {}, extras: [], bp: false, bpTime: null, cook: {} };
  const cookData = todayData.cook || {};

  function toggleCook(itemId) {
    const newCook = { ...cookData, [itemId]: !cookData[itemId] };
    const newTodayData = { ...todayData, cook: newCook };
    saveData({ ...appData, [today]: newTodayData });
  }

  function renderCookSection(items, titleKey, servesKey) {
    const allDone = items.every(i => cookData[i.id]);
    return (
      <div className="card" style={{ marginBottom: '11px' }}>
        <div style={{ fontWeight: 900, fontSize: '15px', marginBottom: '4px', color: '#1a3a5c' }}>
          {t(titleKey)}
        </div>
        <div style={{ fontSize: '12px', color: '#718096', marginBottom: '12px' }}>
          {t(servesKey)}
        </div>

        {allDone ? (
          <div style={{
            background: '#eafaf1',
            borderRadius: '10px',
            padding: '12px',
            textAlign: 'center',
            fontWeight: 800,
            color: '#27ae60',
            marginBottom: '8px'
          }}>
            {t('cookDone')}
          </div>
        ) : null}

        {items.map(item => {
          const isCooked = !!cookData[item.id];
          const name = lang === 'te' ? item.teName : item.name;
          return (
            <div key={item.id} className={`cook-item${isCooked ? ' cooked' : ''}`} style={{ borderRadius: '10px', marginBottom: '6px' }}>
              <div className="cook-chk" onClick={() => toggleCook(item.id)}>
                {isCooked ? '✓' : ''}
              </div>
              <div className="cook-name">{name}</div>
              <button
                className="cook-how"
                onClick={() => onHowTo(item.id, name)}
              >
                {t('howTo')}
              </button>
            </div>
          );
        })}
      </div>
    );
  }

  // Summary card
  const allMornDone = cookPattern.morningCook.every(i => cookData[i.id]);
  const allEveDone = cookPattern.eveningCook.every(i => cookData[i.id]);

  return (
    <div className="pg active">
      {renderCookSection(cookPattern.morningCook, 'cookMorn', 'cookServesMornLunch')}
      {renderCookSection(cookPattern.eveningCook, 'cookEve', 'cookServesEveNight')}

      {/* Today's Cook Summary */}
      <div className="card">
        <div style={{ fontWeight: 900, fontSize: '15px', marginBottom: '12px', color: '#1a3a5c' }}>
          {t('todayCookSum')}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{
            flex: 1,
            padding: '12px',
            borderRadius: '12px',
            background: allMornDone ? '#eafaf1' : '#fff3cd',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '20px', marginBottom: '4px' }}>🌅</div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: allMornDone ? '#27ae60' : '#856404' }}>
              {t('morningCook')}
            </div>
            <div style={{ fontSize: '11px', color: '#718096', marginTop: '2px' }}>
              {cookPattern.morningCook.filter(i => cookData[i.id]).length} / {cookPattern.morningCook.length}
            </div>
          </div>
          <div style={{
            flex: 1,
            padding: '12px',
            borderRadius: '12px',
            background: allEveDone ? '#eafaf1' : '#fff3cd',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '20px', marginBottom: '4px' }}>🌙</div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: allEveDone ? '#27ae60' : '#856404' }}>
              {t('eveningCook')}
            </div>
            <div style={{ fontSize: '11px', color: '#718096', marginTop: '2px' }}>
              {cookPattern.eveningCook.filter(i => cookData[i.id]).length} / {cookPattern.eveningCook.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
