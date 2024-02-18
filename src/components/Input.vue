<script setup>
import { defineEmits } from 'vue'
const text = defineModel()
defineProps({
    name: {
        type: String,
        required: true
    }
})

const emits = defineEmits(['input-change'])

const onInputChange = (event) => {
    //emits('input-change');
}
</script>

<template>
    <div class="rounded-full inline-flex border border-gray-400 md:w-7/12 px-2 mx-2 lg:px-6 h-12 bg-transparent mb-2 md:mb-0">
        <div class="flex flex-wrap items-stretch w-full h-full mb-6 relative ">
            <div class="flex">
                <span
                    class="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                    <svg width="18" height="18" class="w-4 lg:w-auto" viewBox="0 0 18 18" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z"
                            stroke="#455A64" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M16.9993 16.9993L13.1328 13.1328" stroke="#455A64" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </span>
            </div>
            <input type="text"
                class="flex-shrink flex-grow flex-auto tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-blue-900 border-gray-150 text-sm leading-5"
                v-bind:placeholder="name" v-model="text" @change="onInputChange">
        </div>
    </div>
</template>