import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { LayoutDashboard, ShieldAlert, Settings, Factory, Activity } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FactoryGuard | Predictive Maintenance",
  description: "Advanced ML-powered industrial monitoring and failure prediction",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="layout-wrapper" style={{ display: 'flex', minHeight: '100vh' }}>
          {/* Sidebar */}
          <aside style={{
            width: '240px',
            background: 'var(--card)',
            borderRight: '1px solid var(--border)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            position: 'fixed',
            height: '100vh',
            zIndex: 10
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ background: 'var(--primary)', padding: '0.5rem', borderRadius: '0.5rem' }}>
                <Factory size={24} color="white" />
              </div>
              <h2 style={{ fontSize: '1.25rem', margin: 0 }}>FactoryGuard</h2>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link href="/" className="nav-item" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                color: 'var(--muted-foreground)',
                transition: 'all 0.2s',
                textDecoration: 'none'
              }}>
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </Link>
              <Link href="/predict" className="nav-item" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                color: 'var(--muted-foreground)',
                transition: 'all 0.2s',
                textDecoration: 'none'
              }}>
                <ShieldAlert size={20} />
                <span>Risk Prediction</span>
              </Link>
              <Link href="#" className="nav-item" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                color: 'var(--muted-foreground)',
                transition: 'all 0.2s',
                textDecoration: 'none'
              }}>
                <Activity size={20} />
                <span>Analytics</span>
              </Link>
              <Link href="#" className="nav-item" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                color: 'var(--muted-foreground)',
                transition: 'all 0.2s',
                textDecoration: 'none',
                marginTop: 'auto'
              }}>
                <Settings size={20} />
                <span>Settings</span>
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main style={{ marginLeft: '240px', flex: 1, minHeight: '100vh', background: 'var(--background)' }}>
            <header style={{
              height: '64px',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              padding: '0 2rem',
              justifyContent: 'flex-end',
              background: 'rgba(9, 9, 11, 0.5)',
              backdropFilter: 'blur(8px)',
              position: 'sticky',
              top: 0,
              zIndex: 5
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>System Status:</span>
                <span style={{ 
                  fontSize: '0.75rem', 
                  padding: '0.25rem 0.5rem', 
                  background: 'rgba(34, 197, 94, 0.1)', 
                  color: 'var(--status-safe)', 
                  borderRadius: '1rem',
                  fontWeight: '600'
                }}>Operational</span>
              </div>
            </header>
            <div style={{ padding: '2rem' }}>
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
