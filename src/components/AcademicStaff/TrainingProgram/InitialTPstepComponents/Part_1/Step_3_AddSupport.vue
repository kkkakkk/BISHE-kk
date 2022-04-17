<!--
 * @Author: ZKT
 * @Date: 2022-03-25 20:58:42
 * @LastEditTime: 2022-04-11 23:05:50
 * @LastEditors: ZKT
 * @Description: 设置毕业要求与培养子目标的支撑关系
 * @FilePath: /obe_front/src/components/AcademicStaff/TrainingProgram/InitialTPstepComponents/Part_1/Step_3_AddSupport.vue
 * @AuthorEmail: zoukt@foxmail.com
-->

<template>
  <div class="step_1.3" v-show="active === 2">
    <br />
    <h4 text-align="center">设置毕业要求与培养子目标的支撑关系</h4>
    <!-- <p>{{ tableData }}</p> -->
    <!-- <p>{{ dynamicColumnsOfStepThree }}</p> -->
    <el-divider></el-divider>
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
      <el-table-column
        prop="gradTarget"
        label="培养目标与毕业要求分指标"
        width="220"
      >
      </el-table-column>

      <el-table-column
        v-for="(item, index) in dynamicColumnsOfStepThree"
        :key="index"
        :prop="item.prop"
      >
        <template slot="header">
          {{ item.label }}
        </template>

        <template slot-scope="scope">
          <el-checkbox v-model="item.checkboxValue[scope.$index]"></el-checkbox>
          <span>是否支撑</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-button
      class='nextButton'
      @click="clickNext"
      v-show="active<5"
    >下一步
    </el-button> -->
    <el-button class="nextButton" @click="clickNext">提交</el-button>

    <!--    <el-button-->
    <!--      class='addCol'-->
    <!--      @click="initCol"-->
    <!--    >初始化列-->
    <!--    </el-button>-->
  </div>
</template>

<script>
export default {
  name: "Step_3_AddSupport",
  props: ["active", "dynamicColumnsOfStepThree", "next"],
  data() {
    return {
      tableData: [
        {
          gradTarget: "毕业要求1（工程知识）"
          // childTargets: []
        },
        {
          gradTarget: "毕业要求2（问题分析）"
          // childTargets: []
        },
        {
          gradTarget: "毕业要求3（设计/开发解决方案）"
          // childTargets: []
        },
        {
          gradTarget: "毕业要求4（研究）"
          // childTargets: []
        },
        {
          gradTarget: "毕业要求5（使用现代工具）"
          // childTargets: []
        },
        {
          gradTarget: "毕业要求6（工程与社会）"
          // childTargets: []
        },
        {
          gradTarget: "毕业要求7（环境和可持续发展）"
          // childTargets: []
        },
        {
          gradTarget: "毕业要求8（职业规范）"
          // childTargets: []
        },
        {
          gradTarget: "毕业要求9（个人和团队）"
          // childTargets: []
        },
        {
          gradTarget: "毕业要求10（沟通）"
          // childTargets: []
        },
        {
          gradTarget: "毕业要求11（项目管理）"
          // childTargets: []
        },
        {
          gradTarget: "毕业要求12（终身学习）"
          // childTargets: []
        }
      ],

      dataOfStep3: {
        graduation_requirement_support_training_subobjective_list: []
      }

      //api
    };
  },
  methods: {
    /**
     * @description:
     * @param {*}
     * @return {*}
     */
    clickNext() {
      for (var i = 0; i < this.dynamicColumnsOfStepThree.length; i++) {
        for (
          var a = 0;
          a < this.dynamicColumnsOfStepThree[i].checkboxValue.length;
          a++
        ) {
          if (this.dynamicColumnsOfStepThree[i].checkboxValue[a] === true) {
            var temp1 = i + 1;
            var temp2 = a + 1;

            this.dataOfStep3.graduation_requirement_support_training_subobjective_list.push(
              {
                training_subobjective_no: temp1.toString(),
                graduation_requirement_no: temp2.toString()
              }
            );
          }
        }
      }

      this.$emit("next", this.dataOfStep3);
      // this.$router.push({
      //   path: "/AcademicStaff/TrainingProgram/InitialTrainingProgram"
      // });
    }
    // checkboxOnclick( rowIndex, colIndex) {

    //   console.log("test"+checkbox);
    //   if (checkbox == true) {
    //     var ifOwn = false;
    //     var colIndexToString = colIndex.toString();

    //     for (var i = 0; i < this.tableData[rowIndex].childTargets.length; i++) {
    //       if (this.tableData[rowIndex].childTargets[i] === colIndexToString) {
    //         ifOwn = true;
    //       }
    //     }

    //     if (!ifOwn) {
    //       this.tableData[rowIndex].childTargets.push(colIndexToString);
    //     }

    //   }
    //   if (checkbox== false) {
    //     var ifOwn = false;
    //     var colIndexToString = colIndex.toString();
    //     var ownIndex = 0;

    //     for (var i = 0; i < this.tableData[rowIndex].childTargets.length; i++) {
    //       if (this.tableData[rowIndex].childTargets[i] === colIndexToString) {
    //         ifOwn = true;
    //         ownIndex = i;
    //       }
    //     }
    //     if (ifOwn) {
    //       this.tableData[rowIndex].childTargets.splice(ownIndex, 1);
    //     }
    //   }
    // }
    // returnButton() {
    //   this.$emit("returnPage", this.formData);
    // }
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
