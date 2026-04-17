/*
import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';

import { Pie } from 'react-chartjs-2';
import { ArcElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { LineElement, PointElement } from 'chart.js';


ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
ChartJS.register(ArcElement); // Register Pie/Donut chart
ChartJS.register(LineElement, PointElement);


function AdminAnalytics() {
  const [chartData, setChartData] = useState({});
  const [facultyChartData, setFacultyChartData] = useState({});
  const [yearChartData, setYearChartData] = useState({});

  const navigate = useNavigate();


  useEffect(() => {
    loadChart();
  }, []);

  const loadChart = async () => {

    // for bar chart
    const res = await API.get('/registrations/stats/course-counts');
    console.log('API response:', res.data);
    const labels = res.data.map((item) => item._id);
    const counts = res.data.map((item) => item.count);

    setChartData({
      labels,
      datasets: [
        {
          label: 'Number of Registrations',
          data: counts,
          backgroundColor: '#007bff',
        },
      ],
    });

    // for pie chart
    const res2 = await API.get('/registrations/stats/faculty-distribution');
    const facultyLabels = res2.data.map(item => item._id);
    const facultyCounts = res2.data.map(item => item.count);

    setFacultyChartData({
        labels: facultyLabels,
        datasets: [
        {
            label: 'Faculty Enrollments',
            data: facultyCounts,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8e44ad', '#2ecc71'],
        }
        ]
    });

    //for line chart
    const res4 = await API.get('/registrations/stats/yearly-trends');
    const yearLabels = res4.data.map(item => item._id);
    const yearCounts = res4.data.map(item => item.count);

    setYearChartData({
      labels: yearLabels,
      datasets: [
      {
        label: 'Registrations Per Year',
        data: yearCounts,
        borderColor: '#ff6384',
        fill: false,
        tension: 0.3,
      }
      ]
    });


  };

  return (
  <div style={{ padding: '40px' }}>
    <button onClick={() => navigate('/admin')} style={{ ...styles.button, marginBottom: '20px' }}>
      ← Back to Admin Panel
    </button>
    <h2>📊 Registration Analytics</h2>

    {chartData?.labels?.length > 0 ? (
      <div style={{ maxWidth: '700px', marginTop: '30px' }}>
        <Bar data={chartData} />
      </div>
    ) : (
      <p>No registration data found.</p>
    )}

    
    <h3 style={{ marginTop: '40px' }}>📌 Faculty-Wise Enrollments</h3>
    {facultyChartData?.labels?.length > 0 ? (
        <div style={{ maxWidth: '600px', marginTop: '20px' }}>
            <Pie data={facultyChartData} />
        </div>
    ) : (
        <p>No faculty data available.</p>
    )}

    <h4 style={{ marginTop: '40px' }}>📆 Yearly Registration Trends</h4>
    {yearChartData?.labels?.length > 0 ? (
      <div style={{ maxWidth: '700px', marginTop: '20px' }}>
        <Line data={yearChartData} />
      </div>
    ) : (
        <p>No yearly trend data available.</p>
    )}



  </div>
  );

}

const styles = {
  button: {
    padding: '10px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },

};

export default AdminAnalytics;
*/

import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

function AdminAnalytics() {
  const [chartData, setChartData] = useState({});
  const [facultyChartData, setFacultyChartData] = useState({});
  const [yearChartData, setYearChartData] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    loadChart();
  }, []);

  const loadChart = async () => {
    setLoading(true);
    try {
      // 1. Bar Chart Data
      const res = await API.get('/registrations/stats/course-counts');
      const labels = res.data.map((item) => item._id);
      const counts = res.data.map((item) => item.count);

      setChartData({
        labels,
        datasets: [{
          label: 'Registrations',
          data: counts,
          backgroundColor: '#4f46e5', // Primary Indigo
          borderRadius: 6,
        }],
      });

      // 2. Pie Chart Data
      const res2 = await API.get('/registrations/stats/faculty-distribution');
      setFacultyChartData({
        labels: res2.data.map(item => item._id),
        datasets: [{
          data: res2.data.map(item => item.count),
          backgroundColor: ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'],
          borderWidth: 0,
        }]
      });

      // 3. Line Chart Data
      const res4 = await API.get('/registrations/stats/yearly-trends');
      setYearChartData({
        labels: res4.data.map(item => item._id),
        datasets: [{
          label: 'Trend',
          data: res4.data.map(item => item.count),
          borderColor: '#4f46e5',
          backgroundColor: 'rgba(79, 70, 229, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 4,
        }]
      });
    } catch (err) {
      console.error("Analytics fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate('/admin')} style={styles.backBtn}>
          ← Back to Admin
        </button>
        <h2 style={styles.title}>System Analytics</h2>
        <p style={styles.subtitle}>Insightful overview of course registrations and trends.</p>
      </div>

      {loading ? (
        <p style={styles.loadingText}>Synthesizing data...</p>
      ) : (
        <div style={styles.grid}>
          {/* Main Bar Chart */}
          <div style={{ ...styles.chartCard, gridColumn: 'span 2' }}>
            <h3 style={styles.chartTitle}>Registrations by Course</h3>
            {chartData.labels ? <Bar data={chartData} options={chartOptions} /> : <p>No data</p>}
          </div>

          {/* Pie Chart */}
          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Faculty Distribution</h3>
            <div style={{ maxHeight: '300px', display: 'flex', justifyContent: 'center' }}>
              {facultyChartData.labels ? <Pie data={facultyChartData} /> : <p>No data</p>}
            </div>
          </div>

          {/* Line Chart */}
          <div style={{ ...styles.chartCard, gridColumn: 'span 2' }}>
            <h3 style={styles.chartTitle}>Yearly Registration Trends</h3>
            {yearChartData.labels ? <Line data={yearChartData} options={chartOptions} /> : <p>No data</p>}
          </div>
        </div>
      )}
    </div>
  );
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: { beginAtZero: true, grid: { color: '#f3f4f6' } },
    x: { grid: { display: false } }
  }
};

const styles = {
  container: {
    backgroundColor: '#f9fafb',
    minHeight: '100vh',
    padding: '40px 20px',
    fontFamily: '"Inter", sans-serif',
  },
  header: {
    maxWidth: '1200px',
    margin: '0 auto 40px auto',
  },
  backBtn: {
    padding: '8px 16px',
    backgroundColor: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '16px',
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#374151',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '800',
    color: '#111827',
    margin: 0,
  },
  subtitle: {
    color: '#6b7280',
    fontSize: '1.1rem',
    marginTop: '4px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  chartCard: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '16px',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
    border: '1px solid #f3f4f6',
  },
  chartTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#374151',
    marginBottom: '20px',
  },
  loadingText: {
    textAlign: 'center',
    color: '#9ca3af',
    marginTop: '100px',
  }
};

export default AdminAnalytics;