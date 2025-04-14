import axios from "axios";

const api = axios.create({
  baseURL: "https://photos-api-434732873433.us-central1.run.app",
});

export default api;
