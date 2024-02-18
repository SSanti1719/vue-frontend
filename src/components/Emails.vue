<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import { search } from '../js/search'
import Header from "./Header.vue"
import Footer from "./Footer.vue"
import Input from "./Input.vue"
import ColumnTitle from './ColumnTitle.vue';
import ColumnValue from './ColumnValue.vue';
import ColumnButton from './Button.vue';
import Modal from './Modal.vue';
import Drawer from "./Drawer.vue"

const showModal = ref(false)
const message = ref("")
const loading = ref(true)
const page = ref(0)
const size = ref(10)
const from = ref("")
const to = ref("")
const subject = ref("")
const id = ref("")
const isDrawerOpen = ref(false)
const emails = ref({
    response: {
        Data: []
    }
})

const searchEmails = () => {
    loading.value = true;
    setTimeout(async () => {
        emails.value = await search(page.value, size.value, from.value, to.value, subject.value, id.value)

        loading.value = false;
    }, 500)
}

const toggleDrawer = () => {
    console.log("hola");
    isDrawerOpen.value = !isDrawerOpen.value;
}

const closeDrawer = () => {
    isDrawerOpen.value = false;
}

onMounted(searchEmails)

// function debounce(func, delay) {
//     let timeoutId
//     return (...args) => {
//         clearTimeout(timeoutId)
//         timeoutId = setTimeout(() => {
//             func(...args)
//         }, delay)
//     }
// }

// const searchCriteria = debounce(() => {
//     loading.value = true
//     setTimeout(async () => {
//         await searchEmails()
//     }, 200)
// }, 1000)

const nextPage = async () => {
    page.value++
    await searchEmails()
}

const changeMessage = (messageContent) => {
    var textWithLineBreaks = messageContent.replace(/\\n/g, '\n');
    textWithLineBreaks = textWithLineBreaks.replace(/\"/g, '');

    textWithLineBreaks = textWithLineBreaks.replace(/\\t/g, '  ');

    message.value = textWithLineBreaks
}


const previousPage = async () => {
    page.value--
    await searchEmails()
}

</script>

<template>
    <Header></Header>
    <div class="text-center absolute flex flex-col justify-center inset-y-0 inset-x-0 bg-white bg-white/75 z-10"
        v-if="loading">
        <div role="status">
            <svg aria-hidden="true" class="inline w-16 h-16 text-gray-200 animate-spin dark:text-gray-300 fill-sky-600"
                viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor" />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill" />
            </svg>
        </div>
    </div>
    <div class="">
        <div class="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg ">
            <div class="flex justify-between flex-col md:flex-row">
                <!-- <Input name="From" @input-change="searchCriteria" v-model="from" /> -->
                <Input name="Id" v-model="id" />
                <Input name="From" v-model="from" />
                <Input name="To" v-model="to" />
                <Input name="Subject" v-model="subject" />
                <!-- <button @click="searchEmails"
                    class="rounded-full px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">SEARCH</button> -->
                <button @click="searchEmails"
                    class="rounded-full rounded px-5 py-2 items-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">SEARCH</button>
            </div>
            <div v-if="emails.err" class="text-center text-red-500">
                {{ emails.message }}
            </div>
        </div>
    </div>
    <div
        class="align-middle min-w-full overflow-x-auto overflow-y-auto bg-white shadow-md pt-3 rounded-bl-lg rounded-br-lg ">
        <table class="min-w-full">
            <thead class="bg-gray-100 uppercase ">
                <tr class="text-center">
                    <ColumnTitle title="Id" />
                    <ColumnTitle title="From" />
                    <ColumnTitle title="To" />
                    <ColumnTitle title="Subject" />
                    <ColumnTitle title="Date" />
                    <th class="px-6 py-3 border-b-2 border-gray-200"></th>
                </tr>
            </thead>
            <tbody class="bg-white">
                <tr v-if="!emails.err" v-for="email in emails.response.Data" class="hover:bg-gray-50 border-b">
                    <ColumnValue :value="email.MessageId" />
                    <ColumnValue :value="email.From" />
                    <ColumnValue :value="email.To" />
                    <ColumnValue :value="email.Subject" />
                    <ColumnValue :value="email.Date" />
                    <!-- <ColumnButton title="View message" /> -->
                    <!-- <button id="show-modal" @click="showModal = true">Show Modal</button> -->

                    <td class="whitespace-no-wrap text-right border-b border-gray-150 text-sm leading-5">
                        <!-- <button id="show-modal" @click=" changeMessage(email.Content), showModal = true"
                            class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">View
                            message</button> -->

                        <!-- <button  @click="changeMessage(email.Content), toggleDrawer()" 
                            class="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> -->
                        <button @click="changeMessage(email.Content), toggleDrawer()"
                            class="inline-flex items-center rounded-full px-5 py-2.5 me-2 mb-2 font-medium text-sm border-blue-500 text-blue-700 transition duration-300 hover:bg-blue-100 focus:outline-none">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white fill-blue-600" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M7 9h5m3 0h2M7 12h2m3 0h5M5 5h14c.6 0 1 .4 1 1v9c0 .6-.4 1-1 1h-6.6a1 1 0 0 0-.7.3l-2.9 2.5c-.3.3-.8.1-.8-.3V17c0-.6-.4-1-1-1H5a1 1 0 0 1-1-1V6c0-.6.4-1 1-1Z" />
                            </svg>
                            View</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="sm:flex-1 sm:flex sm:items-center mt-4 work-sans justify-center">
            <div>
                <nav class="relative z-0 inline-flex shadow-sm">
                    <!-- <div>
                        <a @click="previousPage" href="#" :class="[page <= 0 ? 'pointer-events-none' : '']"
                            class="relative inline-flex items-center px-2 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                            aria-label="Previous">
                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clip-rule="evenodd" />
                            </svg><span class="align-middle">Prev</span>
                        </a>
                    </div> -->
                    <div>
                        <a @click="previousPage" href="#" :class="[page <= 0 ? 'pointer-events-none' : '']"
                            class="inline-flex items-center rounded-full px-5 py-2.5 me-2 mb-2 font-medium text-sm border-blue-500 text-blue-700 transition duration-300 hover:bg-blue-100 focus:outline-none"
                            aria-label="Previous">
                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clip-rule="evenodd" />
                            </svg><span class="align-middle">Prev</span>
                        </a>
                    </div>
                    <div class="mx-3 mt-2">
                        Page {{ page }}
                    </div>
                    <div>
                        <a @click="nextPage" href="#"
                            :class="[emails.err || emails.response.Data.length == 0 ? 'pointer-events-none' : '']"
                            class="inline-flex items-center rounded-full px-5 py-2.5 me-2 mb-2 font-medium text-sm border-blue-500 text-blue-700 transition duration-300 hover:bg-blue-100 focus:outline-none"
                            aria-label="Next">
                            <span>Next</span><svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clip-rule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </nav>
            </div>
        </div>
    </div>

    <div>
        <Drawer :is-open="isDrawerOpen" :speed="200" @close="closeDrawer" :message="message">
            <div class="items-center">

                <button @click="toggleDrawer()"
                    class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">

                    Close</button>
            </div>
        </Drawer>
    </div>

    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <Modal :show="showModal" @close="showModal = false" :message="message">
            <template #header>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-blue-500">Message visualization</h3>
            </template>
        </Modal>
    </Teleport>

   <Footer></Footer>
</template>

<style>
#app {
    font-family: Inter var, ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    /* font-family: Avenir, Helvetica, Arial, sans-serif; */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}</style>