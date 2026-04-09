"use client";

import { Activity, Thermometer, Zap, Gauge, AlertTriangle, CheckCircle2 } from "lucide-react";

const machines = [
  { id: "M_001", type: "CNC Mill", status: "Healthy", volt: 170.2, rotate: 1515, pressure: 98.4, vibration: 45.2 },
  { id: "M_002", type: "Lathe", status: "Warning", volt: 185.5, rotate: 1420, pressure: 112.1, vibration: 52.8 },
  { id: "M_003", type: "Compressor", status: "Healthy", volt: 168.9, rotate: 1540, pressure: 95.2, vibration: 42.1 },
  { id: "M_004", type: "Pump", status: "Critical", volt: 210.4, rotate: 1850, pressure: 145.8, vibration: 68.4 },
];

export default function Dashboard() {
  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>Operational Dashboard</h1>
        <p className="text-muted">Real-time monitoring of industrial machine telemetry and health status.</p>
      </div>

      <div className="dashboard-grid">
        {machines.map((m) => (
          <div key={m.id} className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ margin: 0 }}>{m.id}</h3>
                <span className="text-muted" style={{ fontSize: '0.875rem' }}>{m.type}</span>
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                fontSize: '0.75rem',
                fontWeight: '600',
                padding: '0.25rem 0.75rem',
                borderRadius: '1rem',
                backgroundColor: m.status === 'Healthy' ? 'rgba(34, 197, 94, 0.1)' : 
                                m.status === 'Warning' ? 'rgba(234, 179, 8, 0.1)' : 
                                'rgba(239, 68, 68, 0.1)',
                color: m.status === 'Healthy' ? 'var(--status-safe)' : 
                       m.status === 'Warning' ? 'var(--status-warning)' : 
                       'var(--status-danger)',
              }}>
                {m.status === 'Healthy' ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
                {m.status}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted-foreground)', marginBottom: '0.25rem' }}>
                  <Zap size={14} />
                  <span style={{ fontSize: '0.75rem' }}>Voltage</span>
                </div>
                <div style={{ fontWeight: '700' }}>{m.volt} V</div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted-foreground)', marginBottom: '0.25rem' }}>
                  <Activity size={14} />
                  <span style={{ fontSize: '0.75rem' }}>Rotation</span>
                </div>
                <div style={{ fontWeight: '700' }}>{m.rotate} RPM</div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted-foreground)', marginBottom: '0.25rem' }}>
                  <Gauge size={14} />
                  <span style={{ fontSize: '0.75rem' }}>Pressure</span>
                </div>
                <div style={{ fontWeight: '700' }}>{m.pressure} psi</div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted-foreground)', marginBottom: '0.25rem' }}>
                  <Thermometer size={14} />
                  <span style={{ fontSize: '0.75rem' }}>Vibration</span>
                </div>
                <div style={{ fontWeight: '700' }}>{m.vibration} mm/s</div>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ 
                height: '100%', 
                width: m.status === 'Healthy' ? '92%' : m.status === 'Warning' ? '65%' : '28%',
                background: m.status === 'Healthy' ? 'var(--status-safe)' : 
                           m.status === 'Warning' ? 'var(--status-warning)' : 
                           'var(--status-danger)',
                transition: 'width 1s ease-in-out'
              }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>Overall Health Score</span>
              <span style={{ fontSize: '0.7rem', fontWeight: '700' }}>
                {m.status === 'Healthy' ? '92%' : m.status === 'Warning' ? '65%' : '28%'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
