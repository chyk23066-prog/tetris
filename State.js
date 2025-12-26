class State {
    constructor() {}
    enter(manager) {}
    exit(manager) {}
    update(manager) {}
    render(manager) {}
    
    // 【追加】キー入力があったときに呼ばれるメソッド
    onKeyDown(key, manager) {} 
    onKeyUp(key, manager) {}
}