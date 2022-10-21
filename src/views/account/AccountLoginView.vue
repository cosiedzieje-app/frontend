<template>
  <RouteWrapper :scrollable="true">
    <div
      v-if="redirected || loginState !== 'idle'"
      class="w-full flex flex-col items-center justify-center"
    >
      <Transition name="notice-fade" mode="out-in">
        <NoticeBox 
          v-if="redirected"
          message="Zaloguj się, aby kontynuować"
          icon="fa-solid fa-key"
          level="warn"
        />
      </Transition>
      <Transition name="notice-fade" mode="out-in">
        <NoticeBox
          v-if="loginState === 'pending'"
          message="Trwa logowanie..."
          icon="fa-solid fa-key"
          level="info"
        />
        <NoticeBox
          v-else-if="loginState === 'success'"
          message="Pomyślnie zalogowano. Trwa przekierowanie..."
          icon="fa-solid fa-check"
          level="success"
        />
        <NoticeBox
          v-else-if="loginState === 'error'"
          :message="loginErrorMessage"
          icon="fa-solid fa-triangle-exclamation"
          level="error"
        />
      </Transition>
    </div>
    <form class="p-4 w-full flex flex-col items-center" @submit.prevent="">
      <h1
        class="w-full text-center text-white text-4xl mb-10"
      >
        Logowanie
      </h1>
      <div>
        <FormInput 
          v-model="email" 
          name="email" 
          autocomplete="email" 
          type="email" 
          label-content="Adres email"
          :enabled="true"
        />
        <FormInput 
          v-model="password" 
          name="password" 
          type="password" 
          label-content="Hasło"
          :enabled="true"
        />
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
import RouteWrapper from "@/components/general/RouteWrapper.vue";
import NoticeBox from "@/components/general/NoticeBox.vue";
import FormInput from "@/components/general/FormInput.vue";
import CustomButton from "@/components/general/CustomButton.vue";

import { useRoute, useRouter } from "vue-router";
import { ref, inject, type Ref, computed, type ComputedRef } from "vue";
import type { ButtonProps, AuthContext, LoginData, SomsiadStatus } from "@/types";

const route = useRoute();
const router = useRouter();
const authContext: AuthContext = inject<AuthContext>("authContext") as AuthContext;

const redirected = ref<boolean>(route.query.redirect === 'true');
const loginState: Ref<"idle" | "pending" | "success" | "error"> = ref("idle");
const loginErrorState: Ref<null | "fetch-error" | "invalid-data" | "unexpected-error"> = ref(null);
const loginErrorMessage: ComputedRef<string> = computed(() => {
  switch(loginErrorState.value) {
    case null:
      return "";
    break;
    case "fetch-error":
      return "Wystąpił błąd podczas wysyłania zapytania do serwera. Spróbuj ponownie.";
    break;
    case "invalid-data":
      return "Podany e-mail i/lub hasło jest niepoprawne.";
    break;
    case "unexpected-error":
      return "Po stronie serwera wystąpił nieoczekiwany błąd. Spróbuj ponownie. Jeśli ten błąd wystąpi ponownie, skontaktuj się z administratorem.";
    break;
    default:
      return "Nie udało się przeprowadzić logowania. Spróbuj ponownie. Jeśli ten błąd wystąpi ponownie, skontatkuj się z administratorem.";
  }
});

const email = ref<string>('m@m.pl');
const password = ref<string>('123');

async function sendForm() {
  const loginData: LoginData = {
    email: email.value,
    password: password.value
  };

  loginState.value = "pending";
  loginErrorState.value = null;

  await authContext.login(loginData)
    .then(() => { 
      loginState.value = "success";
      router.replace({ name: 'home' });
    })
    .catch((err: null | SomsiadStatus) => {
      loginState.value = "error";
      if(err === null) {
        loginErrorState.value = "fetch-error";
      } else {
        if(err.res[0] === "Email lub hasło podane przez ciebie nie są poprawne") {
          loginErrorState.value = "invalid-data";
        } else {
          loginErrorState.value = "unexpected-error";
        }
      }
    });
}

const buttonProps: ButtonProps = {
  caption: 'Prześlij',
  action: () => sendForm(),
  icon: 'fa-solid fa-check',
  enabled: true
}

const registerButtonProps: ButtonProps = {
  caption: "Zarejestruj się",
  action: () => router.push({ 
    name: 'accountRegister',
    params: {
      email: email.value
    } 
  }),
  icon: 'fa-solid fa-pen',
  enabled: true
}
</script>

<style scoped lang="scss">
.notice-fade-enter-active, .noteice-fade-leave-active {
  transition: opacity .2s;
}
.notice-fade-enter-from, .notice-fade-leave-to {
  opacity: 0;
}
.notice-fade-enter-to, .notice-fade-leave-from {
  opacity: 1;
}
</style>
