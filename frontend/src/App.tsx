import { useCallback, useEffect, useState } from "react";
import Mapa from "./components/Mapa";
import FormularioPonto from "./components/FormularioPonto";
import { getPontos, createPonto, deletePonto } from "./api";
import type { NovoPonto, Ponto } from "./types";
import "./App.css";

export default function App() {
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    getPontos()
      .then(setPontos)
      .finally(() => setCarregando(false));
  }, []);

  async function handleAdicionar(dados: NovoPonto) {
    const novo = await createPonto(dados);
    setPontos((prev) => [...prev, novo]);
  }

  const handleDeletar = useCallback(async (id: number) => {
    await deletePonto(id);
    setPontos((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <div className="app">
      <header className="cabecalho">
        <h1>EcoPonto BH</h1>
        <p>Pontos de coleta seletiva em Belo Horizonte</p>
      </header>

      <div className="conteudo">
        <div className="barra-lateral">
          <FormularioPonto onSalvar={handleAdicionar} />
          <div className="lista-pontos">
            {carregando && <p className="aviso">Carregando pontos...</p>}
            {!carregando && pontos.length === 0 && (
              <p className="aviso">Nenhum ponto cadastrado ainda.</p>
            )}
            {pontos.map((p) => (
              <div key={p.id} className="card-ponto">
                <strong>{p.nome}</strong>
                <span>{p.bairro}</span>
                {p.residuos.length > 0 && <small>{p.residuos.join(", ")}</small>}
              </div>
            ))}
          </div>
        </div>

        <div className="mapa-container">
          <Mapa pontos={pontos} onDelete={handleDeletar} />
        </div>
      </div>
    </div>
  );
}
