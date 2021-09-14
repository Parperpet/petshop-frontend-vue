<template>
  <div>    
    <MenuCliente :nomeCliente="usuario.nome" v-if="usuario.nivelAcesso == 'Cliente'"/>   
    <div class="container p-0">
      <div class="row justify-center">
        <h2 class="mt-3 mb-2">Meus passeios</h2>
      </div> 
      <hr>     
      <div class="row w-100 ml-0" v-if="this.reservaPasseio != ''">        
        <div class="col-6 p-0 mb-5 text-center" v-for="(reservaPasseio) in reservaPasseio" :key="reservaPasseio.idReservaPasseio">
          <h4>Profissional: {{reservaPasseio.passeio.usuario.nome}}</h4>
          <div class="row justify-center mt-3">           
            <div class="p-0">         
              <img v-if="reservaPasseio.passeio.usuario.fotoPerfilBase64 != ''" :src="reservaPasseio.passeio.usuario.fotoPerfilBase64" class="img-thumbnail" />            
              <img v-else src="@/assets/sem-foto.jpg"  class="img-thumbnail" />
              <div class="estrelas mt-3">
                <input type="radio" id="cm_star-empty" :name="reservaPasseio.idReservaPasseio" value="" checked/>
                <label :for="'cm_star-1' + reservaPasseio.idReservaPasseio" ><i class="fa"></i></label>
                <input type="radio" :id="'cm_star-1' + reservaPasseio.idReservaPasseio" value="1" :name="reservaPasseio.idReservaPasseio" v-model="reservaPasseio.passeio.usuario.notaProfissional"/>
                <label :for="'cm_star-2' + reservaPasseio.idReservaPasseio"><i class="fa"></i></label>
                <input type="radio" :id="'cm_star-2' + reservaPasseio.idReservaPasseio" value="2" :name="reservaPasseio.idReservaPasseio" v-model="reservaPasseio.passeio.usuario.notaProfissional"/>
                <label :for="'cm_star-3' + reservaPasseio.idReservaPasseio"><i class="fa"></i></label>
                <input type="radio" :id="'cm_star-3' + reservaPasseio.idReservaPasseio" value="3" :name="reservaPasseio.idReservaPasseio" v-model="reservaPasseio.passeio.usuario.notaProfissional"/>
                <label :for="'cm_star-4' + reservaPasseio.idReservaPasseio"><i class="fa"></i></label>
                <input type="radio" :id="'cm_star-4' + reservaPasseio.idReservaPasseio" value="4" :name="reservaPasseio.idReservaPasseio" v-model="reservaPasseio.passeio.usuario.notaProfissional"/>
                <label :for="'cm_star-5' + reservaPasseio.idReservaPasseio"><i class="fa"></i></label>
                <input type="radio" :id="'cm_star-5' + reservaPasseio.idReservaPasseio" value="5" :name="reservaPasseio.idReservaPasseio" v-model="reservaPasseio.passeio.usuario.notaProfissional"/>                
              </div>

              <textarea class="w-100 mb-2 p-1" placeholder="Deixe um comentário para o profissional..." rows="2" v-model="reservaPasseio.comentario"
                        :name="reservaPasseio.idReservaPasseio" @change="preencherComentario(reservaPasseio.comentario, reservaPasseio.passeio.usuario.idUsuario)"></textarea><br>              

              <button type="button" class="btn btn-success" @click="avaliarProfissional(reservaPasseio.passeio.usuario)">Avaliar Profissional</button>
            </div>         
            <ul class=" ml-4"> 
              <h5>Passeio</h5> 
              <hr class="m-2">           
              <li><b>Bairro:</b> {{reservaPasseio.passeio.bairro}}</li>
              <li><b>Cidade:</b> {{reservaPasseio.passeio.cidade}}</li>
              <li><b>Estado:</b> {{reservaPasseio.passeio.estado}}</li>
              <li><b>Frequencia diária:</b> {{reservaPasseio.passeio.frequenciaDiaria}}</li>
              <li><b>Preço da diaria:</b> {{reservaPasseio.passeio.precoMensal}}</li>              
              <button type="button" class="btn btn-danger mt-3" @click="deletarReservaPasseio(reservaPasseio.idReservaPasseio)">Encerrar serviço</button>
            </ul>            
          </div>
        </div>
      </div>
      <div class="row mt-3" v-else>
        <div class="naoTemos w-100 justify-center">
          <h4 class="center">Ainda não tem nenhum passeio cadastrado.</h4>
        </div>          
      </div>
      <br><br>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer';
import ApiUsuario from '@/services/ApiUsuario.js';
import MenuCliente from "@/components/MenuCliente"
import ApiReservaPasseio from '@/services/ApiReservaPasseio.js';
import ApiComentarios from '@/services/ApiComentarios.js';

export default {
  name: "MeusPasseios",
  components:{
    Footer, 
    MenuCliente
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
      },
      reservaPasseio:[{
        idReservaPasseio: "",
        passeio: "",
        cliente: "",
        pet: "", 
        tipoPagamento: "",
        comentario:""    
      }],
      comentarios:{
        idProfissional:"",
        idCliente:"",
        comentario: "",
        aprovadoAdm: true
      },
      
    }
    
  },

  mounted(){  
    ApiUsuario.retornaPorId(this.$route.params.idUsuario)
    .then(resp => {          
      this.usuario = resp.data

      this.reservaPasseio = ''
      
      ApiReservaPasseio.retornaPorCliente(this.usuario.idUsuario) 
      .then(resp1 =>{
        this.reservaPasseio = resp1.data
        
        this.reservaPasseio.forEach(r =>{
          r.passeio.usuario.notaProfissional = ''
          r.comentario = ''
        })

      })
      .catch(this.reservaPasseio = '')      
    })
  },

  methods:{
    deletarReservaPasseio(idReservaPasseio){
      if (confirm("Tem certeza que deseja encerrar o serviço?") == true) {
        ApiReservaPasseio.deletarReservaPasseio(idReservaPasseio) 
        .then(() =>{
          alert("Serviço encerrado com sucesso.")
          window.location.reload();
        })
        .catch(e => e.response.data.mensagem)
      }
    },

    avaliarProfissional(profissional){      
      if (confirm("Tem certeza que deseja avaliar o profissional com a nota " + profissional.notaProfissional + "?")) {
        ApiUsuario.avaliarProfissional(profissional.idUsuario, profissional)
        .then(() => {
            
          if (this.comentarios != '') {
            ApiComentarios.gravarComentario(this.comentarios)            
          }
          
          alert("Profissional avaliado com sucesso!")
          window.location.reload()
        })
        .catch(e => e.response.data.mensagem) 
      }
    },

    preencherComentario(value, idUsuario){
      if (value == '') {
        this.comentarios = ''
        
      } else {
        this.comentarios.idProfissional = idUsuario
        this.comentarios.idCliente = this.usuario.idUsuario
        this.comentarios.comentario = value     
      }
    }
  }
}
</script>

<style>

</style>