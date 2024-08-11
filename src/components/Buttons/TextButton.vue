<template>
    <button 
        v-ripple
        @click="handleClick"
        class="flex h-10 px-3 gap-2 text-center justify-center items-center rounded-full text-sm"
        :class="{ 'pr-4': icon, 'text-light-disabled': disabled, 'text-light-primary hover:bg-light-stateLayer': !disabled }">
        {{ label }}
        <Icon v-if="icon" class="text-lg">{{ icon }}</Icon>
    </button>
</template>

<!-- DONE -->
<script setup lang="ts">
import Icon from '../Icon.vue';


interface ITextButtonProps {
    label: string;
    icon?: string;
    disabled?: boolean;
    onClick?: (e: MouseEvent) => void;
}

const handleClick = (e: MouseEvent) => {
    if (props.disabled) return;

    if (props.onClick) props.onClick(e);
} 

const props = defineProps<ITextButtonProps>()
const { label, icon, disabled } = props;
</script>