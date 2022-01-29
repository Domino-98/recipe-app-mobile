<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Random recipes</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
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

      <ion-grid>
        <ion-row>
          <ion-col
            class="ion-col"
            size="6"
            v-for="recipe in state.randomRecipes"
            :key="recipe.id"
          >
            <recipe-card :recipe="recipe"></recipe-card>
          </ion-col>
        </ion-row>
      </ion-grid>

      <!-- <recipes-list :recipes="state.randomRecipes"></recipes-list> -->

      <ion-infinite-scroll
        v-if="!state.errored"
        @ionInfinite="loadRecipes($event)"
        threshold="50px"
        id="infinite-scroll"
        :disabled="isDisabled"
      >
        <ion-infinite-scroll-content
          loading-spinner="bubbles"
          loading-text="Loading another recipes..."
        >
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLoading,
  IonRefresher,
  IonRefresherContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
import { sadOutline } from "ionicons/icons";
import { reactive } from "vue";
import axios from "axios";
import RecipeCard from "../components/RecipeCard.vue";

export default {
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonLoading,
    IonRefresher,
    IonRefresherContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonGrid,
    IonRow,
    IonCol,
    RecipeCard,
  },
  setup() {
    const state = reactive({
      randomRecipes: [],
      loading: false,
      errored: false,
    });

    const getRandomRecipes = () => {
      state.loading = true;
      axios
        .get(
          `https://api.spoonacular.com/recipes/random?apiKey=${process.env.VUE_APP_API_KEY}&number=32`
        )
        .then((data) => {
          state.randomRecipes = data.data.recipes;
        })
        .catch((error) => {
          console.log(error);
          state.errored = true;
        })
        .finally(() => {
          state.loading = false;
        });
    };

    const pushData = () => {
      axios
        .get(
          `https://api.spoonacular.com/recipes/random?apiKey=${process.env.VUE_APP_API_KEY}&number=16`
        )
        .then((data) => {
          state.randomRecipes.push(...data.data.recipes);
        });
    };

    const loadRecipes = (ev) => {
      pushData();
      setTimeout(() => {
        pushData();
        ev.target.complete();
        if (state.randomRecipes.length == 300) {
          ev.target.disabled = true;
        }
      }, 1000);
    };

    const doRefresh = (ev) => {
      getRandomRecipes();
      setTimeout(() => {
        ev.target.complete();
      }, 2000);
    };

    getRandomRecipes();

    return {
      state,
      loadRecipes,
      doRefresh,
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
