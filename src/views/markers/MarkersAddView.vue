<template>
  <RouteWrapper :scrollable="true">
    <h1 class="w-full text-center text-white text-3xl p-4">Dodaj nowe ogłoszenie</h1>
    <form @submit.prevent="" class="min-h-full w-full flex flex-col items-center py-4">
      <section class="w-full flex flex-col items-center px-4 mb-6">
        <h2 class="w-full text-center text-white text-2xl pb-2">Podstawowe dane</h2>
        <article class="w-[75%] flex flex-col">
          <FormInput 
            :enabled="true"
            type="text"
            name="title"
            label-content="Tytuł"
            :modelValue="title"
            class="my-2"
          />
          <FormInput 
            :enabled="true"
            type="text"
            name="description"
            label-content="Opis"
            :modelValue="description"
            class="my-2"
          />
          <FormInput 
            :enabled="true"
            type="text"
            name="street"
            label-content="Ulica"
            :modelValue="address.street"
            class="my-2"
          />
          <FormInput
            :enabled="true"
            type="text"
            name="street-number"
            label-content="Numer domu"
            :modelValue="address.number"
            class="my-2"
          />
          <FormInput
            :enabled="true"
            type="text"
            name="postal-code"
            label-content="Kod pocztowy"
            :modelValue="address.postalCode"
            class="my-2"
            autocomplete="postal-code"
          />
          <FormInput
            :enabled="true"
            type="text"
            name="country"
            label-content="Kraj"
            :modelValue="address.country"
            class="my-2"
            autocomplete="country-name"
          />
        </article>
      </section>
      <section class="w-full flex flex-col items-center px-4 my-6">
        <h2 class="w-full text-center text-white text-2xl pb-2">Dane kontaktowe</h2>
        <article class="w-[75%] flex flex-col">
          <FormInput 
            :enabled="true"
            type="text"
            name="name"
            label-content="Imię"
            :modelValue="contactInfo.name"
            class="my-2"
            autocomplete="given-name"
          />
          <FormInput 
            :enabled="true"
            type="text"
            name="surname"
            label-content="Nazwisko"
            :modelValue="contactInfo.surname"
            class="my-2"
            autocomplete="family-name"
          />
          <FormInput 
            :enabled="true"
            type="text"
            name="phone-number"
            label-content="Numer telefonu"
            :modelValue="contactInfo.phoneNumber"
            class="my-2"
            autocomplete="tel"
          />
          <FormInput
            :enabled="true"
            type="text"
            name="email"
            label-content="Adres e-mail"
            :modelValue="contactInfo.email"
            class="my-2"
            autocomplete="email"
          />
        </article>
      </section>
      <section class="w-full flex flex-col items-center px-4 my-6">
        <h2 class="w-full text-center text-white text-2xl pb-2">Adres do kontaktu</h2>
        <article class="w-[75%] flex flex-col">
          <FormInput 
            :enabled="true"
            type="text"
            name="street"
            label-content="Ulica"
            :modelValue="contactInfo.address.street"
            class="my-2"
          />
          <FormInput
            :enabled="true"
            type="text"
            name="street-number"
            label-content="Numer domu"
            :modelValue="contactInfo.address.number"
            class="my-2"
          />
          <FormInput
            :enabled="true"
            type="text"
            name="postal-code"
            label-content="Kod pocztowy"
            :modelValue="contactInfo.address.postalCode"
            class="my-2"
            autocomplete="postal-code"
          />
          <FormInput
            :enabled="true"
            type="text"
            name="country"
            label-content="Kraj"
            :modelValue="contactInfo.address.country"
            class="my-2"
            autocomplete="country-name"
          />
        </article>
      </section>
      <CustomButton
        class="w-[75%]"
        :props="submitButtonProps"
      />
    </form>
  </RouteWrapper>
</template>

<script setup lang="ts">
import RouteWrapper from "@/components/general/RouteWrapper.vue";
import FormInput from "@/components/general/FormInput.vue";
import CustomButton from "@/components/general/CustomButton.vue";
import { ref, type Ref, reactive } from "vue";
import type { ContactInfo, Address, ButtonProps } from "@/types";

const title: Ref<string> = ref("");
const description: Ref<string> = ref("");
const address: Address = reactive({
  street: "",
  number: "",
  postalCode: "",
  country: ""
});
const contactInfo: ContactInfo = reactive({
  name: "",
  surname: "",
  address: {
    street: "",
    number: "",
    postalCode: "",
    country: ""
  },
  phoneNumber: "",
  email: ""
});

function submitMarker() {

}

const submitButtonProps: ButtonProps = {
  caption: "Dodaj ogłoszenie",
  action: () => submitMarker(),
  icon: "fa-icon fa-plus"
};
</script>
