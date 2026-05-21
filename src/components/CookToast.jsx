import { useState, useEffect } from 'react';
import { useLang } from '../context/LanguageContext';

function isCookTime() {
  const h = new Date().getHours();
  return (h >= 6 && h < 9) || (h >= 17 && h < 20);
}

function isMorningTime() {
  const h = new Date().getHours();
  return h >= 6 && h < 9;
}

export default function CookToast({ cookPattern, appData, today, saveData, setPage }) {
  const { lang, t } = useLang();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    function check() {
      if (!dismissed && isCookTime()) {
        setVisible(true);
      } else if (!isCookTime()) {
        setVisible(false);
        setDismissed(false);
      }
    }
    check();
    const interval = setInterval(check, 60000);
    return () => clearInterval(interval);
  }, [dismissed]);

  if (!visible || !cookPattern) return null;

  const isMorning = isMorningTime();
  const cookItems = isMorning ? cookPattern.morningCook : cookPattern.eveningCook;
  const cookData = (appData && appData[today] && appData[today].cook) ? appData[today].cook : {};

  const allDone = cookItems.every(item => cookData[item.id]);

  if (allDone) return null;

  function toggleCookItem(itemId) {
    const todayData = (appData && appData[today]) ? { ...appData[today] } : { items: {}, extras: [], bp: false, bpTime: null, cook: {} };
    const cook = { ...(todayData.cook || {}) };
    cook[itemId] = !cook[itemId];
    todayData.cook = cook;
    saveData({ ...appData, [today]: todayData });
  }

  function handleOpenCook() {
    setPage('cook');
    setDismissed(true);
  }

  return (
    <div className="cook-toast">
      <div className="cook-toast-hdr">
        <div>
          <div className="cook-toast-title">
            {isMorning ? t('cookMorn') : t('cookEve')}
          </div>
          <div className="cook-toast-sub">
            {isMorning ? t('cookServesMornLunch') : t('cookServesEveNight')}
          </div>
        </div>
        <button className="cook-toast-close" onClick={() => setDismissed(true)}>✕</button>
      </div>

      {cookItems.map(item => {
        const isCooked = !!cookData[item.id];
        const name = lang === 'te' ? item.teName : item.name;
        return (
          <div key={item.id} className={`cook-item${isCooked ? ' cooked' : ''}`}>
            <div className="cook-chk" onClick={() => toggleCookItem(item.id)}>
              {isCooked ? '✓' : ''}
            </div>
            <div className="cook-name">{name}</div>
            <button className="cook-how" onClick={handleOpenCook}>
              {t('howTo')}
            </button>
          </div>
        );
      })}

      <button className="cook-done-btn" onClick={handleOpenCook}>
        {t('openCook')}
      </button>
    </div>
  );
}
