export interface Ponto {
  id: number;
  nome: string;
  endereco: string;
  bairro: string;
  descricao: string | null;
  residuos: string[];
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
}

export interface NovoPonto {
  nome: string;
  endereco: string;
  bairro: string;
  descricao?: string;
  residuos: string[];
  latitude: number;
  longitude: number;
}
