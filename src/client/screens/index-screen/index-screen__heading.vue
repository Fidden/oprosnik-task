<script setup lang="ts">
import {cnIndexScreen} from './index-screen.const';
import IndexScreenFilters from './index-screen__filters.vue';
</script>

<template>
	<div :class="cnIndexScreen('heading')">
		<h2 :class="cnIndexScreen('heading-title')">
			Dashboard
		</h2>
		<IndexScreenFilters/>
	</div>
</template>

<style lang="scss">
.index-screen__heading {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}
</style>
