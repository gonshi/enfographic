class Main
    constructor: ->
        @$firstview = []
        @$contents = $(".contents")
        @$result = $(".result")

        for i in [0...$(".firstview").size()]
            @$firstview.push $(".firstview").filter("[data-id=\"#{i + 1}\"]")
        window.DUR = 500

        @exec()

    exec: ->
        ###########################
        #   EVENT LISTENER
        ###########################

        @$firstview[0].find(".firstview_start").one "click", =>
            @$firstview[0].velocity opacity: 0, DUR, => @$firstview[0].hide()
            @$firstview[1].show().velocity opacity: 1, DUR

        @$firstview[1].find(".firstview_start").on "click", =>
            @$firstview[1].velocity opacity: 0, DUR, =>
                @$firstview[1].hide()
                @$contents.addClass("show_result").velocity(
                    backgroundColor: "#FC363B", DUR
                )
                @$result.attr "data-id": "1"

                _num = parseInt(@$firstview[1].find(".firstview_input_inner").val()) / 500
                _tmpl = $(".result_item_tmpl").html()
                _inner_html = ""
                for i in [0..._num]
                    _inner_html += _tmpl
                @$result.find(".result_item_container").html _inner_html

        ###########################
        #   INIT
        ###########################

new Main()
