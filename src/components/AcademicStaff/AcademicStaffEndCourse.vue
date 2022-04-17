<template>
    <div class="main_container">
    <el-container>
      <el-header style="height:40px" class="as_title">
        教学计划管理|课程结课管理
        <hr/>
      </el-header>

      <div  class="main_content">
        <el-main>

            <el-menu :default-active="String(1)" class="el-menu-demo" mode="horizontal" @select="handleSelect" >
            <el-menu-item  
            v-for="(item,indeX) in Gettraining_program_list.training_program_list" 
            :key="item.training_objective_id"
            :index="String(indeX+1)">{{item.training_objective_major}}<strong>|</strong>{{item.training_objective_year}}</el-menu-item>
            </el-menu>

            <br>
            <!-- 结课中 -->
            <div class="JieKeZhong" style="display:block">
              <div class="table" style="float:left; width:74%; ">
                <p>结课中</p>
                <el-table
                  :data="JieKeZhongTable"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="select"
                    label=""
                    width="auto" min-width="5%">
                    <template slot-scope="scope">
                      <el-checkbox v-model="scope.row.select" @change="getSelectedNum()"></el-checkbox>
                    </template>
                  </el-table-column>
                  <!-- 课程类型获得不到 -->
                  <el-table-column
                    prop="courseType"
                    label="课程类型"
                    width="auto" min-width="10%">
                  </el-table-column>
                  <el-table-column
                    prop="courseName"
                    label="课程名称"
                    width="auto" min-width="10%">
                  </el-table-column>
                  <el-table-column
                    prop="semester"
                    label="开课学期"
                    width="auto" min-width="10%">
                  </el-table-column>
                  <el-table-column
                    prop="startDate"
                    label="开课时间"
                    width="auto" min-width="10%">
                  </el-table-column>
                  <el-table-column
                    prop="endDate"
                    label="结课时间"
                    width="auto" min-width="10%">
                  </el-table-column>
                  <el-table-column
                    prop="teacherName"
                    label="授课老师"
                    width="auto" min-width="10%">
                  </el-table-column>
                  <el-table-column
                    prop="status"
                    label="课程状态"
                    width="auto" min-width="10%">
                  </el-table-column>
                  <el-table-column
                    prop="JieKeBtn"
                    label="结课"
                    width="auto" min-width="10%">
                     <el-button>结课</el-button>
                  </el-table-column>
                </el-table>
                <a @click="selectAll(); getSelectedNum()" style="cursor:pointer">全选</a>
                <span>已选{{selectedNum}}门</span>
                <el-button>批量结课</el-button>
              </div>
              <div class="chart" style="float:right; width:25%; height:150px">
                <p>&nbsp;</p>
                <div style="float:left; width:49%; height:100%">
                  <div style="font-size:10px">已开课情况</div>
                  <span style="font-size:30px">{{this.JieKeZhongTable.length+this.JinXingZhongTable.length}}</span>
                  <span style="font-size:10px">已开课</span>
                </div>
                <div id="twmechart" style="float:right; width:50%;height:100%"></div>
                
              </div> 
            </div>
            <div style="clear:both;"></div>
            <!-- 进行中 -->
            <div class="JinXingZhong" >
              <p>进行中</p>
              <el-table
                  :data="JinXingZhongTable"
                  border
                  style="width: 100%">
                  <el-table-column  
                    prop="courseType"
                    label="课程类型"
                    width="auto" min-width="10%"></el-table-column>
                    <el-table-column  
                    prop="courseName"
                    label="课程名称"
                    width="auto" min-width="10%"></el-table-column>
                    <el-table-column  
                    prop="semester"
                    label="开课学期"
                    width="auto" min-width="10%"></el-table-column>
                    <el-table-column
                    prop="startDate"
                    label="开课时间"
                    width="auto" min-width="10%">
                  </el-table-column>
                  <el-table-column
                    prop="endDate"
                    label="结课时间"
                    width="auto" min-width="10%">
                  </el-table-column>
                  <el-table-column
                    prop="teacherName"
                    label="授课老师"
                    width="auto" min-width="10%">
                  </el-table-column>
                  <el-table-column
                    prop="status"
                    label="课程状态"
                    width="auto" min-width="10%">
                  </el-table-column>
                </el-table>
            </div>
            <!-- 未开课 -->
            <div class="WeiKaiKe">
              <p>未开课</p>
              <el-table
                  :data="WeiKaiKeTable"
                  border
                  style="width: 100%">
                  <el-table-column  
                    prop="courseType"
                    label="课程类型"
                    width="auto" min-width="10%"></el-table-column>
                    <el-table-column  
                    prop="courseName"
                    label="课程名称"
                    width="auto" min-width="10%"></el-table-column>
                    <el-table-column  
                    prop="semester"
                    label="开课学期"
                    width="auto" min-width="10%"></el-table-column>
                    <el-table-column
                    prop="startDate"
                    label="开课时间"
                    width="auto" min-width="10%">
                  </el-table-column>
                  <el-table-column
                    prop="endDate"
                    label="结课时间"
                    width="auto" min-width="10%">
                  </el-table-column>
                  <el-table-column
                    prop="teacherName"
                    label="授课老师"
                    width="auto" min-width="10%">
                  </el-table-column>
                  <el-table-column
                    prop="status"
                    label="课程状态"
                    width="auto" min-width="10%">
                  </el-table-column>
                </el-table>
            </div>
          

        </el-main>

      </div>


    </el-container>
    <!-- {{JieKeZhongTable}} -->
  </div>
</template>

<script>
import axios from "axios";
import * as echarts from 'echarts';

export default {
    name: 'AcademicStaffEndCourse',
    data() {
      return {
            selectedNum:0,
            Gettraining_program_list:[],
            JieKeZhongTable:[//结课中的item
                // {select:0,
                //   courseType:"",
                //   courseName:"tmpList[i].course_name",
                //   semester:"tmpList[i].semester",
                //   startDate:"tmpList[i].start_date",
                //   endDate:"tmpList[i].end_date",
                //   teacherName:"tmpList[i].teacher_name",
                //   status:"tmpList[i].status",
                //   JieKeBtn:0},{select:0,
                //   courseType:"",
                //   courseName:"tmpList[i].course_name",
                //   semester:"tmpList[i].semester",
                //   startDate:"tmpList[i].start_date",
                //   endDate:"tmpList[i].end_date",
                //   teacherName:"tmpList[i].teacher_name",
                //   status:"tmpList[i].status",
                //   JieKeBtn:0}
            ],
            JinXingZhongTable:[//进行中

            ],
            WeiKaiKeTable:[//未开课

            ],
      };
    },

    methods: {
        selectedNum:0,
        handleSelect(key, keyPath){
            console.log(key, keyPath);
        },
        getSelectedNum(){
          let cnt=0;
          for(let i=0;i<this.JieKeZhongTable.length;i++){
            if(this.JieKeZhongTable[i].select!=0) cnt++;
          }
          this.selectedNum=cnt;
        },
        selectAll(){
          for(let i=0;i<this.JieKeZhongTable.length;i++){
            this.JieKeZhongTable[i].select=true;
          }
        }
    },
    created() {
        let that = this;
        axios.get("/data_query/academic_staff_training_program",{//2-3
          params:{
            user_id: 'PKU10085-TA202011187766',
            user_identity: 'TA'
          }
        }).then(function (response){
            console.log("GET",response.data);
            if((response.data.code=='000000')&&(response.data.msg=='success')){
              console.log(response.data.data)
              let tmpList=response.data.data;
              that.Gettraining_program_list=tmpList;
            }
          }
        );

        axios.get("/data_query/course_list_by_training_program_id",{//2-10 根据培养方案查看Course列表_教务员
          params:{
            major:"major",
            year:"year"
          }
        }).then(function(response){
          console.log("mydata" ,response.data.data)        
          if((response.data.code=='000000')&&(response.data.msg=='success')){
            let tmpList=response.data.data.course_list;
            for(let i=0;i<tmpList.length;i++){
              that.JieKeZhongTable.push(
                {
                  select:0,
                  courseType:"",
                  courseName:tmpList[i].course_name,
                  semester:tmpList[i].semester,
                  startDate:tmpList[i].start_date,
                  endDate:tmpList[i].end_date,
                  teacherName:tmpList[i].teacher_name,
                  status:tmpList[i].status,
                  JieKeBtn:0
                }
              )
            }
            // console.log(tmpList.course_list.length)
          }
        })

    },
    mounted() {
       var myChart = echarts.init(document.getElementById('twmechart'), null, {//echart
          width: 'auto',
          height: 'auto'
        });
        var option = {
          legend: {
                orient: 'vertical',
                x: 'left',
                data: ['A', 'B', 'C', 'D', 'E']
          },
          series: [
            {
              type: 'pie',
              radius: ['30%', '50%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center',
                emphasis: {
                  show: true
                }
              },
              labelLine: {
                show: false
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              data: [
                { value: 335, name: 'A' },
                { value: 310, name: 'B' },
                { value: 234, name: 'C' },
                { value: 135, name: 'D' },
                { value: 1548, name: 'E' }
              ]
            }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);

    },
};
</script>

<style scoped>
    .main_container{
    width:100%;
    height: 100%;
  }
  .as_title{
    /*height:40px;*/
    text-align:left;
    font-weight:bold;
    font-size:16px;
    font-family:'Microsoft YaHei Regular', 'Microsoft YaHei';
  }
  hr{
    height: 1px;
    background: black;
    border:none;
  }
  .main_content{
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.847058823529412);
    margin-top:0px;
    margin-bottom:0px;
    height: 100%;
    width: 100%;
    text-align: left;
  }

  .title_btn{
    background-color: rgb(159,181,203);
    border-style: none;
    /*margin-right: 10px;*/
  }

  .view_btn{
    color: #000000;
    text-decoration: underline;
  }
</style>