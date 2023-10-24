<script setup lang="ts">
import {cnFooter} from './footer.const';
import FooterLogo from './footer__logo.vue';
import FooterRights from './footer__rights.vue';
</script>

<template>
	<footer :class="cnFooter()">
		<FooterLogo/>
		<FooterRights/>
	</footer>
</template>

<style lang="scss">
.footer {
	display: flex;
	flex-direction: row;
	align-items: center;
	border-top: 1px solid var(--border);
	padding: 0.75rem 0;
	width: 100%;
	justify-content: space-between;
}
</style>
