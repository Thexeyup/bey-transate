// RevengeTranslate - Discord Plugin Logic
const { MessageActions } = require("discord-internal-modules"); // Örnek modül

export default {
    name: "RevengeTranslate",
    description: "Mesajları anlık olarak Türkçe'ye çevirir.",
    authors: [{ name: "Thexeyup", id: "YOUR_ID" }],

    // Eklenti yüklendiğinde çalışacak kısım
    onStart() {
        console.log("RevengeTranslate aktif!");
    },

    // Çeviri motoru (Google Translate Web API)
    async translateText(text) {
        try {
            const response = await fetch(
                `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=tr&dt=t&q=${encodeURIComponent(text)}`
            );
            const data = await response.json();
            return data[0][0][0]; // Çevrilmiş metni döndürür
        } catch (error) {
            return "Çeviri hatası oluştu.";
        }
    },

    // Mesajın yanına "Çevir" butonu ekleme mantığı
    addButtonToMessage(message) {
        const translateBtn = document.createElement("button");
        translateBtn.innerText = "🌐";
        translateBtn.onclick = async () => {
            const translated = await this.translateText(message.content);
            alert("Çeviri: " + translated); // Basitçe göstermek için
        };
        return translateBtn;
    }
};
