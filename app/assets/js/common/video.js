import videojs from 'video.js'

export default class Video {
  constructor() {
    this.events()
  }

  playVideo() {
    let playerID = this.id;

    videojs(playerID).ready(function () {
      let myPlayer = this;
      myPlayer.play();
      myPlayer.bigPlayButton.hide();
    });

  }

  pauseVideo() {
    let playerID = this.id;

    videojs(playerID).ready(function () {
      let myPlayer = this;
      myPlayer.pause();
      myPlayer.bigPlayButton.show();
    });

  }

  posterPlay() {
    let playerID = this.previousSibling.previousSibling.id;

    videojs(playerID).ready(function () {
      let myPlayer = videojs(playerID);
      myPlayer.play();
      myPlayer.bigPlayButton.hide(); 
    });
  }

  events() {
    let elements = document.getElementsByTagName("video");

    for (let i = 0; i < elements.length; i++) {
      let playerID = elements[i].id;
      let thePlayer = videojs(playerID);
      elements[i].addEventListener("mouseover", this.playVideo, false);
      elements[i].addEventListener("mouseout", this.pauseVideo, false);

      let thePoster = elements[i].nextSibling.nextSibling;
      thePoster.addEventListener("mouseover", this.posterPlay, false);
    }
  }
}
