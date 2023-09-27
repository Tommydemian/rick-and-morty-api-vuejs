/**
 * Custom composable for GraphQL fetch.
 *
 * @param {number} page - Page number.
 * @param {string} filterVal - filter value string.
 * 
 * @returns An array of results from the getCharacters query
 */

import { reactive, watch, Ref } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

type UseFetchDataParams = {
    page: Ref<number>, 
    filterVal: Ref<string>,
}

export const useFetchData = ({ page, filterVal }: UseFetchDataParams) => {

  const variables = reactive({
    page: page.value,
    filter: filterVal.value 
  });
      
  const { result, loading, error, refetch } = useQuery(gql`
          query getCharacters ($page: Int, $filter: String ) {
          characters (page: $page, filter: {species: $filter}){
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
      `, variables, {
    fetchPolicy: 'cache-and-network'
  });

  // Watch for changes in page and filterVal and update variables accordingly
  watch(page, newVal => {
    variables.page = newVal;
  });
  
  watch(filterVal, newVal => {
    variables.filter = newVal;
  });
    
  return { result, loading, error, refetch };

};

