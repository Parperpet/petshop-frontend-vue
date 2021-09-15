<template>
  <div>
    <MenuCliente :nomeCliente="usuario.nome" v-if="usuario.nivelAcesso == 'Cliente'"/>
    <Menu v-if="usuario.nivelAcesso != 'Cliente'"/>    
    <center>
      <div class="container" v-if="adocaoConfirmada == false"><br><br>
        <div class="row">        
          <img v-if="pet.fotoPerfilBase64 != 0" :src="pet.fotoPerfilBase64"  class="img-thumbnail" />            
          <img v-else src="@/assets/sem-foto.jpg"  class="img-thumbnail" />
          <div class="col-sm-4">
            <ul>
              <li><h1>{{pet.nome}}</h1></li>
              <li>Especie: {{pet.especie}}</li>
              <li>Sexo: {{pet.sexo}}</li>
              <li>Idade: {{pet.idade}}</li>
              <li>Cor: {{pet.cor}} </li>
              <li>Porte: {{pet.porte}}</li> 
              <li>Olhos: {{pet.olhos}}</li>
              <li>Custo mensal: {{pet.custoMensal}}</li>
              <li>Necessita Passeio: {{pet.necessitaPasseio}}</li>
              <li>Necessita Companhia: {{pet.necessitaCompanhia}}</li>
              <li>Olhos: {{pet.olhos}}</li>
            </ul>            
          </div>
          <div class="col-4 pt-5 text-center">
            <button type="button" class="btn btn-warning mt-5 h-max" @click="enviarMensagem">Enviar Mensagem para o dono</button> <br>
            <button type="button" class="btn btn-success mt-4 h-max" @click="adotar">Adotar</button>
          </div>
        </div>
        <br><br>
      </div>
      
      <div class="container alert-warning mt-5" v-else>
        <br><br>
        <section class="mb-5">
          <h2>Adoção confirmada!</h2>
          <h4>Entre em contato com o dono para buscar seu pet.</h4>
          <h5>Telefone: {{donoAntigo.telefone}}</h5>
          <h5>Email: {{donoAntigo.email}}</h5>
          <br><br>   
        </section>  
      </div>
    </center>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer';
import Menu from '@/components/Menu';
import ApiPet from '@/services/ApiPet.js'
import MenuCliente from "@/components/MenuCliente"
import ApiUsuario from '@/services/ApiUsuario.js';

export default {
  name: "PerfilPet",
  components:{
    MenuCliente,
    Footer,
    Menu
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
        disponivelParaAdocao: "",
        sexo: ""
      },
      donoAntigo:{
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
      adocaoConfirmada: false
    }
  },

  mounted(){
    ApiUsuario.retornaPorId(this.$route.params.idUsuario)
    .then(resp => {          
      this.usuario = resp.data;                   
    })

    ApiPet.retornaPorId(this.$route.params.idPet)
    .then(resp =>{
      this.pet = resp.data
    })
    .catch(e => alert(e.response.data.mensagem))
  },

  methods:{
    enviarMensagem(){
      if (!this.verificaUsuarioLogado()){
        return this.$router.push({path: `/login/`});        
      }

      this.$router.push({path: `/mensagem/${this.$route.params.idUsuario}/${this.pet.idPet}`}); 
    },

    adotar(){
      if (!this.verificaUsuarioLogado()){
        return this.$router.push({path: `/login/`});        
      }

      this.pet.dono.idUsuario = this.usuario.idUsuario
      this.pet.disponivelParaAdocao = false
      this.donoAntigo = this.pet.dono

      ApiPet.alterarPet(this.pet.idPet, this.pet)
      .then(resp =>{
        this.pet = resp.data
        this.adocaoConfirmada = true        
      })
      .catch(e => alert(e.response.data.mensagem))
    },

    verificaUsuarioLogado(){
      return !this.usuario.idUsuario == ''
    }
  }
}
</script>

<style>

</style>