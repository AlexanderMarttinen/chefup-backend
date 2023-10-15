const OpenAI = require('openai')

const client = new OpenAI({
  apiKey: "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",
});

const systemMessage = {
  role: "system",
  content:
    "You are a Askbot. You are supposed to answer the questions asked by the users. Validate the prompts to be a question and it should not in approprite. Give funky responses",
};

// module.exports.getStreamingCompletion = async ({ userPrompt }) => {
//   return client.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     max_tokens:600,
//     messages: [systemMessage, { role: "user", content: userPrompt }],
//     stream: true,
//   });
// };

async function getStreamingCompletion  ( userPrompt ) {
  return client.chat.completions.create({
    model: "gpt-3.5-turbo",
    max_tokens:600,
    messages: [systemMessage, { role: "user", content: userPrompt }],
    stream: true,
  });
};


async function doSomethingSlow(){
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("You waited half a minute for this response");
    }, 30000);
  });
}


module.exports = {
  getStreamingCompletion,
  doSomethingSlow
}