<script setup lang="ts">
import { defineAsyncComponent } from "vue";
const PhoneValidator = defineAsyncComponent(() => import("./components/PhoneValidator.vue"));
const PhoneExample = defineAsyncComponent(() => import("./components/PhoneExample.vue"));
import './index.css'

</script>

<template>
    <PhoneValidator />
    <PhoneExample />
</template>
