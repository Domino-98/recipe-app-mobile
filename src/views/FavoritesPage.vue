<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title
          >Favorite recipes ({{ store.state.favoriteRecipes.length }})
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col
            class="ion-col"
            size="12"
            v-for="recipe in store.state.favoriteRecipes"
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
  IonTitle,
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
  onIonViewWillEnter,
} from "@ionic/vue";
import { inject } from "vue";
import RecipeCard from "../components/RecipeCard.vue";

export default {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonCol,
    IonRow,
    RecipeCard,
  },
  setup() {
    const store = inject("store");

    onIonViewWillEnter(() => {
      store.methods.getFavorites();
    });

    return {
      store,
    };
  },
};
</script>

<style scoped>
.ion-col {
  padding: 10px 20px;
}
</style>
