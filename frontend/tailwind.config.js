import frappeUIPreset from "frappe-ui/tailwind"
import colors from "tailwindcss/colors"

/** @type {import('tailwindcss').Config} */
export default {
	presets: [frappeUIPreset],
	content: [
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}",
		"./node_modules/frappe-ui/src/components/**/*.{vue,js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				indigo: colors.indigo,
				violet: colors.violet,
				sky: colors.sky,
				emerald: colors.emerald,
				amber: colors.amber,
				rose: colors.rose,
				green: colors.green,
				red: colors.red,
				blue: colors.blue,
				brand: {
					50: "#eef0ff",
					100: "#e0e3ff",
					200: "#c6ccff",
					300: "#a3a8ff",
					400: "#827dfb",
					500: "#6d5ef4",
					600: "#5b41e6",
					700: "#4d33cb",
					800: "#402ca4",
					900: "#372a82",
					950: "#221a4c",
				},
			},
			fontFamily: {
				sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
			},
			boxShadow: {
				card: "0 1px 2px rgba(16,24,40,.04), 0 1px 3px rgba(16,24,40,.06)",
				premium: "0 10px 30px -12px rgba(67,56,202,.28), 0 4px 12px -6px rgba(16,24,40,.08)",
				glow: "0 0 0 1px rgba(109,94,244,.12), 0 8px 24px -8px rgba(109,94,244,.35)",
			},
			backgroundImage: {
				"brand-gradient": "linear-gradient(135deg,#6d5ef4 0%,#4d33cb 60%,#372a82 100%)",
				"sidebar-gradient": "linear-gradient(180deg,#221a4c 0%,#1a1438 100%)",
			},
			borderRadius: {
				xl: "0.875rem",
				"2xl": "1.125rem",
			},
		},
	},
	plugins: [],
}
