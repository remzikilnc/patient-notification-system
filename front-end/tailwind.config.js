/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#1a1f8f",
                secondary: "#06493a",
                passiveText: "#282828",
                darkPassiveText: "#9ca3af",
            }

        },
    },
    plugins: [],
};
