class PauseState extends State {
    constructor() {
        super();
        this.options = ["再開する", "リプレイを見る", "タイトルへ戻る"];
        this.selected = 0;
        this.pauseRenderer = new PauseRenderer();
    }

    enter(manager) {
        console.log("Game Paused");
    }

    update(manager) {
        // --- マウス判定 ---
        // テキストの位置に合わせて、マウスが重なっているかチェック
        let startY = height / 2;
        let spacing = 40; // 間隔

        for (let i = 0; i < this.options.length; i++) {
            let itemY = startY + i * spacing;
            
            // 文字の周辺にマウスがあれば選択状態にする
            if (mouseY > itemY - 15 && mouseY < itemY + 15 &&
                mouseX > width / 2 - 120 && mouseX < width / 2 + 120) {
                this.selected = i;
            }
        }
    }

    render(manager) {
        if (this.pauseRenderer) {
            this.pauseRenderer.draw(this, manager);
        }
    }

    // ★追加: マウスクリック時の処理
    onMousePressed(manager) {
        let startY = height / 2;
        let itemY = startY + this.selected * 40;

        // 現在選ばれている項目の上でクリックされたか確認
        if (mouseY > itemY - 15 && mouseY < itemY + 15 &&
            mouseX > width / 2 - 120 && mouseX < width / 2 + 120) {
            this.selectOption(manager);
        }
    }

    onKeyDown(key, manager) {
        if (key === 'w' || key === 'arrowup') {
            this.selected--;
            if (this.selected < 0) this.selected = this.options.length - 1;
        }
        if (key === 's' || key === 'arrowdown') {
            this.selected++;
            if (this.selected >= this.options.length) this.selected = 0;
        }
        if (key === ' ' || key === 'enter') {
            this.selectOption(manager);
        }
        if (key === 'escape' || key === 'p') {
            manager.changeState(new PlayState());
        }
    }

    selectOption(manager) {
        if (this.selected === 0) {
            manager.changeState(new PlayState());
        } else if (this.selected === 1) {
            if (manager.inputLogs && manager.inputLogs.length > 0) {
                manager.startReplay({ seed: manager.replaySeed, logs: manager.inputLogs });
            }
        } else if (this.selected === 2) {
            manager.changeState(new MenuState());
        }
    }
}