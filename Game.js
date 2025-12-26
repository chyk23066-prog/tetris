class Game {
    constructor(factory, board) {
        this.factory = factory;
        this.board = board;

        // ===== ブロック管理 =====
        this.current = this.factory.createSevenBag();
        this.next = this.factory.createSevenBag();
        this.hold = null;
        this.canHold = true;

        // ===== ゴースト =====
        this.ghost = null;
        this.updateGhost();

        // ===== 落下・固定設定 =====
        this.dropInterval = 1000;
        this.lastDropTime = millis();

        this.lockDelay = 500;
        this.lockTimer = 0;
        this.lockMoveResets = 0;
        this.maxLockResets = 15;

        // ===== スコア =====
        this.scoreManager = new ScoreManager();

        // ===== エフェクト =====
        this.effect = null;
    }

    // ===============================
    // 毎フレーム更新
    // ===============================
    update() {
        if (millis() - this.lastDropTime > this.dropInterval) {
            this.lastDropTime = millis();
            if (!this.move(0, 1)) {
                this.startLockDelay();
            }
        }
        this.updateLockDelay();
    }

    // ===============================
    // 移動
    // ===============================
    move(dx, dy) {
        const moved = this.current.cloneMoved(dx, dy);
        if (this.board.canPlace(moved)) {
            this.current = moved;
            this.updateGhost();
            this.resetLockDelay();
            return true;
        }
        return false;
    }

    // ===============================
    // 回転
    // ===============================
    rotateRight() {
        const rotated = this.current.rotateRight(this.board);
        if (rotated) {
            this.current = rotated;
            this.updateGhost();
            this.resetLockDelay();
        }
    }

    rotateLeft() {
        const rotated = this.current.rotateLeft(this.board);
        if (rotated) {
            this.current = rotated;
            this.updateGhost();
            this.resetLockDelay();
        }
    }

    // ===============================
    // 次ブロック生成
    // ===============================
    spawnNext() {
        this.current = this.next;
        this.next = this.factory.createSevenBag();
        this.canHold = true;

        // 出現時即死チェック
        if (!this.board.canPlace(this.current)) {
            eventBus.emit("game-over");
            return;
        }

        this.updateGhost();
        this.lockTimer = 0;
        this.lockMoveResets = 0;
    }

    // ===============================
    // ホールド
    // ===============================
    swapHold() {
        if (!this.canHold) return;

        if (this.hold != null) {
            const tmp = this.hold;
            this.hold = this.current;
            this.current = tmp;
        } else {
            this.hold = this.current;
            this.spawnNext();
        }

        // 位置リセット
        this.current.x = 4;
        this.current.y = 0;

        // 即死防止
        if (!this.board.canPlace(this.current)) {
            eventBus.emit("game-over");
            return;
        }

        this.canHold = false;
        this.updateGhost();
    }

    // ===============================
    // ゴースト更新
    // ===============================
    updateGhost() {
        if (!this.current) return;

        let clone = this.current.clone();
        while (this.board.canPlace(clone.cloneMoved(0, 1))) {
            clone = clone.cloneMoved(0, 1);
        }
        this.ghost = clone;
    }

    // ===============================
    // ロックディレイ
    // ===============================
    startLockDelay() {
        if (this.lockTimer === 0) {
            this.lockTimer = millis();
            this.lockMoveResets = 0;
        }
    }

    updateLockDelay() {
        if (this.lockTimer === 0) return;

        if (millis() - this.lockTimer >= this.lockDelay) {
            this.lockPiece();
        }
    }

    resetLockDelay() {
        if (this.lockTimer > 0 && this.lockMoveResets < this.maxLockResets) {
            this.lockTimer = millis();
            this.lockMoveResets++;
        }
    }

    // ===============================
    // 固定処理
    // ===============================
    lockPiece() {
        this.board.fix(this.current);

        const cleared = this.board.clearLines();
        if (cleared > 0) {
            this.scoreManager.addLines(cleared);
        }

        this.spawnNext();
    }

    // ===============================
    // エフェクト選択
    // ===============================
    select(key) {
        switch (key) {
            case "1": this.effect = new SquareBomb(); break;
            case "2": this.effect = new CrossBomb(); break;
            case "3": this.effect = new VerticalBomb(); break;
            case "4": this.effect = new HorizontalBomb(); break;
            case "5": this.effect = new GravityBomb(); break;
            case "6": this.effect = null; break;
        }
    }

    // ===============================
    // エフェクト発動
    // ===============================
    detonate(size) {
        if (!this.effect) return;

        this.effect.apply(
            this.board,
            this.toBoardPos(mouseX, size),
            this.toBoardPos(mouseY, size)
        );

        this.board.clearLines();
    }

    toBoardPos(pos, size) {
        return Math.floor(pos / size);
    }
}
