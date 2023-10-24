<script setup lang="ts">
import {cnIndexScreen} from './index-screen.const';
import IndexScreenGraph from './index-screen__graph.vue';
import IndexScreenHeading from './index-screen__heading.vue';
import IndexScreenTabs from './index-screen__tabs.vue';
</script>

<template>
	<main :class="cnIndexScreen()">
		<IndexScreenHeading/>
		<IndexScreenTabs/>
		<ClientOnly>
			<IndexScreenGraph/>
		</ClientOnly>
	</main>
</template>

<style lang="scss">
.index-screen {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 16px;
	height: 100%;
	flex: 1;
}
</style>
