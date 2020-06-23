import { IRequestOption } from '@/interface/Interface'

const request = function(args: IRequestOption): Promise<any> {
  // 加载中
  uni.showLoading({
    title: '加载中'
  })

  args.url = `${process.env.VUE_APP_BASE_URL}/${args.url}`

  return new Promise((resolve, reject) => {
    uni.request({
      ...args,
      success(res) {
        resolve(res.data)
      },
      fail(err) {
        reject(err)
      },
      complete() {
        uni.hideLoading()
      }
    })
  })
}

export default request
