[![New Relic Experimental header](https://github.com/newrelic/opensource-website/raw/master/src/images/categories/Experimental.png)](https://opensource.newrelic.com/oss-category/#new-relic-experimental)

# [nr-students-edition] [build badges go here when available]

>[Brief description - what is the project and value does it provide? How often should users expect to get releases? How is versioning set up? Where does this project want to go?]

## Installation

To install the solution you need to install nodejs first. Required minimum version of nodejs is 12.x.
When you have the nodejs run command `npm install` to setup the project.

## Getting Started
To run the software you need to have installed serverless framework to run it locally or have got valid AWS account to deploy it into cloud.

To run locally the solution use command `sls offline`.

Better way is to deploy the solution into AWS cloud. Lambdas are free for 2 milion requests. To deploy solution into AWS cloud you need created AWS IAM account and setup credentials locally. To do this check the link: https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/setup-credentials.html

After setting up the AWS credentials the user can use command `sls deploy` to deploy the lambdas to AWS cloud. 

WARNING!
If you have multiple AWS configs you should use command `sls deploy --aws-profile <profile-name>`

## Usage
The repository contains lambdas to perform validation if user is a student or a teacher. Below there is description of each lambda in this project.

### Check validation status lambda
This lambda check if the user already validates. If there is no user entry in the database lambda returns no content.


<b>URL: .../check</b>
<b>Requests</b>

```
GET
{
  accountId: string;
}
```

<b>Response</b>
```
204 - No Content

or

200 - OK
true / false
```

### Save student data lambda
This lambda is used to save user data to the database.

<b>URL: .../save</b>
<b>Request</b>

```
POST
{
  accountId: string;
  nrEmail: email;
  userEmail: string;
  firstname: string;
  lastname: string;
  university: string;
  levelOfStudy: string;
  graduationDate: string;
  country: string;
  isThirteenYo: boolean;
  parentsEmail: email;
  validationStatus: boolean;
  code: string;
}
```

<b>Response</b>
```
201 - CREATED
```

<b>Possible errors</b>
```
400 - Bad parameters provided
500 - Internal lambda error
```

### Authenticate Github
This lambad creates redirect link to authenticate with Github API.

<b>URL: .../github/auth</b>
<b>Request</b>

```
GET
{
  accountId: string;
}
```

<b>Response</b>
```
{
  302 - Found
  In header there is redirect url to github auth
}
```

<b>Possible errors</b>
```
400 - Bad parameters provided
500 - Internal lambda error
```

### Get user data
This lambda fetch the data from Github API and returns the information if user is a student or a teacher.

<b>URL: .../github/users</b>
<b>Request</b>

```
GET
{
  state: string;
  code: string;
}
```

<b>Response</b>
```
{
  account_id: string;
  student: boolean;
}
```

<b>Possible errors</b>
```
400 - Bad parameters provided
500 - Internal Lambda error
503 - Something went wrong with Github API
```

## Testing
To run the tests use ```npm test``` command on the project.

## Support

New Relic hosts and moderates an online forum where customers can interact with New Relic employees as well as other customers to get help and share best practices. Like all official New Relic open source projects, there's a related Community topic in the New Relic Explorers Hub. You can find this project's topic/threads here:

>Add the url for the support thread here

## Contributing
We encourage your contributions to improve [project name]! Keep in mind when you submit your pull request, you'll need to sign the CLA via the click-through using CLA-Assistant. You only have to sign the CLA one time per project.
If you have any questions, or to execute our corporate CLA, required if your contribution is on behalf of a company,  please drop us an email at opensource@newrelic.com.

**A note about vulnerabilities**

As noted in our [security policy](../../security/policy), New Relic is committed to the privacy and security of our customers and their data. We believe that providing coordinated disclosure by security researchers and engaging with the security community are important means to achieve our security goals.

If you believe you have found a security vulnerability in this project or any of New Relic's products or websites, we welcome and greatly appreciate you reporting it to New Relic through [HackerOne](https://hackerone.com/newrelic).

## License
This project is licensed under the [Apache 2.0](http://apache.org/licenses/LICENSE-2.0.txt) License.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/norbertsuski"><img src="https://avatars2.githubusercontent.com/u/5214156?v=4" width="100px;" alt="Norbert Suski"/><br /><sub><b>Norbert Suski</b></sub></a><br /><a href="#ideas-nsus" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/newrelic/nr-ngo-validation-serverless/commits?author=norbertsuski" title="Code">💻</a>
    <td align="center"><a href="https://github.com/DominikMarciniszyn"><img src="https://avatars3.githubusercontent.com/u/59443662?v=4" width="100px;" alt="Dominik Marciniszyn"/><br /><sub><b>Dominik Marciniszyn</b></sub></a><br /><a href="#ideas-dmar" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/newrelic/nr-ngo-validation-serverless/commits?author=DominikMarciniszyn" title="Code">💻</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
