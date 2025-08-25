import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import { useAuth } from '../context/AuthContext';


const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const ok = await login(username.trim(), password);
    setLoading(false);
    if (ok) {
      navigate('/');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="container" style={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>

      <div style={{ maxWidth: 420, width: '100%' }}>
        <Card title="Admin Login">
          <form onSubmit={onSubmit}>
            <div style={{ marginBottom: 12 }}>
              <label className="label" htmlFor="username">Username</label>
              <input id="username" className="input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label className="label" htmlFor="password">Password</label>
              <input id="password" type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
            </div>
            {error ? <div className="small" style={{ color: 'var(--danger)', marginBottom: 8 }}>{error}</div> : null}
            <button className="button" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login; 