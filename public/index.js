'use strict';

//list of bats
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const bars = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'freemousse-bar',
  'pricePerHour': 50,
  'pricePerPerson': 20
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'solera',
  'pricePerHour': 100,
  'pricePerPerson': 40
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'la-poudriere',
  'pricePerHour': 250,
  'pricePerPerson': 80
}];

//list of current booking events
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful from step 4
const events = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'booker': 'esilv-bde',
  'barId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'time': 4,
  'persons': 8,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'booker': 'societe-generale',
  'barId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'time': 8,
  'persons': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'booker': 'otacos',
  'barId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'time': 5,
  'persons': 80,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'eventId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}];

console.log(bars);
console.log(events);
console.log(actors);


//var time = events[i].time * events[i].
//var people_component = events[i].persons * bars[i].pricePerPerson ;
// booking price = time + people

// Step 1
function booking_price()
{

  events.forEach(event=>{
    bars.forEach(bar => {
      if (event.barId==bar.id) {
        event.price = event.time*bar.pricePerHour + event.persons*bar.pricePerPerson;
      }
    });
  });
}
booking_price();
console.log("Step 1")
console.log("Let's print all the price");
events.forEach(event=>{console.log("The price for this event is " + event.price);})

//Step 2
// Decreasing pricing for people
function decreasing_price()
{
  events.forEach(event=>{

    if (event.persons>=10 && event.persons<20) {
      event.price -=event.price*0.1;
    }
    if (event.persons>=20 && event.persons<60) {
      event.price -=event.price*0.3;
    }
    if (event.persons>=60) {
      event.price -=event.price*0.5;
    }

  });
}

console.log("Step 2")
console.log("After the discount");
decreasing_price();
events.forEach(event=>{console.log("The price for this event is " + event.price);})




//Step 3
//Time to pay
function pay_price()
{
  events.forEach(event=>{
      			event.commission.insurance=0.5*(event.price*0.3);
      			event.commission.treasury=event.persons;
      			event.commission.privateaser=event.price*0.3-(event.commission.insurance+event.commission.treasury);

          })
}

console.log("Step 3")
console.log("Let's dispatch the money");
pay_price();

events.forEach(event=>{console.log(
	"Amount for the bar is : "+event.price*(0.7)+"\n"+"Amount for the insurance is : "+event.commission.insurance +"\n"+"Amount for the treasury is : "+event.commission.treasury 	+"\n"+"Amount for the privateaser is : "+event.commission.privateaser);
})


//Step 4
//The famous deductible
//The booker is charged an additional 1€/person when he chooses the deductible reduction option.

function deductible()
{
  events.forEach(event=>{

        event.options.deductibleReduction=true;

        event.price = event.price + event.persons;


  	})
}
console.log("Step 4")
console.log("As we can see just two of the events have choosen the deductible reduction")
deductible()
events.forEach(event=>{console.log("After the deductible reduction the price is : "+event.price);});








//Step 5
//Pay the actors


function pay_actor()
{
  events.forEach(event=>{
  	actors.forEach(actor =>{
  		if(actor.eventId==event.id){
  			actor.payment[1].amount=event.price- event.price*0.3;
  			actor.payment[2].amount=0.5*event.price*0.3;
  			actor.payment[3].amount=event.persons;
  			if(event.options.deductibleReduction==true){

  				actor.payment[4].amount=200+(event.price*0.3)-(actor.payment[2].amount+actor.payment[3].amount);

  			}
  			else{
  			actor.payment[4].amount=5000+(event.price*0.3)-(actor.payment[2].amount+actor.payment[3].amount);
  			}
  		}
  	})
  });
}

console.log("Step 5");
console.log("Pay the actors")
pay_actor()
actors.forEach(actor=>{console.log(
	"Amount for the bar : "+actor.payment[1].amount+"\n"+"Amount for the insurance is : "+actor.payment[2].amount+"\n"+"Amount for treasury is : "+actor.payment[3].amount	+"\n"+"Amount for the privateaser is : "+actor.payment[4].amount);
})
