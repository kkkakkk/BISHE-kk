<template>
  <div>
    <!-- 课程信息初始化1 -->
    <div v-if="currentPage==1">
      <div class="CourseInitialSteps" >
        <el-steps :active="0">
          <el-step description="设置课程目标"></el-step>
          <el-step
            description="设置课程目标与毕业要求分指标的支撑关系"
          ></el-step>
          <el-step description="设置课程能力项"></el-step>
          <el-step description="设置考核方式"></el-step>
          <el-step description="设置能力项对课程目标的支撑关系"></el-step>
          <el-step description="设置考核任务对能力项的匹配关系"></el-step>
        </el-steps>
      </div>
      <br>
      <div class="SetCourseTarget">
        <el-button type="primary" icon="el-icon-plus" style="padding: 10px 15px; font-size:10px" @click="getHistoryTarget();firstPageDialogVisible=true"
          >导入历史课程信息</el-button
        >
        <div
          style="
            text-align: center;
            color: rgb(37, 59, 85);
            font-size: 14px;
            position: absolute;
            left: 42%;
            margin-top: 5px;
            font-weight: 700; 
          "
        >
          设置课程目标
        </div>
        
        <!-- 导入历史课程信息对话框 -->
        <el-dialog
          title="选择历史课程信息"
          :visible.sync="firstPageDialogVisible"
          width="70%"
          center
          :modal=false>
          <el-table :data="historyTargetTable">
            <el-table-column property="num" label="序号" width="150"></el-table-column>
            <el-table-column property="targetName" label="课程目标" width="200"></el-table-column>
            <el-table-column property="lastUsedYear" label="最后使用年份"></el-table-column>
            <el-table-column property="selected" label="选择">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.selected"></el-checkbox>
              </template>
            </el-table-column>
          </el-table>
          <span slot="footer" class="dialog-footer" >
            <el-button type="primary" @click="firstPageDialogVisible = false; importHistoryTarget()" style="float:none; display:inline-block">确 定</el-button>
            <el-button @click="firstPageDialogVisible = false" style="float:none; display:inline-block">取 消</el-button>
            
          </span>
        </el-dialog>
        <el-divider id="FirstDivider"></el-divider>
        <!-- 表单部分 -->
        <el-form
          :model="dynamicValidateForm"
          ref="dynamicValidateForm"
          label-width="100px"
          class="demo-dynamic"
        >
          <el-form-item
            v-for="(domain, index) in dynamicValidateForm.domains"
            :label="'课程目标' + (index + 1)"
            :key="domain.key"
            :prop="'domains.' + index + '.value'"
            :rules="{
              required: true,
              message: '请输入内容',
              trigger: 'blur',
            }"
          >
            <el-button
              @click.prevent="removeDomain(domain)"
              style="float: right"
              >删除</el-button
            ><el-input
              v-model="domain.value"
              style="display: block; width: 90%"
              placeholder="请输入课程目标"
            ></el-input>
          </el-form-item>
          <div style="padding-left:23px"><el-button @click="addDomain" style="float: left; padding">添加</el-button></div>
          <el-form-item>
            <el-button type="primary" @click="submitForm('dynamicValidateForm');"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
        <br>
      </div>
    </div>
    <!-- 课程信息初始化2 -->
    <div v-if="currentPage==2">
      <div class="CourseInitialSteps">
        <a style="font-size: smaller; float: right; cursor:pointer"  @click="PageMinus()">返回</a>
        <el-steps :active="1">
          <el-step description="设置课程目标"></el-step>
          <el-step
            description="设置课程目标与毕业要求分指标的支撑关系"
          ></el-step>
          <el-step description="设置课程能力项"></el-step>
          <el-step description="设置考核方式"></el-step>
          <el-step description="设置能力项对课程目标的支撑关系"></el-step>
          <el-step description="设置考核任务对能力项的匹配关系"></el-step>
        </el-steps>
      </div>
      <br>
      <div>
        <div class="SetCourseTarget" style="padding-bottom: 40px">
          <div
            style="
              text-align: center;
              color: rgb(37, 59, 85);
              font-size: 14px;
              margin: 10px auto;
              font-weight: 700;             
            "
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
                width="400"
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
            <!-- {{tableData}} -->
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
            <div v-for="(item,index) in courseTargetArr" :key="item.value">
              <span class="setFontSize10">课程目标{{index+1}}:{{item.value}} </span>
            </div>
          </div>

        </div>
      </div>
    </div>
    <!-- 课程信息初始化3 -->
    <div v-if="currentPage==3">
      <div>
        <div class="CourseInitialSteps">
          <a style="font-size: smaller; float: right;  cursor:pointer"  @click="PageMinus()">返回</a>
          <el-steps :active="2">
            <el-step description="设置课程目标"></el-step>
            <el-step description="设置课程目标与毕业要求分指标的支撑关系"></el-step>
            <el-step description="设置课程能力项"></el-step>
            <el-step description="设置考核方式"></el-step>
            <el-step description="设置能力项对课程目标的支撑关系"></el-step>
            <el-step description="设置考核任务对能力项的匹配关系"></el-step>
          </el-steps>
        </div>
        <br>
        <div class="SetCourseTarget">
        <el-button type="primary" icon="el-icon-plus" style="padding: 10px 15px" @click="getHistoryAbility(); thirdPageDialogVisible=true">导入历史课程信息</el-button>
        <!-- 导入历史课程信息对话框 -->
        <el-dialog
          title="选择历史课程能力项"
          :visible.sync="thirdPageDialogVisible"
          width="70%"
          center
          :modal=false>
          <el-table :data="historyAbilityTable">
            <el-table-column property="num" label="序号" width="150"></el-table-column>
            <el-table-column property="abilityType" label="能力项" width="150"></el-table-column>
            <el-table-column property="abilityName" label="能力项描述" width="200"></el-table-column>
            <el-table-column property="lastUsedYear" label="最后使用年份"></el-table-column>
            <el-table-column property="selected" label="选择">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.selected"></el-checkbox>
              </template>
            </el-table-column>
          </el-table>
          <span slot="footer" class="dialog-footer" >
            <el-button type="primary" @click="thirdPageDialogVisible = false; importHistoryAbility()" style="float:none; display:inline-block">确 定</el-button>
            <el-button @click="thirdPageDialogVisible = false" style="float:none; display:inline-block">取 消</el-button>
            
          </span>
        </el-dialog>
        <div
          style="
            text-align: center;
            color: rgb(37, 59, 85);
            font-size: 14px;
            position: absolute;
            left: 42%;
            margin-top: 5px;
            font-weight:700;
          "
        >
          设置课程能力项
        </div>
        <el-divider id="FirstDivider"></el-divider>

        <el-form
          :model="abilityForm"
          ref="abilityForm"
          label-width="100px"
          class="demo-dynamic"
        >
          <el-form-item
            v-for="(domain, index) in abilityForm.domains"
            :label="'能力项' + (index + 1)"
            :key="domain.key"
            :prop="'domains.' + index + '.name'"
            :rules="{
              required: true,
              message: '请输入内容',
              trigger: 'blur',
            }"
          >
            <el-select v-model="domain.abilityType" style="width:126px">
              <el-option
                v-for="item in abilityTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input
              v-model="domain.name"
              style="display: inline-block; width:596px; margin-bottom:10px"
              placeholder="请输入能力项名称"
            ></el-input>
            <el-button @click.prevent="removeAbilityDomain(domain)" style="float: right">删除</el-button>
            <el-input
              v-model="domain.description"
              style="display: block; width: 726px "
              placeholder="请输入能力项描述"
            ></el-input>
          </el-form-item>
          <div style="padding-left:32px"><el-button @click="addAbilityDomain()" style="float: left">添加</el-button></div>
          <el-form-item>
            <el-button type="primary" @click=" mysubimit('abilityForm')"
              >提交</el-button
            >            
          </el-form-item>
        </el-form>
        <!-- {{abilityForm}} -->
      </div>
    </div>
    </div>
    <!-- 课程信息初始化4 -->
    <div v-if="currentPage==4">
      <div class="CourseInitialSteps">
        <a style="font-size: smaller; float: right;  cursor:pointer"  @click="PageMinus()">返回</a>
        <el-steps :active="3">
          <el-step description="设置课程目标"></el-step>
          <el-step
            description="设置课程目标与毕业要求分指标的支撑关系"
          ></el-step>
          <el-step description="设置课程能力项"></el-step>
          <el-step description="设置考核方式"></el-step>
          <el-step description="设置能力项对课程目标的支撑关系"></el-step>
          <el-step description="设置考核任务对能力项的匹配关系"></el-step>
        </el-steps>
      </div>
      <br>
      <div>
        <div class="SetCourseTarget" style="padding-bottom:70px;">
          <div
            style="
              text-align: center;
              color: rgb(37, 59, 85);
              font-size: 14px;
              margin-top: 5px;
              font-weight: 700;
            "
          >
            设置考核方式
          </div>
          <el-divider></el-divider>
          <!-- 表单区域 -->
         <el-form ref="form" :model="KaoHeForm" :rules="rules" label-width="80px">
            <el-form-item label="课程类型"  prop="KaoHeForm" class="myStyleBorderType">
                        <select class="el-input__inner" v-model="KaoHeForm.domains.type" style="width:20%; -webkit-appearance:menulist" @change="resetKaoHe">
                        <option value ="LiLun">理论课</option>
                        <option value ="LiLunShiYan">理论+实验课</option>
                        <option value ="LiLunShiJian">理论+实践(设计)课</option>
                        <option value ="ShiXun">实训课</option>
                        <option value ="ShiXi">毕业实习</option>
                        <option value ="SheJi">毕业设计</option>
                      </select>
            </el-form-item> 
            <!-- {{KaoHeForm}} -->
            <el-row v-if="KaoHeForm.domains.type=='LiLun'||KaoHeForm.domains.type=='LiLunShiYan'">
              <el-col :span="5">
                <el-form-item label="习题次数" required="required" class="myStyleBorderType">
                  <input type="number" v-model="KaoHeForm.domains.XiTi" class="el-input__inner" min="0" style="margin-right:10px"> 
                </el-form-item>
              </el-col>
              <el-col :span="5" v-show="KaoHeForm.domains.type=='LiLun'">&nbsp;</el-col>
              <el-col :span="5" v-show="KaoHeForm.domains.type=='LiLunShiYan'">
                <el-form-item label="实验次数" required="required" class="myStyleBorderType">
                  <input type="number" v-model="KaoHeForm.domains.ShiYan" class="el-input__inner" min="0"> 
                </el-form-item>
              </el-col>
              <el-col :span="1"><span>&nbsp;</span></el-col>
              <el-col :span="5">
                <el-form-item label="期中考试" required="required">
                  <input type="radio" checked="checked" v-model="KaoHeForm.domains.QiZhong" name="QiZhong" value="1" /> <span>有</span>
                  <input type="radio" v-model="KaoHeForm.domains.QiZhong" name="QiZhong" value="0" /><span>无</span>
                </el-form-item>
              </el-col>

              <el-col :span="5">
                <el-form-item label="期末考试" required="required">
                  <input type="radio" checked="checked" v-model="KaoHeForm.domains.QiMo" name="QiMo" value="1" /> <span>有</span>
                  <input type="radio" v-model="KaoHeForm.domains.QiMo" name="QiMo" value="0" /><span>无</span>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                  <el-button type="primary" @click="generateKaoHe();  submitKaohe()">提交</el-button>               
              </el-col>
            </el-row>
            <el-row v-if="KaoHeForm.domains.type=='LiLunShiJian'||KaoHeForm.domains.type=='ShiXun'||KaoHeForm.domains.type=='ShiXi'||KaoHeForm.domains.type=='SheJi'">
               <el-col :span="6">
                <el-form-item label="课程设计次数" required="required" class="myStyleBorderType changeWidth">
                  <input type="number" v-model="KaoHeForm.domains.SheJi" class="el-input__inner" min="0" style="margin-right:10px"> 
                </el-form-item> </el-col>
                <el-col :span="10" v-show="KaoHeForm.domains.type=='LiLunShiJian'">&nbsp;</el-col>
                <el-col :span="5" v-show="KaoHeForm.domains.type=='LiLunShiJian'">
                  <el-form-item label="期末考试" required="required">
                  <input type="radio" checked="checked" v-model="KaoHeForm.domains.QiMo" name="QiMo" value="1" /> <span>有</span>
                  <input type="radio" v-model="KaoHeForm.domains.QiMo" name="QiMo" value="0" /><span>无</span>
                  </el-form-item>
                </el-col>
                <el-col :span="15" v-show="KaoHeForm.domains.type=='ShiXun'||KaoHeForm.domains.type=='ShiXi'||KaoHeForm.domains.type=='SheJi'">&nbsp;</el-col>
                <el-col :span="3">
                  <el-button type="primary" @click="generateKaoHe();submitKaohe()">提交</el-button>               
              </el-col>
             
            </el-row>
          </el-form>
          
        <div v-if="abilityTableShow">
          <el-divider></el-divider>          
          <el-form>
            <!-- 表格部份 -->
            <el-table :data="KaoHeTable" border style="width: 100%" 
                      :cell-style="{ borderColor:'rgb(159,181,203)'  }"
                      :header-cell-style="{ background: 'rgb(234,238,244)',borderColor:'rgb(159,181,203)' }"
                      :row-style="tableRowStyle">
                <el-table-column
                prop="KaoHeLeiXing"
                label="考核类型"
                width="185"
                header-align="center"
              >               
              </el-table-column>

              <el-table-column
                prop="RenWuRenShu"
                label="任务人数"
                width="185"
                header-align="center"
              >
                <template slot-scope="scope">
                <el-input v-model="scope.row.RenWuRenShu" placeholder="" type="number" min="0" class="myStyle"></el-input>
                </template>
              </el-table-column>

              <el-table-column
                prop="RenWuBiaoTi"
                label="任务标题"
                width="185"
                header-align="center"
              >
                <template slot-scope="scope">
                <el-input v-model="scope.row.RenWuBiaoTi" placeholder="请输入任务标题" class="myStyle"></el-input>
                </template>
              </el-table-column>

              <el-table-column
                prop="KaiShiRiQi"
                label="开始日期"
                header-align="center"
                width="185"
              >
                <template slot-scope="scope">
                <el-input v-model="scope.row.KaiShiRiQi" placeholder="" type="date" class="myStyle"></el-input>
                </template>
              </el-table-column>

              <el-table-column
                prop="JieShuRiQi"
                label="结束日期"
                header-align="center"
              >
                <template slot-scope="scope">
                <el-input v-model="scope.row.JieShuRiQi" placeholder="" type="date" class="myStyle"></el-input>
                </template>
              </el-table-column>
            </el-table>

          </el-form>
          <el-button type="primary" @click="initialKAform(); initialATform(); PagePlus()">提交</el-button>
        </div>
       

        </div>
      </div>
 <!-- {{KaoHeTable}} -->
    </div>
    <!-- 课程信息初始化5 -->
    <div v-if="currentPage==5">
      <div class="CourseInitialSteps" >
        <a style="font-size: smaller; float: right;  cursor:pointer" @click="PageMinus()">返回</a>
        <el-steps :active="4">
          <el-step description="设置课程目标"></el-step>
          <el-step
            description="设置课程目标与毕业要求分指标的支撑关系"
          ></el-step>
          <el-step description="设置课程能力项"></el-step>
          <el-step description="设置考核方式"></el-step>
          <el-step description="设置能力项对课程目标的支撑关系"></el-step>
          <el-step description="设置考核任务对能力项的匹配关系"></el-step>
        </el-steps>
      </div>
      <br>
      <!-- 上半边框 -->
      <div>
        <div class="SetCourseTarget" style="padding-bottom:70px;">
          <div
            style="
              text-align: center;
              color: rgb(37, 59, 85);
              font-size: 14px;
              margin-top: 5px;
              font-weight: 700;
            "
          >
            设置能力项对课程目标的支撑关系
          </div>
          <el-divider></el-divider>
          <!-- 表格部分 -->
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
          <el-button type="primary" @click="createJson();  PagePlus()">提交</el-button>
        </div>
      </div>
      <!-- {{abilityTargetRelationForm}} -->
      <!-- 下半边框 -->
      <div>
        <div class="SetCourseTarget" style="margin-top:5px">
            <div style="height:30px; width:60px; background-color:rgb(59,105,152); padding:5px; border-radius:3px">
              <div style="color:white; font-size: 10px; text-align: center; margin:8px auto; font-weight:700">课程目标</div>
              <div style="height:1px; width:900px; background-color:rgb(59,105,152); margin-top:10px"></div>
            </div>
            <div style="margin-left:20px; margin-bottom:20px;padding-top:15px;font-size:10px">
              <div v-for="(item,index) in courseTargetArr" :key="item.value">
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


    </div>
    <!-- 课程信息初始化6 -->
    <div v-if="currentPage==6">
      <div class="CourseInitialSteps" >
        <a style="font-size: smaller; float: right;  cursor:pointer"  @click="PageMinus()">返回</a>
        <el-steps :active="5">
          <el-step description="设置课程目标"></el-step>
          <el-step
            description="设置课程目标与毕业要求分指标的支撑关系"
          ></el-step>
          <el-step description="设置课程能力项"></el-step>
          <el-step description="设置考核方式"></el-step>
          <el-step description="设置能力项对课程目标的支撑关系"></el-step>
          <el-step description="设置考核任务对能力项的匹配关系"></el-step>
        </el-steps>
      </div>
      <br>
      <!-- 上半框 -->
      <!-- {{KaoHeAbilityForm}} -->
      <div>
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
            <el-button type="primary" @click="createJson(); myajax()">提交</el-button>
         
      </div>    
         <!-- 下边框 -->
      <div class="SetCourseTarget" style="margin-top:5px">
             <div style="height:30px; width:60px; background-color:rgb(59,105,152); padding:5px; border-radius:3px">
              <div style="color:white; font-size: 10px;  text-align: center; margin:8px auto; font-weight:700">能力项</div>
              <div style="height:1px; width:900px; background-color:rgb(59,105,152); margin-top:10px"></div>
            </div>
            <div style="margin-left:20px; padding-top:15px; font-size:10px">
              <div v-for="(item,index) in abilityForm.domains" :key="item.value">
                {{index+1}}:{{item.name}}:{{item.description}}
              </div>
            </div>

          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "CourseInitial",
  data() {
    return {
      testJson:{},
      firstPageDialogVisible:false,
      thirdPageDialogVisible:false,
      currentPage:1,
      courseTargtLength:0,//课程目标数量
      courseTargetArr:[],//课程目标数组
      abilityTableShow:0,
      dynamicValidateForm: {//第一页表单
        domains: [
          {
            value:""
          },
        ],
      },
      strengthForm:{
        domains:[
          {
            BianHao:"",
            FenZhiBiao:"",
            value:""
          },
        ],
      },
      abilityForm:{//第三页表单
        domains:[
          {
            name:"",
            description:"",
            abilityType:0
          },
        ],
      },
      KaoHeForm:{//第四页表单
        domains:
          {
            type:"",
            XiTi:0,
            ShiYan:0,
            SheJi:0,
            QiZhong:0,
            QiMo:0,
          },
      },
      KaoHeTable:[],//第四页表格内容

      tableData: [],//第二页表单
        abilityTargetRelationForm:{//第五页表单
          domains:[
          ],
        },
        KaoHeAbilityForm:{//第六页表单
          domains:[]
        },

        rules: {
          courseType: [
            { required: true, message: '请选择课程类型', trigger: 'blur' }
          ]
          },


        options: [{
          value: '选项1',
          label: '理论课'
        }, {
          value: '选项2',
          label: '实践课'
        },
        ],

        strengthOptions:[{
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

        abilityTypeOptions:[{
          value:0,
          label:"知识类"
        },{
          value:1,
          label:"素质类"
        },{
          value:2,
          label:"能力类"
        },{
          value:3,
          label:"其他"
        },
        ],

        aruOptions:[
          {
            value:1,
            label:"A"
          },
          {
            value:2,
            label:"B"
          },
          {
            value:3,
            label:"C"
          },
          {
            value:4,
            label:"D"
          },
          {
            value:5,
            label:"E"
          },
        ],

        historyTargetTable:[],
        historyAbilityTable:[],
    };
  },
  methods: {
    PagePlus(){
      this.currentPage++;
    },
    PageMinus(){
      this.currentPage--;
    },
    myalert(){
      alert("fsfsf");
    },
    saveTargetForm(){
      this.courseTargtLength= this.dynamicValidateForm.domains.length;
      this.courseTargetArr=[].concat(this.dynamicValidateForm.domains);
    },
    submitForm(formName) {
      this.myGet();
      this.$refs[formName].validate((valid) => {
        if (valid) {        
          this.saveTargetForm();
          this.PagePlus();
          this.getReady=1;

        } else {
          alert("error submit")
          return false;
        }
      });
    },
    mysubimit(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.PagePlus();
        } else {
          alert("error submit")
          return false;
        }
      });
    },

    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: "",
        key: Date.now(),
      });
    },
    removeAbilityDomain(item){ 
      var index = this.abilityForm.domains.indexOf(item);
      if (index !== -1) {
        this.abilityForm.domains.splice(index, 1);
      }
    },
    addAbilityDomain(){
        this.abilityForm.domains.push({
        abilityType:0,
        name:"",
        key: Date.now(),
      });
    },
    submitKaohe(){
      this.abilityTableShow=1;
    },
    resetKaoHe(){
      this.KaoHeForm.domains.XiTi=0;
      this.KaoHeForm.domains.ShiYan=0;
      this.KaoHeForm.domains.SheJi=0;
      this.KaoHeForm.domains.QiZhong=0;
      this.KaoHeForm.domains.QiMo=0;
    },
    generateKaoHe(){
      this.KaoHeTable=[];
      let xitinum= this.KaoHeForm.domains.XiTi;
      let shiyannum=this.KaoHeForm.domains.ShiYan;
      let shejinum=this.KaoHeForm.domains.SheJi;
      let qizhongnum=this.KaoHeForm.domains.QiZhong;
      let qimonum=this.KaoHeForm.domains.QiMo;
      if(xitinum){ 
        for(let i=1;i<=xitinum;i++){
          this.KaoHeTable.push(this.newkaohetable("习题"+i,1,"","",""));
        }
      }
      if(shiyannum){ 
        for(let i=1;i<=shiyannum;i++){
          this.KaoHeTable.push(this.newkaohetable("实验"+i,1,"","",""));
        }
      }
      if(shejinum){ 
        for(let i=1;i<=shejinum;i++){
          this.KaoHeTable.push(this.newkaohetable("课程设计"+i,1,"","",""));
        }
      }
      if(qizhongnum){ 
        for(let i=1;i<=qizhongnum;i++){
          this.KaoHeTable.push(this.newkaohetable("期中考试",1,"期中考试","",""));
        }
      }
      if(qimonum){ 
        for(let i=1;i<=qimonum;i++){
          this.KaoHeTable.push(this.newkaohetable("期末考试",1,"期末考试","",""));
        }
      }
    },
    newkaohetable(a,b,c,d,e){
      let newtable={
        KaoHeLeiXing:a,
        RenWuRenShu:b,
        RenWuBiaoTi:c,
        KaiShiRiQi:d,
        JieShuRiQi:e
        };
      return newtable;
    },
    initialATform(){//初始化第五页表单
      let count=1;
      let abilityLength=this.abilityForm.domains.length;
      this.abilityTargetRelationForm.domains=[];
      for(count;count<=abilityLength;count++){//导入每个能力项
      let targetRelation=new Array(this.dynamicValidateForm.domains.length).fill("无");
        this.abilityTargetRelationForm.domains.push({
          num:count,
          abilityName:this.abilityForm.domains[count-1].name,
          targetRelation
        })
      }
      if(this.KaoHeForm.domains.QiZhong){//如果有期中考试
      let targetRelation=new Array(this.dynamicValidateForm.domains.length).fill("无");
        count++;
        this.abilityTargetRelationForm.domains.push({
          num:"期中考试",  
          abilityName:"期中考试",
          targetRelation
        })
        console.log("QIZHONG DONE")
      }
      if(this.KaoHeForm.domains.QiMo){//如果有期中考试
      let targetRelation=new Array(this.dynamicValidateForm.domains.length).fill("无");
        count++;
        this.abilityTargetRelationForm.domains.push({
          num:"期末考试",  
          abilityName:"期末考试",
          targetRelation
        })
        console.log("QIMO DONE")
      }
    },
    initialKAform(){//初始化第六页表单--考核任务对能力项的匹配关系
      let count=1;
      let missionNum=this.KaoHeTable.length;
      this.KaoHeAbilityForm.domains=[];
      console.log("missionnum==" + missionNum)
      for(count;count<=missionNum;count++){
        let missionAbRelation=new Array(this.abilityForm.domains.length).fill("无");
        this.KaoHeAbilityForm.domains.push({
          num:count,
          missionName:this.KaoHeTable[count-1].RenWuBiaoTi,
          missionAbRelation
        })
      }
    },

    createJson(){//生成json
      let that=this;
      var json = {
        course_objective_list:[],//课程目标list
        course_id:"",
        course_objective_support_graduation_subrequirement_list:[
          {
          graduation_subrequirement_id: "PKU10085-SE080902-2019-GR001-SGR01",
            course_objective_list: [
            {
              course_objective_no: 1,
              support: 3
            }
            ]
          },
          {
          graduation_subrequirement_id: "PKU10085-SE080902-2019-GR001-SGR02",
            course_objective_list: [
            {
              course_objective_no: 2,
              support: 2
            },
            {
              course_objective_no: 1,
              support: 1
            }
            ]
          }
        ],//课程目标对毕业要求分指标的支撑list
        course_ability_list:[],//能力项列表
        assess_list:[],//考核列表
        ability_support_course_objective_list:[],//能力项对课程目标的支撑
        exam_support_course_objective_list:[],//考试对课程目标的支撑
        assessment_ability:[],//考核考察了哪几项能力
        course_assess_type:""
      };
      for(let indeX=1;indeX<=this.dynamicValidateForm.domains.length;indeX++){//course_objective_list
        json.course_objective_list.push({
          course_objective_no:indeX,
          course_objective_content:this.dynamicValidateForm.domains[indeX-1].value
        })
      }
      json.course_id="PKU10085-SE080902-0036-2019A-002";
      for(let indeX=1;indeX<=this.abilityForm.domains.length;indeX++){//能力列表course_ability_list
        json.course_ability_list.push({
          ability_name:this.abilityForm.domains[indeX-1].name,
          ability_content:this.abilityForm.domains[indeX-1].description,
          ability_no:indeX,
          ability_type:this.abilityForm.domains[indeX-1].abilityType
        })
      }
      var currentAssess=0;//assess_list
      if(this.KaoHeForm.domains.XiTi){
        for(let i=0;i<this.KaoHeForm.domains.XiTi;i++){
          json.assess_list.push({
            assessment_type:0,
            group_people_count:this.KaoHeTable[currentAssess].RenWuRenShu,
            assessment_title:this.KaoHeTable[currentAssess].RenWuBiaoTi,
            start_date:this.KaoHeTable[currentAssess].KaiShiRiQi,
            end_date:this.KaoHeTable[currentAssess].JieShuRiQi
            
          })
          currentAssess++;
        }
      }
      if(this.KaoHeForm.domains.ShiYan){
        for(let i=0;i<this.KaoHeForm.domains.ShiYan;i++){
          json.assess_list.push({
            assessment_type:1,
            group_people_count:this.KaoHeTable[currentAssess].RenWuRenShu,
            assessment_title:this.KaoHeTable[currentAssess].RenWuBiaoTi,
            start_date:this.KaoHeTable[currentAssess].KaiShiRiQi,
            end_date:this.KaoHeTable[currentAssess].JieShuRiQi
          })
          currentAssess++;
        }
      }
      if(this.KaoHeForm.domains.SheJi){
        for(let i=0;i<this.KaoHeForm.domains.SheJi;i++){
          json.assess_list.push({
            assessment_type:2,
            group_people_count:this.KaoHeTable[currentAssess].RenWuRenShu,
            assessment_title:this.KaoHeTable[currentAssess].RenWuBiaoTi,
            start_date:this.KaoHeTable[currentAssess].KaiShiRiQi,
            end_date:this.KaoHeTable[currentAssess].JieShuRiQi
          })
          currentAssess++;
        }
      }
      if(this.KaoHeForm.domains.QiZhong){
          json.assess_list.push({
            assessment_type:3,
            group_people_count:this.KaoHeTable[currentAssess].RenWuRenShu,
            assessment_title:this.KaoHeTable[currentAssess].RenWuBiaoTi,
            start_date:this.KaoHeTable[currentAssess].KaiShiRiQi,
            end_date:this.KaoHeTable[currentAssess].JieShuRiQi
          })
          currentAssess++;
      }
      if(this.KaoHeForm.domains.QiMo){
          json.assess_list.push({
            assessment_type:4,
            group_people_count:this.KaoHeTable[currentAssess].RenWuRenShu,
            assessment_title:this.KaoHeTable[currentAssess].RenWuBiaoTi,
            start_date:this.KaoHeTable[currentAssess].KaiShiRiQi,
            end_date:this.KaoHeTable[currentAssess].JieShuRiQi
          })
          currentAssess++;
      }
      let examCnt =parseInt(this.KaoHeForm.domains.QiZhong)+parseInt(this.KaoHeForm.domains.QiMo);//能力项对课程目标的支撑
      console.log(examCnt);
        for(let i=0;i<this.abilityTargetRelationForm.domains.length-examCnt;i++){
          for(let j=0;j<this.abilityTargetRelationForm.domains[i].targetRelation.length;j++){
            json.ability_support_course_objective_list.push({
              course_objective_no:  j+1,
              course_ability_no:  i+1,
              support: this.abilityTargetRelationForm.domains[i].targetRelation[j]
           })
          }
        }       
      if(examCnt==1){//考试对课程目标的支撑
      for(let j=0;j<this.abilityTargetRelationForm.domains[this.abilityTargetRelationForm.domains.length-1].targetRelation.length;j++)
        json.exam_support_course_objective_list.push({
          course_objective_no: j+1 ,//课程目标的序号
          assessment_title: this.abilityTargetRelationForm.domains[this.abilityTargetRelationForm.domains.length-1].abilityName,
          support: this.abilityTargetRelationForm.domains[this.abilityTargetRelationForm.domains.length-1].targetRelation[j]
        })
      }
      else if(examCnt==2){
        for(let j=0;j<this.abilityTargetRelationForm.domains[this.abilityTargetRelationForm.domains.length-2].targetRelation.length;j++){
          json.exam_support_course_objective_list.push({
          course_objective_no: j+1 ,//课程目标的序号
          assessment_title: this.abilityTargetRelationForm.domains[this.abilityTargetRelationForm.domains.length-2].abilityName,
          support: this.abilityTargetRelationForm.domains[this.abilityTargetRelationForm.domains.length-2].targetRelation[j]
          })
        }
        for(let j=0;j<this.abilityTargetRelationForm.domains[this.abilityTargetRelationForm.domains.length-1].targetRelation.length;j++){
          json.exam_support_course_objective_list.push({
          course_objective_no: j+1 ,//课程目标的序号
          assessment_title: this.abilityTargetRelationForm.domains[this.abilityTargetRelationForm.domains.length-1].abilityName,
          support: this.abilityTargetRelationForm.domains[this.abilityTargetRelationForm.domains.length-1].targetRelation[j]
          })
        }
      }
      
      for(let i=0;i<this.KaoHeAbilityForm.domains.length-examCnt;i++){
        for(let j=0;j<this.KaoHeAbilityForm.domains[i].missionAbRelation.length;j++)       
          json.assessment_ability.push({
            assessment_title: this.KaoHeAbilityForm.domains[i].missionName,
            course_ability_no: j+1,
            support: this.KaoHeAbilityForm.domains[i].missionAbRelation[j]
          })
      }
      
      if(this.KaoHeForm.domains.type=="LiLun") json.course_assess_type="理论课"
      else if(this.KaoHeForm.domains.type=="LiLunShiYan")json.course_assess_type="理论+实验课"
      else if(this.KaoHeForm.domains.type=="LiLunShiJian")json.course_assess_type="理论+实践(设计)课"
      else if(this.KaoHeForm.domains.type=="ShiXun")json.course_assess_type="实训课"
      else if(this.KaoHeForm.domains.type=="ShiXi")json.course_assess_type="毕业实习"
      else if(this.KaoHeForm.domains.type=="SheJi")json.course_assess_type="毕业设计"

      this.testJson=JSON.stringify(json);
    },

    tableRowStyle({ row, rowIndex }) {
      let rowBg={};
      rowBg.background="rgb(234,238,244)"
      return rowBg
    },
    myajax(){//post
      var xhr = new XMLHttpRequest();
      xhr.open('post', 'http://116.56.140.195:3000/mock/11/teaching_process/course');
       xhr.setRequestHeader("Content-type", "application/json");
       xhr.send(this.testJson);
       xhr.onreadystatechange = function () {
        // 这步为判断服务器是否正确响应
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText);
            
        }
       
      };
      console.log(this.testJson)
    },
    myGet(){
        var ajaxObj = new XMLHttpRequest();
        var tmp=[];
        let that=this;
        ajaxObj.open('get', 'http://116.56.140.195:3000/mock/11/teaching_process/course_graduation_subrequirements');
        ajaxObj.send();
        ajaxObj.onreadystatechange = function () {
            // 为了保证 数据 完整返回，我们一般会判断 两个值
          if (ajaxObj.readyState == 4 && ajaxObj.status == 200) {
                var jsonObj=eval('('+ajaxObj.responseText+')');
                // console.log(jsonObj.data);
                for(let i=0;i<jsonObj.data.graduation_subrequirement_list.length;i++){
                  // console.log(jsonObj.data.graduation_subrequirement_list)
                  tmp.push({
                    BianHao: jsonObj.data.graduation_subrequirement_list[i].graduation_subrequirement_no,
                    FenZhiBiao: jsonObj.data.graduation_subrequirement_list[i].graduation_subrequirement_content,
                    value: []
                  })                  
                }           
              that.tableDataInitial(tmp);          
          }
        }   
    },
    tableDataInitial(tmp){
        this.tableData=[].concat(tmp);  
    },
    getHistoryTarget(){
      var ajaxObj = new XMLHttpRequest();
        var tmp=[];
        let that=this;
        ajaxObj.open('get', 'http://116.56.140.195:3000/mock/11/data_init/get_history_courseobj');
        ajaxObj.send();
        ajaxObj.onreadystatechange = function () {
            // 为了保证 数据 完整返回，我们一般会判断 两个值
          if (ajaxObj.readyState == 4 && ajaxObj.status == 200) {
                var jsonObj=eval('('+ajaxObj.responseText+')');
                for(let i=0;i<jsonObj.data.courseobj_list.length;i++){
                  tmp.push({
                    num:i+1,
                    targetName:jsonObj.data.courseobj_list[i].courseobj_content,
                    lastUsedYear:jsonObj.data.courseobj_list[i].last_use_year,
                    selected:false
                  })                  
                }           
              that.historyTargetTable=[].concat(tmp);         
          }
        }   
    },
    clearTarget(){//导入历史课程时去除空target
      let tmpForm={domains:[]};
      for(let i=0;i<this.dynamicValidateForm.domains.length;i++){
        if(this.dynamicValidateForm.domains[i].value!="") tmpForm.domains.push({
          value:this.dynamicValidateForm.domains[i].value
        }) 
      }
      this.dynamicValidateForm.domains=[].concat(tmpForm.domains)
    },
    importHistoryTarget(){
      this.clearTarget();
      for(let i=0;i<this.historyTargetTable.length;i++){
        if(this.historyTargetTable[i].selected){
          let repeat=false;
          for(let j=0;j<this.dynamicValidateForm.domains.length;j++){//查找是否有同名或已经添加
            if(this.dynamicValidateForm.domains[j].value==this.historyTargetTable[i].targetName){
              repeat=true;
              break;
            }
          }
          if(!repeat)
          this.dynamicValidateForm.domains.push({
            value:this.historyTargetTable[i].targetName
          })
        }
      }
    },
    getHistoryAbility(){
      var ajaxObj = new XMLHttpRequest();
        var tmp=[];
        let that=this;
        ajaxObj.open('get', 'http://116.56.140.195:3000/mock/11/data_init/get_history_ability');
        ajaxObj.send();
        ajaxObj.onreadystatechange = function () {
            // 为了保证 数据 完整返回，我们一般会判断 两个值
          if (ajaxObj.readyState == 4 && ajaxObj.status == 200) {
                var jsonObj=eval('('+ajaxObj.responseText+')');
                for(let i=0;i<jsonObj.data.ability_list.length;i++){
                  // console.log(jsonObj.data.courseobj_list)
                  tmp.push({
                    num:i+1,
                    abilityType:jsonObj.data.ability_list[i].ability_type,
                    abilityName:jsonObj.data.ability_list[i].ability_name,
                    lastUsedYear:jsonObj.data.ability_list[i].last_use_year,
                    abilityContent:jsonObj.data.ability_list[i].ability_content,
                    selected:false
                  })                  
                }           
                console.log("tmp")
                console.log(tmp);
              that.historyAbilityTable=[].concat(tmp);         
          }
        }   
    },
    clearAbility(){//导入历史课程时去除空ability
      let tmpForm={domains:[]};
      for(let i=0;i<this.abilityForm.domains.length;i++){
        if(this.abilityForm.domains[i].name!="") tmpForm.domains.push({
          name:this.abilityForm.domains[i].name,
          description:this.abilityForm.domains[i].description,
          abilityType:this.abilityForm.domains[i].abilityType
        }) 
      }
      this.abilityForm.domains=[].concat(tmpForm.domains)
    },
    importHistoryAbility(){
      this.clearAbility();
      for(let i=0;i<this.historyAbilityTable.length;i++){
        if(this.historyAbilityTable[i].selected){
          let repeat=false;
          for(let j=0;j<this.abilityForm.domains.length;j++){//查找是否有同名或已经添加
            if(this.abilityForm.domains[j].name==this.historyAbilityTable[i].abilityName){
              repeat=true;
              break;
            }
          }
          if(!repeat)
          this.abilityForm.domains.push({
            name:this.historyAbilityTable[i].abilityName,
            description:this.historyAbilityTable[i].abilityContent,
            abilityType:0,
          })
        }
      }
    },
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
.red {
  color: red;
}
#FirstDivider {
  display: block;
  height: 1px;
  width: 100%;
  margin: 40px 24px;
}

.myStyle>>>.el-input__inner{
  border-color: transparent;
  background-color: rgb(234,238,244);
  text-align: center;
} 
.myStyleBorderType>>>.el-input__inner{
  border-color: gray;
  background-color: rgb(234,238,244);
  text-align: center;
} 
.changeWidth>>>.el-form-item__label{
  width: 120px !important;
}
.changeWidth>>>.el-form-item__content{
  margin-left: 120px !important;
}
.el-table>>>.el-table__cell{
  text-align: center !important;
}


.el-table--border:after,
.el-table--group:after,
.el-table:before {
  background-color: rgb(159,181,203) !important;
}
.el-table--border,
.el-table--group {
  border-color: rgb(159,181,203) !important;
}
.el-table td,
.el-table th.is-leaf {
  border-bottom: 2px solid rgb(159,181,203) !important;
}
.el-table--border th,
.el-table--border th.gutter:last-of-type {
  border-bottom: 2px solid rgb(159,181,203) !important;
}
.el-table--border td,
.el-table--border th {
  border-right: 2px solid rgb(159,181,203) !important;
}
.el-step__description {
  font-size: 12px;
}
.setFontSize10{
  font-size: 10px;
}
/deep/ .el-form-item__label{
  font-size:10px ;
}
.el-button>>>span{
  font-size:10px;
}
/deep/ .el-input__inner{
  line-height: 30px;
  height:30px;
} 
/deep/ table{
  font-size: 10px;
}
/deep/ .el-input{
  font-size: 10px;
}
/deep/ .el-form-item__content{
  font-size: 10px;
}

</style>
