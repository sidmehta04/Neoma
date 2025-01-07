import React, { useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { useTheme } from '../../context/ThemeContext';
import { getCalculatorStyles } from './common_css';

const SIPCalculator = () => {
  const { theme } = useTheme();
  const styles = getCalculatorStyles(theme);

  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const calculateSIP = () => {
    const P = monthlyInvestment;
    const r = rate / 100 / 12;
    const n = years * 12;
    
    const totalInvestment = P * n;
    const futureValue = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const interestEarned = futureValue - totalInvestment;
    
    return {
      totalAmount: Math.round(futureValue),
      totalInvestment: Math.round(totalInvestment),
      interestEarned: Math.round(interestEarned)
    };
  };

  const result = calculateSIP();
  
  const pieData = [
    { name: "Total Investment", value: result.totalInvestment },
    { name: "Interest Earned", value: result.interestEarned }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.gridContainer}>
          {/* Left Column - Inputs */}
          <div className={styles.leftColumn}>
            <div className={styles.headerContainer}>
              <div className={styles.currencyIcon}>
                <span className={styles.currencyText}>₹</span>
              </div>
              <h2 className={styles.title}>SIP Calculator</h2>
            </div>

            <div className={styles.inputContainer}>
              {/* Monthly Investment Input */}
              <div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Monthly Investment (₹)</label>
                  <input
                    type="number"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                    className={styles.numberInput}
                  />
                </div>
                <input
                  type="range"
                  min="500"
                  max="100000"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  className={styles.rangeInput}
                />
              </div>

              {/* Expected Return Rate Input */}
              <div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Expected Return Rate (% p.a.)</label>
                  <input
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className={styles.numberInput}
                  />
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className={styles.rangeInput}
                />
              </div>

              {/* Time Period Input */}
              <div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Investment Period (Years)</label>
                  <input
                    type="number"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className={styles.numberInput}
                  />
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className={styles.rangeInput}
                />
              </div>

              <button className={styles.calculateButton}>
                Calculate →
              </button>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className={styles.rightColumn}>
            <div className={styles.resultContainer}>
              <p className={styles.resultText}>After {years} years, you will have</p>
              <h3 className={styles.resultAmount}>₹ {result.totalAmount.toLocaleString()}</h3>
            </div>

            <div className={styles.chartContainer}>
              <PieChart width={300} height={300}>
                <Pie
                  data={pieData}
                  cx={150}
                  cy={150}
                  innerRadius={100}
                  outerRadius={140}
                  paddingAngle={0}
                  dataKey="value"
                >
                  <Cell fill={styles.chartColors.primary} />
                  <Cell fill={styles.chartColors.secondary} />
                </Pie>
              </PieChart>

              <div className={styles.legendContainer}>
                <ul className={styles.legendList}>
                  <li className={styles.legendItem}>
                    <span className={styles.legendDot(true)}></span>
                    <span className={styles.legendText}>
                      Total Investment: ₹{result.totalInvestment.toLocaleString()}
                    </span>
                  </li>
                  <li className={styles.legendItem}>
                    <span className={styles.legendDot(false)}></span>
                    <span className={styles.legendText}>
                      Interest Earned: ₹{result.interestEarned.toLocaleString()}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <button 
              onClick={() => {
                setMonthlyInvestment(5000);
                setRate(12);
                setYears(10);
              }}
              className={styles.resetButton}
            >
              RESET CALCULATOR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SIPCalculator;