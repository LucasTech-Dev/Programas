import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";
import { app } from "./config.js";

export const storage = getStorage(app);
