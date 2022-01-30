<template>
  <ion-card>
    <img
      :src="`https://spoonacular.com/cdn/ingredients_500x500/${ingredient.image}`"
    />
    <ion-card-header>
      <ion-card-title>{{ ingredient.name }}</ion-card-title>
      <ion-card-subtitle
        >Nutrients ({{ ingredientWeight.amount }}{{ ingredientWeight.unit }} per
        serving):</ion-card-subtitle
      >
    </ion-card-header>
    <ion-card-content>
      <ion-list v-for="nutrient in ingredientNutrients" :key="nutrient.title">
        <ion-item>
          <ion-label>{{ nutrient.name }}</ion-label>
          <p slot="end">
            <b>{{ nutrient.amount }} {{ nutrient.unit }}</b>
          </p>
        </ion-item>
      </ion-list>
    </ion-card-content>
  </ion-card>
</template>

<script>
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/vue";

export default {
  props: ["ingredient", "ingredientNutrients", "ingredientWeight"],
  components: {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonList,
    IonItem,
    IonLabel,
  },
};
</script>
