import { useState } from 'react';
import { useLang } from '../../context/LanguageContext';

export default function AddExtraModal({ open, onSave, onCancel }) {
  const { t } = useLang();
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [shift, setShift] = useState('morning');

  function handleSave() {
    if (!name.trim()) return;
    onSave(name.trim(), time, shift);
    setName('');
    setTime('');
    setShift('morning');
  }

  function handleCancel() {
    setName('');
    setTime('');
    setShift('morning');
    onCancel();
  }

  return (
    <div className={`ov${open ? ' open' : ''}`} onClick={handleCancel}>
      <div className="mod" onClick={e => e.stopPropagation()}>
        <div className="mtitle">{t('addTitle')}</div>
        <input
          className="minput"
          placeholder="Item name..."
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          className="minput"
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
        />
        <select
          className="minput"
          value={shift}
          onChange={e => setShift(e.target.value)}
        >
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
          <option value="night">Night</option>
        </select>
        <button className="mbtn btn-g" onClick={handleSave}>
          {t('save')}
        </button>
        <button className="mbtn btn-gr" onClick={handleCancel}>
          {t('cancel')}
        </button>
      </div>
    </div>
  );
}
