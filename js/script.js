     
   let form = document.querySelector('#event-form');
   
   let date;
   let time;
   let eventName;
   let timmy;
     
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
    
    function updateTimer() {
        let [year,month,day] = date;
        let [hr,min] = time;
        
        if(!hr) {
          hr = 0;
          min = 0;
        }
        

        document.querySelector('.main-event-title').textContent = eventName;
        
        let now = new Date();
        let futureDate = new Date(year,month-1,day,hr,min);
        const d = 'Days';
        const h = 'Hours';
        
      
        //let futureDate = new Date(1995, 11, 17, 3, 24, 0)
        let distance = futureDate.getTime() - now.getTime(); //distance from now to future event in miliseconds
        //we will get days, hours,minutes, seconds
        console.log(distance)
        let days = Math.floor(distance / (1000*60*60*24));
        let hours = Math.floor((distance % (1000*60*60*24))/(1000*60*60));
        let minutes = Math.floor((distance % (1000*60*60))/(1000*60));
        let seconds = Math.floor((distance % (1000*60))/(1000));
        let timer = document.querySelector('.main-timer');

        if(distance < 0) {
          timer.innerHTML = 'DONE';
          clearInterval(timmy);
          return;
        }
        
        timer.innerHTML = `<p>
        ${days}<span class="days">${days > 1 ? d : "Day"}</span>${hours}<span class="hours">${hours > 1 ? h : "Hour"}</span
        >${minutes}<span class="min">Min</span>${seconds}<span class="sec">Sec</span>
      </p>`
        
    }

   