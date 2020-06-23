<template>
  <view class="no_more" v-show="noMore">没有更多了</view>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class NoMore extends Vue {
  @Prop({ type: Boolean, default: false }) noMore!: boolean
}
</script>

<style lang="scss" scoped>
.no_more {
  font-size: rpx(30);
  font-weight: 500;
  text-align: center;
}
</style>
