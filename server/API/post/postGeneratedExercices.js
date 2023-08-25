const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
module.exports = async (req, res, next) => {
  if (!req.body.chapter || !req.body.subChapter)
    return res.status(400).send({
      code: 400,
      message: 'Missing parameters',
    });
  const openai = new OpenAIApi(configuration);
  let parsed = false;
  let response = null;
  do {
    try {
      response = await openai.createChatCompletion({
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: `
          Créé deux exercices pour s'entrainer à la programmation:
          thème: ${req.body.chapter}
          compétence à travailler: ${req.body.subChapter}
        
          {
            exo1: {
              instructions: "instructions",
              astuces: "astuces",
              solution: "solution (avec des commentaires sur les lignes les plus complexes) tous les sauts de lignes sont écrits avec le caractère \\n",
              theme: "Thème",
              skill: "Compétence à travailler"
            },
            exo2: {
              instructions: "instructions",
              astuces: "astuces",
              solution: "solution (avec des commentaires sur les lignes les plus complexes) tous les sauts de lignes sont écrits avec le caractère \\n",
              theme: "Thème",
              skill: "Compétence à travailler"
            }
          }
        
          ta réponse doit être un JSON sans aucun commentaires de ta part, c'est très important.`,
          },
        ],
      });
    } catch (err) {
      console.error(err);
    }

    try {
      response = JSON.parse(
        response.data.choices[0].message.content
          .slice(response.data.choices[0].message.content.indexOf('{'))
          .replace(/{\\n/g, '{')
          .replace(/\\n}/g, '}')
      );
    } catch (err) {
      // console.error(err);
    } finally {
      parsed = true;
    }
  } while (!parsed);

  res.status(200).send(response);
};
