import { IMusic } from "interface/IMusic";
import http from "../interceptors/axios";

class ProductsDataService{
    async getAll(){
        return await http.get("music");
    }

    async get(fileName:string){
        return await http.get(`music/${fileName}`);
    }

    async create(file:any){
        return await http.post("music", file);
    }

    async update(data:IMusic){
        return await http.put("music", data);
    }

    async delete(id:number){
        return await http.delete(`music/${id}`)
    }
}

export default new ProductsDataService();