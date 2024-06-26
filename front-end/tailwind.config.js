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
                /*Theme*/
                primary: "#1a1f8f",
                secondary: "#1f26be",
                tertiary: "#077ac2",

                /*Text*/
                passiveText: "#282828",
                activeText: "#111111",
                darkPassiveText: "#9ca3af",

                /*Border*/
                primaryBorder: "#252a98",
                passiveBorder: "#dedede",
            }

        },
    },
    plugins: [],
};
