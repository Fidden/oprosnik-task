<script setup lang="ts">
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from 'chart.js';
import {Bar} from 'vue-chartjs';
import GraphInfoCard from '~/client/shared/components/graph-info-card/graph-info-card.vue';
import {cnIndexScreen} from './index-screen.const';
import {IndexScreenVm} from './index-screen.vm';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
const vm = useChildVm(IndexScreenVm);
</script>

<template>
	<section
		v-if="vm.data"
		:class="cnIndexScreen('graph')"
	>
		<div :class="cnIndexScreen('graph-body')">
			<Bar
				:data="vm.data"
				:options="{
					responsive: true,
					maintainAspectRatio: false,
					normalized: true,
					width: '100%',
					height: '100%'
				}"
			/>
		</div>
		<aside :class="cnIndexScreen('graph-aside')">
			<GraphInfoCard
				title="NewComers"
				icon="material-symbols:screen-attention"
				v-bind="vm.totalNewcomerIncome"
			/>
			<GraphInfoCard
				title="Users"
				icon="material-symbols:group"
				v-bind="vm.totalUsersIncome"
			/>
		</aside>
	</section>
</template>

<style lang="scss">
.index-screen__graph {
	border: 1px solid var(--input);
	border-radius: 0.5rem;
	padding: 2rem;
	flex: 1;
	max-height: 465px;
	display: flex;
	flex-direction: row;
	gap: 2rem;

	&-body {
		height: inherit;
		flex: 1;
	}

	&-aside {
		width: 30%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
}
</style>
