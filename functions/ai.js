// const Config = require('@netlify/functions')
// const OpenAI = require('openai');

// export default async(req) =>{
//     const text = await req.text();
//     const resp = await new OpenAI().chat.completions.create({
//         model: "gpt-3.5-turbo",
//         max_tokens:600,
//         messages: [systemMessage, { role: "user", content: userPrompt }],
//         stream: true
//     }).asResponse();

//     return new Response(resp.body, resp);
// }

// export const config = Config({path:"/ai", method:"POST"})