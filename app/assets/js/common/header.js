import $ from 'jquery'

export default class Header {
  constructor() {
    this.events()
  }

  events() {
    $('.btn_menu--open').on('click', (e) => {
      $('body').addClass('menu_active');
    })
    $('.btn_menu--close').on('click', (e) => {
      $('body').removeClass('menu_active');
    })
  }
}
