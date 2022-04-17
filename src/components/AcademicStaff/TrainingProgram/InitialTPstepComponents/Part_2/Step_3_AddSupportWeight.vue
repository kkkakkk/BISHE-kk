<!--
 * @Author: ZKT
 * @Date: 2022-03-25 21:35:05
 * @LastEditTime: 2022-04-14 05:21:19
 * @LastEditors: ZKT
 * @Description:
 * @FilePath: /obe_front/src/components/AcademicStaff/TrainingProgram/InitialTPstepComponents/Part_2/Step_3_AddSupportWeight.vue
 * @AuthorEmail: zoukt@foxmail.com
-->

<template>
  <div>
    <div class="step_3" v-show="active === 2">
      <div class="firstTable">
        <h4 text-align="center">设置课程与毕业要求分指标的支撑权重关系</h4>
        <!-- <p>{{dynamicTableDataOfStepFive}}</p> -->
        <el-divider style="height: 6px"></el-divider>

        <!-- <el-button class="nextButton" @click="returnButton">返回 </el-button> -->
        <br />
        <br />
        <el-table
          :data="dynamicTableDataOfStepFive"
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
          <el-table-column
            prop="scoreIndex"
            label="分指标"
            border
          ></el-table-column>

          <el-table-column
            :data="course_support"
            v-for="(item, index) in this.coursesLabel"
            :key="index"
            :prop="item.prop"
          >
            <template slot="header">
              {{ item.label }}
            </template>

            <template slot-scope="scope">
              <!--                  <p>{{scope.$index}}</p>-->
              <!--                  <p>{{index}}</p>-->
              <p>{{ course_support[scope.$index].support[index] }}</p>
            </template>
          </el-table-column>

          <el-table-column label="添加课程">
            <template slot-scope="scope">
              <el-button
                type="text"
                style="color: #666"
                @click="
                  dialogFormVisible = true;
                  receiveIndex(scope.$index);
                "
                >添加</el-button
              >
            </template>
          </el-table-column>

          <el-table-column label="重置课程">
            <template slot-scope="scope">
              <el-button
                type="text"
                style="color: #666"
                @click="removeCourseAll(scope.$index)"
              >
                重置
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-button class="nextButton" @click="clickNext">提交</el-button>
      </div>
      <div class="secondTable">
        <h4 text-align="center">毕业要求与毕业要求分指标</h4>
        <el-divider style="height: 6px"></el-divider>

        <div style="font-size: 15px">
          <p style="text-align: left">
            1. 工程知识：{{ graduationRequirementContent[0].content }}
          </p>
          <p
            style="text-align: left"
            v-for="(item, index) in dynamicTableDataOfStepFive"
            :key="'info1-' + index"
          >
            <template
              v-if="item.scoreIndex[0] === '1' && item.scoreIndex[1] === '-'"
            >
              {{ item.scoreIndex }}：
            </template>
          </p>

          <p style="text-align: left">
            2. 问题分析：{{ graduationRequirementContent[1].content }}
          </p>
          <p
            style="text-align: left"
            v-for="(item, index) in dynamicTableDataOfStepFive"
            :key="'info2-' + index"
          >
            <template
              v-if="item.scoreIndex[0] === '2' && item.scoreIndex[1] === '-'"
            >
              {{ item.scoreIndex }}：
            </template>
          </p>
          <p style="text-align: left">
            3. 设计/开发解决方案：{{ graduationRequirementContent[2].content }}
          </p>
          <p
            style="text-align: left"
            v-for="(item, index) in dynamicTableDataOfStepFive"
            :key="'info3-' + index"
          >
            <template
              v-if="item.scoreIndex[0] === '3' && item.scoreIndex[1] === '-'"
            >
              {{ item.scoreIndex }}：
            </template>
          </p>
          <p style="text-align: left">
            4. 研究：{{ graduationRequirementContent[3].content }}
          </p>
          <p
            style="text-align: left"
            v-for="(item, index) in dynamicTableDataOfStepFive"
            :key="'info4-' + index"
          >
            <template
              v-if="item.scoreIndex[0] === '4' && item.scoreIndex[1] === '-'"
            >
              {{ item.scoreIndex }}：
            </template>
          </p>
          <p style="text-align: left">
            5. 使用现代工具：{{ graduationRequirementContent[4].content }}
          </p>
          <p
            style="text-align: left"
            v-for="(item, index) in dynamicTableDataOfStepFive"
            :key="'info5-' + index"
          >
            <template
              v-if="item.scoreIndex[0] === '5' && item.scoreIndex[1] === '-'"
            >
              {{ item.scoreIndex }}：
            </template>
          </p>
          <p style="text-align: left">
            6. 工程与社会：{{ graduationRequirementContent[5].content }}
          </p>
          <p
            style="text-align: left"
            v-for="(item, index) in dynamicTableDataOfStepFive"
            :key="'info6-' + index"
          >
            <template
              v-if="item.scoreIndex[0] === '6' && item.scoreIndex[1] === '-'"
            >
              {{ item.scoreIndex }}：
            </template>
          </p>
          <p style="text-align: left">
            7. 环境和可持续发展：{{ graduationRequirementContent[6].content }}
          </p>
          <p
            style="text-align: left"
            v-for="(item, index) in dynamicTableDataOfStepFive"
            :key="'info7-' + index"
          >
            <template
              v-if="item.scoreIndex[0] === '7' && item.scoreIndex[1] === '-'"
            >
              {{ item.scoreIndex }}：
            </template>
          </p>
          <p style="text-align: left">
            8. 职业规范：{{ graduationRequirementContent[7].content }}
          </p>
          <p
            style="text-align: left"
            v-for="(item, index) in dynamicTableDataOfStepFive"
            :key="'info8-' + index"
          >
            <template
              v-if="item.scoreIndex[0] === '8' && item.scoreIndex[1] === '-'"
            >
              {{ item.scoreIndex }}：
            </template>
          </p>
          <p style="text-align: left">
            9. 个人和团队：{{ graduationRequirementContent[8].content }}
          </p>
          <p
            style="text-align: left"
            v-for="(item, index) in dynamicTableDataOfStepFive"
            :key="'info9-' + index"
          >
            <template
              v-if="item.scoreIndex[0] === '9' && item.scoreIndex[1] === '-'"
            >
              {{ item.scoreIndex }}：
            </template>
          </p>
          <p style="text-align: left">
            10. 沟通：{{ graduationRequirementContent[9].content }}
          </p>
          <p
            style="text-align: left"
            v-for="(item, index) in dynamicTableDataOfStepFive"
            :key="'info10-' + index"
          >
            <template
              v-if="item.scoreIndex[0] === '1' && item.scoreIndex[1] === '0'"
            >
              {{ item.scoreIndex }}：
            </template>
          </p>
          <p style="text-align: left">
            11. 项目管理：{{ graduationRequirementContent[10].content }}
          </p>
          <p
            style="text-align: left"
            v-for="(item, index) in dynamicTableDataOfStepFive"
            :key="'info11-' + index"
          >
            <template
              v-if="item.scoreIndex[0] === '1' && item.scoreIndex[1] === '1'"
            >
              {{ item.scoreIndex }}：
            </template>
          </p>
          <p style="text-align: left">
            12. 终身学习：{{ graduationRequirementContent[11].content }}
          </p>
          <p
            style="text-align: left"
            v-for="(item, index) in dynamicTableDataOfStepFive"
            :key="'info12-' + index"
          >
            <template
              v-if="item.scoreIndex[0] === '1' && item.scoreIndex[1] === '2'"
            >
              {{ item.scoreIndex }}：
            </template>
          </p>
        </div>
      </div>
      <!--展示信息-->
      <el-dialog
        title="选择课程名称和支撑权重"
        :visible.sync="dialogFormVisible"
        :append-to-body="true"
      >
        <el-form v-model="form">
          <el-form-item label="课程名称" :label-width="formLabelWidth">
            <el-select
              v-model="form[0].courseName"
              placeholder="请选择课程名称"
            >
              <el-option
                v-for="item in course_name_five"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支撑权重" :label-width="formLabelWidth">
            <el-select
              v-model="form[0].supportWeight"
              placeholder="请选择支撑权重"
            >
              <el-option label="强" value="0.5"></el-option>
              <el-option label="较强" value="0.4"></el-option>
              <el-option label="中" value="0.3"></el-option>
              <el-option label="较弱" value="0.2"></el-option>
              <el-option label="弱" value="0.1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="
              dialogFormVisible = false;
              pushCourse(0);
            "
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {} from "vue";
export default {
  name: "Step_3_AddSupportWeight",
  props: [
    "active",
    "next",
    "graduationRequirementContent",

    "dynamicTableDataOfStepFive",
    //从后端传来的分指标的数组
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

    "course_support",
    //每个分指标都对应一个数组，记录和哪个课程支撑
    // course_support:[
    //   {
    //     //每个分指标都对应一个数组，记录和哪个课程支撑
    //     support:["数据结构-强","hahahha"],
    //   },
    // ],

    "course_name_five",
    //对话框里可选的课程的名字列表
    // course_name_five:[{
    //     value:'1',
    //   label:'数据结构',
    //
    // }, {
    //     value:'2',
    //     label:'算法设计'
    //   }],

    "returnPage"
  ],

  data() {
    return {
      coursesLabel: [
        {
          label: "支撑课程一",
          prop: ""
        },
        {
          label: "支撑课程二",
          prop: ""
        },
        {
          label: "支撑课程三",
          prop: ""
        },
        {
          label: "支撑课程四",
          prop: ""
        },
        {
          label: "支撑课程五",
          prop: ""
        },
        {
          label: "支撑课程六",
          prop: ""
        }
      ], //指支撑课程一二三四五六

      // numOfCourse: 0,

      dialogFormVisible: false, //对话框对应变量

      form: [
        {
          courseName: "",
          supportWeight: ""
        }
      ], //存储来自对话框的数据，这个数组保持只有一个对象

      tempIndex: [], //存放添加按钮所在的行索引，数组保持只有一个对象

      formLabelWidth: "120px",

      //后端需要接收的数据
      curriculum_support_graduation_subrequirement_list: [
        {
          graduation_subrequirement_no: "",
          curriculum_list: [
            {
              curriculum_name: "",
              weight: ""
            }
          ]
        }
      ] //api
    };
  },
  methods: {
    /**
     * @description: 跳转到下一步
     * @param {*}
     * @return {*}
     */
    clickNext() {
      this.$emit("next", this.test);
      this.$router.push({
        path: "/AcademicStaff/TrainingProgram/InitialTrainingProgram"
      });
    },
    /**
     * @description: 返回上一步
     * @param {*}
     * @return {*}
     */
    // returnButton() {
    //   this.$emit("returnPage", this.test);
    // },
    // addCourse(){
    //   var temp = numOfCourse++;
    //   this.coursesLabel.push({
    //     label:'支撑课程'+temp.toString(),
    //       prop:'',
    //   });
    // },

    /**
     * @description: 清空该分指标对应的所有课程
     * @param {*} index 分指标对应的行索引
     * @return {*}
     */
    removeCourseAll(index) {
      this.course_support[index].support = [];
      // var max = 0;
      // for (var a = 0; a < this.course_support.length; a++) {
      //   if (max < this.course_support[a].support.length) {
      //     max = this.course_support[a].support.length;
      //   }
      // }
      // if (this.coursesLabel.length > max) {
      //   for (var c = this.coursesLabel.length - 1; c > max - 1; c--) {
      //     this.coursesLabel.splice(c, 1);
      //   }
      // }
    },
    /**
     * @description: 把按下的添加按钮所在的行索引存到一个数组中，就可以知道操作的是哪一个分指标
     * @param {*} index “添加”按钮所在的行索引
     * @return {*}
     */
    receiveIndex(index) {
      this.tempIndex.push({
        indexOfCol: index
      });
    },

    /**
     * @description: 在对话框点击确定之后，将课程名字和支撑强度添加到对应的分指标
     * @param {*} indexTemp 没什么用，就是占个位置，没写参数的话会报错，不知道为什么
     * @return {*}
     */
    pushCourse(indexTemp) {
      var temp = this.form[0].courseName + "-";
      if (this.form[0].supportWeight === "0.1") {
        temp = temp + "弱";
      } else if (this.form[0].supportWeight === "0.2") {
        temp = temp + "较弱";
      } else if (this.form[0].supportWeight === "0.3") {
        temp = temp + "中";
      } else if (this.form[0].supportWeight === "0.4") {
        temp = temp + "较强";
      } else if (this.form[0].supportWeight === "0.5") {
        temp = temp + "强";
      }
      var temp2 = parseInt(this.tempIndex[0].indexOfCol);
      this.course_support[temp2].support.push(temp);

      var max = 0;

      for (var a = 0; a < this.course_support.length; a++) {
        if (max < this.course_support[a].support.length) {
          max = this.course_support[a].support.length;
        }
      }

      // if (this.coursesLabel.length < max) {
      //   for (var c = this.coursesLabel.length + 1; c < max + 1; c++) {
      //     this.coursesLabel.push({
      //       label: "支撑课程" + c.toString(),
      //       prop: ""
      //     });
      //   }
      // }

      this.tempIndex.splice(0, 1);
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
  margin-left: 0%;
}
.firstTable {
  border: 1px solid rgba(163, 183, 206);
}
</style>
