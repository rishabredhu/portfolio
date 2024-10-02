// theme.ts
export const lightTheme = {
    colors: {
      background: '#ffffff',
      text: '#000000',
      primary: '#007BFF',
      secondary: '#6c757d',
      accent: '#f39c12',
    },
    fonts: {
      main: "'Helvetica Neue', Arial, sans-serif",
    },
    spacing: {
      small: '8px',
      medium: '16px',
      large: '24px',
    },
  };
  
  export const darkTheme = {
    colors: {
      background: '#181818',
      text: '#ffffff',
      primary: '#1A73E8',
      secondary: '#6c757d',
      accent: '#f39c12',
    },
    fonts: {
      main: "'Helvetica Neue', Arial, sans-serif",
    },
    spacing: {
      small: '8px',
      medium: '16px',
      large: '24px',
    },
  };
  
  // You can also define additional shared styles like border-radius, breakpoints, etc.
  export type Theme = typeof lightTheme;
  