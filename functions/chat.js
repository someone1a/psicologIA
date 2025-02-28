// functions/chat.js
import Groq from "groq-sdk";

exports.handler = async function(event, context) {
  // Verificar método
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Método no permitido' }),
    };
  }

  try {
    // Inicializar cliente de Groq con la SDK correcta
    const groq = new Groq({ 
      apiKey: process.env.GROQ_API_KEY 
    });
    
    // Parsear el cuerpo de la solicitud
    const { message } = JSON.parse(event.body);
    
    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Se requiere un mensaje' }),
      };
    }

    // Prompt base para psicología
    const basePrompt = `
    Eres un asistente psicológico AI llamado PsicoAI, entrenado para brindar apoyo emocional y orientación inicial.
    
    Directrices importantes:
    - Proporcionar información precisa y basada en evidencia sobre la salud mental.
    - Mantener un tono empático, respetuoso y no crítico.
    - Nunca diagnosticar condiciones médicas o psicológicas.
    - Siempre recomendar buscar ayuda profesional para preocupaciones serias.
    - No dar consejos médicos específicos ni recetar tratamientos.
    - Priorizar la seguridad del usuario en todo momento.
    - Si detectas riesgo de daño, proporcionar recursos de crisis.
    
    Responde a la siguiente consulta del usuario de forma útil, concisa y empática:
    ${message}
    `;

    // Llamar a la API de Groq con la sintaxis correcta
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Eres un asistente especializado en psicología, proporcionando apoyo inicial y empatía."
        },
        {
          role: "user",
          content: basePrompt
        }
      ],
      model: "llama3-70b-8192", // Asegúrate de que este identificador de modelo sea correcto
      temperature: 0.5,
      max_tokens: 1000,
    });

    // Extraer la respuesta
    const aiResponse = chatCompletion.choices[0]?.message?.content || "Lo siento, no pude generar una respuesta.";
    
    // Devolver respuesta
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ response: aiResponse }),
    };
    
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al procesar la solicitud', details: error.message }),
    };
  }
};