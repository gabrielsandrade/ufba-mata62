<template>
  <v-data-table
    height="70vh"
    class="elevation-8"
    fixed-header
    :items="items"
    :headers="headers"
    v-model="selected"
    item-key="name"
    show-select
  >
    <template slot="items" slot-scope="props">
      <td>
        <v-checkbox v-model="props.selected"></v-checkbox>
      </td>
      <td class="text-xs-center">{{ props.item.name }}</td>
      <td class="text-xs-center">{{ props.item.cursos }}</td>
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
    };
  },
  created() {
    console.log(this.items);
  },
};
</script>
