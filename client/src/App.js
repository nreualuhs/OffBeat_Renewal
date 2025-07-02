import './App.css';

/** Structuring frontend for separate components */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JoinPage from './pages/JoinPage';
import AdminPage from './pages/AdminPage';
import WaitingPage from './pages/WaitingPage';
import InGame from './pages/InGame';
import InGameImpostor from './pages/InGameImpostor';
import EndGame from './pages/EndGame';
import EndGameImpostor from './pages/EndGameImpostor';
import DancePage from './pages/Dance';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/join' element={<JoinPage />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/waiting' element={<WaitingPage />} />
        <Route path='/ingame' element={<InGame />} />
        <Route path='/ingameimpostor' element={<InGameImpostor />} />
        <Route path='/endgame' element={<EndGame />} />
        <Route path='/endgameimpostor' element={<EndGameImpostor />} />
        <Route path='/Dance' element={<DancePage />} />
      </Routes>
    </Router>
  );
}

export default App;
