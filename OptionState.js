class OptionState extends State {
    constructor() {
        super();
        this.optionRenderer = new OptionRenderer();

        // 選択中の項目
        this.selectedIndex = 0;

        // 各ミノの ON / OFF
        this.isNormalMinoOn = true;
        this.isPentominoOn = false;
        this.isHexominoOn = false;

        // 項目数（3項目 + 戻る）
        this.optionCount = 4;
    }

    update(manager) {
        // 特になし
    }

    render(manager) {
        this.optionRenderer.draw(this);
    }

    onKeyDown(key, manager) {
        if (key === "arrowup") {
            this.selectedIndex--;
            if (this.selectedIndex < 0) {
                this.selectedIndex = this.optionCount - 1;
            }
        }

        if (key === "arrowdown") {
            this.selectedIndex++;
            if (this.selectedIndex >= this.optionCount) {
                this.selectedIndex = 0;
            }
        }

        if (key === "enter") {
            switch (this.selectedIndex) {
                case 0:
                    this.isNormalMinoOn = !this.isNormalMinoOn;
                    manager.factoryFlags.normal = this.isNormalMinoOn;
                    break;
        
                case 1:
                    this.isPentominoOn = !this.isPentominoOn;
                    manager.factoryFlags.penta = this.isPentominoOn;
                    break;
        
                case 2:
                    this.isHexominoOn = !this.isHexominoOn;
                    manager.factoryFlags.hexa = this.isHexominoOn;
                    break;
        
                case 3:
                    manager.changeState(new MenuState());
                    return;
            }
        
            manager.updateFactories();
        }
        

        if (key === "escape") {
            manager.changeState(new MenuState());
        }
    }
    enter(manager) {
        this.isNormalMinoOn = manager.factoryFlags.normal;
        this.isPentominoOn = manager.factoryFlags.penta;
        this.isHexominoOn = manager.factoryFlags.hexa;
    }
    
}
