import React from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', text }) => {
  const sizeMap = {
    sm: 16,
    md: 24,
    lg: 32
  }

  const spinnerSize = sizeMap[size]

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    spinner: {
      width: `${spinnerSize}px`,
      height: `${spinnerSize}px`,
      animation: 'spin 1s linear infinite'
    },
    text: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#6b7280',
      animation: 'pulse 2s infinite'
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.spinner}>
        <svg
          style={{ width: '100%', height: '100%' }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            style={{ opacity: 0.25 }}
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            style={{ opacity: 0.75 }}
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
      {text && (
        <span style={styles.text}>
          {text}
        </span>
      )}
    </div>
  )
}

export default LoadingSpinner 