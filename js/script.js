     
   let form = document.querySelector('#event-form');
   const displayControls = document.querySelector('.display-controls');
   const eventsMenu = document.querySelector('.events-menu');
   const removeSideMenuEvent = document.getElementsByTagName('i');
   let timer = document.querySelector('.main-timer');



   let date;
   let time;
   let eventName;
   let timmy;
   let sideTimmy;

   let eventsArr = [];

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

function Event(eventName,date,time) {
  this.eventName = eventName;
  this.date = date;
  this.time = time;
}

 let countDown;


 document.addEventListener('DOMContentLoaded', () => {
      getStore();
      sideTimmy = setInterval(addEventToSideMenu,1000);
 })

  //  Events: Save and Reset
  displayControls.addEventListener('click',(ev) => {
      if(ev.target.matches('.save')) {
        if(!eventName || !date) {
          return;
        }else {
          const event = new Event(eventName,date,time);
          let check;
          eventsArr.forEach(e => {
            if(e.eventName === event.eventName) {
              check = true;
            }
          })
          if(check) {
            alert("The event already exists! Please rename the event.")
            return;
          } else {
            eventsArr.push(event);
            setStore(eventsArr)
            sideTimmy = setInterval(addEventToSideMenu,1000)
          }
        }
        
      }
      if(ev.target.matches('.reset')) {
        resetTimer()
        clearInterval(timmy);
        
      }
      
  })

  //Event: remove side menu event

  eventsMenu.addEventListener('click',(ev) => {
     if(ev.target.matches('.trash')) {
       let id = ev.target.parentNode.dataset.evName;
       console.log(id)
       ev.target.parentNode.remove();
       getStore();
       eventsArr = eventsArr.filter(e => e.eventName != id)
       setStore(eventsArr);

     }
  })

  function setStore(evArr) {
     localStorage.setItem('events',JSON.stringify(evArr));
  }

  function getStore() {
     if(JSON.parse(localStorage.getItem('events')) === null) {
      eventsArr = []
     } else {
      eventsArr = JSON.parse(localStorage.getItem('events'))
     } 
  }

  function addEventToSideMenu() {
    let df = new DocumentFragment()
    eventsArr.forEach(evObj => {
        
        let date = evObj.date;
        let time = evObj.time;
        let evName = evObj.eventName;
        let[year,month,day] = date;
        let[hr,min] = time;

        if(!hr) {
          hr = 0;
          min = 0;
        }
        
        let now = new Date();
        let futureDate = new Date(year,month-1,day,hr,min);

        

        let distance = futureDate.getTime() - now.getTime();
        let days = Math.floor(distance / (1000*60*60*24));
        let hours = Math.floor((distance % (1000*60*60*24))/(1000*60*60));
        let minutes = Math.floor((distance % (1000*60*60))/(1000*60));
        let seconds = Math.floor((distance % (1000*60))/(1000));

       

        let div = document.createElement('div');
        div.classList.add('event');
        div.dataset.evName = evName;
        div.innerHTML = `<h4 class="event-title">${evName}</h4>
        <i class="fas fa-trash-alt trash"></i>
        <div class="timer">
        ${days}<span class="days">${days > 1 ? 'Days' : days === 0 ? 'Days' : 'Day'}</span> ${hours}<span class="hours"> ${hours > 1 ? 'Hours' : hours === 0 ? 'Hours' : 'Hour'}</span>
        ${minutes}<span class="min"> Min</span> ${seconds}<span class="sec"> Sec</span>
        </div>`
        if(distance < 0) {
          div.innerHTML = 'DONE';
          clearInterval(sideTimmy);
          
        }

        df.append(div);
    })
    eventsMenu.innerHTML = "<h2 class='events-menu-title'>Events</h2>";
    eventsMenu.append(df);
  }

     
  document.getElementById('start').addEventListener('click', (ev) => {
      ev.preventDefault();
      date = document.getElementById('date').value;
      time = document.getElementById('time').value;
      eventName = document.getElementById('event').value;

      if(!date &&!eventName) {
        document.getElementById('date').style.border = '3px solid red';
        document.getElementById('event').style.border = '3px solid red';
        document.getElementById('event').placeholder = 'Please provide event title';
        resetTimer();
        clearInterval(timmy);
        return;  
      }
      if(!date) {
        document.getElementById('event').style.border = 'none';
        document.getElementById('date').style.border = 'none';
        document.getElementById('date').style.border = '3px solid red';
        resetTimer();
        clearInterval(timmy);
        return;
        }
      if(!eventName) {
          document.getElementById('event').style.border = 'none';
          document.getElementById('date').style.border = 'none';
          document.getElementById('event').style.border = '3px solid red';
          document.getElementById('event').placeholder = 'Please provide event title';  
          resetTimer();
          clearInterval(timmy);
          return;
      }
     
      
      document.getElementById('event').style.border = 'none';
      document.getElementById('date').style.border = 'none';
      
      date = date.split('-');
      time = time.split(":");
  
      document.getElementById('event').style.border = 'none';
      timmy = setInterval(updateTimer,1000)
      form.reset();
  })


  
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
        
        timer.innerHTML = `<p>
        ${countDown.days}<span class="days">${countDown.days > 1 ? d : countDown.days === 0 ? d : 'Day'}</span>${countDown.hr}<span class="hours">${countDown.hr > 1 ? h : countDown.hr === 0 ? h : "Hour"}</span
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

        let distance = futureDate.getTime() - now.getTime();
        let days = Math.floor(distance / (1000*60*60*24));
        let hours = Math.floor((distance % (1000*60*60*24))/(1000*60*60));
        let minutes = Math.floor((distance % (1000*60*60))/(1000*60));
        let seconds = Math.floor((distance % (1000*60))/(1000));
        
        const event = new CountDown(now,futureDate,eventName,distance,days,hours,minutes,seconds);
        return event;
    }

   function resetTimer() {
    document.querySelector('.main-event-title').textContent = "";
    let timer = document.querySelector('.main-timer');
    timer.innerHTML = `<p>
    00<span class="days">Day</span>00<span class="hours">Hour</span
    >00<span class="min">Min</span>00<span class="sec">Sec</span>
    </p>`
    date = "";
    time = "";
    eventName = "";
   }