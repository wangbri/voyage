
var schedules = []; //the different list 
var times = [];

function findShortestSchedule(){
  return new Promise(function(resolve) {
    for(var i = 0; i < schedules.length; i++){
        //schedules[i].calculateTime()
        getScheduleTime(schedules[i]);
    }
  });   
}

function getScheduleTime(schedule) {
  schedule.calculateTime().then(function(data) {
  });
}

export function createSchedule(){
  //make a start and end location pair out of each of location in the markers 
  for(var startKey in locationsMarkers){
    for(var endKey in locationsMarkers){
      //avoid duplicated pairing where end and start are the same
      if(locationsMarkers[startKey].key != locationsMarkers[endKey].key){
        //create a new class of schedule for each pair
        var currentSched = new Schedule(locationsMarkers[startKey].key, locationsMarkers[endKey].key);
        
        //generate a list of the intermediate places 
        var addresses  = [];
        for (var middleKey in locationsMarkers){
          if((locationsMarkers[middleKey].key != locationsMarkers[startKey].key) && (locationsMarkers[middleKey].key != locationsMarkers[endKey].key)){
            addresses.push(locationsMarkers[middleKey].key);
          }
        }
        
        currentSched.addPlace(addresses);
        schedules.push(currentSched); // create schedule 

      }
    }
   }


  findShortestSchedule().then(function() {
    console.log(times);
  });
}