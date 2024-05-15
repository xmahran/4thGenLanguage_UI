import { serverURL } from "../../helpers/Constants";

export const authApi = {
  async post(endpoint: any, data: any, type: string) {
    try {
      let response;
      type === "json"
        ? (response = await fetch(`${serverURL}${endpoint}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }))
        : (response = await fetch(`${serverURL}${endpoint}`, {
            method: "POST",
            body: data,
          }));

      return response.json();
    } catch (error) {
      throw new Error(`Error during API request: ${error}`);
    }
  },
  async get(endpoint: any) {
    try {
      const response = await fetch(`${serverURL}${endpoint}`, {
        method: "GET",
      });

      return response.json();
    } catch (error) {
      throw new Error(`Error during API request: ${error}`);
    }
  },
  async put(endpoint: string, data: any, type: string) {
    try {
      let response: Response;
      if (type === "json") {
        response = await fetch(`${serverURL}${endpoint}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      } else {
        response = await fetch(`${serverURL}${endpoint}`, {
          method: "PUT",
          body: data,
        });
      }
      return response.json();
    } catch (error) {
      throw new Error(`Error during API request: ${error}`);
    }
  },
};
