<template>
    <div class="relative w-fit">
        <input 
            :type="type"
            :id="inputId"
            :inputEvents
            :value="value"
            @input="(e) => updateValue((e.target as HTMLInputElement).value)" @focus="focused = true"
            @blur="focused = false"
            :disabled="props.disabled"
            class="px-4 h-14 w-72 bg-light-surface border border-light-outline rounded-[4px] transition-all duration-100 !outline-none focus:border-2"
            :class="{
                'border-light-primary caret-light-primary': !props.error && !props.disabled,
                'border-light-error caret-light-error': props.error,
                'bg-light-disabled cursor-not-allowed': props.disabled,
                'pl-[52px]': true || props.LeadingIcon,
                'pr-[52px]': true || props.TrailingIcon,
            }" />

        <div class="absolute w-full h-full inset-0 flex flex-row justify-start items-center">
            <Icon class="ml-3 text-2xl" @click="props.ClickLeadingIcon">school</Icon>

            <label :for="inputId" :class="{
                'text-light-onSurfaceVariant': !focused && !props.value,
                'text-light-primary transform -translate-y-4 scale-75 origin-top-left': focused || props.value,
                'text-light-error': props.error,
                'text-light-disabled': props.disabled
            }" class="transition-all duration-300 text-base font-normal w-full mx-4">
                <span>{{ props.label }}</span>
            </label>

            <Icon class="mr-3 text-2xl" @click="props.ClickTrailingIcon">home</Icon>
        </div>

        <p v-if="props.supportText" class="mt-1 text-sm"
            :class="{ 'text-light-onSurface': !props.error, 'text-light-error': props.error }">
            {{ props.supportText }}
        </p>
    </div>
</template>

<script lang="ts" setup>
import { ulid } from 'ulid';
import { ref, defineProps, defineEmits, InputTypeHTMLAttribute } from 'vue';
import Icon from '../Icon.vue';
import { VueEvents } from '../../../types/html';

interface Props extends VueEvents {
    value: string;
    label: string;


    type?: InputTypeHTMLAttribute;
    supportText?: string;
    disabled?: boolean;
    error?: boolean;
    
    ClickLeadingIcon?: (e: MouseEvent) => {}
    ClickTrailingIcon?: (e: MouseEvent) => {}
    LeadingIcon?: string;
    TrailingIcon?: string;
}

const props = defineProps<Props>();

const  { value, label, type, supportText, disabled, error, ClickLeadingIcon, ClickTrailingIcon, LeadingIcon, TrailingIcon, ...inputEvents} = props; 

const emit = defineEmits<{ (event: 'update:value', value: string): void; }>();

const focused = ref(false);
const inputId = ref(ulid());

const updateValue = (value: string) => {
    emit('update:value', value);
};
</script>

<style scoped>
input:focus+label {
    @apply text-light-primary;
    transform: translateY(-24px) scale(0.75);
}

input:disabled+label {
    @apply text-light-onSurface;
}

input:focus {
    border-bottom-width: 2px;
}
</style>