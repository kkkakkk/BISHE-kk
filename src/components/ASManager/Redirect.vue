<template>
    
</template>

<script>
    export default {
      name: "AS_Manager_Redirect",
      beforeCreate() {
        // console.log(this.$route)
        const nextPath = this.$route.query.nextPath

        // this.$router.replace({ path: nextPath})
        // console.log("调用")
        console.log(nextPath)

        this.$router.push({
          path: nextPath,
          query: {

            tp_id :this.$route.query.tp_id,
            tp_year :this.$route.query.tp_year,
            tp_major :this.$route.query.tp_major,
          }
        })
      },
      render: function(h) {
        return h() // avoid warning message
      }
    }
</script>

<style scoped>

</style>
