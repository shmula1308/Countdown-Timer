     
   let date;
   let time;
   let eventName;
     
     document.getElementById('start').addEventListener('click', (ev) => {
         ev.preventDefault();
         date = document.getElementById('date').value;
         time = document.getElementById('time').value;
         eventName = document.getElementById('event').value;
         date = date.split('-');
         time = time.split(":");
         setInterval(updateTimer,1000)
     })
    
    function updateTimer() {
        
        console.log(date)
        let [year,month,day] = date;
        let [hr,min] = time;
            let now = new Date();
            let futureDate = new Date(year,month,day,hr,min);
         
            //let futureDate = new Date(1995, 11, 17, 3, 24, 0)
            let distance = futureDate.getTime() - now.getTime(); //distance from now to future even in miliseconds
            //we will get days, hours,minutes, seconds
            console.log(now.getTime())
            let days = Math.floor(distance / (1000*60*60*24));
            let hours = Math.floor((distance % (1000*60*60*24))/(1000*60*60));
            let minutes = Math.floor((distance % (1000*60*60))/(1000*60));
            let seconds = Math.floor((distance % (1000*60))/(1000));
            let timer = document.querySelector('.main-timer');
            timer.innerHTML = `<p>
            ${days}<span class="days">Day</span>${hours}<span class="hours">Hour</span
            >${minutes}<span class="min">Min</span>${seconds}<span class="sec">Sec</span>
          </p>`
    }

   