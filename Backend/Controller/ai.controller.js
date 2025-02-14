const AiService = require('../services/gemini.service');
exports.generateCodeReview = async (req, res)=>{
    const code = req.body.code;

    if(!code){
        return res.status(400).send('Code is required');
    }

    const result = await AiService(code);
    res.send(result);
}
