const PermFun={
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
