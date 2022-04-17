<!--
 * @Author: ZKT
 * @Date: 2022-03-25 20:59:14
 * @LastEditTime: 2022-04-14 01:03:38
 * @LastEditors: ZKT
 * @Description:
 * @FilePath: /obe_front/src/components/AcademicStaff/TrainingProgram/InitialTPstepComponents/Part_2/Step_2_AddCourses.vue
 * @AuthorEmail: zoukt@foxmail.com
-->

<template>
  <div class="step_2.2" v-show="active === 1">
    <h5 text-align="center">输入课程信息</h5>
    <!--        <p>{{tableData}}</p>-->
    <el-button
      @click="importHistory"
      icon="el-icon-plus"
      style="background:rgba(160,181,203);color:white"
      class="importHistorybtn"
    >
      导入历史培养方案
    </el-button>
    <br />
    <!-- <el-button class="nextButton" @click="returnButton">返回 </el-button> -->

    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :header-cell-style="{
        background: '#8BA5C0',
        color: '#ffffff',
        'text-align': 'center',
        'font-size': '14px'
      }"
      :row-style="{ background: '#D8DFE6', color: '#000000', height: '40px' }"
      :cell-style="{
        'text-align': 'center',
        'font-size': '12px',
        padding: '0px'
      }"
    >
      <el-table-column prop="courseName" label="课程名称">
        <template slot-scope="scope">
          <el-input
            v-model="tableData[scope.$index].courseName"
            placeholder="请输入课程名称"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="courseType" label="课程类型">
        <template slot-scope="scope">
          <el-select
            v-model="tableData[scope.$index].courseType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in [
                { value: 0, label: '学科基础课' },
                { value: 1, label: '思政/军理/体育/外语课' },
                { value: 2, label: '通识/人文选修课' },
                { value: 3, label: '专业基础课' },
                { value: 4, label: '专业主干/领域课' },
                { value: 5, label: '专业方向课' },
                { value: 6, label: '专业选修课' },
                { value: 7, label: '认识实习' },
                { value: 8, label: '生产实习' },
                { value: 9, label: '毕业实习' },
                { value: 10, label: '毕业设计' }
              ]"
              :key="'info1-' + item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      
      <el-table-column prop="term" label="开课学期">
        <template slot-scope="scope">
          <el-select
            v-model="tableData[scope.$index].term"
            placeholder="请选择"
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
              :key="'info2-' + item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="major" label="专业"> </el-table-column>

      <el-table-column prop="score" label="学分">
        <template slot-scope="scope">
          <el-input
            v-model="tableData[scope.$index].score"
            placeholder="请输入学分"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="learningTime" label="学时">
        <template slot-scope="scope">
          <el-input
            v-model="tableData[scope.$index].learningTime"
            style="border:none;background-color:transparent;"
            placeholder="请输入学时"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="isCompulsory" label="是否必修">
        <template slot-scope="scope">
          <el-checkbox
            v-model="tableData[scope.$index].isCompulsory"
          ></el-checkbox>
          <span>是否必修</span>
        </template>
      </el-table-column>
      <el-table-column prop="action" label="操作">
        <template slot-scope="scope">
          <el-button
            @click.prevent="removeCourse(scope.$index)"
            type="text"
            style="color: #666"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button
      @click="addDomain"
      style="
        background: rgba(160, 181, 203);
        color: white;
        margin-right: 90%;
        margin-top: 10px;
      "
      >添加课程</el-button
    >
    <el-divider></el-divider>
    <el-button class="nextButton" @click="clickNext">下一步</el-button>
  </div>
</template>

<script>
import {} from "vue";
export default {
  name: "Step_2_AddCourses",
  props: ["active", "next", "returnPage"],
  data() {
    return {
      value2: "",
      value: "",
      // tableData: [
      //     {
      //         courseName:'英语',
      //         courseType: '学科基础课',
      //         term:'',
      //         major: 'xxx',
      //         score: 'xxx',
      //         learningTime: 1,
      //         isCompulsory:false,
      //
      //     },
      //
      //
      // ]
      tableData: [
        {
          courseName: "",
          courseType: null,
          term: "",
          major: "xxx",
          score: "",
          learningTime: "",
          isCompulsory: false
        }
      ],

      added_curriculum_list: [
        {
          name: "",
          type: "",
          semester: "",
          major: "",
          credit: "",
          class_hour: "",
          is_compulsory: ""
        }
      ] //api
    };
  },
  methods: {
    /**
     * @description:
     * @param {*} h
     * @param {*} column
     * @return {*}
     */
    renderHeader(h, { column }) {
      return h("span", [
        h("span", column.label),
        h("el-checkbox", {
          style: "margin-left: 5px;",
          on: {
            change: this.change
          }
        })
      ]);
    },

    /**
     * @description:
     * @param {*}
     * @return {*}
     */
    addDomain() {
      this.tableData.push({
        courseName: "",
        courseType: "",
        term: "",
        major: "xxx",
        score: "",
        learningTime: "",
        isCompulsory: false
      });
    },

    /**
     * @description:
     * @param {*} val
     * @return {*}
     */
    change(val) {
      console.log(val);
    },

    /**
     * @description:
     * @param {*}
     * @return {*}
     */
    clickNext() {
      this.$emit("next", this.tableData);
    },
    // returnButton() {
    //   this.$emit("returnPage", this.tableData);
    // },

    /**
     * @description:
     * @param {*} index
     * @return {*}
     */
    removeCourse(index) {
      if (this.tableData.length > 1) {
        this.tableData.splice(index, 1);
      }
    },

    importHistory() {
      var url = "/data_init/history_training_program_list";
      axios.get(url).then(function(response) {
        this.dataFromBackEnd = response.data.data;
        //TODO:这里的数据有点复杂
      });
    }
    // selectPlatform(){
    //   this.$nextTick(() => {
    //     this.$forceUpdate()
    //   })
    //
    // },
  }
};
</script>

<style scoped>
.importHistorybtn {
  margin-left: 85%;
}
.nextButton {
  margin-top: 12px;
  background: rgba(149, 0, 3);
  color: white;
  margin-bottom: 10px;
  margin-left: 85%;
}
/deep/ .el-input__inner {
  background: transparent;
}
/deep/ input :focus {
  background: red;
}
</style>
