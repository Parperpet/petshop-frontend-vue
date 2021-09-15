<template>
  <div>
    <MenuCliente :nomeCliente="usuario.nome" v-if="usuario.nivelAcesso == 'Cliente'"/>
    <MenuProfissional :nomeProfissional="usuario.nome" v-if="usuario.nivelAcesso == 'Profissional'"/>
    <center>
      <div class="container">
        <div class="row">
          <div class="col mt-3">
            <h2>Meus Pets</h2>            
          </div>      
        </div>
      </div>
      <br>
      <div class="container">
        <div class="row" v-if="this.pet != ''">
          <div class="col-sm-4" v-for="(pet) in pet" :key="pet.idPet">         
            <img v-if="pet.fotoPerfilBase64 != 0" :src="pet.fotoPerfilBase64"  class="img-thumbnail" />            
            <img v-else src="@/assets/sem-foto.jpg"  class="img-thumbnail" />
            <ul>
              <li class="mt-3"><b>{{pet.nome}}</b></li>
              <li>Especie: {{pet.especie}}</li>
              <li>Sexo: {{pet.sexo}}</li>
              <li>Idade: {{pet.idade}}</li> 
              <li>Disponível para adoção: {{pet.disponivelParaAdocao}}</li>
              <li>                 
                <button type="button" class="btn btn-warning mt-2" @click="editarPet(pet.idPet, pet.dono.idUsuario)">Editar Pet</button> <br>                  
                <button v-if="pet.disponivelParaAdocao" type="button" class="btn btn-success mt-2" @click="perfilsCompativeisComPet(pet.idPet)">Perfis compatíveis para adoção</button>                  
              </li>
            </ul>
          </div>
        </div>
        <div class="row" v-if="this.pet == ''">
          <div class="naoTemos w-100">
            <h4 class="center">Você ainda não tem nenhum PET cadastrado.</h4>
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
import MenuCliente from "@/components/MenuCliente"
import MenuProfissional from "@/components/MenuProfissional"
import ApiPet from '@/services/ApiPet.js'
import ApiUsuario from '@/services/ApiUsuario.js';

export default {
  name: "MeusPets",
  components:{
    Footer,    
    MenuCliente,
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
        disponivelParaAdocao: ""
      }],      
    }
  },

  mounted(){  
    ApiUsuario.retornaPorId(this.$route.params.idUsuario)
    .then(resp => {          
      this.usuario = resp.data

      ApiPet.retornaMeusPets(this.usuario.idUsuario)
      .then(resp1 =>{
        this.pet = resp1.data
      })
      .catch(this.pet = '')
    })
    .catch(this.pet = '')

  },

  methods:{
    editarPet(idPet, idUsuario){
      this.$router.push({path: `/editarPet/${idUsuario}/${idPet}`}); 
    },

    perfilsCompativeisComPet(idPet){ 
      this.$router.push({path: `/perfilsCompativeisComPet/${this.$route.params.idUsuario}/${idPet}`});       
    }
  }
}
</script>

<style>

</style>