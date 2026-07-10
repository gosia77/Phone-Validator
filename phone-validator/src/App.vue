<script setup lang="ts">
import { defineAsyncComponent } from "vue";
const PhoneValidator = defineAsyncComponent(() => import("./components/PhoneValidator.vue"));
import './index.css'

</script>

<template>
    <PhoneValidator />
</template>
