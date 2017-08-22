import {JBaseHtml} from './JBaseHtml';
class JInputHtml extends JBaseHtml {
    name: string;
    type: string;
    constructor(type: string, id: string, eClass: string, parent: any ) {
        super("input", id, eClass, parent);
        this.name = id;
        this.type = type;
    }
    public create(): any {
        this.elementInstance = super.create();
        this.elementInstance.setAttribute("name", this.name);
        this.elementInstance.setAttribute("type", this.type);
        return this.elementInstance;
    }
    public setValue(value: string): void {
        (document.getElementById(this.id) as HTMLInputElement).value = value;
       
    }
    public getValue(): string {
        return (document.getElementById(this.id) as HTMLInputElement).value;
    }
}
export {JInputHtml};