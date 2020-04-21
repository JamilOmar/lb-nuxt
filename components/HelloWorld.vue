<template>
  <div>
    {{ message }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {ItemService} from '../services/item.service'
@Component
export default class HelloWorld extends Vue {
  itemService = new ItemService();
  created(){
      this.message = 'Hello world !' + this.itemService.addQty();
  } 
  message: string ='';
}
</script>
