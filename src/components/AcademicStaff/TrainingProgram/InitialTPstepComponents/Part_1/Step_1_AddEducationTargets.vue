<!--
 * @Author: ZKT
 * @Date: 2022-03-25 21:27:33
 * @LastEditTime: 2022-04-14 00:09:19
 * @LastEditors: ZKT
 * @Description: 添加培养目标
 * @FilePath: /obe_front/src/components/AcademicStaff/TrainingProgram/InitialTPstepComponents/Part_1/Step_1_AddEducationTargets.vue
 * @AuthorEmail: zoukt@foxmail.com
-->

<template>
  <div class="step_1.1" v-show="active === 0">
    <br />
    <div class="main_content">
      <h4 style="margin:10px;text-align:center;">添加培养目标</h4>
      <!--    <p>{{ formData }}</p>-->
      <el-divider></el-divider>

      <el-form
        class="form"
        v-model="formData"
        label-position="left"
        label-width="100px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="适用年份" required>
              <el-date-picker
                v-model="formData.grade"
                type="year"
                placeholder="选择年份"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="适用专业" prop="major">
              <el-input v-model="formData.major"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="20">
            <el-form-item prop="training_objective" label="培养目标">
              <el-input
                type="textarea"
                :rows="3"
                v-model="formData.training_objective"
                placeholder="请输入培养目标"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <h4 style="text-align:left ">
            培养子目标
          </h4>
        </el-row>

        <el-row>
          <el-form-item
            v-for="(item, index) in formData.training_subobjectives"
            :label="'子目标' + (index + 1)"
            :key="index"
            :prop="item.training_subobjective_content"
            :rules="{
              required: true,
              message: '子目标不能为空',
              trigger: 'blur'
            }"
            class="item"
          >
            <el-col :span="17">
              <el-input v-model="item.training_subobjective_content"></el-input>
            </el-col>
            <el-col :span="5">
              <el-button
                style="background:rgba(160,181,203);color:white"
                @click.prevent="removeDomain(item)"
                >删除</el-button
              >
            </el-col>
          </el-form-item>
        </el-row>
      </el-form>

      <el-button
        @click="addDomain"
        icon="el-icon-plus"
        style="margin-left:110px;background:rgba(160,181,203);color:white"
      >
        添加培养子目标
      </el-button>
      <br />
      <br />
      <el-button class="nextButton" @click="clickNext">下一步 </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Step_1_AddEducationTargets",
  props: ["active", "next"],

  created() {
    console.log("formData", this.formData, this.active);
  },
  data() {
    return {
      formData: {
        training_objective: "", //api
        grade: "", //api
        major: "", //api
        training_subobjectives: [
          {
            training_subobjective_content: "",
            training_subobjective_no: "1"
          }
        ] //api
      }
    };
  },
  methods: {
    addDomain() {
      this.formData.training_subobjectives.push({
        training_subobjective_content: "",
        training_subobjective_no: ""
      });

      for (var i = 0; i < this.formData.training_subobjectives.length; i++) {
        var temp = i + 1;
        this.formData.training_subobjectives[
          i
        ].training_subobjective_no = temp.toString();
      }
      // console.log('test', this.formData)
    },

    removeDomain(item) {
      var index = this.formData.training_subobjectives.indexOf(item);
      if (this.formData.training_subobjectives.length > 1) {
        if (index !== -1) {
          this.formData.training_subobjectives.splice(index, 1);
        }
      }

      for (var i = 0; i < this.formData.training_subobjectives.length; i++) {
        var temp = i + 1;
        this.formData.training_subobjectives[
          i
        ].training_subobjective_no = temp.toString();
      }

      // console.log('test', this.formData)
    },
    clickNext() {
      this.$emit("next", this.formData);
    }
  }
};
</script>

<style scoped>
.main_content {
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.847058823529412);
  margin-top: 0px;
  margin-bottom: 0px;
  height: 100%;
  width: 100%;
  text-align: left;
  padding: 10px;
  color: #1d344f;
}
.demo-ruleForm > div:nth-child(1) {
  flex-basis: 400px;
}
.childTarget {
  display: inline-block;
}
.demo-ruleForm > div:nth-child(2) {
  flex-basis: 400px;
}
.form {
  margin: 0 10px;
}
.nextButton {
  margin-top: 12px;
  background: rgba(149, 0, 3);
  color: white;
  margin-bottom: 10px;
  margin-left: 85%;
}
</style>
