import { Router, Request, Response } from "express";
import prisma from "../prismaClient";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const pontos = await prisma.ponto.findMany({ orderBy: { createdAt: "desc" } });
  const result = pontos.map((p) => ({ ...p, residuos: JSON.parse(p.residuos) }));
  res.json(result);
});

router.get("/:id", async (req: Request, res: Response) => {
  const ponto = await prisma.ponto.findUnique({ where: { id: Number(req.params.id) } });
  if (!ponto) { res.status(404).json({ error: "Ponto não encontrado" }); return; }
  res.json({ ...ponto, residuos: JSON.parse(ponto.residuos) });
});

router.post("/", async (req: Request, res: Response) => {
  const { nome, endereco, bairro, descricao, residuos, latitude, longitude } = req.body;
  if (!nome || !endereco || !bairro || latitude == null || longitude == null) {
    res.status(400).json({ error: "Campos obrigatórios: nome, endereco, bairro, latitude, longitude" });
    return;
  }
  const ponto = await prisma.ponto.create({
    data: {
      nome,
      endereco,
      bairro,
      descricao: descricao ?? null,
      residuos: JSON.stringify(residuos ?? []),
      latitude: Number(latitude),
      longitude: Number(longitude),
    },
  });
  res.status(201).json({ ...ponto, residuos: JSON.parse(ponto.residuos) });
});

router.put("/:id", async (req: Request, res: Response) => {
  const { nome, endereco, bairro, descricao, residuos, latitude, longitude } = req.body;
  const ponto = await prisma.ponto.update({
    where: { id: Number(req.params.id) },
    data: {
      ...(nome !== undefined && { nome }),
      ...(endereco !== undefined && { endereco }),
      ...(bairro !== undefined && { bairro }),
      ...(descricao !== undefined && { descricao }),
      ...(residuos !== undefined && { residuos: JSON.stringify(residuos) }),
      ...(latitude !== undefined && { latitude: Number(latitude) }),
      ...(longitude !== undefined && { longitude: Number(longitude) }),
    },
  });
  res.json({ ...ponto, residuos: JSON.parse(ponto.residuos) });
});

router.delete("/:id", async (req: Request, res: Response) => {
  await prisma.ponto.delete({ where: { id: Number(req.params.id) } });
  res.status(204).send();
});

export default router;
