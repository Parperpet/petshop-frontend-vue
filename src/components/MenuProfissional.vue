<template>
  <header>
    <div class="container">      
      <nav class="justify-content-between w-100">
        <div class="row">
          <div class="col-sm-1 pr-0">
              <a class="navbar-brand m-0" @click="home"><img src="@/assets/logo.png" width="50px"></a>
            </div>
            <div class="col-sm-8 mt-3 p-0">
              <h2 @click="home">Par Perpet</h2>
            </div>
          <div class="col-sm-1">
            <a class="navbar-brand" href="https://www.facebook.com/">
              <img src="@/assets/facebook-app-symbol.svg" width="20px"/>
            </a>
          </div>
          <div class="col-sm-1"><a class="navbar-brand" href="https://www.instagram.com/">
            <img src="@/assets/instagram.svg" width="20px"/>
          </a>
        </div>
          <div class="col-sm-1"><a class="navbar-brand" href="https://api.whatsapp.com/send?phone=5521000000000&text=Oi%2C%20Quero%20adotar%20um%20pet!%20">
            <img src="@/assets/whatsapp.svg" width="20px"/>
          </a></div>
        </div>  
      </nav>
      
      <nav class="">
        <div class="row">
          <div class="itensMenu">          
            <div class="dropdown mr-5">
              <h5 class="pointer mt-4" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Hospedagem</h5>            
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#" @click="cadastrarNovaHospedagem">Criar nova</a>
                <a class="dropdown-item" href="#" @click="minhasHospedagens">Minhas hospedagens</a>
              </div>
            </div> 

            <div class="dropdown mr-5">
              <h5 class="pointer mt-4" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Adoção</h5>            
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#" @click="cadastrarNovoPet">Criar nova adoção</a>
                <a class="dropdown-item" href="#" @click="meusPets">Meus Pets</a>
              </div>
            </div> 

            <div class="dropdown mr-5">
              <h5 class="pointer mt-4" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Passeio</h5>            
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#" @click="cadastroPasseio">Criar novo</a>
                <a class="dropdown-item" href="#" @click="meusClientes">Meus clientes</a>
                <a class="dropdown-item" href="#" @click="meusPasseios">Meus passeios</a>
              </div>
            </div> 
          </div>   

          <div class="col-sm-1">                        
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
          </div>
          <div class="col-sm-2"> 
          <ul>                
            <li><a class="pointer" @click="perfil">{{nomeProfissional}} - Profissional</a> </li>
            <li><a class="pointer" @click="caixaDeEntrada">Mensagens</a></li>            
            <li><a class="pointer" @click="sair">Sair</a></li>
          </ul>
        </div>
        </div>
      </nav>            
      </div>    
  </header>
</template>

<script>
import ApiUsuario from '@/services/ApiUsuario.js';

export default {
  name: "MenuProfissional",
  props:{
    nomeProfissional: String
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
      }
    }
  },
  
  mounted(){
    ApiUsuario.retornaPorId(this.$route.params.idUsuario)
    .then(resp => {          
      this.usuario = resp.data;                   
    })
    .catch(e => alert(e.response.data.mensagem))

  },

  methods:{
    perfil(){
      this.$router.push({path: `/perfil/${this.$route.params.idUsuario}`});
    },

    caixaDeEntrada(){
      this.$router.push({path: `/caixaDeEntrada/${this.$route.params.idUsuario}/`});
    },

    sair(){
      this.$router.push({path: `/`});
    },

    home(){
      this.$router.push({path: `/`});
    },

    meusPets(){
      this.permissaoParaAdocao()
      this.$router.push({path: `/meusPets/${this.$route.params.idUsuario}/`});
    },

    cadastrarNovoPet(){
      this.permissaoParaAdocao()
      this.$router.push({path: `/cadastroPets/${this.$route.params.idUsuario}/`});
    },

    cadastrarNovaHospedagem(){
      this.permissaoParaHospedagem();      
      this.$router.push({path: `/cadastroHospedagem/${this.$route.params.idUsuario}/`});
    },
    
    minhasHospedagens(){
      this.permissaoParaHospedagem();
      this.$router.push({path: `/gerenciarHospedagens/${this.$route.params.idUsuario}/`});
    },

    cadastroPasseio(){
      this.permissaoParaPasseio()
      this.$router.push({path: `/cadastroPasseio/${this.$route.params.idUsuario}/`});
    },
    
    meusClientes(){
      this.permissaoParaPasseio()
      this.$router.push({path: `/meusClientes/${this.$route.params.idUsuario}/`});
    },

    meusPasseios(){
      this.permissaoParaPasseio()
      this.$router.push({path: `/meusPasseios/${this.$route.params.idUsuario}/`});
    },

    permissaoParaHospedagem(){
      if (this.usuario.cadastraHospedagem != true) {        
        alert("Você não tem permissão para hospedagens. Contate o administrador.");
        throw new Error("Permissão negada");        
      }
    },

    permissaoParaPasseio(){
      if (this.usuario.cadastraPasseio != true) {        
        alert("Você não tem permissão para passeios. Contate o administrador.");
        throw new Error("Permissão negada");        
      }
    },

    permissaoParaAdocao(){
      if (this.usuario.cadastraAdocao != true) {        
        alert("Você não tem permissão para adocão. Contate o administrador.");
        throw new Error("Permissão negada");        
      }
    }
  }
}
</script>

<style>

</style>