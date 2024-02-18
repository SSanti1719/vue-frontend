<script setup>
defineProps({
    title: {
        type: String,
        required: true
    }
})
</script>
<template>
    <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-150 text-sm leading-5">
        <button
            class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">{{
                title }}</button>
    </td>
</template>