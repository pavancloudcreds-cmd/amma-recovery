import { useLang } from '../context/LanguageContext';
import { isFirstDay, TODAY } from '../data/mealPlan';
import BPAlert from '../components/BPAlert';
import NutritionCard from '../components/NutritionCard';
import DietItem from '../components/DietItem';

const SECTION_LABELS = {
  morning: { cls: 'sl-m', key: 'morn' },
  afternoon: { cls: 'sl-a', key: 'aft' },
  evening: { cls: 'sl-e', key: 'eve' },
  night: { cls: 'sl-n', key: 'nite' },
  medicine: { cls: 'sl-med', key: 'med' },
};

function getAllItems(sections) {
  const all = [];
  if (!sections) return all;
  ['morning', 'afternoon', 'evening', 'night', 'medicine'].forEach(s => {
    if (sections[s]) all.push(...sections[s]);
  });
  return all;
}

export default function TodayPage({ appData, today, sections, onItemClick, onMarkBP, onAddExtra, onReset }) {
  const { lang, t } = useLang();

  const todayData = (appData && appData[today]) || { items: {}, extras: [], bp: false, bpTime: null, cook: {} };
  const markedItems = todayData.items || {};
  const extras = todayData.extras || [];
  const bpData = { bp: todayData.bp, bpTime: todayData.bpTime };
  const allItems = getAllItems(sections);
  const firstDay = isFirstDay();

  const dateStr = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const sectionsToShow = firstDay
    ? ['evening', 'night', 'medicine']
    : ['morning', 'afternoon', 'evening', 'night', 'medicine'];

  return (
    <div className="pg active">
      {/* Date */}
      <div className="card" style={{ textAlign: 'center', padding: '12px' }}>
        <div style={{ fontWeight: 900, fontSize: '16px', color: '#1a3a5c' }}>{dateStr}</div>
        <div style={{ fontSize: '12px', color: '#718096', marginTop: '4px' }}>{today}</div>
      </div>

      {/* BP Alert */}
      <BPAlert bpData={bpData} onMarkBP={onMarkBP} />

      {/* Nutrition */}
      <NutritionCard allItems={allItems} markedItems={markedItems} />

      {/* First Day Banners */}
      {firstDay && (
        <>
          <div className="card" style={{ background: '#fff3cd', border: '1px solid #f39c12', marginBottom: '11px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#856404' }}>{t('firstDayNote')}</div>
          </div>
          <div className="card" style={{ background: '#d1ecf1', border: '1px solid #0c5460', marginBottom: '11px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0c5460' }}>{t('lunchNote')}</div>
          </div>
        </>
      )}

      {/* Diet Sections */}
      {sectionsToShow.map(sectionKey => {
        const items = sections && sections[sectionKey];
        if (!items || items.length === 0) return null;
        const labelCfg = SECTION_LABELS[sectionKey];
        const isMed = sectionKey === 'medicine';
        return (
          <div key={sectionKey}>
            <div className={`sl ${labelCfg.cls}`}>{t(labelCfg.key)}</div>
            {items.map(item => {
              const itemState = markedItems[item.id];
              const status = itemState ? itemState.status : null;
              const time = itemState ? itemState.time : null;
              return (
                <DietItem
                  key={item.id}
                  item={item}
                  status={status}
                  time={time}
                  onItemClick={() => onItemClick(item.id, sectionKey)}
                  isMed={isMed}
                />
              );
            })}
          </div>
        );
      })}

      {/* Extras */}
      {extras.length > 0 && (
        <div>
          <div className="sec-div">{t('extrasAdded')} ({extras.length})</div>
          {extras.map((ex, i) => (
            <div key={i} className="di done" style={{ cursor: 'default' }}>
              <div className="chk" style={{ background: '#1a6bbf', borderColor: '#1a6bbf', color: '#fff' }}>+</div>
              <div className="iem">🍽️</div>
              <div className="ii">
                <div className="iname">{ex.name}</div>
                <div className="idet">{ex.shift} {ex.time ? '· ' + ex.time : ''}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Extra Button */}
      <button className="add-btn" onClick={onAddExtra}>{t('add')}</button>

      {/* Danger Zone */}
      <div className="danger-box" style={{ marginBottom: '16px' }}>
        <div className="danger-title">⚠️ Danger Zone</div>
        <div className="danger-sub">{t('clearsAll')}</div>
        <button className="reset-btn" onClick={onReset}>
          {t('resetDay')}
        </button>
      </div>
    </div>
  );
}
