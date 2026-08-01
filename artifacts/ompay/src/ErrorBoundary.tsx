import React from 'react';

interface State { hasError: boolean; message: string }

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message ?? String(error) };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[OMPAY] Render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          dir="rtl"
          style={{
            minHeight: '100dvh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0b1426',
            padding: '2rem',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: 340 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
            <h2 style={{ color: '#D4A845', fontSize: 20, marginBottom: 12 }}>
              OMPAY — خطأ في التحميل
            </h2>
            <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 20 }}>
              حدث خطأ أثناء تشغيل التطبيق. يرجى تحديث الصفحة.
            </p>
            <pre
              style={{
                background: '#111e35',
                color: '#f87171',
                borderRadius: 8,
                padding: '12px',
                fontSize: 11,
                textAlign: 'left',
                direction: 'ltr',
                overflowX: 'auto',
                marginBottom: 20,
              }}
            >
              {this.state.message}
            </pre>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: '12px 32px',
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              إعادة التحميل
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
