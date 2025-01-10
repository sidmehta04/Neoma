import React, { useState, useEffect } from 'react';
import { Download, FileSpreadsheet, AlertCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL|| import.meta.env.VITE_API_URL2 || 'http://localhost:5001';

const statements = [
  {
    type: 'balance_sheet',
    title: 'Balance Sheet',
    description: 'Download detailed balance sheet data'
  },
  {
    type: 'income_statement',
    title: 'Income Statement',
    description: 'Download detailed profit and loss data'
  },
  {
    type: 'cash_flow',
    title: 'Cash Flow Statement',
    description: 'Download detailed cash flow data'
  },
  {
    type: 'ratios',
    title: 'Financial Ratios',
    description: 'Download key financial ratios'
  }
];

const styles = {
  card: {
    light: "bg-blue-50/50 border border-blue-100 hover:bg-blue-50/80",
    dark: "bg-gray-800/50"
  },
  title: {
    light: "text-gray-900",
    dark: "text-white"
  },
  description: {
    light: "text-blue-900/70",
    dark: "text-gray-400"
  },
  icon: {
    light: "text-blue-600",
    dark: "text-white"
  },
  alert: {
    light: "text-amber-600",
    dark: "text-yellow-400"
  },
  button: {
    enabled: {
      light: "bg-blue-500 hover:bg-blue-600 text-white",
      dark: "bg-blue-500 hover:bg-blue-600 text-white"
    },
    disabled: {
      light: "bg-gray-300 text-gray-500",
      dark: "bg-gray-500 text-gray-300"
    }
  }
};

const FinancialsTab = ({ companyId }) => {
  const { theme } = useTheme();
  const [downloading, setDownloading] = useState({});
  const [fileStatus, setFileStatus] = useState({});
  const [availableFiles, setAvailableFiles] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAvailableFiles = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/financial-documents/${companyId}`,
          { 
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        setAvailableFiles(response.data);
        const statusMap = Object.fromEntries(
          Object.entries(response.data).map(([type, files]) => 
            [type, files.length > 0 ? 'available' : 'not_available']
          )
        );
        setFileStatus(statusMap);
        setError(null);
      } catch (err) {
        console.error('Error checking available files:', err);
        const errorStatus = Object.fromEntries(
          statements.map(({ type }) => [type, 'not_available'])
        );
        setFileStatus(errorStatus);
        setError('Failed to load file information');
      }
    };

    if (companyId) {
      checkAvailableFiles();
    }
  }, [companyId]);

  const handleDownload = async (statementType) => {
    try {
      setDownloading(prev => ({ ...prev, [statementType]: true }));
      
      if (fileStatus[statementType] !== 'available') {
        return;
      }

      const response = await axios.get(
        `${API_URL}/api/financial-documents/${companyId}/${statementType}/download`,
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.data.signedUrl) {
        throw new Error('No download URL received');
      }

      const downloadFile = (url) => {
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', '');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      downloadFile(response.data.signedUrl);
      setError(null);
    } catch (err) {
      console.error('Error downloading file:', err);
      setFileStatus(prev => ({ 
        ...prev, 
        [statementType]: 'not_available' 
      }));
      setError('Failed to download file');
    } finally {
      setDownloading(prev => ({ ...prev, [statementType]: false }));
    }
  };

  return (
    <div className="w-full p-4 sm:p-6 space-y-6 sm:space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
        {statements.map(({ type, title, description }) => (
          <div 
            key={type} 
            className={`${styles.card[theme]} rounded-xl p-4 sm:p-6 relative transition-all duration-300 backdrop-blur-sm flex flex-col`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3 sm:gap-4">
              <h3 className={`text-base sm:text-lg font-bold ${styles.title[theme]} flex items-center transition-colors duration-300`}>
                <FileSpreadsheet className={`mr-2 h-5 w-5 sm:h-6 sm:w-6 ${styles.icon[theme]}`} />
                {title}
              </h3>
              <button
                onClick={() => handleDownload(type)}
                disabled={downloading[type] || fileStatus[type] !== 'available'}
                className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 text-sm sm:text-base
                  ${downloading[type] || fileStatus[type] !== 'available'
                    ? styles.button.disabled[theme]
                    : styles.button.enabled[theme]
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Download className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>
                  {downloading[type] 
                    ? 'Downloading...' 
                    : fileStatus[type] !== 'available' 
                    ? 'No File' 
                    : 'Download'}
                </span>
              </button>
            </div>
            <p className={`${styles.description[theme]} text-sm sm:text-base mb-8 transition-colors duration-300`}>
              {description}
            </p>
            
            {fileStatus[type] === 'not_available' && (
              <div className={`absolute bottom-3 left-4 sm:left-6 flex items-center ${styles.alert[theme]} text-xs sm:text-sm transition-colors duration-300`}>
                <AlertCircle className="h-4 w-4 mr-2" />
                <span>File not available yet</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialsTab;