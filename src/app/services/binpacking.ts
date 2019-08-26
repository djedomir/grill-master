import { Injectable } from '@angular/core';

/******************************************************************************
The following code is taken from the "binpacker" node module
and translated to Typescript. I couldn't get a d.ts file for this package to work.
From its capabilities it's binary tree packing without the ability to rotate the item.
******************************************************************************/
export interface Item {
    /**
     * Width
     */
    w: number;
    /**
     * Height
     */
    h: number;
    /**
     * Side-effect by the binpack package once the block has been packed into
     * the container area.
     */
    fit?: { x: number; y: number };
  }
  
  interface Partitionable {
    x: number;
    y: number;
    w: number;
    h: number;
    used: boolean;
    down?: Partitionable;
    right?: Partitionable;
  }
 @Injectable({
    providedIn: 'root',
})
export class PackerService {
    root: Partitionable;
  
    constructor() {
    }

    setRoot(width: number, height: number): void {
      this.root = { x: 0, y: 0, w: width, h: height, used: false };
    }
  
    fit(blocks: Item[]) {
      let node = null;
      for (const block of blocks) {
        this.rotateItemIfMust(block);
        node = this.findNode(this.root, block.w, block.h);
        if (node) block.fit = this.splitNode(node, block.w, block.h);
      }
    }
  
    private findNode(box: Partitionable, w: number, h: number): any {
      if (box.used) {
        return this.findNode(box.right!, w, h) || this.findNode(box.down!, w, h);
      } else if (w <= box.w && h <= box.h) return box;
      else return null;
    }
  
    private splitNode(node: Partitionable, w: number, h: number) {
      node.used = true;
      node.down = { x: node.x, y: node.y + h, w: node.w, h: node.h - h, used: false };
      node.right = { x: node.x + w, y: node.y, w: node.w - w, h, used: false };
      return node;
    }

    private rotateItemIfMust(item: any) {
        if (item.w > this.root.w) {
            const h = item.h;
            item.h = item.w;
            item.w = h;
        } else if(item.h > this.root.h) {
            const w = item.w;
            item.w = item.h;
            item.h = w;
        }
    }
  }