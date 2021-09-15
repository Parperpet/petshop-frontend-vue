<template>
  <div>
    <MenuCliente :nomeCliente="usuario.nome" v-if="usuario.nivelAcesso == 'Cliente'"/>
    <MenuProfissional :nomeProfissional="usuario.nome" v-if="usuario.nivelAcesso == 'Profissional'"/>
    <center> 
      <div class="container">
        <h1 class="mt-3">Perfis compativeis com o {{pet.nome}}</h1><br>
        <div class="row">
          <div class="center">
            <img v-if="pet.fotoPerfilBase64 != 0" :src="pet.fotoPerfilBase64"  class="img-thumbnail" />            
            <img v-else src="@/assets/sem-foto.jpg"  class="img-thumbnail" />
          </div>                
        </div>
        <hr>
        <div class="row" v-if="perfisCompativeisComPet != ''">
          <div class="col-4 mb-4" v-for="(perfil) in perfisCompativeisComPet" :key="perfil.idPreferenciaPet">
            <div>
              <img v-if="perfil.usuario.fotoPerfilBase64 != 0" :src="perfil.usuario.fotoPerfilBase64"  class="img-thumbnail" />           
              <img v-else src="@/assets/sem-foto.jpg"  class="img-thumbnail" /><br>
              <label class="mt-2"><b>Nome: </b>{{perfil.usuario.nome}}</label><br>
              <label><b>Email: </b>{{perfil.usuario.email}}</label><br>
              <label><b>Telefone: </b>{{perfil.usuario.telefone}}</label><br>
              <button type="button" class="btn btn-warning mt-2" @click="enviarMensagem(perfil.usuario.idUsuario)">Enviar mensagem</button>
            </div>
            <hr>
          </div>
        </div>
        <div class="row" v-else>
          <div class="naoTemos w-100">
            <h4 class="center">Não existe nenhum perfil compatível como pet.</h4>
          </div>          
        </div>
        <br>        
      </div>
    </center>
    <br><br>
    <Footer />
  </div>  
</template>

<script>
import MenuCliente from "@/components/MenuCliente"
import MenuProfissional from "@/components/MenuProfissional"
import Footer from '@/components/Footer'
import ApiPet from '@/services/ApiPet.js'
import ApiPreferenciaPet from '@/services/ApiPreferenciaPet.js';

export default {
  name: "PerfilsCompativeisComPet",
  components:{
    MenuCliente,
    MenuProfissional,
    Footer
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
      pet:{
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
      },
      perfisCompativeisComPet:[]
    }
  },

  mounted(){  
    ApiPet.retornaPorId(this.$route.params.idPet)
    .then(resp => {          
      this.pet = resp.data;                       
      this.usuario = resp.data.dono

      ApiPreferenciaPet.retornaUsuariosCompativeisComPet(this.pet)
      .then(resp =>{
        this.perfisCompativeisComPet = resp.data
      })
      .catch(this.perfisCompativeisComPet = '')

    })
    .catch(e => alert(e.response.data.mensagem))
  },

  methods:{
    enviarMensagem(idPerfilCompativel){
      this.$router.push({path: `/mensagemParaPerfilCompativelComPet/${this.$route.params.idUsuario}/${idPerfilCompativel}/${this.pet.idPet}`});
    }
  }
}
</script>

<style>

</style>