import { computed } from "vue"
import { session } from "@/data/session"

/** Community has exactly one gate: is the Pro add-on installed on this bench? */
export function useProInstalled() {
	return computed(() => session.proInstalled)
}

/** Non-reactive helper for use outside setup() */
export function isProInstalled() {
	return session.proInstalled
}
