var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var schedule = require('node-schedule');
 


const users = {};
const hashed_user = {};
const products = {};
const highest_bid = {};
var winner_bid = {};
var cool_off_period=0;

const slots = [18,19,19.5,20,20.5,21];

var job1 = schedule.scheduleJob('30 * * * *', function(){
  winner_bid =  JSON.parse(JSON.stringify(highest_bid));
});

var job2 = schedule.scheduleJob('34 * * * *', function(){
  console.log('The answer to life, the universe, and everything!');
  winner_bid =  JSON.parse(JSON.stringify(highest_bid));
  cool_off_period=60*5;
  var cop = setInterval(()=>{
    console.log(cool_off_period);
    cool_off_period=cool_off_period-1;
    if(cool_off_period === 0){
      clearInterval(cop);
    }
  },1000)
});




io.on('connection', function(socket){
  console.log('a user connected');

  

  socket.on('registration', function(user){
    console.log('user-joined',user,socket.id);
    users[socket.id] = user;
    hashed_user[user.bidder_id] = socket.id;
  });

  socket.on('land-on-bid', function(data){
    console.log(data)
    if(products[data.product_id]){
      if(products[data.product_id][data.bidder_id]){
        products[data.product_id][data.bidder_id] = data.bid_value;
      }else{
        //products[data.product_id] = {};
        products[data.product_id][data.bidder_id] = data.bid_value;
      }
    }else{
      products[data.product_id] = {};
      products[data.product_id][data.bidder_id] = data.bid_value;

      highest_bid[data.product_id] = {};
      highest_bid[data.product_id]['id'] = data.bidder_id;
      highest_bid[data.product_id]['bid_value'] = data.bid_value;
    }
    console.log('products',products);
    console.log('highest_bid',highest_bid);
  });

  socket.on('make-a-bid', function(data){
    console.log(data,cool_off_period)
    if(cool_off_period > 0){
      socket.emit('cool_off_period',{'time':cool_off_period})
    }else if(products[data.product_id]){
      socket.emit('cool_off_period',0)
      products[data.product_id][data.bidder_id] = data.bid_value;
      if(highest_bid[data.product_id]['bid_value'] < data.bid_value){
        highest_bid[data.product_id] = {};
        highest_bid[data.product_id]['id'] = data.bidder_id;
        highest_bid[data.product_id]['bid_value'] = data.bid_value;
      }
    }else{
      products[data.product_id] = {};
      products[data.product_id][data.bidder_id] = data.bid_value;

      highest_bid[data.product_id] = {};
      highest_bid[data.product_id]['id'] = data.bidder_id;
      highest_bid[data.product_id]['bid_value'] = data.bid_value;
    }
    console.log('products',products);
    console.log('highest_bid',highest_bid);
  });

  socket.on('get-results', function(data){
    console.log('get-results',data)
    socket.emit('broadcast-result', winner_bid);
  });

  socket.on('disconnect', function(){
    delete users[socket.id]
    console.log('user disconnected',socket.id);
  });
});

http.listen(3002, function(){
  console.log('listening on *:3002');
});