// utils/shareDetailUtils.js

export const formatters = {
    displayMarketCap: (value) => {
      if (value === null || value === undefined || value === "N/A") return "N/A";
      return `${value}cr`;
    },
  
    formatPercentage: (value) => {
      if (!value && value !== 0) return "N/A";
      return `${parseFloat(value).toFixed(2)}%`;
    },
  
    formatNumber: (num) => {
      if (!num && num !== 0) return "N/A";
      return new Intl.NumberFormat("en-IN").format(num);
    },
  
    formatDate: (date) => {
      if (!date) return "N/A";
      return new Date(date).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  };