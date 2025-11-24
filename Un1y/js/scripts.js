const totalImages = 365; //update 24.11.2025
const totalAudios = 18;
const folderImages = "images";
const folderAudios = "audios";

const slideshow = document.getElementById("slideshow");
let prevImg = [];
let playlistImages = [];
let playlistAudios = [];
let idxImg = 0;
let idxAudio = 0;
let wakeLock = null;

// Shuffle helper
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
function newPlaylistImages() {
    playlistImages = [];
    for (let i = 1; i <= totalImages; i++) playlistImages.push(i);
    shuffleArray(playlistImages);
    idxImg = 0;
    preloadImage();
}


const elImgPreload = document.querySelector("#preloadImg");
let pre_img_left = 0;
function preloadImage() {
    if (playlistImages?.length <= 0) {
        newPlaylistImages();
        return;
    }
    pre_img_left = playlistImages.length;

    function preloadimg() {
        if (pre_img_left > playlistImages.length || pre_img_left <= 0) {
            return;
        }
        elImgPreload.src = `${folderImages}/${playlistImages[playlistImages.length - pre_img_left]}.jpg`;
        --pre_img_left;
        setTimeout(preloadimg, 4000);
    }
    preloadimg();
}

function newPlaylistAudios() {
    playlistAudios = [];
    for (let i = 1; i <= totalAudios; i++) playlistAudios.push(i);
    shuffleArray(playlistAudios);
    playlistAudios.unshift(0);
    idxAudio = 0;
}

// Helper chọn ngẫu nhiên
function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// === Audio ===
let audio = new Audio();
function playNextAudio() {
    if (idxAudio >= playlistAudios.length) newPlaylistAudios();
    const num = playlistAudios[idxAudio++];
    audio.src = `${folderAudios}/${num}.mp3`;
    audio.play().catch((error) => { });
}
audio.addEventListener("ended", playNextAudio);

async function requestFullscreen() {
    if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        if (screen.orientation && screen.orientation.lock) {
            try { await screen.orientation.lock("landscape"); } catch (e) { }
        }
        requestWakeLock();
    } else {

    }
}

async function requestWakeLock() {
    try {
        if ("wakeLock" in navigator) {
            wakeLock = await navigator.wakeLock.request("screen");
        }
    } catch (err) { }
}
function releaseWakeLock() {
    if (wakeLock) { wakeLock.release(); wakeLock = null; }
}

function Play() {
    playNextAudio();
    requestFullscreen();
    nextImage();
    showWishes();
}


// === countdown ===

function zeroPadding(value) {
    return (value < 10 ? "0" : "") + value;
}

const BIRTHDAY = new Date(2025, 10, 24, 10, 24, 0, 0);
const tlD = document.querySelector(".timecard#days");
const tlH = document.querySelector(".timecard#hours");
const tlM = document.querySelector(".timecard#minutes");
const tlS = document.querySelector(".timecard#secondes");
function ShowTimeLeft() {
    let secs = Math.floor((BIRTHDAY.getTime() - (new Date()).getTime()) / 1000);
    if(secs < 0){
        secs = 0;
    }
    tlD.textContent = zeroPadding(Math.floor(secs / 86400));
    secs = secs % 86400;
    tlH.textContent = zeroPadding(Math.floor(secs / 3600));
    secs = secs % 3600;
    tlM.textContent = zeroPadding(Math.floor(secs / 60));
    tlS.textContent = zeroPadding(secs % 60);
}


// === Wish ===
const api = "https://script.google.com/macros/s/AKfycbwsw1Sx_g1egvxVjNx7mjcfWbbcHOUR4QvqU5yteSpzTp46Vv6Wx17WgaVlhe1J_XAF/exec";
async function sendWish() {
    const w = {
        nf: 'w',
        ns: document.querySelector("#inpName").value,
        nc: document.querySelector("#inpWishes").value
    };
    //checkinp
    if (!w.ns || !w.nc) {
        alert("Người gửi hoặc nội dung không hợp lệ");
        return;
    }
    const q = new URLSearchParams(w).toString();
    const defText = elbtnSendWishes.textContent;
    elbtnSendWishes.textContent = "Đang gửi";
    await fetch(`${api}?${q}`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`Response status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            if (data.result != "success") {
                alert("Không gửi được lời chúc. Hãy thử lại.\n" + data.msg);
                elbtnSendWishes.textContent = defText;
                return;
            }
            elbtnSendWishes.textContent = "Đã gửi!";
            setTimeout(() => {
                inactive("#frmWishes");
                active("#slideshow");
                Play();
            }, 2000);
        })
        .catch(ex => {
            alert("Không gửi được lời chúc. Hãy thử lại.");
            elbtnSendWishes.textContent = defText;
        });
}

async function getWishes() {
    return await fetch(`${api}?nf=g`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`Response status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            if (data.result != "success") {
                console.log("Không lấy được lời chúc. err: " + data.msg);
                return null;
            }
            return data.data;
        })
        .catch(err => {
            console.log("Không lấy được lời chúc. err: " + err.message);
            return null;
        });
}

function wishGen(sender, content) {
    const re = document.createElement("div");
    re.classList.add("wish-item");
    re.classList.add("next");
    re.innerHTML = `<span class="w-sender">${sender}</span><span class="w-content">${content}</span>`;
    wishesWrapper.appendChild(re);
    return re;
}

let total = 0, wishes = [];
const wishesWrapper = document.querySelector("#wishes-wrapper");
let w_pre = null, w_cur = null, w_next = null;
const dur = 6000;
async function showWishes() {
    if (total <= 0) {
        if (w_cur != null) {
            w_cur.classList.add("pre");
            setTimeout(() => {
                w_cur.remove();
                w_cur = null;
                if (w_next) w_next.remove();
            }, 1111);
        }
        setTimeout(async () => {
            wishes = await getWishes();
            total = wishes.length;

            showWishes();
        }, 60000); // tạm dùng khi hiện hết lời chúc. Đợi trước khi hiện lời chúc mới thì mới get để lấy dữ liệu mới nhất
        return;
    }
    if (wishes == null || wishes?.length == 0) {
        total = 0;
        setTimeout(showWishes, dur);
        return;
    }

    if (w_cur == null) {
        w_cur = wishGen(wishes[0].s, wishes[0].c);

        w_next = (total > 1) ? wishGen(wishes[1].s, wishes[1].c) : null;
    } else {
        w_pre = w_cur;
        w_pre.classList.add("pre");
        setTimeout(() => { w_pre.remove(); }, 1111);

        w_cur = w_next;

        if (total > 1)
            w_next = wishGen(wishes[1].s, wishes[1].c);
    }
    w_cur.classList.remove("next");
    total--;
    wishes.shift();
    setTimeout(() => { showWishes(); }, dur);
}



// === UI Events ===

function inactive(querySl) {
    document.querySelector(querySl).classList.add("inactive");
}
function active(querySl) {
    document.querySelector(querySl).classList.remove("inactive");
}

document.querySelector("#btnWish").addEventListener("click", () => {
    inactive("#frmWelcome");
    active("#frmWishes");
});

document.querySelector("#btnPlay").addEventListener("click", () => {
    Play();

    inactive("#frmWelcome");
    active("#slideshow");
});

document.querySelector("#btnWelcome").addEventListener("click", () => {
    inactive("#frmWishes");
    active("#frmWelcome");
});

const elbtnSendWishes = document.querySelector("#btnSendWishes");
elbtnSendWishes.addEventListener("click", () => {
    if (elbtnSendWishes.textContent != "Gửi") {
        return;
    }
    sendWish();
});


// === intro ===
function showIntro() {
    const intro = document.createElement("section");
    intro.classList.add("frm");
    intro.style.textAlign = "center";
    intro.style.fontSize = "x-large";
    intro.style.fontWeight = "bold";
    intro.style.transition = "all ease 1s";
    // intro.textContent = `Tháng 11 này`;
    intro.textContent = `Tháng 11`;
    intro.style.opacity = 0;
    document.body.appendChild(intro);
    setTimeout(() => {
        intro.style.opacity = 1;
        setTimeout(() => {
            intro.style.opacity = 0;
            setTimeout(() => {
                intro.style.opacity = 1;
                intro.textContent = `HaChiun tròn 1 tuổi`;
                setTimeout(() => {
                    intro.style.opacity = 0;
                    setTimeout(() => {
                        intro.remove();
                        active("#frmWelcome");
                    }, 1124);
                }, 2411);
            }, 1124);
        }, 2411);
    }, 0);
}
// === Start ===
preloadImage();
ShowTimeLeft();
setInterval(ShowTimeLeft, 1000);
showIntro();

