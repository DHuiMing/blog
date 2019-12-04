import store from '@/store'
const PermFun={
  isCheck(btn,scriptid) {
    for (var b in btn) {
      if (btn[b].scriptid == scriptid) {
        return true
      }
    }
    return;
  },
  checkPerm(path,scriptid) {
    let power = store.state.app.perm.length >0 ? store.state.app.perm : JSON.parse(localStorage.getItem('perm'));
    if (path == '工作台' && power[0].label == '特殊权限') {
      return true
    }
    for (var n in power) {
      if (power[n].children) {
        let powerchild = power[n].children
        for (var m in powerchild) {
          if ((powerchild[m].label == path) || (powerchild[m].href == path)) {
            return this.isCheck(powerchild[m].BtnPermList.btn,scriptid)
          }
        }
      }else {
        if ((power[n].label == path) || (power[n].href == path )) {
          return this.isCheck(power[n].BtnPermList.btn,scriptid)
        }else {
          return
        }
      }
    }
  },
  getPerm(route) {
    let Perm = {};
    let PermList = JSON.parse(localStorage.getItem('Perm'))
    for(let i=0;i<PermList.length;i++){
      if(!PermList[i].children){
        if(PermList[i].scriptid == route){
          Perm = PermList[i].BtnPermList
        }
      }else{
        let subItem = PermList[i].children
        for(let j=0;j<subItem.length;j++){
          if(!subItem[j].children){
            if(subItem[j].scriptid == route){
              Perm = subItem[j].BtnPermList
            }
          }
        }
      }
    }
    return Perm
  },
  getBtnPerm3(perm,url){
    if(!perm){
      return;
    }
    var len = perm.length;
    if(perm.length) {
      for(let i = 0; i < len; i++){
        var scriptid = perm[i].scriptid
        if(scriptid == url) {
          return true;
        }
      }
    }
    return false;
  }
}
export default PermFun
