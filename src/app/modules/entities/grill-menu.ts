import { GrillMenuItem } from './grill-menu-item';

export class GrillMenu {

    public menu: string;
    public id: string;
    public items: any[];  

    constructor(data: any) {
        this.menu = data.menu;
        this.id = data.Id;
        this.items = data.items.map(item => new GrillMenuItem(item));
    }
}
