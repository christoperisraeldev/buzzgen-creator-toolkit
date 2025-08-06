import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const DEEPSEEK_API_KEY = 'sk-b8ec4401dbd94bc5bea4a7b5e0fd05d2';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, prompt, topic, userType = 'creator' } = await req.json();

    let generatedContent = '';

    if (type === 'captions') {
      const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: `You are a ${userType === 'creator' ? 'social media content creator' : 'brand marketing'} assistant. Generate engaging captions for social media posts. Make them authentic, relatable, and include relevant emojis and hashtags.`
            },
            {
              role: 'user',
              content: `Generate a creative and engaging social media caption for: ${prompt}`
            }
          ],
          max_tokens: 200,
          temperature: 0.8
        }),
      });

      const data = await response.json();
      generatedContent = data.choices[0].message.content;

    } else if (type === 'ideas') {
      const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: `You are a ${userType === 'creator' ? 'content creator' : 'brand marketing'} strategist. Generate specific, actionable content ideas that would perform well on social media platforms.`
            },
            {
              role: 'user',
              content: `Generate 8 specific, creative content ideas for the topic: ${topic}. Format them as a numbered list with titles only, no descriptions.`
            }
          ],
          max_tokens: 300,
          temperature: 0.9
        }),
      });

      const data = await response.json();
      generatedContent = data.choices[0].message.content;

    } else if (type === 'hashtags') {
      const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: 'You are a social media hashtag expert. Generate relevant, trending hashtags that will increase reach and engagement.'
            },
            {
              role: 'user',
              content: `Generate 15 relevant hashtags for this content idea: ${prompt}. Include a mix of popular and niche hashtags. Format as hashtags with # symbol, separated by spaces.`
            }
          ],
          max_tokens: 150,
          temperature: 0.7
        }),
      });

      const data = await response.json();
      generatedContent = data.choices[0].message.content;
    }

    return new Response(JSON.stringify({ generatedContent }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-toolkit function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});