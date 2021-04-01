const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
require('dotenv').config();

function RegisterUser() {
    //=============== AWS IDs ===============
    var userPoolId = process.env.USERPOOLID;
    var clientId = process.env.CLIENTID;
    // var region = 'us-west-2';
    //  var identityPoolId = '<Identity Pool ID>';

    var cognitoUser;
    var idToken;
    var userPool;

    var poolData = {
        UserPoolId: userPoolId,
        ClientId: clientId
    };

    userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    // cognitoUser = userPool.getCurrentUser();

    var attributeList = [];

    var dataEmail = {
        Name: 'email',
        Value: 'jehyun@homtail.com'
    };

    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);

    attributeList.push(attributeEmail);

    console.log(attributeList);
    userPool.signUp('congmul', '@Jung5424', attributeList, null, function(err, result){
        if (err) {
            console.log(err.message);
        }else{
            cognitoUser = result.user;
            console.log('Registration Successful!');
            console.log('Username is: ' + cognitoUser.getUsername());
            console.log('Please enter the verification code sent to your Email.');
        }
    });

}

RegisterUser();