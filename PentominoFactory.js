class PentominoFactory extends Factory{ //テトリミノのデータ
    constructor(){
        super();
        this.Product = Pentomino;
        this.shapes = { //形と中心
            I: { shape: [[0,0],[1,0],[2,0],[3,0],[4,0]], center: [2.5,0.5] },
            J: { shape: [[0,0],[0,1],[1,1],[2,1],[3,1]], center: [2,1] },
            L: { shape: [[0,1],[1,1],[2,1],[3,1],[3,0]], center: [2,1] },
            3: { shape: [[0,1],[1,0],[1,1],[2,1],[3,1]], center: [2,1] },
            4: { shape: [[0,1],[1,1],[2,0],[2,1],[3,1]], center: [2,1] },
            W: { shape: [[0,0],[1,0],[1,1],[2,1],[2,2]], center: [1.5,1.5] },
            6: { shape: [[0,0],[1,0],[1,1],[2,1],[3,1]], center: [2,1] },
            7: { shape: [[0,1],[1,1],[2,1],[2,0],[3,0]], center: [2,1] },
            V: { shape: [[0,0],[0,1],[0,2],[1,2],[2,2]], center: [1.5,1.5] },
            T: { shape: [[1,0],[1,1],[0,2],[1,2],[2,2]], center: [1.5,1.5] },
            P: { shape: [[0,0],[1,0],[0,1],[1,1],[2,1]], center: [1,1] },
            Q: { shape: [[1,0],[2,0],[0,1],[1,1],[2,1]], center: [1,1] },
            U: { shape: [[0,0],[0,1],[1,1],[2,0],[2,1]], center: [2,1] },
            13: { shape: [[0,0],[0,1],[1,1],[2,1],[1,2]], center: [1.5,1.5] },
            14: { shape: [[2,0],[0,1],[1,1],[2,1],[1,2]], center: [1.5,1.5] },
            15: { shape: [[1,0],[0,1],[1,1],[2,1],[1,2]], center: [1.5,1.5] },
            S: { shape: [[0,0],[0,1],[1,1],[2,1],[2,2]], center: [1.5,1.5] },
            Z: { shape: [[2,0],[0,1],[1,1],[2,1],[0,2]], center: [1.5,1.5] }



        };
        this.colors = { //色
            I: "cyan",
            J: "yellow",
            L: "purple",
            3: "green",
            4: "red",
            W: "blue",
            6: "orange",
            7: "pink",
            V: "magenta",
            T: "gray",
            P: "darkGray",
            Q: "lightGray",
            U: "brown",
            13: "gold",
            14: "silver",
            15: "lime",
            S: "navy",
            Z: "lightblue"
        };
    }
}
