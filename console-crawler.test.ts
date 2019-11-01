import { expect } from 'chai';

import { Tile, Map, Entity } from './console-crawler';

describe('Tile', function() {
    let emptyTile : Tile = new Tile(false);
    let wallTile : Tile = new Tile(true);

    let entityTile : Tile = new Tile(false);
    let entity : Entity = new Entity("@", 10, {x: 0, y: 0});

    describe("Print String", function() {
        it("should be a ' '", function() {
            expect(emptyTile.getPrintString()).equals(' ');
        });

        it("should be a '+'", function() {
            expect(wallTile.getPrintString()).equals('+');
        });

        it("should be a '@'", function() {
            entityTile.setEntity(entity);
            expect(entityTile.getPrintString()).equals('@');
        });
        
        

        it("should be a ' '", function() {
            entityTile.clearEntity();
            expect(entityTile.getPrintString()).equals(' ');
        });
    });
})

describe('Map', function() {
    let width : number = 5;
    let height : number = 10;
    let map : Map = new Map(width, height, Map.generateBorderedMap);

    describe('Generate bordered Map', function() {
        it('Should be bordered by walls and empty inside', function() {
            // Top wall
            for (let i = 0; i < width; i++)
                expect(map.getTile(i, 0).isWall).equals(true);
            // Bottom wall
            for (let i = 0; i < width; i++)
                expect(map.getTile(i, height-1).isWall).equals(true);

            // Left wall
            for (let i = 0; i < height; i++)
                expect(map.getTile(0, i).isWall).equals(true);
            // Right wall
            for (let i = 0; i < height; i++)
                expect(map.getTile(width-1, i).isWall).equals(true);

            // Interior
            for (let i = 1; i < width-1; i++) {
                for (let j = 1; j < height-1; j++) {
                    expect(map.getTile(i, j).isWall).equals(false);
                }
            }
        }); 
    }); 
});

describe('Entity', function() {
    let symbol = "@";
    let health = 20;
    let pos = {x: 10, y: 5};

    let entity : Entity = new Entity(symbol, health, pos);

    describe('Construct new Entity', function() {
        it('Should have symbol \'@\'', function() {
                expect(entity.getSymbol()).equals("@");
        }); 

        it('Should have health = ' + health, function() {
            expect(entity.getHealth()).equals(health);
        }); 

        it('Should have pos = ' + pos.x + ", " + pos.y, function() {
            expect(entity.getPos()).equals(pos);
        }); 

        it('Should not be dead', function() {
            expect(entity.isDead()).equals(false);
        }); 
    }); 

    describe('Entity takes damage', function() {
        it('Should survive a hit of 10', function() {
            entity.getHit(10);
            expect(entity.isDead()).equals(false);
        }); 

        it('Should not survive a hit of 30', function() {
            entity.getHit(30);
            expect(entity.isDead()).equals(true);
        }); 
    }); 
});