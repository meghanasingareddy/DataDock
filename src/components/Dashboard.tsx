import React from 'react';
import { TrendingUp, Database, Users, Activity, FileText, Download, Eye, Star } from 'lucide-react';
import { useDatasets } from '../hooks/useDatasets';
import { useVisualizations } from '../hooks/useVisualizations';

export const Dashboard: React.FC = () => {
  const { datasets, loading: datasetsLoading } = useDatasets();
  const { visualizations, loading: visualizationsLoading } = useVisualizations();

  if (datasetsLoading || visualizationsLoading) {
    return (
      <div className="min-h-screen bg-slate-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  const totalDownloads = datasets.reduce((sum, dataset) => sum + dataset.downloads, 0);
  const averageRating = datasets.length > 0 
    ? (datasets.reduce((sum, dataset) => sum + dataset.rating, 0) / datasets.length).toFixed(1)
    : '0';
  const totalViews = visualizations.reduce((sum, viz) => sum + viz.views, 0);

  const stats = [
    { label: 'Total Datasets', value: datasets.length.toString(), change: '+12%', icon: Database, color: 'bg-blue-500' },
    { label: 'Total Downloads', value: totalDownloads.toLocaleString(), change: '+8%', icon: Download, color: 'bg-green-500' },
    { label: 'Visualization Views', value: totalViews.toLocaleString(), change: '+23%', icon: Eye, color: 'bg-purple-500' },
    { label: 'Average Rating', value: averageRating, change: '+15%', icon: Star, color: 'bg-orange-500' },
  ];

  const recentDatasets = datasets.slice(0, 5);
  const recentVisualizations = visualizations.slice(0, 4);

  const trendingSearches = [
    'Population growth urban areas',
    'Education budget allocation',
    'Healthcare infrastructure',
    'Agricultural production data',
    'Employment statistics 2024',
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Overview of your DataDock platform activity and insights</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-green-600 text-sm font-medium">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Datasets */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Datasets</h2>
            <div className="space-y-4">
              {recentDatasets.map((dataset, index) => (
                <div key={dataset.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{dataset.name}</h3>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {dataset.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        {dataset.size}
                      </span>
                      <span className="flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        {dataset.downloads.toLocaleString()}
                      </span>
                      <span className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        {dataset.rating}
                      </span>
                    </div>
                    <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Searches */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Trending Searches</h2>
            <div className="space-y-3">
              {trendingSearches.map((search, index) => (
                <div key={index} className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">
                    {index + 1}
                  </div>
                  <span className="text-gray-700 text-sm">{search}</span>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium">
                  Upload New Dataset
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium">
                  Advanced Search
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium">
                  Create Visualization
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Chart */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Platform Activity</h2>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className="text-green-600 font-medium">+18% this month</span>
            </div>
          </div>
          <div className="h-64 bg-gradient-to-t from-blue-50 to-transparent rounded-lg flex items-end justify-between p-4">
            {[65, 78, 52, 89, 94, 76, 85, 92, 67, 84, 91, 96].map((height, index) => (
              <div
                key={index}
                className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md w-8 transition-all duration-500 hover:from-blue-600 hover:to-blue-500"
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>Jan</span>
            <span>Dec</span>
          </div>
        </div>
      </div>
    </div>
  );
};