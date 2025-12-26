class PauseRenderer {
    draw(state, manager) {
        const game = manager.game;
        const renderer = manager.renderer;

        // --- 1. 背景として今のゲーム画面を描画 ---
        background(255);
        if (game) {
            renderer.drawBoard(game.board);
            if (game.current) renderer.drawPolyomino(game.current);
            if (game.ghost) renderer.drawPolyomino(game.ghost, 0.3);
        }

        // --- 2. 半透明の黒い幕 ---
        fill(0, 0, 0, 150);
        rect(0, 0, width, height);

        // --- 3. ポーズメニューUI ---
        noStroke();
        textAlign(CENTER, CENTER);
        
        // ヘッダー
        fill(255);
        textSize(40);
        text("一時停止", width / 2, height / 4);

        // メニュー項目
        textSize(24);
        for (let i = 0; i < state.options.length; i++) {
            if (i === state.selected) {
                fill(255, 255, 0);
                text("> " + state.options[i] + " <", width / 2, height / 2 + i * 40);
            } else {
                fill(200);
                text(state.options[i], width / 2, height / 2 + i * 40);
            }
        }

        // ガイド
        textSize(14);
        fill(150);
        text("選択: W / S    決定: Space / Enter", width / 2, height - 30);
    }
}