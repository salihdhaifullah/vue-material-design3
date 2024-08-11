<script setup lang="ts">
import { VueSpan } from '../../types/html';
const props = defineProps<VueSpan>()
</script>

<template>
    <span class="material-symbols-outlined" :class="props.class" v-bind="props">
        <slot></slot>
    </span>
</template>


<style scoped>
span {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}
</style>