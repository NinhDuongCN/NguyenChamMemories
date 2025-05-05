/* dành cho việc hiển thị thông báo lịch tiêm trên các trang khác */

function RequestLichtiemNotif(){
    //request coming
    $.ajax({ //Sử dụng Ajax gửi lệnh
        url: `https://script.google.com/macros/s/AKfycbwFdSzEzuhdGsTydzb_dyNIZ5DgVlDh0f9z2oqTVbGrsLipXvfNuSqf5BwAU79YXNUI/exec?r=coming`,
        method: "GET",
        dataType: 'json',
        data: '',
        success: function(responseData, textStatus, jqXHR) {
            if(textStatus!='success'){
                console.log("[lichtiemnotif] không tải được dữ liệu");
            }
            else{
                ShowNotif(responseData.data);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("[lichtiemnotif] không tải được dữ liệu");
            console.log(errorThrown);
        }
    });
};

function ShowNotif(coming){
    if(coming == undefined) return;
    if(coming.length < 1) return;
    var msg = '';
    coming.forEach(item => {
        msg += `[${item.dukien}] ${item.loai} ${item.mui==undefined?"":("(liều "+item.mui+")")}<br>`;
    });

    //////sửa cách hiển thị msg 
    document.querySelector("#notif-msg").innerHTML = msg;
    document.getElementById('notif-soTiem').classList.replace("inactive", "active");
}

function OpenSoTiem(){
    window.location = "https://www.NguyenChamMemories.id.vn/SoTiem";
}