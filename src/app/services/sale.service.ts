import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Sale } from "../models/sale";

@Injectable({
    providedIn:'root'
})
export class SaleService{

servidor:string="http://localhost:8080/api";
recurso:string="sales";

constructor(private http:HttpClient){}

getSales(){
    return this.http.get<Sale[]>(this.servidor+"/"+this.recurso);
}

addSale(sale:Sale){
    return this.http.post<Sale>(this.servidor+"/"+this.recurso,sale)
}
deleteSale(id: number) {
    return this.http.delete(`${this.servidor}/${this.recurso}/${id}`);
}


}