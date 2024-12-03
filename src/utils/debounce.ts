export  function debounce(fn:any, delay?:number) {
  let timber = 0
  return () => {
    if (timber) {
      return
    }
    timber = setTimeout(() => {
      fn()
      timber = 0
    }, delay || 200)
  }
}