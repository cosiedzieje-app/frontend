<template>
  <RouteWrapper class="account-login flex flex-col items-center">
    <NoticeBox 
      v-if="redirected"
      message="Log in to continue"
      icon="fa-solid fa-key"
      level="warn"
    />
    <form class="px-4 my-32" @submit.prevent="sendForm">
      <div>
        <LoginFormInput v-model="email" name="email" autocomplete="email" type="email" label-content="Adres email"></LoginFormInput>
        <LoginFormInput v-model="password" name="password" type="password" label-content="Hasło"></LoginFormInput>
        <CustomButton class="ml-0" :props="buttonProps"></CustomButton>
      </div>
  </form>
  </RouteWrapper>
</template>

<script setup lang="ts">
import RouteWrapper from "@/components/RouteWrapper.vue";
import NoticeBox from "@/components/NoticeBox.vue";
import LoginFormInput from "@/components/LoginFormInput.vue";
import CustomButton from "@/components/CustomButton.vue";

import { useRoute } from "vue-router";
import { ref } from "vue";
import type { ButtonProps, LoginRequest } from "@/types";

const route = useRoute();

const redirected = ref<boolean>(route.query.redirect === 'true');

let email = ref<string>('m@m.pl');
let password = ref<string>('123');

async function sendForm() {
  const loginRequest: LoginRequest = {
    email: email.value,
    password: password.value
  }
  console.log(loginRequest);
  
  const rawResponse = await fetch(`${import.meta.env.BACKEND_URL}/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginRequest)
      }
  );

  const content = await rawResponse.json();
}

const buttonProps: ButtonProps = {
  caption: 'Prześlij',
  action: () => null,
  icon: 'fa-solid fa-check'
}
</script>