function drawer(price, cash, cid) {
  var change = [];
  var types = ['PENNY', 'NICKEL', 'DIME', 'QUARTER', 'ONE', 'FIVE',
    'TEN', 'TWENTY', 'ONE HUNDRED'];
  var values = {
    'PENNY': 1,
    'NICKEL': 5,
    'DIME': 10,
    'QUARTER': 25,
    'ONE': 100,
    'FIVE': 500,
    'TEN': 1000,
    'TWENTY': 2000,
    'ONE HUNDRED': 10000
  };
  price = setPrice(price);

  var cashback = Math.round((cash - price) * 100);
  console.log("cashback " + cashback);
  var typeVal = types.length - 1;
  var changeValue = 0;
  var cashLeft = 0;
  while (typeVal !== -1 && changeValue !== cashback) {
    var changeLeft = cashback - changeValue;
    var value = values[types[typeVal]];
    var availChange = Math.round(cid[typeVal][1] * 100);
    if (value > changeLeft || availChange === 0) {
      typeVal--;
      cashLeft += availChange;
    } else {
      var cashType = Math.min(availChange, changeLeft - changeLeft % value);
      console.log(cashType);
      changeValue += cashType;
      cid[typeVal][1] -= cashType / 100;
      change.push([types[typeVal], cashType / 100]);
    }
  }
  if (changeValue !== cashback) {
    console.log("Insufficient Funds");
    return "Insufficient Funds";
  }
  if (cashLeft === 0) {
    console.log("Closed");
    return "Closed";
  }
  console.log("change " + change);
  return change;
}

drawer(55.89, 100.00, [['PENNY', 1.01], ['NICKEL', 2.05], ['DIME', 3.10],
  ['QUARTER', 4.25], ['ONE', 90.00], ['FIVE', 55.00], ['TEN', 20.00],
  ['TWENTY', 60.00], ['ONE HUNDRED', 100.00]]);
function setPrice(price) {
  var out = prompt("set actual price", price);
  console.log(out);

  return out;
}
;
