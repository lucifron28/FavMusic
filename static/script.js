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

function shareTopTracks() {
    const webhookUrl = 'https://mseufeduph.webhook.office.com/webhookb2/8ef714f6-81de-4b42-ad2e-c262d5ce04d1@ddedb3cc-596d-482b-8e8c-6cc149a7a7b7/IncomingWebhook/9ef0b875219140eb8135437505a9d31c/e0510d66-17c3-43f4-a3ef-0cf6a6fba189/V24duT1GXj0kuDCkgbXHPSG6tCe2ZunOnaM30gWrZrYuo1';

    const topTracks = Array.from(document.querySelectorAll('#tracks-section .item')).map(item => {
        const trackName = item.querySelector('p').textContent.split(' by ')[0].split('. ')[1];
        const artistName = item.querySelector('p').textContent.split(' by ')[1];
        const albumImage = item.querySelector('img').src;
        const albumName = item.querySelector('p').textContent.split(' by ')[0].split('. ')[1];
        const spotifyUrl = item.querySelector('button').getAttribute('onclick').split(', ')[4].replace(/'/g, '');
        return { trackName, artistName, albumImage, albumName, spotifyUrl };
    });

    const payload = {
        type: "message",
        attachments: [
            {
                contentType: "application/vnd.microsoft.card.adaptive",
                contentUrl: null,
                content: {
                    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                    "type": "AdaptiveCard",
                    "version": "1.3",
                    "body": [
                        {
                            "type": "TextBlock",
                            "text": "Top Tracks",
                            "weight": "Bolder",
                            "size": "Medium"
                        },
                        ...topTracks.map((track, index) => ({
                            "type": "Container",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": `${index + 1}. ${track.trackName} by ${track.artistName}`,
                                    "weight": "Bolder",
                                    "wrap": true
                                },
                                {
                                    "type": "Image",
                                    "url": track.albumImage,
                                    "size": "Large"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": `From the album ${track.albumName}`,
                                    "wrap": true
                                },
                                {
                                    "type": "ActionSet",
                                    "actions": [
                                        {
                                            "type": "Action.OpenUrl",
                                            "title": "Listen on Spotify",
                                            "url": track.spotifyUrl
                                        }
                                    ]
                                }
                            ]
                        }))
                    ]
                }
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
        alert('Top tracks shared successfully!');
    })
    .catch(error => {
        console.error('Error sharing top tracks:', error);
        alert('Failed to share top tracks.');
    });
}

function shareTopArtists() {
    const webhookUrl = 'https://mseufeduph.webhook.office.com/webhookb2/8ef714f6-81de-4b42-ad2e-c262d5ce04d1@ddedb3cc-596d-482b-8e8c-6cc149a7a7b7/IncomingWebhook/9ef0b875219140eb8135437505a9d31c/e0510d66-17c3-43f4-a3ef-0cf6a6fba189/V24duT1GXj0kuDCkgbXHPSG6tCe2ZunOnaM30gWrZrYuo1';

    const topArtists = Array.from(document.querySelectorAll('#artists-section .item')).map(item => {
        const artistName = item.querySelector('p').textContent.split('. ')[1];
        const artistImage = item.querySelector('img').src;
        return { artistName, artistImage };
    });

    const payload = {
        type: "message",
        attachments: [
            {
                contentType: "application/vnd.microsoft.card.adaptive",
                contentUrl: null,
                content: {
                    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                    "type": "AdaptiveCard",
                    "version": "1.3",
                    "body": [
                        {
                            "type": "TextBlock",
                            "text": "Top Artists",
                            "weight": "Bolder",
                            "size": "Medium"
                        },
                        ...topArtists.map((artist, index) => ({
                            "type": "Container",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": `${index + 1}. ${artist.artistName}`,
                                    "weight": "Bolder",
                                    "wrap": true
                                },
                                {
                                    "type": "Image",
                                    "url": artist.artistImage,
                                    "size": "Large"
                                }
                            ]
                        }))
                    ]
                }
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
        alert('Top artists shared successfully!');
    })
    .catch(error => {
        console.error('Error sharing top artists:', error);
        alert('Failed to share top artists.');
    });
}