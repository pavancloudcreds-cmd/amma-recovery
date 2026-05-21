import { useLang } from '../context/LanguageContext';

export default function DietItem({ item, status, time, onItemClick, isMed }) {
  const { lang, t } = useLang();

  const name = isMed ? item.en : (lang === 'te' && item.te ? item.te : item.en);
  const detail = isMed ? item.dt : (lang === 'te' && item.dte ? item.dte : item.dt);
  const ownerTag = item.owner === 'sister'
    ? <span className="tag tag-sis">{t('sister')}</span>
    : <span className="tag tag-you">{t('you')}</span>;

  let checkIcon = '○';
  if (status === 'done') checkIcon = '✓';
  if (status === 'skipped') checkIcon = '✗';

  const classes = [
    'di',
    isMed ? 'med' : '',
    status === 'done' ? 'done' : '',
    status === 'skipped' ? 'skipped' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} onClick={() => onItemClick(item.id)}>
      <div className="chk">{status === 'done' ? '✓' : status === 'skipped' ? '✗' : ''}</div>
      <div className="iem">{item.em}</div>
      <div className="ii">
        <div className="iname">
          {name}
          {!isMed && ownerTag}
        </div>
        <div className="idet">{detail}</div>
        {time && <div className="itime">{time}</div>}
      </div>
    </div>
  );
}
