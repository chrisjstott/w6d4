$.Tabs = function (el) {
  this.$el = $(el);
  this.$contentTabs = $(this.$el.data("content-tabs"));
  this.$activeTab = this.$contentTabs.find(".active");
  this.clickTab();
 };

$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });
};

$.Tabs.prototype.clickTab = function() {

  var that = this;
  $('ul.tabs').on("click", 'li', function(event) {
    event.preventDefault();
    var old = that.$activeTab.addClass("transitioning");
    that.$contentTabs.children().removeClass("active");
    that.$el.children().children().removeClass("active");
    var $clickedLink = $(event.target);
    $clickedLink.addClass("active");
    var href = $clickedLink.attr('href');

    that.$activeTab = that.$contentTabs.find(href);
    old.one("transitionend", function(event) {
      old.removeClass("transitioning");
      that.$activeTab.addClass("transitioning");
      setTimeout(function () {
        that.$activeTab.removeClass("transitioning");
        that.$activeTab.addClass("active");
      }, 0);
    });
  });
};
