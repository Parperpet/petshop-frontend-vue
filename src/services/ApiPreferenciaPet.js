import {api} from './Config.js';

let endPoint = "preferenciaPet/";

export default{
  retornaMatchPorIdUsuario: (idPreferenciaPet) => {
    return api.get(endPoint + "retornaMatchPorIdUsuario/" + idPreferenciaPet);
  },
  
  gravarPreferenciaPet: (preferenciaPet) => {
    return api.post(endPoint + "gravarPreferenciaPet", preferenciaPet);
  },

  retornaUsuariosCompativeisComPet: (pet) => {
    return api.post(endPoint + "retornaUsuariosCompativeisComPet", pet);
  },

}