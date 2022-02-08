import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const AuthRedirect = () => {
  /** TODO: не храни в коде того, чего у тебя не используется */
  const params = useParams();
  const location = useLocation();

  const urlParams = new URLSearchParams(location.search);
  const accessToken = urlParams.get("access_token");

  useEffect(() => {
    /** TODO: А почему через fetch решил делать? */
    fetch(
      `https://pickbazar.batarin.dev/auth/google/callback?access_token=${accessToken}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("jwt", data.jwt);
      });
    // .then(() => location.push("/"));
  }, []);

  return <div></div>;
};

export default AuthRedirect;

// "?id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6IjllYWEwMjZmNjM1MTU3ZGZhZDUzMmU0MTgzYTZiODIzZDc1MmFkMWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMTAwNjkwNDQxNzQ2My1nZmxuamU1czQ3bTVvczl2bTUzNXNrdDM3ajNvaHJnci5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjEwMDY5MDQ0MTc0NjMtZ2ZsbmplNXM0N201b3M5dm01MzVza3QzN2ozb2hyZ3IuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDM2NDQxODU4NDg1NzQwNTc2MjUiLCJlbWFpbCI6InZsYWRjYXJoYXVsQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiNUhzdFhNaF9kdkxrd3czWFZpV1RJUSIsImlhdCI6MTY0MzkxNzA1OSwiZXhwIjoxNjQzOTIwNjU5fQ.Ey9O-GM4BV8LfP598gkMZFqN_jXjTdV_r9SzHp7P1z9-kVmoPFXKyIfldUGSHbExEmd6yc6DNAMXqqOW2MD6mOzHyAAn1ExiLSffPofdAsIftSoz5MmMSgq14foUWOmltN2lNc2q_xkWlPcgSQyK-fr-Ha_NufbNR4idu8RTDPtqMOe4wcw_U7AQVpzCw8QW1b_qBFCJvUZKFtC2WCgRhdTwcnb6lkiF8VGPJlx06a3DklOXvUG1_pTBWca6gJYOODmz-ceOnpZR6VFKEshn0HGp02cbm58hv-av8S3vdHyzlpR8d02BaOsESTsAAjvJ3G8f6Rcs0kXrukKKOqxYsQ&access_token=ya29.A0ARrdaM-xAW1U1FYN8B9IU-YfoL2yVTIn-OyssCfVY-k8Ttoq3gIsYiPfqsy89x0ow4gw0Y6W0ZzLEaNnlxVxNvnRxXoIGdw5_-9hH--1-2iouHGpwTkgkUl6xHO2sGa_wfpXqoRxVnjPRD8xWf0guOmHVEzp&raw%5Baccess_token%5D=ya29.A0ARrdaM-xAW1U1FYN8B9IU-YfoL2yVTIn-OyssCfVY-k8Ttoq3gIsYiPfqsy89x0ow4gw0Y6W0ZzLEaNnlxVxNvnRxXoIGdw5_-9hH--1-2iouHGpwTkgkUl6xHO2sGa_wfpXqoRxVnjPRD8xWf0guOmHVEzp&raw%5Bexpires_in%5D=3599&raw%5Bscope%5D=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20openid&raw%5Btoken_type%5D=Bearer&raw%5Bid_token%5D=eyJhbGciOiJSUzI1NiIsImtpZCI6IjllYWEwMjZmNjM1MTU3ZGZhZDUzMmU0MTgzYTZiODIzZDc1MmFkMWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMTAwNjkwNDQxNzQ2My1nZmxuamU1czQ3bTVvczl2bTUzNXNrdDM3ajNvaHJnci5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjEwMDY5MDQ0MTc0NjMtZ2ZsbmplNXM0N201b3M5dm01MzVza3QzN2ozb2hyZ3IuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDM2NDQxODU4NDg1NzQwNTc2MjUiLCJlbWFpbCI6InZsYWRjYXJoYXVsQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiNUhzdFhNaF9kdkxrd3czWFZpV1RJUSIsImlhdCI6MTY0MzkxNzA1OSwiZXhwIjoxNjQzOTIwNjU5fQ.Ey9O-GM4BV8LfP598gkMZFqN_jXjTdV_r9SzHp7P1z9-kVmoPFXKyIfldUGSHbExEmd6yc6DNAMXqqOW2MD6mOzHyAAn1ExiLSffPofdAsIftSoz5MmMSgq14foUWOmltN2lNc2q_xkWlPcgSQyK-fr-Ha_NufbNR4idu8RTDPtqMOe4wcw_U7AQVpzCw8QW1b_qBFCJvUZKFtC2WCgRhdTwcnb6lkiF8VGPJlx06a3DklOXvUG1_pTBWca6gJYOODmz-ceOnpZR6VFKEshn0HGp02cbm58hv-av8S3vdHyzlpR8d02BaOsESTsAAjvJ3G8f6Rcs0kXrukKKOqxYsQ"
