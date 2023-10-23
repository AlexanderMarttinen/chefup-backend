import { OpenAI } from "https://deno.land/x/openai/mod.ts";
export default async (req, context) => {
  const encoder = new TextEncoder();
  const body = new ReadableStream({
    async start(controller) {
      try {
        const body = await req.json();
        const openAI = new OpenAI(
          Deno.env.get("OPEN_AI_API_KEY")
        );
        const chatCompletion = await openAI.createChatCompletionStream(
          {
            model: "gpt-3.5-turbo",
            stream: true,
            messages: [
              {
                role: "system",
                content:
                  "You are a recipe bot, please provide answers in the form of JSON objects",
              },
              {
                role: "user",
                content: `You are a machine that is built to respond to prompts using strictly JSON format. No additional text is to be included in your response. You need to reply with a JSON object using the following schema:
                    {
                      name:"the title of the recipe formatted as a String",
                      description:"a brief one sentence description of the recipe formatted as a string",
                      serves:"the mode number of servings that this recipe will provide formatted as an int",
                      cooktime:"the estimated total time in minutes for this recipe to be cooked formatted as an int",
                      ingredients:[{'ingedient':'name of ingredient 1 , 'amount': 'quantity of ingredient 1 for the recipe'},{'ingedient':'name of ingredient 2 , 'amount': 'quantity of ingredient 2 for the recipe' }],
                      steps:[{body:"a very brief and concise explanation for step 1 of the recipe"},{body:"a very brief and concise explanation for step 2 of the recipe"}]
                      }
                note: the steps and ingredients properties, will be an array that covers all necessary ingredients and instructions for the recipe.
               
                Now provide me a Recipe in the form of a JSON object for how I can make ${body.recipe}`,
              },
            ],
          },
          (chunk) => {
            controller.enqueue(encoder.encode(chunk.choices[0]?.delta.content));
            console.log(chunk.choices[0]?.delta.content);
            if (chunk.choices[0]?.finish_reason === "stop") {
              controller.close();
            }
          }
        );
        const response = chatCompletion.choices[0].message.content;
        controller.enqueue(new TextEncoder().encode(response));
        controller.close();
      } catch (err) {}
    },
  });
  return new Response(body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
