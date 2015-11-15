class Main
    constructor: ->
        @$firstview = []

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

        @$firstview[1].find(".firstview_start").on "click", ->
            alert "現在製作中"

        ###########################
        #   INIT
        ###########################

new Main()
