import { RequestHandler } from "express"
import { where } from "sequelize";
const bcrypt = require('bcrypt')
import { usuarios } from "../models/usuarios"

export default class usersController{

    static criarUsuario: RequestHandler = async (req, res, next) => {

      const {nome, senha} = req.body

        // Validações 

        if(!nome){
            res.json({message:"Insira um nome"})
            return
        }

        if(!senha){
            res.json({message:"Insira uma senha"})
            return
        }

        // Criar senha criptografada
        const salt = await bcrypt.genSalt(12)
        const senhaHash = await bcrypt.hash(senha, salt)

        const usuario = new usuarios({
            nome,
            senha: senhaHash
        })

      await  usuario.save();
      return res
        .status(200)
        .json({ message: "Usuario criado com sucesso", data: usuario });
    };

    static deletarUsuario: RequestHandler = async (req, res, next) => {
      const { id } = req.params;
      await usuarios.destroy({ where: { id } });
      return res
        .status(200)
        .json({ message: "Usuario deletado com sucesso" });
    };

    static pegarUsuario: RequestHandler = async (req, res, next) => {
      const allUsuarios:  usuarios[] = await  usuarios.findAll();
      return res
        .status(200)
        .json({ message: "Usuarios listados com sucesso", data: allUsuarios });
    };

    static pegarUsuarioPorId: RequestHandler = async (req, res, next) => {
      const { id } = req.params;
      const usuario:  usuarios | null = await  usuarios.findByPk(id);
      return res
        .status(200)
        .json({ message: "Usuario listado por id com sucesso", data: usuario });
    };

    static alterarUsuario: RequestHandler = async (req, res, next) => {
      const { id } = req.params;

      const {nome, senha} = req.body

        // Validações 

        if(!nome){
            res.json({message:"Insira um nome"})
            return
        }

        if(!senha){
            res.json({message:"Insira uma senha"})
            return
        }

        // Criar senha criptografada
        const salt = await bcrypt.genSalt(12)
        const senhaHash = await bcrypt.hash(senha, salt)

        const usuario = {
            nome,
            senha: senhaHash
        }


      await usuarios.update(usuario, {where: {id: id}});
      const updatedUsuarios: usuarios | null = await usuarios.findByPk(id);
      return res
        .status(200)
        .json({ message: "Usuario alterado com sucesso", data: updatedUsuarios });
    };
  }