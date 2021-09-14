<template>
  <div>
    <MenuCliente :nomeCliente="usuario.nome" v-if="usuario.nivelAcesso == 'Cliente'"/>
    <MenuProfissional :nomeProfissional="usuario.nome" v-if="usuario.nivelAcesso == 'Profissional'"/>
    <MenuAdm :nomeAdm="usuario.nome" v-if="usuario.nivelAcesso == 'Administrador'"/>
    <center>
      <div class="">
        <h1 class="mt-2 mb-4">{{usuario.nome}}</h1>
        <h3 class="mt-2 mb-4" v-if="usuario.nivelAcesso == 'Profissional'">Média das avaliações recebidas: {{usuario.notaProfissional}}</h3>
        <hr>
        <div class="row">
          <div class="col-sm-3 ml-4">         
            <img v-if="usuario.fotoPerfilBase64 != 0" :src="usuario.fotoPerfilBase64" class="img-thumbnail" />            
            <img v-else src="@/assets/sem-foto.jpg"  class="img-thumbnail" />
          </div>          
          <div class="col-sm-8">
            <div class="row">
              <form class="w-100">
            <div class="row espacamento">
              <div class="form-group col-sm-4">
                <label>Nome</label>
                <input type="text" class="form-control" placeholder="Pluto" v-model="usuario.nome">
              </div>
              <div class="form-group col-sm-4">
                <label >E-mail </label>
                <input type="email" class="form-control" placeholder="example@gmail.com" v-model="usuario.email">
              </div>
              <div class="form-group col-sm-4">
                <label >Senha</label>
                <input type="password" class="form-control" placeholder="******" v-model="usuario.senha"> 
              </div>
            </div>

            <div class="row espacamento">
              <div class="form-group col-sm-4">
                <label >CPF</label>
                <input v-mask="mask" type="tel" class="form-control" placeholder="158.555.657-00" v-model="usuario.cpf">
              </div>              
              <div class="form-group col-sm-4">
                <label >Telefone</label>
                <input v-mask="maskTelefone" type="text" class="form-control"  placeholder="(21)00000-0000" v-model="usuario.telefone">
              </div>
              <div class="form-group col-sm-4">
                <label>Foto de perfil</label>
                <input type="file" name="file" multiple ref="files">
              </div>
            </div>               
          </form>  
            </div>
            <button type="button" class="btn btn-warning" @click="editar">Editar</button>
          </div>
        </div>
        <br>
      </div>
      <hr>
      <div class="row justify-center" v-if="comentarios != ''">
        <h2 class="w-100 mb-4">Comentários de clientes</h2>
        <div class="justify-center col-5 mb-5" v-for="(comentarios) in comentarios" :key="comentarios.idComentario">
          <div class="text-center ">
            <img v-if="comentarios.idCliente.fotoPerfilBase64 != 0" :src="comentarios.idCliente.fotoPerfilBase64" class="img-thumbnail" />            
            <img v-else src="@/assets/sem-foto.jpg"  class="img-thumbnail" />
          </div>
          <div class=" mt-5 ml-3">
            <label class="mt-5"><b>Cliente: </b>{{comentarios.idCliente.nome}}</label><br>                     
            <label><b>Comentrario: </b>{{comentarios.comentario}}</label>                      
          </div>
        </div>
      </div> 
    </center>
    <Footer />
  </div>
</template>

<script>
import MenuCliente from "@/components/MenuCliente"
import MenuProfissional from "@/components/MenuProfissional"
import MenuAdm from "@/components/MenuAdm"
import Footer from '@/components/Footer';
import ApiUsuario from '@/services/ApiUsuario.js';
import ApiComentarios from '@/services/ApiComentarios.js';

export default {
  name: "Perfil",
  components:{
    MenuCliente,
    MenuProfissional,
    MenuAdm,
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
        cadastraPasseio: "",
        notaProfissional: ""  
      },
      mask: "###.###.###-##",
      maskTelefone: "(##) #####-####",
      comentarios:[{
        idProfissional:"",
        idCliente:"",
        comentario: "",
        aprovadoAdm: true
      }],
    }
  },

  mounted(){
    ApiUsuario.retornaPorId(this.$route.params.idUsuario)
    .then(resp => {          
      this.usuario = resp.data; 

      if (this.usuario.nivelAcesso == 'Profissional') {       
        if (this.usuario.notaProfissional == null) {
          this.usuario.notaProfissional = 'Sem avaliações'
        }

        ApiComentarios.retornaPorUsuario(this.usuario.idUsuario)
        .then(resp =>{
          this.comentarios = resp.data
        })  
      } else {
        this.comentarios = ''
      }   
    })
    .catch(e => {
      this.$router.push({path: `/login/`});
      alert(e.response.data.mensagem)      
    })
  },

  methods:{    
    editar(){
      if (this.$refs.files.files.length != 0){
        var reader = new FileReader()
        reader.readAsDataURL(this.$refs.files.files[0])
        reader.onload = () => {
          this.usuario.fotoPerfilBase64 = reader.result

          ApiUsuario.alterarUsuario(this.$route.params.idUsuario, this.usuario)
        .then(() => {          
          alert("Usuario atualizado com sucesso!")
          this.$router.push({path: `/perfil/${this.$route.params.idUsuario}`});                 
        })
        .catch(e => alert(e.response.data.mensagem))         
        }; 
        
      } else {
        ApiUsuario.alterarUsuario(this.$route.params.idUsuario, this.usuario)
        .then(() => {          
          alert("Usuario atualizado com sucesso!")
          this.$router.push({path: `/perfil/${this.$route.params.idUsuario}`});                 
        })
        .catch(e => alert(e.response.data.mensagem))
      }

      
    }
  }
}
</script>

<style>

</style>