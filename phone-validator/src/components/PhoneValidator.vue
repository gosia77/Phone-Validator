<template>
    <div class="phone_form_container w-md my-[50px] mx-auto p-6 rounded-2xl font-sans bg-sky-50 border border-solid border-slate-200 shadow-md">
        <label class="label block text-sm font-semibold text-slate-600 mb-[8px]">Phone number</label>
        <div class="input_group w-full flex gap-[10px] relative">
            <div class="select_container relative">
                <div
                    class="selected_option flex items-center gap-[8px] h-[48px] px-[14px] py-0 border-2 border-slate-300 rounded-xl bg-white cursor-pointer select-none text-sm font-medium text-[#1e293b] min-w-[110px] transition-all duration-200 ease-out hover:border-slate-400 hover:bg-slate-50"
                    @click="openDropdown"
                    ref="selectRef"
                >
                    <span class="flag_icon text-xl leading-none">{{ selectedCountry.flag }}</span>
                    <span class="digital_code text-slate-800"> {{ selectedCountry.dialCode }}</span>
                    <span class="arrow text-xs text-[#64748b] ml-auto transition-transform duration-200 ease-out" :class="{ 'rotate-180': isOpen }">▼</span>
                </div>
                <ul v-if="isOpen" class="dropdownList w-xs absolute top-[calc(100%+6px)] left-0 max-h-[280px] overflow-y-auto bg-white border border-slate-200 rounded-xl px-0 py-[6px] m-0 list-none z-[999]">
                    <li v-for="country in countries" :key="country.code" @click="selectCountry(country)" class="flex items-center gap-3 py-[10px] px-4 cursor-pointer text-sm text-slate-700 transition-colors duration-150 ease-in-out hover:bg-slate-100">
                        <span class="flag_icon">{{ country.flag }}</span>
                        <span class="country_name flex-1 truncate" :title="country.name">{{ country.name }}</span>
                        <span class="dropdown_dial_code font-medium text-[#64748b]">{{ country.dialCode }}</span>
                    </li>
                </ul>
            </div>
            <input
                type="tel"
                v-model="phoneNumber"
                @input="validatePhone"
                :placeholder="selectedCountry.placeholder"
                class="flex-1 h-[48px] px-4 border-2 border-slate-300 rounded-xl bg-white text-sm text-[#1e293b] font-medium outline-none transition-all duration-200 focus:border-slate-500 placeholder:text-slate-400"
            />
        </div>
        <p v-if="errorMessage" class="text-xs text-red-500 mt-2 font-medium">
            {{ errorMessage }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useStore } from "vuex";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { key, type Country } from "../store";

const store = useStore(key);

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
const selectedCountry = computed(() => store.state.selectedCountry ?? countries[0]);
const isOpen = ref(false);
const phoneNumber = ref("");
const errorMessage = ref("");
const selectRef = ref<HTMLElement | null>(null);

const openDropdown = () => {
    isOpen.value = !isOpen.value;
};

const selectCountry = (country: Country) => {
    store.commit("setSelectedCountry", country);
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
    if (!store.state.selectedCountry) {
        store.commit("setSelectedCountry", countries[0]);
    }
    document.addEventListener("click", clickOutside);
});

onUnmounted(() => {
    document.removeEventListener("click", clickOutside);
});
</script>

<style></style>
