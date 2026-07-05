import { reactive } from "vue"
import { createResource, frappeRequest } from "frappe-ui"

export const session = reactive({
	user: null,
	fullName: null,
	roles: [],
	isLoggedIn: false,
	proInstalled: false,
})

function applyContext(ctx) {
	session.user = ctx.user
	session.fullName = ctx.full_name
	session.roles = ctx.roles || []
	session.proInstalled = !!ctx.pro_installed
	session.isLoggedIn = !!ctx.user && ctx.user !== "Guest"
}

export const contextResource = createResource({
	url: "payroll_os_community.api.session.context",
	onSuccess: applyContext,
})

export async function fetchContext() {
	try {
		const ctx = await contextResource.fetch()
		return ctx
	} catch {
		session.isLoggedIn = false
		return null
	}
}

export async function login(email, password) {
	await frappeRequest({
		url: "/api/method/login",
		method: "POST",
		params: { usr: email, pwd: password },
	})
}

export async function logout() {
	await frappeRequest({ url: "/api/method/logout", method: "POST" })
	session.user = null
	session.isLoggedIn = false
	window.location.href = "/payrollos"
}
