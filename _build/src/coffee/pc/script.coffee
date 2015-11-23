class Main
    constructor: ->
        @$firstview = []
        @$win = $(window)
        @$body = $("body")
        @$header = $(".header")
        @$contents = $(".contents")
        @$result = $(".result")
        @$result_price = $(".result_price")
        @$result_price_num = $(".result_price_num")
        @$result_item = $(".result_item")
        @$result_item_big = $(".result_item_big")
        @$result_item_hide = $(".result_item_hide")
        @$result_formula_price = $(".result_formula_price")
        @$result_formula_amount = $(".result_formula_amount")
        @$result_formula_unit = $(".result_formula_unit")
        @$footer = $(".footer")

        for i in [0...$(".firstview").size()]
            @$firstview.push $(".firstview").filter("[data-id=\"#{i + 1}\"]")
        window.DUR = 500

        @exec()

    exec: ->
        ###########################
        #   EVENT LISTENER
        ###########################

        @$firstview[0].find(".firstview_start").one "click", =>
            @$firstview[0].velocity opacity: 0, DUR, =>
                @$firstview[0].hide()
                @$firstview[1].find(".firstview_input_inner").focus()
            @$firstview[1].show().velocity opacity: 1, DUR

        @$firstview[1].find(".firstview_start").on "click", =>
            if isNaN parseInt(@$firstview[1].find(".firstview_input_inner").val())
                alert "数値を適切に入力してください。"
                return
            else if parseInt(@$firstview[1].find(".firstview_input_inner").val()) > 499999999
                alert "数値が大きすぎてブラウザの挙動が重くなる可能性があります。"

            @$firstview[1].find(".firstview_start").off "click"

            @$firstview[1].velocity opacity: 0, DUR, =>
                @$firstview[1].hide()
                @$body.addClass "show_result"
                @$body.velocity backgroundColor: "#FC363B", DUR
                @$result_item_hide.velocity backgroundColor: "#FC363B", DUR

                # 結果表示
                @$result.show().attr "data-id": "beer"

                _price = parseInt(@$firstview[1].find(".firstview_input_inner").val())

                # 3桁カンマ区切り
                _separated_price = String(_price).replace /(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"
                _item_price = 500

                @$result_price_num.text _separated_price
                @$result_formula_price.text _separated_price
                @$result_formula_amount.attr("data-id": "beer").text(
                    String(Math.floor(_price / _item_price)).replace /(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"
                )
                @$result_formula_unit.text "杯分"

                @$result_item_big.css top: @$win.height() / 2

                @$result_item_big.velocity(
                    scale: [1, 0]
                    opacity: [1, 0]
                ,
                    duration: DUR * 1.5
                    delay: DUR
                    easing: [300, 20]
                ).
                velocity(
                    marginTop: @$result_item.get(0).getBoundingClientRect().top - @$win.height() / 2
                    marginLeft: -520
                    width: 100
                    height: 100
                ,
                    duration: DUR * 1.5
                    delay: DUR * 2
                    complete: =>
                        # (@$result_item.width() / 10) はアイテム1個あたりの画像幅
                        @$result_item.height(
                            Math.ceil(Math.floor(_price / _item_price) / 10) * (@$result_item.width() / 10)
                        )
                        # 1桁単位の分を隠す
                        if Math.floor(_price / _item_price) == 10
                            @$result_item_hide.width 0
                        else
                            @$result_item_hide.width(
                                (10 - Math.floor(_price / _item_price) % 10) * (@$result_item.width() / 10)
                            )

                        @$result_item_big.velocity opacity: 0, DUR
                        @$result_price.velocity opacity: 1, DUR
                        @$result_item.velocity opacity: 1, DUR
                )

        @$footer.find(".footer_again").on "click", -> location.reload()

        @$win.on "keydown", (e) =>
            if e.keyCode == 13
                if @$firstview[0].css("display") == "block"
                    @$firstview[0].find(".firstview_start").trigger "click"
                else if @$firstview[1].css("display") == "block"
                    @$firstview[1].find(".firstview_start").trigger "click"

        ###########################
        #   INIT
        ###########################

new Main()
