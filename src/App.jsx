import { BrowserRouter as Router, Route, Routes, Redirect, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Login/Home'; // Asegúrate de que esta parte se ajuste al nuevo enfoque

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/home" 
          element={
              <Home />
          } 
        />
        <Route 
          path="*" 
          element={<Navigate to="/login" replace />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
