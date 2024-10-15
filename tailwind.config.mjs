/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			animation:{
				'spin-slow': 'spin 1s linear infinite 1s',
			},
			/*Halloween theme*/
			colors: {
				'orange-50': '#FFFAF0',
				'orange-100': '#FEEBC8',
				'orange-200': '#FBD38D',
				'orange-300': '#F6AD55',
				'orange-400': '#ED8936',
				'orange-500': '#DD6B20',
				'orange-600': '#C05621',
				'orange-700': '#9C4221',
				'orange-800': '#7B341E',
				'orange-900': '#652B19',
				'black-500': '#2f3436',
				'black-600': '#272a2b',
			},
		},
	},
	plugins: [
    require('@tailwindcss/typography')
  ],
}
