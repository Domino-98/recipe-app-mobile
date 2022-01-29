<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent, provide } from "vue";
import store from "@/store";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
  setup() {
    provide("store", store);
  },
});
</script>

<style>
#error {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: #3f3f3f;
}

#error ion-icon {
  color: #ff511c;
  font-size: 32px;
}
</style>
