/*
    Dungean Crawler

    Tile
        is wall / floor

    Map
        tiles

    Entity
        hp
        position
        attack
*/

export class Tile {
    isWall : boolean;

    entity : Entity = null;

    constructor(isWall : boolean) {
        this.isWall = isWall;
    }

    setEntity(e : Entity) {
        if (this.isWall) throw new Error("Wall tile can not contain an entity");
        if (this.entity != null) throw new Error("Tile already occupied");
        this.entity = e;
    }

    clearEntity() {
        this.entity = null;
    }

    isEmpty() {
        return !this.isWall && (this.entity == null);
    }

    getPrintString() : string {
        return this.entity == null ? (this.isWall ? "+" : " ") : this.entity.getSymbol();
    }
}

export class Map {
    private tiles : Tile[][];
    private width : number;
    private height : number;
    
    // Generate a map with walls at the edges and empty inside
    static generateBorderedMap(width : number, height : number) : Tile[][] {
        let tiles : Tile[][] = [];

        for (let i = 0; i < height; i++) {
            tiles.push([]);
            for (let j = 0; j < width; j++) {
                let isWall : boolean = i == 0 || j == 0 || i == height-1 || j == width-1;
                tiles[i].push(new Tile(isWall));
            }
        }
        return tiles;
    }

    constructor(width : number, height : number, gen : (width : number, height : number) => Tile[][]) {
        this.width = width;
        this.height = height;
        this.tiles = gen(width, height);
    }

    getTile(pos : {x : number, y : number}) : Tile;
    getTile(x : number, y : number) : Tile;
    getTile(posOrx : any, y? : number) : Tile {
        if (y != null)
            return this.tiles[y][posOrx];

        return this.tiles[posOrx.y][posOrx.x];
    }

    getPrintString() {
        let printStr : string = "";
        for (let i = 0; i < this.height; i++) {
            let rowStr : string = "";
            for (let j = 0; j < this.width; j++) {
                rowStr += this.tiles[i][j].getPrintString();
            }
            printStr += rowStr + "\n";
        }
        return printStr;
    }
}

export class Entity {
    private symbol : string;
    private health : number;
    private pos : {x : number, y : number};

    private dead : boolean;

    onDeath : () => void = function() {};
    onMove : (oldPos : {x: number, y: number}, newPos : {x: number, y: number}) => void = function(oldPos, newPos) {};

    constructor(symbol : string, health : number, pos : {x : number, y : number}) {
        this.symbol = symbol;
        this.health = health;
        this.pos = pos;

        this.dead = health <= 0;
    }

    getSymbol() : string {
        return this.symbol;
    }

    getPos() {
        return this.pos;
    }

    getHealth() {
        return this.health;
    }

    isDead() : boolean {
        return this.dead;
    }

    getHit(damage : number) {
        this.health -= damage;
        if (this.health <= 0) {
            this.dead = true;
            this.onDeath();
        }
    }

    setOnDeath(f : () => void) {
        this.onDeath = f;
    }

    move(x: number, y: number) {
        let oldPos = {x: this.pos.x, y: this.pos.y};
        this.pos.x += x;
        this.pos.y += y;

        this.onMove(oldPos, this.pos);
    }

    setOnMove(f : (oldPos : {x: number, y: number}, newPos : {x: number, y: number}) => void) {
        this.onMove = f;
    }
}