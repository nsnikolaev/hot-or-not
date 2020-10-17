<template>
  <div class="PhotoSelector">
    <div class="photos-wrap">

      <div v-if="canRestart" class="_fullsize">
        <button class="button-restart" @click="restart">Запустить снова...</button>
      </div>
      
      <cPhoto v-for="(url, index) in photoListReversed()" :key="`photo-${index}`"
        :index="index" :url="url" @solved="solved"/>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import cPhoto from './PhotoSelector/cPhoto.vue'

export default {
  name: 'PhotoSelector',
  data() {
    return {
      canRestart: false, // для отображения кнопки перезагрузки
    }
  },
  components: {
    cPhoto,
  },
  computed: {
    ...mapState('cPhotoSelector', [
      'photoList',
    ]),
  },
  methods: {
    photoListReversed() {
      return [...this.photoList].reverse()
    },
    solved(status) {
      // TODO: перинять id изображения
      // TODO: сообщить id и status [ like / dislike ] на backend
    },
    restart() {
      this.$store.dispatch('cPhotoSelector/restart')
    },
  },
  watch: {
    photoList: {
      handler(list) {
        if (list.length > 0) {
          this.canRestart = true
        }
      },
      immediate: true,
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/custom.scss';

.PhotoSelector {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  padding: $header-height 0 0 0;
  box-sizing: border-box;

  @include mediaTablet;

  .photos-wrap {
    position: absolute;
    top: $header-height;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .button-restart {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 14em;
    height: 3em;
    margin: -1.5em 0 0 -7em;
  }
}
</style>
