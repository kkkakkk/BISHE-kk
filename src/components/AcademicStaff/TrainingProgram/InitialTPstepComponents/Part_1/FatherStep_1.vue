<!--
 * @Author: ZKT
 * @Date: 2022-03-30 14:44:08
 * @LastEditTime: 2022-04-13 23:45:37
 * @LastEditors: ZKT
 * @Description: 作为步骤一、步骤二、步骤三的父组件：输入培养目标+输入毕业要求+设置毕业要求与培养目标的支撑关系
 * @FilePath: /obe_front/src/components/AcademicStaff/TrainingProgram/InitialTPstepComponents/Part_1/FatherStep_1.vue
 * @AuthorEmail: zoukt@foxmail.com
-->

<template>
  <div class="main_container">
    <el-container>
      <el-header style="height:40px" class="as_title">
        教学计划设置｜培养目标与毕业要求设置
        <hr />
      </el-header>

      <div class="main_content">
        <el-steps
          :space="300"
          :active="active"
          finish-status="success"
          class="stepHeader"
          align-center
        >
          <el-step title="输入培养目标"></el-step>
          <el-step title="输入毕业要求"></el-step>
          <el-step title="设置毕业要求与培养目标的支撑关系"></el-step>
        </el-steps>
        <!-- <p>{{ allData }}</p> -->
        <el-button @click="returnPage" class="returnButton" v-show="active > 0"
          >返回
        </el-button>
        <div class="stepBox">
          <Step_1_AddEducationTargets
            :active="active"
            @next="next"
          ></Step_1_AddEducationTargets>
          <Step_2_AddGraduationRequirements
            :active="active"
            @next="next"
          ></Step_2_AddGraduationRequirements>
          <Step_3_AddSupport
            :active="active"
            :dynamicColumnsOfStepThree="dynamicColumnsOfStepThree"
            @next="next"
          ></Step_3_AddSupport>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import Step_1_AddEducationTargets from "./Step_1_AddEducationTargets.vue";
import Step_2_AddGraduationRequirements from "./Step_2_AddGraduationRequirements.vue";
import Step_3_AddSupport from "./Step_3_AddSupport.vue";

export default {
  name: "FatherStep_1",
  components: {
    Step_1_AddEducationTargets,
    Step_2_AddGraduationRequirements,
    Step_3_AddSupport
  },
  data() {
    return {
      active: 0,
      dataTempOne: [],
      dynamicColumnsOfStepThree: [],
      dataTempTwo: [],
      dynamicTableDataOfStepFive: [],
      course_support: [],
      dataTempFour: [],
      course_name_five: []
    };
  },
  methods: {
    /**
     * @description:
     * @param {*} data
     * @return {*}
     */
    next(data) {
      if (this.active === 0) {
        this.dataTempOne = data;
        if (
          this.dynamicColumnsOfStepThree.length !==
          this.dataTempOne.training_subobjectives.length
        ) {
          for (
            var i = 0;
            i < this.dataTempOne.training_subobjectives.length;
            i++
          ) {
            this.dynamicColumnsOfStepThree.push({
              prop: "",
              label: "",
              checkboxValue: []
            });
          }
          for (var i = 0; i < this.dynamicColumnsOfStepThree.length; i++) {
            this.dynamicColumnsOfStepThree[i].label = "子目标" + (i + 1);
          }
        }
      }
      if (this.active === 1) {
        this.dataTempTwo = data.graduation_requirement_list;
        for (var a = 0; a < 12; a++) {
          for (
            var b = 0;
            b < this.dataTempTwo[a].graduation_subrequirement.length;
            b++
          ) {
            this.dynamicTableDataOfStepFive.push({
              scoreIndex:
                this.dataTempTwo[a].graduation_requirement_no +
                "-" +
                this.dataTempTwo[a].graduation_subrequirement[b]
                  .graduation_subrequirement_no
            });
            this.course_support.push({
              support: []
            });
          }
        }
      }
      // if(this.active===3)
      // {
      //   this.dataTempFour=data;

      //   for(var i=0;i<this.dataTempFour.length;i++)
      //   {
      //     this.course_name_five.push({
      //       value:i.toString(),
      //       label:this.dataTempFour[i].courseName,
      //     });
      //   }

      // }

      if (this.active < 3) this.active++;
      this.allData = { ...this.allData, ...data };
      console.log("test-fromData", this.allData);

      if (this.active === 3) {
        //promise
        //路径，数据
        this.$axios
          .post("/data_init/training_program", this.allData)
          .then(data => {
            console.log("data", data);
            this.$router.push(
              "/AcademicStaff/TrainingProgram/InitialTrainingProgram"
            );
          });
      }
    },
    returnPage(data) {
      this.active--;
    }
  }
};
</script>

<style scoped>
.main_container {
  width: 100%;
  height: 100%;
  /* background-color: rgba(255, 255, 255, 0.847058823529412); */
}
.as_title {
  /*height:40px;*/
  text-align: left;
  font-weight: bold;
  font-size: 16px;
  font-family: "Microsoft YaHei Regular", "Microsoft YaHei";
}
hr {
  height: 1px;
  background: black;
  border: none;
}
.main_content {
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.847058823529412);
  margin-top: 0px;
  margin-bottom: 0px;
  height: 100%;
  width: 100%;
  text-align: left;
}
.stepBox {
  border: 3px solid rgba(163, 183, 206);
  border-radius: 10px;
  margin: 0 30px 30px;
  padding: 20px 30px;
}
.returnButton {
  margin-left: 85%;
}
.nextButton {
  margin-top: 12px;
  background: rgba(149, 0, 3);
  color: white;
  margin-bottom: 10px;
  margin-left: 85%;
}
.stepHeader {
  height: 100px;
}
/deep/ .el-step {
  height: 50px;
  flex-basis: 200px;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  /* background: red; */
}
</style>
