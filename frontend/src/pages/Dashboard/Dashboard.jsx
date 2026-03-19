// src/pages/Dashboard/Dashboard.js
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { mockTrips } from '../../utils/mockData';
import TripCard from '../../components/TripCard/TripCard';
import styles from './Dashboard.module.css';

const TABS = ['all','planning','ongoing','completed'];

const Dashboard = ({ user }) => {
  const [trips, setTrips]     = useState(mockTrips);
  const [tab,   setTab]       = useState('all');

  const visible = tab === 'all' ? trips : trips.filter((t) => t.status === tab);

  const handleDelete = (id) => {
    if (!window.confirm('Delete this trip?')) return;
    setTrips((p) => p.filter((t) => t._id !== id));
  };

  const counts = TABS.reduce((acc, t) => {
    acc[t] = t === 'all' ? trips.length : trips.filter((x) => x.status === t).length;
    return acc;
  }, {});

  return (
    <div className={styles.page}>
      <div className={`${styles.inner} container`}>

        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>My Trips</h1>
            {user && <p className={styles.sub}>Welcome back, {user.name.split(' ')[0]}</p>}
          </div>
          <Link to="/create-trip" className={styles.newBtn}>+ New trip</Link>
        </div>

        {/* summary */}
        <div className={styles.summary}>
          <div className={styles.summCard}>
            <span className={styles.summN}>{trips.length}</span>
            <span className={styles.summL}>Total</span>
          </div>
          <div className={styles.summCard}>
            <span className={`${styles.summN} ${styles.summBlue}`}>{counts.planning}</span>
            <span className={styles.summL}>Planning</span>
          </div>
          <div className={styles.summCard}>
            <span className={`${styles.summN} ${styles.summAmber}`}>{counts.ongoing}</span>
            <span className={styles.summL}>Ongoing</span>
          </div>
          <div className={styles.summCard}>
            <span className={`${styles.summN} ${styles.summGreen}`}>{counts.completed}</span>
            <span className={styles.summL}>Completed</span>
          </div>
        </div>

        {/* tabs */}
        <div className={styles.tabs}>
          {TABS.map((t) => (
            <button
              key={t}
              className={`${styles.tab} ${tab === t ? styles.tabOn : ''}`}
              onClick={() => setTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
              <span className={styles.tabCount}>{counts[t]}</span>
            </button>
          ))}
        </div>

        {/* list */}
        {visible.length > 0 ? (
          <div className={styles.list}>
            {visible.map((trip, i) => (
              <TripCard key={trip._id} trip={trip} index={i} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>No trips here yet.</p>
            <p className={styles.emptySub}>Create your first trip to start building a packing list.</p>
            <Link to="/create-trip" className={styles.newBtn} style={{ marginTop: 16 }}>+ New trip</Link>
          </div>
        )}
      </div>
    </div>
  );
};

Dashboard.propTypes = { user: PropTypes.shape({ name: PropTypes.string }) };
Dashboard.defaultProps = { user: null };

export default Dashboard;
