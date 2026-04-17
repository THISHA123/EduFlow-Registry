/*
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // check if token exists
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in first.');
      navigate('/');
    } else {
      // Normally you’d fetch user info here
      setUser({ name: 'Student User' }); // fake user for now
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Welcome to the Dashboard</h2>
        {user && <p>Hello, {user.name}!</p>}

        {localStorage.getItem('role') === 'admin' ? (
            <button style={styles.linkButton} onClick={() => navigate('/admin')}>
                Go to Admin Panel
            </button>
        ) : (
            <button style={styles.linkButton} onClick={() => navigate('/register-course')}>
                Go to Course Registration
            </button>
        )}

        <button onClick={handleLogout} style={styles.button}>Logout</button>

      </div>
    </div>
  );
}

const styles = {
  container: {
    background: 'linear-gradient(to right, #e0c3fc, #8ec5fc)',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    textAlign: 'center',
  },
  linkButton: {
    padding: '10px 20px',
     marginTop: '20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  button: {
    padding: '12px',
    marginTop: '20px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#8e44ad',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default Dashboard;
*/
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      // Logic for actual user name or fallback
      setUser({ name: 'Student User' }); 
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.avatar}>
            {user?.name.charAt(0)}
          </div>
          <h2 style={styles.title}>User Dashboard</h2>
          <p style={styles.subtitle}>Welcome back, {user?.name}!</p>
        </div>

        <div style={styles.actionSection}>
          {role === 'admin' ? (
            <button style={styles.primaryButton} onClick={() => navigate('/admin')}>
              Go to Admin Panel
            </button>
          ) : (
            <button style={styles.primaryButton} onClick={() => navigate('/register-course')}>
              Browse & Register Courses
            </button>
          )}
          
          <button onClick={handleLogout} style={styles.secondaryButton}>
            Sign Out
          </button>
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>Role: <span style={styles.roleTag}>{role}</span></p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f3f4f6', // Light gray background
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: '"Inter", sans-serif',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '48px 40px',
    borderRadius: '20px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05), 0 20px 48px rgba(0, 0, 0, 0.05)',
    width: '100%',
    maxWidth: '480px',
    textAlign: 'center',
  },
  header: {
    marginBottom: '32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    width: '64px',
    height: '64px',
    backgroundColor: '#4f46e5',
    color: '#fff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '16px',
    boxShadow: '0 4px 10px rgba(79, 70, 229, 0.3)',
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: '800',
    color: '#111827',
    margin: '0 0 8px 0',
  },
  subtitle: {
    color: '#6b7280',
    fontSize: '1rem',
    margin: 0,
  },
  actionSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  primaryButton: {
    padding: '14px 24px',
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.2s ease',
  },
  secondaryButton: {
    padding: '14px 24px',
    backgroundColor: 'transparent',
    color: '#ef4444', // Professional red for logout
    border: '1px solid #fee2e2',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    marginTop: '8px',
    transition: 'all 0.2s ease',
  },
  footer: {
    marginTop: '32px',
    paddingTop: '20px',
    borderTop: '1px solid #f3f4f6',
  },
  footerText: {
    fontSize: '0.85rem',
    color: '#9ca3af',
  },
  roleTag: {
    backgroundColor: '#e0e7ff',
    color: '#4338ca',
    padding: '2px 8px',
    borderRadius: '12px',
    textTransform: 'capitalize',
    fontWeight: 'bold',
  }
};

export default Dashboard;