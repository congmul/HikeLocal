const express = require('express');
const router = express.Router();
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
require('dotenv').config();

//=============== AWS IDs ===============
const userPoolId = process.env.USERPOOLID;
const clientId = process.env.CLIENTID;

let cognitoUser;
let userPool;

let poolData = {
    UserPoolId: userPoolId,
    ClientId: clientId
};

router.post("/signup", (req, res) => {
    userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var attributeList = [];

    const dataEmail = {
        Name: 'email',
        Value: req.body.email
    };

    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);

    attributeList.push(attributeEmail);
    console.log(req.body.name);
    userPool.signUp(req.body.name, req.body.password, attributeList, null, function (err, result) {
        if (err) {
            console.log(err.message);
            res.status(400).json({'err' : err});
        } else {
            cognitoUser = result.user;
            console.log('Registration Successful!');
            console.log('Username is: ' + cognitoUser.getUsername());
            console.log('Please enter the verification code sent to your Email.');
        }
    });


});

module.exports = router;