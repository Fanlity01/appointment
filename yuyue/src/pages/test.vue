<template>
  <div>
    <h2>User List</h2>
    <ul>
      <li v-for="user in users.data" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref ,reactive} from 'vue';
import axios from 'axios';
axios.defaults.withCredentials = true;
    const users = ref([]);
    axios.get('/admin/users').then((response) => {
        users.value = response.data;
        console.log(response.data);
      console.log(users.value);
    }).catch((error) => {
      console.error(error);
    });
    
  
</script>