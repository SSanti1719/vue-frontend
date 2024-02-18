<script setup>
import { removeTokenFromLocalStorage } from '@/js/sessionStorage';
import router from '@/router';

const logout = () => {
    removeTokenFromLocalStorage();
    router.replace('/');
}
</script>
<template>
    <header class="bg-white border shadow">
        <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div class="flex lg:flex-1">
                <a href="#" class="-m-1.5 p-1.5">
                    <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                </a>
            </div>
            <div class="hidden lg:flex lg:gap-x-12">
                <a href="./" class="text-sm font-semibold leading-6 text-gray-900">Emails</a>
                <a href="./" class="text-sm font-semibold leading-6 text-gray-900">Users</a>
            </div>

            
            <div class="hidden lg:flex lg:flex-1 lg:justify-end">
                <a @click="logout" href="#" class="text-sm font-semibold leading-6 text-gray-900">Logout <span
                        aria-hidden="true">&rarr;</span></a>
            </div>
        </nav>
    </header>
</template>