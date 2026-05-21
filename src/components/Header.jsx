import { useLang } from '../context/LanguageContext';

export default function Header({ synced }) {
  const { lang, t, toggleLang } = useLang();

  return (
    <div className="hdr">
      <div className="hdr-top">
        <div>
          <div className="htitle">{t('title')}</div>
          <div className="hsub">{t('sub')}</div>
        </div>
        <button className="lbtn" onClick={toggleLang}>
          {lang === 'en' ? 'తెలుగు' : 'English'}
        </button>
      </div>
      <div className="hdr-bottom">
        <div className="sbadge">{t('badge')}</div>
        <div className="sbadge">
          <span
            className={`sync-dot ${synced ? 'sync-live' : 'sync-off'}`}
          />
          {synced ? 'Live' : 'Offline'}
        </div>
      </div>
    </div>
  );
}
