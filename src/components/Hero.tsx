import React from 'react';
import { ArrowRight, Brain, Search, BarChart3, Shield, Zap, Users } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Organization',
      description: 'Automatic data cleaning, tagging, and categorization using advanced AI'
    },
    {
      icon: Search,
      title: 'Semantic Search',
      description: 'Find data using natural language queries - ask questions, get answers'
    },
    {
      icon: BarChart3,
      title: 'Instant Visualizations',
      description: 'Generate charts, maps, and dashboards automatically from your data'
    },
    {
      icon: Shield,
      title: 'Secure & Compliant',
      description: 'Enterprise-grade security with government compliance standards'
    },
    {
      icon: Zap,
      title: 'Smart Optimization',
      description: 'Intelligent storage optimization for faster retrieval and cost efficiency'
    },
    {
      icon: Users,
      title: 'Collaborative Platform',
      description: 'Enable collaboration between government bodies, researchers, and citizens'
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-500/20 text-orange-200 text-sm font-medium mb-8">
              <span className="mr-2">🇮🇳</span>
              Supporting Viksit Bharat Vision
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight">
              AI-Optimized Cloud Storage
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">
                for Public Data
              </span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform how government bodies, researchers, and citizens access, analyze, and visualize public datasets. 
              Upload any format, get AI-powered insights instantly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={onGetStarted}
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              
              <button className="border-2 border-white/30 hover:border-white/50 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white/10">
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-orange-400 mb-2">10,000+</div>
                <div className="text-blue-200">Datasets Processed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">99.9%</div>
                <div className="text-blue-200">Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">500+</div>
                <div className="text-blue-200">Organizations</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-400 mb-2">24/7</div>
                <div className="text-blue-200">AI Processing</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Public Data Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built specifically for government bodies, researchers, and citizens to make public data accessible, 
              insightful, and actionable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100"
              >
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};