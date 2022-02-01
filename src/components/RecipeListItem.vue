<template>
  <ion-item :router-link="`/recipe/${recipe.id}`">
    <ion-thumbnail slot="start">
      <img
        :src="`https://spoonacular.com/recipeImages/${recipe.id}-240x150.jpg`"
      />
    </ion-thumbnail>
    <ion-label>{{ recipe.title }}</ion-label>
  </ion-item>
</template>

<script>
import { IonItem, IonThumbnail, IonLabel } from "@ionic/vue";

export default {
  components: {
    IonItem,
    IonThumbnail,
    IonLabel,
  },
  props: ["recipe"],
  setup() {},
};
</script>

<style scoped>
ion-thumbnail {
  width: 75px;
  height: 75px;
}

img {
  border-radius: 5px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}
</style>
