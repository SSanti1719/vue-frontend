<script setup>
defineProps({
    title: {
        type: String,
        required: true
    }
})
</script>
<template>
    <th class="px-6 py-3 border-b-2 border-gray-200 text-sm leading-4 text-blue-500 tracking-wider">{{ title }}</th>
</template>