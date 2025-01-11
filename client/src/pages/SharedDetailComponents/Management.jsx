import { memo } from "react";
import { styles } from "../../Styles/shareDetailStyles";
import { formatters } from "../../Styles/shareDetailUtils";

// Management Tab Component
const ManagementTab = memo(({ companyData, theme }) => (
  <div className="space-y-4 sm:space-y-6 lg:space-y-8">
    {/* Board of Directors */}
    <div className={`${styles.infoCard[theme]} rounded-xl p-3 sm:p-4 lg:p-6`}>
      <h2
        className={`text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 lg:mb-6 ${styles.text.primary[theme]}`}
      >
        Board of Directors
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
        {companyData.board_members.map((member) => (
          <div
            key={member.id}
            className={`${styles.memberCard[theme]} p-2 sm:p-3 lg:p-4 rounded-lg`}
          >
            <p
              className={`${styles.text.primary[theme]} text-sm sm:text-base lg:text-lg font-medium`}
            >
              {member.name}
            </p>
            <p
              className={`${styles.text.secondary[theme]} text-xs sm:text-sm lg:text-base mt-1`}
            >
              {member.position}
            </p>
            <p
              className={`${styles.text.tertiary[theme]} text-xs sm:text-sm mt-1`}
            >
              {member.category}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* Subsidiaries Section */}
    {companyData.company_subsidiaries.length > 0 && (
      <div className={`${styles.infoCard[theme]} rounded-xl p-3 sm:p-4 lg:p-6`}>
        <h2
          className={`text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 lg:mb-6 ${styles.text.primary[theme]}`}
        >
          Subsidiaries & Associates
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
          {companyData.company_subsidiaries.map((subsidiary) => (
            <div
              key={subsidiary.id}
              className={`${styles.memberCard[theme]} p-2 sm:p-3 lg:p-4 rounded-lg`}
            >
              <p
                className={`${styles.text.primary[theme]} text-sm sm:text-base lg:text-lg font-medium`}
              >
                {subsidiary.name}
              </p>
              <p
                className={`${styles.text.secondary[theme]} text-xs sm:text-sm lg:text-base mt-1`}
              >
                {subsidiary.relationship_type}
              </p>
              <p
                className={`${styles.text.tertiary[theme]} text-xs sm:text-sm mt-1`}
              >
                {formatters.formatPercentage(subsidiary.ownership_percentage)}{" "}
                Ownership
              </p>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
));

export default ManagementTab;
