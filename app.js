const dialogflow = require('dialogflow');
const uuid = require('uuid');
const express = require('express');

//onst express = require('epxress')
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
// const app = express();
const app = express();
const sessionId = uuid.v4();
const path = require('path');
app.use(express.static('src'));
// app.get('/', (request, response) => {
//   console.log('habeeb');
//   response.sendFile(path.join(__dirname + '/src/index.html'));
// });
const sessionClient = new dialogflow.SessionsClient({
  keyFilename: './RichBot.json'
});
const projectId = 'richbot-hsdstx';
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});
app.post('/send-msg', (req, res) => {
  runSample(req.body.MSG).then(data => {
    res.send({ Reply: data });
  });
});

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(msg) {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: msg,
        languageCode: 'en-US'
      }
    }
  };
  const responses = await sessionClient.detectIntent(request);

  console.log('Detected intent');
  // console.log(`%${JSON.stringify(responses.fulfillmentMessages)}%\n`);
  const result = responses[0].queryResult;
  // console.log(`@${result.fulfillmentMessages}@\n`);
  let replydata = result.fulfillmentMessages;
  // console.log(`${JSON.stringify(replydata)}`);
  let array1 = [...replydata];
  let alpha = [];
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j <= array1[i].text.text.length; j++) {
      if (j != 1) alpha.push(array1[i].text.text[j]);
    }
  }
  alpha = alpha.filter(function(element) {
    return element !== undefined;
  });
  // console.log(alpha);
  let finalalpha = alpha.join('\n');
  // console.log(`finalalpha:-${finalalpha}`);
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
  // return result.fulfillmentText;
  return finalalpha;
  // return alpha;
}

app.listen(port, () => {
  console.log('running on port ' + port);
});
