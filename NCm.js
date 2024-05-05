/*
 * create: 2024-02-03
 * update: 2024-02-10: bổ sung bài số 119.
 */

var changeaudio=false;

function div_Clicked(){
    //if(changeaudio) return;
    //window.location = "https://NinhDuongCN.github.io/WDCD";
    
}

//
//#region play_audio
//
//var audioCount = 120; //Số lượng bài hát trong danh sách; NHỚ THÊM GIÁ TRỊ TRONG MẢNG tmplstNhac Ở HÀM CreateRandomLstNhac
// var imgPlay = "./images/btns/au_play.svg";
// var imgPause = "./images/btns/au_pause.svg";
var isPlaying = false;
var lstNhac = new Array();

function CreateRandomLstNhac()
{
    var tmplstNhac = [  0,   1,   2,   3,   4,   5,   6,   7,   8,   9,
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
    for(var i = 0; i < 120 /*audioCount*/; i++)
    {
        lstNhac.push(tmplstNhac.splice(Math.floor(Math.random() * tmplstNhac.length), 1));
    }
}

function PlayAudio()
{
    var aud = document.getElementById("au");
    aud.setAttribute("src", "./audios/" + lstNhac.shift());
    aud.play();
    if(lstNhac.length === 0)
    {
        CreateRandomLstNhac();
    }
}

function SetBtnPause()
{
    document.getElementById("btnPlayPause").style.backgroundImage = "url('./images/btns/au_pause.svg')";//setAttribute("src", imgPause);
    isPlaying = true;
    //document.getElementById("btnPlayPause").hidden = true;
}

function SetBtnPlay()
{
    document.getElementById("btnPlayPause").style.backgroundImage = "url('./images/btns/au_play.svg')";//setAttribute("src", imgPlay);
    isPlaying = false;
}

function BtnClicked()
{
    //changeaudio=true;
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
    //changeaudio=false;
}
//#endregion play_audio;


//#region app_clicked
function appClicked(app){
    switch(app){
        case 'proposal':
            window.location = "https://proposal.NguyenChamMemories.id.vn";
            return;
        case 'WDCD':
            window.location = "https://wdcd.NguyenChamMemories.id.vn";
            return;
        case 'NCm':
            window.location = "https://www.NguyenChamMemories.id.vn/about";
            return;
        default:
            window.location = "https://www.NguyenChamMemories.id.vn/" + app;
    }
}
//#endregion app_clicked

//#region memories
let lstDate = [[2, 20], [3, 20], [5, 6], [5, 11], [8, 4], [8, 7], [8, 12], [9, 2], [12, 6]]; //thay đổi length ở dưới
function Memo(){
    var day = new Date();
    var month = day.getMonth() + 1;
    day = day.getDate();
    var msg = ""; //Sự kiện sắp đến:
    var index = 0;
    if(month===12){
        while(index < 9 /*lstDate.length*/){
            if(lstDate[index][0] === 1){
                msg += (lstDate[index][1]<10?"0":"") + lstDate[index][1] + "/01; ";
                index++;
            }
            else{
                break;
            }
        }
        index = 8; /*lstDate.length - 1*/
        while(index>-1){
            if(lstDate[index][0] === 12)
            {
                if(lstDate[index][1] > day){
                    msg = (lstDate[index][1]<10?"0":"") + lstDate[index][1] + "/12; " + msg;
                }
                index--;
            }
            else{
                break;
            }
        }
    }
    else{
        index = 0;
        while(index < 9 /*lstDate.length*/){
            if(lstDate[index][0] === month){
                if(lstDate[index][1] > day){
                    msg += (lstDate[index][1]<10?"0":"") + lstDate[index][1] + "/" + (month<3?"0":"") + month+"; ";
                }
            }
            else if(lstDate[index][0] - month === 1){
                
                msg += (lstDate[index][1]<10?"0":"") + lstDate[index][1] + "/" + (lstDate[index][0]<3?"0":"") + lstDate[index][0]+"; ";
            }
            else if(lstDate[index][0]>month){
                break;
            }
            index++;
        }
    }
    if(msg===""){
        return;
    }
    //alert("Sự kiện sắp đến: " + msg);
    document.getElementById("popmsg").innerText = msg;
    document.getElementById("notif").classList.add("active");


    setTimeout(() => {
        ClosePopup("notif");
    }, 22000);
}

function ClosePopup(popupid){
    document.getElementById(popupid).classList.remove("active");
    // if(!isPlaying){
    //     try{
    //         aud.play();
    //         aud.pause();
    //     }
    //     catch{
    //         PlayAudio();
    //     }
    // }
}
//#endregion memories