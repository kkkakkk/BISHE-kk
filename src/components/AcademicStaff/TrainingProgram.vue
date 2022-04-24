<template>
  <div class="main_container">
    <el-container>
      <el-header style="height:40px" class="as_title">
        教学计划设置 | 培养方案列表
        <hr/>
      </el-header>

      <div  class="main_content">
        <el-main>

          <!--<el-button type="primary" icon="el-icon-plus" class="title_btn"-->
                     <!--@click="addTrainingProgram('/AcademicStaff/TrainingProgram/InitialTrainingProgram')">添加培养方案-->
          <!--</el-button>-->

          <!--<br>-->
          <!--<br>-->


          <el-table
            :header-cell-style="{background:'#8BA5C0',color:'#ffffff','text-align':'center','font-size':'14px'}"
            :row-style="{background:'#D8DFE6',color:'#000000',height:'40px'}"
            :cell-style="{'text-align':'center','font-size':'12px',padding:'0px'}"
            :data="TrainingProgramData"
            style="width: 100%">

            <el-table-column
              label="培养方案ID"
              width="220">
              <template slot-scope="scope">
                <p>{{ scope.row.training_objective_id }}</p>
              </template>
            </el-table-column>

            <el-table-column
              label="适用年份"
              width="220">
              <template slot-scope="scope">
                <p>{{ scope.row.training_objective_year }}</p>
              </template>
            </el-table-column>

            <el-table-column
              label="适用专业"
              width="220">
              <template slot-scope="scope">
                <p>{{ scope.row.training_objective_major }}</p>
              </template>
            </el-table-column>

            <el-table-column label="查看培养方案">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  class="view_btn"
                  @click="viewDetail(scope.row.training_objective_id, scope.row.training_objective_major,scope.row.training_objective_year,'/AcademicStaff/TrainingProgram/TrainingProgramDetail')">查看</el-button>
              </template>
            </el-table-column>

            <el-table-column label="查看教学数据">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  class="view_btn"
                  @click="viewDetail(scope.row.training_objective_id,scope.row.training_objective_major,scope.row.training_objective_year, '/AcademicStaff/TrainingProgram/TeachingDetail')">查看</el-button>
              </template>
            </el-table-column>

          </el-table>

        </el-main>

      </div>


    </el-container>
  </div>
</template>

<script>

  import axios from "axios";
    export default {
      name: "AcademicStaff_TrainingProgram",
      data() {
        return {
          TrainingProgramData: [{
            training_objective_id	: '202021046366',
            training_objective_year: '2020',
            training_objective_major: '软件工程',
          }]
        }
      },
      methods:{
        // 查看具体学生的评价
          addTrainingProgram(path){
            this.$router.push({
              path: path
            })
          },
          viewDetail(id,major,year,path){
            console.log("查看detail",id,'专业',major,year,path);
            this.$router.push({
              path: path,
              query: {
                training_program_id: id,
                major:major,
                year:year,
              }
            })
          },



      },
      created() {
        let that = this;
        axios.get("/data_query/academic_staff_training_program",{
          params:{
            user_id: that.$store.state.user_id,
            user_identity: that.$store.state.identity
            // assess_id: "proident in",
            // stu_id: "non esse veniam reprehenderit"
          }
        }).then(function (response){
            console.log("GET",response.data);
            if((response.data.code=='000000')){
              let listdata=response.data.data
              console.log(listdata)
              that.TrainingProgramData=listdata.training_program_list
              console.log(that.TrainingProgramData)
            }
            else{alert('获取培养方案code或msg错误')}
          },
          function (err) {
            console.log("error");
            alert("请求失败");
          }
        );
      }
      // mounted() {
      //   this.getTPlist();
      // },

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
