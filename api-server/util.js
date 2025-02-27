function getMinNumber(num1, num2) {
  if (isNaN(num1) || isNaN(num2)) { //isNaN method inbuild for check num or not
    return {
      status: 400,
      data: {
        error: `both parameters should be numbers`,
      },
    };
  }
  return {
    status: 200,
    data: { min: Math.min(num1, num2) }, //inbuild method 
  };
}

function getMaxNumber(num1, num2) {
  if (isNaN(num1) || isNaN(num2)) { //isNaN method inbuild for check num or not
    return {
      status: 400,
      data: {
        error: `both parameters should be numbers then only print `,
      },
    };
  }
  return {
    status: 200,
    data: { max: Math.max(num1, num2) }, //inbuild method 
  };
}

function getAvgOfTwoNumber(num1, num2) {
  if (isNaN(num1) || isNaN(num2)) { //isNaN method inbuild for check num or not
    return {
      status: 400,
      data: {
        error: `both parameters should be numbers then only print `,
      },
    };
  }
  let avg = (num1 + num2) / 2;
  return {
    status: 200,
    data: { average: avg }
  };
}

function getSortedNumber(numArray, type) {
  const convertArray = numArray.split(',').map(num => parseInt(num)); //spliting with , 
  console.log(convertArray);
  convertArray.forEach((item) => {
    if (isNaN(item)) {  //num or not num
      return {
        status: 400,
        data: {
          error: `All parameters should be numbers`,
        },
      };
    }
  });
  let sortlistArr;
  let type2 = type.replace(/['"]/g, "");
  if (type2 == "asc") {
    console.log("anoj11122a");
    sortlistArr = assending(convertArray);
  }
  else {
    sortlistArr = sortDescending(convertArray);
  }
  //convertArray.sort()
  // console.log("Sorted: " + convertArray);
  const newStr = type.replace(/['"]/g, "");
  //console.log("=====uuuuuuuuuuu=======");
  //console.log(newStr);
  //console.log("=====uuuuuuuuuuu=======");
  //console.log(type);
  return {
    status: 200,
    data: { sorted: sortlistArr }
  };
}

function assending(arr) {
  //console.log("anojaa");
  let n = arr.length;

  for (let i = 0; i < n; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
      }
    }
    if (!swapped) {
      break;
    }
  }
  return arr;
}

function sortDescending(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] < array[j + 1]) {
        // Swap elements if they are in the wrong order
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  return array;
}



//to count
function getOccurrenceCount(numArray, search) {
  const array = numArray.split(','); // Split input by commas
  const count = array.filter(item => item.trim() === search).length;

  return {
    status: 200,
    data: { search, count }
  };
}

module.exports = { getMinNumber, getMaxNumber, getAvgOfTwoNumber, getSortedNumber, getOccurrenceCount };
