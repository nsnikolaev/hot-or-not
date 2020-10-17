<template>
  <!--
    Компоненты, относящиеся к PhotoSelector, лежат в одноименной папке и могут включать в себя
    переиспользуемые элементы (кнопки, инпуты...) из папки '@/elements'.
    Структура папок соответствует стркутуре вложенности компонентов, чтобы быстрее
    ориентироваться кто есть родитель, кто наследник.
    Файловая структура вложенности компонентов должна содержать все компоненты приложения,
    в которые включаются переиспользуемые элементы.
  -->

  <div class="cPhoto _fullsize" :id="`photo-${index}`" :class="{like: isLike, dislike: isDislike}" v-cloak>
    <div class="image _fullsize" :style="{ backgroundImage: `url(${url})` }"></div>
    <!--cSelector @like="like" @dislike="dislike" /-->

    <div class="selector">
    <div class="selector-wrap">
      <div class="selector-item">
        <div class="selector-item-wrap button-like" @mousedown="dislike">
          <eButtonsRate type="dislike" />
        </div>
      </div>
      <div class="selector-item">
        <div class="selector-item-wrap button-dislike" @mousedown="like">
          <eButtonsRate type="like" />
        </div>
      </div>
    </div>
  </div>

  </div>

</template>

<script>
import eButtonsRate from '@/elements/eButtonsRate.vue'

import mSwipe from '../../mixins/swipe'

export default {
  name: 'cPhoto',
  props: [ 'index', 'url' ],
  mixins: [ mSwipe ],
  data() {
    return {
      buttonLike: null,
      buttonDislike: null,
      isLike: false,
      isDislike: false,
    }
  },
  components: {
    eButtonsRate,
  },
  methods: {
    like() {
      if (this.isLike === false && this.isDislike === false) {
        this.isLike = true
      }
    },
    dislike() {
      if (this.isLike === false && this.isDislike === false) {
        this.isDislike = true
      }
    },
    setEvents() {
      this.buttonLike.addEventListener('mousedown', this.like)
      this.buttonDislike.addEventListener('mousedown', this.dislike)
    },
    cliarEvents() {
      this.buttonLike.removeEventListener('mousedown', this.like)
      this.buttonDislike.removeEventListener('mousedown', this.dislike)
    },
  },
  watch: {
    isLike(status) {
      if (status) {
        setTimeout(() => { // дожидаемся завершения анимации
          this.$store.dispatch('cPhotoSelector/shift')
          this.$emit('solved', true) // оповестить родителя о сделанном выборе
                                    // TODO: добавить id изображения, пока что его нет
        }, 400)
      }
    },
    isDislike(status) {
      if (status) {
        setTimeout(() => { // дожидаемся завершения анимации
          this.$store.dispatch('cPhotoSelector/shift')
          this.$emit('solved', false) // оповестить родителя о сделанном выборе
                                      // TODO: добавить id изображения, пока что его нет
        }, 400)
      }
    },
  },
  mounted() {
    this.buttonLike = document.querySelector('.button-like')
    this.buttonDislike = document.querySelector('.button-dislike')
    this.setEvents()
  },
  beforeDestroy() {
    this.cliarEvents()
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/custom.scss';

.cPhoto {
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  margin-left: 0;
  transition: 0.1s;

  .image {
    background-position: center center;
    background-size: cover;
  }

  .selector {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: $selector-height;

    .selector-wrap {
      display: grid;
      grid-template-columns: 50% 50%;
      
      .selector-item {
        text-align: center;
        vertical-align: middle;

        .selector-item-wrap {
          display: inline-block;
          width: $selector-button-size;
          height: $selector-button-size;
          cursor: pointer;
        }
      }
    }
  }
}
.cPhoto.like { /* класс like анимирует "уход" оцененного блока с фотографией вправо */
  margin-left: 100%;
  transition: 0.4s;
}
.cPhoto.dislike { /* класс like анимирует "уход" оцененного блока с фотографией влево */
  margin-left: -100%;
  transition: 0.4s;
}
</style>
