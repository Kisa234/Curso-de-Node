import axios from 'axios';

export const httpCLient = {
    
    get: async (url:string) => {
        const { data } = await axios.get(url);
        return data;
    },
    post: async (url:string, body :JSON) => {
    },
    put: async (url:string, body :JSON) => {
    },
    delete: async (url:string) => {
    },


};

