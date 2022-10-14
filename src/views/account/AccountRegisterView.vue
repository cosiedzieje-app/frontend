<template>
  <RouteWrapper :scrollable="true">
    <form class="p-4 min-h-full w-full flex flex-col justify-center items-center" @submit.prevent="">
      <h1
        class="w-full text-center text-white text-4xl"
      >Rejestracja</h1>
      <div
        class="flex flex-col items-center w-max"
      >
        <div
          class="mt-10"
        >
          <h2
            class="w-full text-center text-white text-2xl"
          >Dane ogólne</h2>
          <LoginFormInput
            v-model="accountData.username" 
            name="username" 
            type="text" 
            label-content="Nazwa użytkownika"
            autocomplete="username"
            :enabled="true"
          />
          <LoginFormInput 
            v-model="accountData.email" 
            name="email" 
            autocomplete="email" 
            type="email" 
            label-content="Adres email"
            :enabled="true"
          />
          <LoginFormInput 
            v-model="accountData.password" 
            name="password" 
            type="password" 
            label-content="Hasło"
            autocomplete="new-password"
            :enabled="true"
          />
        </div>
        <div
          class="mt-10"
        >
          <h2
            class="w-full text-center text-white text-2xl"
          >Dane personalne</h2>
          <LoginFormInput 
            v-model="personalData.name"
            name="name"
            type="text"
            label-content="Imię"
            autocomplete="given-name"
            :enabled="true"
          />
          <LoginFormInput 
            v-model="personalData.surname"
            name="surname"
            type="text"
            label-content="Nazwisko"
            autocomplete="family-name"
            :enabled="true"
          />
        </div>
        <div
          class="mt-10"
        >
          <h2
            class="w-full text-center text-white text-2xl"
          >Adres</h2>
          <LoginFormInput 
            v-model="address.street"
            name="street"
            type="text"
            label-content="Ulica"
            :enabled="true"
          /> 
          <LoginFormInput 
            v-model="address.number"
            name="number"
            type="number"
            label-content="Numer domu"
            :enabled="true"
          />
          <LoginFormInput 
            v-model="address.postalCode"
            name="postal-code"
            type="text"
            label-content="Kod pocztowy"
            autocomplete="postal-code"
            :enabled="true"
          />
          <LoginFormInput 
            v-model="address.country"
            name="country"
            type="text"
            label-content="Kraj"
            autocomplete="country-name"
            :enabled="true"
          />
        </div>
        <CustomButton class="mt-10 w-full" :props="buttonProps" />
      </div>
      <div
        class="mt-10 text-center text-white flex flex-col items-center"
      >
        <h2
          class="text-2xl"
        >
          Posiadasz już konto?
        </h2>
        <CustomButton 
          class="mt-2 w-full" 
          :props="loginButtonProps"
        />
      </div>
    </form>
  </RouteWrapper>
</template>

<script setup lang="ts">
import LoginFormInput from '@/components/FormInput.vue';
import CustomButton from '@/components/CustomButton.vue';
import RouteWrapper from '@/components/RouteWrapper.vue';

import { reactive } from 'vue';
import type { ButtonProps, UserAccountData, UserPersonalData, Address } from '@/types';
import { Sex } from '@/types';
import { useRouter } from 'vue-router';

interface Props {
  initEmail: string;
}

const router = useRouter();
const props = defineProps<Props>();
const buttonProps: ButtonProps = {
  caption: "Utwórz konto",
  action: () => {},
  icon: "fa-solid fa-pen"
};
const loginButtonProps: ButtonProps = {
  caption: "Zaloguj się",
  action: () => router.push({ name: 'accountLogin' }),
  icon: "fa-solid fa-key"
};

const accountData = reactive<UserAccountData>({
  username: "",
  email: props.initEmail,
  password: ""
});
const personalData = reactive<UserPersonalData>({
  name: "",
  surname: "",
  sex: Sex.Other
});
const address = reactive<Address>({
  postalCode: "",
  number: "",
  street: "",
  country: ""
});
</script>