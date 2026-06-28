import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { app } from "./config.js";

export const db = getFirestore(app);
