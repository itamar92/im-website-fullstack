import { AxiosProgressEvent } from "axios";
import { IMusic } from "interface/IMusic";
import { IMusicUpdate } from "interface/IMusicUpdate";
import http from "../interceptors/axios";

class ProductsDataService{
    async getAll(){
        return await http.get("music");
    }

    async get(fileName:string){
        return await http.get(`music/${fileName}`);
    }

    async upload(file:File, onUploadProgress:((progressEvent: AxiosProgressEvent) => void),onError:(error:string) => void)
    {
        let formData = new FormData();
        formData.append("musicFile", file, file.name);
try {
        return await http.post("music/add-music", {formData }, {
            headers:{"Content-Type": "multipart/form-data"},
            onUploadProgress, 
        });
    }catch(error ) {return onError(error as string)}
    
    }

    async update(data:IMusicUpdate){
        return await http.put("music", data);
    }

    async delete(id:number){
        return await http.delete(`music/${id}`)
    }
}

export default new ProductsDataService();