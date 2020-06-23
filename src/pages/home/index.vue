<template>
  <view>
    <view class="tab">
      <view class="title">
        <uni-segmented-control :current="current" :values="titles" @clickItem="onClickItem" style-type="text" active-color="#4cd964"></uni-segmented-control>
      </view>
      <icon type="search" size="18" class="search" />
    </view>

    <view class="content">
      <view v-if="current === 0">
        <Recommend></Recommend>
      </view>
      <view v-if="current === 1">
        <New></New>
      </view>
      <view v-if="current === 2">
        <CateGory></CateGory>
      </view>
      <view v-if="current === 3">
        <Album></Album>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import uniBadge from '@dcloudio/uni-ui/lib/uni-badge/uni-badge.vue'
import uniSegmentedControl from '@dcloudio/uni-ui/lib/uni-segmented-control/uni-segmented-control.vue'
import Album from './components/Album.vue'
import New from './components/New.vue'
import CateGory from './components/CateGory.vue'
import Recommend from './components/Recommend.vue'

@Component({
  components: {
    uniBadge,
    Album,
    New,
    CateGory,
    Recommend,
    uniSegmentedControl
  }
})
export default class Home extends Vue {
  titles = ['推荐', '最新', '分类', '专辑']
  current = 3

  onClickItem(e: any): void {
    if (this.current !== e.currentIndex) {
      // eslint-disable-next-line no-undef
      uni.setNavigationBarTitle({
        title: this.titles[e.currentIndex]
      })
      this.current = e.currentIndex
    }
  }
}
</script>

<style scoped lang="scss">
.tab {
  position: relative;

  .title {
    width: 60%;
    margin: 0 auto;
    height: $tabBar_height;
  }

  .search {
    position: absolute;
    right: 5%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
