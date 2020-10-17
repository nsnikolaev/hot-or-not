export default { // handmade миксин свайпа, чтобы добавить native js в тестовое задание
  props: [ 'index' ],
  data() {
    return {
      elPhoto: null, // DOM элемент, вклчючающий в себя изображение и кнопки оценки
      elImage: null, // DOM элемент изображения
      mousePositionStart: null,
      mousePositionCurrent: 0,
      isSwiped: false, // происходит ли свайп прямо сейчас
      isLike: false, // свайп результат like
      isDislike: false, // свайп результат вшыlike
    }
  },
  methods: {
    swipeStart(event) {
      if (event.clientX) { // событие от mouse
        this.mousePositionStart = event.clientX
      }
      if (event.changedTouches && event.changedTouches.length > 0) { // событие от touch
        this.mousePositionStart = event.changedTouches[0].clientX
      }
    },
    swipe(event) {
      this.isSwiped = true
      if (event.clientX) { // событие от mouse
        this.mousePositionCurrent = event.clientX
      }
      if (event.changedTouches && event.changedTouches.length > 0) { // событие от touch
        this.mousePositionCurrent = event.changedTouches[0].clientX
      }
      if (this.mousePositionStart !== null) {
        // двигаем блок вслед за мышью
        this.elPhoto.style.marginLeft = `${this.mousePositionCurrent - this.mousePositionStart}px`
      }
    },
    swipeStop() {
      this.isLike = false
      this.isDislike = false
      const shiftInPercent = (this.mousePositionCurrent - this.mousePositionStart) * 100 / this.elPhoto.clientWidth
      this.mousePositionStart = null
      if (shiftInPercent >= 15 && this.isSwiped) {
        this.isLike = true
        this.swipeClearEvents()
      } else if (shiftInPercent <= -15 && this.isSwiped) {
        this.isDislike = true
        this.swipeClearEvents()
      }
      this.isSwiped = false
      this.elPhoto.removeAttribute('style')
      this.mousePositionStart = null
    },
    swipeSetEvents() {
      this.elPhoto.addEventListener('touchstart', this.swipeStart)
      this.elPhoto.addEventListener('touchmove', this.swipe)
      this.elPhoto.addEventListener('touchend', this.swipeStop)
      this.elImage.addEventListener('mousedown', this.swipeStart)
      this.elImage.addEventListener('mouseup', this.swipeStop)
      this.elImage.addEventListener('mousemove', this.swipe)
    },
    swipeClearEvents() {
      this.elPhoto.removeEventListener('touchstart', this.swipeStart)
      this.elPhoto.removeEventListener('touchmove', this.swipe)
      this.elPhoto.removeEventListener('touchend', this.swipeStop)
      this.elImage.removeEventListener('mousedown', this.swipeStart)
      this.elImage.removeEventListener('mouseup', this.swipeStop)
      this.elImage.removeEventListener('mousemove', this.swipe)
    },
  },
  mounted() {
    const id = `photo-${this.index}`
    this.elPhoto = document.querySelector(`#${id}`)
    this.elImage = document.querySelector(`#${id} .image`) // Свайп мышью будет происходить на самом
                                                           // изображении, так как есть еще кнопки
                                                           // Лайк/Дизлайк со своими событиями
    this.swipeSetEvents()
  },
  beforeDestroy() {
    this.swipeClearEvents()
  },
}
