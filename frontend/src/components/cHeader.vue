<template>
  <div class="Header">
    <img class="logo" src="../assets/images/logo.svg">
  </div>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style lang="scss">
@import '@/assets/scss/custom.scss';

.Header {
  /* 
    Название класса родительского элемента всегда совпадает с названием компонента
    для целей быстрого ориентирования в DOM в браузере (определение какой именно компонент
    отвечает за какой-либо конретный элемент DOM)
  */
  position: fixed;
  width: 100%;
  height: $header-height;
  line-height: $header-height;
  padding: 0 1em;
  background: #518a42;
  border-bottom: 1px solid #ffffff;
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.5);

  @include mediaTablet;

  .logo {
    height: 1.8em;
    vertical-align: middle;
  }
}
</style>
