import Ember from 'ember';

import { FILES, WHITE, BLACK } from '../../utils/pieces';

const { computed } = Ember;

export default Ember.Component.extend({

  tagName: 'td',

  attributeBindings: ['pos:data-id', 'disabled'],
  classNameBindings: ['color', 'isMove', 'isActive'],

  // attrs
  file: null,
  rank: null,
  board: [],
  moves: [],
  turn: null,
  activePiece: null,

  // props
  isActive: false,
  disabled: false,

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
    return (this.get('piece') && this.get('activePiece') && this.get('piece') === this.get('activePiece'));
  }),

  isMove: computed('pos', 'moves.[]', function () {
    return this.get('moves').contains(this.get('pos'));
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