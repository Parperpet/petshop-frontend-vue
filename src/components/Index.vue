<template>
  <div>
    <Menu />     
    <div v-if="paginaInicial == ''">
      <img class="d-block w-100" src="@/assets/indexInstabilidade.jpg" width="100%">
      <div class="text-center mt-3">
        <hr>
        <h1>Desculpe, no momento estamos passando por uma instabilidade no site. Já estamos trabalhando no ajuste.</h1>
      </div>      
    </div>
    <center v-else>
      <img class="d-block w-100" :src="paginaInicial.fotoPrincipalBase64" width="100%">
      <hr>
      <h1> Dicas </h1>
      <div class="row mt-4">
        <div class="col-6 pl-5 pr-5">         
          <img class="img-dica mb-3" :src="paginaInicial.fotoDica1Base64" width="100%">
          <p class="descricao">{{paginaInicial.dica1}}</p>
        </div>
        <div class="col-6 pl-5 pr-5">
          <img class="img-dica mb-3" :src="paginaInicial.fotoDica2Base64" width="100%">
          <p class="descricao">{{paginaInicial.dica2}}</p>
        </div>
      </div>
      <hr>  
      <h1> Profissionais da área - Campeões do mês </h1>
      <div class="row">
        <div class="col-6 pl-5 pr-5 mt-3">
          <h3 class="mb-4">Profissional do mês</h3>          
          <img v-if="paginaInicial.profissional.fotoPerfilBase64 != 0" :src="paginaInicial.profissional.fotoPerfilBase64" class="img-thumbnail" />            
          <img v-else src="@/assets/sem-foto.jpg"  class="img-thumbnail" />
          <p class="descricao">{{paginaInicial.descricaoProfissional}}</p>
        </div>
        <div class="col-6 pl-5 pr-5 mt-3">
          <h3 class="mb-4">Hospedagem campeã</h3>          
          <img v-if="paginaInicial.hospedagem.fotoPerfilBase64 != 0" :src="paginaInicial.hospedagem.fotoPerfilBase64" class="img-dica" />            
          <img v-else src="@/assets/sem-foto.jpg"  class="img-thumbnail" />
          <p class="descricao">{{paginaInicial.descricaoHospedagem}}</p>
        </div>
      </div> 
      <hr>
      <div class="container">  
        <h1> Nossos objetivos </h1>  
        <div class="row mt-5">
          <div class="col-sm-4">
            <img src="@/assets/01.png"  class="img-thumbnail" />
            <h2>Missão</h2>
            Atuar como elo de integração entre amantes de animais e oferecer os melhores serviços voltados para animais de estimação.
          </div>
          <div class="col-sm-4">
            <img src="@/assets/02.svg"  class="img-thumbnail" />
            <h2>Visão</h2>
            Ser reconhecido como o local mais completo para atender as necessidades de bichinhos e seus cuidadores.
          </div>
          <div class="col-sm-4">
            <img src="@/assets/03.svg"  class="img-thumbnail" />
            <h2>Valores</h2>
            <ul class="list-group">
              <li class="list-group-item"><b>Amor</b> - A vida tem significados maiores quando somos úteis e nos sentimos mais ativos socialmente.</li>
              <li class="list-group-item"><b>Empatia</b> – Somos seres humanos quando experimentamos o lugar de outro ser vivo
              </li>
              <li class="list-group-item"><b>Pró-atividade</b> – Não basta identificar necessidades. É preciso atendê-las!</li>
              <li class="list-group-item"><b>Coletividade</b> – Todos juntos somos fortes e podemos fazer um mundo melhor!</li>              
            </ul>
          </div>
        </div>
      </div>
      <hr>
      <h1> Comentarios </h1>
      <div class="row">
        <div class="col-4 pl-5 pr-5 mt-3" v-if="paginaInicial.comentarios[0] != undefined">
          <h3 class="mb-4">{{paginaInicial.comentarios[0].idCliente.nome}}</h3>          
          <img v-if="paginaInicial.comentarios[0].idCliente.fotoPerfilBase64 != 0" :src="paginaInicial.comentarios[0].idCliente.fotoPerfilBase64" class="img-thumbnail" />            
          <img v-else src="@/assets/sem-foto.jpg"  class="img-thumbnail" />
          <p>{{paginaInicial.comentarios[0].comentario}}</p>
        </div>        
        <div class="col-4 pl-5 pr-5 mt-3" v-if="paginaInicial.comentarios[1] != undefined">
          <h3 class="mb-4">{{paginaInicial.comentarios[1].idCliente.nome}}</h3>          
          <img v-if="paginaInicial.comentarios[1].idCliente.fotoPerfilBase64 != 0" :src="paginaInicial.comentarios[1].idCliente.fotoPerfilBase64" class="img-thumbnail" />            
          <img v-else src="@/assets/sem-foto.jpg"  class="img-thumbnail" />
          <p>{{paginaInicial.comentarios[1].comentario}}</p>
        </div>        
        <div class="col-4 pl-5 pr-5 mt-3" v-if="paginaInicial.comentarios[2] != undefined">
          <h3 class="mb-4">{{paginaInicial.comentarios[2].idCliente.nome}}</h3>          
          <img v-if="paginaInicial.comentarios[2].idCliente.fotoPerfilBase64 != 0" :src="paginaInicial.comentarios[2].idCliente.fotoPerfilBase64" class="img-thumbnail" />            
          <img v-else src="@/assets/sem-foto.jpg"  class="img-thumbnail" />
          <p>{{paginaInicial.comentarios[2].comentario}}</p>
        </div>        
      </div> 
    </center>        
    <hr> 
    <br>
    <Footer />
  </div>  
</template>

<script>
import Footer from '@/components/Footer';
import Menu from '@/components/Menu';
import ApiPaginaInicial from '@/services/ApiPaginaInicial.js';

export default {
  name: "Index",
  components:{
    Footer,
    Menu
  },

  data(){
    return{
      paginaInicial:{
        fotoPrincipalBase64: "",
        fotoDica1Base64: "",
        dica1: "",
        fotoDica2Base64: "",
        dica2: "",
        profissional: {
          fotoPerfilBase64:""
        },
        descricaoProfissional: "",
        hospedagem: "",
        descricaoHospedagem: "",
        comentarios: [{
          idCliente: ""
        }] 
      },
    }
  },

  mounted(){
    ApiPaginaInicial.retornaPaginaInicial()
    .then(resp => {
      this.paginaInicial = resp.data
    })
    .catch(this.paginaInicial = '')

  }
}
</script>

<style>

</style>