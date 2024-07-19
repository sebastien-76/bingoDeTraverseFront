import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React from 'react';
import Salles from './pages/admin/salles/salles';
import Phrases from './pages/admin/phrases/phrases';
function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/phrases' element={<Phrases/>}/>
          <Route path='/salles' element={<Salles/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
