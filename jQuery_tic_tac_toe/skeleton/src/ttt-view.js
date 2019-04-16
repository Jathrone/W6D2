class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    let $ul = $('.grid');
    $ul.on("click", "li", (e) => {
      let $li = $(e.currentTarget);
      let pos = $li.data('pos');
      try {
        this.game.playMove($li.data('pos'));
        this.makeMove($li);
        if (this.game.isOver()) {
          let $p = $('<p>');
          $p.text(`You win, ${this.game.winner()}!`);
          $('body').append($p);
          $ul.off()
          
        }
      } 
      catch(err) {
        alert(err.msg)
      }
    })
  }
  
  makeMove($square) {
    let pos = $square.data('pos')
    let mark = this.game.board.grid[pos[0]][pos[1]]
    $square.addClass(mark);
    $square.html(`<div>${mark}</div>`);
  }

  setupBoard() {
    let $ul = $('<ul>');
    $ul.addClass("grid");
    for (let i=0;i<9;i++) {
      let $li = $('<li>');
      $li.addClass("box");
      $li.data("pos", [Math.floor(i/3),i % 3])
      $ul.append($li);
    }
    this.$el.append($ul);
  }
}

module.exports = View;
