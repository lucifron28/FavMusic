function shareTrack(trackName, artistName, albumImage, albumName, spotifyUrl) {
    const webhookUrl = 'https://mseufeduph.webhook.office.com/webhookb2/8ef714f6-81de-4b42-ad2e-c262d5ce04d1@ddedb3cc-596d-482b-8e8c-6cc149a7a7b7/IncomingWebhook/9ef0b875219140eb8135437505a9d31c/e0510d66-17c3-43f4-a3ef-0cf6a6fba189/V24duT1GXj0kuDCkgbXHPSG6tCe2ZunOnaM30gWrZrYuo1';

    const payload = {
        "@type": "MessageCard",
        "@context": "https://schema.org/extensions",
        "summary": "Spotify Track",
        "themeColor": "1DB954",
        "title": `Now Playing: ${trackName} - ${artistName}`,
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
        headers: {
            'Content-Type': 'application/json',
            'mode': 'no-cors',
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            alert('Track shared successfully!');
        } else {
            alert('Failed to share track.');
        }
    })
    .catch(error => {
        console.error('Error sharing track:', error);
        alert('Failed to share track.');
    });
}