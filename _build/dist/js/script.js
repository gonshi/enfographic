var Main;

Main = (function() {
  function Main() {
    var i, j, ref;
    this.$firstview = [];
    for (i = j = 0, ref = $(".firstview").size(); 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      this.$firstview.push($(".firstview").filter("[data-id=\"" + (i + 1) + "\"]"));
    }
    window.DUR = 500;
    this.exec();
  }

  Main.prototype.exec = function() {
    this.$firstview[0].find(".firstview_start").one("click", (function(_this) {
      return function() {
        _this.$firstview[0].velocity({
          opacity: 0
        }, DUR, function() {
          return _this.$firstview[0].hide();
        });
        return _this.$firstview[1].show().velocity({
          opacity: 1
        }, DUR);
      };
    })(this));
    return this.$firstview[1].find(".firstview_start").on("click", function() {
      return alert("現在製作中");
    });
  };

  return Main;

})();

new Main();
