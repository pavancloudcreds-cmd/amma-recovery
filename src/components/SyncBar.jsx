import { useLang } from '../context/LanguageContext';

export default function SyncBar({ synced }) {
  const { t } = useLang();

  return (
    <div className={`sync-bar ${synced ? 'sync-ok' : 'sync-err'}`}>
      {synced ? t('synced') : t('local')}
    </div>
  );
}
