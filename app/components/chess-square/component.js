import Ember from 'ember';

import { FILES } from '../../utils/pieces';

const { computed } = Ember;

export default Ember.Component.extend({

  tagName: 'td',

  attributeBindings: ['pos:data-id', 'disabled'],
  classNameBindings: ['color', 'isMove', 'isActive', 'isWhiteMove', 'isBlackMove'],

  // attrs
  file: null,
  rank: null,
  board: [],
  moves: [],
  turn: null,
  activePiece: null,

  // props
  pos: computed('file', 'rank', function() {
    return `${this.get('file')}${this.get('rank')}`;
  }),

  color: computed('file', 'rank', function() {
    let x = FILES[this.get('file')];
    let y = this.get('rank');
    return ((x+y) % 2) ?  'white' : 'black';
  }),

  piece: computed('pos', 'board.[]', function() {
    return this.get('board')[this.get('pos')];
  }),

  isActive: computed('piece', 'activePiece', function() {
    return (this.get('piece') && this.get('piece') === this.get('activePiece'));
  }),

  isMove: computed('pos', 'moves.[]', function () {
    return this.get('moves').contains(this.get('pos'));
  }),

  isWhiteMove: computed('pos', 'whiteMoves.[]', function() {
    return this.get('whiteMoves').contains(this.get('pos'));
  }),

  isBlackMove: computed('pos', 'blackMoves.[]', function() {
    return this.get('blackMoves').contains(this.get('pos'));
  }),

  disabled: computed('isMove', 'turn', 'piece.color', function() {
    if (this.get('isMove')) {
      return false;
    }

    if (this.get('piece.color') === this.get('turn')) {
      return false;
    }

    return true;
  }),


  click() {
    let piece = this.get('piece');

    // player selects this piece to play
    if (piece && piece.get('color') === this.get('turn')) {
      this.attrs['pick'](this.get('pos'), piece);
    }

    // player move selected piece here
    if (this.get('isMove')) {
      this.attrs['move'](this.get('pos'), piece);
    }

    return false;
  }


});