var Main;

Main = (function() {
  function Main() {
    var i, j, ref;
    this.$firstview = [];
    this.$win = $(window);
    this.$body = $("body");
    this.$header = $(".header");
    this.$contents = $(".contents");
    this.$result = $(".result");
    this.$result_price = $(".result_price");
    this.$result_price_num = $(".result_price_num");
    this.$result_item = $(".result_item");
    this.$result_item_big = $(".result_item_big");
    this.$result_item_hide = $(".result_item_hide");
    this.$result_formula_price = $(".result_formula_price");
    this.$result_formula_amount = $(".result_formula_amount");
    this.$result_formula_unit = $(".result_formula_unit");
    this.$footer = $(".footer");
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
        } else if (parseInt(_this.$firstview[1].find(".firstview_input_inner").val()) > 499999999) {
          alert("数値が大きすぎてブラウザの挙動が重くなる可能性があります。");
        }
        _this.$firstview[1].find(".firstview_start").off("click");
        return _this.$firstview[1].velocity({
          opacity: 0
        }, DUR, function() {
          var _item_price, _price, _separated_price;
          _this.$firstview[1].hide();
          _this.$body.addClass("show_result");
          _this.$body.velocity({
            backgroundColor: "#FC363B"
          }, DUR);
          _this.$result_item_hide.velocity({
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
          _this.$result_item_big.css({
            top: _this.$win.height() / 2
          });
          return _this.$result_item_big.velocity({
            scale: [1, 0],
            opacity: [1, 0]
          }, {
            duration: DUR * 1.5,
            delay: DUR,
            easing: [300, 20]
          }).velocity({
            marginTop: _this.$result_item.get(0).getBoundingClientRect().top - _this.$win.height() / 2,
            marginLeft: -520,
            width: 100,
            height: 100
          }, {
            duration: DUR * 1.5,
            delay: DUR * 2,
            complete: function() {
              _this.$result_item.height(Math.ceil(Math.floor(_price / _item_price) / 10) * (_this.$result_item.width() / 10));
              if (Math.floor(_price / _item_price) === 10) {
                _this.$result_item_hide.width(0);
              } else {
                _this.$result_item_hide.width((10 - Math.floor(_price / _item_price) % 10) * (_this.$result_item.width() / 10));
              }
              _this.$result_item_big.velocity({
                opacity: 0
              }, DUR);
              _this.$result_price.velocity({
                opacity: 1
              }, DUR);
              return _this.$result_item.velocity({
                opacity: 1
              }, DUR);
            }
          });
        });
      };
    })(this));
    this.$footer.find(".footer_again").on("click", function() {
      return location.reload();
    });
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
