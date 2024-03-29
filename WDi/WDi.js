

function CreateCmt(cmtName, cmtWish){
    return '<div class="cmtName">' + cmtName + '</div><div class="cmtWish">' + cmtWish + '</div>';
}

function SendWish(){
    alert("Lễ cưới đã được diễn ra thành công. Chức năng tạm khóa. Vui lòng liên hệ chủ sở hữu");
}

function GetWishes(){
    //var wishes=[];
    $.ajax({ //Sử dụng Ajax gửi lệnh
        url: 'https://script.google.com/macros/s/AKfycbz4iOwfAfEL5SzyrdQmcurEbYAmQedKWCYLXIWIq3cGPlJnUW9g6Q1VnpLl2CsUEhlyXQ/exec?get=cm',
        method: "GET",
        dataType: 'json',
        data: '',
        success: function(responseData, textStatus, jqXHR) {
            if(textStatus!='success'){
                //không lấy được dữ liệu, có thể do không có dữ liệu hoặc bị lỗi.
                //wishes=[];
            }
            else{
                //wishes = responseData.data;
                ShowWishes(responseData.data);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            //alert('Không tải được thông tin. Hãy thử đăng nhập tài khoản google trước');
            console.log(errorThrown);
        }
    });
}

function ShowWishes(wishes){
    if(wishes == undefined) return;
    if(wishes.length < 1)   return;
    
    var wHtml='<div class="comment blank" id="newCmt"></div>';
    wishes.forEach(item => {
        wHtml+= '<div class="comment">' + CreateCmt(item[0], item[1]) + '</div>';
    });
    document.querySelector('#boxWishes').innerHTML = wHtml;
}


function Contact(p){
    alert("Thông tin liên hệ đã được ẩn, đề nghị liên hệ chủ sở hữu");
    switch(p){
        case 'pN':
        case 'mN':
        case 'zN':
        case 'lN':
        case 'fN':
            window.open('https://fb.me/N7023C', '_blank');
            break;
        case 'pC':
        case 'mC':
        case 'zC':
        case 'lC':
        case 'fC':
            window.open('https://fb.me/C7023N', '_blank');
            break;
    }
}


let WDsec = (new Date(2024, 2, 20, 11, 11, 11, 111)).getTime(); //20/3/2024

function Countdown()
{
    var td = new Date();
    var tdSec = td.getTime();
    var secs = Math.floor((-tdSec + WDsec) / 1000);
    if(secs<0){
        return;
    }
    var dhm = Math.floor(secs / 86400);
    secs %= 86400;
    document.getElementById("ngay").innerText = dhm;
    dhm = Math.floor(secs / 3600);
    secs %= 3600;
    document.getElementById("gio").innerText = dhm < 10 ? ("0" + dhm) : dhm;
    dhm=Math.floor(secs / 60);
    document.getElementById("phut").innerText = dhm < 10 ? ("0" + dhm) : dhm;
    secs %= 60;
    document.getElementById("giay").innerText = secs < 10 ? ("0" + secs) : secs;
}


function selectConfirm(){
    var num = document.querySelector(".inp#Number");
    if(document.querySelector(".inp#Join").value == "không")
    {
        num.setAttribute('hidden', 'true');
        num.value = 0;
    }
    else{
        try{
            num.removeAttribute("hidden");
            if(num.value==0)    num.value = 1;
        }
        catch{
            ;
        }
    }
}

var lstPhoto = [];
var photoCount = 11;
var maxIndex = 10;

function CreateListPhoto(){
    var tmpLstPhoto=[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    for(var j = 0; j < photoCount; j++)
    {
        lstPhoto.push(tmpLstPhoto.splice(Math.floor(Math.random() * (photoCount - j)), 1));
    }
    i_cur = maxIndex;
    NextPhoto();
}

var i_cur = 0;
var i_pre, i_nxt;

function NextPhoto(){ //i_cur: index của ảnh hiện tại
    i_nxt = (i_cur == maxIndex) ? 0 : i_cur + 1;
    document.getElementById("p0").style.backgroundImage = "url('./imgs/ps/" + lstPhoto[i_nxt] + ".jpg')";
    i_cur = i_nxt;
}

function PrePhoto(){
    i_pre = (i_cur == 0) ? maxIndex : i_cur - 1;
    document.getElementById("p0").style.backgroundImage = "url('./imgs/ps/" + lstPhoto[i_pre] + ".jpg')";
    i_cur = i_pre;
}


var audioCount = 11; //Số lượng bài hát trong danh sách; NHỚ THÊM GIÁ TRỊ TRONG MẢNG tmplstNhac Ở HÀM CreateRandomLstNhac
//var isPlaying = false;
var lstNhac = new Array();

function CreateRandomLstNhac()
{
    var tmplstNhac = [ 0, 3, 8, 14, 21, 51, 57, 96, 104, 120];
    lstNhac = [61];

    for(var i = 1; i < audioCount; i++)
    {
        lstNhac.push(tmplstNhac.splice(Math.floor(Math.random() * tmplstNhac.length), 1));
    }
}

function PlayAudio()
{
    var aud = document.getElementById("au");
    aud.setAttribute("src", "../audios/" + lstNhac[0]);
    aud.play();
}

function BtnAudioClicked(){
    //document.getElementById("btnPlayPause").hidden = true;
    PlayAudio();
}

function SetBtnPause()
{
    //document.getElementById("btnPlayPause").setAttribute("src", imgPause);
    //isPlaying = true;
    lstNhac.shift();
    if(lstNhac.length === 0)
    {
        CreateRandomLstNhac();
    }
    document.getElementById("btnPlayPause").hidden = true;
}
