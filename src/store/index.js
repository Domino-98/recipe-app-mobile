import { Storage } from "@capacitor/storage";
import { reactive } from "vue";

const state = reactive({
  mealPlanDaily: [],
  mealPlanWeekly: [],
  favoriteRecipes: [],
});

const methods = {
  addToFavorites(recipe) {
    state.favoriteRecipes.unshift(recipe);
  },
  removeFromFavorites(recipe) {
    const foundIndex = state.favoriteRecipes.findIndex(
      (item) => item.id === recipe.id
    );
    state.favoriteRecipes.splice(foundIndex, 1);
  },
  setFavorites: async () => {
    const favorites = JSON.stringify(state.favoriteRecipes);
    await Storage.set({
      key: "favorites",
      value: favorites,
    });
  },
  getFavorites: async () => {
    const favorites = await Storage.get({ key: "favorites" });
    state.favoriteRecipes = JSON.parse(favorites.value);
  },
  setMealPlan: async (timeFrame) => {
    const mealPlanDaily = JSON.stringify(state.mealPlanDaily);
    const mealPlanWeekly = JSON.stringify(state.mealPlanWeekly);
    if (timeFrame === "day") {
      await Storage.set({
        key: "mealPlanDaily",
        value: mealPlanDaily,
      });
    } else {
      await Storage.set({
        key: "mealPlanWeekly",
        value: mealPlanWeekly,
      });
    }
  },
  getMealPlans: async () => {
    const mealPlanDaily = await Storage.get({ key: "mealPlanDaily" });
    const mealPlanWeekly = await Storage.get({ key: "mealPlanWeekly" });
    state.mealPlanDaily = JSON.parse(mealPlanDaily.value);
    state.mealPlanWeekly = JSON.parse(mealPlanWeekly.value);
  },
};

export default {
  state,
  methods,
};
