const express = require('express');
const {getMinNumber,getMaxNumber,getAvgOfTwoNumber,getSortedNumber} = require('./util.js');

const app = new express();
const port = 3000;
//to find max number
app.get('/number/max', (req, res) => {
  const num1 = parseFloat(req.query.num1);//query parameter
  const num2 = parseFloat(req.query.num2);

  const result = getMaxNumber(num1, num2);

  res.status(result.status).json(result.data);
});
//to find average 
app.get('/number/avg', (req, res) => {
  const num1 = parseFloat(req.query.num1);//query parameter
  const num2 = parseFloat(req.query.num2);

  const result = getAvgOfTwoNumber(num1, num2);

  res.status(result.status).json(result.data);
}); ///number/avg?numbers=1,4,7,44,676,......n

//to find sort

app.get('/number/sort', (req, res) => {
  const numbersParam = req.query.numbers;
  const type = req.query.type;
  //console.log("============");
	//console.log(type);
	//console.log("============");
  const result = getSortedNumber(numbersParam,type);
  

  res.status(result.status).json(result.data);
}); ///number/sort?numbers=1,4,7,44,676,......n&type (asc |dec)
app.get('/number/count', (req, res) => {}); ///number/count?numbers=1,A,saman,Kamal,676,......n&search=saman //need to return how many occurances

//to find min number 
app.get('/number/min', (req, res) => {
  const num1 = parseFloat(req.query.num1);//query parameter
  const num2 = parseFloat(req.query.num2);

  const result = getMinNumber(num1, num2);

  res.status(result.status).json(result.data);
});
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
