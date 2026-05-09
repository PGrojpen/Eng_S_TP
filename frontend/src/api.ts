import axios from "axios";
import type { Ponto, NovoPonto } from "./types";

const api = axios.create({ baseURL: "http://localhost:3001/api" });

export const getPontos = () => api.get<Ponto[]>("/pontos").then((r) => r.data);
export const createPonto = (data: NovoPonto) => api.post<Ponto>("/pontos", data).then((r) => r.data);
export const deletePonto = (id: number) => api.delete(`/pontos/${id}`);
