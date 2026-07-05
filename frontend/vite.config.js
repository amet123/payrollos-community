import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import frappeui from "frappe-ui/vite"
import path from "path"
import fs from "fs"

// PayrollOS Community SPA. The frappeui() plugin owns production base/outDir
// and copies the entry HTML to the app's www/ folder (deep-link entry point).
export default defineConfig({
	server: {
		port: 8082,
		proxy: getProxyOptions(),
		allowedHosts: true,
	},
	plugins: [
		vue(),
		frappeui({
			frontendRoute: "/payrollos",
			buildConfig: {
				baseUrl: "/assets/payroll_os_community/frontend/",
				outDir: path.resolve(__dirname, "../payroll_os_community/public/frontend"),
				indexHtmlPath: path.resolve(__dirname, "../payroll_os_community/www/payrollos_ce.html"),
			},
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
	optimizeDeps: {
		include: ["frappe-ui > feather-icons", "tailwind.config.js"],
	},
})

// Dev-only: proxy desk/api/asset calls to the local Frappe webserver.
function getProxyOptions() {
	const config = getCommonSiteConfig()
	const port = config ? config.webserver_port : 8000
	return {
		"^/(app|login|api|assets|files|private)": {
			target: `http://127.0.0.1:${port}`,
			ws: true,
			router: (req) => `http://${req.headers.host.split(":")[0]}:${port}`,
		},
	}
}

function getCommonSiteConfig() {
	let dir = path.resolve(".")
	while (dir !== "/") {
		if (fs.existsSync(path.join(dir, "sites")) && fs.existsSync(path.join(dir, "apps"))) {
			const p = path.join(dir, "sites", "common_site_config.json")
			return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p)) : null
		}
		dir = path.resolve(dir, "..")
	}
	return null
}
