import { createRouter, createWebHistory } from "@ionic/vue-router";
import TabsPage from "../views/TabsPage.vue";

const routes = [
  {
    path: "/",
    redirect: "/tabs/search",
  },
  {
    path: "/tabs/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/tabs/random-recipes",
      },
      {
        path: "search",
        component: () => import("@/views/SearchRecipesPage.vue"),
      },
      {
        path: "random-recipes",
        component: () => import("@/views/RandomRecipesPage.vue"),
      },
      {
        path: "meal-planner",
        component: () => import("@/views/MealPlanPage.vue"),
      },
      {
        path: "favorites",
        component: () => import("@/views/FavoritesPage.vue"),
      },
    ],
  },
  {
    path: "/recipe/:id",
    component: () => import("@/views/RecipeDetailsPage.vue"),
  },
  {
    path: "/ingredient/:id",
    component: () => import("@/views/IngredientDetailsPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
