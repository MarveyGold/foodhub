// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        surface: '#131313',
        'secondary-container': '#ffbf00',
        'on-surface-variant': '#e4beb8',
        background: '#131313',
        'on-error-container': '#ffdad6',
        'secondary-fixed-dim': '#fbbc00',
        'inverse-surface': '#e4e2e1',
        'on-primary-fixed-variant': '#930000',
        'on-surface': '#e4e2e1',
        'inverse-on-surface': '#303030',
        'outline-variant': '#5b403c',
        'on-secondary-fixed': '#261a00',
        'error-container': '#93000a',
        'on-tertiary-container': '#bab8b8',
        'primary-container': '#990000',
        'on-primary-fixed': '#410000',
        'tertiary-fixed-dim': '#c8c6c5',
        'surface-container-highest': '#353535',
        'surface-bright': '#393939',
        'on-tertiary': '#313030',
        'inverse-primary': '#b82014',
        'tertiary-fixed': '#e5e2e1',
        'surface-tint': '#ffb4a8',
        'surface-container-high': '#2a2a2a',
        'on-secondary-fixed-variant': '#5c4300',
        'tertiary-container': '#4a4949',
        'on-primary': '#690000',
        'surface-container-low': '#1b1c1c',
        'surface-variant': '#353535',
        error: '#ffb4ab',
        'on-secondary-container': '#6d5000',
        secondary: '#ffe2ab',
        'on-background': '#e4e2e1',
        'on-secondary': '#402d00',
        'on-primary-container': '#ffa092',
        'secondary-fixed': '#ffdfa0',
        outline: '#ab8983',
        'on-error': '#690005',
        'surface-dim': '#131313',
        tertiary: '#c8c6c5',
        primary: '#ffb4a8',
        'on-tertiary-fixed-variant': '#474746',
        'surface-container': '#1f2020',
        'primary-fixed-dim': '#ffb4a8',
        'on-tertiary-fixed': '#1c1b1b',
        'surface-container-lowest': '#0e0e0e',
        'primary-fixed': '#ffdad4'
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        lg: '0.25rem',
        xl: '0.5rem',
        full: '0.75rem'
      },
      spacing: {
        margin: '32px',
        lg: '48px',
        xs: '4px',
        gutter: '24px',
        xl: '80px',
        sm: '12px',
        base: '8px',
        md: '24px'
      },
      fontFamily: {
        'headline-md': ['Epilogue'],
        'body-lg': ['Be Vietnam Pro'],
        'label-lg': ['Work Sans'],
        'headline-lg': ['Epilogue'],
        'headline-xl': ['Epilogue'],
        'label-sm': ['Work Sans'],
        'body-md': ['Be Vietnam Pro']
      },
      fontSize: {
        'headline-md': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'label-lg': ['14px', { lineHeight: '1.0', letterSpacing: '0.05em', fontWeight: '600' }],
        'headline-lg': ['32px', { lineHeight: '1.2', fontWeight: '600' }],
        'headline-xl': ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'label-sm': ['12px', { lineHeight: '1.0', fontWeight: '500' }],
        'body-md': ['16px', { lineHeight: '1.6', fontWeight: '400' }]
      }
    }
  },
  plugins: []
};
