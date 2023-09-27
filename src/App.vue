<template>
  <div class="mt-10 px-20">
    <!-- if (loading) Loading... -->
    <div v-if="loading">Loading...</div>
    
    <!-- if (error) show error -->
    <div v-if="error">{{ error.message }}</div>
    
    <!-- if (results) render -->
    <table class="w-full border-collapse" v-if="result && result.characters && result.characters.results">
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
    <div class="flex justify-between">
      <button @click="handlePrevPage" class="bg-red-200 px-4 py-2 mt-2 rounded-md cursor-pointer hover:bg-red-400 capitalize ">previous page</button>
      <button class="bg-amber-300 px-4 py-2 mt-2 rounded-md cursor-auto capitalize">current page: {{ pageNumber }}</button>
      <button @click="handleNextPage" class="bg-red-200 px-4 py-2 mt-2 rounded-md cursor-pointer hover:bg-red-400 capitalize">next page</button>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, computed, ref, Ref } from 'vue';
import { useFetchData } from './composables/useFetchCharacters';
// Types 
import { Character, Species } from './types/index';

export default defineComponent({
  name: 'App', 
  props: {

  },
  setup(){

    // dinamic filter value
    const filterBy: Ref<Species> = ref(Species.human); 
    
    // dinamic page value
    const pageNumber = ref(1);
    
    const handlePrevPage = () => {
      pageNumber.value > 1 ? pageNumber.value -= 1 : null; 
    };

    const handleNextPage = () => {
      // if result is empty meaning no characters STOP going forward
      if (characters.value.length > 0) {
        pageNumber.value += 1;
      }
    };

    // useFetchCharacters
    const { result, error, loading } = useFetchData({page: pageNumber, filterVal: filterBy});
    const characters = computed<Character[]>(() => result.value.characters.results || []);

    return {
      result,
      characters,
      loading, 
      error,
      handlePrevPage,
      handleNextPage,
      pageNumber
    };
  }
});
     

</script>


