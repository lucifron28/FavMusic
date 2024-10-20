function showSection(section) {
    document.getElementById('artists-section').style.display = section === 'artists' ? 'block' : 'none';
    document.getElementById('tracks-section').style.display = section === 'tracks' ? 'block' : 'none';
}



function shareTrack(trackName, artistName, albumImage, albumName, spotifyUrl, trackNumber) {
    const webhookUrl = 'https://mseufeduph.webhook.office.com/webhookb2/8ef714f6-81de-4b42-ad2e-c262d5ce04d1@ddedb3cc-596d-482b-8e8c-6cc149a7a7b7/IncomingWebhook/9ef0b875219140eb8135437505a9d31c/e0510d66-17c3-43f4-a3ef-0cf6a6fba189/V24duT1GXj0kuDCkgbXHPSG6tCe2ZunOnaM30gWrZrYuo1';

    const payload = {
        "@type": "MessageCard",
        "@context": "https://schema.org/extensions",
        "summary": "Spotify Track",
        "themeColor": "1DB954",
        "title": `Track ${trackNumber}: ${trackName} - ${artistName}`,
        "text": "Click the button below to listen to this track on Spotify.",
        "sections": [
            {
                "activityTitle": `🎵 ${artistName} - *${trackName}*`,
                "activityImage": albumImage,
                "text": `From the album *${albumName}*`
            }
        ],
        "potentialAction": [
            {
                "@type": "OpenUri",
                "name": "Listen on Spotify",
                "targets": [
                    {
                        "os": "default",
                        "uri": spotifyUrl
                    }
                ]
            }
        ]
    };

    fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })
    .then(() => {
        alert('Track shared successfully!');
    })
    .catch(error => {
        console.error('Error sharing track:', error);
        alert('Failed to share track.');
    });
}