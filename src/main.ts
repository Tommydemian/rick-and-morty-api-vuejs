import './style.css';
import App from './App.vue';
import { createApp, provide, h } from 'vue';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { apolloClient } from './client';

const app = createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});


app.mount('#app');