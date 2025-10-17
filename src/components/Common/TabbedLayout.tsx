import React, { useState } from 'react';

// utils
import type { TabbedLayoutProps } from '../../lib/types';

const TabbedLayout: React.FC<TabbedLayoutProps> = ({
  tabs,
  defaultTab = tabs[0]?.id,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className='w-full'>
      <div className='border-b border-gray-200 bg-white'>
        <nav className='flex space-x-8 px-6 lg:px-8' aria-label='Tabs'>
          {tabs.map((tab: { id: string; label: string; icon: React.ReactNode; content: React.ReactNode }) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200
                ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <span
                className={`mr-2 transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'text-indigo-500'
                    : 'text-gray-400 group-hover:text-gray-500'
                }`}
              >
                {tab.icon}
              </span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className='bg-gray-50'>
        <div className='px-6 lg:px-8 py-8'>
          {tabs.map((tab: { id: string; label: string; icon: React.ReactNode; content: React.ReactNode }) => (
            <div
              key={tab.id}
              className={`transition-all duration-300 ${
                activeTab === tab.id
                  ? 'opacity-100 translate-y-0 block'
                  : 'opacity-0 translate-y-4 hidden'
              }`}
            >
              {tab.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabbedLayout;
