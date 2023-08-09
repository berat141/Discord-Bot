module.exports.intent = (G) => {
let res = []
Object.entries(G).filter((key,val)=> typeof val == "number").forEach(val => {
  res.push(val)
})

return res
}
