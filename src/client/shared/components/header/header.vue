<script setup lang="ts">
import {cnHeader} from './header.const';
import HeaderLogo from './header__logo.vue';
</script>

<template>
	<header :class="cnHeader()">
		<HeaderLogo/>
	</header>
</template>

<style lang="scss">
.header {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	position: relative;
 	padding: 20px 0;
	width: 100%;
}
</style>
