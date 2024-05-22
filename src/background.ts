chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "REQ_COOKIE") {
    console.log(message);

    // Fetch cookies asynchronously and send the response
    (async function fetchCookies() {
      const cookies = await chrome.cookies.getAll({
        url: "https://dev.app.blendit.ai/",
      });
      console.log(cookies);

      sendResponse({
        type: "COOKIE",
        response: "This is the response",
        cookies: cookies,
      });
    })();

    // Return true to indicate that sendResponse will be called asynchronously
    return true;
  }
});
