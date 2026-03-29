document.addEventListener('DOMContentLoaded', function() {

    // Use buttons to toggle between views
    document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
    document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
    document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
    document.querySelector('#compose').addEventListener('click', compose_email);

    document.querySelector('#compose-form').addEventListener('submit', send_mail);
    // By default, load the inbox
    load_mailbox('inbox');

});

function compose_email() {

    // Show compose view and hide other views
    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'block';
    document.querySelector('#email-details-view').style.display = 'none';
    // Clear out composition fields
    document.querySelector('#compose-recipients').value = '';
    document.querySelector('#compose-subject').value = '';
    document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {

    // Show the mailbox and hide other views
    document.querySelector('#emails-view').style.display = 'block';
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#email-details-view').style.display = 'none';
    const emailDetail = document.querySelector('#emails-view');
    // Show the mailbox name
    emailDetail.innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

    fetch(`/emails/${mailbox}`)
        .then(response => response.json())
        .then(emails => {
            emails.forEach(email => {
                const element = document.createElement('div');
                element.style.backgroundColor = email.read ? "grey" : "white"
                element.style.border = "1px solid grey"
                element.style.marginBottom = "10px"
                element.style.padding = "10px"
                element.style.cursor = "pointer"
                element.innerHTML = `
                <strong>From:</strong> ${email.sender} <br>
                <strong>To:</strong> ${email.recipients} <br>
                <strong>Subject:</strong> ${email.subject} <br>
                <strong>Timestamp:</strong> ${email.timestamp} <br>
                `;

                emailDetail.append(element)

                element.addEventListener('click', () => {
                    const emailDetails = document.querySelector('#email-details-view');
                    document.querySelector('#emails-view').style.display = 'none';
                    emailDetails.style.display = 'block';
                    fetch(`/emails/${email.id}`)
                        .then(response => response.json())
                        .then(email => {
                            emailDetails.innerHTML = `
                        <strong>From:</strong> ${email.sender} <br>
                        <strong>To:</strong> ${email.recipients} <br>
                        <strong>Subject:</strong> ${email.subject} <br>
                        <strong>Timestamp:</strong> ${email.timestamp} <br><br><br>
                        ${email.body}<br>
                              `;
                            //  Update email to archived
                            if (mailbox === 'inbox') {
                                const archivedBtn = document.createElement('button');
                                archivedBtn.textContent = 'Archive'
                                archivedBtn.className = 'btn btn-sm btn-outline-primary'
                                archivedBtn.style.marginRight = '5px'
                                archivedBtn.style.marginTop = "10px"
                                archivedBtn.addEventListener('click', () => {
                                    fetch(`/emails/${email.id}`, {
                                            method: 'PUT',
                                            body: JSON.stringify({
                                                archived: true
                                            })

                                        })
                                        .then(() => load_mailbox('inbox'))
                                })
                                emailDetails.appendChild(archivedBtn);
                            }

                            if (mailbox === 'archive') {
                                const unarchiveBtn = document.createElement('button');
                                unarchiveBtn.textContent = 'Unarchive'
                                unarchiveBtn.className = 'btn btn-sm btn-outline-primary'
                                unarchiveBtn.style.marginTop = "10px"
                                unarchiveBtn.style.marginRight = '5px'


                                unarchiveBtn.addEventListener('click', () => {
                                    fetch(`/emails/${email.id}`, {
                                            method: 'PUT',
                                            body: JSON.stringify({
                                                archived: false
                                            })

                                        })
                                        .then(() => load_mailbox('inbox'))
                                })
                                emailDetails.appendChild(unarchiveBtn);
                            }

                            const replyBtn = document.createElement('button');
                            replyBtn.textContent = 'Reply'
                            replyBtn.className = 'btn btn-sm btn-outline-primary'
                            replyBtn.style.marginTop = "10px"
                            emailDetails.appendChild(replyBtn);

                            replyBtn.addEventListener('click', () => {
                                compose_email();
                                document.querySelector('#compose-recipients').value = email.sender;
                                let subject = email.subject;
                                if (!subject.startsWith("Re:")) {
                                    subject = 'Re: ' + subject;
                                }
                                document.querySelector('#compose-subject').value = subject;
                                let body = email.body;
                                let sender = email.sender;
                                let timestamp = email.timestamp;
                                document.querySelector('#compose-body').value = `On ${timestamp}, ${sender} wrote: \n${body}`
                            })

                            // Update email to read
                            fetch(`/emails/${email.id}`, {
                                method: 'PUT',
                                body: JSON.stringify({
                                    read: true
                                })

                            })
                            element.style.backgroundColor = "grey"

                        })
                })
            })
        })


}

function send_mail(event) {
    event.preventDefault()
    const recipients = document.querySelector('#compose-recipients').value;
    const subject = document.querySelector('#compose-subject').value;
    const body = document.querySelector('#compose-body').value;

    fetch('/emails', {
            method: 'POST',
            body: JSON.stringify({
                recipients,
                subject,
                body
            })
        })
        .then(response => response.json())
        .then(result => {
          return fetch('emails/sent')
          .then(r => r.json())
          .then(emails => {
            if (emails && emails.length > 0) {
              const newest = emails[0];
              return fetch(`/emails/${newest.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                  read: false
                })
              })
            }
          })
            .then(() => load_mailbox('sent'))
        })
}
