<!--
 * @Author: ZKT
 * @Date: 2022-03-25 21:39:05
 * @LastEditTime: 2022-03-31 00:30:54
 * @LastEditors: ZKT
 * @Description: 目前仅用于调度三个父组件
 * @FilePath: /obe_front/src/components/AcademicStaff/TrainingProgram/_InitialTPstep.vue
 * @AuthorEmail: zoukt@foxmail.com
-->


<template>

  <div>
    <el-button type="primary"
               @click="jumpToPage('/AcademicStaff/TrainingProgram/InitialTPstepComponents/Part_1/FatherStep_1')">Part One
    </el-button>
    <el-button type="primary"
               @click="jumpToPage('/AcademicStaff/TrainingProgram/InitialTPstepComponents/Part_2/FatherStep_2')">Part Two
    </el-button>
    <el-button type="primary"
               @click="jumpToPage('/AcademicStaff/TrainingProgram/InitialTPstepComponents/Part_3/FatherStep_3')">Part Three
    </el-button>

  </div>

</template>

<script>

  export default {
    name: "InitialTPstep",

    data() {
      return {

      };
    },

    methods: {


      /**
       * @description: 给三个按钮跳转到对应页面
       * @param {*} path
       * @return {*}
       */
      jumpToPage(path){
        this.$router.push({
              path: path
            })
      }

    }

  }
</script>

<style scoped>
  .stepBox {
    border: 3px solid rgba(163, 183, 206);
    border-radius: 10px;
    padding:0 30px
  }

  .nextButton {
    margin-top: 12px;
    background: rgba(149, 0, 3);
    color: white;
    margin-bottom: 10px;
    margin-left: 85%;
  }
</style>
