import React, { useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { useTheme } from '../../context/ThemeContext';
import { getCalculatorStyles } from './common_css';

const CAGRCalculator = () => {
  const { theme } = useTheme();
  const styles = getCalculatorStyles(theme);

  const [initialValue, setInitialValue] = useState(100000);
  const [finalValue, setFinalValue] = useState(200000);
  const [years, setYears] = useState(5);

  const calculateCAGR = () => {
    const P = initialValue;
    const FV = finalValue;
    const t = years;
    
    const cagr = (Math.pow(FV/P, 1/t) - 1) * 100;
    const totalGrowth = FV - P;
    
    return {
      cagrRate: cagr.toFixed(2),
      totalGrowth: Math.round(totalGrowth),
      finalValue: FV
    };
  };

  const result = calculateCAGR();
  
  const pieData = [
    { name: "Initial Investment", value: initialValue },
    { name: "Value Growth", value: result.totalGrowth }
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
              <h2 className={styles.title}>CAGR Calculator</h2>
            </div>

            <div className={styles.inputContainer}>
              {/* Initial Value Input */}
              <div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Initial Investment (₹)</label>
                  <input
                    type="number"
                    value={initialValue}
                    onChange={(e) => setInitialValue(Number(e.target.value))}
                    className={styles.numberInput}
                  />
                </div>
                <input
                  type="range"
                  min="1000"
                  max="10000000"
                  value={initialValue}
                  onChange={(e) => setInitialValue(Number(e.target.value))}
                  className={styles.rangeInput}
                />
              </div>

              {/* Final Value Input */}
              <div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Final Value (₹)</label>
                  <input
                    type="number"
                    value={finalValue}
                    onChange={(e) => setFinalValue(Number(e.target.value))}
                    className={styles.numberInput}
                  />
                </div>
                <input
                  type="range"
                  min="1000"
                  max="10000000"
                  value={finalValue}
                  onChange={(e) => setFinalValue(Number(e.target.value))}
                  className={styles.rangeInput}
                />
              </div>

              {/* Time Period Input */}
              <div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Time Period (Years)</label>
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
              <p className={styles.resultText}>Your CAGR over {years} years</p>
              <h3 className={styles.resultAmount}>{result.cagrRate}%</h3>
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
                      Initial Investment: ₹{initialValue.toLocaleString()}
                    </span>
                  </li>
                  <li className={styles.legendItem}>
                    <span className={styles.legendDot(false)}></span>
                    <span className={styles.legendText}>
                      Value Growth: ₹{result.totalGrowth.toLocaleString()}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <button 
              onClick={() => {
                setInitialValue(100000);
                setFinalValue(200000);
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

export default CAGRCalculator;