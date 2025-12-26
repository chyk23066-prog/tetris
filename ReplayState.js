class ReplayState extends State {
    constructor(replayData) {
        super();
        this.replayData = replayData;
        this.logs = (this.replayData && this.replayData.logs) ? this.replayData.logs : [];
        this.logIndex = 0;
        this.replayStartTime = 0;
        this.replayEndTime = null;
    }

    enter(manager) {
        this.manager = manager;
        this.game = manager.game;
        this.renderer = manager.renderer;

        this.replayStartTime = millis();
        this.logIndex = 0;
        this.replayEndTime = null;

        console.log("Replay Start: " + this.logs.length + " events");
    }

    update(manager) {
        const now = millis() - this.replayStartTime;

        // ===== 入力ログ再生 =====
        while (this.logIndex < this.logs.length) {
            const log = this.logs[this.logIndex];

            if (log.time <= now) {
                if (log.type === "down") {
                    manager.inputHandler.onKeyDown(log.key, true);
                } else if (log.type === "up") {
                    manager.inputHandler.onKeyUp(log.key, true);
                }
                this.logIndex++;
            } else {
                break;
            }
        }

        manager.game.update();

        // ===== リプレイ終了判定 =====
        if (this.logIndex >= this.logs.length) {
            if (this.replayEndTime === null) {
                this.replayEndTime = millis();
            }
            if (millis() - this.replayEndTime > 500) {
                manager.changeState(new MenuState());
            }
        }
    }

    render(manager) {
        const game = manager.game;
        const renderer = manager.renderer;
    
        background(255);
    
        // ===== ゲーム盤面 =====
        renderer.drawBoard(game.board);
        if (game.current) renderer.drawPolyomino(game.current);
        if (game.ghost) renderer.drawPolyomino(game.ghost, 0.3);
    
        // ===== UI 枠と中身 =====
        renderer.drawNextFrame();
        renderer.drawHoldFrame();
        renderer.drawScoreFrame();
    
        renderer.drawNext(game.next);
        renderer.drawHold(game.hold);
        renderer.drawScore(game.scoreManager);
    
        // ===== REPLAY 表示（右下） =====
        push();
        fill(0, 180, 0);
        noStroke();
        textSize(20);
        textAlign(RIGHT, BOTTOM);
        text("● REPLAY", width - 20, height - 20);
        pop();
    
        // ===== ENTERで終了表示（画面下中央） =====
        push();
        fill(50);
        noStroke();
        textSize(14);
        textAlign(CENTER, BOTTOM);
        text("ENTERで終了", width / 2, height - 10);
        pop();
    }
    

    // ===== マウスクリックで途中終了 =====
    onMousePressed(manager) {
        manager.changeState(new MenuState());
    }

    // ===== キー押下で途中終了 =====
    onKeyDown(key, manager) {
        if (key === "escape" || key === "enter") {
            manager.changeState(new MenuState());
        }
    }
}
