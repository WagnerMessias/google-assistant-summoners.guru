const prompts = require('./common.prompts');

exports.fallback = (conv) => {
    //TODO: posso melhoar se baseando no contexto do momento
    conv.ask(prompts.getSimpleResponsesFallback());
    conv.ask(prompts.getSuggestionsFallback());
};

exports.exit = (conv) => {
    conv.close(prompts.getSimpleResponsesExit());
};

exports.noInput = (conv) => {
    //TODO: posso melhoar se baseando no contexto do momento
    const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));

    if (repromptCount  < 2) {
        conv.ask(prompts.getSimpleResponsesNoInput(repromptCount));
    }else if (conv.arguments.get('IS_FINAL_REPROMPT')){
        conv.close(prompts.getSimpleResponsesNoInput(repromptCount));
    }
};