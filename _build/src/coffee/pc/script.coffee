class Main
    constructor: ->
        @$firstview = []
        @$win = $(window)
        @$body = $("body")
        @$header = $(".header")
        @$firstview_start = $(".firstview_start")
        @$contents = $(".contents")
        @$result = $(".result")
        @$result_price = $(".result_price")
        @$result_price_num = $(".result_price_num")
        @$result_item = $(".result_item")
        @$result_item_big = $(".result_item_big")
        @$result_item_hide = $(".result_item_hide")
        @$result_formula = $(".result_formula")
        @$result_formula_price = $(".result_formula_price")
        @$result_formula_amount_icon = $(".result_formula_amount_icon")
        @$result_formula_amount_txt = $(".result_formula_amount_txt")
        @$result_formula_amount_name = $(".result_formula_amount_name")
        @$result_formula_unit = $(".result_formula_unit")
        @$footer = $(".footer")

        @item_data_copy = require("../../json/item.json").items
        @item_data = []
        @setItemData()

        @firstview_step = 0

        @MAX_LENGTH = 10

        for i in [0...$(".firstview").size()]
            @$firstview.push $(".firstview").filter("[data-id=\"#{i + 1}\"]")
        window.DUR = 500
        window.VIEWPORT = 1080

        @exec()

    setItemData: ->
        for i in [0...@item_data_copy.length]
            @item_data[i] = @item_data_copy[i]

    showResult: (price) ->
        @$body.prop(scrollTop: 0).addClass "show_result"

        @setItemData() if @item_data.length == 0
        _rand = Math.floor(Math.random() * @item_data.length)
        _count = 0
        while(price / @item_data[_rand].price > 1000000 || price / @item_data[_rand].price < 1)
            if _count++ > @item_data.length - 1
                if @item_data.length < @item_data_copy.length # data listが削られていた場合、元に戻してやり直す
                    @setItemData()
                    _rand = Math.floor(Math.random() * @item_data.length)
                    _count = 0
                else # 全てのdata listから当てはまるアイテムがないときは、諦める
                    break

            _rand = (_rand + 1) % @item_data.length

        @$body.velocity backgroundColor: @item_data[_rand].background, DUR
        @$result_item_hide.velocity backgroundColor: @item_data[_rand].background, DUR
        @$result.attr "data-color": @item_data[_rand].color
        @$footer.attr "data-color": @item_data[_rand].color

        # 結果表示
        @$result.show().attr "data-id": @item_data[_rand].name

        # 3桁カンマ区切り
        _separated_price = String(price).replace /(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"

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

        while @$result_formula_amount_name.height() > parseInt(@$result_formula_amount_name.css("font-size")) * 2
            @$result_formula_amount_name.css "font-size": parseInt(@$result_formula_amount_name.css("font-size")) - 1

        @$result_formula_amount_txt.text(
            String(Math.floor(price / @item_data[_rand].price)).replace /(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"
        )
        @$result_formula_unit.text "#{@item_data[_rand].unit}分"

        @$result_item_big.removeAttr("style").css(
            top: @$win.height() / 2
            backgroundImage: "url(./img/item/#{@item_data[_rand].name}.png)"
        )

        @$result_item.css opacity: 0

        @$result_item_big.velocity(
            scale: [1, 0]
            opacity: [1, 0]
        ,
            duration: DUR * 1.5
            delay: DUR
            easing: [300, 20]
        ).
        velocity(
            marginLeft: -518
            marginTop: @$result_item.get(0).getBoundingClientRect().top - @$win.height() / 2 + 2
            width: 100
            height: 100
        ,
            duration: DUR * 1.5
            delay: DUR * 2
            complete: =>
                # (@$result_item.width() / 10) はアイテム1個あたりの画像幅
                @$result_item.height(
                    Math.ceil(Math.floor(price / @item_data[_rand].price) / 10) * (@$result_item.width() / 10)
                )
                # 1桁単位の分を隠す
                if Math.floor(price / @item_data[_rand].price) == 10
                    @$result_item_hide.width 0
                else
                    @$result_item_hide.width(
                        (10 - Math.floor(price / @item_data[_rand].price) % 10) * (@$result_item.width() / 10)
                    )

                @$result_item_big.velocity opacity: 0, DUR
                @$result_price.velocity opacity: 1, DUR
                @$result_item.velocity opacity: 1, DUR

                @item_data.splice _rand, 1 # 一度出したアイテムは繰り返さないように
        )

    backFirstviewStep: -> @firstview_step--

    introHandler: (step) ->
        switch step
            when 0
                @$firstview[0].velocity opacity: 0, DUR, =>
                    @$firstview[0].hide()
                    @$firstview[1].show().velocity opacity: 1, DUR
                    @$firstview[1].find(".firstview_input_inner").focus()
            when 1
                if isNaN parseInt(@$firstview[1].find(".firstview_input_inner").val())
                    alert "数値を適切に入力してください。"
                    @backFirstviewStep()
                    return
                else if parseInt(@$firstview[1].find(".firstview_input_inner").val()) > 499999999
                    alert "数値が大きすぎてブラウザの挙動が重くなる可能性があります。"

                @$firstview[1].velocity opacity: 0, DUR, =>
                    @$firstview[1].hide()
                    @showResult parseInt(@$firstview[1].find(".firstview_input_inner").val())

    exec: ->
        ###########################
        #   EVENT LISTENER
        ###########################

        @$firstview_start.on "click", => @introHandler @firstview_step++

        # 再トライ
        @$footer.find(".footer_another").on "click", =>
            @showResult parseInt(@$firstview[1].find(".firstview_input_inner").val())

        @$footer.find(".footer_again").on "click", -> location.href = "./?skip"

        # keyboardで次へ進む
        @$win.on "keydown", (e) =>
            @introHandler @firstview_step++ if e.keyCode == 13

        @$firstview[1].find(".firstview_input_inner").on "input propertychange", ->
            $(this).val $(this).val().slice(0, 10) # 10文字以上は禁止

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
        else if $.browser.android
            window.onload = => @$body.css zoom: window.innerWidth / VIEWPORT

        if location.search.match "skip"
            @introHandler @firstview_step++
        else
            @$firstview[0].show().velocity opacity: 1

new Main()
