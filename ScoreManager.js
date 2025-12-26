class ScoreManager {
    constructor(eventBus) {
        this.score = 0;
        this.level = 1;
        this.combo = -1;
        this.b2b = false;

        // イベント購読（将来用）
        if (eventBus) {
            eventBus.on("hard-drop", ({ dist }) => {
                this.score += dist * 2;
            });
        }
    }

    // ★ これを追加する ★
    addLines(lines) {
        // 今回は「1行 = 1点」
        this.score += lines;
    }

    getScore() {
        return this.score;
    }
}
