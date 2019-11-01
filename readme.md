# Console-Crawler

A console rogue clone built in ~1h 40m.

To play just `npm i` and `npm start`

Use the arrow keys to move; if you move into the monster you hit it.

This is more of a console rogue clone "base" than an actual game; one could extend it by designing levels adding different monster and equipment.

Sample output:
```
> npm start 

> ts-minesweeper@1.0.0 start /mnt/c/Users/obrienfr/work/console-crawler 
> ts-node main.ts

Dungeon width: 30 
Dungeon height: 10 

++++++++++++++++++++++++++++++
+P                           +
+                            +
+                            +
+                            +
+    M                       +
+                            +
+                            +
+                            +
++++++++++++++++++++++++++++++

... 5 moves later ...

++++++++++++++++++++++++++++++ 
+                            + 
+                            + 
+                            + 
+  P                         + 
+    M                       + 
+                            + 
+                            + 
+                            + 
++++++++++++++++++++++++++++++ 

... 3 moves later ...

++++++++++++++++++++++++++++++     
+                            +     
+                            +     
+                            +     
+                            +     
+   PM                       +     
+                            +     
+                            +     
+                            +     
++++++++++++++++++++++++++++++     

Player hits monster for 10 damage. 

++++++++++++++++++++++++++++++
+                            +
+                            +
+                            +
+                            +
+    P                       +
+                            +
+                            +
+                            +
++++++++++++++++++++++++++++++

Player hits monster for 10 damage. Monster dies! 
```