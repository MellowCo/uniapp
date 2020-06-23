<template>
  <scroll-view class="scroll_height" scroll-y @scrolltolower="handleToLow">
    <swiper indicator-dots autoplay class="swiper">
      <swiper-item v-for="item in banner" :key="item.id">
        <image :src="item.new_thumb" mode="scaleToFill"></image>
      </swiper-item>
    </swiper>

    <view class="content">
      <navigator class="content_item" v-for="item in album" :key="item.id" :url="`/pages/home/components/AlbumDetail?id=${item.id}`">
        <view class="img">
          <image :src="item.lcover" mode="aspectFill"></image>
        </view>
        <view class="info">
          <view class="title">{{ item.name }}</view>
          <view class="desc">{{ item.desc }}</view>
          <view class="but">关注</view>
        </view>
      </navigator>
      <NoMore :no-more="noMore"></NoMore>
    </view>
  </scroll-view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import * as index from '@/api/home/index'
import NoMore from '@/component/NoMore.vue'

@Component({
  components: {
    NoMore
  }
})
export default class Album extends Vue {
  page = {
    limit: 30,
    order: 'new',
    skip: 0
  }
  banner: object[] = []
  album: object[] = []
  noMore = false

  async getMessage() {
    const { res } = await index.albumList(this.page)
    console.log(res)
    this.banner = res.banner

    if (res.album && res.album.length === 0) {
      this.noMore = true
    } else {
      this.album.push(...res.album)
    }
  }

  created() {
    this.getMessage()
  }

  handleToLow() {
    if (!this.noMore) {
      this.page.skip += this.page.limit
      this.getMessage()
    }
  }
}
</script>

<style scoped lang="scss">
.swiper {
  height: rpx(750/1.6);

  image {
    height: 100%;
  }
}

.content {
  .content_item {
    display: flex;
    padding: rpx(10);
    border: rpx(1) #666666 solid;

    .img {
      /*width: 10vw;*/
      height: 20vh;
      flex: 1;

      image {
        /*width: rpx(200);*/
        height: 100%;
      }
    }

    .info {
      padding: 0 rpx(10);
      flex: 2;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: relative;

      .title {
        padding: rpx(10) 0;
        font-size: rpx(30);
        color: #000;
      }

      .desc {
        padding: rpx(10) 0;
        font-size: rpx(25);

        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      .but {
        position: absolute;
        right: rpx(10);
        bottom: rpx(10);
        border: rpx(1) $color solid;
        width: 10vw;
        text-align: center;
        border-radius: 20%;
        align-self: flex-end;
        color: $color;
      }
    }
  }
}
</style>
