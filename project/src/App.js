import React from 'react';
import Login from './login';
import Register from './register';
import { Route, Routes}  from 'react-router-dom';
import Notebook from './notebook';



function App() {
  return (
   <div className="app">
   <Routes>
   <Route path="/" element={<Login/>} />
   <Route path="/register" element={<Register/>} />
   <Route path="/login" element={<Login/>} />
   <Route path="/profile" element={<Notebook/>} />
   </Routes>

   

   
   </div>

  );
}

export default App;
