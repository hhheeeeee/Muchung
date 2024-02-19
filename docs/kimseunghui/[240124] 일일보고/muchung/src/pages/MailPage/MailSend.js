import React, { useState } from 'react';

function MailSend() {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to send the mail
    console.log('Mail sent!');
    // Reset form fields
    setRecipient('');
    setSubject('');
    setMessage('');
  };

  return (
    <div>
      <h1>Mail Send Box</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="recipient">Recipient:</label>
        <input
          type="text"
          id="recipient"
          value={recipient}
          onChange={handleRecipientChange}
        />

        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={handleSubjectChange}
        />

        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={handleMessageChange}
        ></textarea>

        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default MailSend;
