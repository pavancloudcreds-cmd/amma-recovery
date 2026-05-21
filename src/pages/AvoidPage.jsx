import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { AVOID } from '../data/avoidList';

export default function AvoidPage() {
  const { lang, t } = useLang();
  const [search, setSearch] = useState('');

  const filtered = AVOID.filter(item => {
    const q = search.toLowerCase();
    if (!q) return true;
    return item.en.toLowerCase().includes(q) ||
      item.te.toLowerCase().includes(q) ||
      item.enR.toLowerCase().includes(q) ||
      item.teR.toLowerCase().includes(q);
  });

  return (
    <div className="pg active">
      <input
        className="srch"
        placeholder={t('srch')}
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {filtered.map(item => (
        <div key={item.id} className="av-item">
          <span style={{ fontSize: '26px' }}>{item.em}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: '14px' }}>
              {lang === 'te' ? item.te : item.en}
            </div>
            <div style={{ fontSize: '12px', color: '#e74c3c', marginTop: '2px', fontWeight: 700 }}>
              {lang === 'te' ? item.teR : item.enR}
            </div>
          </div>
        </div>
      ))}
      {filtered.length === 0 && (
        <div className="empty">No items found for "{search}"</div>
      )}
    </div>
  );
}
