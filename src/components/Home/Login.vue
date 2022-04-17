<template>
  <body>
  <el-container class="base">
    <el-aside  width="69px" />
    <el-container class="aside_right">
      <el-container class="aside_main">
        <el-container class="aside_title"><b>教学过程管理与评价</b></el-container>

        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login-container" label-position="left" label-width="auto">
          <i class="el-icon-user-solid"></i>
          <el-form-item label="账号" prop="username">
            <el-input type="text" v-model="loginForm.username"
                      auto-complete="off" placeholder="请输入账号" clearable></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password"
                      auto-complete="off" placeholder="请输入密码" show-password></el-input>
          </el-form-item>

          <el-form-item label="身份" prop='identity'>
            <el-select style="width: 100%" v-model="loginForm.identity" placeholder="请选择身份">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item style="width: 100%">
            <el-button type="primary" style="width: 100%;background: #3b6998;border: none" v-on:click="login">登录</el-button>
          </el-form-item>
        </el-form>
        <router-view/>
      </el-container>

    </el-container>
  </el-container>
  </body>
</template>


<script>

import axios from "axios";

export default {
  name: 'Login',
  data () {
    return {
      options: [{
        value: '学生',
        label: '学生'
      }, {
        value: '教师',
        label: '教师'
      }, {
        value: '教务员',
        label: '教务员'
      }, {
        value: '教学主管',
        label: '教学主管'
      }, {
        value: '课程评价组',
        label: '课程评价组'
      },{
        value: '评阅小组',
        label: '评阅小组'
      },{
        value: '教学指导委员会',
        label: '教学指导委员会'
      }],
      loginForm: {
        username: '',
        password: '',
        identity: ''
      },
      // 表单验证规则对象
      loginFormRules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        identity:[
          { required: true, message: '请选择身份',trigger: 'blur'}
        ]
      },

      // responseResult: [],

    }
  },
  methods: {
    login () {
      this.$refs.loginFormRef.validate(valid => {
        if (valid) {
          let that = this;
          axios.post("/auth/login",{
            params:{
              username: that.loginForm.username,
              password: that.loginForm.password,
              // identity: this.loginForm.identity,
            }
          }).then(function (response){
              console.log('登录',response.data);
              if((response.data.code=='000000')){
                var path='/AcademicStaff'
                let identity=that.loginForm.identity;
                if(identity=='教务员'){
                  path='/AcademicStaff';
                }else if(identity=='学生'){
                  path='/Student';
                }else if(identity=='教师'){
                  path='/Teacher';
                }else if(identity=='课程评价组'){
                  path='/CourseEvaluateStaff';
                }else if(identity=='教学主管'){
                  path='/ASManager';
                }else if(identity=='评阅小组'){
                  path='/TeachingEvaluateStaff';
                }else if(identity=='教学指导委员会'){
                  path='/GuidanceCommittee';
                } else{
                  alert('身份错误')
                }
                console.log(that.loginForm.identity)
                console.log(path)
                that.$router.replace({path: path})
              }
              else{alert('登录部分code或msg错误')}
            },
            function (err) {
              console.log("error");
              alert("请求失败");
            }
          );
        } else {
          console.log("未提交")
        }
      })
    },
    // judge(status,name){
    //   if(status == 0){
    //     let iden=this.loginForm.identity
    //     this.$store.commit('setIN',{
    //       no:this.loginForm.username,
    //       name:name,
    //       identity:iden
    //     })
    //     console.log(iden)
    //     //学生
    //     if(iden=="stu"){
    //       this.$router.push({
    //         path: '/StudentHome'
    //       })
    //       console.log("stuhome")
    //     }
    //     else if(iden=="eval"){
    //       this.$router.push({
    //         path: '/EvalHome'
    //       })
    //     }
    //     else if(iden=="comm"){
    //       this.$router.push({
    //         path: '/CommHome'
    //       })
    //     }
    //     else{
    //       this.$router.push({
    //         path: '/ManagerHome'
    //       })
    //     }
    //     return
    //   }
    //   else{
    //     this.$message.error({
    //       title: '错误',
    //       message: "用户名或密码错误！"
    //     });
    //   }
    // }
  }
}
</script>

<style scoped>

/*深蓝色底边1*/
.base {
  background-color: rgb(59, 105, 152);
  position: absolute;
  width:100%;
  height:auto;
  min-height: 100%;
  top:0%;
  left:50%;
  transform: translate(-50%);
}
/*白色右边2*/
.aside_right{
  border-radius: 5px;
  background-color:rgba(255, 255, 255, 255);
  margin-top:10px;
  margin-right:10px;
  margin-bottom: 10px;
}

/*浅蓝色右边3*/
.aside_main{
  border-radius: 5px;
  background-color: rgb(202, 214, 226);
  margin-top: 140px;
  margin-bottom: 140px;
  padding: 15px 10px 10px 10px;
}
/*标题*/
.aside_title {
  margin: auto auto auto 110px;
  color: #000000;
  font-size: 30px;
}

/*白色登录框4*/
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 70px 20px 65px auto;
  width: 330px;
  padding: 15px 120px 5px 120px;
  background: #e6ecf1;
  border: 1px solid #eaeaea;
  /*box-shadow: 0 0 25px #cac6c6;*/
}

/*登录图标icon*/
.el-icon-user-solid {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #194c83;
  font-size: 50px;
}
</style>
