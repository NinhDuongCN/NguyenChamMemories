// function PageLoading()
// {
//     Countdown();
//     setInterval(Countdown, 1000);
//     PlayAudio();
//     ChangeBackground();
// }

var WDsec = (new Date(2024, 2, 20, 11, 11, 11, 111)).getTime(); //20/3/2024

function Count()
{    
    var tdSec = (new Date()).getTime();
    var secs = Math.floor((tdSec - WDsec) / 1000);
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

var backgroundCount = 35; //số lượng ảnh nền. NHỚ THÊM GIÁ TRỊ TRONG MẢNG tmplstAnh Ở HÀM CreateRandomLstAnh
var id_changeBackground;
var lstAnh = new Array();

function CreateRandomLstAnh()
{
    var tmplstAnh = [ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
                      20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34];

    for(var i = 0; i < backgroundCount; i++)
    {
        lstAnh.push(tmplstAnh.splice(Math.floor(Math.random() * tmplstAnh.length), 1));
    }
}

function ChangeBackground()
{
    //Tạo một vòng lặp với thời gian lặp ngẫu nhiên
    //Tại mỗi bước lặp thì chọn ngẫu nhiên một ảnh để đổi làm nền
    //document.getElementById("div1").style.backgroundImage = "url('./image/bgrs/" + Math.floor(Math.random() * backgroundCount) + ".jpg')";        
    document.getElementById("div1").style.backgroundImage = "url('./image/bgrs/" + lstAnh.shift()+ ".jpg')";        
    if(lstAnh.length === 0)
    {
        clearTimeout(id_changeBackground);
        CreateRandomLstAnh();
    }
    id_changeBackground = setTimeout(ChangeBackground, Math.floor(Math.random() * 240000) + 60000);
}

//var audioCount = 120; //Số lượng bài hát trong danh sách; NHỚ THÊM GIÁ TRỊ TRONG MẢNG tmplstNhac Ở HÀM CreateRandomLstNhac
var imgPlay = "../images/btns/btn_play.svg";
var imgPause = "../image/btns/btn_pause.svg";
var isPlaying = false;
var lstNhac = new Array();

function CreateRandomLstNhac()
{
    var tmplstNhac = [   0,   1,   2,   3,   4,   5,   6,   7,   8,   9,
                        10,  11,  12,  13,  14,  15,  16,  17,  18,  19,
                        20,  21,  22,  23,  24,  25,  26,  27,  28,  29,
                        30,  31,  32,  33,  34,  35,  36,  37,  38,  39, 
                        40,  41,  42,  43,  44,  45,  46,  47,  48,  49,
                        50,  51,  52,  53,  54,  55,  56,  57,  58,  59,
                        60,  61,  62,  63,  64,  65,  66,  67,  68,  69,
                        70,  71,  72,  73,  74,  75,  76,  77,  78,  79,
                        80,  81,  81,  83,  84,  85,  86,  87,  88,  89,
                        90,  91,  92,  93,  94,  95,  96,  97,  98,  99,
                        100, 101, 102, 103, 104, 105, 106, 107, 108, 109,
                        110, 111, 112, 113, 114, 115, 116, 117, 118, 119
                     ];

    //lstNhac = new Array();
    for(var i = 0; i < 120 /*audioCount=120*/; i++)
    {
        lstNhac.push(tmplstNhac.splice(Math.floor(Math.random() * tmplstNhac.length), 1));
    }
}

function PlayAudio()
{
    var aud = document.getElementById("au");
    //aud.setAttribute("src", "./audio/" + Math.floor(Math.random()*audioCount) + ".mp3");
    aud.setAttribute("src", "../audios/" + lstNhac.shift());
    aud.play();
    if(lstNhac.length === 0)
    {
        CreateRandomLstNhac();
    }
}

function SetBtnPause()
{
    //document.getElementById("btnPlayPause").setAttribute("src", imgPause);
    isPlaying = true;
    document.getElementById("btnPlayPause").hidden = true;
}

function SetBtnPlay()
{
    document.getElementById("btnPlayPause").setAttribute("src", imgPlay);
    isPlaying = false;
}

function BtnClicked()
{
    var aud = document.getElementById("au");
    if(isPlaying){
        aud.pause();
    }
    else{
        try{
            aud.play();
        }
        catch{
            PlayAudio();
        }
    }
}

function div1_Clicked()
{
    clearTimeout(id_changeBackground);
    ChangeBackground();
}
