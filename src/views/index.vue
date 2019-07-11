<template>
    <div>
        <p>啊哈哈</p>
    </div>
</template>

<script>
import { example } from '@/api/example'
export default {
  data () {
    return {
      value: ''
    }
  },
  created () {},
  mounted () {},
  methods: {
    event () {
      return {

      }
    },
    network () {
      return {
        runApiToGetExample: async () => {
          const { data, status } = await example()
          if (status === 200) {
            this.value = data.value
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
p{
    font-size: 18px;
}
</style>
