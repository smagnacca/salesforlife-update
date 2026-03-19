exports.handler = async (event) => {
  const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzChDEHNKeps8MhRo_UodO3pap4fxh2tNzELotvD-oI1EYtRnf5mSIW6DU98VSulDIBGQ/exec";

  try {
    const body = JSON.parse(event.body);
    
    // Netlify wraps the submission inside a "payload" object for this specific function
    const formPayload = body.payload || {};

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      body: JSON.stringify(formPayload),
    });

    if (!response.ok) {
      console.error("Failed to forward submission:", response.statusText);
      return { statusCode: 500, body: "Error forwarding to Google webhook" };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Submission successfully forwarded to Master Pipeline." }),
    };

  } catch (err) {
    console.error("Function error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
