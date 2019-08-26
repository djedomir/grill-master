export class GrillMenuItem {

    public id: string;
    public length: number;
    public name: string;
    public quantity: number;
    public width: number;

    constructor(data) {
        this.id = data.Id;
        this.name = data.Name;
        this.length = data.Length;
        this.width = data.Width;
        this.quantity = data.Quantity;
    }
}