import Ember from 'ember';

const { computed } = Ember;

const WHITE = 'W',
   BLACK = 'B';

export { WHITE, BLACK };

const KING = 'K',
  QUEEN = 'Q',
  BISHOP = 'B',
  KNIGHT = 'N',
  CASTLE = 'C',
  PAWN = 'P';

export { KING, QUEEN, BISHOP, KNIGHT, CASTLE, PAWN };


const FILES = { 'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8 },
  FILE_KEYS = Object.keys(FILES);

export { FILES, FILE_KEYS };



var toPos = function(x, y) {
  let file = FILE_KEYS[x-1];
  let rank = y;
  return `${file}${rank}`;
};


var Piece = Ember.Object.extend({

  // interface
  type: null,
  codes: null,
  weight: null,
  offsets: [],
  captures: [],



  // init params
  color: null,
  file: null,
  rank: null,

  pos: computed('file', 'rank', function() {
    return `${this.get('file')}${this.get('rank')}`;
  }),

  x: computed('file', function() {
    return parseInt(FILES[this.get('file')]);
  }),
  y: computed.alias('rank'),

  code: computed('codes', 'color', function() {
    return this.get(`codes.${this.get('color')}`).htmlSafe();
  }),

  moves(board) {
    let moves = [];

    this.get('offsets').forEach(o => {
      let i = 0;
      let x = this.get('x');
      let y = this.get('y');
      let repeat = o.repeat || 1;

      while (i < repeat) {
        i++;

        x += o.x;
        y += o.y;

        if (!this.isValidXY(x, y)) {
          break;
        }

        let pos = toPos(x, y);
        let capture = board[pos];

        if (capture && capture.get('color') === this.get('color')) {
          break;
        }

        moves.pushObject(pos);

        if (capture) {
          break;
        }
      }
    });

    return moves;
  },




  // methods
  moveTo(pos) {
    this.setProperties({
      file: pos[0],
      rank: parseInt(pos[1])
    });
  },

  isValidMove(move /*, board*/) {
    // check for other pieces
    //     if (newX >= 0 && newY >= 0 && newX <= 7 && newY <= 7){
    //       let piece = board[newX][newY];
    //       if(!piece || (piece && piece.color != this.color)){
    //         moves.push({x: newX, y: newY });
    //       }
    //     }
    return (move.get('x') >= 1 && move.get('y') >= 1 && move.get('x') <= 8 && move.get('y') <= 8);
  },


  isValidXY(x, y) {
    return (x >= 1 && x <= 8 && y >= 1 && y <= 8);
  }


});



var King = Piece.extend({
  type: KING,
  codes: {
    W: '&#9812;',
    B: '&#9818;'
  },
  weight: 100,

  offsets: [
    { x: 1, y: 1 },
    { x: 1, y: 0 },
    { x: 1, y: -1 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
    { x: -1, y: 1 },
    { x: -1, y: 0 },
    { x: -1, y: -1 }
  ],

});


var Queen = Piece.extend({
  type: QUEEN,
  codes: {
    W: '&#9813;',
    B: '&#9819;'
  },
  weight: 9,


  offsets: [
    { x: -1, y: 0, repeat: 8 },
    { x: 1, y: 0, repeat: 8 },
    { x: 0, y: -1, repeat: 8 },
    { x: 0, y: 1, repeat: 8 },
    { x: -1, y: -1, repeat: 8 },
    { x: -1, y: 1, repeat: 8 },
    { x: 1, y: -1, repeat: 8 },
    { x: 1, y: 1, repeat: 8 }
  ],

});


var Bishop = Piece.extend({
  type: BISHOP,
  codes: {
    W: '&#9815;',
    B: '&#9821;'
  },
  weight: 3,

  offsets: [
    { x: -1, y: -1, repeat: 8 },
    { x: -1, y: 1, repeat: 8 },
    { x: 1, y: -1, repeat: 8 },
    { x: 1, y: 1, repeat: 8 }
  ],
});



var Knight = Piece.extend({
  type: KNIGHT,
  codes: {
    W: '&#9816;',
    B: '&#9822;'
  },
  weight: 3,

  offsets: [
    { x: 2, y: 1 },
    { x: 2, y: -1 },
    { x: -2, y: 1 },
    { x: -2, y: -1 },
    { x: 1, y: 2 },
    { x: 1, y: -2 },
    { x: -1, y: 2 },
    { x: -1, y: -2 }
  ],

});



var Castle = Piece.extend({
  type: CASTLE,
  codes: {
    W: '&#9814;',
    B: '&#9820;'
  },
  weight: 5,

  offsets: [
    { x: -1, y: 0, repeat: 8 },
    { x: 1, y: 0, repeat: 8 },
    { x: 0, y: -1, repeat: 8 },
    { x: 0, y: 1, repeat: 8 }
  ],

});



var Pawn = Piece.extend({
  type: PAWN,
  codes: {
    W: '&#9817;',
    B: '&#9823;'
  },
  weight: 1,

  offsets: computed('color', 'y', function() {
    if (this.get('color') === WHITE) {
      if (this.get('y') === 2) {
        return [{ x: 0, y: 1, repeat: 2 }];
      } else {
        return [{ x: 0, y: 1 }];
      }
    } else {
      if (this.get('y') === 7) {
        return [{ x: 0, y: -1, repeat: 2 }];
      } else {
        return [{ x: 0, y: -1, repeat: 1 }];
      }
    }
  }),

  captures: computed('color', function() {
    if (this.get('color') === WHITE) {
      return [
        { x: 1, y: 1 },
        { x: -1, y: 1 },
      ];
    } else {
      return [
        { x: 1, y: -1 },
        { x: -1, y: -1 },
      ];
    }
  }),

  moves(board) {
    let moves = [];

    this.get('offsets').forEach(o => {
      let i = 0;
      let x = this.get('x');
      let y = this.get('y');
      let repeat = o.repeat || 1;

      while (i < repeat) {
        i++;

        x += o.x;
        y += o.y;

        if (!this.isValidXY(x, y)) {
          break;
        }

        let pos = toPos(x, y);
        if (board[pos]) {
          break;
        }

        moves.pushObject(pos);
      }
    });

    this.get('captures').forEach(c => {
      let x = this.get('x');
      let y = this.get('y');

      x += c.x;
      y += c.y;

      if (!this.isValidXY(x, y)) {
        return;
      }

      let pos = toPos(x, y);
      if (board[pos] && board[pos].get('color') !== this.get('color')) {
        moves.pushObject(pos);
      }
    });

    return moves;
  },




});


export { King, Queen, Bishop, Knight, Castle, Pawn };


export default function() {
  return;
}