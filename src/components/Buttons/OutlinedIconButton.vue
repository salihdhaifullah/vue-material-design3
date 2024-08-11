<template>
    <button v-ripple @click="handleClick"
        class="size-10 rounded-full text-center flex justify-center items-center m-1 border"
        :class="{ 'border-light-outline text-light-onSurfaceVariant': !toggle, 'text-light-inverseOnSurface bg-light-inverseSurface': toggle }">
        <Icon class="text-2xl">{{ props.icon }}</Icon>
    </button>
</template>

<!-- NEED WORK -->
<script lang="ts" setup>
import { ref } from 'vue';
import Icon from '../Icon.vue';

interface IconButtonProps {
    icon: string;
    disabled?: boolean;
    toggle?: boolean;
    tooltip?: string
    onClick?: (e: MouseEvent) => void;
}

// tooltip 

const props = defineProps<IconButtonProps>();
const toggle = ref(props.toggle)

const handleClick = (e: MouseEvent) => {
    if (props.disabled) return;
    toggle.value = !toggle.value;
    if (props.onClick) props.onClick(e)
}
</script>



<style scoped>
    button {
        width: 40px;
        height: 40px;

        border-radius: 9999px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 4px;
        border: solid 1px ;
    }
</style>