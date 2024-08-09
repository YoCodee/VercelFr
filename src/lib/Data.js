import axios from "axios"
import { useEffect } from "react";

export const Datas = async () => {
    try{
        const response = await axios.get('https://vercelhs.vercel.app/api/post');
        return response.data;
    } catch(error){
        if(error.response){
            const message = error.response.data.msg;
            return message;
        }
    }
     useEffect(() => {
        const fetchData = async () => {
          const data = await data();
          console.log(data);
        };
    
        fetchData();
      }, []);

  
}