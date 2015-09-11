function inventory(curList, newList) {
  // All inventory must be accounted for or you're fired!
  //  return arr1;
  var itemList = [];
  itemList = newList;

  curList.forEach(function(curItem, index) {
    //  console.log("index " + index);
    //  console.log("curItem " + curItem[0] + " : " + curItem[1]);
    for (var i = 0; i < newList.length; i++) {
      if (newList[i][1] === curItem[1]) {
        // update count
        //  console.log("zhoda " + newList[i][1] + " " + curItem[1]);
        var sum = (curItem[0] + newList[i][0]);
        //    console.log("typeof " + typeof (curItem[0]) + " " + typeof (newList[i][0]));
        //  console.log(sum);
        itemList[i][0] = sum;

        break;
      }

    }

  })
  curList.forEach(function(curItem, index) {
    var add = true;
    for (var i = 0; i < newList.length; i++) {
      if (curItem[1] === newList[i][1]) {
        add = false;
        break;
      }
    }
    // push curItem
    if (add) {
      newList.push(curItem);
    } else {
      add = true;
    }
  })

  itemList.forEach(function(item) {
    console.log(item[0] + " " + item[1]);
  })

  // sort alphabet
  itemList.sort(function(a, b) {
    console.log("a[1] " + a[1] + " b[1] " + b[1]);
    if (a[1] > b[1]) {
      return 1;
    }
    if (a[1] < b[1]) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  //
  itemList.forEach(function(item) {
    console.log(item[0] + " " + item[1]);
  })

  return itemList;
}

// Example inventory lists
var curInv = [
  [21, 'Bowling Ball'],
  [2, 'Dirty Sock'],
  [1, 'Hair Pin'],
  [5, 'Microphone']
];

var newInv = [
  [2, 'Hair Pin'],
  [3, 'Half-Eaten Apple'],
  [67, 'Bowling Ball'],
  [7, 'Toothpaste']
];

inventory(curInv, newInv);

// podla new curr prebehnut ak najde vrati adresu aby sa updatol pocet
// ak nevrati adresu pridat
// abecedne zoradit
/*
newList.forEach(function(newItem) {
  if (curItem[1] === newItem[1]) {
    console.log("zhoda item " + curItem[1] + " N " + newItem[1]);
    // update num

  } else {
    // add item
    console.log(" item " + curItem[1] + " N " + newItem[1]);
    itemList.push(curItem);

  }
})
*/
