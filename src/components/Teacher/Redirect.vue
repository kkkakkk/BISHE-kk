<template>
    
</template>

<script>
    export default {
      name: "Redirect",
      beforeCreate() {
        // console.log(this.$route)
        const nextPath = this.$route.query.nextPath

        // this.$router.replace({ path: nextPath})
        // console.log("调用")
        console.log(nextPath)

        this.$router.push({
          path: nextPath,
          query: {
            course_id: this.$route.query.course_id,
            course_name: this.$route.query.course_name,
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
