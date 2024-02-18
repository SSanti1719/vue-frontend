<script setup>
defineProps({
    value: {
        type: String,
        required: true
    }
})
</script>

<template>
    <td class="whitespace-no-wrap border-b border-gray-150">
        <div class="text-sm leading-5 text-blue-900 m-4">{{ value }}</div>
    </td>
</template>