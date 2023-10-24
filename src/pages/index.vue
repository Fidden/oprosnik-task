<script setup lang="ts">
import {IndexScreenVm} from '~/client/screens/index-screen/index-screen.vm';
import IndexScreen from '~/client/screens/index-screen/index-screen.vue';

const vm = useVm(IndexScreenVm);
await vm.fetch();
</script>

<template>
	<IndexScreen/>
</template>
