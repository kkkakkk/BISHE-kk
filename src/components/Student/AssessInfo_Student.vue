<template>
  <div style="width: 100%;">
    <el-container class="main_container">
      <el-header class="as_title" style="height:40px;">
        <el-col :span="12" style="text-align: left">{{this.course_name}} | 考核任务信息</el-col>
        <el-col :span="12" style="text-align: right">
          <el-button
            size="mini"
            type="text"
            style="color: #000000; text-decoration: underline"
            @click="prev()">返回考核任务列表</el-button>
        </el-col>
        <br/><hr/>
      </el-header>

      <el-main class="main_content">
        <el-col :span="12">
          <div style="margin-right: 30px;margin-left: 5px;">
            <p><b>考核编码：</b>{{this.assess_id}}</p>
            <p><b>类型编码：</b>{{this.assess_type}}</p>
            <p><b>任务人数：</b>{{this.people_count}}</p>
            <p><b>任务标题：</b>{{this.assess_title}}</p>
            <p><b>截止时间：</b>{{this.end_date}}</p>
            <p><b>任务书：</b>任务书.doc<el-button size="mini" v-on:click="as_download()" style="background-color: #3B6998;margin-left: 10px" round><i class="el-icon-download" style="font-size: 10px;color: #fff;"></i></el-button></p>
            <p><b>考核能力项：</b></p>
            <p v-for="li in this.assess_course_ability_list"><b>{{li.course_ability_no}}.{{li.course_ability_name}}:</b>{{li.course_ability_content}}</p>
          </div>
        </el-col>
        <el-col :span="12">
          <div style="margin-left: 30px;margin-right: 5px">
            <p><b>考核内容：</b></p><p>{{this.assess_content}}</p>
            <p><b>任务状态：</b><el-tag :type="options_status[this.assess_status]['type']">{{options_status[this.assess_status]['label']}}</el-tag></p>
          </div>
        </el-col>
      </el-main>

      <el-row class="bottom_row">
        <el-col :span="12">
          <el-main class="commit_content">
            <p style="font-size: 14px"><b>考核任务提交</b></p>
            <div style="font-size: 10px;margin-top: 20px">
              <p><b>提交时间：</b>{{this.upload_datetime}}</p>
              <p><b>小组号：</b>{{this.student_group_no}}</p>
              <p><b>提交状态：</b><el-tag :type="this.homework_status== '0' ? 'danger' : this.homework_status== '1' ? '成功' :'提交状态错误'" size="mini">{{this.homework_status== '0' ? "未提交" : this.homework_status== '1' ? "提交成功" :'提交状态错误'}}</el-tag></p>
              <div><b>上传附件：</b>
              <el-upload
                class="upload-demo inline-block"
                ref="upload"
                action=""
                :http-request="getFile"
                :before-upload="checkFile"
                :file-list="fileList"
                :auto-upload="true"
                :limit="1"
                accept=".xls,.xlsx,.doc,.docx,.pdf"
                style="position: absolute">
                <el-button size="mini" style="background-color: #3B6998;" round><i class="el-icon-upload2" style="font-size: 10px;color: #fff;"></i></el-button>
                <el-button size="mini" v-on:click="commit_download()" style="background-color: #3B6998;" round><i class="el-icon-download " style="font-size: 10px;color: #fff"></i></el-button>
              </el-upload><br/><br/><div class="el-upload__tip" slot="tip">只能上传xls,xlsx,doc,docx,pdf,zip格式的文件，且不超过100M</div><br/><br/>
              </div>
            </div>
          </el-main>
        </el-col>
        <el-col :span="12">
          <el-main class="score_content">
            <p style="font-size: 14px"><b>任务得分</b></p>
            <p style="font-size: 10px;margin-top: 20px"><b>能力项评价</b></p>
            <p v-for="li in this.ability_feedback_list" style="font-size: 10px"><b>{{li.ability_no}}.{{li.ability_name}}:</b>{{li.ability_feedback}}</p>
          </el-main>
        </el-col>
      </el-row>

    </el-container>
  </div>
</template>

<script scoped>
import axios from "axios";

export default {
  name: "AssessInfo_Student",

  data(){
    return {
      ability_feedback_list:[],
      upload_datetime:'',
      student_group_no:'',
      homework_status:'',

      //提交文件列表(只用来展示)
      fileList: [],
      //用于检测后缀名的数组
      fileNameMatch:['xls','xlsx','doc','docx','pdf','zip'],
      //存放上传文件的对象
      uploadFile:{},
      //蒙版
      updwLoading:'',
      //上传地址
      uploadUrl:'上传的后台地址',
      //保存到数据库的实体
      saveDataEntity:{
        name:'',
        url:''
      },

      options_status: [
        {
          value: "0",
          label: "待开启",
          type:"danger"
        },
        {
          value: "1",
          label: "进行中",
          type:"success"
        },
        {
          value: "2",
          label: "已完成",
          type:"info"
        }
      ],
    }
  },
  created() {
    console.log('路由',this.$route.query)
    this.assess_id=this.$route.query.assess_id;
    this.assess_type=this.$route.query.assess_type;
    this.people_count=this.$route.query.people_count;
    this.assess_title=this.$route.query.assess_title;
    this.end_date=this.$route.query.end_date;
    this.report_url=this.$route.query.report_url;
    this.assess_course_ability_list=this.$route.query.assess_course_ability_list;
    this.assess_content=this.$route.query.assess_content;
    this.assess_status=this.$route.query.status;

    this.course_name=this.$route.query.course_name;
    this.course_id=this.$route.query.course_id;
    // if (this.$route.query.allData) {
    //   let formObj = decodeURIComponent(this.$route.query.allData);
    //   this.rowData = JSON.parse(formObj);
    // }
  },
  mounted() {
    this.getFeedback();
    this.getSubmit();
  },
  methods: {
    //返回上一页面
    prev(){
      this.$router.go(-1);//返回上一层
    },

    //下载任务书
    as_download(){
      let link = document.createElement("a"); //创建a标签
      link.style.display = "none"; //使其隐藏
      link.href = this.report_url; //赋予文件下载地址
      //link.href = "https://www.bandisoft.com/bandizip/dl.php?web";
      //link.setAttribute("download", this.Data.fileName); //设置下载属性 以及文件名
      document.body.appendChild(link); //a标签插至页面中
      link.click(); //强制触发a标签事件
    },

    //上传文件相关操作
    checkFile(file){//上传之前的操作，file上传的文件对象
      let name = file.name;
      if(name.lastIndexOf('.') == -1){
        //（提示）文件格式不正确
        alert("文件格式不正确");
        return false;
      }else{
        //获取后缀
        let suff = name.substring(name.lastIndexOf('.')+1);
        var count = 0;
        //遍历提前定义好的后缀数组
        for(var i in this.fileNameMatch){
          //如果有匹配的(注意大小写问题)
          if(this.fileNameMatch[i].toLowerCase() == suff.toLowerCase()){
            count ++;
            //匹配到就退出循环
            break;
          }
        }
        //如果没匹配到
        if(count == 0){
          //（提示）只能上传xls,xlsx,doc,docx,pdf,zip格式的文件
          alert("只能上传xls,xlsx,doc,docx,pdf,zip格式的文件");
          return false
        }
      }
      //判断文件大小
      if(file.size > (1024*1024*100)){
        //（提示）文件大小不能超过100M
        alert("文件大小不能超过100M");
        return false;
      }
    },

    getFile(item){//上传时操作，item上传时的对象
      var app = this;
      //存放文件对象
      app.uploadFile = item.file;
      //创建表单
      var formData = new FormData();
      //添加文件对象到表单
      formData.append("uploadFile",app.uploadFile);
      //配置表单的请求头
      var config = {
        headers: { 'Content-Type': 'application/json' }
      };
      //蒙版（上传之前加个蒙版，不会太突兀）
      app.updwLoading = app.$loading({
        lock:true,
        text:"上传中...",
        spinner:"el-icon-loading",
        background:'#aaaaaa50'
      });
      app.$axios.post(app.uploadUrl, formData, config
      ).then(res => {
        //附件上传成功后 保存到数据库
        if(res.data.result){
          //去保存到数据库（第二次异步请求）
          app.saveData(res.data);
        }else{
          //(message提示)上传附件失败……
          alert("上传附件失败");
        }
      });
      //关闭蒙版（延时1s）
      setTimeout(()=>{
        app.updwLoading.close();
      },1000);
      //上传失败或成功都清空列表，不展示（看你需求）
      app.fileList = [];
    },

    //查看提交情况
    getSubmit:function () {
      let that = this;
      axios.get("/assess/assess_submit_state",{
        params:{
          assess_id: that.assess_id,
          student_id: that.stu_id
        }
      }).then(function (response){
          console.log('查看提交情况',response.data);
          // if((response.data.code=='000000')&&(response.data.msg=='成功')){
          //   that.student_group_no = response.data.data.student_group_no;
          //   that.homework_status = response.data.data.homework_status;
          //   that.homework_url = response.data.data.homework_url;
          // }
          // else{alert('查看提交情况部分code或msg错误')}

          //因为返回数据不标准，暂不判断 此处后续需要修改，即恢复上面代码
          that.student_group_no = response.data.data.student_group_no;
          that.homework_status = response.data.data.homework_status;
          that.homework_url = response.data.data.homework_url;
        },
        function (err) {
          console.log("error");
          alert("请求失败");
        }
      );
    },

    // //提交考核任务
    // submitUpload:function () {
    //   let that = this;
    //   let d = new Date();
    //   axios.post("/assess/upload_homework",{
    //     params:{
    //       assess_id: that.assess_id,
    //       stu_id: that.stu_id,
    //       homework_file_url:that.fileinfo.virtualPath,
    //       upload_datetime:d,
    //       status:'1'
    //     }
    //   }).then(function (response){
    //       if((response.data.code=='000000')&&(response.data.msg=='成功')){
    //         //alert('上传成功')
    //       }
    //       else{alert('提交任务部分code或msg错误')}
    //     },
    //     function (err) {
    //       console.log("error");
    //       alert("请求失败");
    //     }
    //   );
    // },

    //下载已提交的作业
    commit_download(){
      let link = document.createElement("a"); //创建a标签
      link.style.display = "none"; //使其隐藏
      link.href = this.homework_url; //赋予文件下载地址
      document.body.appendChild(link); //a标签插至页面中
      link.click(); //强制触发a标签事件
    },

    //查看考核评价
    getFeedback:function () {
      let that = this;
      axios.post("/teaching_process/check_evaluation",{
        params:{
          assess_id: that.assess_id,
          stu_id: that.stu_id
        }
      }).then(function (response){
          console.log('查看考核评价',response.data);
          // if((response.data.code=='000000')&&(response.data.msg=='成功')){
          //   that.ability_feedback_list = response.data.data.ability_feedback_list;
          //   that.upload_datetime = response.data.data.upload_datetime;
          // }
          // else{alert('能力评价部分code或msg错误')}

        //因为返回数据不标准，暂不判断 此处后续需要修改，即恢复上面代码
          that.ability_feedback_list = response.data.data.ability_feedback_list;
          that.upload_datetime = response.data.data.upload_datetime;
        },
        function (err) {
          console.log("error");
          alert("请求失败");
        }
      );
    },
  }
}
</script>

<style scoped>
.main_container{
  width:100%;
  height: 100%;
}
.as_title{
  font-weight:bold;
  font-size:16px;
  font-family:'Microsoft YaHei Regular', 'Microsoft YaHei';
}
hr{
  height: 1px;
  width: 100%;
  background: black;
  border:none;
}
.main_content{
  text-align: left;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.9);
  margin-top:0px;
  margin-left:10px;
  margin-right:10px;
  font-size: 10px;
}
/*设置最后两列高度一致*/
.bottom_row{
  margin-bottom: 15px;
  display: flex;
  flex-wrap: wrap;
}

.commit_content{
  height: 100%;
  border-radius: 10px;
  text-align: left;
  background-color: rgba(255, 255, 255, 0.9);
  margin: 10px 10px -10px;
  border: 1px solid rgb(59, 105, 152);
}

.score_content{
  height: 100%;
  border-radius: 20px;
  text-align: left;
  margin: 10px 10px -10px;
  background-image: linear-gradient(180deg, #f5f7fa 0%, #c3cfe2 100%);
}

.inline-block {
  display: inline-block;
}

</style>
