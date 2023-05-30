<script setup>
import { RouterView } from 'vue-router'
import HeaderLayout from "@/components/layout/HeaderLayout.vue";
import FooterLayout from "@/components/layout/FooterLayout.vue";
</script>

<template>
    <HeaderLayout/>
    <RouterView class="pb-40 mb-5"/>
    <FooterLayout/>
</template>

<style>
@import 'bulma/css/bulma.min.css';
</style>
