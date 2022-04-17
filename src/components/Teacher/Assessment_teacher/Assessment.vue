
<template>
  <div class="main_container">
    <div class="SetBorder">
      <AssessList :course_name="$props.course_name" :course_id="$props.course_id"></AssessList>
    </div>

  </div>

</template>

<script>
import AssessList from './AssessList'
import AssessInfo from './AssessInfo_Teacher'
export default {
  name: "Assessment",
  props: ['course_name','course_id'],
  components:{
    AssessList,
    AssessInfo
  },
}
</script>

<style scoped>

.SetBorder {
  border: 2px solid;
  border-radius: 5px;
  border-color: rgb(59, 105, 152);
  padding: 10px;
  position: relative;
}


</style>
