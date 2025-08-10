import React, { useState } from 'react';
import { Search as SearchIcon, Filter, Sparkles, TrendingUp, FileText, Download, Star, Calendar, User } from 'lucide-react';
import { useSearch } from '../hooks/useSearch';
import { useDatasets } from '../hooks/useDatasets';

export const Search: React.FC = () => {
  const { searchResults, popularQueries, loading, searchDatasets } = useSearch();
  const { incrementDownloads } = useDatasets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const filters = [
    'Demographics', 'Education', 'Healthcare', 'Economics', 'Environment', 
    'Transportation', 'Agriculture', 'Technology', 'Government', 'Social'
  ];

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      await searchDatasets(searchQuery, selectedFilters);
      setHasSearched(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleDownload = async (datasetId: string) => {
    await incrementDownloads(datasetId);
    // In a real app, this would trigger the actual download
    alert('Download started! (This is a demo)');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Datasets</h1>
          <p className="text-xl text-gray-600">Use natural language to find exactly what you need</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SearchIcon className="h-6 w-6 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything like 'Show me population data for urban areas in Maharashtra' or 'Education budget trends'"
              className="w-full pl-12 pr-16 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
            />
            <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
              <button 
                onClick={handleSearch}
                disabled={loading}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center disabled:opacity-50"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {loading ? 'Searching...' : 'AI Search'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center mb-4">
                <Filter className="h-5 w-5 text-gray-500 mr-2" />
                <h3 className="font-semibold text-gray-900">Filters</h3>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
                <div className="space-y-2">
                  {filters.map((filter) => (
                    <label key={filter} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedFilters.includes(filter)}
                        onChange={() => toggleFilter(filter)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{filter}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Popular Searches</h4>
                <div className="space-y-2">
                  {popularQueries.map((query, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchQuery(query)}
                      className="w-full text-left text-sm text-blue-600 hover:text-blue-800 p-2 rounded hover:bg-blue-50 transition-colors duration-200"
                    >
                      {query}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Search Results */}
          <div className="lg:col-span-3">
            {loading && (
              <div className="text-center py-12">
                <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Searching datasets...</p>
              </div>
            )}

            {!loading && hasSearched && (
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600">
                <span>Found {searchResults.length} datasets</span>
                {selectedFilters.length > 0 && (
                  <span className="ml-2">
                    • Filtered by: {selectedFilters.join(', ')}
                  </span>
                )}
              </div>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
                <option>Sort by Relevance</option>
                <option>Sort by Date</option>
                <option>Sort by Downloads</option>
                <option>Sort by Rating</option>
              </select>
            </div>
            )}

            {!loading && hasSearched && searchResults.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No datasets found matching your search.</p>
                <p className="text-sm text-gray-500">Try different keywords or remove some filters.</p>
              </div>
            )}

            {!hasSearched && !loading && (
              <div className="text-center py-12">
                <SearchIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Start searching to find datasets</p>
                <p className="text-sm text-gray-500">Use natural language queries or try one of the popular searches</p>
              </div>
            )}

            <div className="space-y-6">
              {searchResults.map((result, index) => (
                <div key={result.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 mr-3">{result.name}</h3>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                          {result.category}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4 leading-relaxed">{result.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {result.tags?.map((tag, tagIndex) => (
                          <span key={tagIndex} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <span className="flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        {result.size}
                      </span>
                      <span className="flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        {result.downloads.toLocaleString()}
                      </span>
                      <span className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        {result.rating}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(result.created_at).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {result.author}
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-sm">
                        View Details
                      </button>
                      <button 
                        onClick={() => handleDownload(result.id)}
                        className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 text-sm"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            {hasSearched && searchResults.length > 0 && (
            <div className="text-center mt-8">
              <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
                Load More Results
              </button>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};