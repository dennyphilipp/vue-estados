<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label>URL Api</label>
            <input type="text" class="form-control" v-model="url">
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label>Estados</label>
            <select v-model="estadoSelecionado" class="form-control" required>
              <option selected value>Selecione...</option>
              <option
                v-for="estado in estados"
                v-bind:key="estado.id"
                v-bind:value="estado.sigla"
              >{{ estado.nome }}</option>
            </select>
          </div>
        </div>
        <div class="col" v-if="estadoSelecionado">
          <a class="btn btn-success" target="_blank" :href="url+'app/api/cidade/gerar-pdf/' + estadoSelecionado">Gerar PDF</a>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <b-table
            :hover="true"
            responsive
            :items="cidades"
            :fields="colunas"
            :current-page="pagina"
            striped
            :per-page="10"
            show-empty
            empty-text="Nenhuma cidade encontrada."
          >
            <template v-slot:empty="scope">
              <h4>{{ scope.emptyText }}</h4>
            </template>
          </b-table>
          <b-pagination v-model="pagina" :total-rows="totalCidades" :per-page="10"></b-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      url: "http://localhost:8080/",
      estados: [],
      estadoSelecionado: "",
      cidades: [],
      totalCidades: 0,
      pagina: 1,
      total: 0,
      itensPorPagina: 0,
      colunas: [
        { key: "siglaEstado", label: "Estado", sortable: true },
        { key: "regiaoNome", label: "Região", sortable: true },
        { key: "nomeCidade", label: "Cidade", sortable: true },
        { key: "nomeMesorregiao", label: "Mesorregião", sortable: true },
        { key: "nomeFormatado", label: "Formatado", sortable: true }
      ]
    };
  },
  mounted() {
    this.CarregarEstados();
  },
  watch: {
    estadoSelecionado: function (val) {
      if (val) this.CarregarCidades(val);
    }
  },
  methods: {
   
    CarregarCidades(estado) {
      this.$http({
        url: this.url +  "app/api/cidade/obter-por-estado/" + estado,
        method: "GET"
      })
        .then((response) => {
          this.pagina = 1;
          this.cidades = response.data;
          this.totalCidades = response.data.length;
        })
        .catch((erro) => {
          console.error("Erro: ", erro);
        });
    },
    CarregarEstados() {
      this.$http({
        url: this.url +  "app/api/estado/obter-todos",
        method: "GET"
      })
        .then((response) => {
          this.estados = response.data;
        })
        .catch((erro) => {
          console.error("Erro: ", erro);
        });
    }
  }
};
</script>

<style lang="scss">
</style>
