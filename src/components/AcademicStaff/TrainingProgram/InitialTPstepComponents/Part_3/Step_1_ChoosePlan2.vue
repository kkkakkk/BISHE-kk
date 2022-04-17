<!--
 * @Author: ZKT
 * @Date: 2022-03-30 21:54:38
 * @LastEditTime: 2022-04-12 18:05:09
 * @LastEditors: ZKT
 * @Description: 
 * @FilePath: /obe_front/src/components/AcademicStaff/TrainingProgram/InitialTPstepComponents/Part_3/Step_1_ChoosePlan2.vue
 * @AuthorEmail: zoukt@foxmail.com
-->

<template>
  <div class="step_3.1" v-show="active === 0">
    <h4 text-align="center">选择专业和年份</h4>
    <!-- <p>{{ major_list_backEnd }}</p> -->
    <el-divider style="height: 6px"></el-divider>

    <el-select
      v-model="tableData.major"
      placeholder="专业"
      @change="majorSelect"
    >
      <el-option
        v-for="item in major_name_list"
        :key="item.value"
        :label="item.label"
        :value="item.label"
      >
      </el-option>
    </el-select>

    <el-select
      v-model="tableData.year"
      placeholder="年份"
      :disabled="yearDisabled"
    >
      <el-option
        v-for="(item, index) in this.year_list"
        :key="index"
        :label="item.year"
        :value="item.year"
      >
      </el-option>
    </el-select>

    <el-select
      v-model="tableData.term"
      placeholder="学期"
      :disabled="termDisabled"
    >
      <el-option
        v-for="item in [
          { value: '1', label: '第一学期' },
          { value: '2', label: '第二学期' },
          { value: '3', label: '第三学期' },
          { value: '4', label: '第四学期' },
          { value: '5', label: '第五学期' },
          { value: '6', label: '第六学期' },
          { value: '7', label: '第七学期' },
          { value: '8', label: '第八学期' },
          { value: '9', label: '第九学期' },
          { value: '10', label: '第十学期' }
        ]"
        :key="item.value"
        :label="item.label"
        :value="item.label"
      >
      </el-option>
    </el-select>

    <br />
    <br />

    <el-button class="nextButton" @click="clickNext">下一步</el-button>
    <br />
    <br />
  </div>
</template>

<script>
export default {
  name: "Step_1_ChoosePlan2",
  props: ["active", "next", "major_name_list", "major_list_backEnd"],

  data() {
    return {
      tableData: {
        major: "",
        year: "",
        term: ""
      },
      yearDisabled: true,
      termDisabled: true,
      year_list: []
    };
  },
  methods: {
    clickNext() {
      this.$emit("next", this.tableData);
    },
    majorSelect() {
      this.yearDisabled = false;
      this.termDisabled = false;
      for (var i = 0; i < this.major_list_backEnd.length; i++) {
        if (this.tableData.major === this.major_list_backEnd[i].major_name) {
          this.year_list = this.major_list_backEnd[i].year_list;
        }
      }
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
