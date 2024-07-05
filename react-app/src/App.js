// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Book from './Components/Book';

function App() {
  return (
  <>
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<Book/>} />
    </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;