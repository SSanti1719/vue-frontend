import axios from "axios";
import { saveTokenToLocalStorage } from "./sessionStorage";

const internalUser = "API_USER";
const internalPass = "q1w2e3r4t5y6u7_internal";

export async function login(username, password) {
  let resp = {
    err: true,
    message: "",
  };
  await axios
    .post(
      `http://localhost:3000/auth/generate`,
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa(`${internalUser}:${internalPass}`),
        },
      }
    )
    .then((response) => {
      saveTokenToLocalStorage(response.data.token);
      resp.err = false;
      return;
    })
    .catch((error) => {
      if (error.response.status == 400 || error.response.status == 401) {
        resp.message = error.response.data.message;
        return;
      }
      resp.message = "Error al realizar la solicitud, intenta màs tarde";
      return;
    });

  return resp;
}

export async function validate(token) {
  return await axios
    .post(
      `http://localhost:3000/auth/validate`,
      {
        token,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa(`${internalUser}:${internalPass}`),
        },
      }
    )
    .then((response) => {
      if (response.status == 200) {
        return response.data.valid;
      } else {
        return false;
      }
    })
    .catch((error) => {
      return false;
    });
}
