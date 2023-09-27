<template>
  <div class="flex justify-center items-center mt-10">
    <!-- if (loading) Loading... -->
    <div v-if="loading">Loading...</div>
    
    <!-- if (error) show error -->
    <div v-if="error">{{ error.message }}</div>
    
    <!-- if (results) render -->
    <table class="w-11/12 border-collapse" v-if="result && result.characters && result.characters.results">
      <thead>
        <tr>
          <th class="border-b-stone-900 border">ID</th>
          <th class="border-b-stone-900 border">Name</th>
          <th class="border-b-stone-900 border">Status</th>
          <th class="border-b-stone-900 border">Spacies</th>
          <th class="border-b-stone-900 border">Type</th>
          <th class="border-b-stone-900 border">Gender</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="character in characters" :key="character.id">
          <td class="border-b-stone-900 border">{{ character.id }}</td>
          <td class="border-b-stone-900 border">{{ character.name }}</td>
          <td class="border-b-stone-900 border">{{ character.status }}</td>
          <td class="border-b-stone-900 border">{{ character.species }}</td>
          <td class="border-b-stone-900 border">{{ character.type }}</td>
          <td class="border-b-stone-900 border">{{ character.gender }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script lang="ts">
import { defineComponent, computed, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

// Types 
import { Character } from './types/index';

export default defineComponent({
  name: 'App', 
  props: {

  },
  setup(){

    const { result, loading, error } = useQuery(gql`
      query getCharacters {
      characters (filter: {species: value}){
      results{
      id 
      name
      status
      species
      type
      gender
    }
  }
  }
`);

    watch(result, (newVal) => {console.log(newVal);}, {immediate: true});

    
    const characters = computed<Character[]>(() => result.value.characters.results || []);
  
    return {
      result,
      characters,
      loading, 
      error
    };
  }
});
     

</script>


