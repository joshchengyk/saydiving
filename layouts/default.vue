<template>
  <div>
    <jheader></jheader>
    <Nuxt />
    <jfooter></jfooter>
  </div>
</template>
<script>
import jheader from '~/components/jheader'
import jfooter from '~/components/jfooter'

export default {
  transtions:"default",
  components:{
    jheader,
    jfooter,
  }
}
</script>

