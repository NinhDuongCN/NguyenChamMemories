// === Danh sách hiệu ứng ===
const entranceEffects = [
    "fadeIn", "fadeInLeft", "fadeInRight", "fadeInUp", "fadeInDown",
    "zoomIn", "zoomInLeft", "zoomInRight", "zoomInUp", "zoomInDown",
    "slideInLeft", "slideInRight", "slideInUp", "slideInDown",
    "rotateIn", "rotateInLeft", "rotateInRight", "rotateInUp", "rotateInDown",
    "flipInX", "flipInY", "bounceIn", "bounceInUp", "bounceInDown",
    "lightSpeedIn", "jackInTheBox", "rollIn", "swingIn", "tadaIn", "rubberBandIn",
    "backInDown", "backInLeft", "backInRight", "backInUp", "lightSpeedInLeft",
    "lightSpeedInRight"
];
const emphasisEffects = [
    "pulse", "pulseBig", "pulseSmall", "bounce", "bounceX", "bounceY",
    "shake", "shakeX", "shakeY", "swing", "wobble", "jello", "heartbeat", "flash", "blink",
    "rotateSlow", "rotateFast", "float", "sink", "wave", "tada", "rubberBand", "flipFlop",
    "stretch", "vibrate", "wiggle", "zoomPulse", "skewPulse", "bounceRotate", /*"colorFlash", bỏ vì hiệu ứng không phù hợp*/
    "flip"
];
const exitEffects = [
    "fadeOut", "fadeOutLeft", "fadeOutRight", "fadeOutUp", "fadeOutDown",
    "zoomOut", "zoomOutLeft", "zoomOutRight", "zoomOutUp", "zoomOutDown",
    "slideOutLeft", "slideOutRight", "slideOutUp", "slideOutDown",
    "rotateOut", "rotateOutLeft", "rotateOutRight", "rotateOutUp", "rotateOutDown",
    "flipOutX", "flipOutY", "bounceOut", "bounceOutUp", "bounceOutDown",
    "lightSpeedOut", "rollOut", "swingOut", "tadaOut", "rubberBandOut", "swirlOut",
    "backOutDown", "backOutLeft", "backOutRight", "backOutUp", "lightSpeedOutLeft",
    "lightSpeedOutRight"
];

// === Hiển thị ảnh ===
function showImage(num) {
    const img = document.createElement("div"); // để không tải trực tiếp được ảnh về máy bằng contextMenu
    img.classList.add("img");
    img.style.backgroundImage = `url(${folderImages}/${num}.jpg)`;

    img.classList.add("animated");

    const inEff = pick(entranceEffects);
    const emEff = pick(emphasisEffects);
    const outEff = pick(exitEffects);

    const inDur = 2500 + Math.floor(Math.random() * 1000);   // 2500–3500ms
    const emDur = 2000 + Math.floor(Math.random() * 3000);   // 2000–5000ms
    const outDur = 2500 + Math.floor(Math.random() * 1000);  // 2500–3500ms

    // Ghép 3 animation: entrance → emphasis → exit
    img.style.animation = [
        `${inEff} ${inDur}ms forwards`,
        `${emEff} ${emDur}ms ${inDur}ms 1 both`,
        `${outEff} ${outDur}ms ${inDur + emDur}ms forwards`
    ].join(", ");


    const total = inDur + emDur + outDur / 2.0;
    // Exit ảnh cũ song song với entrance ảnh mới
    if (prevImg) {

        if (prevImg.length > 0) {
            setTimeout(prevImg.shift().remove(), total + outDur);
        }
    }

    slideshow.appendChild(img);     
    prevImg.push(img)

    // Chuyển ảnh mới sau khi ảnh này kết thúc exit
    setTimeout(nextImage, total);
}

function nextImage() {
    if (idxImg >= playlistImages.length) newPlaylistImages();
    const num = playlistImages[idxImg++];
    showImage(num);
}