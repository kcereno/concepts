import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

export const GET = async () => {
  return new NextResponse(JSON.stringify('MESSAGE RECIEVED'));
};

export const POST = async (req) => {
  const body = await req.json();
  console.log('POST ~ body:', body);

  const topic = body.topic;

  console.log('POST ~ topic:', topic);
  const comprehensionLevel = body.comprehensionLevel;
  console.log('POST ~ comprehensionLevel:', comprehensionLevel);

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Explain ${topic} at a ${comprehensionLevel} level`,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log('POST ~ response:', response.data);
    const completionText = response.data.choices[0].text;
    return new NextResponse(JSON.stringify(completionText));
  } catch (error) {
    console.log('POST ~ error:', error);
  }

  return new NextResponse(JSON.stringify('MESSAGE RECIEVED'));
};
