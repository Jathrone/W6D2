class View {
    constructor(game, $el) {
        this.game = game;
        this.$el = $el;
        this.setupTowers();
        this.render();
        this.fromPile=undefined;

        let $uls = $('ul');
        $uls.each( (idx, ul) => {this.clickTower(ul); });
    }

    setupTowers() {
        for (let i=0;i<3;i++) {
            let $ul = $('<ul>');
            $ul.data("index", i);
            for (let j=0;j<3;j++) {
                let $li = $("<li>");
                $ul.append($li);
            }
            this.$el.append($ul)
        }
    }

    render() {
        $("li").removeClass();
        let towers = this.game.towers;
        towers.forEach( (stack, ulIndex) => {
            stack.forEach( (disc, liIndex) => {
                let $li = $("ul").eq(ulIndex).children('li').eq(liIndex);
                $li.addClass(`disc ${View.discConvertion[disc]}`);
            })
        })
    }

    clickTower(pile) {
        let $pile = $(pile);
        // console.log($pile.children('li'));
        $pile.on("click", (e) => {
            console.log('heard a click');
            if (this.fromPile === undefined) {
                this.fromPile = $(e.currentTarget).data("index");
                console.log(this.fromPile);
                this.render();
            }
            else {
                let toPile = $(e.currentTarget).data("index");
                if (!this.game.move(this.fromPile, toPile)) {
                    alert("invalid move");
                }
                this.fromPile = undefined;
                this.render();
                if (this.game.isWon()) {
                    $(".disc").css("background", "green");
                    $('ul').off();
                }
            }
        })
    }
}

View.discConvertion = {3: "big", 2:"medium", 1:"small"};

module.exports = View;