import fetch from './fetch';

/**
 * 获取首页定位地址
 */
export const cityGuess = () => fetch('/v1/cities', {
  type: 'guess'
})

/**
 * 获取首页热门城市
 */
export const hotCity = () => fetch('/v1/cities', {
  type: 'hot'
})

/**
 * 获取首页所有城市
 */
export const groupCity = () => fetch('/v1/cities', {
  type: 'group'
})

/**
 * 获取当前所在城市
 */
export const currentCity = number => fetch('/v1/cities/' + number)