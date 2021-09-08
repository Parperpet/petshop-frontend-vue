<template>
  <header>
    <div class="container">      
      <nav class="justify-content-between w-100">
        <div class="row">
          <div class="col-sm-1 pr-0">
              <a class="navbar-brand m-0" @click="home"><img src="@/assets/logo.png" width="50px"></a>
            </div>
            <div class="col-sm-8 mt-3 p-0">
              <h2 @click="home">Par Perpet - Painel do Administrador</h2>
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
            <h5 class="pointer mt-4 mr-5" @click="gerenciarHospedagens">Hospedagens</h5> 
            <h5 class="pointer mt-4 mr-5" @click="gerenciarProfissionais">Profissionais</h5> 
            <h5 class="pointer mt-4 mr-5" @click="gerenciarComentarios">Comentários</h5> 
            <h5 class="pointer mt-4 mr-5" @click="paginaInicial">Página inicial</h5> 
          </div>   

          <div class="col-sm-1">                        
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
          </div>
          <div class="col-sm-2"> 
          <ul>                
            <li><a class="pointer" @click="perfil">{{nomeAdm}} - Administrador</a> </li>
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
export default {
  name: "MenuAdm",
  props:{
    nomeAdm: String
  },  

  methods:{
    perfil(){
      this.$router.push({path: `/perfil/${this.$route.params.idUsuario}`});
    },

    caixaDeEntrada(){
      this.$router.push({path: `/caixaDeEntradaAdm/${this.$route.params.idUsuario}/`});
    },

    sair(){
      this.$router.push({path: `/`});
    },

    home(){
      this.$router.push({path: `/`});
    },

    gerenciarHospedagens(){
      this.$router.push({path: `/gerenciarHospedagens/${this.$route.params.idUsuario}/`});
    },

    gerenciarProfissionais(){
      this.$router.push({path: `/gerenciarProfissionais/${this.$route.params.idUsuario}/`});
    },

    gerenciarComentarios(){
      this.$router.push({path: `/gerenciarComentarios/${this.$route.params.idUsuario}/`});
    },

    paginaInicial(){
      this.$router.push({path: `/paginaInicial/${this.$route.params.idUsuario}/`});
    }
  }
}
</script>

<style>

</style>