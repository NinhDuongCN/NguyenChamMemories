var flag = false;
const dayofmonth = [30, 31, 31, 30, 31]; 
const dayBorn = new Date(2024, 10, 28);

function CountboxDisplay()
{
    Count();
    if(flag){
        document.getElementById('countdown').removeAttribute("hidden");
        document.getElementById('countup').setAttribute('hidden', 'true');
    }
    else{
        document.getElementById('countup').removeAttribute("hidden");
        document.getElementById('countdown').setAttribute('hidden', 'true');
    }
    flag = !flag
}

function DayLeft(){
    
    let td = new Date();
    let bMonth = dayBorn.getMonth();
    let tMonth = td.getMonth();
    if(tMonth > bMonth) return 1;

    let tDay = td.getDate();
    let re = dayBorn.getDate();

    while(tMonth < bMonth){
        re += dayofmonth[(--bMonth)-5];
    }
    return re - tDay;
}

function ZeroPadding(num){
    return (num<10?'0':'')+num;
}

function Count(){
    let dl = DayLeft();
    document.getElementById('daysleft').innerText = ZeroPadding(dl);
    dl = 280-dl;
    let wl = Math.floor(dl/7);
    document.getElementById('week').innerText = ZeroPadding(wl);
    document.getElementById('day').innerText = ZeroPadding(dl-wl*7);
}