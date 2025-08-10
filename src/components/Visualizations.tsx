import React, { useState } from 'react';
import { BarChart3, PieChart, TrendingUp, Map, Grid, Download, Share2, Settings, Eye } from 'lucide-react';
import { useVisualizations } from '../hooks/useVisualizations';

export const Visualizations: React.FC = () => {
  const { visualizations, loading, incrementViews } = useVisualizations();
  const [selectedVisualization, setSelectedVisualization] = useState<'chart' | 'map' | 'dashboard'>('chart');

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading visualizations...</p>
        </div>
      </div>
    );
  }

  const chartTypes = [
    { id: 'bar', name: 'Bar Chart', icon: BarChart3, description: 'Compare categories' },
    { id: 'pie', name: 'Pie Chart', icon: PieChart, description: 'Show proportions' },
    { id: 'line', name: 'Line Chart', icon: TrendingUp, description: 'Track trends over time' },
    { id: 'map', name: 'Geographic Map', icon: Map, description: 'Visualize location data' },
  ];

  const recentVisualizations = visualizations.slice(0, 4);

  const handleViewVisualization = async (vizId: string) => {
    await incrementViews(vizId);
    // In a real app, this would navigate to the visualization detail page
    alert('Opening visualization... (This is a demo)');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Data Visualizations</h1>
          <p className="text-xl text-gray-600">Transform your datasets into compelling visual stories</p>
        </div>

        {/* Visualization Type Selector */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="bg-white rounded-xl shadow-lg p-2 inline-flex">
              <button
                onClick={() => setSelectedVisualization('chart')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  selectedVisualization === 'chart'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                Charts
              </button>
              <button
                onClick={() => setSelectedVisualization('map')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  selectedVisualization === 'map'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                Maps
              </button>
              <button
                onClick={() => setSelectedVisualization('dashboard')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  selectedVisualization === 'dashboard'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                Dashboards
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Chart Types Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Chart Types</h3>
              <div className="space-y-3">
                {chartTypes.map((chart) => (
                  <div key={chart.id} className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200 border border-gray-200 hover:border-blue-300">
                    <div className="flex items-center mb-2">
                      <div className="bg-blue-100 p-2 rounded-lg mr-3">
                        <chart.icon className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-900">{chart.name}</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-11">{chart.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium text-sm">
                    Create New Chart
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium text-sm">
                    Import Dataset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Sample Visualization */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Population Distribution by State (Demo)</h3>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Settings className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Sample Chart */}
              <div className="h-80 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-end justify-between p-6">
                <div className="flex items-end space-x-4 h-full w-full">
                  {[
                    { name: 'UP', value: 85, color: 'from-blue-500 to-blue-400' },
                    { name: 'MH', value: 72, color: 'from-green-500 to-green-400' },
                    { name: 'BI', value: 68, color: 'from-purple-500 to-purple-400' },
                    { name: 'WB', value: 64, color: 'from-orange-500 to-orange-400' },
                    { name: 'MP', value: 56, color: 'from-pink-500 to-pink-400' },
                    { name: 'TN', value: 48, color: 'from-indigo-500 to-indigo-400' },
                    { name: 'RJ', value: 42, color: 'from-red-500 to-red-400' },
                    { name: 'KA', value: 38, color: 'from-teal-500 to-teal-400' },
                  ].map((bar, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div
                        className={`bg-gradient-to-t ${bar.color} rounded-t-md w-full transition-all duration-500 hover:scale-105 cursor-pointer`}
                        style={{ height: `${bar.value}%` }}
                      ></div>
                      <span className="text-xs text-gray-600 mt-2">{bar.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-600 text-center">
                Population in Millions (Hover over bars for detailed information)
              </div>
            </div>

            {/* Recent Visualizations */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Visualizations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentVisualizations.map((viz, index) => (
                  <div key={viz.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 text-sm">{viz.name}</h4>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        {viz.type}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {viz.views.toLocaleString()}
                        </span>
                        <span>{new Date(viz.created_at).toLocaleDateString()}</span>
                      </div>
                      <button 
                        onClick={() => handleViewVisualization(viz.id)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Templates */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Visualization Templates</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'Government Dashboard', preview: 'from-blue-500 to-cyan-500', category: 'Dashboard' },
                  { name: 'Economic Indicators', preview: 'from-green-500 to-emerald-500', category: 'Charts' },
                  { name: 'Geographic Analysis', preview: 'from-purple-500 to-pink-500', category: 'Maps' },
                ].map((template, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer">
                    <div className={`h-24 bg-gradient-to-br ${template.preview} rounded-lg mb-3`}></div>
                    <h4 className="font-semibold text-gray-900 mb-1">{template.name}</h4>
                    <span className="text-sm text-gray-600">{template.category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};