//aos
AOS.init()
// music
var tempMusic = ''
music = document.querySelector('.music')
if (tempMusic){
    music.src = tempMusic
}

// door start
function start() {
    window.scrollTo(0, 0);

    var soundDoor = document.querySelector('.sound-door');
    if (soundDoor) soundDoor.play();

    var doorSection = $('#door-section');
    var doors = document.querySelectorAll('.door');


    // Hilangkan tulisan "klik" dengan animasi
    var clickText = document.querySelector('.click');
    if (clickText) {
    clickText.classList.add('hide');
    }

    document.querySelector('#door-section.open').classList.add('hide');

    doors.forEach(function(door, index) {
        var direction = (index === 0) ? -1 : 1;
        setTimeout(function() {
        door.style.transform = 'rotateY(' + (70 * direction) + 'deg)';
    }, index* 150);
    });

    // Setelah animasi buka pintu, jalankan efek masuk
    setTimeout(function() {
        // Mainkan musik utama
        var music = document.querySelector('.music');
        if (music) music.play();

        // Zoom efek pada pintu
        doorSection.css('opacity', '0');
    }, 600);

    // Setelah beberapa saat, sembunyikan pintu dan aktifkan konten utama
    setTimeout(() => {
        $('body').removeClass('overflow-hidden');
        $('body').addClass('transition');
        doorSection.css('display', 'none');

        const content = $('#content-section');
        content.css('display', 'block');
        setTimeout(() => {
            content.css('opacity', '1');
        }, 50);
    }, 1100);
}

var isPlaying = true

function toggleMusic(event){
    event.preventDefault()

    const musicButton = document.getElementById('music-button')
    if (isPlaying) {
        musicButton.innerHTML = '<i class="fas fa-fw fa-pause"></i>'
        musicButton.classList.remove('rotate')
        musicButton.style.transform= 'translateY(0)'
        music.pause()
    } else {
        musicButton.innerHTML= '<i class="fas fa-fw fa-compact-disc"></i>'
        musicButton.classList.add('rotate')
        music.play()
    }
    isPlaying=!isPlaying
}


function copyText(el)
{
    var content = jQuery(el).siblings ('div.card-container').find('div.card-number').text().trim()

    var temp = document.createElement("textarea")

    document.body.appendChild(temp)

    temp.value = content.replace(/\s+/g, '')
    temp.select()
    document.execCommand("copy")
    document.body.removeChild(temp)

    jQuery(el).text('Berhasil di copy!')

    setTimeout(function (){
        jQuery(el).html('<i class="fas fa-regular fa-copy"></i> copy')
    })

}

window.addEventListener("load", function() {
    const form = document.getElementById('rsvp-form');
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const status = document.getElementById('status').value
        const nama = document.getElementById('nama').value.trim()

        if (nama === "" ) {
            swal.fire({
                icon: "error",
                text: "Nama tidak boleh kosong!"
            })
            return;
        }
        if (status == "0") {
            swal.fire({
                icon: "error",
                text: "Status tidak boleh kosong!"
            })
            return;
        }
        const data = new FormData(form);
        const action = e.target.action;
        const input = form.querySelectorAll('input, select, button')

        input.forEach(input => {
            input.disabled = true
        })
        fetch(action, {
            method: 'POST',
            body: data
        })
        .then( () => {
                swal.fire({
                    icon: "success",
                    text: "Berhasil konfirmasi kehadiran!"
                })
        })
        .catch( (error) => {
            swal.fire({
                icon: "error",
                text: error
            })
        })
        .finally(() => {
            input.forEach(input => {
                input.disabled = false
            })
        })
      })
    })