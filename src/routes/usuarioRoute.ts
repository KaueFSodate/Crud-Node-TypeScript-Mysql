import { Router } from "express";

import userController from "../controllers/usuarioController"

const router = Router();

router.post("/", userController.criarUsuario);

router.get("/", userController.pegarUsuario);

router.get("/:id", userController.pegarUsuarioPorId);

router.put("/:id", userController.alterarUsuario);

router.delete("/:id", userController.deletarUsuario);

export default router;