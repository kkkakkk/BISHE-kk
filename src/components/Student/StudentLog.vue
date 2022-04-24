<template>
  <div>
    显示学生的教学日志
    {{this.course_name}}-{{this.course_id}}

    {{this.$store.state.user_id}} - {{this.$store.state.identity}}

  </div>
</template>

<script>
  export default {
    name: "StudentLog",
    props: ['course_name','course_id','semester'],
  }
</script>

<style scoped>

</style>
