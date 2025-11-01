import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { RecordPage } from './components/RecordPage';
import { ReportPage } from './components/ReportPage';
import { SuggestionsPage } from './components/SuggestionsPage';
import { HistoryPage } from './components/HistoryPage';
import { AboutPage } from './components/AboutPage';
import type { Page } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentMoodId, setCurrentMoodId] = useState<string | null>(null);

  const handleMoodRecorded = (moodId: string) => {
    setCurrentMoodId(moodId);
  };

  const handleViewMood = (moodId: string) => {
    setCurrentMoodId(moodId);
  };

  return (
    <>
      {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
      {currentPage === 'record' && (
        <RecordPage onNavigate={setCurrentPage} onMoodRecorded={handleMoodRecorded} />
      )}
      {currentPage === 'report' && (
        <ReportPage onNavigate={setCurrentPage} moodId={currentMoodId} />
      )}
      {currentPage === 'suggestions' && <SuggestionsPage onNavigate={setCurrentPage} />}
      {currentPage === 'history' && (
        <HistoryPage onNavigate={setCurrentPage} onViewMood={handleViewMood} />
      )}
      {currentPage === 'about' && <AboutPage onNavigate={setCurrentPage} />}
    </>
  );
}

export default App;
