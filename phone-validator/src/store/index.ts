import type { InjectionKey } from 'vue'
import { createStore, type Store } from 'vuex'
import type { CountryCode } from 'libphonenumber-js'

export interface Country {
  name: string
  code: CountryCode
  dialCode: string
  flag: string
  placeholder: string
  errorTranslation: string
}

export interface State {
  selectedCountry: Country | null
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    selectedCountry: null,
  },
  mutations: {
    setSelectedCountry(state, country: Country) {
      state.selectedCountry = country
    },
  },
  actions: {},
  getters: {},
})
