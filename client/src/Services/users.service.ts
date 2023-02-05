import { IUser } from "interface/IUser";
import { IUserLogin } from "interface/IUserLogin";
import { IUserRegister } from "interface/IUserRegister";
import http from "../interceptors/axiosAuth";
import  "../interceptors/axiosAuth";
import axios from "axios";

class UsersDataService {
   async getAll(token:string)
    {
      return await http.get("users", 
        {
            headers:{
                "Authorization" : `Brearer ${token}`,
        }
        });
    }

    async getUser(token:string, userName:string)
    {
       return await axios.get(`users/${userName}`, 
        {
            headers:{
                "Authorization" : `Brearer ${token}`,
        }
        });
    }

    async login(userDto:IUserLogin)
    {
       return await http.post<IUserLogin, { data: IUser }>(
            "account/login",userDto,
            {
              headers: {
                 "Access-Control-Allow-Origin": "*",
                 },
            }
          );
    }
   async register(userDto:IUserRegister)
    {
        return await http.post<IUserRegister, { data: IUser }>(
            "account/register",userDto,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    },
            }
          );
    }
}


export default new UsersDataService();