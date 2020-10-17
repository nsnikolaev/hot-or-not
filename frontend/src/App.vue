<template>
  <div id="app">
    <!--
      Основную разметку поместил в root компоненте, не вынося ее в отдельный layout,
      так как на в данный момент мне не известно какие другие layout могут быть в проекте
      и не понятна логика их взаимодействия друг с другом.
    -->

    <!-- TODO: реализовать фиксированную максимальную ширину контента на широких экранах -->

    <cPhotoSelector /> <!-- Подключается первым, чтобы оказаться под box-shadows
                            cHeader компонента. Разметку можно решить как угодно,
                            для скорости выполнения тестового задания этот вопрос
                            не прорабатывал, при необходимости исправлю. -->
    <cHeader /><!-- Использую CamelCase для целей молниеносного рефакторинга
                    (переименование компонента в частности).
                    Из опыта C++ подхода в названиях использую префиксы,
                    чтобы определять, является ли компонент компонентом 'c...'
                    или переиспользуемым элементом 'e...' -->

  </div>
</template>

<script>
import { mapState } from 'vuex'

import cHeader from './components/cHeader.vue'
import cPhotoSelector from './components/cPhotoSelector.vue'

export default {
  name: 'App',
  components: {
    cHeader,
    cPhotoSelector,
  },
  computed: {
    ...mapState('cPhotoSelector', [
      'photoList',
    ]),
  },
  created() {
    if (this.photoList.length === 0) { // не производить загрузку при смене ориентации экрана
      this.$store.dispatch('cPhotoSelector/fetch')
    }
  },
}
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  font-size: 20px; /* задается с целей использования единиц 'em' для адаптивности верстки */
  background: #aab0f3;
  background: linear-gradient(#aab0f3, #4d5177);
}
</style>
