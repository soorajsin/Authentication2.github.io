import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
   <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dash' element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
