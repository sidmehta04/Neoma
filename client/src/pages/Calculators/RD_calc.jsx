import React, { useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { useTheme } from '../../context/ThemeContext';
import { getCalculatorStyles } from './common_css';

const RDCalculator = () => {
  const { theme } = useTheme();
  const styles = getCalculatorStyles(theme);

  const [monthlyDeposit, setMonthlyDeposit] = useState(10000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(3);
  const [compoundFrequency, setCompoundFrequency] = useState('quarterly');

  const calculateRD = () => {
    const P = monthlyDeposit;
    const t = years;
    const n = compoundFrequency === 'quarterly' ? 4 : 12; // compounding frequency
    const r = rate / 100 / n;
    const totalMonths = t * 12;
    
    // RD calculation with quarterly/monthly compounding
    const maturityAmount = P * (Math.pow(1 + r, n * t) - 1) / (1 - Math.pow(1 + r, -1/12));
    const totalInvestment = P * totalMonths;
    const interestEarned = maturityAmount - totalInvestment;
    
    return {
      maturityAmount: Math.round(maturityAmount),
      totalInvestment: Math.round(totalInvestment),
      interestEarned: Math.round(interestEarned)
    };
  };

  const result = calculateRD();
  
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
              <h2 className={styles.title}>Recurring Deposit Calculator</h2>
            </div>

            <div className={styles.inputContainer}>
              {/* Monthly Deposit Input */}
              <div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Monthly Deposit (₹)</label>
                  <input
                    type="number"
                    value={monthlyDeposit}
                    onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
                    className={styles.numberInput}
                  />
                </div>
                <input
                  type="range"
                  min="500"
                  max="100000"
                  value={monthlyDeposit}
                  onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
                  className={styles.rangeInput}
                />
              </div>

              {/* Interest Rate Input */}
              <div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Interest Rate (% p.a.)</label>
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
                  max="15"
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
                  max="15"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className={styles.rangeInput}
                />
              </div>

              {/* Compound Frequency Select */}
              <select
                value={compoundFrequency}
                onChange={(e) => setCompoundFrequency(e.target.value)}
                className={styles.select}
              >
                <option value="quarterly">Compound Quarterly</option>
                <option value="monthly">Compound Monthly</option>
              </select>

              <button className={styles.calculateButton}>
                Calculate →
              </button>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className={styles.rightColumn}>
            <div className={styles.resultContainer}>
              <p className={styles.resultText}>After {years} years, you will have</p>
              <h3 className={styles.resultAmount}>₹ {result.maturityAmount.toLocaleString()}</h3>
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
                setMonthlyDeposit(10000);
                setRate(7);
                setYears(3);
                setCompoundFrequency('quarterly');
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

export default RDCalculator;