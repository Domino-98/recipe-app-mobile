<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/search" data-cy="searchTab">
          <ion-icon :icon="search" />
          <ion-label>Search</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="tab2"
          href="/tabs/random-recipes"
          data-cy="randomTab"
        >
          <ion-icon :icon="shuffle" />
          <ion-label>Random recipes</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="tab3"
          href="/tabs/meal-planner"
          data-cy="mealPlanTab"
        >
          <ion-icon :icon="calendarClearOutline" />
          <ion-label>Meal planner</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="tab4"
          href="/tabs/favorites"
          data-cy="favoritesTab"
        >
          <ion-icon :icon="heart" />
          <ion-label>Favorites</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonRouterOutlet,
} from "@ionic/vue";
import { search, shuffle, heart, calendarClearOutline } from "ionicons/icons";

export default {
  components: {
    IonPage,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonRouterOutlet,
  },
  setup() {
    return {
      search,
      shuffle,
      heart,
      calendarClearOutline,
    };
  },
};
</script>
