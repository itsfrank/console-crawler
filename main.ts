import * as rl from 'readline-sync'

import { Tile, Map, Entity } from './console-crawler'
import { registerKeypress } from './consoleutils'

// Prompt input from user, validate response; if handleResponse returns null; the prompt will be repeated
function getValueFromUser(prompt : string, handleResponse : (resp : string) => any) : any  {
    let answer : any = handleResponse(rl.question(prompt));
    while(answer == null) {
        answer = handleResponse(rl.question(prompt));
    }
    return answer;
}

let mapWidth : number = getValueFromUser("Dungeon width: ", function(resp : string){
    let parsedResp : number = Math.floor(parseInt(resp))
    if (isNaN(parsedResp) || parsedResp < 5) {
        console.log("Invalid width (number >= 5)")
        return null;
    } 
    return parsedResp;
});

let mapHeight : number = getValueFromUser("Dungeon height: ", function(resp : string){
    let parsedResp : number = Math.floor(parseInt(resp))
    if (isNaN(parsedResp) || parsedResp < 5) {
        console.log("Invalid height (number >= 5)")
        return null;
    } 
    return parsedResp;
});

let map : Map = new Map(mapWidth, mapHeight, Map.generateBorderedMap);

let player : Entity = new Entity("P", 10, {x: 1, y: 1});
let monster : Entity = new Entity("M", 20, {x: 5, y: 5});

player.setOnMove(function(oldPos : {x: number, y: number}, newPos : {x: number, y: number}){
    map.getTile(oldPos).clearEntity();
    map.getTile(newPos).setEntity(player);
});


map.getTile(player.getPos().x, player.getPos().y).setEntity(player);
map.getTile(monster.getPos().x, monster.getPos().y).setEntity(monster);

for (let i = 0; i < 70; i++) console.log("");
process.stdout.write("\u001b[2J\u001b[0;0H");
console.log(map.getPrintString());

// Game loop will be determined by key presses
// got "keypress" { name: 'left', 
//   ctrl: false,
//   meta: false,
//   shift: false, 
//   sequence: '\u001b[D',
//   code: '[D' }

registerKeypress(function (ch, key) {
    let move : {x: number, y: number} = null;
    if (key && key.name == 'up') {
        move = {x: 0, y: -1};
    }
    else if (key && key.name == 'down') {
        move = {x: 0, y: 1};
    }
    else if (key && key.name == 'right') {
        move = {x: 1, y: 0};
    }
    else if (key && key.name == 'left') {
        move = {x: -1, y: 0};
    }

    if (move) {
        let tileTo : Tile = map.getTile(player.getPos().x + move.x, player.getPos().y + move.y);
        
        let message : string = "";

        if (tileTo.isEmpty()) {
            player.move(move.x, move.y);
        } else if (tileTo.entity != null) {
            tileTo.entity.getHit(10);
            message = "Player hits monster for 10 damage.";

            if (tileTo.entity.isDead()) {
                message += " Monster dies!";
                tileTo.clearEntity();
                player.move(move.x, move.y);
            }
        }

        process.stdout.write("\u001b[2J\u001b[0;0H");
        console.log(map.getPrintString());
        console.log(message);
    }

    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
    }
});