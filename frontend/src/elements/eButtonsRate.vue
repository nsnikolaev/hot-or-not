<template>
  <!--
    Библиотека с кнопками оценки фотографий
  -->
  <div class="eButtonsRate">
    <img v-if="type === 'like'" src="@/assets/images/like.svg">
    <img v-if="type === 'dislike'" src="@/assets/images/dislike.svg">
  </div>
</template>

<script>
export default {
  name: 'eButtonsRate',
  props: [ 'type' ],
}
</script>

<style lang="scss">
.eButtonsRate {

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
