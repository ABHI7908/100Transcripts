import React from 'react';
import { Inbox, FileText, Search, AlertCircle } from 'lucide-react';

const EmptyState = ({ type = 'default', message, description, action }) => {
  const configs = {
    default: {
      icon: <Inbox size={48} className="text-slate-300" />,
      message: message || 'No data found',
      description: description || 'There are no items to display at the moment.',
    },
    noResults: {
      icon: <Search size={48} className="text-slate-300" />,
      message: message || 'No results found',
      description: description || 'Try adjusting your search or filter criteria.',
    },
    noDocuments: {
      icon: <FileText size={48} className="text-slate-300" />,
      message: message || 'No documents yet',
      description: description || 'Upload your first document to get started.',
    },
    error: {
      icon: <AlertCircle size={48} className="text-red-300" />,
      message: message || 'Something went wrong',
      description: description || 'An error occurred while loading the data.',
    },
  };

  const config = configs[type] || configs.default;

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="mb-4">{config.icon}</div>
      <h3 className="text-lg font-semibold text-slate-700 mb-2">{config.message}</h3>
      <p className="text-sm text-slate-500 mb-6 max-w-sm">{config.description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;
