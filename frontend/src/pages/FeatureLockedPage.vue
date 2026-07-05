<template>
	<FeatureGate :feature="featureKey" />
</template>

<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import FeatureGate from "@/components/FeatureGate.vue"

const route = useRoute()
const featureKey = computed(() => route.params.key || "")
</script>
