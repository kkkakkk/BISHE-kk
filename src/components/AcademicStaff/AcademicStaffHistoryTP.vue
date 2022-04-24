<template>
    <div  class="main_container">
        <el-container>
            <el-header style="height:40px" class="as_title">
                教学计划管理|历史培养方案查询
                <hr/>
            </el-header>
            <div class="main_content">
                <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="2018|软件工程" name="1">
                    <div>
                        <el-row>
                        <el-col :span="16">
                            <div>
                                <el-table
                                :data="course_list"
                                border
                                style="width: 100%">
                                <el-table-column 
                                prop="course_id"
                                label="课程类型">
                                </el-table-column>
                                <el-table-column 
                                prop="course_name"
                                label="课程名称">
                                </el-table-column>
                                <el-table-column 
                                prop="semester"
                                label="开课学期">
                                </el-table-column>
                                <el-table-column 
                                prop="start_date"
                                label="开课时间">
                                </el-table-column>
                                <el-table-column 
                                prop="end_date"
                                label="结课时间">
                                </el-table-column>
                                <el-table-column 
                                prop="teacher_name"
                                label="授课老师">
                                </el-table-column>
                            </el-table>
                            </div>
                        </el-col>
                        <el-col :span="8"><div></div></el-col>
                        </el-row>
                        
                    </div>
                </el-collapse-item>
                </el-collapse>
            </div>

        </el-container>
    </div>
</template>

<script>
import axios from "axios";
    export default {
        name: "AcademicStaffHistoryTP",
        data() {
            return {
                course_list:[],
                activeNames: ['1']
            }
        },
        methods: {
            handleChange(val) {
                console.log(val);
            }
        },
        created(){
            let that = this;
            axios.get("/data_query/course_list_by_training_program_id",{//2-10
            params:{
                major:"major",
                year:"year"
            }
            }).then(function (response){
                console.log("GET",response.data);
                if((response.data.code=='000000')&&(response.data.msg=='success')){
                let tmpList=response.data.data.course_list;
                that.course_list=tmpList;
                }
            }
        );

        }
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
    .main_content{
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.847058823529412);
    margin-top:0px;
    margin-bottom:0px;
    height: 100%;
    width: 100%;
    text-align: left;
  }
    hr{
    height: 1px;
    background: black;
    border:none;
  }
</style>
