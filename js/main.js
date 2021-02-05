var vid = document.getElementById("musicplayer");

function audioVolume() {
    vid.volume = 1;
}

var html5_audiotypes = { //define list of audio file extensions and their associated audio types. Add to it if your specified audio file isn't on this list:
    "mp3": "audio/mpeg",
    "mp4": "audio/mp4",
    "ogg": "audio/ogg",
    "wav": "audio/wav"
}

function createsoundbite(sound) {
    var html5audio = document.createElement('audio')
    if (html5audio.canPlayType) { //check support for HTML5 audio
        for (var i = 0; i < arguments.length; i++) {
            var sourceel = document.createElement('source')
            sourceel.setAttribute('src', arguments[i])
            if (arguments[i].match(/\.(\w+)$/i))
                sourceel.setAttribute('type', html5_audiotypes[RegExp.$1])
            html5audio.appendChild(sourceel)
        }
        html5audio.load()
        html5audio.playclip = function () {
            html5audio.pause()
            html5audio.volume = 0.01
            html5audio.currentTime = 0
            html5audio.play()
        }
        return html5audio
    }
    else {
        return { playclip: function () { throw new Error("Your browser doesn't support HTML5 audio unfortunately") } }
    }
}
var mouseoversound = createsoundbite("assetes/audio/button-hover.wav")
var clicksound = createsoundbite("assetes/audio/button-hover.wav")

function downloadFile(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}

function openPopUpImg() {
    Swal.fire({
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: "Download",
        imageUrl: './assetes/img/resized.jpg',
        customClass: 'swal-picture',  //To connect with css
        imageWidth: 819,
        imageHeight: 579,
        imageAlt: 'Custom image',
    }).then((result) => {
        if (result.isConfirmed) {
            downloadFile('./assetes/img/resized.jpg', 'Werbeplakat.png');
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Aktion erfolgreich',
                showConfirmButton: false,
                timer: 1250
            })
        }
    })

}

////////

