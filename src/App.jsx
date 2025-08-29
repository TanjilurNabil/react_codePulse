import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/Login';
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
        {currentUser && <h1>Hello {currentUser} Welcome!</h1>} |
        { currentUser && <button onClick={handleLogout}>Logout</button>}
      </nav>
      <hr />
      <Routes>
        <Route path="/" element={<h2>Home Page</h2>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/> } />
        <Route path="/welcome" element={<h1>Welcome</h1> } />
      </Routes>
    </Router>
  );
};

export default App;