<!--
 * @Author: ZKT
 * @Date: 2022-03-30 14:44:26
 * @LastEditTime: 2022-04-13 23:57:22
 * @LastEditors: ZKT
 * @Description: 作为步骤四、步骤五的父组件：输入课程信息+设置课程与毕业要求
 * @FilePath: /obe_front/src/components/AcademicStaff/TrainingProgram/InitialTPstepComponents/Part_2/FatherStep_2.vue
 * @AuthorEmail: zoukt@foxmail.com
-->

<template>
  <div class="main_container">
    <el-header style="height:40px;" class="as_title">
      <span>教学计划设置 | 课程信息设置</span>
      <el-button
        @click="returnPage"
        type="text"
        style="display:inline;margin-left:75%;color: #666;"
        v-show="active > 0"
        >返回首页
      </el-button>

      <hr />
    </el-header>

    <div class="main_content">
      <el-steps
        :space="300"
        :active="active"
        finish-status="success"
        align-center
        
      >
        <el-step title="选择专业和年份"></el-step>
        <el-step title="输入课程信息"></el-step>
        <el-step title="设置课程与毕业要求"></el-step>
      </el-steps>
      <div class="mainTable">
        <div class="stepBox">
          <Step_1_ChoosePlan :active="active" @next="next"></Step_1_ChoosePlan>
          <Step_2_AddCourses :active="active" @next="next"></Step_2_AddCourses>
          <Step_3_AddSupportWeight
            :active="active"
            :course_name_five="course_name_five"
            :course_support="course_support"
            :dynamicTableDataOfStepFive="dynamicTableDataOfStepFive"
            :graduationRequirementContent="graduationRequirementContent"
            @next="next"
          ></Step_3_AddSupportWeight>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Step_1_ChoosePlan from "./Step_1_ChoosePlan.vue";
import Step_2_AddCourses from "./Step_2_AddCourses.vue";
import Step_3_AddSupportWeight from "./Step_3_AddSupportWeight.vue";

export default {
  name: "FatherStep_2",
  components: { Step_1_ChoosePlan, Step_2_AddCourses, Step_3_AddSupportWeight },

  data() {
    return {
      active: 0,
      trainingProgramDataFormBackEnd: [],
      dataTempOne: [],
      dynamicColumnsOfStepThree: [],

      dataTempTwo: [],
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

      dynamicValidateForm_2: {
        //api 下面这个list
        graduation_requirement_list: [
          {
            graduation_requirement_content: "",
            graduation_requirement_no: "1",
            graduation_subrequirement: [
              {
                graduation_subrequirement_no: "1",
                graduation_subrequirement_content: ""
              }
            ]
          },
          {
            graduation_requirement_content: "",
            graduation_requirement_no: "2",
            graduation_subrequirement: [
              {
                graduation_subrequirement_no: "1",
                graduation_subrequirement_content: ""
              }
            ]
          },
          {
            graduation_requirement_content: "",
            graduation_requirement_no: "3",
            graduation_subrequirement: [
              {
                graduation_subrequirement_no: "1",
                graduation_subrequirement_content: ""
              }
            ]
          },
          {
            graduation_requirement_content: "",
            graduation_requirement_no: "4",
            graduation_subrequirement: [
              {
                graduation_subrequirement_no: "1",
                graduation_subrequirement_content: ""
              }
            ]
          },
          {
            graduation_requirement_content: "",
            graduation_requirement_no: "5",
            graduation_subrequirement: [
              {
                graduation_subrequirement_no: "1",
                graduation_subrequirement_content: ""
              }
            ]
          },
          {
            graduation_requirement_content: "",
            graduation_requirement_no: "6",
            graduation_subrequirement: [
              {
                graduation_subrequirement_no: "1",
                graduation_subrequirement_content: ""
              }
            ]
          },
          {
            graduation_requirement_content: "",
            graduation_requirement_no: "7",
            graduation_subrequirement: [
              {
                graduation_subrequirement_no: "1",
                graduation_subrequirement_content: ""
              }
            ]
          },
          {
            graduation_requirement_content: "",
            graduation_requirement_no: "8",
            graduation_subrequirement: [
              {
                graduation_subrequirement_no: "1",
                graduation_subrequirement_content: ""
              }
            ]
          },
          {
            graduation_requirement_content: "",
            graduation_requirement_no: "9",
            graduation_subrequirement: [
              {
                graduation_subrequirement_no: "1",
                graduation_subrequirement_content: ""
              }
            ]
          },
          {
            graduation_requirement_content: "",
            graduation_requirement_no: "10",
            graduation_subrequirement: [
              {
                graduation_subrequirement_no: "1",
                graduation_subrequirement_content: ""
              }
            ]
          },
          {
            graduation_requirement_content: "",
            graduation_requirement_no: "11",
            graduation_subrequirement: [
              {
                graduation_subrequirement_no: "1",
                graduation_subrequirement_content: ""
              }
            ]
          },
          {
            graduation_requirement_content: "",
            graduation_requirement_no: "12",
            graduation_subrequirement: [
              {
                graduation_subrequirement_no: "1",
                graduation_subrequirement_content: ""
              }
            ]
          }
        ]
      },

      // dynamicTableDataOfStepFive: [
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
      dynamicTableDataOfStepFive: [],

      course_support: [],
      dataTempFour: [],
      course_name_five: [],

      allData: {},

      rules: {
        name: [
          { required: true, message: "请输入专业名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        desc: [{ required: true, message: "请输入培养目标", trigger: "blur" }]
      },
      dataFromBackEnd: {}
      // data: {
      //   major_list: [
      //     {
      //       major_name: "",
      //       year_list: [
      //         {
      //           training_objective_id: "",
      //           year: ""
      //         }
      //       ]
      //     }
      //   ],
      //   code: "",
      //   msg: ""
      // }
    };
  },

  methods: {
    /**
     * @description:
     * @param {*} data
     * @return {*}
     */
    next(data) {
      // if(this.active===0) {
      //   this.dataTempOne=data;
      //   if(this.dynamicColumnsOfStepThree.length!==this.dataTempOne.training_subobjectives.length) {
      //     for (var i = 0; i < this.dataTempOne.training_subobjectives.length; i++) {
      //       this.dynamicColumnsOfStepThree.push({
      //         prop: '',
      //         label: ''
      //       });
      //       this.dynamicColumnsOfStepThree[i].label = '子目标' + (i + 1);
      //     }
      //   }
      // }
      if (this.active === 0) {
        this.dataTempTwo = this.dynamicValidateForm_2.graduation_requirement_list;
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

      if (this.active === 1) {
        this.dataTempFour = data;

        for (var i = 0; i < this.dataTempFour.length; i++) {
          this.course_name_five.push({
            value: i.toString(),
            label: this.dataTempFour[i].courseName
          });
        }
      }

      this.active++;
      this.allData = { ...this.allData, ...data };
      console.log("test-fromData", this.allData);

      //第五步时传值给接口
      // if(this.active===5) {
      //   //promise
      //   //路径，数据
      //   this.$axios.post('allData/test',this.allData).then(data=>{
      //     console.log('data',data)
      //
      //     this.$router.push('xxxx/xxx')
      //   })
      // }
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
        that.trainingProgramDataFormBackEnd = response.data.data;
      });
  }
};
</script>

<style scoped>
.main_container {
  width: 100%;
  height: 100%;
}
.as_title {
  /*height:40px;*/
  text-align: left;
  font-weight: bold;
  font-size: 16px;
  font-family: "Microsoft YaHei Regular", "Microsoft YaHei";
}
.stepBox {
  border-radius: 10px;
  padding: 0 30px;
}

.nextButton {
  margin-top: 12px;
  background: rgba(149, 0, 3);
  color: white;
  margin-bottom: 10px;
  margin-left: 85%;
}
hr {
  height: 1px;
  background: black;
  border: none;
}
.main_content {
  border-color: rgba(59, 105, 152, 1);
  border-radius: 10px;
  margin: 0px 10px;
  height: calc(100% - 110px);
  padding: 30px 0px;
  background: rgba(255, 255, 255, 0.847058823529412);
}
.mainTable {
  margin: 20px;
  border: 1px solid rgba(59, 105, 152, 1);
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.847058823529412);
}
.secondTable {
  margin-top: 20px;
  background: red;
  background: rgba(255, 255, 255, 0.847058823529412);
}
/* 
/deep/ .el-button-text {

} */
</style>
