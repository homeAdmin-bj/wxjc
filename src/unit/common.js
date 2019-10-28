const administrationChoice = function (list) {
//   console.log(list);

  var selectList = [];
  var selectListName = [];
  var selectListId = [];
  for (
    let index = 0; index < list.length; index++
  ) {
    const element = list[index];
    // console.log(element);
    if (!element.children) {
      selectList.push(element);
      selectListName.push(element.name);
      selectListId.push(element.id);
    }
    // if (element.children.length == 0) {

    // }
  }
  return {
    selectList,
    selectListName,
    selectListId
  }
};
export {
  administrationChoice
}
