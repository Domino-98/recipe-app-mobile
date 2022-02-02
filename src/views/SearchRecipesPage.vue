<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-searchbar
          data-cy="searchByIngredients"
          @change="state.searchedIngredients = $event.target.value"
          @keyup.enter="searchRecipes"
          placeholder="Search recipes by ingredients"
        ></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-card v-if="!state.searched">
        <img src="../../public/assets/meal-image.jpg" />
        <ion-card-header>
          <ion-card-title class="ion-text-center"
            >Welcome to Recipe App</ion-card-title
          >
        </ion-card-header>
        <ion-card-content class="ion-text-justify">
          With this app, you can search recipes by ingredients (with details
          about each recipe/ingredient), generate daily/weekly meal plans based
          on calories and diet type or display random recipes. You can also add
          recipes to favorites and share them with your friends.
          <!-- Witaj w aplikacji kulinarnej Recipe App. Dzięki tej
          aplikacji możesz wyszukiwać przepisy kulinarne wg składników (wraz ze
          szczegółami na temat danego przepisu oraz użytych składników),
          generować dzienny lub tygodniowy plan posiłków wg kalorii oraz
          wyświetlać losowe przepisy. Przepisy można dodawać do ulubionych i
          udostępniać znajomym. Obsługiwany język: Angielski. -->
        </ion-card-content>
      </ion-card>

      <ion-loading
        :is-open="state.loading"
        cssClass="my-custom-class"
        message="Loading recipes..."
      >
      </ion-loading>

      <div v-if="state.errored" class="ion-text-center" id="error">
        <h4>There was an error loading recipes... Try again later</h4>
        <ion-icon :icon="sadOutline" />
      </div>

      <div
        v-else-if="
          state.searched && !state.loading && state.searchedRecipes.length == 0
        "
        class="ion-text-center"
        id="error"
      >
        <h4>Recipes with given ingredients not found</h4>
        <ion-icon :icon="sadOutline" />
      </div>

      <!-- <recipes-list :recipes="state.searchedRecipes"></recipes-list> -->

      <ion-grid>
        <ion-row>
          <ion-col
            class="ion-col"
            size="6"
            v-for="recipe in state.searchedRecipes"
            :key="recipe.id"
          >
            <recipe-card :recipe="recipe"></recipe-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonSearchbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
  IonLoading,
} from "@ionic/vue";
import { sadOutline } from "ionicons/icons";
import { reactive } from "vue";
import axios from "axios";
import RecipeCard from "../components/RecipeCard.vue";

export default {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonSearchbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonContent,
    IonLoading,
    IonGrid,
    IonCol,
    IonRow,
    RecipeCard,
  },
  setup() {
    const state = reactive({
      searchedRecipes: [],
      searchedIngredients: "",
      searched: false,
      loading: false,
      errored: false,
    });

    const searchRecipes = () => {
      state.loading = true;
      axios
        .get(
          `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${state.searchedIngredients}&number=50&apiKey=${process.env.VUE_APP_API_KEY}`
        )
        .then((data) => {
          state.searchedRecipes = data.data;
        })
        .catch((error) => {
          console.log(error);
          state.errored = true;
        })
        .finally(() => {
          state.loading = false;
          state.searched = true;
        });
    };

    return {
      state,
      searchRecipes,
      sadOutline,
    };
  },
};
</script>

<style scoped>
.ion-col {
  padding: 10px 7.5px;
}
</style>
