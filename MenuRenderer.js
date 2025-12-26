class MenuRenderer {
    draw(state) {
        background(30); 

        // --- タイトル ---
        fill(255);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(50);
        text("TETRIS", width / 2, height / 6);

        // --- メニュー項目 ---
        textSize(24);
        for (let i = 0; i < state.options.length; i++) {
            if (i === state.selected) {
                fill(255, 255, 0); 
                // state.options を参照
                text("> " + state.options[i] + " <", width / 2, height / 3 + i * 40);
            } else {
                fill(150); 
                text(state.options[i], width / 2, height / 3 + i * 40);
            }
        }

        // --- 操作説明 ---
        let guideY = height / 2 + 20;
        fill(200);
        textSize(18);
        text("【 操 作 方 法 】", width / 2, guideY);

        textAlign(LEFT, TOP);
        textSize(14);
        fill(180);
        
        let startX = width / 2 - 100;
        let spacing = 24; 

        text("移動 : A / D  または  ← / →", startX, guideY + 35);
        text("ソフトドロップ : S  または  ↓", startX, guideY + 35 + spacing);
        text("ハードドロップ : W  または  ↑", startX, guideY + 35 + spacing * 2);
        text("回転 : E (右) / Q (左)", startX, guideY + 35 + spacing * 3);
        text("ホールド : C", startX, guideY + 35 + spacing * 4);
        
        fill(100, 200, 255); 
        text("ポーズメニュー : P  または  Esc", startX, guideY + 35 + spacing * 6);

        // メニュー操作のガイド
        textAlign(CENTER, BOTTOM);
        fill(100);
        text("選択: W / S    決定: Space / Enter", width / 2, height - 10);
    }
}