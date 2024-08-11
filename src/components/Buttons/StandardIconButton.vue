<template>
    <button 
        v-ripple
        @click="handleClick"
        class="size-12 rounded-full text-center flex justify-center items-center"
        :class="{
        'text-light-onSurfaceVariant': !toggle, 
        'text-light-primary': toggle,
        'text-light-disabled': props.disabled,
        'hover:bg-light-stateLayer': !props.disabled
        }">
        <Icon class="text-2xl">{{ props.icon }}</Icon>
    </button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Icon from '../Icon.vue';
import "../../../directives/v-ripple"

interface IStandardIconButtonProps {
    icon: string;
    disabled?: boolean;
    toggle?: boolean;
    tooltip?: string
    onClick?: (e: MouseEvent) => void;
}

// tooltip 

const props = defineProps<IStandardIconButtonProps>();
    const toggle = ref(props.toggle) 

const handleClick = (e: MouseEvent) => {
    if (props.disabled) return;
    toggle.value = !toggle.value; 
    if (props.onClick) props.onClick(e)
}
</script>


