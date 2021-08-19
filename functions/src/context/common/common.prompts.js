const utils = require('../../utils');
const {SimpleResponse,Suggestions,BasicCard,Button,Image} = require('actions-on-google');

const MAX_SUGGESTIONS = 3;


exports.getSimpleResponsesExit = () => {

let speechs = [
  new SimpleResponse({
    speech: `<speak>
    <prosody rate="fast">Ok summoner,</prosody>
      <prosody pitch="medium" rate="x-low">
                    stay tuned for new features that will be released soon,
                    I hope to talk to you again soon
        </prosody>
   </speak>`,
    text: `Ok summoner, stay tuned for new features that will be released soon, I hope to talk to you again soon.`,
  }),
  new SimpleResponse({
    speech: `<speak>
    <prosody rate="fast">Ok summoner,</prosody>
    <prosody pitch="medium" rate="x-low">
                    Stay tuned for new features that will be released soon,
                    come back if there's anything else you'd like to know
                   
      </prosody>
    </speak>`,
    text: `Ok summoner, stay tuned for new features that will be released soon, Come back if there's anything else you'd like to know`,
  }),
  new SimpleResponse({
    speech: `<speak>
    <prosody rate="fast">Ok summoner,</prosody>
    <prosody pitch="medium" rate="x-low">
    Stay tuned for new features that will be released soon,
                    <emphasis level="strong">
                    see you later
                    </emphasis>
      </prosody>
    </speak>`,
    text: `Ok summoner, stay tuned for new features that will be released soon, see you later`,
  }),
];
return utils.getSingleRandom(speechs);
}

exports.getSimpleResponsesNoInput = (repromptCount) => {

  let speechs = [
    new SimpleResponse({
      speech: `<speak>
        <prosody pitch="medium" rate="x-low">
                        <emphasis level="strong">
                        What was that?
                        </emphasis>
        </prosody>
     </speak>`,
      text: `What was that?`,
    }),
    new SimpleResponse({
      speech: `<speak>
      <prosody rate="fast">Sorry summoners,</prosody>
      <prosody pitch="medium" rate="x-low">
          I didn't catch that. Could you repeat yourself?
      </prosody>
      </speak>`,
      text: `Sorry summoners, I didn't catch that. Could you repeat yourself?`,
    }),
    new SimpleResponse({
      speech: `<speak>
      <prosody rate="fast">Okay summoner,,</prosody>
      <prosody pitch="medium" rate="x-low">
            let's try this again later
      </prosody>
      </speak>`,
      text: `Okay summoner, let's try this again later`,
    }),
  ];
  return speechs[repromptCount];
  }

  exports.getSimpleResponsesFallback = () => {

    let speechs =  [
        "I didn't get that. Can you say it again?",
        "I missed what you said. What was that?",
        "Sorry, could you say that again?",
        "Sorry, can you say that again?",
        "Can you say that again?",
        "Sorry, I didn't get that. Can you rephrase?",
        "Sorry, what was that?",
        "One more time?",
        "What was that?",
        "Say that one more time?",
        "I didn't get that. Can you repeat?",
        "I missed that, say that again?"
      ];

      
      return new SimpleResponse({
          speech: `<speak>
                      <prosody pitch="medium" rate="x-low">
                      ${utils.getSingleRandom(speechs)}  
                      </prosody>
                  </speak>`,
          text: utils.getSingleRandom(speechs),
        })

  }

  exports.getSuggestionsFallback = () => {

    let requiredSuggestion = ['Skins', "Free champions", "Abilities"];
    
    return new Suggestions(requiredSuggestion);
  };
