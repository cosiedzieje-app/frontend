<template>
  <RouteWrapper ref="routewrapper" :scrollable="true">
    <transition name="notice-fade" mode="out-in">
      <div
        v-if="unlockNotices && (!addAllowed || addState !== 'idle')"
        class="w-full flex flex-col justify-center items-center"
      >
        <transition name="notice-fade" mode="out-in">
          <NoticeBox
            v-if="!fieldsNotEmpty"
            level="warn"
            message="Żadne pole nie może być puste!"
            icon="fa-solid fa-triangle-exclamation"
          />
        </transition>
        <transition name="notice-fade" mode="out-in">
          <NoticeBox
            v-if="addState === 'pending'"
            level="info"
            message="Dodawanie znacznika..."
            icon="fa-solid fa-location-dot"
          />
          <NoticeBox
            v-else-if="addState === 'success'"
            level="success"
            message="Pomyślnie dodano znacznik!"
            icon="fa-solid fa-location-dot"
          />
          <NoticeBox
            v-else-if="addState === 'error'"
            level="error"
            :message="addErrorMessage"
            icon="fa-solid fa-location-dot"
          />
        </transition>
      </div>
    </transition>
    <h1 class="w-full text-center text-white text-3xl p-4">
      Dodaj nowe ogłoszenie
    </h1>
    <form 
      @submit.prevent="" 
      class="min-h-full w-full flex flex-col items-center py-4"
    >
      <section class="w-full flex flex-col items-center px-4 mb-6">
        <h2 class="w-full text-center text-white text-2xl pb-4">
          Podstawowe dane
        </h2>
        <article class="w-[75%] flex flex-col">
          <FormInput 
            :enabled="true"
            type="text"
            name="title"
            label-content="Tytuł"
            :modelValue="title"
            class="my-2"
            @update="onInputUpdate"
          />
          <FormInput 
            :enabled="true"
            type="text"
            name="description"
            label-content="Opis"
            :modelValue="description"
            class="my-2"
            @update="onInputUpdate"
          />
          <FormInput 
            :enabled="true"
            type="text"
            name="street"
            label-content="Ulica"
            :modelValue="address.street"
            class="my-2"
            @update="onInputUpdate"
          />
          <FormInput
            :enabled="true"
            type="text"
            name="street-number"
            label-content="Numer domu"
            :modelValue="address.number"
            class="my-2"
            @update="onInputUpdate"
          />
          <FormInput
            :enabled="true"
            type="text"
            name="city"
            label-content="Miasto"
            :modelValue="address.city"
            class="my-2"
            @update="onInputUpdate"
          />
        </article>
      </section>
      <section class="w-full flex flex-col items-center px-4 my-6">
        <h2 class="w-full text-center text-white text-2xl pb-4">
          Dane kontaktowe
        </h2>
        <article class="w-[75%] flex flex-col">
          <FormInput 
            :enabled="true"
            type="text"
            name="name"
            label-content="Imię"
            :modelValue="contactInfo.name"
            class="my-2"
            autocomplete="given-name"
            @update="onInputUpdate"
          />
          <FormInput 
            :enabled="true"
            type="text"
            name="surname"
            label-content="Nazwisko"
            :modelValue="contactInfo.surname"
            class="my-2"
            autocomplete="family-name"
            @update="onInputUpdate"
          />
        </article>
      </section>
      <section class="w-full flex flex-col items-center px-4 my-6">
        <h2
          class="w-full text-center text-white text-2xl pb-2"
        >Forma kontaktu</h2>
        <article class="w-[75%] flex flex-col">
          <FormRadio
            :radios="radios"
            @update="onRadioUpdate"
          />
          <FormInput 
            v-if="contactMethod === ContactMethod.PhoneNumber"
            :enabled="true"
            type="text"
            name="phone-number"
            label-content="Numer telefonu"
            :modelValue="contactInfo.method.val"
            class="my-2"
            autocomplete="tel"
            @update="onInputUpdate"
          />
          <FormInput
            v-else-if="contactMethod === ContactMethod.Email"
            :enabled="true"
            type="text"
            name="email"
            label-content="Adres e-mail"
            :modelValue="contactInfo.method.val"
            class="my-2"
            autocomplete="email"
            @update="onInputUpdate"
          />
        </article>
      </section>
      <section class="w-full flex flex-col items-center px-4 my-6">
        <h2 class="w-full text-center text-white text-2xl pb-4">
          Adres do kontaktu
        </h2>
        <article class="w-[75%] flex flex-col">
          <FormInput 
            :enabled="true"
            type="text"
            name="city"
            label-content="Miasto"
            :modelValue="contactInfo.address.city"
            class="my-2"
            @update="onInputUpdate"
          />
          <FormInput 
            :enabled="true"
            type="text"
            name="street"
            label-content="Ulica"
            :modelValue="contactInfo.address.street"
            class="my-2"
            @update="onInputUpdate"
          />
          <FormInput
            :enabled="true"
            type="text"
            name="street-number"
            label-content="Numer domu"
            :modelValue="contactInfo.address.number"
            class="my-2"
            @update="onInputUpdate"
          />
        </article>
      </section>
      <CustomButton
        class="my-4 w-[80%]"
        :props="submitButtonProps"
      />
    </form>
  </RouteWrapper>
</template>

<script setup lang="ts">
import RouteWrapper from "@/components/general/RouteWrapper.vue";
import FormInput from "@/components/general/FormInput.vue";
import FormRadio from "@/components/general/FormRadio.vue";
import CustomButton from "@/components/general/CustomButton.vue";
import NoticeBox from "@/components/general/NoticeBox.vue";
import { ref, type Ref, reactive, watch, type ComputedRef, computed, nextTick } from "vue";
import type { ContactInfo, Address, ButtonProps, FormRadioProps, NewMarker } from "@/types";
import { ContactMethod } from "@/types";
import { addMarker } from "@/api/backend";

const routewrapper: Ref<InstanceType<typeof RouteWrapper> | null> = ref(null);
const unlockNotices: Ref<boolean> = ref(false);

const title: Ref<string> = ref("");
const description: Ref<string> = ref("");
const address: Address = reactive({
  street: "",
  'number': "",
  city: "",
});
const contactInfo: Ref<ContactInfo> = ref({
  name: "",
  surname: "",
  address: {
    street: "",
    'number': "",
    city: "",
  },
  method: {
    type: ContactMethod.PhoneNumber,
    val: ""
  }
});

const contactMethod: Ref<ContactMethod> = ref(ContactMethod.PhoneNumber);
const radios: Ref<FormRadioProps[]> = ref([
  {
    name: "phoneNumber",
    label: "Numer telefonu",
    selected: true
  },
  {
    name: "email",
    label: "E-mail",
    selected: false
  }
]);

const onInputUpdate = () => {
  //no-op
};
const onRadioUpdate = (name: string) => {
  if(name === "phoneNumber") {
    contactMethod.value = ContactMethod.PhoneNumber;
  } else {
    contactMethod.value = ContactMethod.Email;
  }
};

const fieldsNotEmpty: ComputedRef<boolean> = computed(() => {
   return (contactInfo.value.name.length > 0) 
    && (contactInfo.value.surname.length > 0)
    && (contactInfo.value.address.city.length > 0)
    && (contactInfo.value.address.number.length > 0)
    && (contactInfo.value.address.street.length > 0)
    && (contactInfo.value.method.val.length > 0)
    && (address.street.length > 0)
    && (address.number.length > 0)
    && (address.city.length > 0)
});
const addAllowed: ComputedRef<boolean> = computed(() => {
  return fieldsNotEmpty.value;    
});
const addState: Ref<"idle" | "pending" | "success" | "error"> = ref("idle");
const addError: Ref<"unexpected-error" | null> = ref(null);
const addErrorMessage: ComputedRef<string> = computed(() => {
  switch(addError.value) {
    case null:
      return "Nie udało się dodać ogłoszenia. Spróbuj ponownie. Jeśli problem się powtórzy, skontaktuj się z administratorem.";
    break;
    case "unexpected-error":
      return "Po stronie serwera wystąpił nieoczekiwany błąd. "
        +"Spróbuj ponownie. "
        +"Jeśli problem się powtórzy, skontaktuj się z administratorem.";
    break;
  }
});

const submitButtonProps: Ref<ButtonProps> = ref({
  caption: "Dodaj ogłoszenie",
  action: () => submitMarker(),
  disabledAction: () => disabledSubmitMarker(),
  icon: "fa-icon fa-plus",
  enabled: addAllowed.value
});
watch(addAllowed, (v) => {
  submitButtonProps.value.enabled = v;
});

//TODO: Implement backend connection
async function submitMarker() {
  console.log(contactInfo);
  unlockNotices.value = true;
  addState.value = "pending";
  addError.value = null;
  await nextTick();
  if(routewrapper.value !== null) {
    if(routewrapper.value.wrapper !== null) {
      routewrapper.value.wrapper.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }
  }
}

async function disabledSubmitMarker() {
  console.log(contactInfo);
  unlockNotices.value = true;
  await nextTick();
  if(routewrapper.value !== null) {
    if(routewrapper.value.wrapper !== null) {
      routewrapper.value.wrapper.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }
  }
}
</script>

<style lang="scss" scoped>
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
