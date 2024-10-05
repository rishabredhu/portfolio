import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';
import ErrorBoundary from './components/ErrorBoundary';

/**
 * Main entry point for the React application.
 * This file sets up the root component and renders it to the DOM.
 * It includes error handling using ErrorBoundary and fallback UI for critical errors.
 */

// Ensure that the root element exists
const rootElement = document.getElementById('root');

if (rootElement) {
  // Create a root for the React application
  const root = createRoot(rootElement);

  // Render the App component wrapped in StrictMode and ErrorBoundary
  root.render(
    <StrictMode>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
} else {
  console.error('Root element not found');
  document.body.innerHTML = '<div>Critical Error: Root element not found</div>';
}

/**
 * Fallback UI component to display when an error is caught by ErrorBoundary.
 */
function ErrorFallback() {
  return (
    <div role="alert">
      <h1>Oops! Something went wrong.</h1>
      <p>We're sorry for the inconvenience. Please try refreshing the page or contact support if the problem persists.</p>
    </div>
  );
}
