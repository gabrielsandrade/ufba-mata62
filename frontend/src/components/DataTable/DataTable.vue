<template>
  <v-data-table
    height="70vh"
    class="data-table elevation-8"
    fixed-header
    :items="items"
    :headers="headers"
  >
    <!-- <template slot="items" slot-scope="props">
      <tr>
        <td class="text-xs-center" v-for="props.item" v-bind:key="teste" >{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.cursos }}</td>
      </tr>
    </template> -->
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "DataTable",
  props: ["items", "headers"],
  data: () => {
    return {
      selected: [],
      columns: [],
    };
  },
  created() {},
  methods: {
    rowSelected(row) {
      alert(
        `Você está editando a instituição ${row.name} que possui ${row.cursos} cursos`
      );
    },
    editItem(item) {
      console.log(item);
    },
    deleteItem(item) {
      console.log(item);
    },
    linhaPar(row, index) {
      console.log(row);
      console.log(index);
      return "teste";
    },
  },
  computed: {},
};
</script>

<style lang="css" scoped>
.data-table >>> tbody tr :hover {
  cursor: pointer;
}
.data-table >>> tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
