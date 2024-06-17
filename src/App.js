import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Shirt from './components/Shirt';
import './App.css';

function App() {
  return (
    <>
      <div className="home">
          <h1>Welcome to the Cloth Customizer!!</h1>
      </div>
      <Shirt />
    </>
    
    // <Router>
    //   <div className="App">
    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //       <Route path="/shirt" element={<Shirt />} />
    //     </Routes>
    //   </div>
    // </Router>
    
  );
}

export default App;
