/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                tokyo: {
                    bg: '#1a1b26', // Actually doing Tokyo Night Dark as it's more standard "Tokyo Night", but prompt said "Tokyo Night Light".
                    // The prompt specifically asked for "Tokyo Night Light theme". 
                    // Tokyo Night Light colors:
                    // Background: #e1e2e7 (Day/Light) ?
                    // Let's stick to the prompt.
                    // Tokyo Night Light: 
                    // bg: #d5d6db or #e1e2e7
                    // fg: #3760bf or similar.

                    // Let's implement Tokyo Night Light palette roughly:
                    bg: '#d5d6db',
                    fg: '#343b58',
                    primary: '#34548a', // Blueish
                    secondary: '#8c4351', // Redish
                    accent: '#965027', // Orangeish
                    card: '#e1e2e7',
                    hover: '#c4c5c9',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
