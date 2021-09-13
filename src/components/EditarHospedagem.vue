<template>
  <div>
    <MenuProfissional :nomeProfissional="usuario.nome" v-if="usuario.nivelAcesso == 'Profissional'"/>
    <MenuAdm :nomeAdm="usuario.nome" v-if="usuario.nivelAcesso == 'Administrador'"/>
    <center> 
      <div class="container">        
        <h1> Editar Hospedagem</h1><br>
        <div class="col-4 p-0">         
          <img v-if="hospedagem.fotoPerfilBase64 != 0" :src="hospedagem.fotoPerfilBase64" class="img-thumbnail" />            
          <img v-else src="@/assets/sem-foto.jpg"  class="img-thumbnail" />
        </div>    
        <hr>  
        <div class="row">
          <div class="form-group col-sm-4">
            <label>Nome da hospedagem</label>
            <input type="nome" class="form-control"  v-model="hospedagem.nome">
          </div>
          <div class="form-group col-sm-8">
            <label>Endereço</label>
            <input type="nome" class="form-control"  v-model="hospedagem.endereco">
          </div>                  
          <div class="form-group col-sm-4">
            <label>Bairro</label>
            <input type="nome" class="form-control"  v-model="hospedagem.bairro">
          </div> 
          <div class="form-group col-sm-4">
            <label>Cidade</label>
            <input type="nome" class="form-control"  v-model="hospedagem.cidade">
          </div>
          <div class="form-group col-sm-4">
            <label>Estado</label>
            <select class="form-control" v-model="hospedagem.estado">										
              <option>AC</option>
              <option>AL</option>
              <option>AP</option>
              <option>AM</option>
              <option>BA</option>
              <option>CE</option>
              <option>DF</option>
              <option>ES</option>
              <option>GO</option>
              <option>MA</option>
              <option>MT</option>
              <option>MS</option>
              <option>MG</option>
              <option>PA</option>
              <option>PB</option>
              <option>PR</option>
              <option>PE</option>
              <option>PI</option>
              <option>RJ</option>
              <option>RN</option>
              <option>RS</option>
              <option>RO</option>
              <option>RR</option>
              <option>SC</option>
              <option>SP</option>
              <option>SE</option>
              <option>TO</option>
            </select>
          </div>
          <div class="form-group col-sm-3">
            <label>Tipo</label>
            <select class="form-control" v-model="hospedagem.tipo">
              <option>Casa</option>
              <option>Apartamento</option>
              <option>Sítio</option>
            </select>
          </div>          
                
          <div class="form-group col-sm-3">
            <label>Especie que aceita</label>
            <select class="form-control" v-model="hospedagem.especieAceita">
              <option>Cachorro</option>
              <option>Gato</option>
              <option>Pássaros</option>
              <option>Répteis</option>
              <option>todas</option>
            </select>
          </div>        
          
          <div class="form-group col-sm-3">
            <label>Porte que aceita</label>
            <select class="form-control" v-model="hospedagem.porteAceito">
              <option>Pequeno</option>
              <option>Medio</option>
              <option>Grande</option>
              <option>Todos</option>              
            </select>
          </div>
          
          <div class="form-group col-sm-3">
            <label>Preço da Diaria</label>
            <select class="form-control" v-model="hospedagem.precoDiaria">
              <option>R$ 15</option>
              <option>R$ 20</option>
              <option>R$ 25</option>
              <option>R$ 50</option>
              <option>R$ 100</option>
              <option>R$ 120</option>
              <option>R$ 150</option>
              <option>R$ 200</option>
              <option>R$ 220</option>
              <option>R$ 250</option>
              <option>Acima de $300</option>      
            </select>
          </div>

          <div class="form-group col-sm-6">
            <label>Descrição</label>
            <textarea class="form-control" rows="2" v-model="hospedagem.descricao"></textarea>
          </div>

          <div class="form-group col-sm-4 flexbottom">
            <div class="flex1">
              <label>Foto da hospedagem</label>
              <input type="file" name="file" multiple ref="files">
            </div>                  
          </div>
        </div> 
        <hr>
        <button class="btn btn-warning" @click="editarHospedagem">Editar Hospedagem</button>
      </div>
    </center>
    <br>
    <Footer />
  </div>
</template>

<script>
import MenuProfissional from "@/components/MenuProfissional";
import MenuAdm from "@/components/MenuAdm";
import ApiUsuario from '@/services/ApiUsuario.js';
import Footer from '@/components/Footer';
import ApiHospedagem from '@/services/ApiHospedagem.js';

export default {
  name: "EditarHospedagem",
  components:{
    Footer,  
    MenuProfissional,
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
        Telefone: "",
        fotoPerfil: ""        
      },
      hospedagem:{
        idHospedagem: "",
        idUsuario: "",
        nome: "",
        tipo: "",
        endereco: "",
        bairro: "",
        cidade: "",
        estado: "",
        especieAceita: "",
        porteAceito: "",
        precoDiaria: "",
        descricao: "",
        fotoPerfilBase64: ""
      }      
    }
  },

  mounted(){  
    ApiUsuario.retornaPorId(this.$route.params.idUsuario)
    .then(resp => {          
      this.usuario = resp.data
    })

    ApiHospedagem.retornaPorId(this.$route.params.idHospedagem) 
    .then(resp =>{
      this.hospedagem = resp.data
    })
    .catch(this.hospedagem = '')
  },

  methods:{
    editarHospedagem(){
      if (this.$refs.files.files.length != 0){
        var reader = new FileReader()
        reader.readAsDataURL(this.$refs.files.files[0])
        reader.onload = () => {
          this.hospedagem.fotoPerfilBase64 = reader.result

          ApiHospedagem.editarHospedagem(this.hospedagem.idHospedagem, this.hospedagem) 
          .then(resp =>{
            this.hospedagem = resp.data
            alert("Hospedagem alterada com sucesso!")
          })
          .catch(e => alert(e.response.data.mensagem))          
        }; 
        
      } else {
        ApiHospedagem.editarHospedagem(this.hospedagem.idHospedagem, this.hospedagem) 
        .then(resp =>{
          this.hospedagem = resp.data
          alert("Hospedagem alterada com sucesso!")
        })
        .catch(e => alert(e.response.data.mensagem))
      }
      
    }
  }

}
</script>

<style>

</style>