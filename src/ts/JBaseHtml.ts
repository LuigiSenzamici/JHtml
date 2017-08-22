
class JBaseHtml {
    nome: string;
    id: string;
    eClass: string;
    parent: any;
    protected elementInstance: any;
    protected removeText(){
        while(this.elementInstance.hasChildNodes())this.elementInstance.removeChild(this.elementInstance.firstChild);
    }
    constructor(nome: string, id: string, eClass: string, parent: any) {
        this.nome = nome;
        this.id = id;
        this.eClass = eClass;
        this.parent = (typeof (parent) === "string") ? document.getElementById(parent): parent;
    }
    public create(): any {
        var e = document.createElement(this.nome);
        e.id = this.id;
        e.setAttribute("class", this.eClass);
        this.parent.appendChild(e);
        this.elementInstance = e;
        return this;
    }
    public attr(name:string, value: string) :any{
        if (value) {
            this.elementInstance.setAttribute(name, value);
            return;
        }
      return this.elementInstance.getAttribute(name);
    }
    public removeAttr(name: string):void{
        this.elementInstance.removeAttribute(name);
    }
    public removeClass(className:string ):void{
    var res = [];
    var strClassi = this.elementInstance.getAttribute("class");
    if (strClassi != null && strClassi != undefined && strClassi.length > 0) {
        var classList = strClassi.split(" ");
        if (classList != null && classList != undefined && classList.length > 0) {
            if (className.indexOf("@") != -1) {
                var check = className.substring(1, className.length);
                res = classList.filter(function (e:any) {
                    return e.indexOf(check) == -1
                });
            } else {
                res = classList.filter(function (e:any) {
                    return e != className;
                });
            }
        }
        var newClassi = res.join(" ");
        this.elementInstance.setAttribute("class", newClassi);
    }
    }

    public setClass(className:string):void{
    var res = [];
    var strClassi = this.elementInstance.getAttribute("class");
    if (strClassi != null && strClassi != undefined && strClassi.length > 0) {
        var classList = strClassi.split(" ");
        if (classList != null && classList != undefined && classList.length > 0) {
            classList.push(className);
            var newClassi = classList.join(" ");
            this.elementInstance.setAttribute("class", newClassi);
        } else {
            this.elementInstance.setAttribute("class", className);
        }

    } else {
        this.elementInstance.setAttribute("class", className);
    }
    }
    public setStyle(nameValueString: string): void {
        if (nameValueString.indexOf(";") == -1) throw new Error("Bad Format: 'name:value;' is correct.");
        let listaImp :string[] = nameValueString.split(";");
        listaImp.pop();
        let stStile = this.getStyle(null);

        if (stStile == null) {
            this.attr("style", nameValueString);
            return;
        }

        let listaStili: string[] = stStile.split(";");
        let updated: Array<string> = [];
        listaImp.forEach((eI, iI, aI) => {
            let nameI: string = eI.split(":")[0];
            let valI: string = eI.split(":")[1];
            listaStili.forEach((e, i, a) => {
                let name: string = e.split(":")[0];
                let value: string = e.split(":")[1];
                if (name == nameI) {
                    e = [name, valI].join(":");
                    a[i] = e;
                    updated.push(eI);
                    return;
                }
            });
        });
        if (listaImp.length != updated.length) {
            updated.forEach((e, i, a) => {
                var inde = listaImp.indexOf(e);
                listaImp.splice(inde, 1);
            });
            //lista imp contiene solo i valori nuovi che non 
            //hanno trovato corrispondenza e che quindi vanno aggiunti
            //al vettore che contiene i valori aggiornati
            listaStili = listaStili.concat(listaImp);
        }
        //lista stili contiene i valori aggiornati
        this.attr("style", listaStili.join(";"));
    }

    public getStyle(name: string): any {
        if (name == null || name == undefined) {
            let res:string =this.attr("style", null);
            if(res!=null){
            if(res.lastIndexOf(";")!=res.length -1)res+=";";
            }
            return res;
        }
        let stStile = this.attr("style", null);
        if (stStile == null || stStile == undefined) return null;
        let listaStili: string[] = stStile.split(";");
        listaStili.forEach((e, i, a) => {
            let nome: string = e.split(":")[0];
            if (name == nome) return e.split(":")[1];
        });
        return null;
    }
    public removeStyle(name:string):void{
        if (name == null || name == undefined) return this.attr("style", null);
        let stStile = this.attr("style", null);
        if (stStile == null || stStile == undefined) return null;
        let listaStili: string[] = stStile.split(";");
        listaStili.pop();
        let res:string[] = [];
        listaStili.forEach((e, i, a)=>{
                let nome:string = e.split(":")[0];
                if(name !=nome)res.push(e);
        });
        this.attr("style", res.join(";"));
    }
    public getInstance(): any { return this.elementInstance; }
    public on(event: string, Func: Function, bubling: boolean=false):void {
        this.elementInstance.addEventListener(event, Func, bubling);
        }
}
export {JBaseHtml};