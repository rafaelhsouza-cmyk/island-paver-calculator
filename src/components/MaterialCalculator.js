import React, { useState } from 'react';
import './MaterialCalculator.css';
import { calculateMaterials } from '../utils/calculations';

function MaterialCalculator({ layout, onCalculate }) {
  const [formData, setFormData] = useState({
    length: '',
    width: '',
    paverLength: '12',
    paverWidth: '6',
    roadBaseDepth: '4',
    sandDepth: '1',
  });

  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    
    const { length, width, paverLength, paverWidth, roadBaseDepth, sandDepth } = formData;
    
    if (!length || !width || !paverLength || !paverWidth) {
      alert('Please fill in all required fields');
      return;
    }

    const calculations = calculateMaterials({
      areaLength: parseFloat(length),
      areaWidth: parseFloat(width),
      paverLength: parseFloat(paverLength),
      paverWidth: parseFloat(paverWidth),
      roadBaseDepth: parseFloat(roadBaseDepth),
      sandDepth: parseFloat(sandDepth),
      layout: layout.id
    });

    setResults(calculations);
  };

  const handleNext = () => {
    if (results) {
      onCalculate({ ...results, layout: layout.id });
    }
  };

  return (
    <div className="material-calculator">
      <h2>Step 2: Calculate Materials</h2>
      <p className="subtitle">Enter area dimensions and material specifications</p>

      <form onSubmit={handleCalculate}>
        <div className="form-section">
          <h3>Area Dimensions (in feet)</h3>
          <div className="form-group">
            <label>Length (ft) *</label>
            <input 
              type="number" 
              name="length" 
              value={formData.length}
              onChange={handleChange}
              placeholder="e.g., 20"
              step="0.1"
            />
          </div>
          <div className="form-group">
            <label>Width (ft) *</label>
            <input 
              type="number" 
              name="width" 
              value={formData.width}
              onChange={handleChange}
              placeholder="e.g., 15"
              step="0.1"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Paver Dimensions (in inches)</h3>
          <div className="form-group">
            <label>Paver Length (in) *</label>
            <input 
              type="number" 
              name="paverLength" 
              value={formData.paverLength}
              onChange={handleChange}
              placeholder="e.g., 12"
              step="0.5"
            />
          </div>
          <div className="form-group">
            <label>Paver Width (in) *</label>
            <input 
              type="number" 
              name="paverWidth" 
              value={formData.paverWidth}
              onChange={handleChange}
              placeholder="e.g., 6"
              step="0.5"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Base Preparation Depths (in inches)</h3>
          <div className="form-group">
            <label>Road Base Depth (in)</label>
            <input 
              type="number" 
              name="roadBaseDepth" 
              value={formData.roadBaseDepth}
              onChange={handleChange}
              placeholder="Standard: 4"
              step="0.5"
            />
            <small>Standard: 4 inches</small>
          </div>
          <div className="form-group">
            <label>Sand/Screenings Depth (in)</label>
            <input 
              type="number" 
              name="sandDepth" 
              value={formData.sandDepth}
              onChange={handleChange}
              placeholder="Standard: 1"
              step="0.5"
            />
            <small>Standard: 1 inch</small>
          </div>
        </div>

        <button type="submit" className="calc-btn">Calculate Materials</button>
      </form>

      {results && (
        <div className="results">
          <h3>Calculation Results</h3>
          <div className="results-grid">
            <div className="result-item">
              <label>Total Area</label>
              <value>{results.totalArea.toFixed(2)} sq ft</value>
            </div>
            <div className="result-item">
              <label>Pavers Needed</label>
              <value>{Math.ceil(results.paversNeeded)}</value>
            </div>
            <div className="result-item">
              <label>Road Base (Gravel)</label>
              <value>{results.roadBaseVolume.toFixed(2)} cy</value>
            </div>
            <div className="result-item">
              <label>Sand/Screenings</label>
              <value>{results.sandVolume.toFixed(2)} cy</value>
            </div>
          </div>

          <button onClick={handleNext} className="next-btn">Next: Enter Prices</button>
        </div>
      )}
    </div>
  );
}

export default MaterialCalculator;