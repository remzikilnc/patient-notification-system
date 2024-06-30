/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';
module.exports = {
    content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                body: '#eef1f9',
                /*Theme*/
                primary: '#1a1f8f',
                secondary: '#1f26be',
                tertiary: '#077ac2',
                success: '#5ecc66',
                danger: '#ff4d4f',

                /*Text*/
                passiveText: '#282828',
                default: '#131313',
                activeText: '#070707',
                darkPassiveText: '#9ca3af',

                /*Border*/
                primaryBorder: '#252a98',
                passiveBorder: '#dedede',

            },
        },
    },
    plugins: [forms, function ({addBase, theme}) {
        addBase({
            ':root': {
                '--color-primary': theme('colors.primary'),
                '--color-secondary': theme('colors.secondary'),
                '--color-tertiary': theme('colors.tertiary'),
                '--color-passiveBorder': theme('colors.passiveBorder'),
            },
        });
    }
    ],
};
