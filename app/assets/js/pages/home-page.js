import $ from 'jquery'

export default class AboutUs {
  constructor() {
    this.events()
  }

  events() {
    $('.btn_menu').on('click', (e) => {
      $(e.currentTarget).toggleClass('active');
    })
  }
}
