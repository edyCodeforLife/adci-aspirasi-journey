import axios from "axios";
const API_URL = process.env.REACT_APP_API;
const API_URL_UAT = process.env.REACT_APP_API_AUTH_URL;
const API_URL_BK = process.env.REACT_APP_API_BK;
const API_EXTERNAL = "https://supply-test.kedai.boost.id";


export default {
  post: function(urlParam, payload) {
    return new Promise((resolve, reject) => {
      return axios
        .post(`${API_URL}${urlParam}`, payload,
         {
          headers: {
            // "Access-Control-Allow-Origin": "true",
            Authorization: sessionStorage.getItem("userToken")
          },
        }
        )
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  },

  postWithHeader:function(urlParam, payload, manualHeader) {
    return new Promise((resolve, reject) => {
      return axios
        .post(`${API_URL_UAT}${urlParam}`, payload, manualHeader        
        )
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  },
  
  postWithURL : function(urlParam, payload, manualHeader) {
    return new Promise((resolve, reject) => {
      return axios
      .post(`${API_URL_UAT}${urlParam}`, payload, manualHeader        
      )
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  },

  get: function(urlParam) {
    return new Promise((resolve, reject) => {
      return axios
        .get(`${API_URL}${urlParam}`)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  },

  getUAT: function(urlParam) {
    return new Promise((resolve, reject) => {
      return axios
        .get(`${API_URL_BK}${urlParam}`)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  },

  //bk malay
  getExternal: function(urlParam) {
    return new Promise((resolve, reject) => {
      return axios
        .get(`${API_EXTERNAL}${urlParam}`)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  },
};
