/*
import React, { useEffect, useState } from 'react';
import API from '../services/api';

function CourseRegistrationPage() {
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const studentId = localStorage.getItem('userId'); // store this on login

  useEffect(() => {
    const fetchMyCourses = async () => {
        const res = await API.get(`/registrations/${studentId}`);
        setMyCourses(res.data);
     };

    fetchCourses();
    fetchMyCourses();
  }, [studentId]);


  const fetchCourses = async () => {
    const res = await API.get('/courses');
    setCourses(res.data);
  };

  const fetchMyCourses = async () => {
    const res = await API.get(`/registrations/${studentId}`);
    setMyCourses(res.data);
  };

  const handleRegister = async (courseId) => {
    try {
      await API.post('/registrations', { studentId, courseId });
      alert('Registered successfully');
      fetchMyCourses();
    } catch (err) {
      alert(err.response?.data?.msg || 'Error registering');
    }
  };

  const isAlreadyRegistered = (courseId) =>
    myCourses.some((reg) => reg.courseId._id === courseId);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Available Courses</h2>
        <ul style={styles.list}>
          {courses.map((course) => (
            <li key={course._id} style={styles.item}>
              <b>{course.code}</b> - {course.name} ({course.program})
              {!isAlreadyRegistered(course._id) ? (
                <button style={styles.button} onClick={() => handleRegister(course._id)}>
                  Register
                </button>
              ) : (
                <span style={styles.status}>
                  ✅ Registered (
                  {myCourses.find((c) => c.courseId._id === course._id)?.status})
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: 'linear-gradient(to right, #89f7fe, #66a6ff)',
    minHeight: '100vh',
    padding: '30px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '12px',
    maxWidth: '800px',
    margin: '0 auto',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  item: {
    marginBottom: '20px',
    padding: '15px',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '8px 14px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  status: {
    color: 'green',
    fontWeight: 'bold',
  },
};

export default CourseRegistrationPage;
*/
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function CourseRegistrationPage() {
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const studentId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    if (!studentId) {
      navigate('/login');
      return;
    }
    loadData();
  }, [studentId, navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [allCourses, registered] = await Promise.all([
        API.get('/courses'),
        API.get(`/registrations/${studentId}`)
      ]);
      setCourses(allCourses.data);
      setMyCourses(registered.data);
    } catch (err) {
      console.error("Error loading courses");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (courseId) => {
    try {
      await API.post('/registrations', { studentId, courseId });
      alert('Registration request submitted successfully');
      loadData(); // Refresh both lists
    } catch (err) {
      alert(err.response?.data?.msg || 'Error registering');
    }
  };

  const getRegistration = (courseId) =>
    myCourses.find((reg) => reg.courseId._id === courseId);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>Available Courses</h2>
            <p style={styles.subtitle}>Select and register for your upcoming academic semester.</p>
          </div>
          <button onClick={() => navigate('/dashboard')} style={styles.secondaryBtn}>
            Dashboard
          </button>
        </div>

        {loading ? (
          <p style={styles.loadingText}>Loading course catalog...</p>
        ) : (
          <div style={styles.list}>
            {courses.map((course) => {
              const registration = getRegistration(course._id);
              return (
                <div key={course._id} style={styles.item}>
                  <div style={styles.courseInfo}>
                    <span style={styles.courseCode}>{course.code}</span>
                    <div style={styles.textContainer}>
                      <span style={styles.courseName}>{course.name}</span>
                      <span style={styles.courseProgram}>{course.program}</span>
                    </div>
                  </div>

                  <div style={styles.actionArea}>
                    {!registration ? (
                      <button 
                        style={styles.primaryBtn} 
                        onClick={() => handleRegister(course._id)}
                      >
                        Register Now
                      </button>
                    ) : (
                      <div style={styles.statusBadge(registration.status)}>
                        <span style={styles.checkIcon}>✓</span>
                        {registration.status.toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

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
    maxWidth: '900px',
    margin: '0 auto',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
    marginTop: '4px',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 0',
    borderBottom: '1px solid #f3f4f6',
  },
  courseInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  courseCode: {
    backgroundColor: '#eef2ff',
    color: '#4f46e5',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '0.85rem',
    fontWeight: '700',
    letterSpacing: '0.05em',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  courseName: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1f2937',
  },
  courseProgram: {
    fontSize: '0.85rem',
    color: '#6b7280',
  },
  primaryBtn: {
    backgroundColor: '#4f46e5',
    color: 'white',
    padding: '10px 18px',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '0.875rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  secondaryBtn: {
    backgroundColor: '#fff',
    color: '#374151',
    border: '1px solid #d1d5db',
    padding: '8px 16px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '0.875rem',
  },
  statusBadge: (status) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: status === 'approved' ? '#def7ec' : status === 'pending' ? '#fef3c7' : '#f3f4f6',
    color: status === 'approved' ? '#03543f' : status === 'pending' ? '#92400e' : '#374151',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '700',
  }),
  checkIcon: {
    fontSize: '1rem',
  },
  loadingText: {
    textAlign: 'center',
    color: '#9ca3af',
    padding: '40px',
  }
};

export default CourseRegistrationPage;