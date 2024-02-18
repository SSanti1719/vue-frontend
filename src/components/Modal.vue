<script setup>
import { defineProps, computed } from 'vue'
defineProps({
    show: {
        type: Boolean,
        required: false
    },
    message:{
        type: String,
        required:false
    }
})
</script>

<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask w-full h-full flex top-0 left-0">
            <div class="modal-container">
                <div class="modal-header flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <slot name="header">default header</slot>
                </div>

                <div class="modal-body">
                    <!-- <div class="overflow-y-auto h-80 test" v-text="message"></div> -->
                    <div class="overflow-y-auto h-80 test">{{ message }}</div>
                </div>

                <div class="modal-footer flex justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <slot name="footer">
                        <button class="modal-default-button focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" @click="$emit('close')">Close</button>
                    </slot>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style>
.modal-mask {
    position: fixed;
    z-index: 9998;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s ease;
}

.modal-container {
    width: 600px;
    margin: auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.test{
    white-space: pre-line;
}
.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>