// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';  // ✅ Import Provider from react-redux
import store from './redax/store';  // ✅ Import the Redux store (default import)
import Login from './components/login';
import Register from './components/signup';
import Dashboard from './components/dashboard';

const App = () => {
  return (
    <Provider store={store}>  {/* ✅ Wrap the entire app with Provider */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
