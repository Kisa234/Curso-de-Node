import axios from 'axios';

export const httpCLient = {
    
    get: async (url:string) => {
        const { data } = await axios.get(url);
        return data;
    },
    post: async (url:string, body :JSON) => {
        throw new Error('Not implemented');
    },
    put: async (url:string, body :JSON) => {
        throw new Error('Not implemented');
    },
    delete: async (url:string) => {
        throw new Error('Not implemented');
    },


};

