import { OPENAI_API_KEY } from "$env/static/private";
import { json, type RequestHandler } from "@sveltejs/kit";
import OpenAI from "openai";

const openai = new OpenAI(
    {
        apiKey: OPENAI_API_KEY
    }
)

export const POST: RequestHandler = async ({request}) => {
    const {base64} = await request.json();

    const respone = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages:[
            {
                role: "user",
                content:[
                    {
                    type: "text",
                    text: `In the given image there will be either one or many clothes displayer. What you need to do is give me back a JSON and NOTHIN ELSE.
                    Please only give me back a valid JSON since this will be programatically handled and it will crash if there is any other text coming back with you response.
                    What I need as information is the clothes that you can see on the image in this form:
                    {
                        "brand": "Nike",
                        "clothingType": "Hoodie"
                    }
                        Please also make sure that you return an array, even if there is only one clothing visible on the image.`
                },
                {
                    type: "image_url",
                    image_url: {
                        url: `data:image/jpeg;base64,${base64}`,
                        detail: "low"
                    }
                }]
            }
        ]
    })

    const clothesArrayString = respone.choices[0].message.content?.replace(/```json|```/g, "").trim();
    const clothesArray = JSON.parse(clothesArrayString || "");

    return json({clothesArray});
}