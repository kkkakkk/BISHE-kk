<template>
    <div>
        <div v-if="currentPage==1">
            <div class="CourseInitialSteps" >
                <el-steps :active="0">
                <el-step description="设置课程目标与毕业要求分指标的支撑关系"></el-step>
                <el-step description="设置能力项对课程目标的支撑关系"></el-step>
                <el-step description="设置考核任务对能力项的匹配关系"></el-step>
                </el-steps>
            </div>
            <br>
            <div class="SetCourseTarget" style="padding-bottom: 40px">
          <div style="text-align: center;color: rgb(37, 59, 85);font-size: 14px;margin: 10px auto;font-weight: 700;"
          >
            设置课程目标对毕业要求分指标的支撑关系
          </div>
          <el-divider></el-divider>

          <div >
            <el-table
              :data="tableData"        
              border 
              style="width: 100%"
              :cell-style="{ borderColor:'rgb(159,181,203)'  }"
              :header-cell-style="{ background: 'rgb(234,238,244)',borderColor:'rgb(159,181,203)' }"
              :row-style="tableRowStyle"
            >
              <el-table-column
                prop="BianHao"
                label="毕业要求编号"
                width="120"
                header-align="center"
              >
              </el-table-column>

              <el-table-column
                prop="FenZhiBiao"
                label="毕业要求分指标"
                width="auto"
                min-width="200"
                header-align="center"
              >
              </el-table-column>

              <el-table-column     
                v-for="(domain, index) in dynamicValidateForm.domains"
                :label="'课程目标' + (index + 1)"
                :key="domain.key"    
                prop="value"     
                :rules="{
                required: true,
                message: '请选择支撑关系',
                  trigger: 'blur',
                  }"
              >
                <template slot-scope="scope">
                 <el-select v-model="scope.row.value[index]" placeholder="" class="myStyle">
                    <el-option 
                      v-for="item in strengthOptions" 
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                 </el-select>
                </template>
              </el-table-column>
            </el-table>
            {{tableData}}
            <br>
          </div>
          <div><el-button type="primary" @click=" PagePlus()">提交</el-button></div>
            </div>
            <div class="SetCourseTarget" style="margin-top:5px">
            <div style="height:30px; width:60px; background-color:rgb(59,105,152); padding:5px; border-radius:3px; margin-bottom:10px">
                <div style="color:white; font-size: 10px; margin:0 auto; text-align: center; margin:8px auto; font-weight:700" class="setFontSize10">课程目标</div>
                <div style="height:1px; width:900px; background-color:rgb(59,105,152); margin-top:10px"></div>
            </div>
            <div style="margin-left:20px; padding-top:10px">
                <div v-for="(item,index) in dynamicValidateForm.domains" :key="item.value">
                <!-- 使用course_no作为编号的场合 -->
                <!-- <span class="setFontSize10">课程目标{{item.no}}:{{item.value}} </span> -->
                <!-- 不使用后端课程编号而是使用index计数的场合 -->
                <span class="setFontSize10">课程目标{{index+1}}:{{item.value}} </span>
                </div>
            </div>
{{dynamicValidateForm}}
            </div>
      </div>
        <div v-if="currentPage==2">
             <div class="CourseInitialSteps" >
                <a style="font-size: smaller; float: right; cursor:pointer"  @click="PageMinus()">返回</a>
                <el-steps :active="1">
                <el-step description="设置课程目标与毕业要求分指标的支撑关系"></el-step>
                <el-step description="设置能力项对课程目标的支撑关系"></el-step>
                <el-step description="设置考核任务对能力项的匹配关系"></el-step>
                </el-steps>
            </div>
            <br>
             <div class="SetCourseTarget" style="padding-bottom: 40px">
            <div style="text-align: center;color: rgb(37, 59, 85);font-size: 14px;margin: 10px auto;font-weight: 700;">
                设置能力项对课程目标的支撑关系
            </div>
            <el-divider></el-divider>

            <el-table  :data="abilityTargetRelationForm.domains" border style="width: 100%" 
              :cell-style="{ borderColor:'rgb(159,181,203)'  }"
              :header-cell-style="{ background: 'rgb(234,238,244)',borderColor:'rgb(159,181,203)' }"
              :row-style="tableRowStyle">
              <el-table-column
                prop="num"
                label="序号"
                width="100"
                header-align="center"
              >

              </el-table-column>

              <el-table-column
                prop="abilityName"
                label="能力项名称"
                width="165"
                header-align="center"
              >

              </el-table-column>

              <el-table-column
                v-for="(domain,index) in dynamicValidateForm.domains"
                :key="domain.key"
                prop="targetRelation"
                :label="'课程目标'+ (index + 1)"
                header-align="center"
              >
                <template slot-scope="scope">
                 <el-select v-model="scope.row.targetRelation[index]" placeholder="" class="myStyle">
                    <el-option 
                      v-for="item in strengthOptions" 
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                 </el-select>
                </template>
              </el-table-column>

            </el-table>
            <br>
            <div><el-button type="primary" @click=" PagePlus()">提交</el-button></div>
            {{abilityTargetRelationForm}}
          </div>
          <div class="SetCourseTarget" style="margin-top:5px">
            <div style="height:30px; width:60px; background-color:rgb(59,105,152); padding:5px; border-radius:3px">
              <div style="color:white; font-size: 10px; text-align: center; margin:8px auto; font-weight:700">课程目标</div>
              <div style="height:1px; width:900px; background-color:rgb(59,105,152); margin-top:10px"></div>
            </div>
            <div style="margin-left:20px; margin-bottom:20px;padding-top:15px;font-size:10px">
              <div v-for="(item,index) in dynamicValidateForm.domains" :key="item.value">
                {{index+1}}:{{item.value}} 
              </div>
            </div>
            

            <div style="height:30px; width:60px; background-color:rgb(59,105,152); padding:5px; border-radius:3px">
              <div style="color:white; font-size: 10px; text-align: center; margin:8px auto; font-weight:700">能力项</div>
              <div style="height:1px; width:900px; background-color:rgb(59,105,152); margin-top:10px"></div>
            </div>
            <div style="margin-left:20px; padding-top:15px; font-size:10px">
              <div v-for="(item,index) in abilityForm.domains" :key="item.value">
                {{index+1}}:{{item.name}}:{{item.description}}
              </div>
            </div>

        

        </div>
        </div>
        <div v-if="currentPage==3">
          <div class="CourseInitialSteps" >
                <a style="font-size: smaller; float: right; cursor:pointer"  @click="PageMinus()">返回</a>
                <el-steps :active="2">
                <el-step description="设置课程目标与毕业要求分指标的支撑关系"></el-step>
                <el-step description="设置能力项对课程目标的支撑关系"></el-step>
                <el-step description="设置考核任务对能力项的匹配关系"></el-step>
                </el-steps>
            </div>
            <br>
          <div class="SetCourseTarget" style="padding-bottom:100px">
          <div
            style="
              text-align: center;
              color: rgb(37, 59, 85);
              font-size: 14px;
              margin-top: 5px;
              font-weight: 700;
            "
          >
            设置考核任务对能力项的匹配关系
          </div>
          <el-divider></el-divider>
          <!-- 表格部分 -->
          <el-table  
              :data="KaoHeAbilityForm.domains" border style="width: 100%" 
              :cell-style="{ borderColor:'rgb(159,181,203)'  }"
              :header-cell-style="{ background: 'rgb(234,238,244)',borderColor:'rgb(159,181,203)' }"
              :row-style="tableRowStyle">
                <el-table-column
                prop="num"
                label="序号"
                width="100"
                header-align="center"
              >
              </el-table-column>

              <el-table-column
                prop="missionName"
                label="考核任务名称"
                width="100"
                header-align="center"
              >
              </el-table-column>

              <el-table-column
                 v-for="(item,index) in abilityForm.domains"
                :key="item.key"
                prop="missionAbRelation"
                :label="'能力' + (index+1) + '-' + abilityForm.domains[index].name"
                header-align="center"
              >
                <template slot-scope="scope">
                <el-select v-model="scope.row.missionAbRelation[index]" placeholder="" class="myStyle">
                    <el-option 
                      v-for="item in strengthOptions" 
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                 </el-select>
                </template>
              </el-table-column>

              
            </el-table>
            {{KaoHeAbilityForm}}
            <el-button type="primary" @click="createJson(); myajax()">提交</el-button>
         
      </div>  
        </div>

    </div>
</template>

<script>
import { createLogger } from 'vuex';
import ContextExclusionPlugin from 'webpack/lib/ContextExclusionPlugin';
export default {
    name: 'EditSupport',

    data() {
        return {
            currentPage:1,
            abilityForm:{
              domains:[],
            },//能力列表 
             dynamicValidateForm: {//课程目标
                domains: [
                    // {value:""},
                    ],
            },
            tableData:[],//设置课程目标对毕业要求分指标的支撑关系
            abilityTargetRelationForm:{//设置能力项对课程目标的支撑关系
                domains:[],},
            strengthOptions:[{//强度选项
            value:"强",
            label:"强"
            },{
            value:"较强",
            label:"较强"
            },
            {
            value:"中",
            label:"中"
            },{
            value:"较弱",
            label:"较弱"
            },{
            value:"弱",
            label:"弱"
            },{
            value:"无",
            label:"无"
            }],
            KaoHeAbilityForm:{domains:[],}//
        };
    },
    created(){
        var ajaxObj = new XMLHttpRequest();
            let that=this;
            ajaxObj.open('get', 'http://116.56.140.195:3000/mock/11/course/all_info');
            ajaxObj.send();
            ajaxObj.onreadystatechange = function () {
            // 为了保证 数据 完整返回，我们一般会判断 两个值
            if (ajaxObj.readyState == 4 && ajaxObj.status == 200) {
                var jsonObj=eval('('+ajaxObj.responseText+')');
                console.log(jsonObj.data);        
                for(let i=0;i<jsonObj.data.course_objective_list.length;i++){//提取课程目标&课程编号dynamicValidateForm
                    that.dynamicValidateForm.domains.push({
                        value:jsonObj.data.course_objective_list[i].course_objective_content,
                        no:jsonObj.data.course_objective_list[i].course_objective_no
                    })
                }
                for(let i=0;i<jsonObj.data.course_objective_support_graduation_subrequirement_list.length;i++){//提取支撑关系tableData
                    that.tableData.push({
                        BianHao:jsonObj.data.course_objective_support_graduation_subrequirement_list[i].graduation_subrequirement_no,
                        FenZhiBiao:jsonObj.data.course_objective_support_graduation_subrequirement_list[i].graduation_subrequirement_content,
                        value:[jsonObj.data.course_objective_support_graduation_subrequirement_list[i].support]//此处应填入与课程no相对应数组位置
                    })
                }
                for(let i=0;i<jsonObj.data.course_ability_list.length;i++){//提取能力列表abilityForm
                    that.abilityForm.domains.push({
                        name:jsonObj.data.course_ability_list[i].course_ability_name,
                        description:jsonObj.data.course_ability_list[i].course_ability_content,
                        no:jsonObj.data.course_ability_list[i].course_ability_no//能力序号,意义不明
                    })
                }
                for(let i=0;i<jsonObj.data.course_ability_support_course_objective_list.length;i++){//提取能力项对课程目标的支撑矩阵abilityTargetRelationForm
                    that.abilityTargetRelationForm.domains.push({
                        num:i+1,
                        abilityName:jsonObj.data.course_ability_support_course_objective_list[i].course_ability_no,
                        targetRelation:[jsonObj.data.course_ability_support_course_objective_list[i].support]
                    })
                }
                for(let i=0;i<jsonObj.data.course_exam_support_course_objective_list.length;i++){
                  console.log("aaa")
                  that.KaoHeAbilityForm.domains.push({
                    num:i+1,
                    missionName:jsonObj.data.course_exam_support_course_objective_list[i].exam_title,
                    missionAbRelation:[jsonObj.data.course_exam_support_course_objective_list[i].support]
                  })
                }

          }
        }
        
    },
    mounted() {
        
    },
    methods: {
    tableRowStyle({ row, rowIndex }) {
      let rowBg={};
      rowBg.background="rgb(234,238,244)"
      return rowBg
    },
    PagePlus(){
        this.currentPage++;
    },
    PageMinus(){
        this.currentPage--;
    }
    },
};
</script>

<style scoped>
.CourseInitialSteps {
  padding-left: 10%;
}
.SetCourseTarget {
  border: 2px solid;
  border-radius: 5px;
  border-color: rgb(139, 165, 192);
  padding: 10px;
  background-color: rgb(229,235,241);
  position: relative;
}
.SetCourseTarget button {
  background-color: rgb(159, 181, 203);
  border-color: rgb(159, 181, 203);
  float: right;
  display: block;
}
.myStyle>>>.el-input__inner{
  border-color: transparent;
  background-color: rgb(234,238,244);
  text-align: center;
} 
</style>