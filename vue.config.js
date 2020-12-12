module.exports = {
  configureWebpack: {
    resolve: {
      alias: { //CLI3中，@默认代表src文件夹
        'assets': '@/assets',
        'config': '@/config',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}