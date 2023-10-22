<script setup lang="ts">
import {cnLayoutPage} from './layout-page.const';
</script>

<template>
	<div :class="cnLayoutPage()">
		<slot/>
	</div>
</template>

<style lang="scss">

</style>
