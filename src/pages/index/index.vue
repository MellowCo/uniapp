<template>
  <view class="content">
    <view>
      <text class="title">{{ title }}</text>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      title: 'Hello'
    }
  }
})
</script>

<style lang="scss" scoped>
.content {
  text-align: center;
  height: rpx(400);
}

.logo {
  height: rpx(200);
  width: rpx(200);
  margin-top: rpx(200);
}

.title {
  font-size: rpx(36);
  color: #8f8f94;
}
</style>
