<template>
    <div class="main_container">
    <el-container>
      <el-header style="height:40px" class="as_title">
        教学计划管理|课程结课管理
        <hr/>
      </el-header>

      <div  class="main_content">
        <el-main>
          <el-tabs v-model="activeName" @tab-click="handleClick;getSelectedNum();initChart()">
            <el-tab-pane
              v-for="(item,index) in this.training_program_list" 
              :key="item.training_program_id"
              :label="item.training_program_major+'|'+item.training_program_year" 
              :name="String(index)">
              <br>
              <!-- 结课中 -->
              <div class="JieKeZhong" style="display:block">
                <div class="table" style="float:left; width:70%; ">
                  <p>结课中</p>
                  
                  <el-table
                    :data="item.training_program_ending_class_data.ending_course_table.ending_course_list"
                    border
                    style="width: 100%">
                    <el-table-column
                      label=""
                      width="auto" min-width="3%">
                      <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.select" @change="getSelectedNum()"></el-checkbox>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="course_type"
                      label="课程类型"
                      width="auto" min-width="8%">
                    </el-table-column>
                    <el-table-column
                      prop="course_name"
                      label="课程名称"
                      width="auto" min-width="8%">
                    </el-table-column>
                    <el-table-column
                      prop="semester"
                      label="开课学期"
                      width="auto" min-width="8%">
                    </el-table-column>
                    <el-table-column
                      prop="course_start_date"
                      label="开课时间"
                      width="auto" min-width="8%">
                    </el-table-column>
                    <el-table-column
                      prop="course_end_date"
                      label="结课时间"
                      width="auto" min-width="8%">
                    </el-table-column>
                    <el-table-column
                      prop="teacher_name"
                      label="授课老师"
                      width="auto" min-width="5%">
                    </el-table-column>
                    <el-table-column
                      prop="course_status"
                      label="课程状态"
                      width="auto" min-width="8%">
                    </el-table-column>
                    <el-table-column
                      label="结课"
                      width="95"
                      type="index">
                      <template slot-scope="scope">
                      <el-button @click="cout(scope.$index+0)">结课</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <a @click="selectAll(); 
                  getSelectedNum(item.training_program_ending_class_data.ending_course_table.ending_course_list)" style="cursor:pointer">全选</a>
                  <span>已选{{selectedNum}}门</span>
                  <el-button>批量结课</el-button>
                </div>
                <div class="chart" style="float:right; width:29%; height:150px">
                  <p>&nbsp;</p>
                  <div style="float:left; width:30%; height:100%">
                    <div style="font-size:10px">已开课情况</div>
                    <span style="font-size:30px">
                      {{item.training_program_ending_class_data.ending_course_table.ending_course_list.length+item.training_program_ending_class_data.running_course_table.running_course_list.length}}
                      </span>
                    <span style="font-size:10px">已开课</span>
                  </div>
                  <div id="twmechart" style="float:right; width:70%;height:100%;"></div>
                  
                </div> 
              </div>
              <div style="clear:both;"></div>
               <!-- 进行中 -->
              <div class="JinXingZhong" >
              <p>进行中</p>
              <el-table
                  :data="item.training_program_ending_class_data.running_course_table.running_course_list"
                  border
                  style="width: 100%">
                 <el-table-column
                      prop="course_type"
                      label="课程类型"
                      width="auto" min-width="8%">
                    </el-table-column>
                    <el-table-column
                      prop="course_name"
                      label="课程名称"
                      width="auto" min-width="8%">
                    </el-table-column>
                    <el-table-column
                      prop="semester"
                      label="开课学期"
                      width="auto" min-width="8%">
                    </el-table-column>
                    <el-table-column
                      prop="course_start_date"
                      label="开课时间"
                      width="auto" min-width="8%">
                    </el-table-column>
                    <el-table-column
                      prop="course_end_date"
                      label="结课时间"
                      width="auto" min-width="8%">
                    </el-table-column>
                    <el-table-column
                      prop="teacher_name"
                      label="授课老师"
                      width="auto" min-width="5%">
                    </el-table-column>
                    <el-table-column
                      prop="course_status"
                      label="课程状态"
                      width="auto" min-width="8%">
                    </el-table-column>
                </el-table>
              </div>
              <!-- 未开课 -->
              <div class="WeiKaiKe">
              <p>未开课</p>
              <el-table
                  :data="item.training_program_ending_class_data.not_start_course_table.not_start_course_list"
                  border
                  style="width: 100%">
                 <el-table-column
                      prop="course_type"
                      label="课程类型"
                      width="auto" min-width="8%">
                    </el-table-column>
                    <el-table-column
                      prop="course_name"
                      label="课程名称"
                      width="auto" min-width="8%">
                    </el-table-column>
                    <el-table-column
                      prop="semester"
                      label="开课学期"
                      width="auto" min-width="8%">
                    </el-table-column>
                    <el-table-column
                      prop="course_start_date"
                      label="开课时间"
                      width="auto" min-width="8%">
                    </el-table-column>
                    <el-table-column
                      prop="course_end_date"
                      label="结课时间"
                      width="auto" min-width="8%">
                    </el-table-column>
                    <el-table-column
                      prop="teacher_name"
                      label="授课老师"
                      width="auto" min-width="5%">
                    </el-table-column>
                    <el-table-column
                      prop="course_status"
                      label="课程状态"
                      width="auto" min-width="8%">
                    </el-table-column>
                </el-table>
            </div>
            </el-tab-pane>
          </el-tabs>
            

        </el-main>

      </div>


    </el-container>
    <!-- {{JieKeZhongTable}} -->
  </div>
</template>

<script>
import axios from "axios";
import * as echarts from 'echarts';
var myChart;
export default {
    name: 'AcademicStaffEndCourse',
    data() {
      return {
            selectedNum:0,
            activeName: 0,
            PrepareJieke:[],
            // Gettraining_program_list:[],
            training_program_list:[],
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
        cout(a){ console.log(a)},
        handleSelect(key, keyPath){
            console.log(key, keyPath);
        },
        getSelectedNum(){
          let arr=this.training_program_list[this.activeName].training_program_ending_class_data.ending_course_table.ending_course_list;
          let cnt=0;
          for(let i=0;i<arr.length;i++){
            if(arr[i].select==true) cnt++;
          }
          this.selectedNum=cnt;
        },
        selectAll(){
          for(let i=0;i<this.training_program_list[this.activeName].training_program_ending_class_data.ending_course_table.ending_course_list.length;i++){
            this.training_program_list[this.activeName].training_program_ending_class_data.ending_course_table.ending_course_list[i].select=true;
          }
        },
        handleClick(tab, event) {
        console.log(tab, event);
        },
        initChart(){
          
          if (myChart!=null && myChart != "" && myChart != undefined) {
            console.log("imhere")
	        myChart.dispose();
	        }

                  // 新建一个promise对象
            let newPromise = new Promise((resolve) => {
                resolve()
            })
            //然后异步执行echarts的初始化函数
            newPromise.then(() => {
              let JinXingZhongNum=this.training_program_list[this.activeName].training_program_ending_class_data.running_course_table.running_course_list.length
              let JieKeZhongNum=this.training_program_list[this.activeName].training_program_ending_class_data.ending_course_table.ending_course_list.length
              let WeiKaiKeNum=this.training_program_list[this.activeName].training_program_ending_class_data.not_start_course_table.not_start_course_list.length
              //  此dom为echarts图标展示dom
                var chartDom = document.getElementById('twmechart');

                      

                myChart = echarts.init(chartDom);
                var option;
                option = {
                  tooltip: {
                    trigger: 'item'
                  },
                  legend: {
                    top: '85%',
                    left: 'center'
                  },
                  series: [
                    {
                      name: 'Access From',
                      type: 'pie',
                      radius: ['40%', '70%'],
                      avoidLabelOverlap: false,
                      label: {
                        show: false,
                        position: 'center'
                      },
                      emphasis: {
                        label: {
                          show: true,
                          fontSize: '30',
                          fontWeight: 'bold'
                        }
                      },
                      labelLine: {
                        show: false
                      },
                      data: [
                        { value: JinXingZhongNum, name: '进行中' },
                        { value: JieKeZhongNum, name: '结课中' },
                        { value: WeiKaiKeNum, name: '未开课' },
                      ]
                    }
                  ]
                };

                option && myChart.setOption(option);
            })
          
          

        }
    },
    created() {
        let that = this;
        axios.get("/data_query/get_ending_class_info",{//2-9获得课程结课管理信息
          params:{
            school_no:'school_no'
          }
        }).then(function(response){
          console.log("2-9",response.data);
          that.training_program_list=response.data.data.training_program_list;
          console.log(that.training_program_list);
          that.training_program_list.forEach(item=>{
            item.training_program_ending_class_data.ending_course_table.ending_course_list.forEach(val=>{
              that.$set(val,'select', false)//成功添加select属性
            })
          })
        })
    },
    mounted() {
      setTimeout(() => {
          this.initChart();
      }, 200);
    },
}
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