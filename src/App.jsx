import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import BlogHome from './components/BlogHome';
import Categories from './components/Categories';
import Header from './components/Header';
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
      <Header user={ currentUser} onLogout = {handleLogout} />
      {/* <nav>
        <Link to="/">Home</Link> |
        {!currentUser && <Link to="/login">Login</Link>} |
      {!currentUser && <Link to="/register">Register</Link>} |
        {currentUser && <Link to="/categories">Categories</Link>} |
        { currentUser && <button onClick={handleLogout}>Logout</button>}
      </nav> */}
      <div className="container mt-4">
      <Routes>
        <Route path="/" element={<BlogHome/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/> } />
        <Route path="/categories" element={
          <ProtectedRoute>
            <Categories/>
          </ProtectedRoute>
         } />
        </Routes>
        </div>
    </Router>
  );
};

export default App;