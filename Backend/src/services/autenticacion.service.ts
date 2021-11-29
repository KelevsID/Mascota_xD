import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import { Llaves } from '../config/llaves';
import { Cliente, Usuario } from '../models';
import { ClienteRepository, UsuarioRepository } from '../repositories';
const generador = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
  @repository(ClienteRepository)
   public clienteRepository: ClienteRepository,
   @repository(UsuarioRepository)
   public usuarioRepository: UsuarioRepository
  ) {}
  

  /*
   * Add service methods here
   */

  GenerarClave(){
    let clave = generador(8, false);
    return clave;
  }

 CifrarClave(clave:string){
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  IdentificarUsuario(usuario:string, clave:string){
    try{
      let u = this.usuarioRepository.findOne({where: {email: usuario, password: clave}});
      if(u){
        return u;
      }
      return false;
    }catch{
      return false;
    }
  }
  
  GenerarTokenJWT(usuario: Usuario){
    let token = jwt.sign({
      data :{
        id: usuario.id,
        correo: usuario.email,
        nombre: usuario.nombres + " " + usuario.apellidos,
        rol: usuario.rol,
        permisos: usuario.permisos
      }
    },
    Llaves.claveJWT);
    return token;
  }
  GenerarTokenJWTCliente(cliente: Cliente){
    let token = jwt.sign({
      data :{
        id: cliente.id,
        documento: cliente.documento,
        nombre: cliente.nombres + " " + cliente.apellidos,
        direccion: cliente.direccion,
        ciudad: cliente.ciudad,
        correo: cliente.email,
        clave: cliente.password
      }
    },
    Llaves.claveJWT);
    return token;
  }

  ValidarTokenJWT(token: string){
    try{
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    }catch{
      return false;
    }
  }
}
