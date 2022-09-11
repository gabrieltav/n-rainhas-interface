/**
 *  Motor BackTracking para resolver o problema das n-queens
 *  Desenvolvedores : Carlos Eduardo, Gabriel Tavares, Lucas Weslen e Marcos Vinicius
 */

class NQueensBacktrackingEngine {
  constructor(n = 8) {
    this.n = n;
  }

  get n() {
    return this._n;
  }

  set n(n) {
    this._n = n;
  }

  /**
   * criando uma matriz bidimensional que contém zeros e uns.
   * zeros representam células vazias e uns representam rainhas
   */
  generateBoard() {
    const { n } = this;
    this.board = Array.from(Array(n)).map(() => Array(n).fill(0));
  }

  *run() {
    this.generateBoard();

    for (let res of this._solve()) {
      yield res;
    }
  }

  *_solve(row = 0) {
    const { n, board } = this;

    if (row >= n) {
      return true;
    }

    for (let i = 0; i < n; i++) {
      if (this._isUnderAttack(i, row)) continue;

      board[row][i] = 1;
      yield this._deepClone(board);

      if (yield* this._solve(row + 1)) {
        return true;
      }

      board[row][i] = 0;
    }

    return false;
  }

  _deepClone(i) {
    return JSON.parse(JSON.stringify(i));
  }

  /**
   * verificar (x, y) a posição está sob ataque de outras rainhas substituídas ou não
   * @param {int} x - O índice da coluna da rainha
   * @param {int} y - O índice de linha da rainha
   * @returns {boolean}
   * @private
   */
  _isUnderAttack(x, y) {
    const { n, board } = this;

    // verificando ataques de linhas e colunas
    for (let i = 0; i < n; i++) {
      if (board[y][i] || board[i][x]) {
        return true;
      }
    }

    // verificando ataques diagonais
    for (let j = 0; j < n; j++) {
      for (let i = 0; i < n; i++) {
        if (!board[j][i]) continue;

        // calcule o gradiente da linha que passa por (x, y) e (i, j)
        const gradient = Math.abs((y - j) / (x - i));

        // se gradiente for igual a um, (x, y) rainha está sob ataque de (i, j) rainha
        if (gradient === 1) return true;
      }
    }

    return false;
  }
}
