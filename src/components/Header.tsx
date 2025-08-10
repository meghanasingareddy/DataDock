import React from 'react';
import { Database, Menu, X, Search, Upload, BarChart3, Home } from 'lucide-react';

interface HeaderProps {
  activeView: 'home' | 'dashboard' | 'upload' | 'search' | 'visualizations';
  onNavChange: (view: 'home' | 'dashboard' | 'upload' | 'search' | 'visualizations') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeView, onNavChange }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'dashboard' as const, label: 'Dashboard', icon: BarChart3 },
    { id: 'upload' as const, label: 'Upload Data', icon: Upload },
    { id: 'search' as const, label: 'Search', icon: Search },
    { id: 'visualizations' as const, label: 'Visualizations', icon: BarChart3 },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div 
            className="flex items-center space-x-3 cursor-pointer transition-transform hover:scale-105"
            onClick={() => onNavChange('home')}
          >
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-2 rounded-xl">
              <Database className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">DataDock</h1>
              <p className="text-sm text-gray-500">AI-Optimized Cloud Storage</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onNavChange(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeView === id
                    ? 'bg-blue-100 text-blue-700 shadow-md'
                    : 'text-gray-600 hover:text-blue-700 hover:bg-blue-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="space-y-2">
              {navItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => {
                    onNavChange(id);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeView === id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-blue-700 hover:bg-blue-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};