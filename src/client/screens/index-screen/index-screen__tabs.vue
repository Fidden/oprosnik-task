<script setup lang="ts">
import {IndexScreenVm} from './index-screen.vm';
import {cnIndexScreen, IndexScreenTab} from './index-screen.const';

const vm = useChildVm(IndexScreenVm);
</script>

<template>
	<div :class="cnIndexScreen('tabs')">
		<button
			v-for="tab in IndexScreenTab"
			:class="cnIndexScreen('tabs-button', {active:
				vm.currentTab === tab
			})"
			@click="vm.setTab(tab)"
		>
			{{ tab }}
		</button>
	</div>
</template>

<style lang="scss">
.index-screen__tabs {
	background: var(--muted);
	margin-right: auto;
	padding: 0.25rem;
	border-radius: 0.5rem;

	&-button {
		background: none;
		color: var(--muted-foreground);
		border-radius: 0.25rem;
		padding: 0.25rem 0.75rem;
		font-size: .875rem;
		line-height: 1.25rem;
		text-transform: lowercase;
		cursor: pointer;

		&--active {
			background: var(--background);
			color: var(--foreground)
		}

		&:first-letter {
			text-transform: uppercase;
		}
	}
}
</style>
