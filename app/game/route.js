import Ember from 'ember';

export default Ember.Route.extend({
});


/*

https://en.wikipedia.org/wiki/Algebraic_notation_(chess)
K for king, Q for queen, R for rook, B for bishop, and N for knight

A two columns, as White/Black pairs, preceded by the move number and a period:
1. e4 e5
2. Nf3 Nc6
3. Bb5 a6

Capture:
When a piece makes a capture, an "x" is inserted immediately before the destination square.
For example, Bxe5 (bishop captures the piece on e5).

When a pawn makes a capture, the file from which the pawn departed is used to identify the pawn.
For example, exd5 (pawn on the e-file captures the piece on d5)

file = x
rank = y

Pawn promotion

1. e4 c5 2. Nf3 d6 3. Bb5+ Bd7 4. Bxd7+ Qxd7 5. c4 Nc6 6. Nc3 Nf6 7. 0-0 g6 8. d4 cxd4 9. Nxd4 Bg7 10. Nde2 Qe6!?



When a pawn moves to the last rank and promotes, the piece promoted to is indicated at the end of the move notation,
for example: e8Q (promoting to queen).  In Portable Game Notation (PGN), pawn promotion is always indicated using
the equals sign format (e8=Q)

End of game
The notation 1–0 at the completion of moves indicates that White won,
0–1 indicates that Black won, and ½–½ indicates a draw.


https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation

starting position:
rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1

FEN after 1. e4:
rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1

FEN after 1. ... c5:
rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2

And then after 2. Nf3:
rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2
*/