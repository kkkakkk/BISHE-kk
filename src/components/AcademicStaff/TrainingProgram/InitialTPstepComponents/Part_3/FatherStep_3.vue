<!--
 * @Author: ZKT
 * @Date: 2022-03-30 14:44:43
 * @LastEditTime: 2022-04-14 05:08:12
 * @LastEditors: ZKT
 * @Description: 作为步骤六的父组件：设置班级
 * @FilePath: /obe_front/src/components/AcademicStaff/TrainingProgram/InitialTPstepComponents/Part_3/FatherStep_3.vue
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
          align-center
          class="stepHeader"
        >
          <el-step title="选择专业和年份"></el-step>
          <el-step title="确定课程信息"></el-step>
          <el-step title="设置班级信息"></el-step>
        </el-steps>
        <!-- <p>{{ dataFromStep1 }}</p> -->

        <el-button @click="returnPage" class="returnButton" v-show="active > 0"
          >返回
        </el-button>
        <div class="stepBox">
          <Step_1_ChoosePlan2
            :active="active"
            @next="next"
            :major_name_list="major_name_list"
            :major_list_backEnd="major_list_backEnd"
          ></Step_1_ChoosePlan2>

          <Step_2_CheckClassInfo
            :active="active"
            @next="next"
            :graduationRequirementToStepTwo="graduationRequirementToStepTwo"
            :graduationRequirementContent="graduationRequirementContent"
            :curriculum_list_backEnd="curriculum_list_backEnd"
          ></Step_2_CheckClassInfo>

          <Step_3_AddClassesInfo
            :active="active"
            :term="term"
            :tableData="tableDataOfStepTwo"
            @next="next"
          ></Step_3_AddClassesInfo>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import Step_1_ChoosePlan2 from "./Step_1_ChoosePlan2.vue";
import Step_2_CheckClassInfo from "./Step_2_CheckClassInfo";
import Step_3_AddClassesInfo from "./Step_3_AddClassesInfo.vue";

export default {
  name: "FatherStep_3",
  components: {
    Step_3_AddClassesInfo,
    Step_1_ChoosePlan2,
    Step_2_CheckClassInfo
  },

  data() {
    return {
      active: 0,
      term: "",
      dataFromStep1: { major: "", year: "", term: "" },
      major_name_list: [], //专业名称列表
      major_list_backEnd: [], //整个专业列表
      getTrainingProgramIDFormBackEnd: {}, //获取历史培养方案ID
      teacher_list_backEnd: {}, //教师列表
      curriculum_list_backEnd: [], //大课列表
      trainingProgramFromBackEnd: {}, //获取对应ID的培养方案
      trainingObjectId: "", //培养方案ID
      curriculum_support_graduation_subrequirement_list_BackEnd: [], //课程与毕业要求分指标支撑列表
      graduation_requirement_list_BackEnd: [], //毕业要求与毕业要求分指标列表

      graduationRequirementContent: [
        {
          content: "test"
        },
        {
          content: "test"
        },
        {
          content: "test"
        },
        {
          content: "test"
        },
        {
          content: "test"
        },
        {
          content: "test"
        },
        {
          content: "test"
        },
        {
          content: "test"
        },
        {
          content: "test"
        },
        {
          content: "test"
        },
        {
          content: "test"
        },
        {
          content: "test"
        }
      ],
      graduationRequirementToStepTwo: [],
      // graduationRequirementToStepTwo: [
      //   { scoreIndex: "1-1" },
      //   { scoreIndex: "2-1" },
      //   { scoreIndex: "3-1" },
      //   { scoreIndex: "4-1" },
      //   { scoreIndex: "5-1" },
      //   { scoreIndex: "6-1" },
      //   { scoreIndex: "7-1" },
      //   { scoreIndex: "8-1" },
      //   { scoreIndex: "9-1" },
      //   { scoreIndex: "10-1" },
      //   { scoreIndex: "11-1" },
      //   { scoreIndex: "12-1" }
      // ],

      tableDataOfStepTwo: [
        {
          courseName: "数据结构",
          courseIndex: "1",
          courseTerm: "",
          startDate: "",
          endDate: "",
          teacherName: ""
        },
        {
          courseName: "算法设计",
          courseIndex: "1",
          courseTerm: "",
          startDate: "",
          endDate: "",
          teacherName: ""
        },
        {
          courseName: "操作系统",
          courseIndex: "1",
          courseTerm: "",
          startDate: "",
          endDate: "",
          teacherName: ""
        },
        {
          courseName: "计算机网络",
          courseIndex: "1",
          courseTerm: "",
          startDate: "",
          endDate: "",
          teacherName: ""
        }
      ]
    };
  },
  methods: {
    next(data) {
      this.active++; //测试用，要删掉

      if (this.active === 0) {
        this.dataFromStep1.major = data.major;
        this.dataFromStep1.year = data.year;
        this.dataFromStep1.term = data.term;

        this.term = data.term;
        //1-13
        var that = this;
        axios
          .get("/data_init/history_curriculum_list", {
            params: {
              major: that.dataFromStep1.major,
              year: that.dataFromStep1.year,
              semester: that.dataFromStep1.term,
              school_no: 10085
            }
          })
          .then(function(response) {
            that.teacher_list_backEnd = response.data.data.teacher_list;
            that.curriculum_list_backEnd = response.data.data.curriculum_list;
          });

        for (
          var i = 0;
          i < this.getTrainingProgramIDFormBackEnd.major_list.length;
          i++
        ) {
          if (
            data.major ===
            this.getTrainingProgramIDFormBackEnd.major_list[i].major_name
          ) {
            for (
              var a = 0;
              a <
              this.getTrainingProgramIDFormBackEnd.major_list[i].year_list
                .length;
              a++
            ) {
              if (
                this.getTrainingProgramIDFormBackEnd.major_list[i].year_list[a]
                  .year === data.year
              ) {
                trainingObjectId = this.getTrainingProgramIDFormBackEnd
                  .major_list[i].year_list[a].training_objective_id;
              }
            }
          }
        }

        //2-4
        axios
          .get("/data_query/training_program", {
            params: {
              training_objective_id: that.trainingObjectId
            }
          })
          .then(function(response) {
            that.trainingProgramFromBackEnd = response.data.data;
          });

        this.curriculum_support_graduation_subrequirement_list_BackEnd = this.trainingProgramFromBackEnd.curriculum_support_graduation_subrequirement;
        this.graduation_requirement_list_BackEnd = this.trainingProgramFromBackEnd.graduation_requirement_list;

        for (var a = 0; a < this.graduationRequirementContent.length; a++) {
          for (
            var i = 0;
            i < this.graduation_requirement_list_BackEnd.length;
            i++
          ) {
            var temp = a + 1;
            if (
              this.graduation_requirement_list_BackEnd[i]
                .graduation_requirement_no === temp.toString()
            ) {
              this.graduationRequirementContent[
                a
              ].content = this.graduation_requirement_list_BackEnd[
                i
              ].graduation_requirement_content;
            }
          }
        }

        for (
          var i = 0;
          i < this.graduation_requirement_list_BackEnd.length;
          i++
        ) {
          for (
            var a = 0;
            a <
            this.graduation_requirement_list_BackEnd[i]
              .graduation_subrequirement_list.length;
            a++
          ) {
            var tempIndex =
              this.graduation_requirement_list_BackEnd[i]
                .graduation_requirement_no +
              "-" +
              this.graduation_requirement_list_BackEnd[
                i
              ].graduation_subrequirement_list[
                a
              ].graduation_subrequirement_no.toString();

            this.graduationRequirementToStepTwo.push({
              scoreIndex: tempIndex,
              subContent: this.graduation_requirement_list_BackEnd[i]
                .graduation_subrequirement_list[a]
                .graduation_subrequirement_content
            });
          }
        }

        for (var i = 0; i < this.tableDataOfStepTwo.length; i++) {
          this.tableDataOfStepTwo[i].courseTerm = this.term;
        }
      }

      
      // this.active++; //之后要取消注释，就是在这里递增active的
    },

    returnPage(data) {
      this.active--;
    }
  },

  created() {
    let that = this;
    //1-12
    axios
      .get("/data_init/history_training_program_list", {
        params: {
          school_no: 10085
        }
      })
      .then(function(response) {
        that.getTrainingProgramIDFormBackEnd = response.data.data;
      });

    for (
      var i = 0;
      i < this.getTrainingProgramIDFormBackEnd.major_list.length;
      i++
    ) {
      this.major_name_list.push({
        value: i.toString(),
        label: this.getTrainingProgramIDFormBackEnd.major_list[i].major_name
      });
    }
    this.major_list_backEnd = this.getTrainingProgramIDFormBackEnd.major_list;
  }
};
</script>

<style scoped>
.main_container {
  width: 100%;
  height: 100%;
  /* background-color: rgba(255, 255, 255, 0.847058823529412); */
}

.stepBox {
  /* border: 3px solid rgba(163, 183, 206);
  border-radius: 10px;
  padding: 0 30px; */
  border: 3px solid rgba(163, 183, 206);
  border-radius: 10px;
  margin: 0 30px 30px;
  padding: 20px 30px;
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
.nextButton {
  margin-top: 12px;
  background: rgba(149, 0, 3);
  color: white;
  margin-bottom: 10px;
  margin-left: 85%;
}
.main_content {
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.847058823529412);
  margin-top: 0px;
  margin-bottom: 0px;
  height: 100%;
  width: 100%;
  /* text-align: left; */
  padding: 30px 0px;
}
.stepHeader {
  height: 100px;
}
.returnButton {
  margin-left: 85%;
}
</style>
