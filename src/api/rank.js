import jsonp from '../common/js/jsonp'
import {commonParams, options} from './config'

export function getRankList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

  const data = Object.assign({}, commonParams, {
    uin: 0,
    platform: 'h5',
    hostUin: 0,
    needNewCode: 1,
    _: 1502775960810
  })

  return jsonp(url, data, options)
}

export function getMusicList (topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  const data = Object.assign({}, commonParams, {
    topid,
    platform: 'h5',
    needNewCode: 1,
    tpl: 3,
    page: 'detail',
    type: 'top',
    _: 1502866562404
  })

  return jsonp(url, data, options)
}
