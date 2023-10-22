<script setup lang="ts">
import {cnIndexScreen} from './index-screen.const';
</script>

<template>
	<main :class="cnIndexScreen()">
		Hello index screen
		<UiButton class="inline-block accent-red-200">
			Hui
		</UiButton>
	</main>
</template>

<style lang="scss">

</style>
