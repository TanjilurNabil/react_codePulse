import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Categories from './components/Categories';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register';
import authService from './services/authService';

const App = () => {
  const currentUser = authService.getCurrentUser();
  const handleLogout = () => {
    authService.logout();
    window.location.reload();
  };

  return (
    
    <Router>
      <nav>
        <Link to="/">Home</Link> |
        {!currentUser && <Link to="/login">Login</Link>} |
      {!currentUser && <Link to="/register">Register</Link>} |
        {currentUser && <Link to="/categories">Categories</Link>} |
        { currentUser && <button onClick={handleLogout}>Logout</button>}
      </nav>
      <hr />
      <Routes>
        <Route path="/" element={<h2>Home Page</h2>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/> } />
        <Route path="/categories" element={
          <ProtectedRoute>
            <Categories/>
          </ProtectedRoute>
         } />
      </Routes>
    </Router>
  );
};

export default App;