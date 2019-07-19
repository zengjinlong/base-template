<template>
    <div>
       haha: {{test.value}}
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['test'])
  }
}
</script>

<style lang="scss" scoped>

</style>
