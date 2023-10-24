<script setup lang="ts">
import {cnFooter} from './footer.const';
</script>

<template>
	<p :class="cnFooter('rights')">
		© Arora Russia, all rights reserved.
	</p>
</template>

<style lang="scss">
.footer__rights {
	color: var(--muted-foreground);
	font-size: 14px;
}
</style>
