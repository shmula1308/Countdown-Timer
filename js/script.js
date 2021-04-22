     
   let form = document.querySelector('#event-form');
   const displayControls = document.querySelector('.display-controls');
   const eventsMenu = document.querySelector('.events-menu');



   let date;
   let time;
   let eventName;
   let timmy;

   function CountDown (n,futureEvent,evName,d,days,hr,min,sec) {
    this.n = n;
    this.futureEvent = futureEvent;
    this.evName = evName;
    this.d = d;
    this.days = days;
    this.hr = hr;
    this.min = min;
    this.sec = sec;
}

 let countDown;


  //  Event: Save and Reset
  displayControls.addEventListener('click',(ev) => {
      if(ev.target.matches('.save')) {
        addEventToSideMenu(countDown)
      }
  })

     
  document.getElementById('start').addEventListener('click', (ev) => {
      ev.preventDefault();
      date = document.getElementById('date').value;
      time = document.getElementById('time').value;
      eventName = document.getElementById('event').value;
      date = date.split('-');
      time = time.split(":");
      if(!eventName) {
      document.getElementById('event').style.border = '1px solid red';
      document.getElementById('event').placeholder = "Please provide event title";
      return;
      } 
      document.getElementById('event').style.border = 'none';
      timmy = setInterval(updateTimer,1000)
      form.reset();
  })

  function addEventToSideMenu(timerObj) {
    eventsMenu.innerHTML = `<div class="event">
    <h4 class="event-title">${timerObj.evName}</h4>
    <div class="timer">
    ${timerObj.days}<span class="days"> Day</span> ${timerObj.hr}<span class="hours"> Hour</span>
    ${timerObj.min}<span class="min"> Min</span> ${timerObj.sec}<span class="sec"> Sec</span>
    </div>
    </div>`

     
  }
    
    // function updateTimer() {
    //     let [year,month,day] = date;
    //     let [hr,min] = time;
        
    //     if(!hr) {
    //       hr = 0;
    //       min = 0;
    //     }
        
    //     document.querySelector('.main-event-title').textContent = eventName;
        
    //     let now = new Date();
    //     let futureDate = new Date(year,month-1,day,hr,min);
    //     const d = 'Days';
    //     const h = 'Hours';
        
      
    //     //let futureDate = new Date(1995, 11, 17, 3, 24, 0)
    //     let distance = futureDate.getTime() - now.getTime(); //distance from now to future event in miliseconds
    //     //we will get days, hours,minutes, seconds
    //     console.log(distance)
    //     let days = Math.floor(distance / (1000*60*60*24));
    //     let hours = Math.floor((distance % (1000*60*60*24))/(1000*60*60));
    //     let minutes = Math.floor((distance % (1000*60*60))/(1000*60));
    //     let seconds = Math.floor((distance % (1000*60))/(1000));
    //     let timer = document.querySelector('.main-timer');

    //     if(distance < 0) {
    //       timer.innerHTML = 'DONE';
    //       clearInterval(timmy);
    //       return;
    //     }
        
    //     timer.innerHTML = `<p>
    //     ${days}<span class="days">${days > 1 ? d : "Day"}</span>${hours}<span class="hours">${hours > 1 ? h : "Hour"}</span
    //     >${minutes}<span class="min">Min</span>${seconds}<span class="sec">Sec</span>
    //   </p>`
        
    // }


    function updateTimer() {
        countDown = createCountDown();

        const d = 'Days';
        const h = 'Hours';

       
        if(countDown.d < 0) {
          timer.innerHTML = 'DONE';
          clearInterval(timmy);
          return;
        }

        document.querySelector('.main-event-title').textContent = eventName;
        let timer = document.querySelector('.main-timer');
        timer.innerHTML = `<p>
        ${countDown.days}<span class="days">${countDown.days > 1 ? d : "Day"}</span>${countDown.hr}<span class="hours">${countDown.hours > 1 ? h : "Hour"}</span
        >${countDown.min}<span class="min">Min</span>${countDown.sec}<span class="sec">Sec</span>
        </p>`
    }


    function createCountDown() {
        let [year,month,day] = date;
                let [hr,min] = time;
                
        if(!hr) {
          hr = 0;
          min = 0;
        }

        let now = new Date();
        let futureDate = new Date(year,month-1,day,hr,min);
        // const d = 'Days';
        // const h = 'Hours';

        let distance = futureDate.getTime() - now.getTime();
        let days = Math.floor(distance / (1000*60*60*24));
        let hours = Math.floor((distance % (1000*60*60*24))/(1000*60*60));
        let minutes = Math.floor((distance % (1000*60*60))/(1000*60));
        let seconds = Math.floor((distance % (1000*60))/(1000));
        
        

        return new CountDown(now,futureDate,eventName,distance,days,hours,minutes,seconds);
    }

   