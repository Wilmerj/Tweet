import { ServiceFactory } from "./ServiceFactory";


function getRequest (url) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      })
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const postRequest = (url, bodyData) => {
    return new Promise((resolve, reject) => {
      fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ServiceFactory.auth,
        },
        method: "POST",
        body: JSON.stringify(bodyData),
      })
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  export {
    getRequest,
    postRequest
  }
  