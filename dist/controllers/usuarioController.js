"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require('bcrypt');
const usuarios_1 = require("../models/usuarios");
class usersController {
}
_a = usersController;
usersController.criarUsuario = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, senha } = req.body;
    // Validações 
    if (!nome) {
        res.json({ message: "Insira um nome" });
        return;
    }
    if (!senha) {
        res.json({ message: "Insira uma senha" });
        return;
    }
    // Criar senha criptografada
    const salt = yield bcrypt.genSalt(12);
    const senhaHash = yield bcrypt.hash(senha, salt);
    const usuario = new usuarios_1.usuarios({
        nome,
        senha: senhaHash
    });
    yield usuario.save();
    return res
        .status(200)
        .json({ message: "Usuario criado com sucesso", data: usuario });
});
usersController.deletarUsuario = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield usuarios_1.usuarios.destroy({ where: { id } });
    return res
        .status(200)
        .json({ message: "Usuario deletado com sucesso" });
});
usersController.pegarUsuario = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsuarios = yield usuarios_1.usuarios.findAll();
    return res
        .status(200)
        .json({ message: "Usuarios listados com sucesso", data: allUsuarios });
});
usersController.pegarUsuarioPorId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuarios_1.usuarios.findByPk(id);
    return res
        .status(200)
        .json({ message: "Usuario listado por id com sucesso", data: usuario });
});
usersController.alterarUsuario = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nome, senha } = req.body;
    // Validações 
    if (!nome) {
        res.json({ message: "Insira um nome" });
        return;
    }
    if (!senha) {
        res.json({ message: "Insira uma senha" });
        return;
    }
    // Criar senha criptografada
    const salt = yield bcrypt.genSalt(12);
    const senhaHash = yield bcrypt.hash(senha, salt);
    const usuario = {
        nome,
        senha: senhaHash
    };
    yield usuarios_1.usuarios.update(usuario, { where: { id: id } });
    const updatedUsuarios = yield usuarios_1.usuarios.findByPk(id);
    return res
        .status(200)
        .json({ message: "Usuario alterado com sucesso", data: updatedUsuarios });
});
exports.default = usersController;
