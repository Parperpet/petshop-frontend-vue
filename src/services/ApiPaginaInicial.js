import {api} from './Config.js';

let endPoint = "pagina-inicial/";

export default{
  retornaPaginaInicial: () => {
    return api.get(endPoint + "retornaPaginaInicial");
  },

  gravarPaginaInicial: (paginaInicial) => {
    return api.post(endPoint + "gravarPaginaInicial", paginaInicial);
  },

}