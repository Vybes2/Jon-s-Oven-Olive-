document.getElementById('reservationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const senderMessage = document.getElementById("seats").value;
    const dateTime = new Date().toLocaleString();

    const contents = {
        content: `New Reservation From ${name}  ${"<@&1242651341235683458>"}`,
        embeds: [
            {
                title: "__**Reservation Details**__",
                fields: [
                    { name: 'Name', value: name },
                    { name: 'Email', value: email },
                    { name: 'Phone Number', value: phone },
                    { name: '# of Seats', value: senderMessage },
                    { name: 'Date and Time', value: dateTime },
                ],
            }
        ]
    };

    const webhookUrl = 'https://discord.com/api/webhooks/1243099830210007100/aNM67MUWsQuTrD5iDCYh82z_v9J5Wm-PW-wdtrmdlqrMBqwc_Y5oCkJFLG7ZLWZKcKEU';

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contents)
    })
    .then(response => {
        if (response.ok) {
            alert('Message sent successfully');
            window.location.href = 'order.html';
        } else {
            alert('An unknown error occurred on the server.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An unknown error occurred on the server.');
    });
});

