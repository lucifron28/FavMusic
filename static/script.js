function showSection(section) {
    document.getElementById('artists-section').style.display = section === 'artists' ? 'block' : 'none';
    document.getElementById('tracks-section').style.display = section === 'tracks' ? 'block' : 'none';
}

function changeTimeline() {
    const selectedTimeline = document.getElementById('timeline').value;
    
    const timelineContents = document.querySelectorAll('.timeline-content');
    timelineContents.forEach(content => {
        content.style.display = 'none';
    });
    
    document.getElementById('artists-' + selectedTimeline).style.display = 'block';
    document.getElementById('tracks-' + selectedTimeline).style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function() {
    showSection('artists');
    
    changeTimeline();
});