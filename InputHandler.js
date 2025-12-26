class InputHandler {
    constructor(manager) {
        this.manager = manager;
        this.pressed = {};

        // ===== 操作パラメータ =====
        this.DAS = 150;
        this.ARR = 30;
        this.SDI = 50;

        // フォーカス外れたら入力リセット
        window.addEventListener('blur', () => { this.reset(); });
    }

    get game() {
        return this.manager.game;
    }

    // ===== 入力リセット =====
    reset() {
        this.pressed = {};
    }

    // ===== 毎フレーム更新（Play / Replay 両対応） =====
    update() {
        const state = this.manager.state;

        if (
            !(state instanceof PlayState) &&
            !(state instanceof ReplayState)
        ) return;

        if (!this.game) return;

        const now = millis();

        // 横移動（DAS + ARR）
        ["a", "d", "arrowleft", "arrowright"].forEach(k => {
            const s = this.pressed[k];
            if (!s) return;

            const sincePressed = now - s.timePressed;
            const sinceAct = now - s.lastAct;

            if (sincePressed >= this.DAS && sinceAct >= this.ARR) {
                this.handle(k);
                s.lastAct = now;
            }
        });

        // 下移動（SDI）
        ["s", "arrowdown"].forEach(k => {
            const s = this.pressed[k];
            if (!s) return;

            if (now - s.lastAct >= this.SDI) {
                this.handle("s");
                s.lastAct = now;
            }
        });
    }

    // ===== 実際の操作処理 =====
    handle(key) {
        if (!this.game) return;

        // 矢印キー正規化
        if (key === "arrowup") key = "w";
        if (key === "arrowleft") key = "a";
        if (key === "arrowdown") key = "s";
        if (key === "arrowright") key = "d";

        switch (key) {
            // ===== ハードドロップ =====
            case "w":
                while (this.game.move(0, 1)) {}
                this.game.lockPiece();
                break;

            // ===== 移動 =====
            case "a": this.game.move(-1, 0); break;
            case "d": this.game.move(1, 0); break;
            case "s": this.game.move(0, 1); break;

            // ===== 回転 =====
            case "e": this.game.rotateRight(); break;
            case "q": this.game.rotateLeft(); break;

            // ===== ホールド =====
            case "c": this.game.swapHold(); break;

            // ===== アイテム選択 =====
            // ===== アイテム選択 =====
            default:
                if (key === "1") {
                this.game.spawnSpecialSingle();
            }
            break;}
    }

    // ===== キー押下 =====
    onKeyDown(key, isReplay = false) {
        key = key.toLowerCase();

        // Replay 中は state に通知しない
        if (!isReplay && this.manager.state?.onKeyDown) {
            this.manager.state.onKeyDown(key, this.manager);
        }

        // Play / Replay 以外では操作不可
        const state = this.manager.state;
        if (
            !(state instanceof PlayState) &&
            !(state instanceof ReplayState)
        ) return;

        // ===== ポーズ（実プレイのみ） =====
        if (
            !isReplay &&
            state instanceof PlayState &&
            (key === "escape" || key === "p")
        ) {
            this.reset();
            this.manager.changeState(new PauseState());
            return;
        }

        // ===== 録画（実プレイのみ） =====
        if (this.manager.isRecording && !isReplay) {
            this.manager.inputLogs.push({
                time: millis() - this.manager.gameStartTime,
                type: "down",
                key
            });
        }

        // 初押し
        if (!this.pressed[key]) {
            const now = millis();
            this.pressed[key] = {
                timePressed: now,
                lastAct: now
            };
            this.handle(key);
        }
    }

    // ===== キー離上 =====
    onKeyUp(key, isReplay = false) {
        key = key.toLowerCase();

        if (!isReplay && this.manager.state?.onKeyUp) {
            this.manager.state.onKeyUp(key, this.manager);
        }

        if (key === "escape" || key === "p") return;

        // 録画
        if (this.manager.isRecording && !isReplay) {
            this.manager.inputLogs.push({
                time: millis() - this.manager.gameStartTime,
                type: "up",
                key
            });
        }

        delete this.pressed[key];
    }

    // ===== マウス入力 =====
    onMousePressed() {
        if (this.manager.state?.onMousePressed) {
            this.manager.state.onMousePressed(this.manager);
        }
    }
}
