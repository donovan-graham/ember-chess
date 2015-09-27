import Ember from 'ember';

import { WHITE, BLACK, FILE_KEYS, PAWN } from '../utils/pieces';
import { King, Queen, Bishop, Knight, Castle, Pawn } from '../utils/pieces';

const { computed } = Ember;

export default Ember.Controller.extend({

  init() {
    this._super();
    this.resetBoard();
  },

  pieces: [],
  history: [],

  moves: [],
  activePiece: null,
  fromPos: null,

  files: FILE_KEYS,         /* file => x => cell */
  ranks: [8, 7, 6, 5, 4, 3, 2, 1],   /* rank => y => row */

  whitePieces: computed.filterBy('pieces', 'color', WHITE),
  blackPieces: computed.filterBy('pieces', 'color', BLACK),

  board: computed('pieces.@each.pos', function() {
    let board = {};
    this.get('pieces').forEach(piece => {
      board[piece.get('pos')] = piece;
    })
    return board;
  }),

  turn: computed('history.length', function() {
    return (this.get('history.length') % 2 === 0) ? WHITE : BLACK;
  }),


  resetBoard() {
    let pieces;

    pieces = Ember.A([
      Castle.create({ color: BLACK, file: 'a', rank: 8 }),
      Knight.create({ color: BLACK, file: 'b', rank: 8 }),
      Bishop.create({ color: BLACK, file: 'c', rank: 8 }),
      Queen.create({ color: BLACK, file: 'd', rank: 8 }),
      King.create({ color: BLACK, file: 'e', rank: 8 }),
      Bishop.create({ color: BLACK, file: 'f', rank: 8 }),
      Knight.create({ color: BLACK, file: 'g', rank: 8 }),
      Castle.create({ color: BLACK, file: 'h', rank: 8 }),

      Pawn.create({ color: BLACK, file: 'a', rank: 7 }),
      Pawn.create({ color: BLACK, file: 'b', rank: 7 }),
      Pawn.create({ color: BLACK, file: 'c', rank: 7 }),
      Pawn.create({ color: BLACK, file: 'd', rank: 7 }),
      Pawn.create({ color: BLACK, file: 'e', rank: 7 }),
      Pawn.create({ color: BLACK, file: 'f', rank: 7 }),
      Pawn.create({ color: BLACK, file: 'g', rank: 7 }),
      Pawn.create({ color: BLACK, file: 'h', rank: 7 }),

      Pawn.create({ color: WHITE, file: 'a', rank: 2 }),
      Pawn.create({ color: WHITE, file: 'b', rank: 2 }),
      Pawn.create({ color: WHITE, file: 'c', rank: 2 }),
      Pawn.create({ color: WHITE, file: 'd', rank: 2 }),
      Pawn.create({ color: WHITE, file: 'e', rank: 2 }),
      Pawn.create({ color: WHITE, file: 'f', rank: 2 }),
      Pawn.create({ color: WHITE, file: 'g', rank: 2 }),
      Pawn.create({ color: WHITE, file: 'h', rank: 2 }),

      Castle.create({ color: WHITE, file: 'a', rank: 1 }),
      Knight.create({ color: WHITE, file: 'b', rank: 1 }),
      Bishop.create({ color: WHITE, file: 'c', rank: 1 }),
      Queen.create({ color: WHITE, file: 'd', rank: 1 }),
      King.create({ color: WHITE, file: 'e', rank: 1 }),
      Bishop.create({ color: WHITE, file: 'f', rank: 1 }),
      Knight.create({ color: WHITE, file: 'g', rank: 1 }),
      Castle.create({ color: WHITE, file: 'h', rank: 1 }),
    ]);

    this.setProperties({
      pieces: pieces,
      history: [],
      moves: [],
      activePiece: null,
      fromPos: null,
    })
  },


  actions: {
    move(fromPos, toPos) {
      fromPos = 'e7';
      toPos = 'e2';

      let piece = this.get('board')[fromPos];
      let capture = this.get('board')[toPos];

      if (capture) {
        this.get('pieces').removeObject(capture);
      }

      piece.moveTo(toPos);
    },

    reset() {
      this.resetBoard();
    },

    pick(pos, piece) {
      this.setProperties({
        activePiece: piece,
        moves: piece.moves(this.get('board')),
        fromPos: pos,
      });
    },

    move(pos, capture) {
      let active = this.get('activePiece');
      if (!active) {
        Ember.Logger.error("We don't have an active piece to move");
      }

      if (!this.get('moves').contains(pos)) {
        Ember.Logger.error("We're getting an illegal move here");
      }

      // captured piece
      if (capture) {
        this.get('pieces').removeObject(capture);
      }

      this.setProperties({
        activePiece: null,
        moves: [],
        fromPos: null,
      });

      active.moveTo(pos);

      // pawn promotion
      if (active.get('type') === PAWN && ((active.get('y') === 8 && active.get('color') === WHITE) || (active.get('y') === 1 && active.get('color') === BLACK))) {
        let promotion = Queen.create(active.getProperties(['color', 'file', 'rank']));
        this.get('pieces')
          .removeObject(active)
          .addObject(promotion);
      }

      this.get('history').pushObject(pos);
    }

  }


});
