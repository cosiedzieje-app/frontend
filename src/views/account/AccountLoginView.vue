<template>
  <RouteWrapper :scrollable="true">
    <div
      v-if="redirected"
      class="w-full flex flex-row items-center justify-center"
    >
      <NoticeBox 
        message="Zaloguj się, aby kontynuować"
        icon="fa-solid fa-key"
        level="warn"
      />
    </div>
    <form class="p-4 w-full flex flex-col items-center" @submit.prevent="sendForm">
      <h1
        class="w-full text-center text-white text-4xl mb-10"
      >
        Logowanie
      </h1>
      <div>
        <LoginFormInput v-model="email" name="email" autocomplete="email" type="email" label-content="Adres email"></LoginFormInput>
        <LoginFormInput v-model="password" name="password" type="password" label-content="Hasło"></LoginFormInput>
        <CustomButton class="mt-5 w-full" :props="buttonProps" />
      </div>
      <div class="mt-20 text-center text-white">
        <h2 class="text-2xl">Nie posiadasz konta?</h2>
        <CustomButton class="mt-2 w-full" :props="registerButtonProps" />
      </div>
    </form>
  </RouteWrapper>
</template>

<script setup lang="ts">
import RouteWrapper from "@/components/RouteWrapper.vue";
import NoticeBox from "@/components/NoticeBox.vue";
import LoginFormInput from "@/components/FormInput.vue";
import CustomButton from "@/components/CustomButton.vue";

import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import type { ButtonProps, LoginRequest } from "@/types";

const route = useRoute();
const router = useRouter();

const redirected = ref<boolean>(route.query.redirect === 'true');

const email = ref<string>('m@m.pl');
const password = ref<string>('123');

async function sendForm() {
  const loginRequest: LoginRequest = {
    email: email.value,
    password: password.value
  }
  console.log(loginRequest);
  
  //Nie lepiej po prostu zrobić to na then/catch zamiast przypisywać
  //do zmiennych?
  const rawResponse = await fetch(`${import.meta.env.BACKEND_URL}/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginRequest)
      }
  );

  //A co jak .json() zwróci błąd?
  //WTF
  const content = await rawResponse.json();
}

//Zamiast () => null powinno być () => {} bo i tak potem coś z tą funkcją
//zrobimy *shrug*
const buttonProps: ButtonProps = {
  caption: 'Prześlij',
  action: () => {},
  icon: 'fa-solid fa-check'
}

const registerButtonProps: ButtonProps = {
  caption: "Zarejestruj się",
  action: () => router.push({ 
    name: 'accountRegister',
    params: {
      email: email.value
    } 
  }),
  icon: 'fa-solid fa-pen'
}
</script>