class OptionRenderer {
    draw(state) {
        background(50, 50, 80);

        fill(255);
        textAlign(CENTER, CENTER);

        // --- タイトル ---
        textSize(32);
        text("オプション", width / 2, height / 4);

        textSize(20);

        const startY = height / 2 - 60;
        const lineH = 40;

        const options = [
            `通常ミノ : ${state.isNormalMinoOn ? "ON" : "OFF"}`,
            `5ミノ : ${state.isPentominoOn ? "ON" : "OFF"}`,
            `6ミノ : ${state.isHexominoOn ? "ON" : "OFF"}`,
            "戻る"
        ];

        for (let i = 0; i < options.length; i++) {
            if (state.selectedIndex === i) {
                fill(255, 200, 0);
                text("▶ " + options[i], width / 2, startY + i * lineH);
            } else {
                fill(255);
                text(options[i], width / 2, startY + i * lineH);
            }
        }

        // --- 操作ガイド ---
        textSize(16);
        fill(200);
        text("↑↓で選択 / Enterで切替 / Escで戻る", width / 2, height - 80);
    }
}
