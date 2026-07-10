<template>
    <div class="phone_form_container">
        <label class="label">Phone number</label>
        <div class="input_group">
            <div class="select_container">
                <div class="selected_option" @click="openDropdown" ref="selectRef">
                    <span class="flag_icon">{{ selectedCountry.flag }}</span>
                    <span class="digital_code"> {{ selectedCountry.dialCode }}</span>
                    <span class="arrow" :class="{ arrow_open: isOpen }">▼</span>
                </div>
                <ul v-if="isOpen" class="dropdownList">
                    <li v-for="country in countries" :key="country.code" @click="selectCountry(country)">
                        <span class="flag_icon">{{ country.flag }}</span>
                        <span class="country_name">{{ country.name }}</span>
                        <span dropdown_dial_code>{{ country.dialCode }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import type { CountryCode } from "libphonenumber-js";
import { parsePhoneNumberFromString } from "libphonenumber-js";

//Type def for Countries
interface Country {
    name: string;
    code: CountryCode;
    dialCode: string;
    flag: string;
    placeholder: string;
    errorTranslation: string;
}

const countries: Country[] = [
    {
        name: "United States",
        code: "US",
        dialCode: "+1",
        flag: "US",
        placeholder: "201 555 0123",
        errorTranslation: "Invalid phone number.",
    },
    {
        name: "Polska",
        code: "PL",
        dialCode: "+48",
        flag: "🇵🇱",
        placeholder: "501 234 567",
        errorTranslation: "Niepoprawny numer telefonu.",
    },
    {
        name: "Italia",
        code: "IT",
        dialCode: "+39",
        flag: "🇮🇹",
        placeholder: "312 345 6789",
        errorTranslation: "Numero di telefono non valido.",
    },
    {
        name: "Deutschland",
        code: "DE",
        dialCode: "+49",
        flag: "🇩🇪",
        placeholder: "151 2345678",
        errorTranslation: "Ungültige Telefonnummer.",
    },
];
const selectedCountry = ref<Country>(countries[0]);
const isOpen = ref(false);
const phoneNumber = ref("");
const errorMessage = ref("");
const selectRef = ref<HTMLElement | null>(null);

const openDropdown = () => {
    isOpen.value = !isOpen.value;
};

const selectCountry = (country: Country) => {
    selectedCountry.value = country;
    isOpen.value = false;
    validatePhone();
};

const validatePhone = () => {
    if (!phoneNumber.value.trim()) {
        errorMessage.value = "";
        return;
    }

    const parsedNumber = parsePhoneNumberFromString(phoneNumber.value, selectedCountry.value.code);
    if (parsedNumber && parsedNumber.isValid()) {
        errorMessage.value = "";
    } else {
        errorMessage.value = selectedCountry.value.errorTranslation;
    }
};

const clickOutside = (event: MouseEvent) => {
    if (selectRef.value && !selectRef.value.contains(event?.target as Node)) {
        isOpen.value = false;
    }
};

onMounted(() => {
    document.addEventListener("click", clickOutside);
});

onUnmounted(() => {
    document.removeEventListener("click", clickOutside);
});
</script>

<style scoped>
</style>
