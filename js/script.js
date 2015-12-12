(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Main;

Main = (function() {
  function Main() {
    var i, j, ref;
    this.$firstview = [];
    this.$win = $(window);
    this.$body = $("body");
    this.$header = $(".header");
    this.$firstview_start = $(".firstview_start");
    this.$contents = $(".contents");
    this.$result = $(".result");
    this.$result_price = $(".result_price");
    this.$result_price_num = $(".result_price_num");
    this.$result_item = $(".result_item");
    this.$result_item_big = $(".result_item_big");
    this.$result_item_hide = $(".result_item_hide");
    this.$result_formula_price = $(".result_formula_price");
    this.$result_formula_amount_icon = $(".result_formula_amount_icon");
    this.$result_formula_amount_txt = $(".result_formula_amount_txt");
    this.$result_formula_amount_name = $(".result_formula_amount_name");
    this.$result_formula_unit = $(".result_formula_unit");
    this.$footer = $(".footer");
    this.item_data = require("../../json/item.json").items;
    this.firstview_step = 0;
    for (i = j = 0, ref = $(".firstview").size(); 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      this.$firstview.push($(".firstview").filter("[data-id=\"" + (i + 1) + "\"]"));
    }
    window.DUR = 500;
    window.VIEWPORT = 1080;
    this.exec();
  }

  Main.prototype.showResult = function(price) {
    var _count, _rand, _separated_price;
    this.$body.addClass("show_result");
    _rand = Math.floor(Math.random() * this.item_data.length);
    _count = 0;
    while (price / this.item_data[_rand].price > 1000000 || price / this.item_data[_rand].price < 1) {
      _rand = (_rand + 1) % this.item_data.length;
      if (_count++ > 10) {
        break;
      }
    }
    this.$body.velocity({
      backgroundColor: this.item_data[_rand].color
    }, DUR);
    this.$result_item_hide.velocity({
      backgroundColor: this.item_data[_rand].color
    }, DUR);
    this.$result.show().attr({
      "data-id": this.item_data[_rand].name
    });
    _separated_price = String(price).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    this.$result_item.css({
      backgroundImage: "url(\"../img/item/" + this.item_data[_rand].name + ".png\")"
    });
    this.$result_price_num.text(_separated_price);
    this.$result_formula_price.text(_separated_price);
    this.$result_formula_amount_icon.css({
      backgroundImage: "url(../img/item/" + this.item_data[_rand].name + ".png)"
    });
    this.$result_formula_amount_name.text(this.item_data[_rand].name_jp);
    this.$result_formula_amount_txt.text(String(Math.floor(price / this.item_data[_rand].price)).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    this.$result_formula_unit.text(this.item_data[_rand].unit + "分");
    this.$result_item_big.css({
      top: this.$win.height() / 2,
      backgroundImage: "url(../img/item/" + this.item_data[_rand].name + ".png)"
    });
    return this.$result_item_big.velocity({
      scale: [1, 0],
      opacity: [1, 0]
    }, {
      duration: DUR * 1.5,
      delay: DUR,
      easing: [300, 20]
    }).velocity({
      marginTop: this.$result_item.get(0).getBoundingClientRect().top - this.$win.height() / 2 + 2,
      marginLeft: -518,
      width: 100,
      height: 100
    }, {
      duration: DUR * 1.5,
      delay: DUR * 2,
      complete: (function(_this) {
        return function() {
          _this.$result_item.height(Math.ceil(Math.floor(price / _this.item_data[_rand].price) / 10) * (_this.$result_item.width() / 10));
          if (Math.floor(price / _this.item_data[_rand].price) === 10) {
            _this.$result_item_hide.width(0);
          } else {
            _this.$result_item_hide.width((10 - Math.floor(price / _this.item_data[_rand].price) % 10) * (_this.$result_item.width() / 10));
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
        };
      })(this)
    });
  };

  Main.prototype.backFirstviewStep = function() {
    return this.firstview_step--;
  };

  Main.prototype.introHandler = function(step) {
    switch (step) {
      case 0:
        return this.$firstview[0].velocity({
          opacity: 0
        }, DUR, (function(_this) {
          return function() {
            _this.$firstview[0].hide();
            _this.$firstview[1].show().velocity({
              opacity: 1
            }, DUR);
            return _this.$firstview[1].find(".firstview_input_inner").focus();
          };
        })(this));
      case 1:
        if (isNaN(parseInt(this.$firstview[1].find(".firstview_input_inner").val()))) {
          alert("数値を適切に入力してください。");
          this.backFirstviewStep();
          return;
        } else if (parseInt(this.$firstview[1].find(".firstview_input_inner").val()) > 499999999) {
          alert("数値が大きすぎてブラウザの挙動が重くなる可能性があります。");
        }
        return this.$firstview[1].velocity({
          opacity: 0
        }, DUR, (function(_this) {
          return function() {
            _this.$firstview[1].hide();
            return _this.showResult(parseInt(_this.$firstview[1].find(".firstview_input_inner").val()));
          };
        })(this));
    }
  };

  Main.prototype.exec = function() {
    this.$firstview_start.on("click", (function(_this) {
      return function() {
        return _this.introHandler(_this.firstview_step++);
      };
    })(this));
    this.$footer.find(".footer_again").on("click", function() {
      return location.href = "./?skip";
    });
    this.$win.on("keydown", (function(_this) {
      return function(e) {
        if (e.keyCode === 13) {
          return _this.introHandler(_this.firstview_step++);
        }
      };
    })(this));
    if (!$.browser.desktop) {
      this.$body.addClass("is_sp");
    }
    if ($.browser.iphone || $.browser.ipod || $.browser.ipad) {
      document.querySelector('meta[name="viewport"]').setAttribute("content", ("width=" + VIEWPORT + ", minimum-scale=0.25, ") + "maximum-scale=1.6, user-scalable=no");
    } else if ($.browser.android) {
      window.onload = (function(_this) {
        return function() {
          return _this.$body.css({
            zoom: window.innerWidth / VIEWPORT
          });
        };
      })(this);
    }
    if (location.search.match("skip")) {
      return this.introHandler(this.firstview_step++);
    } else {
      return this.$firstview[0].show().velocity({
        opacity: 1
      });
    }
  };

  return Main;

})();

new Main();


},{"../../json/item.json":2}],2:[function(require,module,exports){
module.exports={
    items: [
        {
            name: "beer",
            name_jp: "ビール",
            color: "#F63831",
            unit: "杯",
            price: 500
        },
        {
            name: "benz",
            name_jp: "ベンツ",
            color: "#1C1C1C",
            unit: "台",
            price: 5000000
        },
        {
            name: "disney",
            name_jp: "夢の国",
            color: "#FC8AB6",
            unit: "回",
            price: 5000
        },
        {
            name: "hills",
            name_jp: "六本木ヒルズ",
            color: "#4DC6F5",
            unit: "部屋",
            price: 5000000
        },
        {
            name: "macbook",
            name_jp: "Macbook",
            color: "#E0E1E1",
            unit: "台",
            price: 200000
        },
        {
            name: "pazdra",
            name_jp: "魔法石",
            color: "#502517",
            unit: "個",
            price: 100
        },
        {
            name: "rice",
            name_jp: "ご飯",
            color: "#519BAC",
            unit: "杯",
            price: 200
        },
        {
            name: "travel",
            name_jp: "世界",
            color: "#FECB2F",
            unit: "周",
            price: 1000000
        },
        {
            name: "vuitton",
            name_jp: "高級ブランドの財布",
            color: "#D9A637",
            unit: "個",
            price: 50000
        }
    ]
}

},{}]},{},[1]);
