/*import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function AdminPanel() {
  const [registrations, setRegistrations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      alert('Access denied!');
      navigate('/');
    } else {
      fetchRegistrations();
    }
  }, [navigate]);

  const fetchRegistrations = async () => {
    const res = await API.get('/registrations');
    setRegistrations(res.data);
  };

  const updateStatus = async (id, status) => {
    await API.patch(`/registrations/${id}`, { status });
    fetchRegistrations();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Admin Panel – Approve Course Registrations</h2>
        <button onClick={() => navigate('/admin-analytics')} style={styles.btnApprove}>
            View Analytics
        </button>

        {registrations.length === 0 ? (
          <p>No registrations yet</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Student</th>
                <th>Course</th>
                <th>Program</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg) => (
              <tr key={reg._id}>
                <td>{reg.studentId?.name || 'Unknown Student'}</td>
                <td>{reg.courseId?.name || 'Unknown Course'}</td>
                <td>{reg.courseId?.program || 'N/A'}</td>
                <td>{reg.status}</td>
                <td>
                    <button style={styles.btnApprove} onClick={() => updateStatus(reg._id, 'approved')}>Approve</button>
                    <button style={styles.btnReject} onClick={() => updateStatus(reg._id, 'rejected')}>Reject</button>
                </td>
              </tr>
              ))}

            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: 'linear-gradient(to right, #fbc2eb, #a6c1ee)',
    minHeight: '100vh',
    padding: '40px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  btnApprove: {
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  padding: '8px 14px',
  margin: '15px 0',
  borderRadius: '6px',
  cursor: 'pointer',
  },
  btnReject: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default AdminPanel;
*/
import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function AdminPanel() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      navigate('/');
    } else {
      fetchRegistrations();
    }
  }, [navigate]);

  const fetchRegistrations = async () => {
    try {
      const res = await API.get('/registrations');
      setRegistrations(res.data);
    } catch (err) {
      console.error("Failed to fetch registrations");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    await API.patch(`/registrations/${id}`, { status });
    fetchRegistrations();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>Management Console</h2>
            <p style={styles.subtitle}>Review and manage pending course registrations.</p>
          </div>
          <div style={styles.headerActions}>
             <button onClick={() => navigate('/dashboard')} style={styles.secondaryBtn}>
              Dashboard
            </button>
            <button onClick={() => navigate('/admin-analytics')} style={styles.primaryBtn}>
              View Analytics
            </button>
          </div>
        </div>

        {loading ? (
          <p style={styles.emptyText}>Loading records...</p>
        ) : registrations.length === 0 ? (
          <div style={styles.emptyContainer}>
            <p style={styles.emptyText}>No registration records found.</p>
          </div>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Student Name</th>
                  <th style={styles.th}>Course Title</th>
                  <th style={styles.th}>Program</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg) => (
                  <tr key={reg._id} style={styles.tr}>
                    <td style={styles.td}>{reg.studentId?.name || 'Unknown'}</td>
                    <td style={styles.td}>{reg.courseId?.name || 'Unknown'}</td>
                    <td style={styles.td}>{reg.courseId?.program || 'N/A'}</td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.badge,
                        ...getStatusStyle(reg.status)
                      }}>
                        {reg.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.actionCell}>
                        <button 
                          style={styles.btnApprove} 
                          onClick={() => updateStatus(reg._id, 'approved')}
                        >
                          Approve
                        </button>
                        <button 
                          style={styles.btnReject} 
                          onClick={() => updateStatus(reg._id, 'rejected')}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper for status badge colors
const getStatusStyle = (status) => {
  switch (status) {
    case 'approved': return { backgroundColor: '#def7ec', color: '#03543f' };
    case 'rejected': return { backgroundColor: '#fde8e8', color: '#9b1c1c' };
    default: return { backgroundColor: '#f3f4f6', color: '#374151' };
  }
};

const styles = {
  container: {
    backgroundColor: '#f9fafb',
    minHeight: '100vh',
    padding: '40px 20px',
    fontFamily: '"Inter", sans-serif',
  },
  card: {
    backgroundColor: '#fff',
    padding: '32px',
    borderRadius: '16px',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    borderBottom: '1px solid #f3f4f6',
    paddingBottom: '20px',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#111827',
    margin: 0,
  },
  subtitle: {
    color: '#6b7280',
    fontSize: '0.9rem',
    margin: '4px 0 0 0',
  },
  headerActions: {
    display: 'flex',
    gap: '12px',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0',
  },
  th: {
    textAlign: 'left',
    padding: '12px 16px',
    backgroundColor: '#f9fafb',
    color: '#4b5563',
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    borderBottom: '1px solid #e5e7eb',
  },
  td: {
    padding: '16px',
    fontSize: '0.9rem',
    color: '#374151',
    borderBottom: '1px solid #f3f4f6',
  },
  badge: {
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  actionCell: {
    display: 'flex',
    gap: '8px',
  },
  primaryBtn: {
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '0.875rem',
  },
  secondaryBtn: {
    backgroundColor: '#fff',
    color: '#374151',
    border: '1px solid #d1d5db',
    padding: '10px 18px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '0.875rem',
  },
  btnApprove: {
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '0.8rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
  btnReject: {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '0.8rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
  emptyContainer: {
    padding: '40px',
    textAlign: 'center',
  },
  emptyText: {
    color: '#9ca3af',
  }
};

export default AdminPanel;