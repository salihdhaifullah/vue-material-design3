<template>
    <Modal :is-open="context.isOpen" :handle-close="HandleClose">
        <div
            class="flex flex-col w-fit p-8 bg-light-surfaceContainerHigh select-none gap-6 text-start rounded-[30px] shadow-md-elevated h-fit">
            <h1 class="text-light-onSurfaceVariant text-xl">Enter time</h1>
            <div class="flex w-full justify-center items-center flex-col gap-16">
                <NumberClock />
                <Clock v-if="context.isClock" />
            </div>

            <div class="flex flex-row justify-between mt-4">
                <div class="flex justify-center items-center">
                    <StandardIconButton @click="() => context.setIsClock(!context.isClock)"
                        :icon="context.isClock ? 'keyboard' : 'schedule'" />
                </div>

                <div class="flex flex-row justify-center items-center gap-4">
                    <TextButton :disabled="true" label="Cancel" @click="HandleClose" />
                    <TextButton label="Ok" @click="HandleSetInput" />
                </div>
            </div>
        </div>
    </Modal>

    <OutlinedTextField @click="() => context.isOpen = true" :value="props.value" :label="props.label"  />
</template>

<script lang="ts" setup>
import Modal from '../Modal.vue';
import Clock from './Clock.vue';
import NumberClock from './NumberClock.vue';
import context from './state';
import TextButton from '../Buttons/TextButton.vue';
import OutlinedTextField from '../TextFiled/OutlinedTextField.vue';
import StandardIconButton from '../Buttons/StandardIconButton.vue';

interface ITimePickerProps {
    label: string;
    required?: boolean;
    value: string;
}

const props = defineProps<ITimePickerProps>()
const emit = defineEmits<{ change: [string] }>()

const HandleChange = (s: string) => emit("change", s);
const HandleClose = () => context.reset();
const HandleSetInput = () => {
    HandleChange(formatTime())
    HandleClose();
}

const formatTime = () => {
    let hours = context.hours;
    if (context.period === 'PM' && hours !== 12) {
        hours += 12;
    } else if (context.period === 'AM' && hours === 12) {
        hours = 0;
    }

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(context.minutes).padStart(2, '0')

    return `${formattedHours}:${formattedMinutes}`;
}
</script>
