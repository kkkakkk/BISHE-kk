<template>
  <div>
    <img class="profile" src="../../assets/obe/profile.png">
    <br>
    <br>

    <span class="person_text" id="person_type">{{this.identity_type}}</span>
    <br>
    <span class="person_text" id="person_name">{{this.$store.state.user_name}}</span>
    <br>
    <span class="person_text" id="person_id">{{this.$store.state.user_no}}</span>
    <br>
    <hr/>

  </div>
</template>

<script>
    export default {
        name: "Profile",
      data(){
          return{
            identity_type:''
          }
      },
      created() {
          let that=this;
          var type=that.$store.state.identity;
          if(type=='TA'){
            that.identity_type = '教务员';
          }else if(type=='TM'){
            that.identity_type = '教学主管';
          }else if(type=='TG'){
          that.identity_type = '教学评价组';
        }else if(type=='TS'){
            that.identity_type = '教学指导委员会';
          }else if(type=='RE'){
            that.identity_type = '评阅专家';
          }else if(type=='ST'){
            that.identity_type = '学生';
          }else if(type=='IT'){
            that.identity_type = '教师（校内）';
          }else if(type=='ET'){
            that.identity_type = '教师（校外授课）';
          }else if(type=='PT'){
            that.identity_type = '教师（校外实习）';
          }else{
            that.identity_type = '身份识别出错';
          }


      }
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
