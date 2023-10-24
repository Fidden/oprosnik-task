<script setup lang="ts">
import Input from '~/client/shared/components/input/input.vue';
import Select from '~/client/shared/components/select/select.vue';
import SelectOption from '~/client/shared/components/select/select__option.vue';
import {cnIndexScreen, GroupBy} from './index-screen.const';
import {IndexScreenVm} from './index-screen.vm';

const vm = useChildVm(IndexScreenVm);
</script>

<template>
	<div :class="cnIndexScreen('filters')">
		<Input
			v-model="vm.dateStart"
			:value="vm.dateStart"
			type="date"
			placeholder="Date start"
		/>
		<Input
			v-model="vm.dateEnd"
			:value="vm.dateEnd"
			type="date"
			placeholder="Date end"
		/>
		<Select v-model="vm.groupBy">
			<SelectOption
				v-for="item in GroupBy"
				:key="item"
				:value="item"
			>
				{{ item }}
			</SelectOption>
		</Select>
	</div>
</template>

<style lang="scss">
.index-screen__filters {
	display: flex;
	flex-direction: row;
	gap: 8px;
}
</style>
