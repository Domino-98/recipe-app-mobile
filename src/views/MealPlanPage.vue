<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-searchbar
          data-cy="generateMealPlan"
          @change="state.targetCalories = $event.target.value"
          @keyup.enter="generateMealPlan"
          placeholder="Calorie intake (e.g. 2000)"
        >
        </ion-searchbar>
        <ion-buttons slot="end">
          <ion-button id="trigger-button">
            <ion-icon slot="icon-only" :icon="optionsOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-popover trigger="trigger-button">
        <ion-content>
          <ion-radio-group
            :value="state.dietType"
            @ionFocus="changeDietType($event)"
          >
            <ion-list-header>
              <ion-label>Type of your diet ("All" is default)</ion-label>
            </ion-list-header>

            <ion-item>
              <ion-label>Gluten free</ion-label>
              <ion-radio
                slot="start"
                value="glutenFree"
                color="primary"
              ></ion-radio>
            </ion-item>

            <ion-item>
              <ion-label>Ketogenic</ion-label>
              <ion-radio
                slot="start"
                value="ketogenic"
                color="secondary"
              ></ion-radio>
            </ion-item>

            <ion-item>
              <ion-label>Vegetarian</ion-label>
              <ion-radio
                slot="start"
                value="vegetarian"
                color="tertiary"
              ></ion-radio>
            </ion-item>

            <ion-item>
              <ion-label>All</ion-label>
              <ion-radio slot="start" value="" color="dark"></ion-radio>
            </ion-item>
          </ion-radio-group>
        </ion-content>
      </ion-popover>

      <ion-loading
        :is-open="state.loading"
        cssClass="my-custom-class"
        message="Generating recipes..."
      >
      </ion-loading>

      <div v-if="state.errored" class="ion-text-center" id="error">
        <h4>There was an error generating recipes... Try again later</h4>
        <ion-icon :icon="sadOutline" />
      </div>

      <ion-segment
        @ionChange="changeTimeFrame($event)"
        :value="state.timeFrame"
      >
        <ion-segment-button value="day" data-cy="day">
          <ion-label>Daily</ion-label>
        </ion-segment-button>
        <ion-segment-button value="week" data-cy="week">
          <ion-label>Weekly</ion-label>
        </ion-segment-button>
      </ion-segment>

      <div v-if="state.timeFrame === 'week' && store.state.mealPlanWeekly">
        <ion-accordion-group
          v-for="(dayOfWeek, name) in store.state.mealPlanWeekly.week"
          :key="dayOfWeek"
        >
          <ion-accordion value="colors" :toggle-icon="arrowDownCircle">
            <ion-item slot="header">
              {{ name.toUpperCase() }}
            </ion-item>

            <div slot="content">
              <ion-accordion-group>
                <ion-accordion value="colors">
                  <ion-item slot="header">
                    <ion-label>Nutrients:</ion-label>
                  </ion-item>

                  <ion-list slot="content">
                    <ion-item>
                      <ion-label>Calories:</ion-label>
                      <p slot="end">
                        <b>{{ dayOfWeek.nutrients.calories }}</b>
                      </p>
                    </ion-item>
                    <ion-item>
                      <ion-label>Protein:</ion-label>
                      <p slot="end">
                        <b>{{ dayOfWeek.nutrients.protein }}</b>
                      </p>
                    </ion-item>
                    <ion-item>
                      <ion-label>Fat:</ion-label>
                      <p slot="end">
                        <b>{{ dayOfWeek.nutrients.fat }}</b>
                      </p>
                    </ion-item>
                    <ion-item>
                      <ion-label>Carbohydrates:</ion-label>
                      <p slot="end">
                        <b>{{ dayOfWeek.nutrients.carbohydrates }}</b>
                      </p>
                    </ion-item>
                  </ion-list>
                </ion-accordion>
              </ion-accordion-group>
              <recipes-list :recipes="dayOfWeek.meals"></recipes-list>
            </div>
          </ion-accordion>
        </ion-accordion-group>
      </div>

      <div
        v-else-if="
          state.timeFrame === 'day' &&
          store.state.mealPlanDaily &&
          store.state.mealPlanDaily.nutrients
        "
      >
        <ion-accordion-group>
          <ion-accordion value="colors">
            <ion-item slot="header">
              <ion-label>Nutrients:</ion-label>
            </ion-item>

            <ion-list
              slot="content"
              v-for="(nutrient, name) in store.state.mealPlanDaily.nutrients"
              :key="nutrient"
            >
              <ion-item>
                <ion-label
                  >{{
                    name.charAt(0).toUpperCase() + name.slice(1)
                  }}:</ion-label
                >
                <p slot="end">
                  <b>{{ nutrient }}</b>
                </p>
              </ion-item>
            </ion-list>
          </ion-accordion>
        </ion-accordion-group>
        <recipes-list :recipes="store.state.mealPlanDaily.meals"></recipes-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonSearchbar,
  IonContent,
  IonItem,
  IonSegment,
  IonSegmentButton,
  IonButtons,
  IonButton,
  IonIcon,
  IonPopover,
  IonListHeader,
  IonRadio,
  IonRadioGroup,
  IonLabel,
  IonLoading,
  IonAccordion,
  IonAccordionGroup,
  onIonViewWillEnter,
} from "@ionic/vue";
import { sadOutline } from "ionicons/icons";
import axios from "axios";
import { inject } from "vue";
import { optionsOutline, arrowDownCircle } from "ionicons/icons";
import { reactive } from "vue";
import RecipesList from "../components/RecipesList.vue";

export default {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonSearchbar,
    IonContent,
    IonItem,
    IonSegment,
    IonSegmentButton,
    IonButtons,
    IonButton,
    IonIcon,
    IonPopover,
    IonListHeader,
    IonRadio,
    IonRadioGroup,
    IonLabel,
    IonLoading,
    IonAccordion,
    IonAccordionGroup,
    RecipesList,
  },
  setup() {
    const store = inject("store");

    const state = reactive({
      searched: false,
      loading: false,
      errored: false,
      dietType: "",
      timeFrame: "day",
      targetCalories: 2500,
    });

    const generateMealPlan = () => {
      state.loading = true;
      axios
        .get(
          `https://api.spoonacular.com/mealplanner/generate?timeFrame=${state.timeFrame}&diet=${state.dietType}&targetCalories=${state.targetCalories}&apiKey=${process.env.VUE_APP_API_KEY}`
        )
        .then((data) => {
          if (state.timeFrame === "day") {
            store.state.mealPlanDaily = data.data;
            store.methods.setMealPlan("day");
          } else {
            store.state.mealPlanWeekly = data.data;
            store.methods.setMealPlan("week");
          }
        })
        .catch((error) => {
          console.log(error);
          state.errored = true;
        })
        .finally(() => {
          state.loading = false;
        });
    };

    const changeDietType = (ev) => {
      state.dietType = ev.target.value;
    };

    const changeTimeFrame = (ev) => {
      state.timeFrame = ev.target.value;
    };

    onIonViewWillEnter(() => {
      store.methods.getMealPlans();
    });

    return {
      store,
      state,
      optionsOutline,
      arrowDownCircle,
      changeDietType,
      changeTimeFrame,
      generateMealPlan,
      sadOutline,
    };
  },
};
</script>
