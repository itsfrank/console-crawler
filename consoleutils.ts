import * as keypress from 'keypress';

export function registerKeypress(f:(cd , key)=>void) {
    keypress(process.stdin);
    process.stdin.on('keypress', f);
    process.stdin.setRawMode(true);
    process.stdin.resume();
}

// registerKeypress(function (ch, key) {
//     console.log('got "keypress"', key);
//     if (key && key.ctrl && key.name == 'c') {
//         process.stdin.pause();
//     }
// });

/*
    
got "keypress" { name: 'left', 
  ctrl: false,
  meta: false,
  shift: false, 
  sequence: '\u001b[D',
  code: '[D' }
got "keypress" { name: 'up', 
  ctrl: false,
  meta: false,
  shift: false,
  sequence: '\u001b[A', 
  code: '[A' }
got "keypress" { name: 'right', 
  ctrl: false,
  meta: false,
  shift: false,
  sequence: '\u001b[C', 
  code: '[C' }
got "keypress" { name: 'down', 
  ctrl: false,
  meta: false,
  shift: false, 
  sequence: '\u001b[B',
  code: '[B' }
got "keypress" { name: 'c', 
  ctrl: true,
  meta: false,
  shift: false,
  sequence: '\u0003' } 

*/