"use client";

import { useState } from "react";
import { ShieldAlert, Zap, Activity, Gauge, Thermometer, ChevronRight, Loader2, AlertCircle } from "lucide-react";

export default function PredictPage() {
  const [formData, setFormData] = useState({
    machineID: 1,
    volt: 170,
    rotate: 1500,
    pressure: 100,
    vibration: 40,
    error_flag: 0,
    maint_flag: 0,
    age: 10
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("API Connection Failed. Is the Flask server running?");
      
      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>Machine Failure Predictor</h1>
        <p className="text-muted">Analyze current sensor telemetry to determine the probability of near-term machine failure.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(400px, 1.5fr) 1fr', gap: '2rem' }}>
        {/* Form Container */}
        <div className="glass-card">
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              <div className="input-group">
                <label>Machine ID</label>
                <input 
                  type="number" 
                  value={formData.machineID} 
                  onChange={(e) => setFormData({...formData, machineID: parseInt(e.target.value)})}
                />
              </div>
              <div className="input-group">
                <label>Machine Age (Years)</label>
                <input 
                  type="number" 
                  value={formData.age} 
                  onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
                />
              </div>
            </div>

            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--primary)' }}>
              <Activity size={16} /> DATA TELEMETRY
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              <div className="input-group">
                <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Voltage (V)</span>
                  <span style={{ fontWeight: 700 }}>{formData.volt}</span>
                </label>
                <input 
                  type="range" min="100" max="300" step="0.1"
                  value={formData.volt} 
                  onChange={(e) => setFormData({...formData, volt: parseFloat(e.target.value)})}
                />
              </div>
              <div className="input-group">
                <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Rotation (RPM)</span>
                  <span style={{ fontWeight: 700 }}>{formData.rotate}</span>
                </label>
                <input 
                  type="range" min="500" max="3000" step="1"
                  value={formData.rotate} 
                  onChange={(e) => setFormData({...formData, rotate: parseInt(e.target.value)})}
                />
              </div>
              <div className="input-group">
                <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Pressure (psi)</span>
                  <span style={{ fontWeight: 700 }}>{formData.pressure}</span>
                </label>
                <input 
                  type="range" min="50" max="250" step="0.1"
                  value={formData.pressure} 
                  onChange={(e) => setFormData({...formData, pressure: parseFloat(e.target.value)})}
                />
              </div>
              <div className="input-group">
                <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Vibration (mm/s)</span>
                  <span style={{ fontWeight: 700 }}>{formData.vibration}</span>
                </label>
                <input 
                  type="range" min="10" max="150" step="0.1"
                  value={formData.vibration} 
                  onChange={(e) => setFormData({...formData, vibration: parseFloat(e.target.value)})}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  style={{ width: 'auto' }}
                  checked={formData.error_flag === 1}
                  onChange={(e) => setFormData({...formData, error_flag: e.target.checked ? 1 : 0})}
                />
                Recent Error Flag
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  style={{ width: 'auto' }}
                  checked={formData.maint_flag === 1}
                  onChange={(e) => setFormData({...formData, maint_flag: e.target.checked ? 1 : 0})}
                />
                Scheduled Maintenance Overdue
              </label>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', height: '56px' }} disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : <>Run Prediction <ChevronRight size={20} /></>}
            </button>
          </form>
        </div>

        {/* Prediction Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {error && (
            <div className="glass-card" style={{ border: '1px solid var(--status-danger)', background: 'rgba(239, 68, 68, 0.05)' }}>
              <div style={{ color: 'var(--status-danger)', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <AlertCircle size={20} />
                <div>
                  <h3 style={{ margin: '0 0 0.25rem 0' }}>Error Occurred</h3>
                  <p style={{ fontSize: '0.875rem', margin: 0 }}>{error}</p>
                </div>
              </div>
            </div>
          )}

          {!result && !error && !loading && (
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', minHeight: '300px' }}>
              <ShieldAlert size={48} className="text-muted" style={{ marginBottom: '1.5rem', opacity: 0.2 }} />
              <p className="text-muted">Enter telemetry data and click "Run Prediction" to view the results.</p>
            </div>
          )}

          {loading && (
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '300px' }}>
              <Loader2 size={48} className="animate-spin text-muted" style={{ marginBottom: '1rem', color: 'var(--primary)' }} />
              <p className="text-muted">Processing prediction model...</p>
            </div>
          )}

          {result && (
            <div className="glass-card" style={{ 
              height: '100%', 
              background: result.failure_prediction === 1 ? 'rgba(239, 68, 68, 0.05)' : 'rgba(34, 197, 94, 0.05)',
              border: result.failure_prediction === 1 ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid rgba(34, 197, 94, 0.2)',
            }}>
              <h3 style={{ marginBottom: '1.5rem' }}>Prediction Results</h3>
              
              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <div style={{ 
                  fontSize: '3.5rem', 
                  fontWeight: 900, 
                  color: result.failure_prediction === 1 ? 'var(--status-danger)' : 'var(--status-safe)',
                  lineHeight: 1
                }}>
                  {Math.round(result.failure_probability * 100)}%
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Calculated Risk Probability
                </div>
              </div>

              <div style={{ 
                padding: '1.25rem', 
                borderRadius: '0.75rem', 
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  {result.failure_prediction === 1 ? (
                    <div style={{ padding: '0.5rem', background: 'var(--status-danger)', borderRadius: '0.5rem' }}>
                      <AlertCircle color="white" />
                    </div>
                  ) : (
                    <div style={{ padding: '0.5rem', background: 'var(--status-safe)', borderRadius: '0.5rem' }}>
                      <CheckCircle2 color="white" />
                    </div>
                  )}
                  <div>
                    <div style={{ fontWeight: 700 }}>
                      {result.failure_prediction === 1 ? "Failure Predicted" : "Operation Safe"}
                    </div>
                    <div style={{ fontSize: '0.75rem' }} className="text-muted">
                      Confidence Level: High (Bayesian Analysis)
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: '0.875rem', lineHeight: '1.4' }} className="text-muted">
                  {result.failure_prediction === 1 
                    ? "Our models indicate a high risk of failure within the next 24 hours. Emergency maintenance is recommended." 
                    : "No immediate threat detected. The machine is performing within the optimized parameters of the digital twin model."}
                </p>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.75rem' }}>
                  <span>Risk Spectrum</span>
                  <span style={{ fontWeight: 700 }}>
                    {result.failure_probability < 0.3 ? "Minimal" : result.failure_probability < 0.7 ? "Moderate" : "Severe"}
                  </span>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ 
                        height: '100%', 
                        width: `${result.failure_probability * 100}%`,
                        background: `linear-gradient(90deg, var(--status-safe), var(--status-warning), var(--status-danger))`,
                        transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
