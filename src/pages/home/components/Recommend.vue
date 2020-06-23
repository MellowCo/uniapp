<template>
  <scroll-view class="scroll_height" scroll-y @scrolltolower="handleToLower">
    <view class="warp">
      <view class="item" :key="item.id" v-for="item in recommendList">
        <image :src="item.thumb" mode="widthFix"></image>
      </view>
    </view>

    <view class="months_warp">
      <view class="months_title">
        <view class="months_left">
          <view class="months_info">
            <text> {{ DD }}/</text>
            {{ MM }}月
          </view>

          <view class="text">
            你负责美丽就好
          </view>
        </view>

        <view class="months_right">
          更多 >
        </view>
      </view>

      <view class="months_imgs">
        <view class="months_img" v-for="item in monthList" :key="item.id">
          <image :src="item.thumb" mode="aspectFill"></image>
        </view>
      </view>
    </view>

    <view class="popluar_warp">
      <view class="title">
        <text>热门</text>
      </view>
      <view class="content">
        <view class="imgs">
          <view class="img" v-for="item in popularList" :key="item.id">
            <image :src="item.thumb" mode="aspectFill"></image>
          </view>
        </view>
        <NoMore :no-more="noMore"></NoMore>
      </view>
    </view>
  </scroll-view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import * as index from '@/api/home/index'
import dayjs from 'dayjs'
import NoMore from '@/component/NoMore.vue'

@Component({
  components: {
    NoMore
  }
})
export default class Recommend extends Vue {
  query: index.PageQuery = {
    limit: 30,
    order: 'hot',
    skip: 0
  }

  recommendList: object[] = []
  monthList: object[] = []
  popularList: object[] = []
  DD = ''
  MM = ''
  noMore = false

  async created() {
    // eslint-disable-next-line no-undef
    uni.setNavigationBarTitle({
      title: '推荐'
    })
    this.DD = dayjs().format('DD')
    this.MM = dayjs().format('MM')
    await this.getMessage()
  }

  async getMessage() {
    const { res } = await index.recommendList(this.query)
    this.recommendList = res.homepage[1].items
    this.monthList = res.homepage[2].items

    if (res.vertical && res.vertical.length === 0) {
      this.noMore = true
    } else {
      this.popularList.push(...res.vertical)
    }
  }

  handleToLower() {
    if (!this.noMore) {
      this.query.skip += this.query.limit
      this.getMessage()
    }
  }
}
</script>

<style lang="scss" scoped>
.warp {
  display: flex;
  flex-wrap: wrap;

  .item {
    width: 50%;
    border: 3px white solid;
  }
}

.months_warp {
  .months_title {
    @include title_padding;
    display: flex;
    justify-content: space-between;
    font-weight: 600;

    .months_left {
      display: flex;
      align-items: center;
      font-weight: 600;

      .months_info {
        text {
          font-size: rpx(36);
          color: $color;
        }

        font-size: rpx(30);
      }

      .text {
        font-size: rpx(35);
        margin-left: rpx(20);
      }
    }

    .months_right {
      font-size: $title_font_size;
    }
  }

  .months_imgs {
    display: flex;
    flex-wrap: wrap;

    .months_img {
      width: 33%;
      border: 3px white solid;
    }
  }
}

.popluar_warp {
  .title {
    @include title_padding;

    &::before {
      content: '';
      border-left: rpx(10) red solid;
    }

    text {
      font-size: $title_font_size;
      font-weight: 600;
      margin-left: rpx(10);
    }
  }

  .content {
    .imgs {
      display: flex;
      flex-wrap: wrap;

      .img {
        width: 1/3 * 100%;
        border: rpx(2) white solid;
      }
    }
  }
}
</style>
