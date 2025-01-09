import React, { useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { useTheme } from '../../context/ThemeContext';
import { getCalculatorStyles } from './common_css';

const FDCalculator = () => {
  const { theme } = useTheme();
  const styles = getCalculatorStyles(theme);
  
  const [investment, setInvestment] = useState(50000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(5);
  const [compoundFrequency, setCompoundFrequency] = useState('yearly');

  const calculateFD = () => {
    const r = rate / 100;
    const t = years;
    const P = investment;
    
    const maturityAmount = P * Math.pow(1 + r, t);
    const interestEarned = maturityAmount - P;
    
    return {
      totalAmount: Math.round(maturityAmount),
      interestEarned: Math.round(interestEarned)
    };
  };

  const result = calculateFD();
  
  const pieData = [
    { name: "Invested Amount", value: investment },
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
              <h2 className={styles.title}>Fixed Deposit Calculator</h2>
            </div>

            <div className={styles.inputContainer}>
              {/* Total Investment Input */}
              <div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Total Investment (₹)</label>
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
                  max="1000000"
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  className={styles.rangeInput}
                />
              </div>

              {/* Interest Rate Input */}
              <div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Rate of Interest (% p.a.)</label>
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
                  max="30"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className={styles.rangeInput}
                />
              </div>

              <select
                value={compoundFrequency}
                onChange={(e) => setCompoundFrequency(e.target.value)}
                className={styles.select}
              >
                <option value="yearly">Compound Yearly</option>
                <option value="half-yearly">Compound Half-Yearly</option>
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
                      Invested Amount: ₹{investment.toLocaleString()}
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
                setInvestment(50000);
                setRate(8);
                setYears(5);
                setCompoundFrequency('yearly');
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

export default FDCalculator;