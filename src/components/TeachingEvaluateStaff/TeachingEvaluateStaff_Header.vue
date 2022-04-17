<template>
  <div>
    <!-- 根据实际情况做修改 -->
    <el-col class="nav">
      <el-menu  class="base">
        <el-submenu
          v-for="tp in TrainingProgram_list" :key="tp.TP.key"  :index="tp.TP.key">
          <template slot="title">
            <span>培养方案{{tp.TP.TP_year}}</span>
          </template>
          <el-menu-item
            v-for="eachtp in tp.sub_TP"
            :key="eachtp.key"
            :index="eachtp.key"
            @click="toInfo(tp.TP,eachtp.menuName)">
            <span>{{eachtp.menuName}}</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "TeachingEvaluateStaff_Header",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    toInfo(tp,menu){

      var path=''
      if (menu=="培养方案"){
        path='/TeachingEvaluateStaff/TeachingEvaluateStaff_TP'
      }else if (menu=="课程信息"){
        path='/TeachingEvaluateStaff/TeachingEvaluateStaff_Course'
      }else if (menu=="学生评价"){
        path='/TeachingEvaluateStaff/TeachingEvaluateStaff_Student'
      }else{
        console.log("menu错误")
      }
      console.log(tp.TP_id,path);

      // this.$router.push({
      //   path: path,
      //   query: {
      //     params_tp:tp.TP_id
      //   }
      // })

      this.$router.replace({
        path: "/TeachingEvaluateStaff/redirect",
        query: {
          nextPath: path,
          tp_id:tp.TP_id,
          tp_year:tp.TP_year,
          tp_major:tp.TP_major
        }
      })

    }
  },
  data(){
    return {
      TrainingProgram_list:[
        {TP:{key:"1", TP_id:'tp1',TP_year:'2020',TP_major:'SWE'},
          sub_TP:[
            {key:"1-1", menuName: "培养方案"},
            {key:"1-2", menuName: "课程信息"},
            {key:"1-3", menuName: "学生评价"},
          ]},
        {TP:{key:"2", TP_id:'tp2',TP_year:'2021',TP_major:'DMT'},
          sub_TP:[
            {key:"2-1", menuName: "培养方案"},
            {key:"2-2",menuName: "课程信息"},
            {key:"2-3", menuName: "学生评价"},
          ]},
      ],

    }
  }
}
</script>

<style scoped>

.nav{
  overflow-x: hidden;
;
}
/*如果没有此样式的话  折叠有子级菜单的父菜单文字是不会隐藏的*/
.el-menu--collapse{

  visibility: hidden;
  max-width: 150px!important;

}

.el-menu-item {
  color: #343434;
  text-align: left;

}


.base{
  /*background-color: rgba(139, 165, 192,100);*/
  background-color:rgba(235, 239, 244, 100);
  text-color:"#000000";
  text-align:right;
  active-text-color:"#000000";
  active-color:rgba(210,220,231,100);

}

</style>
