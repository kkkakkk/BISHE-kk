<!--
 * @Author: ZKT
 * @Date: 2022-04-09 00:32:40
 * @LastEditTime: 2022-04-14 05:30:14
 * @LastEditors: ZKT
 * @Description: 确定课程信息
 * @FilePath: /obe_front/src/components/AcademicStaff/TrainingProgram/InitialTPstepComponents/Part_3/Step_2_CheckClassInfo.vue
 * @AuthorEmail: zoukt@foxmail.com
-->

<template>
  <div class="step_3.2" v-show="active === 1">
    <h4 text-align="center">确定课程信息</h4>

    <el-table
      :data="curriculum_list_backEnd"
      border
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
      <el-table-column prop="curriculum_name" label="课程名称">
      </el-table-column>
      <el-table-column prop="curriculum_type" label="课程类型">
        <!-- <template slot-scope="scope">
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
        </template> -->
      </el-table-column>
      <el-table-column prop="semester" label="开课学期"> </el-table-column>
      <el-table-column prop="major" label="专业"> </el-table-column>
      <el-table-column prop="credit" label="学分"> </el-table-column>
      <el-table-column prop="class_hours" label="学时"> </el-table-column>
      <el-table-column prop="is_compulsory" label="是否必修"> </el-table-column>

      <el-table-column label="删除">
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
      >添加选修课</el-button
    >

    <el-button class="nextButton" @click="clickNext">下一步</el-button>

    
<!-- TODO:对话框内数据未处理（主要是课程和分指标的支撑关系的表），下面的信息展示处理了。第一大part的写完了，还差第三part一半，还有第二part的数据 -->

    <!--对话框这里-->
    <el-dialog
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
      style="width:100%"
    >
      <h4 text-align="center">添加选修课</h4>
      <el-divider style="height: 6px"></el-divider>

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
        <el-table-column prop="courseName" label="课程名称">
          <template slot-scope="scope">
            <el-input
              v-model="dialogForm[scope.$index].courseName"
              placeholder="请输入课程名称"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="courseType" label="课程类型">
          <template slot-scope="scope">
            <el-select
              v-model="dialogForm[scope.$index].courseType"
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
        <el-table-column prop="courseTerm" label="开课学期"> </el-table-column>
        <el-table-column prop="major" label="专业"> </el-table-column>

        <el-table-column prop="score" label="学分">
          <template slot-scope="scope">
            <el-input
              v-model="dialogForm[scope.$index].score"
              placeholder="请输入学分"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="learningTime" label="学时">
          <template slot-scope="scope">
            <el-input
              v-model="dialogForm[scope.$index].learningTime"
              style="border:none;background-color:transparent;"
              placeholder="请输入学时"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="isCompulsory" label="是否必修">
        </el-table-column>

        <el-table-column label="删除">
          <template slot-scope="scope">
            <el-button @click.prevent="removeCourseInDialog(scope.$index)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <br />
      <el-button
        style="
        background: rgba(160, 181, 203);
        color: white;
        margin-right: 90%;
      "
        @click="addCourse(0)"
        >添加选修课</el-button
      >
      <br />

      <div
        style="
        margin-top: 13px;
        "
      >
        <el-button
          type="primary"
          @click="
            addClassStepTwo = true;
            ifChecked = true;
          "
          >确 定</el-button
        >
        <el-button
          @click="
            dialogFormVisible = false;
            addClassStepTwo = false;
          "
          >取 消</el-button
        >
      </div>
      <br />

      <div v-if="addClassStepTwo">
        <h4 text-align="center">设置课程与毕业要求分指标的支撑权重关系</h4>
        <el-divider style="height: 6px"></el-divider>

        <el-table
          :header-cell-style="{
            background: '#8BA5C0',
            color: '#ffffff',
            'text-align': 'center',
            'font-size': '14px'
          }"
          :row-style="{
            background: '#D8DFE6',
            color: '#000000',
            height: '40px'
          }"
          :cell-style="{
            'text-align': 'center',
            'font-size': '12px',
            padding: '0px'
          }"
        >
          <el-table-column prop="" label="分指标"> </el-table-column>
          <el-table-column label="支撑课程一"> </el-table-column>
          <el-table-column label="权重"> </el-table-column>
          <el-table-column label="支撑课程二"> </el-table-column>
          <el-table-column label="权重"> </el-table-column>
          <el-table-column label="支撑课程三"> </el-table-column>
          <el-table-column label="权重"> </el-table-column>
          <el-table-column label="支撑课程四"> </el-table-column>
          <el-table-column label="权重"> </el-table-column>
          <el-table-column label="支撑课程五"> </el-table-column>
          <el-table-column label="权重"> </el-table-column>
          <el-table-column label="支撑课程六"> </el-table-column>
          <el-table-column label="权重"> </el-table-column>
        </el-table>
        <br />

        <div>
          <el-button
            type="primary"
            @click="
              dialogFormVisible = false;
              addClassStepTwo = false;
            "
            >确 定</el-button
          >
          <el-button
            @click="
              addClassStepTwo = false;
              ifChecked = false;
            "
            >取 消</el-button
          >
        </div>
        <br />
      </div>

      <!--展示信息-->
      <h4 text-align="center">毕业要求与毕业要求分指标</h4>
      <el-divider style="height: 6px"></el-divider>
      <div>
        <p style="text-align: left">
          1. 工程知识：{{ graduationRequirementContent[0].content }}
        </p>
        <p
          style="text-align: left"
          v-for="(item, index) in graduationRequirementToStepTwo"
          :key="'info1-' + index"
        >
          <template
            v-if="item.scoreIndex[0] === '1' && item.scoreIndex[1] === '-'"
          >
            {{ item.scoreIndex }}：{{ item.subContent }}
          </template>
        </p>

        <p style="text-align: left">
          2. 问题分析：{{ graduationRequirementContent[1].content }}
        </p>
        <p
          style="text-align: left"
          v-for="(item, index) in graduationRequirementToStepTwo"
          :key="'info2-' + index"
        >
          <template
            v-if="item.scoreIndex[0] === '2' && item.scoreIndex[1] === '-'"
          >
            {{ item.scoreIndex }}：{{ item.subContent }}
          </template>
        </p>
        <p style="text-align: left">
          3. 设计/开发解决方案：{{ graduationRequirementContent[2].content }}
        </p>
        <p
          style="text-align: left"
          v-for="(item, index) in graduationRequirementToStepTwo"
          :key="'info3-' + index"
        >
          <template
            v-if="item.scoreIndex[0] === '3' && item.scoreIndex[1] === '-'"
          >
            {{ item.scoreIndex }}：{{ item.subContent }}
          </template>
        </p>
        <p style="text-align: left">
          4. 研究：{{ graduationRequirementContent[3].content }}
        </p>
        <p
          style="text-align: left"
          v-for="(item, index) in graduationRequirementToStepTwo"
          :key="'info4-' + index"
        >
          <template
            v-if="item.scoreIndex[0] === '4' && item.scoreIndex[1] === '-'"
          >
            {{ item.scoreIndex }}：{{ item.subContent }}
          </template>
        </p>
        <p style="text-align: left">
          5. 使用现代工具：{{ graduationRequirementContent[4].content }}
        </p>
        <p
          style="text-align: left"
          v-for="(item, index) in graduationRequirementToStepTwo"
          :key="'info5-' + index"
        >
          <template
            v-if="item.scoreIndex[0] === '5' && item.scoreIndex[1] === '-'"
          >
            {{ item.scoreIndex }}：{{ item.subContent }}
          </template>
        </p>
        <p style="text-align: left">
          6. 工程与社会：{{ graduationRequirementContent[5].content }}
        </p>
        <p
          style="text-align: left"
          v-for="(item, index) in graduationRequirementToStepTwo"
          :key="'info6-' + index"
        >
          <template
            v-if="item.scoreIndex[0] === '6' && item.scoreIndex[1] === '-'"
          >
            {{ item.scoreIndex }}：{{ item.subContent }}
          </template>
        </p>
        <p style="text-align: left">
          7. 环境和可持续发展：{{ graduationRequirementContent[6].content }}
        </p>
        <p
          style="text-align: left"
          v-for="(item, index) in graduationRequirementToStepTwo"
          :key="'info7-' + index"
        >
          <template
            v-if="item.scoreIndex[0] === '7' && item.scoreIndex[1] === '-'"
          >
            {{ item.scoreIndex }}：{{ item.subContent }}
          </template>
        </p>
        <p style="text-align: left">
          8. 职业规范：{{ graduationRequirementContent[7].content }}
        </p>
        <p
          style="text-align: left"
          v-for="(item, index) in graduationRequirementToStepTwo"
          :key="'info8-' + index"
        >
          <template
            v-if="item.scoreIndex[0] === '8' && item.scoreIndex[1] === '-'"
          >
            {{ item.scoreIndex }}：{{ item.subContent }}
          </template>
        </p>
        <p style="text-align: left">
          9. 个人和团队：{{ graduationRequirementContent[8].content }}
        </p>
        <p
          style="text-align: left"
          v-for="(item, index) in graduationRequirementToStepTwo"
          :key="'info9-' + index"
        >
          <template
            v-if="item.scoreIndex[0] === '9' && item.scoreIndex[1] === '-'"
          >
            {{ item.scoreIndex }}：{{ item.subContent }}
          </template>
        </p>
        <p style="text-align: left">
          10. 沟通：{{ graduationRequirementContent[9].content }}
        </p>
        <p
          style="text-align: left"
          v-for="(item, index) in graduationRequirementToStepTwo"
          :key="'info10-' + index"
        >
          <template
            v-if="item.scoreIndex[0] === '1' && item.scoreIndex[1] === '0'"
          >
            {{ item.scoreIndex }}：{{ item.subContent }}
          </template>
        </p>
        <p style="text-align: left">
          11. 项目管理：{{ graduationRequirementContent[10].content }}
        </p>
        <p
          style="text-align: left"
          v-for="(item, index) in graduationRequirementToStepTwo"
          :key="'info11-' + index"
        >
          <template
            v-if="item.scoreIndex[0] === '1' && item.scoreIndex[1] === '1'"
          >
            {{ item.scoreIndex }}：{{ item.subContent }}
          </template>
        </p>
        <p style="text-align: left">
          12. 终身学习：{{ graduationRequirementContent[11].content }}
        </p>
        <p
          style="text-align: left"
          v-for="(item, index) in graduationRequirementToStepTwo"
          :key="'info12-' + index"
        >
          <template
            v-if="item.scoreIndex[0] === '1' && item.scoreIndex[1] === '2'"
          >
            {{ item.scoreIndex }}：{{ item.subContent }}
          </template>
        </p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Step_2_CheckClassInfo",
  props: [
    "active",
    "next",
    "graduationRequirementToStepTwo",
    "graduationRequirementContent",
    "curriculum_list_backEnd"
  ],

  data() {
    return {
      dialogFormVisible: false, //对话框对应变量
      ifChecked: false, //添加选修课的第一步是否已经确定
      //对话框保存的数据
      dialogForm: [
        {
          courseName: "",
          courseTerm: this.curriculum_list_backEnd.semester,
          courseType: "",
          major: this.curriculum_list_backEnd.semester,
          score: "",
          learningTime: "",
          isCompulsory: "否"
        }
      ],

      addClassStepTwo: false,

      //表格数据
      tableData: [
        {
          courseName: "",
          courseTerm: "",
          courseType: "",
          major: "",
          score: "",
          learningTime: "",
          isCompulsory: "是"
        },
        {
          courseName: "",
          courseTerm: "",
          courseType: "",
          major: "",
          score: "",
          learningTime: "",
          isCompulsory: "是"
        }
      ]
    };
  },

  methods: {
    clickNext() {
      this.$emit("next", this.tableData);
    },
    removeCourse(index) {
      if (this.tableData[index].isCompulsory !== "是") {
        this.tableData.splice(index, 1);
      }
    },
    removeCourseInDialog(index) {
      if (
        this.dialogForm[index].isCompulsory !== "是" &&
        !this.ifChecked &&
        this.dialogForm.length > 1
      ) {
        this.dialogForm.splice(index, 1);
      }
    },
    addCourse(data) {
      if (!this.ifChecked) {
        this.dialogForm.push({
          courseName: "",
          courseTerm: this.curriculum_list_backEnd.semester,
          courseType: "",
          major: this.curriculum_list_backEnd.semester,
          score: "",
          learningTime: "",
          isCompulsory: "否"
        });
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
