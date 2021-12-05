<template>
  <v-card flat>
    <v-card outlined>
      <v-expansion-panels inset flat v-model="expansion">
        <v-expansion-panel>
          <v-expansion-panel-header> Filter </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-text-field
              dense
              outlined
              v-model="options.search"
              label="Search"
              single-line
              prepend-icon="mdi-magnify"
            ></v-text-field>
            <v-autocomplete
              prepend-icon="mdi-magnify"
              v-model="selectiveHeaders"
              :items="headers"
              dense
              outlined
              multiple
              small-chips
              deletable-chips
              label="Select Columns"
            ></v-autocomplete>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
    <v-card outlined class="mt-4 pa-2">
      <v-data-table
        flat
        :headers="filteredHeaders"
        :items="items"
        :options.sync="options"
        :loading="$fetchState.pending"
        :search="options.search"
        :server-items-length="options.totalItem"
      >
        <template v-slot:[`item.name`]="{ item }">
          <UsernameDisplay :user="item.user" />
        </template>
      </v-data-table>
    </v-card>
  </v-card>
</template>
<script>
import UsernameDisplay from "@/components/UsernameDisplay";

export default {
  components: {
    UsernameDisplay,
  },
  data() {
    return {
      expansion: null,
      items: [], // improvement tip - move to vuex layer
      selectiveHeaders: [],
      options: {
        search: "",
        totalItem: 1000,
      },
    };
  },

  async fetch() {
    let baseURL = "http://localhost:3000/";
    // improvement tip - move to service layer
    const response = await fetch(
      `${baseURL}api/sales?page=${this.options.page}&per_page=${this.options.itemsPerPage}&search=${this.options.search}`
    );
    const result = await response.json();

    this.items = result.data;
    this.options.totalItem = result.query.total;
  },

  async mounted() {
    // loading all the possible headers, on mount
    this.headers.forEach((ele) => {
      this.selectiveHeaders.push(ele.value);
    });
  },
  computed: {
    // filtered headers
    filteredHeaders() {
      return this.headers.filter((ele) => {
        return this.selectiveHeaders.includes(ele.value);
      });
    },
    // table headers
    headers() {
      return [
        { text: "Name", value: "name", sortable: false },
        { text: "Email", value: "email", sortable: true },
        { text: "Gender", value: "gender", sortable: false },
        { text: "Year", value: "year", sortable: false },
        { text: "Sales", value: "sales", sortable: false },
        { text: "Country", value: "country", sortable: false },
      ];
    },
  },

  watch: {
    // fetches data when options object gets populated
    options() {
      this.$fetch();
    },
  },
};
</script>
