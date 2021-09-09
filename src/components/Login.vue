<template>
  <div>
    <Menu />
    <br><br><br><br><br>
    <center>  
      <div class="container">
        <div class="d-flex justify-content-center">
          <div class="user_card">
            <div class="d-flex justify-content-center">
              <div class="brand_logo_container">
                <img src="@/assets/logo.png" alt="Logo" width="100px">
              </div>
            </div>
            <div class="d-flex justify-content-center form_container">
              <form>
                <div class="input-group mb-3">
                  <div class="input-group-append">
                    <span class="input-group-text"></span>
                  </div>
                  <input type="email" name="email" class="form-control input_user" placeholder="example@gmail.com" v-model="login.email">
                </div>
                <div class="input-group mb-2">
                  <div class="input-group-append">
                    <span class="input-group-text"></span>
                  </div>
                  <input type="password" name="" class="form-control input_pass" placeholder="password" v-model="login.senha">
                </div>
                <div class="form-group">
                  <div class="custom-control custom-checkbox"><br>
                    <input type="checkbox" class="custom-control-input" id="customControlInline">
                    <label class="custom-control-label" for="customControlInline">Lembrar</label>
                  </div>
                </div>
                  <div class="d-flex justify-content-center mt-3 login_container">
              <button type="button" name="button" class="btn login_btn" @click="acessar">Login</button>
              </div>
              </form>
            </div>
        
            <div class="">
              <div class="justify-content-center links">
                <br>Não tem conta?<br>
                <a @click="cadastroCliente" class="mr-2 pointer">Cadastro cliente</a>  |  <a @click="cadastroProfissional" class="ml-2 pointer">Cadastro profissional</a>
              </div>
              <div class="d-flex justify-content-center links">
                <br><br><a href="contact.html" target="_blank">Esqueceu sua senha?</a>
              </div>
            </div>
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
import Menu from '@/components/Menu';
import ApiUsuario from '@/services/ApiUsuario.js';

export default {
  name: "Login",
  components:{
    Footer,
    Menu
  },

  data(){
    return{
      login:{
        email: "",
        senha: ""
      }
    }
  },

  methods:{   
    cadastroCliente(){
      this.$router.push({path: `/cadastroCliente`});
    },

    cadastroProfissional(){
      this.$router.push({path: `/cadastroProfissional`});
    },

    acessar(){
      ApiUsuario.login(this.login)
        .then(resp => {
          if ((resp.data.nivelAcesso == 'Profissional') && (resp.data.aprovado != true)) {
            alert("Cadastro ainda não aprovado pelo Administrador. Por favor tente novamente mais tarde")
          }else{
            this.$router.push({path: `/perfil/${resp.data.idUsuario}`});                                            
          }
        })
       .catch(e => alert(e.response.data.mensagem))
    }
  }
}
</script>

<style>

</style>