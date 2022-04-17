<template>
  <div class="main_container">

    <div class="grid-content bg">
      <div class="top_title">{{this.course_obj.course_name}} - {{this.course_obj.course_id}}</div>


      <div style="display:flex;">
        <el-button type="primary" size="small" class="button" style="float: left;">课程目标</el-button>
        <div style="flex:1;border-bottom:1px solid rgb(59, 105, 152)"></div>
      </div>
      <p align="left" style="margin-top:10px;padding-left:10px"
        v-for="(course_obj) in courseinfo.course_objective_list">
        {{course_obj.course_objective_no}}-{{course_obj.course_objective_content}}<br></p>


      <div style="display:flex;margin-top:20px">
        <el-button type="primary" size="small" class="button" style="float: left;">能力项</el-button>
        <div style="flex:1;border-bottom:1px solid rgb(59, 105, 152)"></div>
      </div>
      <p align="left" style="margin-top:10px;padding-left:10px"
         v-for="(course_ability) in courseinfo.course_ability_list">
        {{course_ability.course_ability_no}} . {{course_ability.course_ability_name}}：{{course_ability.course_ability_content}}<br>
      </p>



      <div style="display:flex;margin-top:20px">
        <el-button type="primary" size="small" class="button" style="float: left;">课程目标对毕业要求的支撑</el-button>
        <div style="flex:1;border-bottom:1px solid rgb(59, 105, 152)"></div>
      </div>


      <el-table :data="table_column_courseobj_graduateobj" style="width: 100%;margin-top:10px;text-align: center">

        <el-table-column v-for="(item, index) in table_column_courseobj_graduateobj_header" :key="index" :label="item" >
          <!-- 数据的遍历  scope.row就代表数据的每一个对象-->
          <template slot-scope="scope"  >
            <p >{{scope.row[item]}}</p>
          </template>
        </el-table-column>
      </el-table>



      <div style="display:flex;margin-top:20px">
        <el-button type="primary" size="small" class="button" style="float: left;">能力项对课程目标的支撑</el-button>
        <div style="flex:1;border-bottom:1px solid rgb(59, 105, 152)"></div>
      </div>


      <el-table :data="table_column_ability_courseobj" style="width: 100%;margin-top:10px;text-align: center">

        <el-table-column v-for="(item, index) in table_column_ability_courseobj_header" :key="index" :label="item" >
          <!-- 数据的遍历  scope.row就代表数据的每一个对象-->
          <template slot-scope="scope"  >
            <p >{{scope.row[item]}}</p>
          </template>
        </el-table-column>

      </el-table>

      <el-table :data="table_column_exam_courseobj" style="width: 100%;margin-top:10px;text-align: center">

        <el-table-column v-for="(item, index) in table_column_exam_courseobj_header" :key="index" :label="item" >
          <!-- 数据的遍历  scope.row就代表数据的每一个对象-->
          <template slot-scope="scope"  >
            <p >{{scope.row[item]}}</p>
          </template>
        </el-table-column>

      </el-table>





      <div style="display:flex;margin-top:20px">
        <el-button type="primary" size="small" class="button" style="float: left;">考核任务考核的能力项</el-button>
        <div style="flex:1;border-bottom:1px solid rgb(59, 105, 152)"></div>
      </div>

      <el-table :data="table_column_ability_assessment" style="width: 100%;margin-top:10px;text-align: center">

        <el-table-column v-for="(item, index) in table_column_ability_assessment_header" :key="index" :label="item" >
          <!-- 数据的遍历  scope.row就代表数据的每一个对象-->
          <template slot-scope="scope"  >
            <p >{{scope.row[item]}}</p>
          </template>
        </el-table-column>

      </el-table>





    </div>


    <div class="self-assessment-box">
      <h6 class="title" style="text-align:left">{{this.course_obj.course_name}} | 课程评议意见</h6>
      <div class="self-box-item">
        <div class="info-item-inline">
          <label><span class="red-text">*</span>课程名称</label>
          {{this.course_obj.course_name}}
        </div>

        <div class="info-item-inline">
          <label><span class="red-text">*</span>课程目标对毕业要求的支撑关系改进意见</label>
        </div>

        <div class="info-item-inline">
          <label><span class="red-text">*</span>课程目标</label>
          {{this.courseinfo.course_group_comment.is_objective_ok}}
        </div>

        <div class="info-item-inline" style="background:#fff;padding:5px">
          <!--课程目标对毕业要求的支撑关系合理-->
          {{this.courseinfo.course_group_comment.support_advice}}
        </div>

        <div class="info-item-inline">
          <label><span class="red-text">*</span>考核方式</label>
          {{this.courseinfo.course_group_comment.is_assessment_ok}}
        </div>

        <div class="info-item-inline">
          <label><span class="red-text">*</span>考核方式改进意见</label>
        </div>

        <div class="info-item-inline">
          <label><span class="red-text">*</span>成绩分布</label>
          {{this.courseinfo.course_group_comment.is_score_ok}}
        </div>

        <div class="info-item-inline" style="background:#fff;padding:5px">
          {{this.courseinfo.course_group_comment.assessment_advice}}
        </div>

        <div class="info-item-inline" style="width:70%">
          <label><span class="red-text">*</span>课程目标对毕业要求的支撑关系</label>
          {{this.courseinfo.course_group_comment.is_support_ok}}
        </div>

        <div class="info-item-inline" style="width:70%">
          <label><span class="red-text">*</span>课程整体评议意见</label>
        </div>
        <div  style="background:#fff;padding:5px">
          {{this.courseinfo.course_group_comment.total_advice}}
        </div>

      </div>

      <div class="self-box-item">
        <span class="red-text">*</span>教师课程自评
        <div class="item-box">
          {{this.courseinfo.teacher_self_comment}}
      </div>
    </div>
  </div>

  </div>


</template>

<script>
  import axios from "axios";
  export default {
    name: "CourseInfo",
    props:{
      course_obj:{course_id: 'defualt',course_name:'default_coursename'},

    },
    watch: {

      course_obj:{
        handler(newValue, oldValue){
          console.log("course_obj发生变化",newValue)
          this.get_allcourseinfo(newValue.course_id)
        },
        deep:true,
        immediate:false,
      },
    },
    data() {
        return {


          table_column_ability_courseobj:[],
          table_column_ability_courseobj_header:[],

          table_column_courseobj_graduateobj:[],
          table_column_courseobj_graduateobj_header:[],

          table_column_ability_assessment:[],
          table_column_ability_assessment_header:[],

          table_column_exam_courseobj:[],
          table_column_exam_courseobj_header:[],

          courseinfo:{
            assessment_course_ability_list:[{
              assessment_title:'',
              course_ability:''
            }],
            course_ability_list:[{course_ability_no:'',course_ability_name:'',course_ability_content:''}],
            course_ability_support_course_objective_list:[
              {course_ability_name:'',
                course_objective_no:'',
                support:''
              }
            ],
            course_group_comment:{
              course_name:'',
              is_objective_ok:'',
              is_assessment_ok:'',
              is_score_ok:'',
              is_support_ok:'',
              assessment_advice:'',
              support_advice:'',
              total_advice:''
            },
            course_objective_list:[{course_objective_no:'',course_objective_content:''}],
            course_objective_support_graduation_subrequirement_list:[
              {
                graduation_subrequirement_no:'',
                graduation_subrequirement_content:'',
                course_objective_no:'',
                course_objective_achievement:'',
                support:''
              }
            ],
            teacher_self_comment:''

          }
        }
      },
    created(){
      let that=this;
      that.get_allcourseinfo(that.course_obj.course_id)
    },
    methods:{
      get_allcourseinfo(courseid){
        let that = this;

        that.table_column_ability_courseobj=[],
          that.table_column_ability_courseobj_header=[],
          that.table_column_courseobj_graduateobj=[],
          that.table_column_courseobj_graduateobj_header=[],
          that.table_column_ability_assessment=[],
          that.table_column_ability_assessment_header=[],
          that.table_column_exam_courseobj=[],
          that.table_column_exam_courseobj_header=[],

        axios.get("/course/all_info",{
          params:{
           course_id: courseid,
            //course_id:'PKU10085-SE080902-0036-2019A-002',
          }})
          .then(function (response){
            if((response.data.code=='000000')){

              that.courseinfo = response.data.data;
             console.log("获取课程信息",that.courseinfo);

              /***
               * 设置课程目标与毕业要求的表格
               * {毕业要求：目标1：目标1完成：目标2：目标2完成}
               */
              var courseobj_list=that.courseinfo.course_objective_list;
              var c_g_support_list = that.courseinfo.course_objective_support_graduation_subrequirement_list;
              var courseobj_length=that.courseinfo.course_objective_list.length;

              console.log("课程目标列表",courseobj_list)
              console.log("课程目标与毕业要求支撑",c_g_support_list)


              var graduate_dict={},highrate,mediumrate,lowrate,index;
              var pre_graduation_subrequirement_no=c_g_support_list[0]['graduation_subrequirement_no'];
              var totalevaluate_num=0;
              var high_list=[],medium_list=[],low_list=[];


              var graduate_no,graduate_list = {},m=0,o=0,s=0,
                label_objname,label_objachievename;
              for(m=0;m<c_g_support_list.length;m++){
                graduate_no=c_g_support_list[m]['graduation_subrequirement_no'];
                if(!(graduate_no in graduate_list)){
                  graduate_list[graduate_no]={};

                  for(o=0;o<courseobj_list.length;o++){
                    s=o+1;
                    label_objname="课程目标"+s;
                    label_objachievename=s+"-达成情况";
                    graduate_list[graduate_no][label_objname]='';
                    graduate_list[graduate_no][label_objachievename]='';

                    graduate_list[graduate_no]['强']=0;
                    graduate_list[graduate_no]['强_list']=[];
                    graduate_list[graduate_no]['中']=0;
                    graduate_list[graduate_no]['中_list']=[];
                    graduate_list[graduate_no]['弱']=0;
                    graduate_list[graduate_no]['弱_list']=[];
                    graduate_list[graduate_no]['总']=0;

                  }
                }
              }
              console.log('graduate_list',graduate_list);



              var course_objective_no,graduate_support,
                course_objective_achievement,c_g_support;
              for(m=0;m<c_g_support_list.length;m++){
                graduate_no=c_g_support_list[m]['graduation_subrequirement_no'];
                course_objective_no=Number(c_g_support_list[m]['course_objective_no']);
                course_objective_achievement=c_g_support_list[m]['course_objective_achievement'];
                graduate_support = c_g_support_list[m]['support'];

                for(o=0;o<courseobj_list.length;o++){
                  s=o+1;
                  label_objname="课程目标"+s;
                  label_objachievename=s+"-达成情况";

                  if(Number(courseobj_list[o]['course_objective_no'])==course_objective_no){
                    graduate_list[graduate_no][label_objname]=graduate_support;
                    graduate_list[graduate_no][label_objachievename]=course_objective_achievement;

                    if(graduate_support=='强'){

                      graduate_list[graduate_no]['强']=graduate_list[graduate_no]['强']+1;
                      graduate_list[graduate_no]['强_list'].push(course_objective_achievement)

                    }else if(graduate_support=='中'){

                      graduate_list[graduate_no]['中']=graduate_list[graduate_no]['中']+1;
                      graduate_list[graduate_no]['中_list'].push(course_objective_achievement)
                    }else if(graduate_support=='弱'){

                      graduate_list[graduate_no]['弱']=graduate_list[graduate_no]['弱']+1;
                      graduate_list[graduate_no]['弱_list'].push(course_objective_achievement)
                    }

                  }
                }
              }
              console.log('2graduate_list',graduate_list);

              var g_key,g_dict={},g_key_key;
              for(g_key in graduate_list){
                g_dict['毕业要求分指标']=g_key;

                for(o=0;o<courseobj_list.length;o++){
                  s=o+1;
                  label_objname="课程目标"+s;
                  label_objachievename=s+"-达成情况";

                  g_dict[label_objname]=graduate_list[g_key][label_objname];
                  g_dict[label_objachievename]=graduate_list[g_key][label_objachievename];
                }

                totalevaluate_num=graduate_list[g_key]['弱']+graduate_list[g_key]['中']*2+graduate_list[g_key]['强']*3;
                // highrate=(graduate_list[g_key]['强']*3)/totalevaluate_num;
                // mediumrate=(graduate_list[g_key]['中']*2)/totalevaluate_num;
                // lowrate=graduate_list[g_key]['弱']/totalevaluate_num;

                g_dict['课程对指标达成贡献度']=0;
                for(index=0;index<graduate_list[g_key]['强_list'].length;index++){
                  g_dict['课程对指标达成贡献度']=g_dict['课程对指标达成贡献度']+(3/totalevaluate_num)*graduate_list[g_key]['强_list'][index];
                }
                for(index=0;index<graduate_list[g_key]['中_list'].length;index++){
                  g_dict['课程对指标达成贡献度']=g_dict['课程对指标达成贡献度']+(2/totalevaluate_num)*graduate_list[g_key]['中_list'][index];
                }
                for(index=0;index<graduate_list[g_key]['弱_list'].length;index++){
                  g_dict['课程对指标达成贡献度']=g_dict['课程对指标达成贡献度']+(1/totalevaluate_num)*graduate_list[g_key]['弱_list'][index];
                }
                g_dict['课程对指标达成贡献度']=g_dict['课程对指标达成贡献度'].toFixed(2);

                that.table_column_courseobj_graduateobj.push(g_dict);
                g_dict={}
              }
              console.log('课程目标与毕业要求',that.table_column_courseobj_graduateobj);

              //设置课程目标与毕业要求的表头
              that.table_column_courseobj_graduateobj_header.push("毕业要求分指标");
              for(o=0;o<courseobj_length;o++){
                s=o+1;
                label_objname="课程目标"+s;
                label_objachievename=s+"-达成情况";
                that.table_column_courseobj_graduateobj_header.push(label_objname);
                that.table_column_courseobj_graduateobj_header.push(label_objachievename)
              }
              that.table_column_courseobj_graduateobj_header.push("课程对指标达成贡献度");
              console.log('课程目标与毕业要求表头',that.table_column_courseobj_graduateobj_header);


              //////////////////////////////////////////////////////////////////////////////////////////////
              //////////////////////////////////////////////////////////////////////////////////////////////
              /***
               * 设置课程目标与能力的表格{能力项：，目标1：目标2：}
               */
              var ability_list=that.courseinfo.course_ability_list;
              var c_a_support_list = that.courseinfo.course_ability_support_course_objective_list;
              var ability,ability_no,courseobj_no,support,i,j,k=0,n;

              // var courseobj_length=that.courseinfo.course_objective_list.length;
              var ability_length=that.courseinfo.course_ability_list.length;

              for(i=0;i<ability_length;i++){
                ability=ability_list[i]['course_ability_name'];
                ability_no=Number(ability_list[i]['course_ability_no']);

                var course_dict={}
                course_dict['key']=i;
                course_dict['能力项']=ability;
                for(j=0;j<courseobj_length;j++){
                    courseobj_no=Number(courseobj_list[j]['course_objective_no']);
                    n=j+1;
                    var label_name="课程目标"+n;
                    course_dict[label_name]=''
                    for(k=0;k<c_a_support_list.length;k++){
                      if((Number(c_a_support_list[k]['course_ability_no'])==Number(ability_no))&&
                        (Number(c_a_support_list[k]['course_objective_no'])==courseobj_no)) {
                          course_dict[label_name]=c_a_support_list[k]['support']
                      }
                    }
                  }
                    that.table_column_ability_courseobj.push(course_dict)
              }
             // console.log('表格数组',that.table_column_ability_courseobj);


              //设置课程目标与能力的表头
              that.table_column_ability_courseobj_header.push("能力项");
              for(j=0;j<courseobj_length;j++){
                n=j+1;
                var name="课程目标"+n;
                that.table_column_ability_courseobj_header.push(name)
              }
             // console.log('表格数组头',that.table_column_ability_courseobj_header)


              //////////////////////////////////////////////////////////////////////////////////////////////
            //设置课程目标与考试的表头
              that.table_column_exam_courseobj_header.push('考核任务');
              for(j=0;j<courseobj_length;j++){
                n=j+1;
                name="课程目标"+n;
                that.table_column_exam_courseobj_header.push(name)
              }
              //console.log('设置课程目标与考试的表头：',that.table_column_exam_courseobj_header);

              var exam_ability_list=that.courseinfo.course_exam_support_course_objective_list;
              var exam_title,exan_ability_support,c_obj;

              var exam_title_dict={};//{exan_title:{obj1:obj2:}}
              for(i=0;i<exam_ability_list.length;i++) {
                exam_title=exam_ability_list[i]['exam_title'];
                if(!(exam_title in exam_title_dict)){
                  exam_title_dict[exam_title]={};
                  for(j=0;j<courseobj_list.length;j++){
                    n=j+1;
                    name="课程目标"+n;
                    exam_title_dict[exam_title][name]='';
                }}}

              //console.log("1exam_title_dict:",exam_title_dict)


              for(i=0;i<exam_ability_list.length;i++){
                exam_title=exam_ability_list[i]['exam_title'];
                c_obj=Number(exam_ability_list[i]['course_objective_no']);
                exan_ability_support=exam_ability_list[i]['support'];

                name="课程目标"+c_obj;

                if(name in exam_title_dict[exam_title]){
                  exam_title_dict[exam_title][name]=exan_ability_support
                }
              }
              //console.log("21exam_title_dict:",exam_title_dict);

              var e_key,obj_key,e_dict={};
              for(e_key in exam_title_dict){
                e_dict['考核任务']=e_key;
                for(obj_key in exam_title_dict[e_key]){
                  e_dict[obj_key]=exam_title_dict[e_key][obj_key];
                }

                that.table_column_exam_courseobj.push(e_dict);
                e_dict={}
              }
             // console.log("table_column_exam_courseobj:",that.table_column_exam_courseobj);



              //////////////////////////////////////////////////////////////////////////////////////////////



              /***
               * 设置能力与考核任务的表格
               * {考核任务：，能力1：能力2：}
               */


              //设置考核任务与能力的表头

              that.table_column_ability_assessment_header.push("考核任务");
              for(j=0;j<ability_length;j++){
                ability=ability_list[j]['course_ability_name'];
                that.table_column_ability_assessment_header.push(ability)
              }
             console.log('考核任务与能力的表头',that.table_column_ability_assessment_header)


              var assessment_course_ability_list=that.courseinfo.assessment_course_ability_list;
              var a_a_dict={};
              for(i=0;i<assessment_course_ability_list.length;i++){
                var _assessment = assessment_course_ability_list[i]['assessment_title'];
                if(!(_assessment in a_a_dict)){
                  a_a_dict[_assessment]={};
                  for(j=0;j<ability_length;j++){
                    ability = ability_list[j]['course_ability_name'];
                    // ability_no = ability_list[j]['course_ability_no'];
                    a_a_dict[_assessment][ability]=''
                  }
                }
              }
              console.log('a_a_dict',a_a_dict);

              for(i=0;i<assessment_course_ability_list.length;i++) {
               var a_title=assessment_course_ability_list[i]['assessment_title']
                var a_ability=assessment_course_ability_list[i]['course_ability']

                console.log("assessment_course_ability_list",)

                  a_a_dict[a_title][a_ability] = '√';

              }
              console.log('2a_a_dict',a_a_dict);


              for(e_key in a_a_dict){
                e_dict['考核任务']=e_key;
                for(obj_key in a_a_dict[e_key]){
                  e_dict[obj_key]=a_a_dict[e_key][obj_key];
                }

                that.table_column_ability_assessment.push(e_dict);
                e_dict={}
              }
              console.log("table_column_ability_assessment:",that.table_column_ability_assessment);



            } else{alert('登录部分code或msg错误')}
          },
        function (err) {
          console.log("error");
          alert("请求失败");
        });
      }
  },
  }

</script>

<style scoped>
  .main_container {
    margin-top: 10px;
    border: 2px solid rgb(59, 105, 152);
    border-radius: 10px;
    background: #ebeff4;
    padding: 10px
  }

  .grid-content {
    padding: 10px;
    border-radius: 4px;
    min-height: 100px;
  }

  .top_title {
    font-size: 16px;
    text-align: left;
    font-weight: 700px !important;
    margin-bottom: 10px
  }

  .grid-content-left {
    border-radius: 4px;
    min-height: 200px;
  }

  .grid-content-right {
    border-radius: 4px;
    min-height: 200px;
    /*width: 400px;*/
  }

  .grid-content-narrow {
    border-radius: 4px;
    min-height: 10px;
  }

  .grid-content-medium {
    border-radius: 4px;
    min-height: 20px;
  }

  .bg {
    background: #ebeff4;
  }

  .button {
    background-color: #3b6998;
    font-weight: bold;
    border: none;
  }

  .bg-white {
    background-color: white;
  }

  p {
    font-size: 2px;
  }

  h5 {
    color: #3b6998;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .el-table{
    font-size: 11px;
  }
  /deep/.el-table th{
    background: rgba(139, 165, 192, 0.9);
    color:#000
  }

  .self-assessment-box{
    background: rgb(250, 249, 249);
    border-radius: 5px;
    padding: 5px 15px;
    overflow: hidden;
  }

  .self-box-item{
    background: #ebeff4;
    margin-bottom: 20px;
    padding: 10px;
    border-radius:5px;
    text-align:left;
    font-size: 12px;
  }
  .red-text{
    color: red;
  }

  .self-box-item .item-box{
    background: #f9fafc;
    padding: 5px;
    min-height: 100px;
    margin-top: 10px;
  }

  .info-item-inline{
    display: inline-block;
    width:46%;
    margin-bottom: 10px;
  }

  .self-assessment-box label{
    margin-right: 30px;
  }
</style>
