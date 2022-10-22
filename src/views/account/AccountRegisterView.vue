<template>
  <RouteWrapper :scrollable="true">
    <transition name="notice-fade" mode="out-in">
      <div
        v-if="!registerAllowed || registerState !== 'idle'"
        class="w-full flex flex-col justify-center items-center"
      >
        <transition name="notice-fade" mode="out-in">
          <NoticeBox 
            v-if="!fieldsNotEmpty"
            level="warn"
            message="Pola nie mogą być puste!"
            icon="fa-solid fa-triangle-exclamation"
          />
        </transition>
        <transition name="notice-fade" mode="out-in">
          <NoticeBox
            v-if="registerState === 'pending'"
            level="info"
            message="Trwa rejestrowanie..."
            icon="fa-solid fa-key"
          />
          <NoticeBox
            v-else-if="registerState === 'success'"
            level="success"
            message="Pomyślnie zarejestrowano konto."
            icon="fa-solid fa-check"
          />
          <NoticeBox
            v-else-if="registerState === 'error'"
            level="error"
            :message="registerErrorMessage"
            icon="fa-solid fa-triangle-exclamation"
          />
        </transition>
      </div>
    </transition>
    <form class="p-4 min-h-full w-full flex flex-col justify-center items-center" @submit.prevent="">
      <h1
        class="w-full text-center text-white text-4xl"
      >Rejestracja</h1>
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
      <div
        class="flex flex-col items-center w-max"
      >
        <div
          class="mt-10"
        >
          <h2
            class="w-full text-center text-white text-2xl mb-4"
          >Dane ogólne</h2>
          <FormInput
            v-model="accountData.username" 
            name="username" 
            type="text" 
            label-content="Nazwa użytkownika"
            autocomplete="username"
            :enabled="true"
          />
          <FormInput 
            v-model="accountData.email" 
            name="email" 
            autocomplete="email" 
            type="email" 
            label-content="Adres email"
            :enabled="true"
          />
          <FormInput 
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
            class="w-full text-center text-white text-2xl mb-4"
          >Dane personalne</h2>
          <FormInput 
            v-model="personalData.name"
            name="name"
            type="text"
            label-content="Imię"
            autocomplete="given-name"
            :enabled="true"
          />
          <FormInput 
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
            class="w-full text-center text-white text-2xl mb-4"
          >Adres</h2>
          <FormInput 
            v-model="address.street"
            name="street"
            type="text"
            label-content="Ulica"
            :enabled="true"
          /> 
          <FormInput 
            v-model="address.number"
            name="number"
            type="number"
            label-content="Numer domu"
            :enabled="true"
          />
          <FormInput 
            v-model="address.postalCode"
            name="postal-code"
            type="text"
            label-content="Kod pocztowy"
            autocomplete="postal-code"
            :enabled="true"
          />
          <FormInput
            v-model="address.city"
            name="city"
            type="text"
            label-content="Miasto"
            autocomplete="address-level2"
            :enabled=true
          />
        </div>
        <CustomButton class="mt-10 w-full" :props="buttonProps" />
      </div>
    </form>
  </RouteWrapper>
</template>

<script setup lang="ts">
import FormInput from '@/components/general/FormInput.vue';
import CustomButton from '@/components/general/CustomButton.vue';
import RouteWrapper from '@/components/general/RouteWrapper.vue';
import NoticeBox from '@/components/general/NoticeBox.vue';

import { reactive, ref, type Ref, computed, type ComputedRef, watch } from 'vue';
import type { ButtonProps, UserAccountData, UserPersonalData, Address, 
  NewAccount, SomsiadStatus, LoginData } from '@/types';
import { Sex } from '@/types';
import { useRouter } from 'vue-router';
import useStore from '@/store';
import { register, login, getUserData, logout } from '@/api/user';

interface Props {
  initEmail?: string;
}

const store = useStore();
const router = useRouter();
const props = defineProps<Props>();

const accountData = reactive<UserAccountData>({
  username: "",
  email: props.initEmail ?? "",
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
  city: ""
});

const fieldsNotEmpty: ComputedRef<boolean> = computed(() => {
  const accData = Object.values(accountData)
    .map((v: string) => v.length > 0)
    .reduce((acc: boolean, cur: boolean) => { 
      if(acc === true)
        acc = cur;
      return acc;
    }, true);

  const pslData = Object.values(personalData)
    .map((v: string) => v.length > 0)
    .reduce((acc: boolean, cur: boolean) => { 
      if(acc === true)
        acc = cur;
      return acc;
    }, true);

  const addr = Object.values(address)
    .map((v: string) => v.length > 0)
    .reduce((acc: boolean, cur: boolean) => { 
      if(acc === true)
        acc = cur;
      return acc;
    }, true);

  return accData && pslData && addr;
});
const registerAllowed: ComputedRef<boolean> = computed(() => {
  return fieldsNotEmpty.value;
});

const registerState: Ref<"idle" | "pending" | "success" | "error"> = ref("idle");
const registerError: Ref<"email-taken" | "nick-taken" | "unexpected-error" | null> = ref(null);
const registerErrorMessage: ComputedRef<string> = computed(() => {
  switch(registerError.value) {
    case null:
      return "Nie udało się zarejestrować konta. Spróbuj ponownie. Jeśli problem się powtórzy, skontaktuj się z administratorem.";
    break;
    case "email-taken":
      return "Na podany adres e-mail już zostało zarejestrowane konto.";
    break;
    case "nick-taken":
      return "Podana nazwa użytkownika jest już zajęta.";
    break;
    case "unexpected-error":
      return "Po stronie serwera wystąpił nieoczekiwany błąd. Spróbuj ponownie. Jeśli problem się powtórzy, skontaktuj się z administratorem.";
    break;
  }
});

async function sendForm() {
  const newAccount: NewAccount = {
    login: {
      email: accountData.email,
      password: accountData.password
    },
    username: accountData.username,
    name: personalData.name,
    surname: personalData.surname,
    sex: personalData.sex,
    address: address
  };

  registerState.value = "pending";
  registerError.value = null;
  await register(newAccount)
    .then(async () => {
      const loginData: LoginData = {
        email: newAccount.login.email,
        password: newAccount.login.password
      };

      return login(loginData)
        .then(() => getUserData()
          .then(data => {
            store.setUserData(data);
            store.setAuthenticated(true);
            registerState.value = "success";
            router.push({
              name: "home"
            })
          })
          .catch(err => logout()
            .then(() => {
              store.clearUserData();
              store.setAuthenticated(false);
              registerState.value = "success";
            })
          )
        )
        .catch(err => {
          registerState.value = "success";
        });
    })
    .catch((err: null | SomsiadStatus) => {
      registerState.value = "error";
      if(err === null) {
        registerError.value = null;
      } else {
        if(err.res.filter((v: string) => v === "Podany nick jest zajęty").length > 0) {
          registerError.value = "nick-taken";
        } else if(err.res.filter((v: string) => v === "Podany e-mail jest zajęty").length > 0) {
          registerError.value = "email-taken";
        } else if(err.res.filter((v: string) => v === "Nieoczekiwany błąd").length > 0) {
          registerError.value = "unexpected-error";
        }
      }
    });
}

const buttonProps: Ref<ButtonProps> = ref({
  caption: "Utwórz konto",
  action: () => sendForm(),
  icon: "fa-solid fa-pen",
  enabled: registerAllowed.value
});
const loginButtonProps: ButtonProps = {
  caption: "Zaloguj się",
  action: () => router.push({ name: 'accountLogin' }),
  icon: "fa-solid fa-key",
  enabled: true
};

watch(registerAllowed, (v) => {
  buttonProps.value.enabled = v;
});
</script>

<style scoped lang="scss">
.notice-fade {
  &-enter-active, &-leave-active {
    transition: opacity .2s;
  }
  &-enter-to, &-leave-from {
    opacity: 1;
  }
  &-enter-from, &-leave-to {
    opacity: 0;
  }
}
</style>
