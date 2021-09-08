<template>
  <div>
    <header>
      <div class="container-fluid pl-5 pr-5">      
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
              <h5 class="pointer mt-4 mr-5" @click="petsDisponiveisParaAdocao">Pets disponiveis para adoção</h5>              
              <h5 class="pointer mt-4 mr-5" @click="indexHospedagem">Hospedagem</h5> 
              <div class="dropdown">
                <h5 class="pointer mt-4 mr-5" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Passeios</h5>            
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="#" @click="passeiosContratados">Passeios contratados</a>
                  <a class="dropdown-item" href="#" @click="indexPasseadores">Procurar passeio</a>
                </div>
              </div>              
              <div class="dropdown">
                <h5 class="pointer mt-4 mr-5" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Match com pet</h5>            
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="#" @click="cadastrarMatch">Cadastrar Match</a>
                  <a class="dropdown-item" href="#" @click="petsCompativelParaUsuario">Meus Matches</a>
                </div>
              </div>              
              <div class="dropdown">
                <h5 class="pointer mt-4" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Meus Pets</h5>            
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="#" @click="cadastrarNovoPet">Criar novo</a>
                  <a class="dropdown-item" href="#" @click="meusPets">Meus Pets</a>
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
              <li><a class="pointer" @click="perfil">{{nomeCliente}} - Cliente</a> </li>
              <li><a class="pointer" @click="caixaDeEntrada">Mensagens</a></li>            
              <li><a class="pointer" @click="sair">Sair</a></li>
            </ul>
          </div>
          </div>
        </nav>            
        </div>    
    </header>
  </div>  
</template>

<script>
export default {
  name: "MenuCliente",
  props:{
    nomeCliente: String
  }, 

  methods:{
    perfil(){
      this.$router.push({path: `/perfil/${this.$route.params.idUsuario}/`});
    },

    sair(){
      this.$router.push({path: `/`});
    },

    petsDisponiveisParaAdocao(){
      this.$router.push({path: `/petsDisponiveisParaAdocao/${this.$route.params.idUsuario}/`});
    },

    petsCompativelParaUsuario(){
      this.$router.push({path: `/petsCompativelParaUsuario/${this.$route.params.idUsuario}/`});
    },

    caixaDeEntrada(){
      this.$router.push({path: `/caixaDeEntrada/${this.$route.params.idUsuario}/`});
    },

    indexHospedagem(){
      this.$router.push({path: `/indexHospedagem/${this.$route.params.idUsuario}/`});
    },

    meusPets(){
      this.$router.push({path: `/meusPets/${this.$route.params.idUsuario}/`});
    },

    cadastrarNovoPet(){
      this.$router.push({path: `/cadastroPets/${this.$route.params.idUsuario}/`});
    },

    indexPasseadores(){
      this.$router.push({path: `/indexPasseadores/${this.$route.params.idUsuario}/`});
    },

    home(){
      this.$router.push({path: `/`});
    },  
    
    cadastrarMatch(){
      this.$router.push({path: `/cadastrarMatch/${this.$route.params.idUsuario}/`});
    },

    passeiosContratados(){
      this.$router.push({path: `/passeiosContratados/${this.$route.params.idUsuario}/`});
    }
  }
}
</script>

<style>

</style>