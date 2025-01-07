import React, { useState, useEffect } from 'react';
import { Download, FileSpreadsheet, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/superbase';
import { useTheme } from '../../context/ThemeContext';

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

  useEffect(() => {
    const checkAvailableFiles = async () => {
      const fileCheckPromises = statements.map(async (statement) => {
        try {
          const { data, error } = await supabase.storage
            .from('financial_documents')
            .list(`financial_statements/${companyId}/${statement.type}`, {
              limit: 10,
              offset: 0,
              sortBy: { column: 'name', order: 'desc' }
            });

          if (error) {
            console.error(`Error checking files for ${statement.type}:`, error);
            return [statement.type, []];
          }

          const csvFiles = data.filter(file => file.name.toLowerCase().endsWith('.csv'));
          return [statement.type, csvFiles];
        } catch (error) {
          console.error(`Unexpected error checking files for ${statement.type}:`, error);
          return [statement.type, []];
        }
      });

      const fileChecks = await Promise.all(fileCheckPromises);
      const availableFilesMap = Object.fromEntries(
        fileChecks.map(([type, files]) => [type, files])
      );
      setAvailableFiles(availableFilesMap);

      const statusMap = Object.fromEntries(
        Object.entries(availableFilesMap).map(([type, files]) => 
          [type, files.length > 0 ? 'available' : 'not_available']
        )
      );
      setFileStatus(statusMap);
    };

    checkAvailableFiles();
  }, [companyId]);

  const handleDownload = async (statementType) => {
    try {
      setDownloading(prev => ({ ...prev, [statementType]: true }));
      
      const files = availableFiles[statementType] || [];
      
      if (files.length === 0) {
        setFileStatus(prev => ({ 
          ...prev, 
          [statementType]: 'not_available' 
        }));
        return;
      }
  
      const mostRecentFile = files[0];
      const filePath = `financial_statements/${companyId}/${statementType}/${mostRecentFile.name}`;
      
      const { data, error } = await supabase.storage
        .from('financial_documents')
        .createSignedUrl(filePath, 3600);
  
      if (error) {
        console.error('Download error:', error);
        return;
      }
      
      const downloadFile = (url) => {
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', '');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
  
      downloadFile(data.signedUrl);
    } catch (error) {
      console.error('Error downloading file:', error);
    } finally {
      setDownloading(prev => ({ ...prev, [statementType]: false }));
    }
  };
  return (
    <div className="w-full p-4 sm:p-6 space-y-6 sm:space-y-8">
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