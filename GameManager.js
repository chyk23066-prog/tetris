class GameManager {
    constructor() {
        // ===== Factory 有効フラグ =====
        this.factoryFlags = {
            normal: true,
            penta: false,
            hexa: false
        };

        // ===== 全 Factory =====
        this.allFactories = {
            normal: new TetrominoFactory(),
            penta: new PentominoFactory(),
            hexa: new HexominoFactory()
        };

        // ===== 有効 Factory 配列 =====
        this.factories = [];
        this.updateFactories();

        // ===== 偽装ファクトリー =====
        this.factory = {
            createRandom: () => {
                const f = this.factories[Math.floor(Math.random() * this.factories.length)];
                return f.createRandom();
            },
            createSevenBag: () => {
                const f = this.factories[Math.floor(Math.random() * this.factories.length)];
                if (f.createSevenBag) return f.createSevenBag();
                return f.createRandom();
            },
            setRandom: (r) => {
                this.factories.forEach(f => f.setRandom && f.setRandom(r));
            },
            reset: () => {
                this.factories.forEach(f => f.reset && f.reset());
            }
        };

        // ===== レンダラー・入力 =====
        this.renderer = new Renderer();
        this.inputHandler = new InputHandler(this);

        // ===== 状態 =====
        this.board = null;
        this.game = null;

        // ===== リプレイ =====
        this.replayData = null;
        this.isRecording = false;
        this.inputLogs = [];
        this.gameStartTime = 0;
        this.replaySeed = 0;

        // ===== 最初はメニュー =====
        this.changeState(new MenuState());
    }

    // ===============================
    // 新規ゲーム開始
    // ===============================
    startNewGame() {
        if (this.inputHandler) this.inputHandler.reset();

        this.board = new Board(10, 20);

        // シード生成
        const seed = Date.now();
        this.random = new Random(seed);

        this.factory.setRandom(this.random);
        this.factory.reset();

        // Game に全て任せる
        this.game = new Game(this.factory, this.board);

        // ===== 録画開始 =====
        this.isRecording = true;
        this.inputLogs = [];
        this.gameStartTime = millis();
        this.replaySeed = seed;

        this.changeState(new PlayState());
    }

    // ===============================
    // リプレイ開始
    // ===============================
    startReplay(replayData) {
        if (this.inputHandler) this.inputHandler.reset();

        this.board = new Board(10, 20);

        this.random = new Random(replayData.seed);
        this.factory.setRandom(this.random);
        this.factory.reset();

        this.game = new Game(this.factory, this.board);

        this.isRecording = false;

        this.changeState(new ReplayState(replayData));
    }

    // ===============================
    // 共通処理
    // ===============================
    setBlockSize(blockSize) {
        this.renderer.setBlockSize(blockSize);
    }

    update() {
        this.state.update(this);
    }

    render() {
        this.state.render(this);
    }

    changeState(newState) {
        if (this.state && this.state.exit) {
            this.state.exit(this);
        }
        this.state = newState;
        this.state.enter(this);
    }

    updateFactories() {
    this.factories = [];

    if (this.factoryFlags.normal) {
        this.factories.push(this.allFactories.normal);
    }
    if (this.factoryFlags.penta) {
        this.factories.push(this.allFactories.penta);
    }
    if (this.factoryFlags.hexa) {
        this.factories.push(this.allFactories.hexa);
    }

    // 全部OFF防止
    if (this.factories.length === 0) {
        this.factories.push(this.allFactories.normal);
        this.factoryFlags.normal = true;
    }
}

}
