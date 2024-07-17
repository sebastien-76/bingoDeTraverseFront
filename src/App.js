import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React from 'react';
import Salles from './pages/admin/salles/salles';
function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Salles/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
