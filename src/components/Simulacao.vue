<template>
<v-content>
  <v-container>
    <h1 class="d-flex justify-center subheading grey--text">Simulador de Parcelas</h1>
    <v-card class="py-6 px-6">
     <v-flex xs12 sm12 md12 lg12 xl12 class="d-flex">
      <v-text-field
        v-model="fields.parcela"
        filled
        label="Quantidade de Parcelas"
        class="mr-4"
      ></v-text-field>
      <v-text-field
        v-model="fields.valorParcela"
        filled
        label="Valor da Parcela"
        class="mr-4"
      ></v-text-field>
      <v-text-field
        v-model="fields.igcm"
        filled
        label="IGCM %"
      ></v-text-field>
    </v-flex>
  <v-flex xs12 sm12 md12 lg12 xl12 class="d-flex">
  <v-text-field
    v-model="fields.custoTerreno"
    filled
    label="Custo Terreno"
    class="mr-4"
  ></v-text-field>
  <v-text-field
    v-model="fields.despesaTerreno"
    filled
    class="mr-4"
    label="Despesa Terreno"
  ></v-text-field>
  <v-text-field
    v-model="fields.impostos"
    filled
    label="Impostos do Terreno"
  ></v-text-field>
</v-flex>
    <v-btn class="yellow" @click="simular()">SIMULAR</v-btn>
    </v-card>
    <v-card class="my-10 py-10 px-10">
      <div class="d-flex">
     <v-flex xs12 sm12 md12 lg6 xl6 >
      <h1>VALOR BRUTO:  <span class="blue--text">  {{ total }}</span> </h1>
      <h1>VALOR LIQUIDO:  <span class="green--text">  {{ liquido }}</span> </h1>
      <h1>VALOR CONTADOR:  <span class="red--text">  {{ contador }}</span> </h1>
      <h1>VALOR DESPESA:  <span class="red--text">  {{ despesa }}</span> </h1>
      <h1>VALOR IMPOSTOS:  <span class="red--text">  {{ impostos }}</span> </h1>
      </v-flex>
     <v-flex xs12 sm12 md12 lg6 xl6 >
      <h1>VALOR LIQUIDO - DESCONTOS:  <span class="green--text">  {{ totalLiquido }}</span> </h1>
      <h1>VALOR DESPESA + CONTADOR + IMPOSTOS:  <span class="red--text">  {{ totalDescontos }}</span> </h1>
      </v-flex>
    </div>
    </v-card>
    <div>
      <chartjs-doughnut :labels="labels" :datasets="datasets" :option="option"></chartjs-doughnut>
    </div>
  </v-container>
</v-content>
  
</template>

<script>
export default {
  data() {
    return {
      fields: {},
      total: 0,
      liquido: 0,
      contador: 0,
      despesa: 0,
      impostos: 0,
      totalDescontos: 0,
      totalLiquido: 0,
      labels: ["VALOR LIQUIDO - DESCONTOS", "VALOR BRUTO", "VALOR DESPESA + CONTADOR + IMPOSTOS", "atualizar"],
      datasets: [
        {
          data: [1, 1, 1],
          backgroundColor: ["green", "yellow", "red"]
        }
      ],
      option: {
        title: {
          display: true,
          position: "bottom",
          text: "Simulacao"
        }
      }
    };
  },
  methods: {
    simular(){
      if(this.fields.parcela === undefined || this.fields.valorParcela === undefined || this.fields.igcm === undefined || this.fields.custoTerreno === undefined || this.fields.despesaTerreno === undefined ||
      this.fields.impostos === undefined){
        confirm("VALORES INVALIDOS")
      }else {
      var igcm = parseInt(this.fields.igcm) + 100
      var valor = parseInt(this.fields.valorParcela)
      var total = 0
      var parcela = this.fields.parcela / 12
      var impostos = 0
      var totalDescontos = 0
      var totalLiquido = 0
      for (let i = 0; i < parcela - 1; i++) {
        for (let j = 0; j < 12; j++) {
          total += ( valor * igcm) / 100
          
        }
        valor = ( valor * igcm) / 100
      }
    impostos = parseFloat(this.fields.impostos) * parcela
    this.impostos = impostos.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

    var soma
    soma = this.fields.valorParcela * 12 + total
    this.total = soma.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

    this.liquido = (soma * 90 / 100).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

    this.contador = (soma * 10 / 100).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

    this.despesa = (parseFloat(this.fields.custoTerreno) + parseFloat(this.fields.despesaTerreno)).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

    totalDescontos  =  (soma * 10 / 100) + parseFloat(this.fields.custoTerreno) + parseFloat(this.fields.despesaTerreno) + impostos

    this.totalDescontos = totalDescontos.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

    totalLiquido = (soma * 90 / 100) - totalDescontos

    this.totalLiquido = totalLiquido.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

    // GRAFICO

    this.datasets[0].data.pop()
    this.datasets[0].data.pop()
    this.datasets[0].data.pop()
    this.datasets[0].data.push(totalLiquido)
    this.datasets[0].data.push(soma)
    this.datasets[0].data.push(totalDescontos)
    

        }

    }


  }
};
</script>

<style>
</style>