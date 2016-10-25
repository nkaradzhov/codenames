export function replace(select, list, obj) {
  return list.map(function(item) {
    return select(item) === select(obj) ?
      obj : item
  })
}

export function replaceAll(select, listA, listB) {
  return listA.map(function(item) {
    var replace = find(select, listB, select(item))
    return replace? replace : item
  })
}

function find(select, list, value) {
  return list.filter(function(item) {
    return select(item) === value
  })[0]
}
