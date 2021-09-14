<template>
  <footer>
    <div class="container pb-3">
      <div class="row row-cols-4 ">
        <div class="col-4">
          <h3>Endereço</h3>
          <p>R. Passo da Pátria, São Domingos, Niterói - RJ, 24210-240 Tel: (12) 0000-0000</p>
        </div>
        <div class="col">
          <h3>Serviços</h3>
          <a class="pointer" @click="petsDisponiveisParaAdocao">Adote um pet</a><br>
          <a class="pointer" @click="indexHospedagem">Hospedagem</a><br>
          <a class="pointer" @click="indexPasseadores">Passeio</a><br>
        </div>
        <div class="col">
          <h3>Detalhes</h3>
          <a class="pointer" @click="contato">Contato</a><br>
          <a class="pointer" @click="comentariosAdm" v-if="usuario.nivelAcesso == 'Cliente'">Faça um comentário sobre nós</a><br>
        </div>
        <div class="col">
         <h3>Receba dicas</h3>
          <input type="email" class="form-control mr-sm-1" placeholder="exemplo@gmail.com" v-model="contatoDicas.email" /><br>
          <button type="button" class="btn btn-light" @click="dicas">Inscreva-se</button>          
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import ApiContato from '@/services/ApiContato.js';
import ApiUsuario from '@/services/ApiUsuario.js';

export default {
  name: "Footer",

  data(){
    return{
      contatoDicas:{
        idMensagem: "",
        nome: "DICAS",
        email: "",
        mensagem: "Quero Receber Dicas.",
        cliente: false
      },
      usuario: ""
    }
  },

  mounted(){
    if (this.$route.params.idUsuario != undefined) {
      ApiUsuario.retornaPorId(this.$route.params.idUsuario)
      .then(resp => {          
        this.usuario = resp.data; 
      })      
    }
  },

  methods:{
    contato(){
      this.$router.push({path: `/contato/${this.$route.params.idUsuario}`});
    },

    petsDisponiveisParaAdocao(){
      this.$router.push({path: `/petsDisponiveisParaAdocao/${this.$route.params.idUsuario}`});
    },

    indexHospedagem(){
      this.$router.push({path: `/indexHospedagem/${this.$route.params.idUsuario}/`});
    },

    indexPasseadores(){
      this.$router.push({path: `/indexPasseadores/${this.$route.params.idUsuario}/`});
    },

    comentariosAdm(){
      this.$router.push({path: `/comentariosAdm/${this.$route.params.idUsuario}/`});
    },

    dicas(){      
      if (this.usuario.nivelAcesso == 'Cliente') {
        this.contatoDicas.cliente = true
      }

      ApiContato.gravarContato(this.contatoDicas)
      .then(() =>{
        alert("Email cadastrado com sucesso para receber novas dicas.")
      })
      .catch(e => e.response.data.mensagem)
    }
  }
}
</script>

<style>

</style>