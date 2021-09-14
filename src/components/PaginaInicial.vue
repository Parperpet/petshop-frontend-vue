<template>
  <div>
    <MenuAdm :nomeAdm="usuario.nome" v-if="usuario.nivelAcesso == 'Administrador'"/>
    <div class="justify-center m-4">
      <h2 class="mr-4">Imagem principal: </h2>
      <input type="file" name="imagemPrincipal" multiple ref="imagemPrincipal">
    </div>
    <hr>  
    <center>
      <h1> Dicas </h1>
      <div class="row">
        <div class="col-6 pl-5 pr-5">
          <h3 class="mb-4">Dica 1</h3>          
          <input type="file" name="dica1" multiple ref="dica1">
          <textarea class="w-100 mt-3 p-2" placeholder="Descrição dica 1.." rows="4" v-model="paginaInicial.dica1"></textarea>
        </div>
        <div class="col-6 pl-5 pr-5">
          <h3 class="mb-4">Dica 2</h3>          
          <input type="file" name="dica2" multiple ref="dica2">
          <textarea class="w-100 mt-3 p-2" placeholder="Descrição dica 2.." rows="4" v-model="paginaInicial.dica2"></textarea>
        </div>
      </div>
      <hr>  
      <h1> Profissionais da área - Campeões do mês </h1>
      <div class="row">
        <div class="col-6 pl-5 pr-5 mt-3">
          <h3 class="mb-4">Profissional do mês</h3>          
          <select class="form-control" @change="mostrarProfissional()" v-model="idProfissionalAux">
            <option v-for="(profissionais) in profissionais" :key="profissionais.idUsuario" :value="profissionais.idUsuario">{{profissionais.nome}}</option>
          </select>
          <div class="mt-3" v-if="mostrarProfissionalSelecionado">
            <label><b>Nome: </b>{{profissionalSelecionado.nome}}</label><br>
            <label><b>Avaliação: </b>{{profissionalSelecionado.notaProfissional}}</label>
          </div>
          <textarea class="w-100 mt-3 p-2" placeholder="Descrição profissional do mês.." rows="4" v-model="paginaInicial.descricaoProfissional"></textarea>
        </div>
        <div class="col-6 pl-5 pr-5 mt-3">
          <h3 class="mb-4">Hospedagem campeã</h3>          
          <select class="form-control" @change="mostrarHospedagem()" v-model="idHospedagemAux">
            <option v-for="(hospedagem) in hospedagem" :key="hospedagem.idHospedagem" :value="hospedagem.idHospedagem">{{hospedagem.nome}}</option>
          </select>
          <div class="mt-3" v-if="mostrarHospedagemSelecionada">
            <label><b>Nome: </b>{{hospedagemSelecionada.nome}}</label><br>
            <label><b>Tipo: </b>{{hospedagemSelecionada.tipo}}</label><br>
            <label><b>Bairro: </b>{{hospedagemSelecionada.bairro}}</label><br>
            <label><b>Cidade: </b>{{hospedagemSelecionada.cidade}}</label><br>
            <label><b>Estado: </b>{{hospedagemSelecionada.estado}}</label><br>
          </div>
          <textarea class="w-100 mt-3 p-2" placeholder="Descrição hospedagem campeã.." rows="4" v-model="paginaInicial.descricaoHospedagem"></textarea>
        </div>
      </div> 
      <h1> Comentarios </h1>
      <div class="row">
        <div class="col-4 pl-5 pr-5 mt-3">
          <h3 class="mb-4">Comentario 1</h3>          
          <select class="form-control" @change="mostrarComentario1()" v-model="idComentarioAux1">
            <option v-for="(comentarios) in comentarios" :key="comentarios.idComentario" :value="comentarios.idComentario">{{comentarios.comentario}}</option>
          </select>
          <div class="mt-3" v-if="mostrarComentarioSelecionado1">
            <label><b>Cliente: </b>{{comentarioSelecionado1.idCliente.nome}}</label><br>
            <label><b>Comentario: </b>{{comentarioSelecionado1.comentario}}</label>
          </div>
        </div>        
        <div class="col-4 pl-5 pr-5 mt-3">
          <h3 class="mb-4">Comentario 2</h3>          
          <select class="form-control" @change="mostrarComentario2()" v-model="idComentarioAux2">
            <option v-for="(comentarios) in comentarios" :key="comentarios.idComentario" :value="comentarios.idComentario">{{comentarios.comentario}}</option>
          </select>
          <div class="mt-3" v-if="mostrarComentarioSelecionado2">
            <label><b>Cliente: </b>{{comentarioSelecionado2.idCliente.nome}}</label><br>
            <label><b>Comentario: </b>{{comentarioSelecionado2.comentario}}</label>
          </div>
        </div>        
        <div class="col-4 pl-5 pr-5 mt-3">
          <h3 class="mb-4">Comentario 3</h3>          
          <select class="form-control" @change="mostrarComentario3()" v-model="idComentarioAux3">
            <option v-for="(comentarios) in comentarios" :key="comentarios.idComentario" :value="comentarios.idComentario">{{comentarios.comentario}}</option>
          </select>
          <div class="mt-3" v-if="mostrarComentarioSelecionado3">
            <label><b>Cliente: </b>{{comentarioSelecionado3.idCliente.nome}}</label><br>
            <label><b>Comentario: </b>{{comentarioSelecionado3.comentario}}</label>
          </div>
        </div>        
      </div>  
      <hr>
      <button type="button" class="btn btn-success btnG mt-2" @click="salvarAlteracoes">Salvar alterações</button>
    </center>
    <br><br>
    <Footer />
  </div>  
</template>

<script>
import Footer from '@/components/Footer';
import MenuAdm from "@/components/MenuAdm"
import ApiUsuario from '@/services/ApiUsuario.js';
import ApiComentarios from '@/services/ApiComentarios.js';
import ApiHospedagem from '@/services/ApiHospedagem.js';
import ApiPaginaInicial from '@/services/ApiPaginaInicial.js';

export default {
  name: "PaginaInicial",
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
        aprovado: ""       
      },
      comentarios:[{
        idComentario: "",
        idProfissional:"",
        idCliente:"",
        comentario: "",
        aprovadoAdm: ""
      }],
      comentarioSelecionado1: "",
      mostrarComentarioSelecionado1: "",
      idComentarioAux1: "",
      comentarioSelecionado2: "",
      mostrarComentarioSelecionado2: "",
      idComentarioAux2: "",
      comentarioSelecionado3: "",
      mostrarComentarioSelecionado3: "",
      idComentarioAux3: "",
      paginaInicial:{
        fotoPrincipalBase64: "",
        fotoDica1Base64: "",
        dica1: "",
        fotoDica2Base64: "",
        dica2: "",
        profissional: "",
        descricaoProfissional: "",
        hospedagem: "",
        descricaoHospedagem: "",
        comentario1: "",
        comentario2: "",
        comentario3: "",
      },
      hospedagem:[],
      hospedagemSelecionada: "",
      mostrarHospedagemSelecionada: "",
      idHospedagemAux: "",
      profissionais: [],
      profissionalSelecionado:"",
      idProfissionalAux:"",
      mostrarProfissionalSelecionado: false
    }
  },

  mounted(){  
    ApiUsuario.retornaPorId(this.$route.params.idUsuario)
    .then(resp => {          
      this.usuario = resp.data

      ApiComentarios.retornaAprovados(-1) 
      .then(resp1 =>{
        this.comentarios = resp1.data
      })

      ApiHospedagem.retornaTodos() 
      .then(resp2 =>{
        this.hospedagem = resp2.data
      })

      ApiUsuario.retornaProfissionais() 
      .then(resp3 =>{
        this.profissionais = resp3.data
      })
    })
  },

  methods:{
    mostrarProfissional(){     
      this.profissionais.forEach(p =>{
        if (p.idUsuario == this.idProfissionalAux) {
          if (p.notaProfissional == null) {
            p.notaProfissional = 'Sem avaliaçãoes'
          }
          this.profissionalSelecionado = p          
        }
      })  

      this.mostrarProfissionalSelecionado = true   
    },

    mostrarHospedagem(){
      this.hospedagem.forEach(h =>{
        if (h.idHospedagem == this.idHospedagemAux) {          
          this.hospedagemSelecionada = h  
        }
      }) 

      this.mostrarHospedagemSelecionada = true
    },

    mostrarComentario1(){
      this.comentarios.forEach(c =>{
        if (c.idComentario == this.idComentarioAux1) {          
          this.comentarioSelecionado1 = c 
        }
      }) 

      this.mostrarComentarioSelecionado1 = true
    },

    mostrarComentario2(){
      this.comentarios.forEach(c =>{
        if (c.idComentario == this.idComentarioAux2) {          
          this.comentarioSelecionado2 = c 
        }
      }) 

      this.mostrarComentarioSelecionado2 = true
    },

    mostrarComentario3(){
      this.comentarios.forEach(c =>{
        if (c.idComentario == this.idComentarioAux3) {          
          this.comentarioSelecionado3 = c 
        }
      }) 

      this.mostrarComentarioSelecionado3 = true
    },

    salvarAlteracoes(){
      this.paginaInicial.profissional = this.profissionalSelecionado.idUsuario
      this.paginaInicial.hospedagem = this.hospedagemSelecionada.idHospedagem
      this.paginaInicial.comentario1 = this.comentarioSelecionado1.idComentario
      this.paginaInicial.comentario2 = this.comentarioSelecionado2.idComentario
      this.paginaInicial.comentario3 = this.comentarioSelecionado3.idComentario

      const AlertInfo = "As imagens devem ser preenchidas. Por favor Verifique!"

      if (this.$refs.imagemPrincipal.files.length != 0){
        var reader = new FileReader()
        reader.readAsDataURL(this.$refs.imagemPrincipal.files[0])
        reader.onload = () => {
          this.paginaInicial.fotoPrincipalBase64 = reader.result

          if (this.$refs.dica1.files.length != 0){
            var reader1 = new FileReader()
            reader1.readAsDataURL(this.$refs.dica1.files[0])
            reader1.onload = () => {
              this.paginaInicial.fotoDica1Base64 = reader1.result

              if (this.$refs.dica2.files.length != 0){
                var reader2 = new FileReader()
                reader2.readAsDataURL(this.$refs.dica2.files[0])
                reader2.onload = () => {
                  this.paginaInicial.fotoDica2Base64 = reader2.result

                  ApiPaginaInicial.gravarPaginaInicial(this.paginaInicial)
                  .then(() =>{
                    alert("Alterações salvas com sucesso!")
                  })               
                }
              } else {                
                alert(AlertInfo)
              }
            }
          } else {
            alert(AlertInfo)
          }      
        }
      } else {
        alert(AlertInfo)
      }
    }
  }

}
</script>

<style>

</style>