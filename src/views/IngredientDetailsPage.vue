<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>{{ state.ingredient.name }} - details</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-loading
        :is-open="state.loading"
        cssClass="my-custom-class"
        message="Loading ingredient info..."
      >
      </ion-loading>

      <div v-if="state.errored" class="ion-text-center" id="error">
        <h4>There was an error loading ingredient info... Try again later</h4>
        <ion-icon :icon="sadOutline" />
      </div>

      <ingredient-overview
        v-else
        :ingredient="state.ingredient"
        :ingredientNutrients="state.ingredientNutrients"
        :ingredientWeight="state.ingredientWeight"
      ></ingredient-overview>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonContent,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonBackButton,
  IonLoading,
} from "@ionic/vue";
import { sadOutline } from "ionicons/icons";
import { reactive } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import IngredientOverview from "../components/IngredientOverview.vue";

export default {
  components: {
    IonPage,
    IonContent,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonBackButton,
    IonLoading,
    IngredientOverview,
  },
  setup() {
    const route = useRoute();
    const ingredientId = route.params.id;

    const state = reactive({
      ingredient: {},
      ingredientNutrients: [],
      ingredientWeight: {},
      loading: false,
      errored: false,
    });

    const getIngredientInfo = () => {
      state.loading = true;
      axios
        .get(
          `https://api.spoonacular.com/food/ingredients/${ingredientId}/information?amount=1&apiKey=${process.env.VUE_APP_API_KEY}`
        )
        .then((data) => {
          state.ingredient = data.data;
          state.ingredientNutrients = data.data.nutrition.nutrients;
          state.ingredientWeight = data.data.nutrition.weightPerServing;
        })
        .catch((error) => {
          console.log(error);
          state.errored = true;
        })
        .finally(() => {
          state.loading = false;
        });
    };

    getIngredientInfo();

    return {
      state,
      sadOutline,
    };
  },
};
</script>
