var Main;

Main = (function() {
  function Main() {
    var i, j, ref;
    this.$firstview = [];
    this.$win = $(window);
    this.$header = $(".header");
    this.$contents = $(".contents");
    this.$result = $(".result");
    this.$result_price_num = $(".result_price_num");
    this.$result_item = $(".result_item");
    this.$result_formula_price = $(".result_formula_price");
    this.$result_formula_amount = $(".result_formula_amount");
    this.$result_formula_unit = $(".result_formula_unit");
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
          _this.$firstview[0].hide();
          return _this.$firstview[1].find(".firstview_input_inner").focus();
        });
        return _this.$firstview[1].show().velocity({
          opacity: 1
        }, DUR);
      };
    })(this));
    this.$firstview[1].find(".firstview_start").on("click", (function(_this) {
      return function() {
        if (isNaN(parseInt(_this.$firstview[1].find(".firstview_input_inner").val()))) {
          alert("数値を適切に入力してください。");
          return;
        }
        _this.$firstview[1].find(".firstview_start").off("click");
        return _this.$firstview[1].velocity({
          opacity: 0
        }, DUR, function() {
          var _item_price, _price, _separated_price;
          _this.$firstview[1].hide();
          _this.$header.addClass("show_result");
          _this.$contents.addClass("show_result").velocity({
            backgroundColor: "#FC363B"
          }, DUR);
          _this.$result.show().attr({
            "data-id": "beer"
          });
          _price = parseInt(_this.$firstview[1].find(".firstview_input_inner").val());
          _separated_price = String(_price).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
          _item_price = 500;
          _this.$result_price_num.text(_separated_price);
          _this.$result_formula_price.text(_separated_price);
          _this.$result_formula_amount.attr({
            "data-id": "beer"
          }).text(String(Math.floor(_price / _item_price)).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
          _this.$result_formula_unit.text("杯分");
          return _this.$result_item.height(Math.ceil(Math.floor(_price / _item_price) / 10) * (_this.$result_item.width() / 10));
        });
      };
    })(this));
    return this.$win.on("keydown", (function(_this) {
      return function(e) {
        if (e.keyCode === 13) {
          if (_this.$firstview[0].css("display") === "block") {
            return _this.$firstview[0].find(".firstview_start").trigger("click");
          } else if (_this.$firstview[1].css("display") === "block") {
            return _this.$firstview[1].find(".firstview_start").trigger("click");
          }
        }
      };
    })(this));
  };

  return Main;

})();

new Main();
