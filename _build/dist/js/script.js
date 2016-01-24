(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Social, getInstance, instance;

instance = null;

Social = (function() {
  function Social() {}

  Social.prototype.exec = function() {
    var _fb_appId, _type, fjs, i, j, js, k, po, ref, s, w;
    _fb_appId = 529270043906295;
    _type = {};
    for (i = k = 0, ref = arguments.length; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
      _type[arguments[i]] = true;
    }
    if (_type.fb != null) {
      fjs = document.getElementsByTagName("script")[0];
      if (document.getElementById("facebook-jssdk")) {
        return;
      }
      js = document.createElement("script");
      js.id = "facebook-jssdk";
      js.src = "//connect.facebook.net/ja_JP/sdk.js#xfbml=1&" + ("appId=" + _fb_appId + "&version=v2.0");
      fjs.parentNode.insertBefore(js, fjs);
    }
    if (_type.tweet != null) {
      window.twttr = (function() {
        var t;
        fjs = document.getElementsByTagName("script")[0];
        if (document.getElementById("twitter-wjs")) {
          return;
        }
        js = document.createElement("script");
        js.id = "twitter-wjs";
        js.src = "https://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);
        if (window.twttr != null) {
          return window.twttr;
        } else {
          return (t = {
            _e: [],
            ready: function(f) {
              return t._e.push(f);
            }
          });
        }
      })();
    }
    if (_type.hatena != null) {
      j = document.createElement("script");
      j.type = "text/javascript";
      j.src = "https://b.st-hatena.com/js/bookmark_button.js";
      j.async = "async";
      j.charset = "utf-8";
      s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(j, s);
    }
    if (_type.pocket != null) {
      if (!document.getElementById("pocket-btn-js")) {
        j = document.createElement("script");
        j.id = "pocket-btn-js";
        j.type = "text/javascript";
        j.src = "https://widgets.getpocket.com/v1/j/btn.js?v=1";
        w = document.getElementById("pocket-btn-js");
        document.body.appendChild(j);
      }
    }
    if (_type.gplus != null) {
      po = document.createElement("script");
      po.type = "text/javascript";
      po.async = true;
      po.src = "https://apis.google.com/js/plusone.js";
      s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(po, s);
    }
    if (_type.fb_share != null) {
      if (_type.fb == null) {
        fjs = document.getElementsByTagName("script")[0];
        if (document.getElementById("facebook-jssdk")) {
          return;
        }
        js = document.createElement("script");
        js.id = "facebook-jssdk";
        js.src = "//connect.facebook.net/ja_JP/sdk.js#xfbml=1&" + ("appId=" + _fb_appId + "&version=v2.0");
        fjs.parentNode.insertBefore(js, fjs);
      }
    }
    $(document).on("click", ".facebook", function(e) {
      return FB.ui({
        method: "share",
        href: $(e.target).attr("data-url")
      });
    });
    $(document).on("click", ".tweet a", function(e) {
      var _dualScreenLeft, _dualScreenTop, _left, _popupHeight, _popupWidth, _top, _windowHeight, _windowWidth, ref1;
      e.preventDefault();
      if (window.screenLeft != null) {
        _dualScreenLeft = window.screenLeft;
        _dualScreenTop = window.screenTop;
      } else {
        _dualScreenLeft = window.screen.left;
        _dualScreenTop = window.screen.top;
      }
      if (typeof innerWidth !== "undefined" && innerWidth !== null) {
        _windowWidth = window.innerWidth;
        _windowHeight = window.innerHeight;
      } else if (((ref1 = document.documentElement) != null ? ref1.clientWidth : void 0) != null) {
        _windowWidth = document.documentElement.clientWidth;
        _windowWidth = document.documentElement.clientHeight;
      } else {
        _windowWidth = window.screen.width;
        _windowWidth = window.screen.height;
      }
      _popupWidth = 650;
      _popupHeight = 450;
      _left = ((_windowWidth / 2) - (_popupWidth / 2)) + _dualScreenLeft;
      _top = ((_windowHeight / 2) - (_popupHeight / 2)) + _dualScreenTop;
      return window.open($(e.currentTarget).attr("href"), "twitter", ("width=" + _popupWidth + ", height=" + _popupHeight + ", ") + ("top=" + _top + ", left=" + _left));
    });
    return {
      callback: function() {
        var _callback;
        _callback = function(type) {
          return console.log(type);
        };
        twttr.ready(function(twttr) {
          return twttr.events.bind("tweet", function() {
            return _callback("tw");
          });
        });
        return window.onload = function() {
          return FB.Event.subscribe("edge.create", function(response) {
            if (response) {
              return _callback("fb");
            }
          });
        };
      }
    };
  };

  return Social;

})();

getInstance = function() {
  if (!instance) {
    instance = new Social();
  }
  return instance;
};

module.exports = getInstance;


},{}],2:[function(require,module,exports){
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
    this.$result_item_info = $(".result_item_info");
    this.$result_item_big = $(".result_item_big");
    this.$result_item_hide = $(".result_item_hide");
    this.$result_formula = $(".result_formula");
    this.$result_formula_price = $(".result_formula_price");
    this.$result_formula_amount_icon = $(".result_formula_amount_icon");
    this.$result_formula_amount_txt = $(".result_formula_amount_txt");
    this.$result_formula_amount_name = $(".result_formula_amount_name");
    this.$result_formula_unit = $(".result_formula_unit");
    this.$footer = $(".footer");
    this.item_data_copy = require("../../json/item.json").items;
    this.item_data = [];
    this.setItemData();
    this.firstview_step = 0;
    this.MAX_ROW_LENGTH = $.browser.desktop ? 10 : 7;
    this.social = require("./module/social")();
    for (i = j = 0, ref = $(".firstview").size(); 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      this.$firstview.push($(".firstview").filter("[data-id=\"" + (i + 1) + "\"]"));
    }
    window.DUR = 500;
    window.VIEWPORT = 750;
    this.exec();
  }

  Main.prototype.setItemData = function() {
    var i, j, ref, results;
    results = [];
    for (i = j = 0, ref = this.item_data_copy.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      results.push(this.item_data[i] = this.item_data_copy[i]);
    }
    return results;
  };

  Main.prototype.showResult = function(price) {
    var _count, _rand, _result_item_big_ratio, _separated_price;
    this.$body.prop({
      scrollTop: 0
    }).addClass("show_result");
    if (this.item_data.length === 0) {
      this.setItemData();
    }
    _rand = Math.floor(Math.random() * this.item_data.length);
    _count = 0;
    while (price / this.item_data[_rand].price > 1000000 || price / this.item_data[_rand].price < 1) {
      if (_count++ > this.item_data.length - 1) {
        if (this.item_data.length < this.item_data_copy.length) {
          this.setItemData();
          _rand = Math.floor(Math.random() * this.item_data.length);
          _count = 0;
        } else {
          break;
        }
      }
      _rand = (_rand + 1) % this.item_data.length;
    }
    this.$body.velocity({
      backgroundColor: this.item_data[_rand].background
    }, DUR);
    this.$result_item_hide.velocity({
      backgroundColor: this.item_data[_rand].background
    }, DUR);
    this.$result.attr({
      "data-color": this.item_data[_rand].color
    });
    this.$header.attr({
      "data-color": this.item_data[_rand].color
    });
    this.$footer.attr({
      "data-color": this.item_data[_rand].color
    });
    this.$result.show().attr({
      "data-id": this.item_data[_rand].name
    });
    _separated_price = String(price).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    this.$result_item.css({
      height: 900,
      backgroundImage: "url(./img/item/" + this.item_data[_rand].name + ".png)"
    });
    this.$result_price.css({
      opacity: 0
    });
    this.$result_price_num.text(_separated_price);
    this.$result_formula_price.text(_separated_price);
    this.$result_formula_amount_icon.css({
      backgroundImage: "url(./img/item/" + this.item_data[_rand].name + ".png)"
    });
    this.$result_formula_amount_name.removeAttr("style").text(this.item_data[_rand].name_jp);
    while (this.$result_formula_amount_name.height() > parseInt(this.$result_formula_amount_name.css("font-size")) * 2) {
      this.$result_formula_amount_name.css({
        "font-size": parseInt(this.$result_formula_amount_name.css("font-size")) - 1
      });
    }
    this.$result_formula_amount_txt.text(String(Math.floor(price / this.item_data[_rand].price)).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    this.$result_formula_unit.text(this.item_data[_rand].unit + "分");
    this.$result_item_big.removeAttr("style").css({
      top: this.$win.height() / 2,
      backgroundImage: "url(./img/item/" + this.item_data[_rand].name + ".png)"
    });
    this.$result_item.css({
      opacity: 0
    });
    _result_item_big_ratio = Math.min(this.$win.height() * 0.7 / this.$result_item_big.height(), 1);
    this.$result_item_info.css({
      top: this.$win.height() / 2,
      marginTop: _result_item_big_ratio * this.$result_item_big.height() / 2
    }).text(("" + this.item_data[_rand].name_jp) + (" (" + (String(this.item_data[_rand].price).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + "円)")).velocity({
      opacity: [1, 0]
    }, {
      duration: DUR,
      delay: DUR * 2
    }).velocity({
      opacity: [0, 1]
    }, {
      duration: DUR,
      delay: DUR * 4
    });
    return this.$result_item_big.velocity({
      scale: [_result_item_big_ratio, 0],
      opacity: [1, 0]
    }, {
      duration: DUR * 1.5,
      delay: DUR,
      easing: [300, 20]
    }).velocity({
      marginLeft: this.$result_item.get(0).getBoundingClientRect().left - this.$win.width() / 2,
      marginTop: this.$result_item.get(0).getBoundingClientRect().top - this.$win.height() / 2,
      width: this.$result_item.width() / this.MAX_ROW_LENGTH,
      height: this.$result_item.width() / this.MAX_ROW_LENGTH,
      scale: [1, _result_item_big_ratio]
    }, {
      duration: DUR * 1.5,
      delay: DUR * 5,
      complete: (function(_this) {
        return function() {
          _this.$result_item.height(Math.ceil(Math.floor(price / _this.item_data[_rand].price) / _this.MAX_ROW_LENGTH) * (_this.$result_item.width() / _this.MAX_ROW_LENGTH));
          if (Math.floor(price / _this.item_data[_rand].price) % _this.MAX_ROW_LENGTH === 0) {
            _this.$result_item_hide.width(0);
          } else {
            _this.$result_item_hide.width((_this.MAX_ROW_LENGTH - Math.floor(price / _this.item_data[_rand].price) % _this.MAX_ROW_LENGTH) * (_this.$result_item.width() / _this.MAX_ROW_LENGTH));
          }
          _this.$result_item_big.velocity({
            opacity: 0
          }, DUR);
          _this.$result_price.velocity({
            opacity: 1
          }, DUR);
          _this.$result_item.velocity({
            opacity: 1
          }, DUR);
          return _this.item_data.splice(_rand, 1);
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
        if (!$.browser.desktop) {
          this.$header.find(".header_social").hide();
        }
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
    this.$footer.find(".footer_another").on("click", (function(_this) {
      return function() {
        return _this.showResult(parseInt(_this.$firstview[1].find(".firstview_input_inner").val()));
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
    this.$firstview[1].find(".firstview_input_inner").on("input propertychange", function() {
      return $(this).val($(this).val().slice(0, 10));
    });
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
      this.introHandler(this.firstview_step++);
    } else {
      this.$firstview[0].show().velocity({
        opacity: 1
      });
    }
    return this.social.exec("fb", "tweet");
  };

  return Main;

})();

new Main();


},{"../../json/item.json":3,"./module/social":1}],3:[function(require,module,exports){
module.exports={
    items: [
        {
            name: "beer",
            name_jp: "生ビール",
            color: "white",
            background: "#F63831",
            unit: "杯",
            price: 540
        },
        {
            name: "benz",
            name_jp: "ベンツ",
            color: "white",
            background: "#1C1C1C",
            unit: "台",
            price: 5000000
        },
        {
            name: "disney",
            name_jp: "夢の国ペアチケット",
            color: "white",
            background: "#FC8AB6",
            unit: "組",
            price: 17000
        },
        {
            name: "hills",
            name_jp: "六本木ヒルズの家賃",
            color: "black",
            background: "#F9F9FE",
            unit: "月",
            price: 3240000
        },
        {
            name: "macbook",
            name_jp: "MacbookPro",
            color: "black",
            background: "#E0E1E1",
            unit: "台",
            price: 148800
        },
        {
            name: "pazdra",
            name_jp: "魔法石",
            color: "white",
            background: "#502517",
            unit: "個",
            price: 120
        },
        {
            name: "rice",
            name_jp: "お米",
            color: "white",
            background: "#519BAC",
            unit: "杯",
            price: 40
        },
        {
            name: "travel",
            name_jp: "世界一周",
            color: "white",
            background: "#FECB2F",
            unit: "回",
            price: 1000000
        },
        {
            name: "vuitton",
            name_jp: "ヴィトンの財布",
            color: "white",
            background: "#D9A637",
            unit: "個",
            price: 90000
        }
    ]
}

},{}]},{},[2]);
