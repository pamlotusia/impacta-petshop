import React, { useState } from 'react';

export const WhatsappReminder = ({phoneNumber, onSendMessage}) => {
  const [sendMessage, setSendMessage] = useState(false)

  const handleCheckboxChange= ()=> {
    setSendMessage(!sendMessage)
  }

  const handleConfirmButtonClick = () => {
    if(sendMessage){
      onSendMessage(phoneNumber)
    }
  }
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={sendMessage}
          onChange={handleCheckboxChange}
        />
        Desejo receber lembrete no WhatsApp
      </label>
    </div>
  )
}

export default WhatsappReminder
