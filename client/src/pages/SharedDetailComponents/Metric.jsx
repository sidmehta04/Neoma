// MetricCard Component
import { memo } from 'react';
import { styles } from "../../Styles/shareDetailStyles";
import { formatters } from "../../Styles/shareDetailUtils";
const MetricCard = memo(({ title, value, prefix = "₹", change, theme }) => (
    <div
      className={`${styles.metricCard[theme]} p-2 sm:p-3 lg:p-4 rounded-lg transition-all duration-300`}
    >
      <p
        className={`${styles.text.secondary[theme]} text-xs sm:text-sm lg:text-base`}
      >
        {title}
      </p>
      <div className="flex items-end justify-between">
        <p
          className={`text-base sm:text-lg lg:text-xl font-bold ${styles.text.primary[theme]}`}
        >
          {title === "Market Cap" ? value : `${prefix}${value}`}
        </p>
        {change !== undefined && (
          <div
            className={`flex items-center ${
              parseFloat(change) >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {parseFloat(change) >= 0 ? (
              <ArrowUpRight size={12} />
            ) : (
              <ArrowDownRight size={12} />
            )}
            <span className="text-xs sm:text-sm font-semibold">
              {formatters.formatPercentage(change)}
            </span>
          </div>
        )}
      </div>
    </div>
  ));

export default MetricCard;