class PlayState extends State {
    constructor() {
        super();
        this.onGameOver = null; // ゲームオーバーイベント用
    }

    enter(manager) {
        console.log("Game Start");
    
        this.onGameOver = () => {
    
            // ★ リプレイ用データを保存（← 今これが無い）
            manager.replayData = {
                seed: manager.replaySeed,
                logs: manager.inputLogs
            };
    
            manager.changeState(new GameOverState());
        };
    
        eventBus.on("game-over", this.onGameOver);
    }
    

    exit(manager) {
        // ★イベント監視解除
        if (this.onGameOver) {
            eventBus.off("game-over", this.onGameOver);
        }
    }

    update(manager) {
        manager.game.update();
    }

    render(manager) {
        const game = manager.game;
        const renderer = manager.renderer;

        // ===== 盤面描画 =====
        renderer.drawBoard(game.board);

        // ゴーストを先に描画（見やすくなる）
        if (game.ghost) {
            renderer.drawPolyomino(game.ghost, 0.3);
        }

        // 現在のブロック
        if (game.current) {
            renderer.drawPolyomino(game.current);
        }

        // ===== UI表示 =====
        if (game.scoreManager) {
            renderer.drawScore(game.scoreManager);
        }

        renderer.drawNextFrame();
        if (game.next) {
            renderer.drawNext(game.next);
        }

        renderer.drawHoldFrame();
        if (game.hold) {
            renderer.drawHold(game.hold);
        }

        // もし renderer にまとめてUI描画メソッドがあれば呼び出す（任意）
        if (renderer.drawGameUI) {
            renderer.drawGameUI(game);
        }
    }
}
