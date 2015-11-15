var Main;

Main = (function() {
  function Main() {
    var i, j, ref;
    this.$firstview = [];
    this.$contents = $(".contents");
    this.$result = $(".result");
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
    return this.$firstview[1].find(".firstview_start").on("click", (function(_this) {
      return function() {
        return _this.$firstview[1].velocity({
          opacity: 0
        }, DUR, function() {
          var _inner_html, _num, _tmpl, i, j, ref;
          _this.$firstview[1].hide();
          _this.$contents.addClass("show_result").velocity({
            backgroundColor: "#FC363B"
          }, DUR);
          _this.$result.attr({
            "data-id": "1"
          });
          _num = parseInt(_this.$firstview[1].find(".firstview_input_inner").val()) / 500;
          _tmpl = $(".result_item_tmpl").html();
          _inner_html = "";
          for (i = j = 0, ref = _num; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
            _inner_html += _tmpl;
          }
          return _this.$result.find(".result_item_container").html(_inner_html);
        });
      };
    })(this));
  };

  return Main;

})();

new Main();
