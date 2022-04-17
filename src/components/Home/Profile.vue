<template>
  <div>
    <img class="profile" src="../../assets/obe/profile.png">
    <br>
    <br>

    <span class="person_text" id="person_type">{{this.$store.state.identity}}</span>
    <br>
    <span class="person_text" id="person_name">xxxxxxxxxxx</span>
    <br>
    <span class="person_text" id="person_id">{{this.$store.state.username}}</span>
    <br>
    <hr/>

  </div>
</template>

<script>
    export default {
        name: "Profile"
    }
</script>

<style scoped>
  .profile{
    margin-top:35px;
    width: 60px;
    height: 60px;
  }
  .person_text{
    font-family:'Microsoft YaHei Regular', 'Microsoft YaHei';
    color: white;
    font-weight:400;
    font-style:normal;
    font-size:12px;
    text-align:center;
  }
</style>
