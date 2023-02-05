import { AxiosProgressEvent } from "axios";
import { IMusicUpdate } from "interface/IMusicUpdate";
import http from "../interceptors/axiosProducts";

class ProductsDataService{
    async getAll(){
        return await http.get("music" ,
        {
            headers:{"Access-Control-Allow-Origin": "*"}
        });
    }

    async get(fileName:string){
        return await http.get(`music/${fileName}`);
    }
    async getId(id:number){
        return await http.get(`music/${id}`, 
        {
            headers:{"Access-Control-Allow-Origin": "*"}
        });
    }

    async upload(file:File, onUploadProgress:((progressEvent: AxiosProgressEvent) => void),onError:(error:string) => void)
    {
        let formData = new FormData();
        formData.append("file", file);
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
        return await http.delete(`music/delete-music/${id}`)
    }
}

export default new ProductsDataService();