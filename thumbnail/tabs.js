$.fn.thumbnails = function() {
  return this.each(function() {
    new $.Thumbnail(this);
  });
};

$.Thumbnail = function(el) {
  this.$el = $(el);
  this.$gutterImages = this.$el.find(".gutter-images").children();
  this.$images = this.$el.find(".gutter-images").children();
  this.$activeImage = this.$gutterImages.eq(0);
  this.activateImage(this.$activeImage);
  this.bindEvent();
  this.gutterIdx = 1;
  this.fillGutterImages();
};

$.Thumbnail.prototype.activateImage = function($img) {
  var $imgSrc = $img.attr("src");
  $(".active").html(" ");
  $(".active").append("<img>");
  this.$el.find(".active").children().attr("src", $imgSrc);
};

$.Thumbnail.prototype.bindEvent = function() {
  var fn = this;
  this.$el.on('click', 'img', function(event) {
    var $clickedImage = $(event.currentTarget);
    fn.$activeImage = $clickedImage;
    fn.activateImage($clickedImage);
  });

  this.$el.on('mouseenter', 'img', function(event) {
    var $hoverImage = $(event.currentTarget);
    fn.activateImage($hoverImage);
  });

  this.$el.on('mouseleave', 'img', function() {
    fn.activateImage(fn.$activeImage);
  });
};

$.Thumbnail.prototype.fillGutterImages = function() {
  this.$gutterImages = $();
  $(".gutter-images").html(" ");
  for (var i = this.gutterIdx; i < this.gutterIdx + 5; i++) {
    this.$gutterImages.push(this.$images[i]);
    $(".gutter-images").append(this.$gutterImages);
  }

};
