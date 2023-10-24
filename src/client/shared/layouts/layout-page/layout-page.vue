<script setup lang="ts">
import Footer from '~/client/shared/components/footer/footer.vue';
import Header from '~/client/shared/components/header/header.vue';
import {cnLayoutPage} from './layout-page.const';
</script>

<template>
	<div :class="cnLayoutPage()">
		<Header/>
		<slot/>
		<Footer/>
	</div>
</template>

<style lang="scss">
.layout-page {
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: var(--xxl);
	width: 100%;
	padding: 0 20px;
	height: 100%;
	flex: 1;
}
</style>
