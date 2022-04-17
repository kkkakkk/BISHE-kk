<!--
 * @Author: ZKT
 * @Date: 2022-03-25 21:16:04
 * @LastEditTime: 2022-04-11 05:55:46
 * @LastEditors: ZKT
 * @Description: 添加毕业要求
 * @FilePath: /obe_front/src/components/AcademicStaff/TrainingProgram/InitialTPstepComponents/Part_1/Step_2_AddGraduationRequirements.vue
 * @AuthorEmail: zoukt@foxmail.com
-->

<template>
  <div class="step_1.2" v-show="active === 1">
    <br />
    <h4>添加毕业要求</h4>

    <el-divider></el-divider>

    <el-form v-model="dynamicValidateForm_2" class="demo-dynamicValidateForm_2">
      <!-- 毕业要求1-工程知识 -->
      <div>
        <el-row :span="20" style="text-align: left">
          毕业要求1-工程知识
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <el-input
                type="textarea"
                v-model="
                  dynamicValidateForm_2.graduation_requirement_list[0]
                    .graduation_requirement_content
                "
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item
          v-for="(target_2, index) in dynamicValidateForm_2
            .graduation_requirement_list[0].graduation_subrequirement"
          :label="'分指标' + (index + 1)"
          :prop="target_2.graduation_subrequirement_content"
          :key="index"
          :rules="{
            required: true,
            message: '分指标不能为空',
            trigger: 'blur'
          }"
        >
          <el-col :span="17" style="text-align: left">
            <el-input
              v-model="target_2.graduation_subrequirement_content"
            ></el-input>
          </el-col>
          <el-col :span="5">
            <el-button @click.prevent="removeDomain_2(target_2, 0)"
              >删除</el-button
            >
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button @click="addDomain_2(0)">添加分指标</el-button>
        </el-form-item>
        <el-divider></el-divider>
      </div>

      <!-- 毕业要求2-问题分析 -->
      <div>
        <el-col :span="24" style="text-align: left">
          毕业要求2-问题分析
        </el-col>
        <el-form-item :span="24">
          <el-input
            type="textarea"
            v-model="
              dynamicValidateForm_2.graduation_requirement_list[1]
                .graduation_requirement_content
            "
          ></el-input>
        </el-form-item>
        <el-form-item
          v-for="(target_2, index) in dynamicValidateForm_2
            .graduation_requirement_list[1].graduation_subrequirement"
          :label="'分指标' + (index + 1)"
          :prop="target_2.graduation_subrequirement_content"
          :key="index"
          :rules="{
            required: true,
            message: '分指标不能为空',
            trigger: 'blur'
          }"
        >
          <el-col :span="17" style="text-align: left">
            <el-input
              v-model="target_2.graduation_subrequirement_content"
            ></el-input>
          </el-col>
          <el-col :span="5">
            <el-button @click.prevent="removeDomain_2(target_2, 1)"
              >删除</el-button
            >
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button @click="addDomain_2(1)">添加分指标</el-button>
        </el-form-item>
        <el-divider></el-divider>
      </div>

      <!-- 毕业要求3-设计/开发解决方案 -->
      <div>
        <el-col :span="24" style="text-align: left">
          毕业要求3-设计/开发解决方案
        </el-col>
        <el-form-item :span="24">
          <el-input
            type="textarea"
            v-model="
              dynamicValidateForm_2.graduation_requirement_list[2]
                .graduation_requirement_content
            "
          ></el-input>
        </el-form-item>
        <el-form-item
          v-for="(target_2, index) in dynamicValidateForm_2
            .graduation_requirement_list[2].graduation_subrequirement"
          :label="'分指标' + (index + 1)"
          :key="index"
          :prop="target_2.graduation_subrequirement_content"
          :rules="{
            required: true,
            message: '分指标不能为空',
            trigger: 'blur'
          }"
        >
          <el-col :span="17" style="text-align: left">
            <el-input
              v-model="target_2.graduation_subrequirement_content"
            ></el-input>
          </el-col>
          <el-col :span="5">
            <el-button @click.prevent="removeDomain_2(target_2, 2)"
              >删除</el-button
            >
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button @click="addDomain_2(2)">添加分指标</el-button>
        </el-form-item>
        <el-divider></el-divider>
      </div>

      <!-- 毕业要求4-研究 -->
      <div>
        <el-col :span="24" style="text-align: left"> 毕业要求4-研究 </el-col>
        <el-form-item :span="24">
          <el-input
            type="textarea"
            v-model="
              dynamicValidateForm_2.graduation_requirement_list[3]
                .graduation_requirement_content
            "
          ></el-input>
        </el-form-item>
        <el-form-item
          v-for="(target_2, index) in dynamicValidateForm_2
            .graduation_requirement_list[3].graduation_subrequirement"
          :label="'分指标' + (index + 1)"
          :key="index"
          :prop="target_2.graduation_subrequirement_content"
          :rules="{
            required: true,
            message: '分指标不能为空',
            trigger: 'blur'
          }"
        >
          <el-col :span="17" style="text-align: left">
            <el-input
              v-model="target_2.graduation_subrequirement_content"
            ></el-input>
          </el-col>
          <el-col :span="5">
            <el-button @click.prevent="removeDomain_2(target_2, 3)"
              >删除</el-button
            >
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button @click="addDomain_2(3)">添加分指标</el-button>
        </el-form-item>
        <el-divider></el-divider>
      </div>

      <!-- 毕业要求5-使用现代工具 -->
      <div>
        <el-col :span="24" style="text-align: left">
          毕业要求5-使用现代工具
        </el-col>
        <el-form-item :span="24">
          <el-input
            type="textarea"
            v-model="
              dynamicValidateForm_2.graduation_requirement_list[4]
                .graduation_requirement_content
            "
          ></el-input>
        </el-form-item>
        <el-form-item
          v-for="(target_2, index) in dynamicValidateForm_2
            .graduation_requirement_list[4].graduation_subrequirement"
          :label="'分指标' + (index + 1)"
          :key="index"
          :prop="target_2.graduation_subrequirement_content"
          :rules="{
            required: true,
            message: '分指标不能为空',
            trigger: 'blur'
          }"
        >
          <el-col :span="17" style="text-align: left">
            <el-input
              v-model="target_2.graduation_subrequirement_content"
            ></el-input>
          </el-col>
          <el-col :span="5">
            <el-button @click.prevent="removeDomain_2(target_2, 4)"
              >删除</el-button
            >
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button @click="addDomain_2(4)">添加分指标</el-button>
        </el-form-item>
        <el-divider></el-divider>
      </div>

      <!-- 毕业要求6-工程与社会 -->
      <div>
        <el-col :span="24" style="text-align: left">
          毕业要求6-工程与社会
        </el-col>
        <el-form-item :span="24">
          <el-input
            type="textarea"
            v-model="
              dynamicValidateForm_2.graduation_requirement_list[5]
                .graduation_requirement_content
            "
          ></el-input>
        </el-form-item>
        <el-form-item
          v-for="(target_2, index) in dynamicValidateForm_2
            .graduation_requirement_list[5].graduation_subrequirement"
          :label="'分指标' + (index + 1)"
          :key="index"
          :prop="target_2.graduation_subrequirement_content"
          :rules="{
            required: true,
            message: '分指标不能为空',
            trigger: 'blur'
          }"
        >
          <el-col :span="17" style="text-align: left">
            <el-input
              v-model="target_2.graduation_subrequirement_content"
            ></el-input>
          </el-col>
          <el-col :span="5">
            <el-button @click.prevent="removeDomain_2(target_2, 5)"
              >删除</el-button
            >
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button @click="addDomain_2(5)">添加分指标</el-button>
        </el-form-item>
        <el-divider></el-divider>
      </div>

      <!-- 毕业要求7-环境和可持续发展 -->
      <div>
        <el-col :span="24" style="text-align: left">
          毕业要求7-环境和可持续发展
        </el-col>
        <el-form-item :span="24">
          <el-input
            type="textarea"
            v-model="
              dynamicValidateForm_2.graduation_requirement_list[6]
                .graduation_requirement_content
            "
          ></el-input>
        </el-form-item>
        <el-form-item
          v-for="(target_2, index) in dynamicValidateForm_2
            .graduation_requirement_list[6].graduation_subrequirement"
          :label="'分指标' + (index + 1)"
          :key="index"
          :prop="target_2.graduation_subrequirement_content"
          :rules="{
            required: true,
            message: '分指标不能为空',
            trigger: 'blur'
          }"
        >
          <el-col :span="17" style="text-align: left">
            <el-input
              v-model="target_2.graduation_subrequirement_content"
            ></el-input>
          </el-col>
          <el-col :span="5">
            <el-button @click.prevent="removeDomain_2(target_2, 6)"
              >删除</el-button
            >
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button @click="addDomain_2(6)">添加分指标</el-button>
        </el-form-item>
        <el-divider></el-divider>
      </div>

      <!-- 毕业要求8-职业规范 -->
      <div>
        <el-col :span="24" style="text-align: left">
          毕业要求8-职业规范
        </el-col>
        <el-form-item :span="24">
          <el-input
            type="textarea"
            v-model="
              dynamicValidateForm_2.graduation_requirement_list[7]
                .graduation_requirement_content
            "
          ></el-input>
        </el-form-item>
        <el-form-item
          v-for="(target_2, index) in dynamicValidateForm_2
            .graduation_requirement_list[7].graduation_subrequirement"
          :label="'分指标' + (index + 1)"
          :key="index"
          :prop="target_2.graduation_subrequirement_content"
          :rules="{
            required: true,
            message: '分指标不能为空',
            trigger: 'blur'
          }"
        >
          <el-col :span="17" style="text-align: left">
            <el-input
              v-model="target_2.graduation_subrequirement_content"
            ></el-input>
          </el-col>
          <el-col :span="5">
            <el-button @click.prevent="removeDomain_2(target_2, 7)"
              >删除</el-button
            >
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button @click="addDomain_2(7)">添加分指标</el-button>
        </el-form-item>
        <el-divider></el-divider>
      </div>

      <!-- 毕业要求9-个人和团队 -->
      <div>
        <el-col :span="24" style="text-align: left">
          毕业要求9-个人和团队
        </el-col>
        <el-form-item :span="24">
          <el-input
            type="textarea"
            v-model="
              dynamicValidateForm_2.graduation_requirement_list[8]
                .graduation_requirement_content
            "
          ></el-input>
        </el-form-item>
        <el-form-item
          v-for="(target_2, index) in dynamicValidateForm_2
            .graduation_requirement_list[8].graduation_subrequirement"
          :label="'分指标' + (index + 1)"
          :key="index"
          :prop="target_2.graduation_subrequirement_content"
          :rules="{
            required: true,
            message: '分指标不能为空',
            trigger: 'blur'
          }"
        >
          <el-col :span="17" style="text-align: left">
            <el-input
              v-model="target_2.graduation_subrequirement_content"
            ></el-input>
          </el-col>
          <el-col :span="5">
            <el-button @click.prevent="removeDomain_2(target_2, 8)"
              >删除</el-button
            >
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button @click="addDomain_2(8)">添加分指标</el-button>
        </el-form-item>
        <el-divider></el-divider>
      </div>

      <!-- 毕业要求10-沟通 -->
      <div>
        <el-col :span="24" style="text-align: left"> 毕业要求10-沟通 </el-col>
        <el-form-item :span="24">
          <el-input
            type="textarea"
            v-model="
              dynamicValidateForm_2.graduation_requirement_list[9]
                .graduation_requirement_content
            "
          ></el-input>
        </el-form-item>
        <el-form-item
          v-for="(target_2, index) in dynamicValidateForm_2
            .graduation_requirement_list[9].graduation_subrequirement"
          :label="'分指标' + (index + 1)"
          :key="index"
          :prop="target_2.graduation_subrequirement_content"
          :rules="{
            required: true,
            message: '分指标不能为空',
            trigger: 'blur'
          }"
        >
          <el-col :span="17" style="text-align: left">
            <el-input
              v-model="target_2.graduation_subrequirement_content"
            ></el-input>
          </el-col>
          <el-col :span="5">
            <el-button @click.prevent="removeDomain_2(target_2, 9)"
              >删除</el-button
            >
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button @click="addDomain_2(9)">添加分指标</el-button>
        </el-form-item>
        <el-divider></el-divider>
      </div>

      <!-- 毕业要求11-项目管理 -->
      <div>
        <el-col :span="24" style="text-align: left">
          毕业要求11-项目管理
        </el-col>
        <el-form-item :span="24">
          <el-input
            type="textarea"
            v-model="
              dynamicValidateForm_2.graduation_requirement_list[10]
                .graduation_requirement_content
            "
          ></el-input>
        </el-form-item>
        <el-form-item
          v-for="(target_2, index) in dynamicValidateForm_2
            .graduation_requirement_list[10].graduation_subrequirement"
          :label="'分指标' + (index + 1)"
          :key="index"
          :prop="target_2.graduation_subrequirement_content"
          :rules="{
            required: true,
            message: '分指标不能为空',
            trigger: 'blur'
          }"
        >
          <el-col :span="17" style="text-align: left">
            <el-input
              v-model="target_2.graduation_subrequirement_content"
            ></el-input>
          </el-col>
          <el-col :span="5">
            <el-button @click.prevent="removeDomain_2(target_2, 10)"
              >删除</el-button
            >
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button @click="addDomain_2(10)">添加分指标</el-button>
        </el-form-item>
        <el-divider></el-divider>
      </div>

      <!-- 毕业要求12-终身学习 -->
      <div>
        <el-col :span="24" style="text-align: left">
          毕业要求12-终身学习
        </el-col>
        <el-form-item :span="24">
          <el-input
            type="textarea"
            v-model="
              dynamicValidateForm_2.graduation_requirement_list[11]
                .graduation_requirement_content
            "
          ></el-input>
        </el-form-item>
        <el-form-item
          v-for="(target_2, index) in dynamicValidateForm_2
            .graduation_requirement_list[11].graduation_subrequirement"
          :label="'分指标' + (index + 1)"
          :key="index"
          :prop="target_2.graduation_subrequirement_content"
          :rules="{
            required: true,
            message: '分指标不能为空',
            trigger: 'blur'
          }"
        >
          <el-col :span="17" style="text-align: left">
            <el-input
              v-model="target_2.graduation_subrequirement_content"
            ></el-input>
          </el-col>
          <el-col :span="5">
            <el-button @click.prevent="removeDomain_2(target_2, 11)"
              >删除</el-button
            >
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button @click="addDomain_2(11)">添加分指标</el-button>
        </el-form-item>
        <el-divider></el-divider>
      </div>
    </el-form>
    <el-button class="nextButton" @click="clickNext">下一步 </el-button>
  </div>
</template>

<script>
export default {
  name: "Step_2_AddGraduationRequirements",
  props: ["active", "next"],
  data() {
    return {
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
      }
    };
  },
  methods: {
    /**
     * @description:
     * @param {*} item
     * @param {*} num
     * @return {*}
     */
    removeDomain_2(item, num) {
      // this.dynamicValidateForm_2.graduation_requirement_list =
      //     this.dynamicValidateForm_2
      //         .graduation_requirement_list
      //             .filter(i=>i.graduation_requirement_content!==item.graduation_requirement_content)
      var index = this.dynamicValidateForm_2.graduation_requirement_list[
        num
      ].graduation_subrequirement.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm_2.graduation_requirement_list[
          num
        ].graduation_subrequirement.splice(index, 1);
      }
      for (
        var i = 0;
        i <
        this.dynamicValidateForm_2.graduation_requirement_list[num]
          .graduation_subrequirement.length;
        i++
      ) {
        var temp = i + 1;
        this.dynamicValidateForm_2.graduation_requirement_list[
          num
        ].graduation_subrequirement[
          i
        ].graduation_subrequirement_no = temp.toString();
      }
      // console.log('test', this.dynamicValidateForm_2)
    },

    /**
     * @description:
     * @param {*} num
     * @return {*}
     */
    addDomain_2(num) {
      this.dynamicValidateForm_2.graduation_requirement_list[
        num
      ].graduation_subrequirement.push({
        graduation_subrequirement_no: "",
        graduation_subrequirement_content: ""
      });
      for (
        var i = 0;
        i <
        this.dynamicValidateForm_2.graduation_requirement_list[num]
          .graduation_subrequirement.length;
        i++
      ) {
        var temp = i + 1;
        this.dynamicValidateForm_2.graduation_requirement_list[
          num
        ].graduation_subrequirement[
          i
        ].graduation_subrequirement_no = temp.toString();
      }
      // console.log('test', this.dynamicValidateForm_2)
    },

    /**
     * @description:
     * @param {*}
     * @return {*}
     */
    clickNext() {
      this.$emit("next", this.dynamicValidateForm_2);
    }

    // returnButton() {
    //   this.$emit("returnPage", this.dynamicValidateForm_2);
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
