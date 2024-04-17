import axios from "axios";
import { AUTH_TOKEN } from "../storage/storageConfig";

export const API = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    Authorization: `${AUTH_TOKEN}`,
    "Content-Type": "application/json",
  },
});
