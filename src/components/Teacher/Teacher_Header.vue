<template>
  <el-col>
    <!--添加判断语句 如果有课程就自动active 第一个课程-->
    <el-menu default-active="this.$router.path" class="base" @open="handleOpen" @close="handleClose">

      <el-menu-item
        v-for="item in courseList"
        :key="item.id"
        @click="toCourseDetail(item)">
        {{item.name}}
      </el-menu-item>

    </el-menu>
  </el-col>
</template>

<script>
    export default {
        name: "Teacher_Header",
        data(){
          return {
            courseList:[
              {id:1, name:'数据结构'},
              {id:2, name:'系统分析'}]
          }
        },

        methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        toCourseDetail(course) {
          console.log(course.name);
            this.$router.replace({
              path: "/redirect",
              query: {
                nextPath: '/Teacher/CourseManager',
                course_id: course.id,
                course_name:course.name
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
