// const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
// require('dotenv').config();

// function RegisterUser(userInformation) {
//     //=============== AWS IDs ===============
//     const userPoolId = process.env.USERPOOLID;
//     const clientId = process.env.CLIENTID;

//     // console.log(userInformation);
//     let cognitoUser;
//     let userPool;

//     let poolData = {
//         UserPoolId: userPoolId,
//         ClientId: clientId
//     };

//     userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
//     // cognitoUser = userPool.getCurrentUser();

//     var attributeList = [];

//     const dataEmail = {
//         Name: 'email',
//         Value: userInformation.email
//     };

//     var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);

//     attributeList.push(attributeEmail);

//     console.log(attributeList);
//     userPool.signUp(userInformation.name, userInformation.password, attributeList, null, function(err, result){
//         if (err) {
//             // console.log(err.message);
//             return err;
//         }else{
//             cognitoUser = result.user;
//             console.log('Registration Successful!');
//             console.log('Username is: ' + cognitoUser.getUsername());
//             console.log('Please enter the verification code sent to your Email.');
//         }
//     });

// }

// module.exports = {
//     RegisterUser,
    
// };