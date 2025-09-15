/** @type {import('tailwindcss').Config} */
export default {
content: [
'./index.html',
'./src/**/*.{ts,tsx}',
],
theme: {
extend: {
colors: {
primary: '#2563EB',
},
fontFamily: {
inter: ['Inter', 'system-ui', 'sans-serif'],
code: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
},
},
},
plugins: [],
}