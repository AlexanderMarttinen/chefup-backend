const OpenAI = require('openai')

const client = new OpenAI({
  apiKey: "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",
});


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




module.exports = {
  getStreamingCompletion,
  doSomethingSlow
}