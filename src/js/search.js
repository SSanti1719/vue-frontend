import axios from "axios";

export async function search(page, size, from, to, subject, id) {
  let resp = {
    err: true,
    message: "",
    response: {}
  };
  await axios
    .get(
      `http://localhost:3000/emails?page=${page}&size=${size}&fromEmail=${from}&toEmail=${to}&subjectKeyword=${subject}&messageId=${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      resp.err = false;
      resp.response =response.data
      return
    })
    .catch((error) => {
      if (error.response.status == 400 || error.response.status == 401) {
        resp.message = error.response.data.message;
        return;
      }
      resp.message = "Error al realizar la solicitud, intenta màs tarde";
      return
    });

    return resp
}
