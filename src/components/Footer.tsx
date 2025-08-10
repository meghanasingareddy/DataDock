import React from 'react';
import { Database, Mail, Phone, MapPin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const footerLinks = {
    Product: ['Features', 'Pricing', 'API', 'Documentation', 'Integrations'],
    Government: ['Public Datasets', 'Compliance', 'Security', 'Training', 'Support'],
    Resources: ['Blog', 'Case Studies', 'Tutorials', 'Community', 'Help Center'],
    Company: ['About Us', 'Careers', 'Press', 'Partners', 'Contact']
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl">
                <Database className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">DataDock</h3>
                <p className="text-gray-400 text-sm">AI-Optimized Cloud Storage</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering the Viksit Bharat vision through intelligent data management and visualization. 
              Making public data accessible, insightful, and actionable for everyone.
            </p>
            <div className="flex items-center text-sm text-gray-400">
              <MapPin className="h-4 w-4 mr-2" />
              Made in India for Digital India
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="lg:col-span-1">
              <h4 className="font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-blue-400 mr-3" />
              <div>
                <p className="font-medium">Email Support</p>
                <p className="text-gray-400 text-sm">support@datadock.gov.in</p>
              </div>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-green-400 mr-3" />
              <div>
                <p className="font-medium">24/7 Helpline</p>
                <p className="text-gray-400 text-sm">1800-DATA-DOCK</p>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-purple-400 mr-3" />
              <div>
                <p className="font-medium">Headquarters</p>
                <p className="text-gray-400 text-sm">New Delhi, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center text-gray-400 text-sm mb-4 md:mb-0">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 mx-1" />
            <span>for Digital India Initiative</span>
          </div>
          <div className="flex space-x-6 text-gray-400 text-sm">
            <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Cookie Policy</a>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm mt-6">
          © 2024 DataDock. All rights reserved. | A Government of India Initiative
        </div>
      </div>
    </footer>
  );
};