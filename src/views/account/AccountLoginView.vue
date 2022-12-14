<template>
  <RouteWrapper :scrollable="true">
    <transition name="notice-fade" mode="out-in">
      <div
        v-if="unlockNotices || redirected || loginState !== 'idle'"
        class="w-full flex flex-col items-center justify-center"
      >
        <transition name="notice-fade" mode="out-in">
          <NoticeBox 
            v-if="redirected"
            message="Zaloguj się, aby kontynuować"
            icon="fa-solid fa-key"
            level="warn"
          />
        </Transition>
        <transition name="notice-fade" mode="out-in">
          <NoticeBox 
            v-if="unlockNotices && !fieldsNotEmpty"
            message="Pola nie mogą być puste"
            icon="fa-solid fa-triangle-exclamation"
            level="warn"
          />
        </transition>
        <Transition name="notice-fade" mode="out-in">
          <NoticeBox
            v-if="unlockNotices === true && loginState === 'pending'"
            message="Trwa logowanie..."
            icon="fa-solid fa-key"
            level="info"
          />
          <NoticeBox
            v-else-if="unlockNotices === true && loginState === 'success'"
            message="Pomyślnie zalogowano. Trwa przekierowanie..."
            icon="fa-solid fa-check"
            level="success"
          />
          <NoticeBox
            v-else-if="unlockNotices === true && loginState === 'error'"
            :message="loginErrorMessage"
            icon="fa-solid fa-triangle-exclamation"
            level="error"
          />
        </transition>
      </div>
    </transition>
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
import { ref, type Ref, computed, type ComputedRef, watch } from "vue";
import type { ButtonProps, LoginData, SomsiadStatus } from "@/types";
import { login, getUserData } from "@/api/user";
import useStore from "@/store";

const store = useStore();
const route = useRoute();
const router = useRouter();

const unlockNotices: Ref<boolean> = ref(false);
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

const email: Ref<string> = ref("");
const password: Ref<string> = ref("");

const fieldsNotEmpty: ComputedRef<boolean> = computed(() => {
  return email.value.length > 0 && password.value.length > 0;
});
const loginAllowed: ComputedRef<boolean> = computed(() => {
  return fieldsNotEmpty.value;
});

async function disabledSendForm() {
  unlockNotices.value = true;
}
async function sendForm() {
  unlockNotices.value = true;
  const loginData: LoginData = {
    email: email.value,
    password: password.value
  };

  loginState.value = "pending";
  loginErrorState.value = null;

  await login(loginData)
    .then(() => getUserData()
      .then(data => {
        store.setAuthenticated(true);
        store.setUserData(data);
        loginState.value = "success";
        router.replace({ name: "home" });
      })
    )
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

const buttonProps: Ref<ButtonProps> = ref<ButtonProps>({
  caption: 'Prześlij',
  action: () => sendForm(),
  icon: 'fa-solid fa-check',
  enabled: loginAllowed.value,
  disabledAction: () => disabledSendForm(),
  type: "submit"
});

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

watch(loginAllowed, v => {
  buttonProps.value.enabled = v;
});
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
