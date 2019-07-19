<template>
    <div>
        <p>啊哈哈 {{ test.value }}</p>
        <button @click="change(100)">change</button>
    </div>
</template>

<script>
import { example } from '@/api/example'
import { mapMutations, mapState } from 'vuex'
export default {
  data () {
    return {

    }
  },
  created () {
    var a = {
      arr: [3, 2, 1],
      valueOf () {
        return this.arr.pop()
      }
    }
    /* eslint-disable */
    if (a == 1 && a == 2 && a == 3) {
      console.log('biu')
    }
  },
  computed:mapState(['test']),
  mounted () {},
  methods: {
    ...mapMutations(['CHANGE_VALUE']),
    change(){
      this.CHANGE_VALUE(100)
    },
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
