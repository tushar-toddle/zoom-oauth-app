import React from "react";
import clientkeys from "./clientkeys";
const App = () => {
  const handleZoomSignIn = () => {
    const zoomOAuthURL = `https://zoom.us/oauth/authorize?client_id=${clientkeys.client_id}&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Fredirect`;
    // Open in a popup
    window.open(zoomOAuthURL, "_blank", "width=500,height=600");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Zoom OAuth Integration</h1>
      <button onClick={handleZoomSignIn}>Sign in with Zoom</button>
    </div>
  );
};

export default App;
