import { useEffect, useState } from "react";

export default function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const isDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "transparent",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        color: isDarkMode ? "white" : "black",
        zIndex: 99999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontSize: "24px",
        fontWeight: "bold"
      }}
    >
      ⚠️ No Internet Connection
      <div style={{ fontSize: "16px", marginTop: "10px" }}>
        Please check your network.
      </div>
    </div>
  );
}
