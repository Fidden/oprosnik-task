<script setup lang="ts">
import {cnInput} from './input.const';

withDefaults(defineProps<{
	modelValue: any;
	type?: HTMLInputElement['type'],
	placeholder?: string;
}>(), {
	type: 'text'
});

defineEmits<{
	(e: 'update:modelValue', data: 'any'): void;
}>();

const inputRef = ref<HTMLInputElement>();
</script>

<template>
	<div :class="cnInput()">
		<input
			:class="cnInput('item')"
			:bind="{...$attrs, ...$props}"
			:value="modelValue"
			:placeholder="placeholder"
			:type="type"
			@input="$emit('update:modelValue', $event.target.value)"
			ref="inputRef"
		/>
		<Icon
			:class="cnInput('icon')"
			v-if="$props?.type === 'date'"
			name="material-symbols:calendar-today"
			size="1.1rem"
			@click="inputRef?.showPicker()"
		/>
	</div>

</template>

<style lang="scss">
.input {
	font-size: .875rem;
	line-height: 1.25rem;
	border: 1px solid var(--input);
	border-radius: 0.5rem;
	position: relative;

	&__item {
		padding: 0.5rem 1rem;
		background: none;
		color: var(--foreground);

		&::placeholder {
			color: var(--muted-foreground);
		}
	}

	&__icon {
		position: absolute;
		right: 1rem;
		top: 50%;
		transform: translate(50%, -50%);
		color: var(--muted-foreground);
		z-index: 1;
	}
}
</style>
