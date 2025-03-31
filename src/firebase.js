import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  //apiKey: "YOUR_API_KEY",
  authDomain: "https://console.firebase.google.com/u/0/project/online-chat-ebf0a/overview?fb_gclid=CjwKCAiAw5W-BhAhEiwApv4goKCpHA5JdYN5E6h1LkR4Ej7T2ea4BeskhtHN1tKITgaFSBzva7MhwBoChRwQAvD_BwE",
  databaseURL: "https://online-chat-ebf0a-default-rtdb.firebaseio.com/",
  projectId: "online-chat-ebf0a",
  
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
