import { useState } from "react";
import type { NovoPonto } from "../types";

const RESIDUOS_OPCOES = ["Papel", "Plástico", "Vidro", "Metal", "Eletrônicos", "Pilhas/Baterias", "Óleo"];

interface Props {
  onSalvar: (ponto: NovoPonto) => Promise<void>;
}

async function geocodificar(endereco: string): Promise<{ lat: number; lng: number } | null> {
  const query = encodeURIComponent(`${endereco}, Belo Horizonte, MG, Brasil`);
  const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;
  const res = await fetch(url, { headers: { "Accept-Language": "pt-BR" } });
  const data = await res.json();
  if (!data.length) return null;
  return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
}

export default function FormularioPonto({ onSalvar }: Props) {
  const [aberto, setAberto] = useState(false);
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [descricao, setDescricao] = useState("");
  const [residuos, setResiduos] = useState<string[]>([]);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  function toggleResiduo(r: string) {
    setResiduos((prev) => (prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setSalvando(true);
    try {
      const coords = await geocodificar(endereco);
      if (!coords) {
        setErro("Endereço não encontrado. Tente incluir número e bairro.");
        setSalvando(false);
        return;
      }
      await onSalvar({
        nome,
        endereco,
        bairro,
        descricao: descricao || undefined,
        residuos,
        latitude: coords.lat,
        longitude: coords.lng,
      });
      setNome(""); setEndereco(""); setBairro(""); setDescricao(""); setResiduos([]);
      setAberto(false);
    } catch {
      setErro("Erro ao salvar ponto. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  }

  if (!aberto) {
    return (
      <button onClick={() => setAberto(true)} className="btn-adicionar">
        + Adicionar Ponto
      </button>
    );
  }

  return (
    <div className="formulario-overlay">
      <form className="formulario" onSubmit={handleSubmit}>
        <h2>Novo Ponto de Coleta</h2>

        <label>Nome *<input value={nome} onChange={(e) => setNome(e.target.value)} required /></label>
        <label>Endereço *<input value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder="Rua, número" required /></label>
        <label>Bairro *<input value={bairro} onChange={(e) => setBairro(e.target.value)} required /></label>
        <label>Descrição<textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} rows={2} /></label>

        <fieldset>
          <legend>Resíduos aceitos</legend>
          <div className="checkboxes">
            {RESIDUOS_OPCOES.map((r) => (
              <label key={r} className="checkbox-item">
                <input type="checkbox" checked={residuos.includes(r)} onChange={() => toggleResiduo(r)} />
                {r}
              </label>
            ))}
          </div>
        </fieldset>

        {erro && <p className="erro">{erro}</p>}

        <div className="botoes">
          <button type="button" onClick={() => setAberto(false)} disabled={salvando}>Cancelar</button>
          <button type="submit" disabled={salvando}>{salvando ? "Localizando..." : "Salvar"}</button>
        </div>
      </form>
    </div>
  );
}
