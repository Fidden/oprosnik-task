<script setup lang="ts">
import {cnHeader} from './header.const';
</script>

<template>
	<p :class="cnHeader('logo')">
		<span>📊</span>
		Metrics
	</p>
</template>

<style lang="scss">
.header__logo {
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
