<template>
  <div>
    <MenuCliente :nomeCliente="usuario.nome" v-if="usuario.nivelAcesso == 'Cliente'"/>
    <Menu v-if="usuario.nivelAcesso == ''"/>
    <center>
      <div class="container">
        <div class="row">
          <div class="col">
            <h2>Adote um pet</h2>
            <h4>Animais Esperando Por Uma Família, Dê Amor À Quem Precisa. Veja Fotos e Características Dos Bichinhos! Castrados. Vacinados. 
            Adoção Animais. Filhotes e Adultos.
            Serviços: Adoção Animais, Castrados, Vacinados.</h4>
          </div>      
        </div>
      </div>
      <br><br><br>
      <div class="container">
        <div class="row" v-if="this.pet != ''">
          <div class="col-sm-4" v-for="(pet) in pet" :key="pet.idPet">         
            <img v-if="pet.fotoPerfilBase64 != 0" :src="pet.fotoPerfilBase64"  class="img-thumbnail" />            
            <img v-else src="@/assets/sem-foto.jpg"  class="img-thumbnail" />            
            <ul>
              <li><b>{{pet.nome}}</b></li>
              <li>Especie: {{pet.especie}}</li>
              <li>Sexo: {{pet.sexo}}</li>
              <li>Idade: {{pet.idade}}</li> 
              <li>Porte: {{pet.porte}}</li>
              <li>                 
                <button type="button" class="btn btn-warning mt-2" @click="maisInformacoes(pet.idPet)">Mais informções</button>                  
              </li>
            </ul>
          </div>
        </div>
        <div class="row" v-if="this.pet == ''">
          <div class="naoTemos w-100">
            <h4 class="center">Desculpe, no momento não temos nenhum PET disponível para adoção.</h4>
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
import Menu from '@/components/Menu';
import MenuCliente from "@/components/MenuCliente"
import ApiPet from '@/services/ApiPet.js'
import ApiUsuario from '@/services/ApiUsuario.js';

export default {
  name: "PetsDisponiveisParaAdocao",
  components:{
    Footer,
    Menu,
    MenuCliente
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
        telefone: "",
        fotoPerfilBase64: "",
        cadastraHospedagem: "",
        cadastraAdocao: "",
        cadastraPasseio: ""       
      },
      pet:[{
        idPet: "",
        dono:{
          idUsuario: "",
        },
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
        fotoPerfilBase64: "",
        disponivelParaAdocao: "",
        sexo: ""
      }],
    }
  },

  mounted(){
    ApiPet.retornaPetsDisponiveisParaAdocao()
    .then(resp =>{
      this.pet = resp.data
    })
    .catch(this.pet = '')

    ApiUsuario.retornaPorId(this.$route.params.idUsuario)
    .then(resp => {          
      this.usuario = resp.data;                   
    })
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