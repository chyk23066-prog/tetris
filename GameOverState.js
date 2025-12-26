class GameOverState extends State {
    enter(manager) {
        console.log("Game Over");
    }

    render(manager) {
        background(0);

        fill(255, 0, 0);
        textSize(48);
        textAlign(CENTER, CENTER);
        text("GAME OVER", width / 2, height / 2 - 60);

        fill(255);
        textSize(20);
        textAlign(CENTER, CENTER);
        text("R : Replay", width / 2, height / 2);
        text("Enter : New Game", width / 2, height / 2 + 30);
        text("M : Menu", width / 2, height / 2 + 60); // ← 追加
    }

    onKeyDown(key, manager) {
        // 🔁 リプレイ
        if (key === "r") {
            if (manager.replayData) {
                manager.startReplay(manager.replayData);
            } else {
                console.warn("Replay data not found");
            }
        }

        // ▶ 新しいゲーム
        if (key === "enter") {
            manager.startNewGame();
        }

        // 🏠 メニューに戻る
        if (key === "m") {
            manager.changeState(new MenuState());
        }
    }
}
