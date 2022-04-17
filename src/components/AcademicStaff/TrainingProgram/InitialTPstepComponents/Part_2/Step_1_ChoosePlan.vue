<!--
 * @Author: ZKT
 * @Date: 2022-03-30 21:47:30
 * @LastEditTime: 2022-04-11 04:45:43
 * @LastEditors: ZKT
 * @Description: 
 * @FilePath: /obe_front/src/components/AcademicStaff/TrainingProgram/InitialTPstepComponents/Part_2/Step_1_ChoosePlan.vue
 * @AuthorEmail: zoukt@foxmail.com
-->
<template>
  <div class="step_2.1"
       v-show="active === 0">

    <h4 text-align="center">选择专业和年份</h4>

    <el-divider style="height: 6px"></el-divider>

    <el-select v-model="tableData.major"
               placeholder="专业">
      <el-option v-for="item in [
                { value: '1', label: '软件工程' },
                { value: '2', label: '计算机' }
              ]"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
      </el-option>
    </el-select>

    <el-select v-model="tableData.year"
               placeholder="年份">
      <el-option v-for="item in [
                { value: '1', label: '2022' },
                { value: '2', label: '2023' }
              ]"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
      </el-option>
    </el-select>

    <br>
    <br>

    <el-button class="nextButton"
               @click="clickNext">下一步</el-button>
    <br>
    <br>

  </div>
</template>

<script>
export default {
  name: "Step_1_ChoosePlan",
  props: ["active", "next"],

  data () {
    return {
      tableData: {
        major: '',
        year: ''
      },

    };
  },
  methods: {
    clickNext () {
      this.$emit("next", this.tableData);
    }
  }
};
</script>

<style scoped>
.nextButton {
  margin-top: 12px;
  background: rgba(149, 0, 3);
  color: white;
  margin-bottom: 10px;
  margin-left: 85%;
}
</style>
