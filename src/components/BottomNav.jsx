import { useLang } from '../context/LanguageContext';

const NAV_ITEMS = [
  { key: 'today', icon: '📋', labelKey: 'nToday' },
  { key: 'history', icon: '📅', labelKey: 'nHistory' },
  { key: 'cook', icon: '🍳', labelKey: 'nCook' },
  { key: 'avoid', icon: '🚫', labelKey: 'nAvoid' },
];

export default function BottomNav({ currentPage, setPage }) {
  const { t } = useLang();

  return (
    <nav className="bnav">
      {NAV_ITEMS.map(item => (
        <button
          key={item.key}
          className={`nb${currentPage === item.key ? ' active' : ''}`}
          onClick={() => setPage(item.key)}
        >
          <span className="ni">{item.icon}</span>
          {t(item.labelKey)}
        </button>
      ))}
    </nav>
  );
}
