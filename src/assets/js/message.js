import vue from '@/main'
export default {
  info (conf) {
    if(typeof conf == 'string'){
      vue.$Notice.info({
        title: conf,
      })
    }else {
      vue.$Notice.info({
        title: conf.title?conf.title:'信息',
        desc: conf.desc?conf.desc:''
      });
    }

},
success (conf) {
  if(typeof conf == 'string'){
    vue.$Notice.success({
      title: conf,
    })
  }else {
    vue.$Notice.success({
      title: conf.title?conf.title:'成功',
      desc: conf.desc?conf.desc:''
    });
  }
},
warning (conf) {
  if(typeof conf == 'string'){
    vue.$Notice.warning({
      title: conf,
    })
  }else {
    vue.$Notice.warning({
      title: conf.title?conf.title:'注意',
      desc: conf.desc?conf.desc:''
    });
  }
},
error (conf) {
  if(typeof conf == 'string'){
    vue.$Notice.error({
      title: conf,
    })
  }else {
    vue.$Notice.error({
      title: conf.title?conf.title:'错误',
      desc: conf.desc?conf.desc:''
    });
  }
}
}
