<template>
  <div>    
    <MenuProfissional :nomeProfissional="usuario.nome" v-if="usuario.nivelAcesso == 'Profissional'"/>
    <center>
      <div class="container">
        <div class="row">
          <div class="col mt-3">
            <h2>Meus Clientes</h2>            
          </div>      
        </div>
      </div>
      <br>
      <div class="container">
        <div class="row" v-if="this.reservaPasseio != ''">
          <div class="col-6 p-0 mb-5 text-center" v-for="(reservaPasseio) in reservaPasseio" :key="reservaPasseio.idReservaPasseio">
            <div class="row">
              <img v-if="reservaPasseio.pet.fotoPerfilBase64 != 0" :src="reservaPasseio.pet.fotoPerfilBase64"  class="img-thumbnail" />            
              <img v-else src="@/assets/sem-foto.jpg"  class="img-thumbnail" />
              <ul class="ml-4">
                <li><h2>{{reservaPasseio.pet.nome}}</h2></li>
                <li>Especie: {{reservaPasseio.pet.especie}}</li>
                <li>Idade: {{reservaPasseio.pet.idade}}</li>
                <li>Cor: {{reservaPasseio.pet.cor}} </li>
                <li>Porte: {{reservaPasseio.pet.porte}}</li> 
                <li>Olhos: {{reservaPasseio.pet.olhos}}</li>
                <li>Custo mensal: {{reservaPasseio.pet.custoMensal}}</li>
                <li>Necessita Passeio: {{reservaPasseio.pet.necessitaPasseio}}</li>
                <li>Necessita Companhia: {{reservaPasseio.pet.necessitaCompanhia}}</li>
                <li>Olhos: {{reservaPasseio.pet.olhos}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="row" v-else>
          <div class="naoTemos w-100">
            <h4 class="center">Você ainda não tem nenhum cliente vinculado.</h4>
          </div>          
        </div>
        <br><br>
      </div>
    </center>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer';
import MenuProfissional from "@/components/MenuProfissional"
import ApiUsuario from '@/services/ApiUsuario.js';
import ApiReservaPasseio from '@/services/ApiReservaPasseio.js';

export default {
  name: "MeusClientes",
  components:{
    Footer,    
    MenuProfissional
  },

  data(){
    return{
      usuario:{
        idUsuario: "",
        nivelAcesso: "",
        nome: "",
        email: "",
        senha: "",
        cpf: "",        
        Telefone: "",
        fotoPerfil: ""        
      },
      reservaPasseio:[{
        idReservaPasseio: "",
        cliente: "",
        profissional: "",
        pet: ""
      }] 
    }
  },

  mounted(){  
    ApiUsuario.retornaPorId(this.$route.params.idUsuario)
    .then(resp => {          
      this.usuario = resp.data

      ApiReservaPasseio.retornaPorProfissional(this.$route.params.idUsuario)
      .then(resp => {          
        this.reservaPasseio = resp.data      
      })
      .catch(this.reservaPasseio = '')
    })
    
  },
}
</script>

<style>

</style>