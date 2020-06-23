<template>
  <view>
    <view class="header">
      <image :src="detail.album.lcover"></image>
      <view class="name">{{ detail.album.name }}</view>
      <view class="but">关注专辑</view>
    </view>
    <view class="user">
      <view class="user_name">
        <image :src="detail.album.user.avatar" mode="widthFix"></image>
        <text>{{ detail.album.user.name }}</text>
      </view>
      <text class="user_msg">
        {{ detail.album.desc }}
      </text>
    </view>
    <view class="imgs">
      <view class="img_item" v-for="item in detail.wallpaper" :key="item.id">
        <image :src="item.img" mode="widthFix"></image>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { albumdetail } from '@/api/home/index'

@Component
export default class AlbumDetail extends Vue {
  id = ''
  page = {
    limit: 30,
    order: 'new',
    skip: 0,
    first: 1
  }
  detail: object = {}

  onLoad(options: any) {
    this.id = options.id
  }

  async getMessage() {
    const { res } = await albumdetail(this.page, this.id)
    this.detail = res
  }

  created() {
    this.getMessage()
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  color: white;
  font-weight: 500;

  .but {
    position: absolute;
    right: rpx(20);
    bottom: rpx(20);
    background-color: $color;
    padding: rpx(10);
    border-radius: 10%;
  }

  .name {
    position: absolute;
    left: rpx(20);
    bottom: rpx(20);
    font-size: rpx(30);
  }
}

.user {
  margin-left: rpx(30);
  padding: rpx(10) 0;

  .user_name {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    image {
      border-radius: 50%;
      width: rpx(50);
    }

    text {
      color: #333;
      font-weight: 600;
      font-size: rpx(30);
      margin-left: rpx(10);
    }
  }

  .user_msg {
    margin-top: rpx(10);
  }
}

.imgs {
  display: flex;
  flex-wrap: wrap;
  .img_item {
    width: 33.3%;
    border: 1px white solid;
  }
}
</style>
