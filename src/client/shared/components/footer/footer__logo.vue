<script setup lang="ts">
import {cnFooter} from './footer.const';
</script>

<template>
	<p :class="cnFooter('logo')">
		<span>📊</span>
		Metrics
	</p>
</template>

<style lang="scss">
.footer__logo {
	display: flex;
	flex-direction: row;
	align-items: center;
	font-size: 24px;
	font-weight: bold;

	span {
		transform: translateY(-1px);
		font-size: 20px;
	}
}
</style>
