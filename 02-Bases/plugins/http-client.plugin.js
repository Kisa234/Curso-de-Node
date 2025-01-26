const axios = require('axios');

const httpCLient = {
    
    get: async (url) => {
        const { data } = await axios.get(url);
        return data;
    },
    post: async (url, body) => {
    },
    put: async (url, body) => {
    },
    delete: async (url) => {
    },


};

module.exports = {
    http: httpCLient,
};
