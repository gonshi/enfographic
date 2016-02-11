# 全角->半角変換
String.prototype.toHalf = ->
    return this.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) ->
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0)
    )

# 3桁カンマ区切り
String.prototype.separate = ->
    return this.replace /(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"

class Main
    constructor: ->
        @$firstview = []
        @$win = $(window)
        @$base = $("html, body")
        @$body = $("body")
        @$header = $(".header")
        @$header_social = $(".header_social")
        @$firstview_start = $(".firstview_start")
        @$contents = $(".contents")
        @$result = $(".result")
        @$result_price = $(".result_price")
        @$result_price_num = $(".result_price_num")
        @$result_item = $(".result_item")
        @$result_item_info = $(".result_item_info")
        @$result_item_big = $(".result_item_big")
        @$result_item_hide = $(".result_item_hide")
        @$result_formula = $(".result_formula")
        @$result_formula_price = $(".result_formula_price")
        @$result_formula_amount_icon = $(".result_formula_amount_icon")
        @$result_formula_amount_txt = $(".result_formula_amount_txt")
        @$result_formula_amount_name = $(".result_formula_amount_name")
        @$result_formula_unit = $(".result_formula_unit")
        @$footer = $(".footer")
        @$footer_social = $(".footer_social")

        @item_data_copy = require("../../json/item.json").items
        @item_data = []
        @setItemData()

        @firstview_step = 0

        @MAX_ROW_LENGTH = if $.browser.desktop then 10 else 7

        @social = require("./module/social")()

        for i in [0...$(".firstview").size()]
            @$firstview.push $(".firstview").filter("[data-id=\"#{i + 1}\"]")
        window.DUR = 500
        window.VIEWPORT = 750

        @exec()

    setItemData: ->
        for i in [0...@item_data_copy.length]
            @item_data[i] = @item_data_copy[i]

    showResult: (price, rand) ->
        @$base.prop(scrollTop: 0)
        @$body.addClass "show_result"

        @$result_formula.css opacity: 0

        @setItemData() if @item_data.length == 0
        if rand?
            _rand = rand
        else
            _rand = Math.floor(Math.random() * @item_data.length)
        _count = 0
        while(price / @item_data[_rand].price > 1000000 || price / @item_data[_rand].price < 0.1)
            if _count++ > @item_data.length - 1
                if @item_data.length < @item_data_copy.length # data listが削られていた場合、元に戻してやり直す
                    @setItemData()
                    _rand = Math.floor(Math.random() * @item_data.length)
                    _count = 0
                else # 全てのdata listから当てはまるアイテムがないときは、諦める
                    break

            _rand = (_rand + 1) % @item_data.length

        _amount = Math.floor(price / @item_data[_rand].price * 10) / 10 # 小数第1桁まで

        @$body.velocity backgroundColor: @item_data[_rand].background, DUR
        @$result_item_hide.velocity backgroundColor: @item_data[_rand].background, DUR
        @$result.attr "data-color": @item_data[_rand].color
        @$header.attr "data-color": @item_data[_rand].color
        @$footer.attr "data-color": @item_data[_rand].color

        # 結果表示
        @$result.show().attr "data-id": @item_data[_rand].name

        # 3桁カンマ区切り
        _separated_price = String(price).separate()

        @$result_item.css(
            height: 900
            backgroundImage: "url(./img/item/#{@item_data[_rand].name}.png)"
        )

        @$result_price.css opacity: 0
        @$result_price_num.text _separated_price
        @$result_formula_price.text _separated_price

        @$result_formula_amount_icon.css(
            backgroundImage: "url(./img/item/#{@item_data[_rand].name}.png)"
        )

        @$result_formula_amount_name.removeAttr("style").text @item_data[_rand].name_jp

        # フォントサイズ調整
        while @$result_formula_amount_name.height() > parseInt(@$result_formula_amount_name.css("font-size")) * 2
            @$result_formula_amount_name.css "font-size": parseInt(@$result_formula_amount_name.css("font-size")) - 1

        @$result_formula_amount_txt.text(
            String(_amount).separate()
        )
        @$result_formula_unit.text "#{@item_data[_rand].unit}分"

        @$result_item_big.removeAttr("style").css(
            top: @$win.height() / 2
            backgroundImage: "url(./img/item/#{@item_data[_rand].name}.png)"
        )

        @$result_item.css opacity: 0

        _result_item_big_ratio = Math.min(@$win.height() * 0.7 / @$result_item_big.height(), 1)
        @$result_item_info.css(
            top: @$win.height() / 2
            marginTop: _result_item_big_ratio * @$result_item_big.height() / 2
        ).
        text(
            "#{@item_data[_rand].name_jp}" +
            " (#{String(@item_data[_rand].price).separate()}円)"
        ).
        velocity(
            opacity: [1, 0]
        ,
            duration: DUR
            delay: DUR * 2
        ).velocity(
            opacity: [0, 1]
        ,
            duration: DUR
            delay: DUR * 4
        )

        @$result_item_big.velocity(
            scale: [_result_item_big_ratio, 0]
            opacity: [1, 0]
        ,
            duration: DUR * 1.5
            delay: DUR
            easing: [300, 20]
        ).
        velocity(
            marginLeft: @$result_item.get(0).getBoundingClientRect().left - @$win.width() / 2
            marginTop: @$result_item.get(0).getBoundingClientRect().top + @$win.scrollTop() - @$win.height() / 2
            width: @$result_item.width() / @MAX_ROW_LENGTH
            height: @$result_item.width() / @MAX_ROW_LENGTH
            scale: [1, _result_item_big_ratio]
        ,
            duration: DUR * 1.5
            delay: DUR * 5
            complete: =>
                # (@$result_item.width() / @MAX_ROW_LENGTH) はアイテム1個あたりの画像幅
                @$result_item.height(
                    Math.ceil(_amount / @MAX_ROW_LENGTH) *
                    (@$result_item.width() / @MAX_ROW_LENGTH)
                )
                # 1桁単位の分を隠す
                if _amount % @MAX_ROW_LENGTH == 0
                    @$result_item_hide.width 0
                else
                    @$result_item_hide.width(
                        (@MAX_ROW_LENGTH - _amount % @MAX_ROW_LENGTH) *
                        (@$result_item.width() / @MAX_ROW_LENGTH)
                    )

                @$result_item_big.velocity opacity: 0, DUR
                @$result_price.velocity opacity: 1, DUR
                @$result_item.velocity opacity: 1, DUR
                @$result_formula.velocity opacity: 1, DUR

                @item_data.splice _rand, 1 # 一度出したアイテムは繰り返さないように
                @setSocial()
        )

    setSocial: ->
        @$footer_social.attr "data-id": @$result.attr "data-id"
        @$footer_social.attr "data-name": @$result_formula_amount_name.text()
        @$footer_social.attr "data-price": @$result_formula_price.text()
        @$footer_social.attr "data-amount": @$result_formula_amount_txt.text()
        @$footer_social.attr "data-unit": @$result_formula_unit.text()

    backFirstviewStep: -> @firstview_step--

    introHandler: (step) ->
        switch step
            when 0
                unless $.browser.desktop
                    @$header_social.hide()
                    @$header.find(".header_ttl").show()

                @$firstview[0].velocity opacity: 0, DUR, =>
                    @$firstview[0].hide()
                    @$firstview[1].show().velocity opacity: 1, DUR
                    @$firstview[1].find(".firstview_input_inner").focus()
            when 1
                _val = parseInt(@$firstview[1].find(".firstview_input_inner").val().replace(/,/g, "").toHalf())
                if isNaN _val
                    alert "数値を適切に入力してください。"
                    @backFirstviewStep()
                    return

                @$firstview[1].velocity opacity: 0, DUR, =>
                    @$firstview[1].hide()
                    @showResult _val

    preload: ->
        _$img = []
        for i in [0...@item_data.length]
            _$img[i] = $("<img>")
            _$img[i].get(0).src = "img/item/#{@item_data[i].name}.png"

    exec: ->
        ###########################
        #   EVENT LISTENER
        ###########################

        @$firstview_start.on "click", => @introHandler @firstview_step++

        # 再トライ
        @$footer.find(".footer_another").on "click", =>
            @showResult parseInt(@$firstview[1].find(".firstview_input_inner").val().replace(/,/g, "").toHalf())

        @$footer.find(".footer_again").on "click", -> location.href = "./?skip"

        # keyboardで次へ進む
        @$win.on "keydown", (e) =>
            @introHandler @firstview_step++ if e.keyCode == 13

        @$win.on "resize", (e) =>
            return if @$body.hasClass "show_result"

            @$contents.height @$win.height()

            for i in [0...@$firstview.length]
                @$firstview[i].height @$win.height()

            unless $.browser.desktop
                @$header_social.css top: @$win.height() / 2 + 380

        @$firstview[1].find(".firstview_input_inner").on "input propertychange", ->
            $(this).val $(this).val().replace(/,/g, "").slice(0, 10).separate() # 10文字以上は禁止

        ###########################
        #   INIT
        ###########################

        @$body.addClass "is_sp" unless $.browser.desktop

        if $.browser.iphone || $.browser.ipod || $.browser.ipad
            document.querySelector('meta[name="viewport"]').setAttribute(
                "content",
                "width=#{VIEWPORT}, minimum-scale=0.25, " +
                "maximum-scale=1.6, user-scalable=no"
            )

            @$firstview[1].find(".firstview_input").css paddingRight: 40

        @$win.trigger "resize"
        @social.exec "fb", "tweet"
        @preload()

        # シェアからのアイテム & 価格指定ジャンプ
        _search = location.search.replace(/^\?/, '')
        _item = ""
        _price = 0
        if _search.match(/item=(.*?)(\&|_and_|$)/)
            _item = _search.match(/item=(.*?)(\&|_and_|$)/)[1]
        if _search.match(/price=(.*?)(\&|_and_|$)/)
            _price = _search.match(/price=(.*?)(\&|_and_|$)/)[1]

        _rand = -1
        for i in [0...@item_data.length]
            if @item_data[i].name == _item
                _rand = i
                break

        if _rand > 0 && !isNaN(_price) && _price > 0
            unless $.browser.desktop
                @$header_social.hide()
                @$header.find(".header_ttl").show()
            @$firstview[1].find(".firstview_input_inner").val _price
            @showResult _price, _rand
        else if location.search.match "skip"
            @introHandler @firstview_step++
        else
            @$firstview[0].show().velocity opacity: 1

new Main()
