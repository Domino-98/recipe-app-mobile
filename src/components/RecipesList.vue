<template>
  <ion-list v-if="recipes">
    <recipe-list-item
      v-for="recipe in recipes"
      :key="recipe.id"
      :recipe="recipe"
    ></recipe-list-item>
  </ion-list>
</template>

<script>
import { IonList } from "@ionic/vue";
import RecipeListItem from "../components/RecipeListItem.vue";

export default {
  components: {
    IonList,
    RecipeListItem,
  },
  props: ["recipes"],
  setup() {},
};
</script>
