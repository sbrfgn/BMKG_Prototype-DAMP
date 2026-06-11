const weatherData = {
    'saat-ini': [
        { city: 'Pangkal Pinang', time: '06.30 WIB', icon: '☁️', temp: '24 °C', status: 'Berawan Tebal' },
        { city: 'Pekanbaru', time: '06.30 WIB', icon: '🌦️', temp: '23 °C', status: 'Hujan Ringan' },
        { city: 'Pontianak', time: '06.30 WIB', icon: '🌙', temp: '24 °C', status: 'Cerah' },
        { city: 'Samarinda', time: '07.30 WITA', icon: '☀️', temp: '24 °C', status: 'Cerah Siang' },
        { city: 'Semarang', time: '06.30 WIB', icon: '🌤️', temp: '26 °C', status: 'Cerah Berawan' },
        { city: 'Malang', time: '06.30 WIB', icon: '🌫️', temp: '21 °C', status: 'Kabut' }
    ],
    'hari-ini': [
        { city: 'Pangkal Pinang', time: '12.00 WIB', icon: '🌧️', temp: '28 °C', status: 'Hujan Sedang' },
        { city: 'Pekanbaru', time: '12.00 WIB', icon: '⛈️', temp: '27 °C', status: 'Hujan Petir' },
        { city: 'Pontianak', time: '12.00 WIB', icon: '☀️', temp: '32 °C', status: 'Cerah Terik' },
        { city: 'Samarinda', time: '13.00 WITA', icon: '☁️', temp: '30 °C', status: 'Berawan' },
        { city: 'Semarang', time: '12.00 WIB', icon: '☀️', temp: '33 °C', status: 'Cerah' }
    ],
    'besok': [
        { city: 'Pangkal Pinang', time: 'Besok', icon: '☀️', temp: '30 °C', status: 'Cerah' },
        { city: 'Pekanbaru', time: 'Besok', icon: '☁️', temp: '29 °C', status: 'Berawan' },
        { city: 'Pontianak', time: 'Besok', icon: '🌧️', temp: '26 °C', status: 'Hujan' },
        { city: 'Samarinda', time: 'Besok', icon: '🌤️', temp: '31 °C', status: 'Cerah Berawan' },
        { city: 'Semarang', time: 'Besok', icon: '⛈️', temp: '25 °C', status: 'Hujan Petir' }
    ]
};

const warnings = [
    "17 Mar 2026 pukul 05.10-08.00 WITA: Berpotensi terjadi hujan sedang hingga lebat disertai petir dan angin kencang di Nusa Tenggara Timur.",
    "Waspada potensi gelombang tinggi 2.5 - 4.0 meter di Samudra Hindia Barat Sumatera hingga Selatan Jawa.",
    "Peringatan Dini Cuaca Ekstrem Jawa Timur: Waspada hujan lebat disertai petir pada siang hingga sore hari."
];
let currentWarningIdx = 0;

function renderWeather(dayKey) {
    const container = $('#weatherScroll');
    container.empty();
    
    let data = weatherData[dayKey] || weatherData['saat-ini'];
    
    data.forEach(item => {
        const card = `
            <div class="weather-card" onclick="showModal('Detail Cuaca ${item.city}', 'Prakiraan cuaca untuk ${item.city} adalah ${item.status} dengan suhu rata-rata ${item.temp}. Kelembapan: 85%, Angin: 10 km/jam.')">
                <h3>${item.city}</h3>
                <p class="time">${item.time}</p>
                <div class="icon">${item.icon}</div>
                <p class="temp">${item.temp}</p>
                <p class="status">${item.status}</p>
            </div>
        `;
        container.append(card);
    });
}

function showModal(title, bodyText) {
    $('#modalTitle').text(title);
    $('#modalBody').html(bodyText);
    $('#prototypeModal').css('display', 'flex').hide().fadeIn();
}

$(document).ready(function() {
    
    renderWeather('saat-ini');

    $("#btnScrollRight").click(function(e) {
        e.preventDefault();
        $("#weatherScroll").animate({ scrollLeft: "+=220px" }, 300);
    });

    $("#btnScrollLeft").click(function(e) {
        e.preventDefault();
        $("#weatherScroll").animate({ scrollLeft: "-=220px" }, 300);
    });

    $(".weather-filters button").click(function() {
        $(".weather-filters button").removeClass("active");
        $(this).addClass("active");
        
        const day = $(this).data('day');
        
        $("#weatherScroll").fadeOut(200, function() {
            renderWeather(day);
            $(this).fadeIn(200);
        });
    });

    $(".nav-links a").click(function(e) {
        e.preventDefault();
        $(".nav-links a").removeClass("active");
        $(this).addClass("active");
    });

    $(".btn-contact").click(function() {
        showModal("Contact Center 196", "Layanan Call Center 196 BMKG beroperasi 24 jam.<br>Silakan hubungi melalui telepon genggam atau telepon rumah Anda.");
    });

    $(".warning-close").click(function() {
        $("#warningAlert").fadeOut();
    });

    $(".warn-right").click(function() {
        currentWarningIdx = (currentWarningIdx + 1) % warnings.length;
        $(".warning-desc").html(warnings[currentWarningIdx] + ' <a href="#" class="link-blue" style="margin-left: 4px;">Selengkapnya &rarr;</a>');
    });

    $(".warn-left").click(function() {
        currentWarningIdx = (currentWarningIdx - 1 + warnings.length) % warnings.length;
        $(".warning-desc").html(warnings[currentWarningIdx] + ' <a href="#" class="link-blue" style="margin-left: 4px;">Selengkapnya &rarr;</a>');
    });

    setInterval(function() {
        const now = new Date();
        $('#current-time').text(`WAKTU LOKAL: ${now.toLocaleTimeString('id-ID')} WIB`);
    }, 1000);

});