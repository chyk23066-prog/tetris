class MenuState extends State {
    constructor() {
        super();
        this.options = ["ゲームスタート", "オプション"];
        this.selected = 0;
        this.menuRenderer = new MenuRenderer();
    }

    enter(manager) {
        console.log("Enter Menu");
    }

    update(manager) {
        // --- マウス判定 ---
        let startY = height / 3;
        let spacing = 40;

        for (let i = 0; i < this.options.length; i++) {
            let itemY = startY + i * spacing;
            
            if (mouseY > itemY - 15 && mouseY < itemY + 15 &&
                mouseX > width / 2 - 120 && mouseX < width / 2 + 120) {
                this.selected = i;
            }
        }
    }

    render(manager) {
        if (this.menuRenderer) {
            this.menuRenderer.draw(this);
        }
    }

    // ★追加: マウスクリック時の処理
    onMousePressed(manager) {
        let startY = height / 3;
        let itemY = startY + this.selected * 40;

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
    }

    selectOption(manager) {
        if (this.selected === 0) {
            manager.startNewGame();
        } else if (this.selected === 1) {
            manager.changeState(new OptionState());
        }
    }
}