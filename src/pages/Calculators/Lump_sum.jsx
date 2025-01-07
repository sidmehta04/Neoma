import React, { useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { useTheme } from '../../context/ThemeContext';
import { getCalculatorStyles } from './common_css';

const LumpSumCalculator = () => {
  const { theme } = useTheme();
  const styles = getCalculatorStyles(theme);

  const [investment, setInvestment] = useState(100000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(5);

  const calculateLumpSum = () => {
    const P = investment;
    const r = rate / 100;
    const t = years;
    
    const amount = P * Math.pow(1 + r, t);
    const interestEarned = amount - P;
    
    return {
      totalAmount: Math.round(amount),
      interestEarned: Math.round(interestEarned)
    };
  };

  const result = calculateLumpSum();
  
  const pieData = [
    { name: "Principal Amount", value: investment },
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
              <h2 className={styles.title}>Lump Sum Calculator</h2>
            </div>

            <div className={styles.inputContainer}>
              {/* Investment Amount Input */}
              <div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>One-time Investment (₹)</label>
                  <input
                    type="number"
                    value={investment}
                    onChange={(e) => setInvestment(Number(e.target.value))}
                    className={styles.numberInput}
                  />
                </div>
                <input
                  type="range"
                  min="1000"
                  max="10000000"
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
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
                      Principal Amount: ₹{investment.toLocaleString()}
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
                setInvestment(100000);
                setRate(12);
                setYears(5);
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

export default LumpSumCalculator;