<template>
  <div>
   <MenuCliente :nomeCliente="usuario.nome" v-if="usuario.nivelAcesso == 'Cliente'"/>
    <center>
      <div class="container">
        <br>
        <h1>Pets disponíveis com seu perfil</h1><br>
        <div class="row" v-if="this.pet != ''">
          <div class="col-4" v-for="(pet) in pet" :key="pet.idPet"> 
            <img v-if="pet.fotoPerfilBase64 != 0" :src="pet.fotoPerfilBase64"  class="img-thumbnail" />            
            <img v-else src="@/assets/sem-foto.jpg"  class="img-thumbnail" />         
            <ul class="mt-3 ml-4">
              <li><h3>{{pet.nome}}</h3></li>
              <li>Especie: {{pet.especie}}</li>
              <li>Idade: {{pet.idade}}</li>
              <button type="button" class="btn btn-warning mt-2" @click="maisInformacoes(pet.idPet)">Mais informções</button>
            </ul>
          </div>  
        </div>  
        <div class="row" v-if="this.pet == ''">
          <div class="naoTemos w-100">
            <h4 class="center">Desculpe, no momento não temos nenhuma pet compatível com seu perfil.</h4>
          </div>          
        </div>
      </div> 
    </center>
    <br><br><br>
   <Footer /> 
  </div>
</template>

<script>
import Footer from '@/components/Footer';
import MenuCliente from '@/components/MenuCliente';
import ApiPet from '@/services/ApiPet.js';
import ApiPreferenciaPet from '@/services/ApiPreferenciaPet.js';
import ApiUsuario from '@/services/ApiUsuario.js';

export default {
  name: "PetsCompativelParaUsuario",
  components:{
    Footer,
    MenuCliente
  },

  data(){
    return{
      usuario: "",
      pet:[{
        idPet: "",
        nome: "",
        idade: "",
        especie: "",
        cor: "",
        porte: "",
        olhos: "",
        custoMensal: "",
        necessitaPasseio: "",
        necessitaCompanhia: "",
        descricao: "",        
      }],
      preferenciaPet:{
        idPreferenciaPet: "",
        usuario:{
          idUsuario: "",
        },
        idade: "",
        especie: "",
        cor: "",
        porte: "",
        olhos: "",
        custoMensal: "",
        necessitaPasseio: "",
        necessitaCompanhia: "",
      }
    }
  },

  mounted(){
    ApiUsuario.retornaPorId(this.$route.params.idUsuario)
    .then(resp => {          
      this.usuario = resp.data;                   

    ApiPreferenciaPet.retornaMatchPorIdUsuario(this.$route.params.idUsuario)
    .then(resp =>{
      this.preferenciaPet = resp.data

      ApiPet.retornaPetsCompativeisComPerfil(this.preferenciaPet)
      .then(resp => {          
        this.pet = resp.data;                   
      })
      .catch(this.pet = '')
      })
      .catch(e => alert(e.response.data.mensagem), this.pet = '')   

    })
    .catch(e => alert(e.response.data.mensagem))    
  },

  methods:{
    maisInformacoes(idPet){
      this.$router.push({path: `/perfilPet/${this.$route.params.idUsuario}/${idPet}`});  
    }
  }
}
</script>

<style>

</style>