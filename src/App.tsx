import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Dashboard } from './components/Dashboard';
import { Upload } from './components/Upload';
import { Search } from './components/Search';
import { Visualizations } from './components/Visualizations';
import { Footer } from './components/Footer';

function App() {
  const [activeView, setActiveView] = useState<'home' | 'dashboard' | 'upload' | 'search' | 'visualizations'>('home');

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'upload':
        return <Upload />;
      case 'search':
        return <Search />;
      case 'visualizations':
        return <Visualizations />;
      default:
        return <Hero onGetStarted={() => setActiveView('dashboard')} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header activeView={activeView} onNavChange={setActiveView} />
      <main className="transition-all duration-300">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;