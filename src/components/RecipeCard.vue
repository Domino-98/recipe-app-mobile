<template>
  <router-link :to="`/recipe/${recipe.id}`">
    <div
      class="img-wrapper"
      :style="{
        backgroundImage: `url(https://spoonacular.com/recipeImages/${recipe.id}-636x393.jpg)`,
      }"
    >
      <div class="img-content">
        <h2 class="img-title">{{ recipe.title }}</h2>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ["recipe"],
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Merienda&display=swap");

.img-wrapper {
  position: relative;
  min-height: 150px;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  border-radius: 12px;
  overflow: hidden;
}

.img-content {
  position: absolute;
  width: 100%;
  bottom: 0;
  backdrop-filter: blur(3px);
  background: rgba(0, 0, 0, 0.6);
}

.img-title {
  margin: 0;
  padding: 10px 20px;
  font-family: "Merienda", cursive;
  font-size: 14px;
  color: #eee;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
