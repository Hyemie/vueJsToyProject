<template>
  <div id="app">
    <MemoHeader></MemoHeader>
    <MemoBody></MemoBody>
  </div>
</template>

<script>
import MemoHeader from './components/MemoHeader.vue';
import MemoBody from './components/MemoBody.vue';

export default {
  name: 'app',
  components: {
    MemoHeader,
    MemoBody
  }
}
</script>

<style>
body {
    text-align: center;
    background-color: #F6F6F6;
  }
  input {
    border-style: groove;
    width: 200px;
  }
  button{
    border-style: groove;
  }
  .shadow{
    box-shadow: 5px 10px 10px rgba(0,0,0,0.03);
  }
</style>
