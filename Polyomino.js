class Polyomino {
    // コンストラクタ引数を新しい形式（type, shape, color...）に合わせる
    constructor(type, shape, color, center, x = 4, y = 0) {
        this.type = type;
        this.shape = shape;
        this.color = color;
        this.center = center;
        this.x = x;
        this.y = y;
        this.rotState = 0;
    }

    static rotKey = ["0", "R", "2", "L"];

    getPos() {
        return this.shape.map(([sx, sy]) => [this.x + sx, this.y + sy]);
    }

    clone() {
        // 新しいコンストラクタに合わせてコピーを作成
        const clone = new this.constructor(
            this.type,
            this.shape.map(([sx, sy]) => [sx, sy]),
            this.color,
            this.center,
            this.x,
            this.y
        );
        clone.rotState = this.rotState;
        return clone;
    }

    cloneMoved(dx, dy) {
        const clone = this.clone();
        clone.x += dx;
        clone.y += dy;
        return clone;
    }

    cloneRotatedRight() {
        const clone = this.clone();
        const [cx, cy] = clone.center;
        clone.shape = clone.shape.map(([x, y]) => {
            const dx = x - cx;
            const dy = y - cy;
            return [cx - dy, cy + dx];
        });
        return clone;
    }

    cloneRotatedLeft() {
        const clone = this.clone();
        const [cx, cy] = clone.center;
        clone.shape = clone.shape.map(([x, y]) => {
            const dx = x - cx;
            const dy = y - cy;
            return [cx + dy, cy - dx];
        });
        return clone;
    }

    getTable() { return Tetromino.SRS; }

    rotateRight(board) {
        const old = this.rotState;
        const next = (this.rotState + 1) % 4;
        const key = `${Polyomino.rotKey[old]}>${Polyomino.rotKey[next]}`;
        
        let table = this.getTable();
        if (this.type === 'I' && Tetromino.SRS_I) {
             table = Tetromino.SRS_I;
        }

        const rotated = this.cloneRotatedRight();
        const kicks = table[key] || [[0,0]];
        
        for (const [dx, dy] of kicks) {
            const moved = rotated.cloneMoved(dx, dy);
            if (board.canPlace(moved)) {
                moved.rotState = next;
                return moved;
            }
        }
        return null;
    }

    rotateLeft(board) {
        const old = this.rotState;
        const next = (this.rotState + 3) % 4;
        const key = `${Polyomino.rotKey[old]}>${Polyomino.rotKey[next]}`;

        let table = this.getTable();
        if (this.type === 'I' && Tetromino.SRS_I) {
             table = Tetromino.SRS_I;
        }

        const rotated = this.cloneRotatedLeft();
        const kicks = table[key] || [[0,0]];

        for (const [dx, dy] of kicks) {
            const moved = rotated.cloneMoved(dx, dy);
            if (board.canPlace(moved)) {
                moved.rotState = next;
                return moved;
            }
        }
        return null;
    }
}