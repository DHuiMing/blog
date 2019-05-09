const ls={
  setItem(key,value) {
    if (typeof (value) != 'string'){
      localStorage.setItem(key,JSON.stringify(value))
    }else {
      localStorage.setItem(key,value)
    }
  },
  removeItem(key) {
    localStorage.removeItem(key)
  },
  clear() {
    localStorage.clear()
  }
}
export default ls


