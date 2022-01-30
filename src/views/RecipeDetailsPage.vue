<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>{{ state.recipe.title }}</ion-title>
        <ion-icon
          :icon="state.favorite ? heart : heartOutline"
          slot="end"
          @click.prevent="addToFavorites(state.recipe)"
        />
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-loading
        :is-open="state.loading"
        cssClass="my-custom-class"
        message="Loading recipe info..."
      >
      </ion-loading>

      <div v-if="state.errored" class="ion-text-center" id="error">
        <h4>There was an error loading recipe info... Try again later</h4>
        <ion-icon :icon="sadOutline" />
      </div>

      <recipe-overview
        v-else
        :recipe="state.recipe"
        :recipeIngredients="state.recipeIngredients"
        :recipeInstructions="state.recipeInstructions"
        :view="state.view"
      ></recipe-overview>
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
  IonTitle,
  IonBackButton,
  IonLoading,
  toastController,
} from "@ionic/vue";
import {
  heart,
  heartOutline,
  book,
  fish,
  list,
  sadOutline,
} from "ionicons/icons";
import { inject, reactive } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import RecipeOverview from "../components/RecipeOverview.vue";

export default {
  components: {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonLoading,
    RecipeOverview,
  },
  setup() {
    const store = inject("store");
    const route = useRoute();

    const recipeId = route.params.id;

    const state = reactive({
      recipe: {},
      recipeIngredients: [],
      recipeInstructions: [],
      loading: false,
      errored: false,
      favourite: false,
    });

    const getRecipeInfo = () => {
      state.loading = true;
      axios
        .get(
          `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.VUE_APP_API_KEY}`
        )
        .then((data) => {
          state.recipe = data.data;
          state.recipeIngredients = data.data.extendedIngredients;
          state.recipeInstructions = data.data.analyzedInstructions[0];
        })
        .catch((error) => {
          console.log(error);
          state.errored = true;
        })
        .finally(() => {
          state.loading = false;
        });
    };

    async function addToFavorites(recipe) {
      const toast = await toastController.create({
        color: "primary",
        duration: 1000,
        message: "Recipe added to favorites!",
      });

      if (
        store.state.favoriteRecipes.find(
          (favoriteRecipe) => favoriteRecipe.id == recipe.id
        )
      ) {
        store.methods.removeFromFavorites(recipe);
        store.methods.setFavorites();
        toast.message = "Recipe removed from favorites!";
        state.favorite = false;
      } else {
        store.methods.addToFavorites(recipe);
        store.methods.setFavorites();
        toast.message = "Recipe added to favorites!";
        state.favorite = true;
      }

      await toast.present();
    }

    const checkIfFavorite = (recipeId) => {
      if (
        store.state.favoriteRecipes.find(
          (favoriteRecipe) => favoriteRecipe.id == recipeId
        )
      ) {
        state.favorite = true;
      } else {
        state.favorite = false;
      }
    };

    getRecipeInfo();
    checkIfFavorite(recipeId);

    return {
      store,
      state,
      heart,
      heartOutline,
      book,
      fish,
      list,
      sadOutline,
      addToFavorites,
    };
  },
};
</script>

<style scoped>
img {
  width: 100%;
}

ion-icon[slot="end"] {
  margin-inline-end: 20px;
  font-size: 30px;
  color: #ff352e;
}
</style>
