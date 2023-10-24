<script setup lang="ts">
import {cnSelect} from './select.const';

defineProps<{
	modelValue: any
}>();

defineEmits<{
	(e: 'update:modelValue', data: 'any'): void;
}>();
</script>

<template>
	<div :class="cnSelect()">
		<select
			:class="cnSelect('item')"
			:value="modelValue"
			@input="$emit('update:modelValue', $event.target.value)"
		>
			<slot/>
		</select>
		<Icon
			:class="cnSelect('icon')"
			name="material-symbols:keyboard-arrow-down"
			size="1.2rem"
		/>
	</div>

</template>

<style lang="scss">
.select {
	border: 1px solid var(--input);
	border-radius: 0.5rem;
	position: relative;

	&__item {
		font-size: .875rem;
		line-height: 1.25rem;
		padding: 0.55rem 1rem 0.5rem 1rem;
		color: var(--foreground);
		background: none;
		border: none;
		outline: none;
		min-width: 100px;
	}

	&__icon {
		position: absolute;
		right: 1rem;
		top: 50%;
		transform: translate(50%, -50%);
	}
}
</style>
