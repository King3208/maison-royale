// ========================================
// Maison Royale - WhatsApp Integration
// ========================================

const WHATSAPP_NUMBER = '+2347078659307';

// General WhatsApp contact
function contactViaWhatsApp(message) {
    const defaultMessage = "Hello, I have a question about your products.";
    const text = message || defaultMessage;
    const encodedMessage = encodeURIComponent(text);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
}

// Send product inquiry
function sendProductInquiry(productId) {
    const product = getProductById(productId);
    if (!product) return;

    const message = `Hello,\n\nI'm interested in this product:\n\nName: ${product.name}\nPrice: ${formatPrice(product.price)}\n\nCan you provide more details?`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
}

// Quick WhatsApp message from contact form
function sendWhatsAppFromForm() {
    const name = document.getElementById('contact-name')?.value || '';
    const email = document.getElementById('contact-email')?.value || '';
    const message = document.getElementById('contact-message')?.value || '';
    
    if (!message.trim()) {
        showToast('Please enter a message.');
        return;
    }

    const whatsappMessage = `Hello Maison Royale,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
}
