<template>
    <div>
        <div v-if="currentPage==1">
            <div class="CourseInitialSteps" >
                <el-steps :active="0">
                <el-step description="设置课程目标与毕业要求分指标的支撑关系"></el-step>
                <el-step description="设置能力项对课程目标的支撑关系"></el-step>
                <el-step description="设置考核任务对能力项的匹配关系"></el-step>
                </el-steps>
            </div>
            <div class="SetCourseTarget">
                <el-button @click="getSupport()"></el-button>
            </div>
      </div>
    </div>
</template>

<script>
export default {
    name: 'EditSupport',

    data() {
        return {
            currentPage:1,
        };
    },

    mounted() {
        
    },

    methods: {
        getSupport(){
            var ajaxObj = new XMLHttpRequest();
            let that=this;
            ajaxObj.open('get', 'http://116.56.140.195:3000/mock/11/course/all_info');
            ajaxObj.send();
            ajaxObj.onreadystatechange = function () {
            // 为了保证 数据 完整返回，我们一般会判断 两个值
            if (ajaxObj.readyState == 4 && ajaxObj.status == 200) {
                var jsonObj=eval('('+ajaxObj.responseText+')');
                console.log(jsonObj.data)        
          }
        }
            
        }
    },
};
</script>

<style scoped>
.CourseInitialSteps {
  padding-left: 10%;
}
.SetCourseTarget {
  border: 2px solid;
  border-radius: 5px;
  border-color: rgb(139, 165, 192);
  padding: 10px;
  background-color: rgb(229,235,241);
  position: relative;
}
.SetCourseTarget button {
  background-color: rgb(159, 181, 203);
  border-color: rgb(159, 181, 203);
  float: right;
  display: block;
}
</style>