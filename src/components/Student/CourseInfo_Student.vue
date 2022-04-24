<template>
  <div>

      <CourseInfo :course_obj="currentRow"></CourseInfo>

  </div>

</template>

<script>
  import CourseInfo from '../Entity/Course/CourseInfo'
  export default {
    name: "CourseInfo_Student",
    props:['course_name','course_id'],

    created(){
      this.currentRow.course_id=this.course_id;
      this.currentRow.course_name=this.course_name;
    },

    data(){
      return{
        currentRow:{course_id: 'defualt',course_name:'default_coursename'},

      }

    },
    components:{
      CourseInfo,

    },
    methods: {



    }
  }
</script>

<style scoped>
  .title_btn{
    background-color: rgba(195,208,222,100);
    border-style: none;
    color: black;
    font-size: 12px;
  }

</style>
