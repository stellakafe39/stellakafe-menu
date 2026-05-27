import { createRoot } from "react-dom/client";
import { AdminApp } from "./routes/admin";
import "./styles.css";

createRoot(document.getElementById("root")!).render(<AdminApp />);
