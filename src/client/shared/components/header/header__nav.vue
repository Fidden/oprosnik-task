<script setup lang="ts">
import {cnHeader} from './header.const';
</script>

<template>
	<nav :class="cnHeader('nav')">
		<NuxtLink :class="cnHeader('nav-link')">
			Basic
		</NuxtLink>
		<NuxtLink :class="cnHeader('nav-link')">
			Extended
		</NuxtLink>
	</nav>
</template>

<style lang="scss">
.header__nav {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: row;
	gap: 8px;
	align-items: center;

	&-link {
		opacity: 0.7;

		&:hover {
			opacity: 1;
		}
	}
}
</style>
