import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { useRoutes } from './routes';
import Navbar from './components/Navbar';
import Loader from './components/Loader';

function App() {
  const { token, refresh, userId, login, logout, ready } = useAuth();
  const isAuthenticated = !!token;
  const defaultPic = 'https://stihi.ru/pics/2018/02/08/11668.jpg';
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={{
      token, refresh, userId, login, logout, isAuthenticated, defaultPic,
    }}>
      <Router>
        {isAuthenticated && <Navbar />}
        <div className="app">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
