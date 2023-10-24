<script setup lang="ts">
import {cnGraphInfoCard} from './graph-info-card.const';

defineProps<{
	title: string;
	value: number;
	percent: number;
	percentAdditional: string;
	icon: string;
}>();
</script>

<template>
	<div :class="cnGraphInfoCard()">
		<header :class="cnGraphInfoCard('header')">
			<h3 :class="cnGraphInfoCard('title')">
				{{ title }}
			</h3>
			<Icon
				size="1.5rem"
				:name="icon"
			/>
		</header>
		<p :class="cnGraphInfoCard('value', {
			isUp: percent > 0,
			isDown: percent < 0
		})">
			{{ value }}
		</p>
		<p :class="cnGraphInfoCard('percent')">
			{{ percent }}% {{ percentAdditional }}
		</p>
	</div>
</template>

<style lang="scss">
.graph-info-card {
	border-radius: 0.5rem;
	border: 1px solid var(--input);
	padding: 1.25rem;
	background: var(--background);

	&__header {
		padding-bottom: 0.5rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	&__title {
		letter-spacing: -.025em;
		font-weight: 500;
		font-size: .875rem;
		line-height: 1.25rem;
	}

	&__value {
		font-size: 1.5rem;
		line-height: 2rem;
		font-weight: 700;


		&--isUp {
			color: #adfa1d;

			&::before {
				content: '+';
			}
		}

		&--isDown {
			color: #fa1d1d;
		}
	}

	&__percent {
		font-size: .75rem;
		line-height: 1rem;
		color: var(--muted-foreground);
	}
}
</style>
