<template>
  <ion-card>
    <img
      :src="`https://spoonacular.com/recipeImages/${recipe.id}-636x393.jpg`"
    />
    <ion-segment color="tertiary" @ionChange="changeView($event)" :value="view">
      <ion-segment-button value="details">
        <ion-label>Details</ion-label>
        <ion-icon :icon="book"></ion-icon>
      </ion-segment-button>
      <ion-segment-button value="ingredients">
        <ion-label>Ingredients</ion-label>
        <ion-icon :icon="fish"></ion-icon>
      </ion-segment-button>
      <ion-segment-button value="steps">
        <ion-label>Steps</ion-label>
        <ion-icon :icon="list"></ion-icon>
      </ion-segment-button>
    </ion-segment>

    <div v-if="view === 'details'">
      <ion-card-header>
        <ion-card-title>{{ recipe.title }}</ion-card-title>
        <ion-card-subtitle
          >Ready in <b>{{ recipe.readyInMinutes }} minutes</b>, Number of
          servings: <b>{{ recipe.servings }}</b></ion-card-subtitle
        >
      </ion-card-header>
      <ion-card-content v-if="recipe.diets && recipe.diets.length > 0">
        <p>Types of diet:</p>
        <ion-list v-for="diet in recipe.diets" :key="diet.id">
          <ion-item>
            <ion-label>{{ diet }}</ion-label>
          </ion-item>
        </ion-list>
      </ion-card-content>
    </div>

    <div v-else-if="view === 'ingredients'">
      <ion-card-content>
        <p>Used ingredients:</p>
        <ion-list v-for="ingredient in recipeIngredients" :key="ingredient.id">
          <ion-item
            v-if="ingredient.image"
            :router-link="`/ingredient/${ingredient.id}`"
          >
            <ion-thumbnail slot="start">
              <img
                :src="`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`"
              />
            </ion-thumbnail>
            <ion-label>{{ ingredient.nameClean }}</ion-label>
          </ion-item>
        </ion-list>
      </ion-card-content>
    </div>

    <div v-else-if="view === 'steps'">
      <ion-card-content>
        <p>Instructions:</p>
        <div v-if="recipeInstructions.steps">
          <ion-list v-for="step in recipeInstructions.steps" :key="step.number">
            <ion-item>{{ step.step }}</ion-item>
          </ion-list>
        </div>
      </ion-card-content>
    </div>
  </ion-card>
  <ion-button expand="full" @click.prevent="shareRecipe"
    ><ion-icon slot="start" :icon="shareOutline"></ion-icon>Share
    recipe</ion-button
  >
</template>

<script>
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonList,
  IonItem,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonThumbnail,
} from "@ionic/vue";
import { ref } from "vue";
import { book, fish, list, shareOutline } from "ionicons/icons";
import { Share } from "@capacitor/share";

export default {
  props: ["recipe", "recipeIngredients", "recipeInstructions"],
  components: {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonList,
    IonItem,
    IonLabel,
    IonSegment,
    IonSegmentButton,
    IonThumbnail,
  },
  setup(props) {
    const view = ref("details");

    const changeView = (ev) => {
      view.value = ev.target.value;
    };

    const shareRecipe = async () => {
      await Share.share({
        title: `${props.recipe.title}`,
        text: `That sounds delicious! Check out this recipe!`,
        url: `${props.recipe.sourceUrl}`,
        dialogTitle: "Share recipe with friends",
      });
    };

    return {
      view,
      changeView,
      shareRecipe,
      book,
      fish,
      list,
      shareOutline,
    };
  },
};
</script>

<style scoped>
ion-thumbnail {
  width: 40px;
  height: 40px;
}
</style>
