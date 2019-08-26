import { Component, OnInit } from '@angular/core';
import { PackerService } from 'src/app/services/binpacking';
import { ApiService } from 'src/app/services/api';
import { GrillMenu } from 'src/app/modules/entities/grill-menu';
import { GrillMenuItem } from 'src/app/modules/entities/grill-menu-item';
@Component({
  selector: 'grill-master',
  templateUrl: './grill-master.component.html',
  styleUrls: ['./grill-master.component.scss']
})
export class GrillMasterComponent implements OnInit {

    private menus: GrillMenu[] = [];

    private static PACKED_GRILL_MENU_CACHE: Map<string, any> = new Map<string, any>();
    
    private packedGrillMenu: any = null;

    private selectedMenu: GrillMenu = null;

    private currentGrillRound: any = null;
  
    constructor(private api: ApiService, private packerService: PackerService) { }

    ngOnInit() {
        this.api.getGrillMenus().subscribe((response: GrillMenu[]) => {
            this.menus = response.map(item => new GrillMenu(item));
        });    
    }

    private onSelectedMenuChanged(): void {
        this.packedGrillMenu = this.getPackedGrillMenuFromCache(this.selectedMenu.id);

        if (!this.packedGrillMenu) {    
            const grillItems: any[] = this.createGrillItems();
            
            const grillRounds: any[] = this.createGrillRounds(grillItems);
            
            this.packedGrillMenu = {menuId: this.selectedMenu.id, grillRounds: grillRounds};

            this.addPackedGrillMenuToCache(this.selectedMenu.id, this.packedGrillMenu);
        }

        this.resetCurrentGrillRound();
    }

    private createGrillRounds(items: any[]): any[] {
        const grillRounds: any[] = [];

        while(items.length > 0) {
            const grillRound = this.createGrillRound(items);
             
            grillRounds.push(grillRound);

            items = this.filterUnpackedItems(items);
        }

        return grillRounds;
    }

    private createGrillRound(items: any[]): any {
        this.packerService.setRoot(30, 20);
        this.packerService.fit(items);

        return this.filterPackedItems(items);  
    }

    private getPackedGrillMenuFromCache(key: string): any {
        return GrillMasterComponent.PACKED_GRILL_MENU_CACHE.get(key);
    }

    private addPackedGrillMenuToCache(key: string, value: any): void {
        GrillMasterComponent.PACKED_GRILL_MENU_CACHE.set(key, value);
    }

    private filterPackedItems(items: any[]): any[] {
        return items.filter(item => this.isItemPacked(item));
    }

    private filterUnpackedItems(items: any[]): any[] {
        return items.filter(item => !this.isItemPacked(item));
    }

    private isItemPacked(item: any): boolean {
        return item.fit;
    }

    private createGrillItems(): any[] {
        let transformedItems: any[] = [];
        this.selectedMenu.items.forEach( (element: GrillMenuItem) => {
            const grillItems = this.createGrillItemsForQuantity(element, element.quantity);
            transformedItems = transformedItems.concat(grillItems);
        });

        return transformedItems;
    }

    private createGrillItemsForQuantity(item: GrillMenuItem, quantity: number): any[] {
        const grillItems: any[] = [];
        for(let i = 0; i < quantity; i++) {
            const transformedItem: any =  {w: item.width, h: item.length, name: item.name};
            grillItems.push(transformedItem);
        }
        
        return grillItems;
    }
    
    private resetCurrentGrillRound(): void {
        this.currentGrillRound = this.packedGrillMenu.grillRounds[0];
    }
    
    private updateCurrentGrillRound(grillRound: any) : void {
        this.currentGrillRound = grillRound;
    }
}
