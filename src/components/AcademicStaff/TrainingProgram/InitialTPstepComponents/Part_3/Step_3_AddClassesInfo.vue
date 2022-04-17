<!--
 * @Author: ZKT
 * @Date: 2022-03-30 14:02:35
 * @LastEditTime: 2022-04-14 05:13:05
 * @LastEditors: ZKT
 * @Description: 设置班级信息
 * @FilePath: /obe_front/src/components/AcademicStaff/TrainingProgram/InitialTPstepComponents/Part_3/Step_3_AddClassesInfo.vue
 * @AuthorEmail: zoukt@foxmail.com
-->

<template>
  <div class="step_3.3" v-show="active === 2">
    <br />
    <h4 text-align="center">设置班级信息（第一学期）</h4>
    <!-- <p>{{ term }}</p> -->
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
      <el-table-column prop="courseName" width="100" label="课程名称">
      </el-table-column>
      <el-table-column prop="courseIndex" width="100" label="子班序号">
      </el-table-column>
      <el-table-column prop="courseTerm" width="100" label="开课学期">
      </el-table-column>

      <el-table-column label="开课时间" required>
        <template slot-scope="scope">
          <el-date-picker
            v-model="tableData[scope.$index].startDate"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </template>
      </el-table-column>

      <el-table-column label="结课时间" required>
        <template slot-scope="scope">
          <el-date-picker
            v-model="tableData[scope.$index].endDate"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </template>
      </el-table-column>

      <el-table-column prop="teacherName" label="授课老师" width="120">
        <template slot-scope="scope">
          <el-select
            v-model="tableData[scope.$index].teacherName"
            placeholder="请选择"
          >
            <el-option
              v-for="item in [
                { value: '1', label: '左老师' },
                { value: '2', label: '小邹' }
              ]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click.prevent="removeCourse(scope.$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-button
      @click="dialogFormVisible = true"
      style="
        background: rgba(160, 181, 203);
        color: white;
        margin-right: 90%;
        margin-top: 10px;
      "
      >添加课程</el-button
    >

    <el-divider></el-divider>

    <el-dialog
      title="添加班级"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
    >
      <el-table
        :data="dialogForm"
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
        <el-table-column label="课程名称">
          <template slot-scope="{}">
            <el-select
              v-model="dialogForm[0].courseNameForm"
              placeholder="请选择"
            >
              <el-option
                v-for="item in [
                  { value: '1', label: '数据结构' },
                  { value: '2', label: '算法设计' },
                  { value: '3', label: '操作系统' },
                  { value: '4', label: '计算机网络' }
                ]"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="startDateForm" label="开课时间" required>
          <template slot-scope="{}">
            <el-date-picker
              v-model="dialogForm[0].startDateForm"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </template>
        </el-table-column>

        <el-table-column prop="endDateForm" label="结课时间" required>
          <template slot-scope="{}">
            <el-date-picker
              v-model="dialogForm[0].endDateForm"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </template>
        </el-table-column>

        <el-table-column prop="teacherNameForm" label="授课老师" width="120">
          <template slot-scope="{}">
            <el-select
              v-model="dialogForm[0].teacherNameForm"
              placeholder="请选择授课老师"
            >
              <el-option
                v-for="item in [
                  { value: '1', label: '左老师' },
                  { value: '2', label: '小邹' }
                ]"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            dialogFormVisible = false;
            addClass(0);
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-button class="nextButton" @click="clickNext">提交</el-button>
  </div>
</template>

<script>
import {} from "vue";
export default {
  name: "Step_3_AddClassesInfo",
  props: ["active", "next", "term", "tableData"],
  data() {
    return {
      value2: "",
      value: "",
      dialogFormVisible: false, //对话框对应变量
      formLabelWidth: "120px",

      dialogForm: [
        {
          courseNameForm: "",
          startDateForm: "",
          endDateForm: "",
          teacherNameForm: ""
        }
      ]

      // tableData: [
      //   {
      //     courseName: "数据结构",
      //     courseIndex: "1",
      //     courseTerm: "",
      //     startDate: "",
      //     endDate: "",
      //     teacherName: ""
      //   },
      //   {
      //     courseName: "算法设计",
      //     courseIndex: "1",
      //     courseTerm: "",
      //     startDate: "",
      //     endDate: "",
      //     teacherName: ""
      //   },
      //   {
      //     courseName: "操作系统",
      //     courseIndex: "1",
      //     courseTerm: "",
      //     startDate: "",
      //     endDate: "",
      //     teacherName: ""
      //   },
      //   {
      //     courseName: "计算机网络",
      //     courseIndex: "1",
      //     courseTerm: "",
      //     startDate: "",
      //     endDate: "",
      //     teacherName: ""
      //   }
      // ]
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
    addClass(temp) {
      var cal = 0; //计算有几个课程名字一样的
      for (var i = 0; i < this.tableData.length; i++) {
        if (
          this.tableData[i].courseName === this.dialogForm[0].courseNameForm
        ) {
          cal++;
        }
      }
      cal++;
      this.tableData.push({
        courseName: this.dialogForm[0].courseNameForm,
        courseIndex: cal.toString(),
        courseTerm: this.term,
        startDate: this.dialogForm[0].startDateForm,
        endDate: this.dialogForm[0].endDateForm,
        teacherName: this.dialogForm[0].teacherNameForm
      });
      this.dialogForm[0].courseNameForm = "";
      this.dialogForm[0].startDateForm = "";
      this.dialogForm[0].endDateForm = "";
      this.dialogForm[0].teacherNameForm = "";
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
      this.$router.push({
        path: "/AcademicStaff/TrainingProgram/InitialTrainingProgram"
      });
    },

    /**
     * @description:
     * @param {*} index
     * @return {*}
     */
    removeCourse(index) {
      if (this.tableData[index].courseIndex !== "1") {
        this.tableData.splice(index, 1);
      }
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
.nextButton {
  margin-top: 12px;
  background: rgba(149, 0, 3);
  color: white;
  margin-bottom: 10px;
  margin-left: 85%;
}
</style>
