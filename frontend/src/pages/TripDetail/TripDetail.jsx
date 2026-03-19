// src/pages/TripDetail/TripDetail.js
import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockTrips, mockPackingItems, mockTips, categories, climateEmoji } from '../../utils/mockData';
import PackingItem from '../../components/PackingItem/PackingItem';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import TipCard from '../../components/TipCard/TipCard';
import FilterBar from '../../components/FilterBar/FilterBar';
import styles from './TripDetail.module.css';

const catFilters = categories.map((c) => ({ value: c, label: c }));

const TripDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip]         = useState(() => mockTrips.find((t) => t._id === id) || mockTrips[0]);
  const [tab,  setTab]          = useState('list');
  const [catFilter, setCatFilter] = useState([]);
  const [customName, setCustomName] = useState('');
  const [upvoted, setUpvoted]   = useState([]);
  const [editing, setEditing]   = useState(false);
  const [editName, setEditName] = useState(trip.tripName);

  const tripItemIds = trip.items.map((i) => i.itemId);

  const catalogItems = mockPackingItems.filter((item) =>
    catFilter.length === 0 || catFilter.includes(item.category)
  );

  const relatedTips = mockTips.filter(
    (t) => t.tripTypeTags.includes(trip.tripType) || t.climateTags.includes(trip.climate)
  );

  const checked = trip.items.filter((i) => i.isChecked).length;

  const toggleCheck = (itemId) =>
    setTrip((p) => ({ ...p, items: p.items.map((i) => i.itemId === itemId ? { ...i, isChecked: !i.isChecked } : i) }));

  const addToTrip = (item) => {
    if (tripItemIds.includes(item._id)) return;
    setTrip((p) => ({ ...p, items: [...p.items, { itemId: item._id, isChecked: false, isCustom: false, customName: null }] }));
  };

  const removeFromTrip = (itemId) =>
    setTrip((p) => ({ ...p, items: p.items.filter((i) => i.itemId !== itemId) }));

  const addCustom = () => {
    if (!customName.trim()) return;
    setTrip((p) => ({ ...p, items: [...p.items, { itemId: `custom_${Date.now()}`, isChecked: false, isCustom: true, customName: customName.trim() }] }));
    setCustomName('');
  };

  const saveName = () => { setTrip((p) => ({ ...p, tripName: editName })); setEditing(false); };

  const handleDelete = () => {
    if (!window.confirm('Delete this trip?')) return;
    navigate('/dashboard');
  };

  return (
    <div className={styles.page}>
      <div className={`${styles.inner} container`}>

        {/* breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link to="/dashboard" className={styles.bcLink}>My trips</Link>
          <span className={styles.bcSep}>›</span>
          <span className={styles.bcCurrent}>{trip.tripName}</span>
        </div>

        {/* header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.headerIcon}>{climateEmoji[trip.climate] || '✈️'}</div>
            <div>
              {editing ? (
                <div className={styles.editRow}>
                  <input className={styles.editInput} value={editName}
                    onChange={(e) => setEditName(e.target.value)} autoFocus />
                  <button className={styles.saveBtn} onClick={saveName}>Save</button>
                  <button className={styles.cancelBtn} onClick={() => setEditing(false)}>Cancel</button>
                </div>
              ) : (
                <div className={styles.nameRow}>
                  <h1 className={styles.tripName}>{trip.tripName}</h1>
                  <button className={styles.editBtn} onClick={() => setEditing(true)}>Edit</button>
                  <button className={styles.deleteBtn} onClick={handleDelete}>Delete</button>
                </div>
              )}
              <p className={styles.tripMeta}>
                {trip.destination}, {trip.country} · {trip.durationDays}d · {trip.tripType} · {trip.climate} · {trip.luggageType}
              </p>
            </div>
          </div>
          <div className={styles.progressBox}>
            <ProgressBar checked={checked} total={trip.items.length} />
          </div>
        </div>

        {/* tabs */}
        <div className={styles.tabs}>
          {[
            { key: 'list',    label: `My list (${trip.items.length})` },
            { key: 'catalog', label: 'Browse catalog' },
            { key: 'tips',    label: `Tips (${relatedTips.length})` },
          ].map((t) => (
            <button key={t.key}
              className={`${styles.tab} ${tab === t.key ? styles.tabOn : ''}`}
              onClick={() => setTab(t.key)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── My list ── */}
        {tab === 'list' && (
          <div className={styles.tabContent}>
            <div className={styles.customRow}>
              <input className={styles.customInput} type="text"
                placeholder="Add a custom item..."
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addCustom()} />
              <button className={styles.customAddBtn} onClick={addCustom}>+ Add</button>
            </div>

            {trip.items.length === 0 ? (
              <div className={styles.empty}>
                <p className={styles.emptyTitle}>Your list is empty.</p>
                <p className={styles.emptySub}>Browse the catalog tab to add items.</p>
                <button className={styles.emptyBtn} onClick={() => setTab('catalog')}>Browse catalog →</button>
              </div>
            ) : (
              <div className={styles.groups}>
                {categories.map((cat) => {
                  const catItems = trip.items.filter((ti) => {
                    if (ti.isCustom) return cat === 'Activity Gear';
                    const m = mockPackingItems.find((m) => m._id === ti.itemId);
                    return m && m.category === cat;
                  });
                  if (catItems.length === 0) return null;
                  return (
                    <div key={cat} className={styles.group}>
                      <h3 className={styles.groupTitle}>{cat}
                        <span className={styles.groupCount}>{catItems.length}</span>
                      </h3>
                      <div className={styles.groupItems}>
                        {catItems.map((ti) => {
                          if (ti.isCustom) {
                            return (
                              <div key={ti.itemId} className={`${styles.customItem} ${ti.isChecked ? styles.customItemDone : ''}`}>
                                <button
                                  className={`${styles.chk} ${ti.isChecked ? styles.chkOn : ''}`}
                                  onClick={() => toggleCheck(ti.itemId)}>
                                  {ti.isChecked && '✓'}
                                </button>
                                <span className={styles.customItemName}>{ti.customName}</span>
                                <span className={styles.customBadge}>Custom</span>
                                <button className={styles.rmBtn} onClick={() => removeFromTrip(ti.itemId)}>✕</button>
                              </div>
                            );
                          }
                          const master = mockPackingItems.find((m) => m._id === ti.itemId);
                          if (!master) return null;
                          return (
                            <PackingItem key={ti.itemId} item={master}
                              isChecked={ti.isChecked} isInTrip
                              onToggleCheck={toggleCheck}
                              onRemoveFromTrip={removeFromTrip} />
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── Catalog ── */}
        {tab === 'catalog' && (
          <div className={styles.tabContent}>
            <FilterBar label="Category" filters={catFilters} active={catFilter} onChange={setCatFilter} />
            <div className={styles.catalogGrid}>
              {catalogItems.map((item) => (
                <PackingItem key={item._id} item={item} isInTrip={false}
                  onAddToTrip={addToTrip} />
              ))}
            </div>
          </div>
        )}

        {/* ── Tips ── */}
        {tab === 'tips' && (
          <div className={styles.tabContent}>
            <p className={styles.tipsIntro}>
              Top community tips for <strong>{trip.tripType}</strong> trips in a <strong>{trip.climate}</strong> climate.
            </p>
            <div className={styles.tipsBox}>
              {relatedTips.length === 0
                ? <p className={styles.emptySub}>No tips yet for this trip type.</p>
                : relatedTips.map((tip) => (
                  <TipCard key={tip._id} tip={tip}
                    hasUpvoted={upvoted.includes(tip._id)}
                    onUpvote={(id) => setUpvoted((p) => [...p, id])}
                    onRemoveUpvote={(id) => setUpvoted((p) => p.filter((u) => u !== id))} />
                ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default TripDetail;
