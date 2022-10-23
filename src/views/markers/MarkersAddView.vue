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
        <h2 class="w-full text-center text-white text-2xl pb-4">Typ ogłoszenia</h2>
        <article class="w-[75%] flex flex-col">
          <FormRadio
            :radios="categoryOfMarker"
            @update="onMarkerRadioUpdate"
          />
        </article>
      </section>
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
            v-model="title"
            class="my-2"
            @update="onInputUpdate"
          />
          <FormInput 
            :enabled="true"
            type="text"
            name="description"
            label-content="Opis"
            v-model="description"
            class="my-2"
            @update="onInputUpdate"
          />


          <FormInput 
            :enabled="true"
            type="text"
            name="street"
            label-content="Ulica"
            v-model="address.street"
            class="my-2"
            @update="onInputUpdate"
          />
          <FormInput
            :enabled="true"
            type="text"
            name="street-number"
            label-content="Numer domu"
            v-model="address.number"
            class="my-2"
            @update="onInputUpdate"
          />
          <FormInput
            :enabled="true"
            type="text"
            name="city"
            label-content="Miasto"
            v-model="address.city"
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
            v-model="name"
            class="my-2"
            autocomplete="given-name"
            @update="onInputUpdate"
          />
          <FormInput 
            :enabled="true"
            type="text"
            name="surname"
            label-content="Nazwisko"
            v-model="surname"
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
            v-model="contactVal"
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
            v-model="contactVal"
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
            v-model="contactAddress.city"
            class="my-2"
            @update="onInputUpdate"
          />
          <FormInput 
            :enabled="true"
            type="text"
            name="street"
            label-content="Ulica"
            v-model="contactAddress.street"
            class="my-2"
            @update="onInputUpdate"
          />
          <FormInput
            :enabled="true"
            type="text"
            name="street-number"
            label-content="Numer domu"
            v-model="contactAddress.number"
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
import { ref, type Ref, reactive, watch, type ComputedRef, computed, onMounted, nextTick } from "vue";
import type { ContactInfo, Address, ButtonProps, FormRadioProps, NewMarker, SomsiadStatus } from "@/types";
import { ContactMethod, ListingCategory } from "@/types";
import { addMarker } from "@/api/backend";
import type {GeoData} from '@/types/index'
import { geocodeFromAddress } from '@/api/geocoding';
import { useRouter } from 'vue-router';
import useStore from '@/store';
import { convertLen } from '@/views/markers/ConvertLenght';

let id= 0;
const routewrapper: Ref<InstanceType<typeof RouteWrapper> | null> = ref(null);
const unlockNotices: Ref<boolean> = ref(false);
const store = useStore();
const title: Ref<string> = ref("");
const description: Ref<string> = ref("");
const address: Address = reactive({
  street: "",
  'number': "",
  city: "",
});
const name: Ref<string> = ref("");
const surname: Ref<string> = ref("");
const contactAddress: Ref<Address> = ref({
  street: "",
  'number': "",
  city: ""
});
const contactMethod: Ref<ContactMethod> = ref(ContactMethod.PhoneNumber);
const contactVal: Ref<string> = ref("");

const listCategory: Ref<ListingCategory> =  ref(ListingCategory.Happening);
const categoryOfMarker: Ref<FormRadioProps[]> = ref([
  {
    name: "Happening",
    label: "Happeningi",
    selected: true
  },
  {
    name: "Charity",
    label: "Akcje Charytatywne",
    selected: false
  },
  {
    name: "NeighborHelp",
    label: "Pomoc sąsiedzka",
    selected: false
  },
  {
    name: "MassEvent",
    label: "Imprezy masowe",
    selected: false
  }
]);
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
  console.log(name);
  if(name === "phoneNumber") {
    contactMethod.value = ContactMethod.PhoneNumber;
  } else {
    contactMethod.value = ContactMethod.Email;
  }
};

const onMarkerRadioUpdate = (name: string) => {
  if(name === "Happening") {
    listCategory.value = ListingCategory.Happening;
  } else if(name === "Charity") {
    listCategory.value = ListingCategory.Charity;
  } else if(name === "NeighborHelp") {
    listCategory.value = ListingCategory.NeighborHelp;
  } else {
    listCategory.value = ListingCategory.MassEvent;
  }
};

const fieldsNotEmpty: ComputedRef<boolean> = computed(() => {
   return (name.value.length > 0) 
    && (surname.value.length > 0)
    && (contactAddress.value.city.length > 0)
    && (contactAddress.value['number'].length > 0)
    && (contactAddress.value.street.length > 0)
    && (contactVal.value.length > 0)
    && (address.street.length > 0)
    && (address['number'].length > 0)
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
  //console.log(contactInfo);
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

  let adresL: any;

  adresL = await geocodeFromAddress(`${address.street} ${address.number} ${address.city}`);
  let position:any = convertLen(adresL.longitude, adresL.latitude);
  //console.log(adresL)
  //const adres: Address = {
  //  city: adresL.locality,
  //  street: adresL.street,
  //  number: adresL.number
  //}
  
  const contactInfo: ContactInfo = {
    name: name.value,
    surname: surname.value,
    address: contactAddress.value,
    method: {
      type: contactMethod.value,
      val: contactVal.value
    }
  };

  const markerData: NewMarker ={
    latitude: position[1],
    longitude: position[0],
    title: title.value,
    description: description.value,
    type: listCategory.value,
    address: address,
    contactInfo: contactInfo
  }
  //console.log(adres);
  console.log(markerData);
  await addMarker(markerData)
    .then(() => {
      store.pointres = markerData;
      addState.value = "success";
    })
    .catch((err: SomsiadStatus | null) => {
      console.error(err);
      addState.value = "error";
    });
}

async function disabledSubmitMarker() {
  //console.log(contactInfo);
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
