import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AIAssistant from './components/AIAssistant/AIAssistant';
import ConfigurationPage from './pages/Configuration/ConfigurationPage';
import RCAConsolidationPage from './pages/RCAConsolidation/RCAConsolidationPage';
import TroubleshootingPage from './pages/Troubleshooting/TroubleshootingPage';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AIAssistant />} />
          <Route path="/:userEmail/configuration" element={<ConfigurationPage />} />
          <Route path="/:userEmail/rca-consolidation" element={<RCAConsolidationPage />} />
          <Route path="/:userEmail/troubleshooting" element={<TroubleshootingPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;