<template>
  <div>
    <MenuAdm :nomeAdm="adm.nome" v-if="adm.nivelAcesso == 'Administrador'"/> 
    <center> 
      <div class="container">
        <h1 class="mt-3">Editar Profissional</h1><br>
        <img v-if="usuario.fotoPerfilBase64 != 0" :src="usuario.fotoPerfilBase64" class="img-thumbnail" />            
        <img v-else src="@/assets/sem-foto.jpg"  class="img-thumbnail" />

        <div class="row">
          <form class="w-100">
            <div class="row espacamento">
              <div class="form-group col-sm-4">
                <label for="exampleFormControlInput1">Nome </label>
                <input type="text" class="form-control" placeholder="Pluto" v-model="usuario.nome">
              </div>
              <div class="form-group col-sm-4">
                <label for="exampleFormControlInput1">E-mail </label>
                <input type="email" class="form-control" placeholder="example@gmail.com" v-model="usuario.email">
              </div>
              <div class="form-group col-sm-4">
                <label for="exampleFormControlInput1">Senha</label>
                <input type="password" class="form-control" placeholder="******" v-model="usuario.senha"> 
              </div>
            </div>
            <div class="row">
              <div class="form-group col-sm-4">
                <label >CPF</label>
                <input v-mask="mask" type="tel" class="form-control" placeholder="158.555.657-00" v-model="usuario.cpf">
              </div>              
              <div class="form-group col-sm-4">
                <label for="exampleFormControlInput1">Telefone</label>
                <input v-mask="maskTelefone" type="text" class="form-control"  placeholder="(21)00000-0000" v-model="usuario.telefone">
              </div>
              <div class="form-group col-sm-4">
                <label >Foto de perfil</label>
                <input type="file" name="file" multiple ref="files">
              </div>
            </div>   
            <div class="row mt-2">
              <div class="form-check col-sm-2 pl-0">
                <input class="form-check-input" type="checkbox" v-model="usuario.cadastraHospedagem">
                <label class="form-check-label">Hospedagem</label>
              </div>
              <div class="form-check col-sm-2">
                <input class="form-check-input" type="checkbox" v-model="usuario.cadastraAdocao">
                <label class="form-check-label">Animais para adoção</label>
              </div>
              <div class="form-check col-sm-2">
                <input class="form-check-input" type="checkbox" v-model="usuario.cadastraPasseio">
                <label class="form-check-label">Passeio</label>
              </div>
            </div>             
          </form>  
        </div> 
        <br>      
        <button class="btn btn-warning" type="submit" @click="alterarUsuario">Editar usuario</button>
      </div>
    </center>
    <br><br>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer';
import MenuAdm from '@/components/MenuAdm';
import ApiUsuario from '@/services/ApiUsuario.js';

export default {
  name: "EditarProfissional",
  components:{
    Footer,
    MenuAdm
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
        cadastraPasseio: "",
        aprovado: false      
      },   
      adm:[],
      mask: "###.###.###-##",
      maskTelefone: "(##) #####-####"

    }
  },

   mounted(){  
    ApiUsuario.retornaPorId(this.$route.params.idUsuario)
    .then(resp => {          
      this.adm = resp.data

      ApiUsuario.retornaPorId(this.$route.params.idProfissional)
      .then(resp => {          
        this.usuario = resp.data
      })

    })
    .catch(e => e.response.data.mensagem)
    
  },

  methods:{
    alterarUsuario(){
      if (this.$refs.files.files.length != 0){
        var reader = new FileReader()
        reader.readAsDataURL(this.$refs.files.files[0])
        reader.onload = () => {
          this.usuario.fotoPerfilBase64 = reader.result

          ApiUsuario.alterarUsuario(this.usuario.idUsuario, this.usuario)
          .then(() =>{
            alert("Cliente alterado com sucesso")
          })
          .catch(e => alert(e.response.data.mensagem))          
        }; 
      } else {
        ApiUsuario.alterarUsuario(this.usuario.idUsuario, this.usuario)
        .then(() =>{
          alert("Cliente alterado com sucesso")
        })
        .catch(e => alert(e.response.data.mensagem))
      }
      
    }
  }
}
</script>

<style>

</style>