"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = __importDefault(require("../controllers/usuarioController"));
const router = (0, express_1.Router)();
router.post("/", usuarioController_1.default.criarUsuario);
router.get("/", usuarioController_1.default.pegarUsuario);
router.get("/:id", usuarioController_1.default.pegarUsuarioPorId);
router.put("/:id", usuarioController_1.default.alterarUsuario);
router.delete("/:id", usuarioController_1.default.deletarUsuario);
exports.default = router;
