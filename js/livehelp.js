// Live Help Widget for all pages
(function() {
    // Inject widget HTML if not present
    if (!document.getElementById('live-chat')) {
        var chatDiv = document.createElement('div');
        chatDiv.id = 'live-chat';
        chatDiv.innerHTML = `
            <button id="chat-toggle" aria-label="Open chat"><i class="fa fa-comments"></i></button>
            <div id="chat-box" style="display:none;">
                <div class="chat-header">Live Help</div>
                <div class="chat-messages" id="chat-messages">
                    <div class="chat-bot-msg">Hi! How can we help you today? Please leave your message and our team will respond as soon as possible.</div>
                </div>
                <div class="chat-input-area">
                    <input type="text" id="chat-input" placeholder="Type your message...">
                    <button id="chat-send">Send</button>
                </div>
            </div>
        `;
        document.body.appendChild(chatDiv);
    }
    // Widget logic
    var chatToggle = document.getElementById('chat-toggle');
    var chatBox = document.getElementById('chat-box');
    var chatMessages = document.getElementById('chat-messages');
    var chatInput = document.getElementById('chat-input');
    var chatSend = document.getElementById('chat-send');
    if (!chatToggle || !chatBox || !chatMessages || !chatInput || !chatSend) return;
    chatToggle.addEventListener('click', function() {
        chatBox.style.display = chatBox.style.display === 'block' ? 'none' : 'block';
        if(chatBox.style.display === 'block') chatInput.focus();
    });
    chatSend.addEventListener('click', sendChatMessage);
    chatInput.addEventListener('keydown', function(e) { if(e.key === 'Enter') sendChatMessage(); });
    function sendChatMessage() {
        var msg = chatInput.value.trim();
        if(msg) {
            var userMsg = document.createElement('div');
            userMsg.className = 'chat-user-msg';
            userMsg.textContent = msg;
            chatMessages.appendChild(userMsg);
            chatInput.value = '';
            setTimeout(function() {
                var botMsg = document.createElement('div');
                botMsg.className = 'chat-bot-msg';
                var reply = getBotReply(msg);
                botMsg.textContent = reply.text;
                chatMessages.appendChild(botMsg);
                chatMessages.scrollTop = chatMessages.scrollHeight;
                if(reply.sendToWhatsapp) {
                    sendToWhatsapp(msg);
                }
            }, 800);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
    function getBotReply(msg) {
        msg = msg.toLowerCase();
        if(msg.includes('order')) return {text:'You can track your order from your account dashboard or contact support.', sendToWhatsapp:false};
        if(msg.includes('payment')) return {text:'We accept cards, UPI, net banking, and cash on delivery.', sendToWhatsapp:false};
        if(msg.includes('return')) return {text:'To return a product, contact us within 7 days of delivery.', sendToWhatsapp:false};
        if(msg.includes('address')) return {text:'You can update your address before shipping by contacting support.', sendToWhatsapp:false};
        if(msg.includes('hello') || msg.includes('hi')) return {text:'Hello! How can I assist you today?', sendToWhatsapp:false};
        // For other questions, send to WhatsApp
        return {text:'Thank you for your message! Our team will respond soon. For urgent queries, we have forwarded your question to WhatsApp support.', sendToWhatsapp:true};
    }
    function sendToWhatsapp(msg) {
        var phone = '7878005320';
        var url = 'https://wa.me/' + phone + '?text=' + encodeURIComponent('Customer question from website: ' + msg);
        window.open(url, '_blank');
    }
})(); 