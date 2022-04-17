<template>
  <el-col>
    <!--添加判断语句 如果有课程就自动active 第一个课程-->
    <el-menu default-active="this.$router.path" class="base" @open="handleOpen" @close="handleClose">

      <el-menu-item
        v-for="(item,index) in courseList"
        :key="index"
        @click="toCourseDetail(item)">
        {{item.course_name}}
      </el-menu-item>

    </el-menu>
  </el-col>
</template>

<script>
    export default {
        name: "CourseEvaluateStaff_Header",
      props: ['course_list'],
      data(){
        return {
          courseList:[
            {course_id:1, course_name:'数据结构'},
            {course_id:2, course_name:'系统分析'}]
        }
      },
      created() {
        let that = this;
        that.$axios.get('/data_query/course_list',
          {
            params:{
              user_id:'PKU10085-TG001-ET202011617453',
              user_identity:'TG'
            }
          })
          .then(function (response) {
            console.log(response.data)
            if((response.data.code=='000000')&&(response.data.msg=='成功')){
              let listdata = response.data.data.course_list
              // console.log('get',listdata)
              that.courseList = listdata
              console.log("GET", that.courseList)


            }
          })
      },

      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        toCourseDetail(course) {
          console.log(course.course_name);
          this.$router.replace({
            path: "/redirect",
            query: {
              nextPath: '/CourseEvaluateStaff/CourseInfo',
              course_id: course.course_id,
              course_name:course.course_name
            }
          })
        },

      },
    }
</script>

<style scoped>
  .base{
    /*background-color: rgba(139, 165, 192,100);*/
    background-color:rgba(235, 239, 244, 100);
    text-color:"#000000";
    text-align:right;
    active-text-color:"#000000";
    active-color:rgba(210,220,231,100);

  }

</style>
