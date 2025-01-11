// About Card Component
// MetricCard Component
import { Info, Building, Users } from "lucide-react";
import { memo } from "react";
import { styles } from "../../Styles/shareDetailStyles";
import { formatters } from "../../Styles/shareDetailUtils";
const COMPANY_INFO_FIELDS = [
  { id: "cin", label: "CIN", className: "break-all" },
  { id: "registered_office", label: "Registered Office" },
  { id: "incorporation_date", label: "Incorporation Date" },
];
const AboutCard = memo(({ companyData, theme }) => (
  <div
    className={`${styles.infoCard[theme]} rounded-xl p-3 sm:p-4 lg:p-6 col-span-1 sm:col-span-2`}
  >
    <h2
      className={`text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 flex items-center ${styles.text.primary[theme]}`}
    >
      <Info
        className={`mr-2 w-4 sm:w-5 lg:w-6 ${theme === "light" ? "text-blue-600" : "text-white"}`}
      />
      About Company
    </h2>
    <div className="space-y-4">
      {/* About Text */}
      <div
        className={`${styles.text.secondary[theme]} text-sm sm:text-base whitespace-pre-line`}
      >
        {companyData.about || "Information not available."}
      </div>

      {/* Company Highlights */}
      {companyData.company_highlights &&
        companyData.company_highlights.length > 0 && (
          <div className="mt-6">
            <h3
              className={`text-sm sm:text-base lg:text-lg font-semibold mb-3 ${styles.text.primary[theme]}`}
            >
              Key Highlights
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {companyData.company_highlights.map((highlight, index) => (
                <div
                  key={highlight.id || index}
                  className={`${styles.memberCard[theme]} p-3 rounded-lg flex items-start gap-3`}
                >
                  <span
                    className={`${styles.text.secondary[theme]} text-sm sm:text-base mt-1`}
                  >
                    •
                  </span>
                  <p
                    className={`${styles.text.secondary[theme]} text-sm sm:text-base flex-1`}
                  >
                    {highlight.highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  </div>
));

// Overview Tab Component
const OverviewTab = memo(({ companyData, theme }) => (
  <div className="space-y-4 sm:space-y-6 lg:space-y-8">
    {/* About Section */}
    <AboutCard companyData={companyData} theme={theme} />

    {/* Company Details Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
      {/* Company Information Card */}
      <div className={`${styles.infoCard[theme]} rounded-xl p-3 sm:p-4 lg:p-6`}>
        <h2
          className={`text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 flex items-center ${styles.text.primary[theme]}`}
        >
          <Building
            className={`mr-2 w-4 sm:w-5 lg:w-6 ${theme === "light" ? "text-blue-600" : "text-white"}`}
          />
          Company Information
        </h2>
        <div className="space-y-3 sm:space-y-4">
          {COMPANY_INFO_FIELDS.map(({ id, label, className = "" }) => (
            <div key={id}>
              <p
                className={`${styles.text.secondary[theme]} text-xs sm:text-sm lg:text-base`}
              >
                {label}
              </p>
              <p
                className={`${styles.text.primary[theme]} text-xs sm:text-sm lg:text-base ${className}`}
              >
                {id === "incorporation_date"
                  ? formatters.formatDate(companyData[id])
                  : companyData[id]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Shareholding Pattern Card */}
      <div className={`${styles.infoCard[theme]} rounded-xl p-3 sm:p-4 lg:p-6`}>
        <h2
          className={`text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 flex items-center ${styles.text.primary[theme]}`}
        >
          <Users
            className={`mr-2 w-4 sm:w-5 lg:w-6 ${theme === "light" ? "text-blue-600" : "text-white"}`}
          />
          Shareholding Pattern
        </h2>
        <div className="space-y-2 sm:space-y-3 lg:space-y-4">
          {companyData.shareholding_pattern.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <span
                className={`${styles.text.secondary[theme]} text-xs sm:text-sm lg:text-base`}
              >
                {item.category}
              </span>
              <span
                className={`${styles.text.secondary[theme]} text-xs sm:text-sm lg:text-base font-medium`}
              >
                {formatters.formatPercentage(item.percentage)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
));

export default OverviewTab;
