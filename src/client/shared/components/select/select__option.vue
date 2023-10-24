<script setup lang="ts">
import {cnSelect} from './select.const';
</script>

<template>
	<option
		:class="cnSelect('option')"
		v-bind="$attrs">
		<slot/>
	</option>
</template>

<style lang="scss">
.select__option {
	background: var(--background);
	color: var(--foreground)
}
</style>
