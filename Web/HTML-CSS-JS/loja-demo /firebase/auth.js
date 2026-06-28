import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { app } from "./config.js";

export const auth = getAuth(app);
