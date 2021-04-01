const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');

const cognitoFunction = () => {
    const poolData = {
        UserPoolId: "us-west-2_aQscrTsiy", // Your user pool id here    
        ClientId: "12fksg5behd0nvudpsdnsb03at" // Your client id here
    };
    const pool_region = 'us-west-2';

}

module.exports = cognitoFunction;