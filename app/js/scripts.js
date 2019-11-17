document.addEventListener("DOMContentLoaded", function() {
  if (document.querySelectorAll(".slid").length > 0) {
    $(".slid").slick({
      // slidesToShow: 3,
      // slidesToScroll: 3,
      // dots: true,
      adaptiveHeight: true,
      infinite: true,
      nextArrow: '<img class="prev" src="../img/home/back.svg" alt="">',
      prevArrow: '<img class="next" src="../img/home/next.svg" alt="">',
      cssEase: "linear"
    });
  }
  document.querySelectorAll(".release .wrapper > .block").forEach(e => {
    if (e.outerHTML.includes("h3")) {
      var arr = [].slice.call(e.children);
      let div = [];
      let h3 = [];
      arr.forEach(elm => {
        // console.log(elm)
        if (elm.classList[0] == "line") div.push(elm);
        if (elm.tagName == "H3") h3.push(elm);
      });
      // console.log(div,h3)
      div.forEach(doin => {
        let h = getComputedStyle(h3[0]);
        let widthH = h.width.split("px")[0];
        let procent = (100 * widthH) / e.offsetWidth;
        // console.log(h.width.split("px")[0]);
        doin.style.width = `${(100 - procent) / 2 - 6}%`;
      });
    }
  });
});
