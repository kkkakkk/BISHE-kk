<template>
    <div>教师数据统计
      {{this.course_name}}-{{this.course_id}}
      {{this.$store.state.user_id}} - {{this.$store.state.identity}}

    </div>


</template>

<script>
    export default {
        name: "TeacherDataStatistic",
      props: ['course_name','course_id','semester'],
    }
</script>

<style scoped>

</style>
