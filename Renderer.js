class Renderer{ //描画処理
    setBlockSize(blockSize){
        this.blockSize = blockSize;
    }

    drawBoard(board){ //ボードを描画
        const w =  board.width;
        const h = board.height;

        for(let i = 0; i < h; i++){
            for(let j = 0; j < w; j++){
                const cell = board.grid[i][j];
                if(cell){
                    fill(cell.color);
                }else{
                    fill("white");
                }
                rect(
                    j * this.blockSize,
                    i * this.blockSize,
                    this.blockSize,
                    this.blockSize,
                );
            }
        }
    }

    drawReplayFrame(board) {
        const size = this.blockSize;
    
        push();
    
        // リプレイ感を出すための色・線
        noFill();
        stroke(0, 255, 0);   // 緑
        strokeWeight(3);
        drawingContext.setLineDash([6, 6]); // 点線
    
        rect(
            0,
            0,
            board.width * size,
            board.height * size
        );
    
        // ダッシュ解除
        drawingContext.setLineDash([]);
        pop();
    }
    

    drawPolyomino(polyomino, alpha = 1.0){ //ブロックを描画
        drawingContext.globalAlpha = alpha; //透明度

        fill(polyomino.color);
        stroke(0);
        strokeWeight(1);

        for(const [x, y] of polyomino.getPos()){
            rect(
                x * this.blockSize,
                y * this.blockSize,
                this.blockSize,
                this.blockSize
            );
        }

        drawingContext.globalAlpha = 1.0; //デフォルトに戻す
    }
    //以下追加　竹内
    drawNextFrame() {
        if (!this.blockSize) return;

        const size = this.blockSize;
    
        const frameWidth = 6;
        const frameHeight = 6;
        const offsetX = 10.5;  // ← ここはあなたが設定した値でOK
        const offsetY = 1;
    
        // --- ここで大きさを調整 ---
        const frameSize = size * 0.9;  // ← 正方形をほんの少し小さくする
    
        push();
    
        // 背景
        noStroke();
        fill("white");
        rect(
            offsetX * size,
            offsetY * size,
            frameWidth * frameSize,
            frameHeight * frameSize
        );
    
        // 枠線
        noFill();
        stroke(0);
        strokeWeight(1);  // ← ここを細くする
        rect(
            offsetX * size,
            offsetY * size,
            frameWidth * frameSize,
            frameHeight * frameSize
        );

    
        // NEXTラベル
        noStroke();
        fill(0);
        textSize(Math.max(12, frameSize * 0.8));
        textAlign(CENTER, TOP);
        text(
            "NEXT",
            (offsetX * size) + (frameWidth * frameSize) / 2,
            offsetY * size - (frameSize * 0.9)
        );
    
        pop();
    }
    

    drawNext(polyomino){
        if (!polyomino || !this.blockSize) return;
    
        const size = this.blockSize;
    
        // NEXT フレームの開始位置（drawNextFrame に合わせる）
        const frameOffsetX = 10.5;
        const frameOffsetY = 1;
        const frameSize = size * 0.9;
        const frameWidth = 6;
        const frameHeight = 6;
    
        // フレームの中心座標（px）
        const centerX = frameOffsetX * size + (frameWidth * frameSize) / 2;
        const centerY = frameOffsetY * size + (frameHeight * frameSize) / 2;
    
        // --- 次ブロックを中央に配置するための処理 ---
        // polyomino.shape = [[sx, sy], ...] の相対座標
        const xs = polyomino.shape.map(s => s[0]);
        const ys = polyomino.shape.map(s => s[1]);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);
    
        const polyWidth = (maxX - minX + 1) * size;
        const polyHeight = (maxY - minY + 1) * size;
    
        // 左上の表示基準位置（px）
        const baseX = centerX - polyWidth / 2;
        const baseY = centerY - polyHeight / 2;
    
        // ---- 描画 ----
        push();
        fill(polyomino.color);
        stroke(0);
        strokeWeight(1);
    
        for (const [sx, sy] of polyomino.shape) {
            rect(
                baseX + (sx - minX) * size,
                baseY + (sy - minY) * size,
                size,
                size
            );
        }
    
        pop();
    }

    
    drawHoldFrame() {
        if (!this.blockSize) return;
    
        const frameWidth = 6;
        const frameHeight = 6;
        const offsetX = 10.5;
        const offsetY = 9;
    
        const size = this.blockSize;
        const frameSize = size * 0.9;
    
        push();
    
        // 背景
        noStroke();
        fill("white");
        rect(
            offsetX * size,
            offsetY * size,
            frameWidth * frameSize,
            frameHeight * frameSize
        );
    
        // 枠線
        noFill();
        stroke(0);
        strokeWeight(1);
        rect(
            offsetX * size,
            offsetY * size,
            frameWidth * frameSize,
            frameHeight * frameSize
        );
    
        // HOLD ラベル
        noStroke();
        fill(0);
        textSize(Math.max(12, frameSize * 0.8));
        textAlign(CENTER, TOP);
        text(
            "HOLD",
            (offsetX * size) + (frameWidth * frameSize) / 2,
            offsetY * size - (frameSize * 0.9)
        );
    
        pop();
    }

    drawHold(polyomino){
        if (!polyomino || !this.blockSize) return;
    
        const size = this.blockSize;
    
        // HOLD フレームの開始位置（drawHoldFrame に合わせる）
        const frameOffsetX = 10.5;
        const frameOffsetY = 9;
        const frameSize = size * 0.9;
        const frameWidth = 6;
        const frameHeight = 6;
    
        // フレームの中心座標（px）
        const centerX = frameOffsetX * size + (frameWidth * frameSize) / 2;
        const centerY = frameOffsetY * size + (frameHeight * frameSize) / 2;
    
        // --- ブロックの幅と高さを計算（NEXT と同じ）---
        const xs = polyomino.shape.map(s => s[0]);
        const ys = polyomino.shape.map(s => s[1]);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);
    
        const polyWidth = (maxX - minX + 1) * size;
        const polyHeight = (maxY - minY + 1) * size;
    
        // 左上の表示基準位置（px）
        const baseX = centerX - polyWidth / 2;
        const baseY = centerY - polyHeight / 2;
    
        // ---- 描画 ----
        push();
        fill(polyomino.color);
        stroke(0);
        strokeWeight(1);
    
        for (const [sx, sy] of polyomino.shape) {
            rect(
                baseX + (sx - minX) * size,
                baseY + (sy - minY) * size,
                size,
                size
            );
        }
    
        pop();
    }
    
    drawScoreFrame(){
        if (!this.blockSize) return;
    
        const frameWidth = 6;
        const frameHeight = 3;
        const offsetX = 10.5;
        const offsetY = 16;
    
        const size = this.blockSize;
        const frameSize = size * 0.9;
    
        push();
    
        // 背景
        noStroke();
        fill("white");
        rect(
            offsetX * size,
            offsetY * size,
            frameWidth * frameSize,
            frameHeight * frameSize
        );
    
        // 枠線
        noFill();
        stroke(0);
        strokeWeight(1);
        rect(
            offsetX * size,
            offsetY * size,
            frameWidth * frameSize,
            frameHeight * frameSize
        );
    
        // SCORE ラベル
        noStroke();
        fill(0);
        textAlign(CENTER, TOP);
        textSize(Math.max(12, frameSize * 0.7));
        text(
            "SCORE",
            offsetX * size + (frameWidth * frameSize) / 2,
            offsetY * size - frameSize * 0.7
        );
    
        pop();
    }

    //追加
    drawScore(scoreManager){
        if (!this.blockSize) return;
    
        const size = this.blockSize;
        const frameWidth = 6;
        const frameHeight = 3;
    
        const offsetX = 10.5;
        const offsetY = 16;
    
        const frameSize = size * 0.9;
    
        push();
    
        // 数値だけ表示
        noStroke();
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(frameSize);
        text(
            scoreManager.score,
            offsetX * size + (frameWidth * frameSize) / 2,
            offsetY * size + (frameHeight * frameSize) / 2
        );
    
        pop();
    }
    
}