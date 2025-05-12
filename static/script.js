function showSection(section) {
    document.getElementById('artists-section').style.display = section === 'artists' ? 'block' : 'none';
    document.getElementById('tracks-section').style.display = section === 'tracks' ? 'block' : 'none';
}

document.getElementById('timeline').addEventListener('change', function () {
    const selectedTimeline = this.value;
    window.location.href = `?timeline=${selectedTimeline}`;
})