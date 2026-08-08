export default function AppFallback() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#000',
      color: 'rgba(255,255,255,0.3)',
      fontFamily: 'system-ui, sans-serif',
      fontSize: '0.875rem'
    }}>
      Loading...
    </div>
  );
}
