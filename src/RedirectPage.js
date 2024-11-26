import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import clientkeys from "./clientkeys";

const redirectUri = "http://localhost:4000/redirect";
const RedirectPage = () => {
  const [searchParams] = useSearchParams();
  const [authCode, setAuthCode] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTokens = async () => {
      const code = searchParams.get("code");
      if (code) {
        setAuthCode(code);

        try {
          const { data } = await axios.post(
            `https://proxy.cors.sh/https://zoom.us/oauth/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`,
            null,
            {
              auth: {
                username: `${clientkeys.client_id}`,
                password: `${clientkeys.client_secret}`,
              },
            }
          );

          setAccessToken(data.access_token);
          setRefreshToken(data.refresh_token);
        } catch (err) {
          setError(err.message);
        }
      }
    };

    fetchTokens();
  }, []);

  return (
    <div
      style={{ textAlign: "center", margin: "16px", wordWrap: "break-word" }}
    >
      <h1>Zoom OAuth Redirect</h1>
      {authCode && (
        <div style={{ margin: "16px" }}>
          Your authorization code is: <strong>{authCode}</strong>
        </div>
      )}
      {refreshToken && (
        <div style={{ margin: "16px" }}>
          Your refresh token is: <strong>{refreshToken}</strong>
        </div>
      )}
      {accessToken && (
        <div style={{ margin: "16px" }}>
          Your access token is: <strong>{accessToken}</strong>
        </div>
      )}
      {error && <p style={{ color: "red", margin: "16px" }}>Error: {error}</p>}
    </div>
  );
};

export default RedirectPage;
