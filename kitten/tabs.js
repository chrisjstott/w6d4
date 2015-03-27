
$.Carousel = function(el) {
  this.$el = $(el);
  this.$allImages = this.$el.find(".items").children();
  this.activeIdx = 0;
  this.bindEvents();
  this.transitioning = false;
};

$.Carousel.prototype.bindEvents = function() {
  this.$el.on("click", "a", function(event) {
    var $activeLink = $(event.currentTarget);
    if ($activeLink.attr("class") === "slide-left") {
      this.slideLeft();
    } else {
      this.slideRight();
    }
  }.bind(this));
};

$.Carousel.prototype.slide = function(dir) {
  if (this.transitioning === true) {
    return;
  }
  this.transitioning = true;
  var $currentImg = this.$allImages.eq(this.activeIdx);
  this.activeIdx = (this.activeIdx + dir) % this.$allImages.length;
  var $newImage = this.$allImages.eq(this.activeIdx);

  // $currentImg.removeClass("active");


  if (dir === 1) {
    $currentImg.addClass("right");
    $newImage.addClass("left");
  } else {
    $currentImg.addClass("left");
    $newImage.addClass("right");
  }

  $newImage.addClass("active");
  setTimeout(function () {
    $newImage.removeClass('left right');
  }, 0);

  var that = this;

  $currentImg.one("transitionend", function() {
    $currentImg.removeClass("active left right");
    that.transitioning = false;
  });

};

$.Carousel.prototype.slideLeft = function() {
  this.slide(1);
};

$.Carousel.prototype.slideRight = function() {
  this.slide(-1);
};

$.fn.carousel = function () {
  return this.each(function () {
    new $.Carousel(this);
  });
};
