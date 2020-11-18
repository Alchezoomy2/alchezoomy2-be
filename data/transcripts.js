module.exports = [
  {
    'identifier': 'identifier',
    time_start: 10.0,
    time_end: 50.0,
    speaker: 'me',
    'text': 'text1'
  },
  {
    'identifier': 'identifier',
    time_start: 10.0,
    time_end: 50.0,
    speaker: 'me',
    'text': 'text2'
  },
  {
    'identifier': 'identifier',
    time_start: 10.0,
    time_end: 50.0,
    speaker: 'me',
    'text': 'text3'
  },
  {
    'identifier': '1',
    time_start: 10.0,
    time_end: 50.0,
    speaker: 'me',
    'text': 'Ryan Mehta: Okay, so'
  },
  {
    'identifier': '2',

    'text': 'Ryan Mehta: Last time we made a full stack app. We did what I would call a data driven'
  },
  {
    'identifier': '3',
    'text': 'Ryan Mehta: Pack like I don\'t know patterns right word but data driven'
  },
  {
    'identifier': '4',
    'text': 'Ryan Mehta: Strategy while constructing our application.'
  },
  {
    'identifier': '5',
    'text': 'Ryan Mehta: So we started'
  },
  {
    'identifier': '6',
    'text': 'Ryan Mehta: On'
  },
  {
    'identifier': '7',
    'text': 'Ryan Mehta: The back end of this is so fast.'
  },
  {
    'identifier': '8',
    'text': 'Ryan Mehta: So we started by building a'
  },
  {
    'identifier': '9',
    'text': 'Ryan Mehta: Let\'s try that again.'
  },
  {
    'identifier': '10',
    'text': 'Ryan Mehta: Our model like figure out what our data looks like we\'ve constructed our model and then our backend controller and then our front end service.'
  },
  {
    'identifier': '11',
    'text': 'Ryan Mehta: And then our view, this is the way that we approached everything and today we\'re going to do it sort of in the exact or at least that kind of opposite order. We\'re going to start with our view and then move on to our model controller service.'
  },
  {
    'identifier': '12',
    'text': 'Ryan Mehta: We\'re going to start with the view this time, this will be called our design driven'
  },
  {
    'identifier': '13',
    'text': 'Ryan Mehta: Design driven development.'
  },
  {
    'identifier': '14',
    'text': 'Ryan Mehta: Or some people call a DVD I hardly ever abbreviate DVD because this strategy appears called Data Driven Development.'
  },
  {
    'identifier': '15',
    'text': 'Ryan Mehta: It\'s also dvd'
  },
  {
    'identifier': '16',
    'text': 'Ryan Mehta: DVD.'
  },
  {
    'identifier': '17',
    'text': 'Ryan Mehta: So DD is kind of like a useless.'
  },
  {
    'identifier': '18',
    'text': 'Ryan Mehta: Thing to use or these things but'
  },
  {
    'identifier': '19',
    'text': 'Ryan Mehta: Today will do this approach. The difference between the two kind of makes sense.'
  },
  {
    'identifier': '20',
    'text': 'Ryan Mehta: Yeah. Yeah, man.'
  },
  {
    'identifier': '21',
    'text': 'Brooke Perkins (she/her): Data Driven Development that\'s done.'
  },
  {
    'identifier': '22',
    'text': 'Ryan Mehta: This is a way that I\'ve almost always constructed apps in the past this way is like the way that people like hipsters are talking about nowadays hipster dads are talking about nowadays.'
  },
  {
    'identifier': '23',
    'text': 'Brooke Perkins (she/her): They would'
  },
  {
    'identifier': '24',
    'text': 'Brooke Perkins (she/her): Is there any benefit to design driven'
  },
  {
    'identifier': '25',
    'text': 'Ryan Mehta: It puts your, your view, the focus on the view.'
  },
  {
    'identifier': '26',
    'text': 'Ryan Mehta: Which makes a lot of sense. Like you really care about what users see'
  },
  {
    'identifier': '27',
    'text': 'Ryan Mehta: And then everything falls from there. So you choose what your data looks like. Based on what you want your users to see'
  },
  {
    'identifier': '28',
    'text': 'Brooke Perkins (she/her): I guess I\'m having a hard time maybe I\'m a hipster. I can\'t understand why you wouldn\'t want it to be that way.'
  },
  {
    'identifier': '29',
    'text': 'Ryan Mehta: Yeah, I mean I think this makes a lot of sense. If you are in a position to start with your view.'
  },
  {
    'identifier': '30',
    'text': 'Ryan Mehta: Sometimes you\'re given data, though, and you already know what the data looks like before you even begin the application. And so there\'s no like flexibility there.'
  },
  {
    'identifier': '31',
    'text': 'Ryan Mehta: But for us, we\'re going to go with this style design driven development. So we\'re going to start with our presentational components and then move our way to the back end.'
  },
  {
    'identifier': '32',
    'text': 'Ryan Mehta: So let\'s open up our front end code.'
  },
  {
    'identifier': '33',
    'text': 'Ryan Mehta: And get started, I just have our little front end application bootstrapped here.'
  },
  {
    'identifier': '34',
    'text': 'Ryan Mehta: We should be able to start it and see. Hello World.'
  },
  {
    'identifier': '35',
    'text': 'Ryan Mehta: Okay, here\'s our little hello world application.'
  },
  {
    'identifier': '36',
    'text': 'Ryan Mehta: To start off with, we\'re going to start building a form'
  },
  {
    'identifier': '37',
    'text': 'Ryan Mehta: So we\'ll build something'
  },
  {
    'identifier': '38',
    'text': 'Ryan Mehta: will build our signup form, it\'ll have a section for email a section for a password.'
  },
  {
    'identifier': '39',
    'text': 'Ryan Mehta: And submit button.'
  },
  {
    'identifier': '40',
    'text': 'Ryan Mehta: I think we\'ve all seen sign up form. So probably seems like totally an interesting design here.'
  },
  {
    'identifier': '41',
    'text': 'Ryan Mehta: Let\'s go to our source directory'
  },
  {
    'identifier': '42',
    'text': 'Ryan Mehta: Under components. I\'m going to make a directory called off.'
  },
  {
    'identifier': '43',
    'text': 'Ryan Mehta: And let\'s make a sign up that sex. This is where we\'ll put our signup form.'
  },
  {
    'identifier': '44',
    'text': 'Ryan Mehta: So it\'ll be a function called sign up'
  },
  {
    'identifier': '45',
    'text': 'Ryan Mehta: Mobile haven\'t taken any props.'
  },
  {
    'identifier': '46',
    'text': 'Ryan Mehta: At least for now.'
  },
  {
    'identifier': '47',
    'text': 'Ryan Mehta: And then we\'re going to make it return a'
  },
  {
    'identifier': '48',
    'text': 'Ryan Mehta: Performer is going to have an input type text is there type email for for inputs. Is that a thing.'
  },
  {
    'identifier': '49',
    'text': 'Annalise: Yeah.'
  },
  {
    'identifier': '50',
    'text': 'Ryan Mehta: It is'
  },
  {
    'identifier': '51',
    'text': 'Annalise: I thought I saw one actually'
  },
  {
    'identifier': '52',
    'text': 'Edgar Cuellar: Do'
  },
  {
    'identifier': '53',
    'text': 'Ryan Mehta: Maybe it has like'
  },
  {
    'identifier': '54',
    'text': 'Ryan Mehta: You know validation for us.'
  },
  {
    'identifier': '55',
    'text': 'Ryan Mehta: So there\'s type button.'
  },
  {
    'identifier': '56',
    'text': 'Ryan Mehta: checking email a feel for editing and email looks like a text input, but has validation parameters and relevant keyboard.'
  },
  {
    'identifier': '57',
    'text': 'Ryan Mehta: In supportive browsers and devices with dynamic keyboards. So you know how sometimes when you click on an input, it\'ll have like.com as one of the buttons that you can press. I think this would give you that sort of thing.'
  },
  {
    'identifier': '58',
    'text': 'Ryan Mehta: So let\'s use that'
  },
  {
    'identifier': '59',
    'text': 'Ryan Mehta: So we\'ll have an email.'
  },
  {
    'identifier': '60',
    'text': 'Ryan Mehta: Jamie J style when she was writing her components, she did this.'
  },
  {
    'identifier': '61',
    'text': 'Ryan Mehta: And then like immediately press enter here so smart. I\'m like, have been backwards. This whole time I\'ve been reading it all on a single line and then'
  },
  {
    'identifier': '62',
    'text': 'Ryan Mehta: fixing everything'
  },
  {
    'identifier': '63',
    'text': 'Ryan Mehta: Okay.'
  },
  {
    'identifier': '64',
    'text': 'Ryan Mehta: So we\'ll have a tight email. We need to give it a value.'
  },
  {
    'identifier': '65',
    'text': 'And on change.'
  },
  {
    'identifier': '66',
    'text': 'Ryan Mehta: We also want our forum to probably have'
  },
  {
    'identifier': '67',
    'text': 'Ryan Mehta: A tight passwords. They value for the password and on change function also'
  },
  {
    'identifier': '68',
    'text': 'Ryan Mehta: And then we\'ll have a button.'
  },
  {
    'identifier': '69',
    'text': 'Ryan Mehta: Seems all expected'
  },
  {
    'identifier': '70',
    'text': 'Ryan Mehta: All right, let\'s add some placeholders to our email to so placeholder email and a placeholder.'
  },
  {
    'identifier': '71',
    'text': 'Ryan Mehta: Password.'
  },
  {
    'identifier': '72',
    'text': 'Ryan Mehta: And instead of using labels will use placeholders so the user knows what has to go into the input field, and then we\'ll use local state to hold our password and email as the users typing constructs email state.'
  },
  {
    'identifier': '73',
    'text': 'Ryan Mehta: And password state.'
  },
  {
    'identifier': '74',
    'text': 'Ryan Mehta: And then let\'s create construct a handle change function that will take the target.'
  },
  {
    'identifier': '75',
    'text': 'Ryan Mehta: Actually, I\'m going to be kind of lazy. I\'m going to avoid the handled change function and just write it in line. So we\'ll write our'
  },
  {
    'identifier': '76',
    'text': 'Ryan Mehta: Email'
  },
  {
    'identifier': '77',
    'text': 'Ryan Mehta: That way I don\'t have to do all those like if you normally do.'
  },
  {
    'identifier': '78',
    'text': 'Alright.'
  },
  {
    'identifier': '79',
    'text': 'I\'m not gay.'
  },
  {
    'identifier': '80',
    'text': 'Thomas Stussi: And an equal sign on the arrows luncheon.'
  },
  {
    'identifier': '81',
    'text': 'Ryan Mehta: Alright, so we have a little form that we can type into now.'
  },
  {
    'identifier': '82',
    'text': 'Ryan Mehta: We should probably create some sort of handle submit though.'
  },
  {
    'identifier': '83',
    'text': 'Ryan Mehta: Get an event and we will prevent default'
  },
  {
    'identifier': '84',
    'text': 'Ryan Mehta: And pass this handle submit to the on submit of our form.'
  },
  {
    'identifier': '85',
    'text': 'Ryan Mehta: The good sign up form.'
  },
  {
    'identifier': '86',
    'text': 'Ryan Mehta: All right.'
  },
  {
    'identifier': '87',
    'text': 'Ryan Mehta: How we\'re going to do this is I want to sort of store the currently logged in user and all the stuff about the user inside of an off provider.'
  },
  {
    'identifier': '88',
    'text': 'Ryan Mehta: The user state who\'s currently logged and seems like it should be global to our entire application.'
  },
  {
    'identifier': '89',
    'text': 'Ryan Mehta: As we\'re writing this stuff. We have no idea which components in the future will need access to the currently logged in user, it seems like it\'s going to be needed all over the place. The header is probably going to need it in our application. So it can display like the users face.'
  },
  {
    'identifier': '90',
    'text': 'Ryan Mehta: The main body of the application is probably going to need it right'
  },
  {
    'identifier': '91',
    'text': 'Ryan Mehta: We\'re going to have private routes, the private route is going to need to know if somebody logged in, if they\'re logged in, show the private information otherwise redirect to login page.'
  },
  {
    'identifier': '92',
    'text': 'Ryan Mehta: It\'s going to be all over. And it\'s really hard to predict exactly where we\'ll need this user state as they\'re constructing our application because of that it seems like it\'s best to store it globally for the entire application.'
  },
  {
    'identifier': '93',
    'text': 'Ryan Mehta: Which means we\'re going to need some sort of'
  },
  {
    'identifier': '94',
    'text': 'Ryan Mehta: Provider off provider for application.'
  },
  {
    'identifier': '95',
    'text': 'Ryan Mehta: So I\'m going to create an author provider. Let\'s make it all about'
  },
  {
    'identifier': '96',
    'text': 'Ryan Mehta: Sex and'
  },
  {
    'identifier': '97',
    'text': 'Ryan Mehta: We will also construct the'
  },
  {
    'identifier': '98',
    'text': 'Ryan Mehta: Well, in order to get this off provider rolling. We\'re going to need some sort of off context, right, so I will construct or create a context folder.'
  },
  {
    'identifier': '99',
    'text': 'Ryan Mehta: off.js file here will import react react and we will export context, context.'
  },
  {
    'identifier': '100',
    'text': 'Ryan Mehta: Will construct our off context. Let\'s look good.'
  },
  {
    'identifier': '101',
    'text': 'Ryan Mehta: So now with that off context constructed, we can create our off provider.'
  },
  {
    'identifier': '102',
    'text': 'Ryan Mehta: Or off provider is going to be a component that takes children.'
  },
  {
    'identifier': '103',
    'text': 'Ryan Mehta: And then eventually returns'
  },
  {
    'identifier': '104',
    'text': 'Ryan Mehta: Off on text off provider.'
  },
  {
    'identifier': '105',
    'text': 'So,'
  },
  {
    'identifier': '106',
    'text': 'Ron Yonker: Children refers to all the child components or'
  },
  {
    'identifier': '107',
    'text': 'Ryan Mehta: Children is all the children of our off provider. So makes it so we can use the OT provider.'
  },
  {
    'identifier': '108',
    'text': 'Ryan Mehta: And give it children to their'
  },
  {
    'identifier': '109',
    'text': 'Ryan Mehta: Children are all the things that go in between the opening and closing tags of our off provider.'
  },
  {
    'identifier': '110',
    'text': 'Ron Yonker: Okay, thank you.'
  },
  {
    'identifier': '111',
    'text': 'Ryan Mehta: export this'
  },
  {
    'identifier': '112',
    'text': 'Ryan Mehta: But good so far.'
  },
  {
    'identifier': '113',
    'text': 'Ryan Mehta: Alright, are off provider is going to export some value.'
  },
  {
    'identifier': '114',
    'text': 'Ryan Mehta: Will say we\'ll call this we call this bucket in the past, but that seems kind of like a silly word for this thing. It\'s kind of like a word that maybe somebody that\'s just learning this would call it our bucket of state. Let\'s call this our'
  },
  {
    'identifier': '115',
    'text': 'Ryan Mehta: Family'
  },
  {
    'identifier': '116',
    'text': 'Ryan Mehta: Okay. Sorry, I can\'t think of a better name, actually, but it seems just fine.'
  },
  {
    'identifier': '117',
    'text': 'Ryan Mehta: We can come back to it and see if we can find a better name for this object that we\'re providing maybe it\'s like off state or something.'
  },
  {
    'identifier': '118',
    'text': 'Sure.'
  },
  {
    'identifier': '119',
    'text': 'Ryan Mehta: Few things that we\'re going to need to have. We\'re going to have the current user who\'s currently logged in.'
  },
  {
    'identifier': '120',
    'text': 'Ryan Mehta: And by default, that will be no before anybody\'s logged in, we have no current user makes sense.'
  },
  {
    'identifier': '121',
    'text': 'Ryan Mehta: Will provide this current user'
  },
  {
    'identifier': '122',
    'text': 'Ryan Mehta: In our state will also want some loading state, are we currently in an authentication loading like are we currently trying to figure out if some of these logged in.'
  },
  {
    'identifier': '123',
    'text': 'Ryan Mehta: And we\'ll start this off as true to begin with. We\'re trying to figure out if the users logged in or not.'
  },
  {
    'identifier': '124',
    'text': 'Ryan Mehta: Will provide this over here.'
  },
  {
    'identifier': '125',
    'text': 'Ryan Mehta: And then I think we also want to provide some functions for other other files to us. We want to provide a signup function and login function to start with, let\'s just create our signup function.'
  },
  {
    'identifier': '126',
    'text': 'Ryan Mehta: When you sign up, you need to provide the email address and the password that somebody\'s going to use to sign up and then inside of here. We want to make a call to'
  },
  {
    'identifier': '127',
    'text': 'Ryan Mehta: Make sense and then we will provide sign up also'
  },
  {
    'identifier': '128',
    'text': 'Ryan Mehta: In order to do this, will need a service will need a backend model will need a back end route and all of those things.'
  },
  {
    'identifier': '129',
    'text': 'Ryan Mehta: But eventually, once we have those. We\'re going to use this sign up method or the signup function over here on the right hand side.'
  },
  {
    'identifier': '130',
    'text': 'Ryan Mehta: Inside of our handles submit or press the submit button. We want to use this signup function from the provider.'
  },
  {
    'identifier': '131',
    'text': 'Ryan Mehta: To get that I am going to add a little hook here to make it easier to get that'
  },
  {
    'identifier': '132',
    'text': 'Sign up'
  },
  {
    'identifier': '133',
    'text': 'Ryan Mehta: That will'
  },
  {
    'identifier': '134',
    'text': 'Ryan Mehta: Grab the'
  },
  {
    'identifier': '135',
    'text': 'Ryan Mehta: Off context.'
  },
  {
    'identifier': '136',
    'text': 'Ryan Mehta: Okay, so we\'re gonna have this hook that will get that sign up piece off of the provider that sign up. It\'s coming from over here.'
  },
  {
    'identifier': '137',
    'text': 'Ryan Mehta: So we\'ll be able to use that hook over fear.'
  },
  {
    'identifier': '138',
    'text': 'Ryan Mehta: Sign up you sign up'
  },
  {
    'identifier': '139',
    'text': 'Ryan Mehta: And this is grabbing this function over here for us. So after we handle summit, we will call sign up with the email and the password of the person that we want to sign up under application with good'
  },
  {
    'identifier': '140',
    'text': 'Ryan Mehta: Alright.'
  },
  {
    'identifier': '141',
    'text': 'Ryan Mehta: So we have to fill in this information, called the backend to create a user who said that we\'re going to go through this flow where we start off with the design how everything looks on the page and then make our way back to the back end.'
  },
  {
    'identifier': '142',
    'text': 'Ryan Mehta: Right now this signup form seems like it\'s exactly what we need a visually.'
  },
  {
    'identifier': '143',
    'text': 'Ryan Mehta: And we can put it on the page, just to double check.'
  },
  {
    'identifier': '144',
    'text': 'Ryan Mehta: Our sign up'
  },
  {
    'identifier': '145',
    'text': 'Ryan Mehta: On the page.'
  },
  {
    'identifier': '146',
    'text': 'Ryan Mehta: App JS and make sure it looks good.'
  },
  {
    'identifier': '147',
    'text': 'Ryan Mehta: Oh, right. If we do that, we\'re going to need'
  },
  {
    'identifier': '148',
    'text': 'Ryan Mehta: To wrap everything with her off provider.'
  },
  {
    'identifier': '149',
    'text': 'Ryan Mehta: Okay so rapper with our off provider. So has access to that.'
  },
  {
    'identifier': '150',
    'text': 'Ryan Mehta: This context here and then we should be able to'
  },
  {
    'identifier': '151',
    'text': 'Ryan Mehta: See our little'
  },
  {
    'identifier': '152',
    'text': 'Ryan Mehta: Thing you can type into these boxes we look at our signup state it\'s changing appropriately.'
  },
  {
    'identifier': '153',
    'text': 'Ryan Mehta: Look good'
  },
  {
    'identifier': '154',
    'text': 'Ryan Mehta: Okay, so let\'s make our way back to the back end. Then we want to connect this sign up function to a backend call that will actually do the sign up for us.'
  },
  {
    'identifier': '155',
    'text': 'Ryan Mehta: To get there, we need to open up our backend code and start creating the model that will do this for us.'
  },
  {
    'identifier': '156',
    'text': 'Ryan Mehta: So the start with, I\'m going to create a table.'
  },
  {
    'identifier': '157',
    'text': 'Ryan Mehta: Called users.'
  },
  {
    'identifier': '158',
    'text': 'Ryan Mehta: Our users table will have an ID, which will be a big event.'
  },
  {
    'identifier': '159',
    'text': 'Ryan Mehta: Which will be our primary key.'
  },
  {
    'identifier': '160',
    'text': 'Ryan Mehta: They\'ll have an email which will be some text that is unique.'
  },
  {
    'identifier': '161',
    'text': 'Ryan Mehta: And a password which will also be'
  },
  {
    'identifier': '162',
    'text': 'Ryan Mehta: Will call this'
  },
  {
    'identifier': '163',
    'text': 'Ryan Mehta: password hash.'
  },
  {
    'identifier': '164',
    'text': 'Ryan Mehta: Look like a good enough user email password. We could add more stuff here like first name or profile image, any of those other things here. If we wanted those types of things in our application.'
  },
  {
    'identifier': '165',
    'text': 'Ryan Mehta: Look good'
  },
  {
    'identifier': '166',
    'text': 'Ryan Mehta: Okay.'
  },
  {
    'identifier': '167',
    'text': 'Ryan Mehta: So let\'s make our way to our models, then'
  },
  {
    'identifier': '168',
    'text': 'Ryan Mehta: We\'re going to make the user'
  },
  {
    'identifier': '169',
    'text': 'Ryan Mehta: User JS model.'
  },
  {
    'identifier': '170',
    'text': 'Ryan Mehta: This is going to be a class.'
  },
  {
    'identifier': '171',
    'text': 'Ryan Mehta: Called user'
  },
  {
    'identifier': '172',
    'text': 'Ryan Mehta: Our user has an ID an email and a password hash.'
  },
  {
    'identifier': '173',
    'text': 'Ryan Mehta: Or make a constructor, which will take a row will set ID to row ID will set email.'
  },
  {
    'identifier': '174',
    'text': 'Ryan Mehta: To grow email and then we\'ll set password hash to throw dot password underscore hash we\'re translating the sequel row into our JavaScript.'
  },
  {
    'identifier': '175',
    'text': 'Ryan Mehta: Style camel casing.'
  },
  {
    'identifier': '176',
    'text': 'Ryan Mehta: And then the first thing that we want to be able to do is insert a user. So we\'ll create a static a sink insert'
  },
  {
    'identifier': '177',
    'text': 'Ryan Mehta: method that takes a user'
  },
  {
    'identifier': '178',
    'text': 'Ryan Mehta: You will get a row back from calling query.'
  },
  {
    'identifier': '179',
    'text': 'Ryan Mehta: We\'re going to Insert into Users'
  },
  {
    'identifier': '180',
    'text': 'losers.'
  },
  {
    'identifier': '181',
    'text': 'Ryan Mehta: Email the password.'
  },
  {
    'identifier': '182',
    'text': 'Ryan Mehta: So,'
  },
  {
    'identifier': '183',
    'text': 'Ryan Mehta: We\'re not going to use the crypt here. We\'re going to stay that first service. So in our model, we\'re just going to be responsible for inserting stuff are not responsible for any be scripting or J WT stuff in this file.'
  },
  {
    'identifier': '184',
    'text': 'Ryan Mehta: And then we\'ll return a new user'
  },
  {
    'identifier': '185',
    'text': 'Ryan Mehta: With the rose zero'
  },
  {
    'identifier': '186',
    'text': 'Ron Yonker: semi colon on the end of long six'
  },
  {
    'identifier': '187',
    'text': 'Six.'
  },
  {
    'identifier': '188',
    'text': 'Ron Yonker: Better. Sorry, that was bothered me.'
  },
  {
    'identifier': '189',
    'text': 'Ryan Mehta: This insert look good to everyone.'
  },
  {
    'identifier': '190',
    'text': 'Ryan Mehta: Okay, so we have a way to insert new users.'
  },
  {
    'identifier': '191',
    'text': 'Ryan Mehta: But we want to do a little bit more than just inserting the users. We also want to be able to hash their password.'
  },
  {
    'identifier': '192',
    'text': 'Ryan Mehta: To do that we\'re going to use the crypt, which is a hashing algorithm that will take plain text and create a hash for us. So in live. I\'m going to create a services directory and they users for this.js file.'
  },
  {
    'identifier': '193',
    'text': 'Ryan Mehta: And then this is where we\'re going to put all of our little user services that we want to'
  },
  {
    'identifier': '194',
    'text': 'Ryan Mehta: Create the first one that we want to create is a create'
  },
  {
    'identifier': '195',
    'text': 'Ryan Mehta: Just call it a create'
  },
  {
    'identifier': '196',
    'text': 'Ryan Mehta: Service or maybe a sign up'
  },
  {
    'identifier': '197',
    'text': 'Ryan Mehta: Sign up service. The signup service is going to take a user\'s email and a user\'s password and eventually it\'s going to call the user dot insert method that we created in our model file. Makes sense so far.'
  },
  {
    'identifier': '198',
    'text': 'Ryan Mehta: Before we can call this though, we need to create a password.'
  },
  {
    'identifier': '199',
    'text': 'Ryan Mehta: Cash'
  },
  {
    'identifier': '200',
    'text': 'Ryan Mehta: Right, we need to somehow past the user\'s password to do that we\'re going to use be crypt JS, which I need to install. So I\'m going to MPM ID crypt JS.'
  },
  {
    'identifier': '201',
    'text': 'Ryan Mehta: And then at the top of this file. I am going to'
  },
  {
    'identifier': '202',
    'text': 'Ryan Mehta: Be Chris'
  },
  {
    'identifier': '203',
    'text': 'Ryan Mehta: Our password hash.'
  },
  {
    'identifier': '204',
    'text': 'Ryan Mehta: I think we give it the number four ounce. Right. It\'s a 14 for now.'
  },
  {
    'identifier': '205',
    'text': 'Ryan Mehta: Let\'s make this an object.'
  },
  {
    'identifier': '206',
    'text': 'Be'
  },
  {
    'identifier': '207',
    'text': 'Ryan Mehta: I wasn\'t gonna write any tests today but I totally could'
  },
  {
    'identifier': '208',
    'text': 'Annalise: I was gonna say, if you were to change that hashtag for'
  },
  {
    'identifier': '209',
    'text': 'Ryan Mehta: Yeah, we should we should probably make an environment variable for this thing, right. So, that way in our tests, we can make it faster and in production. We can make it slower.'
  },
  {
    'identifier': '210',
    'text': 'Ryan Mehta: Convert it to a number'
  },
  {
    'identifier': '211',
    'text': 'Ryan Mehta: All right, does this look good, everyone. We first hash our password. And then we insert our user'
  },
  {
    'identifier': '212',
    'text': 'Ryan Mehta: Good.'
  },
  {
    'identifier': '213',
    'text': 'Ryan Mehta: I\'m going to change this to a sync function and instead of using the hash think I am going to use regular hash and await it in the ideas what the differences are between these two.'
  },
  {
    'identifier': '214',
    'text': 'Ryan Mehta: Between this and this.'
  },
  {
    'identifier': '215',
    'text': 'Ben Waples: Is hash thing.'
  },
  {
    'identifier': '216',
    'text': 'Jerud Moyer: I was just wondering if Hash. Hash thing, something provided by be crips as a way to'
  },
  {
    'identifier': '217',
    'text': 'Jerud Moyer: Give you time'
  },
  {
    'identifier': '218',
    'text': 'Jerud Moyer: From'
  },
  {
    'identifier': '219',
    'text': 'Jerud Moyer: Needed rain.'
  },
  {
    'identifier': '220',
    'text': 'Ryan Mehta: I was needed be be correct. Yeah, the hashtag is provided by the crypt, and it does have to do with'
  },
  {
    'identifier': '221',
    'text': 'Ryan Mehta: Timing. That\'s true.'
  },
  {
    'identifier': '222',
    'text': 'Ryan Mehta: If we look at hash think remember the event loop. Are you checking it against like making sure'
  },
  {
    'identifier': '223',
    'text': 'Annalise: Like they can\'t create the hash unless the email and password are placed is that one.'
  },
  {
    'identifier': '224',
    'text': 'Ryan Mehta: Hash think'
  },
  {
    'identifier': '225',
    'text': 'Ryan Mehta: Yeah so sinks in this case stands for synchronous. So we have either has sync synchronous or without the sink. It\'s'
  },
  {
    'identifier': '226',
    'text': 'Ryan Mehta: Going to do it asynchronously.'
  },
  {
    'identifier': '227',
    'text': 'Ryan Mehta: If we do it synchronously. It\'s going to block the event loop.'
  },
  {
    'identifier': '228',
    'text': 'Ryan Mehta: So if we do it synchronously. No other passwords will be able to be hashed no other users will be able to make a request for application until the hashes created'
  },
  {
    'identifier': '229',
    'text': 'Ryan Mehta: So let\'s say it takes one second to create the be crypt Tash during that one second. No other user is able to use our application.'
  },
  {
    'identifier': '230',
    'text': 'Ryan Mehta: They\'ll start forming a line.'
  },
  {
    'identifier': '231',
    'text': 'Ryan Mehta: In JavaScript. We\'re only allowed to do one thing at a time.'
  },
  {
    'identifier': '232',
    'text': 'Ryan Mehta: Since this hashtag could take some time and we want it to take some time, if we use the sink version, it means that only one person will be able to use'
  },
  {
    'identifier': '233',
    'text': 'Ryan Mehta: Our application, only the person being currently hashed will be able to be using our application during that one second. Everybody else will just be waiting'
  },
  {
    'identifier': '234',
    'text': 'Ryan Mehta: It\'s not terribly bad if we just have one user creating it.'
  },
  {
    'identifier': '600',
    'text': 'Ryan Mehta: Patch.'
  },
  {
    'identifier': '235',
    'text': 'Ryan Mehta: Like signing up every few days but if we have 1000 users signing up every minute that\'s 1000 seconds that other people have to wait while people are creating passwords, which is more than a minute. So it sounds like will continually backup, right, we won\'t be able to scale very well.'
  },
  {
    'identifier': '236',
    'text': 'Ryan Mehta: If we use the regular hash.'
  },
  {
    'identifier': '237',
    'text': 'Ryan Mehta: Instead of blocking the event loop.'
  },
  {
    'identifier': '238',
    'text': 'Ryan Mehta: Node will tell somebody else to go, and hash the password and let it know when the hashing is done and it will continue to process other requests, while the hashing is being done by somebody else.'
  },
  {
    'identifier': '239',
    'text': 'Ryan Mehta: So hash think makes node have to do this work, you can kind of use this as a mental model makes node have to do this work and notebook node can\'t process any other incoming requests while it\'s running line five'
  },
  {
    'identifier': '240',
    'text': 'Ryan Mehta: But if you use the normal hash.'
  },
  {
    'identifier': '241',
    'text': 'Ryan Mehta: Node is going to go and do other things while it\'s a waiting for this password to be hashed'
  },
  {
    'identifier': '242',
    'text': 'Ryan Mehta: And so it can process other user request during the time that it takes to hash this password. The password hashes and to be done by somebody else.'
  },
  {
    'identifier': '243',
    'text': 'Ryan Mehta: To use like a cooking analogy, I guess.'
  },
  {
    'identifier': '244',
    'text': 'Ryan Mehta: If we use hash sync.'
  },
  {
    'identifier': '245',
    'text': 'Ryan Mehta: We\'re making it a synchronous tasks. So if we were like microwaving'
  },
  {
    'identifier': '246',
    'text': 'Some food in a microwave. Oh, no.'
  },
  {
    'identifier': '247',
    'text': 'Ryan Mehta: It\'s kind of looks like a microwave hash sink would mean that you sit here and look at the microwave while it\'s doing its work.'
  },
  {
    'identifier': '248',
    'text': 'Ryan Mehta: The hash one you would have the same microwave'
  },
  {
    'identifier': '249',
    'text': 'Ryan Mehta: But while you\'re microwaving stuff you like walk over and I don\'t know watch TV or something.'
  },
  {
    'identifier': '250',
    'text': 'Ryan Mehta: You do something else.'
  },
  {
    'identifier': '251',
    'text': 'Ryan Mehta: This way. Seems like nobody would really do it this way.'
  },
  {
    'identifier': '252',
    'text': 'Ryan Mehta: This way. Seems like how everybody actually behaves. We want JavaScript and behave like this. Also, especially since it\'s busy. It\'s probably not watching TV, it\'s going and helping some other user. It\'s like JavaScript has a line of microwaves. This is good. It has like 20 microwaves.'
  },
  {
    'identifier': '253',
    'text': 'Ryan Mehta: And you can have JavaScript either microwave something and wait at the single microwave or you can have a gold. Move on to the next microwave as other requests come in by using this regular hash you allow JavaScript to use all of its microwaves.'
  },
  {
    'identifier': '254',
    'text': 'Ryan Mehta: Team. Okay.'
  },
  {
    'identifier': '255',
    'text': 'Ron Yonker: Well tracking your calling the side processes microwaves.'
  },
  {
    'identifier': '256',
    'text': 'Right, yeah.'
  },
  {
    'identifier': '257',
    'text': 'Ryan Mehta: Yeah, totally.'
  },
  {
    'identifier': '258',
    'text': 'Ryan Mehta: I had an interview question once somebody asked me to design a microwave in the area.'
  },
  {
    'identifier': '259',
    'text': 'Ryan Mehta: Yeah.'
  },
  {
    'identifier': '260',
    'text': 'Brooke Perkins (she/her): Are we gonna need to be able to do that.'
  },
  {
    'identifier': '261',
    'text': 'Ryan Mehta: I don\'t know.'
  },
  {
    'identifier': '262',
    'text': 'Josh Olloqui: Well, I mean, microwaves have Alexa now so'
  },
  {
    'identifier': '263',
    'text': 'Brooke Perkins (she/her): That is frightening.'
  },
  {
    'identifier': '264',
    'text': 'Ryan Mehta: Or you don\'t have to know the internal'
  },
  {
    'identifier': '265',
    'text': 'Ryan Mehta: Those like how would you lay out the buttons like for people. Yeah. Alright, so here\'s our little user service, we can use it to sign up and create our password hash. From here we can start using this inside of our controller. Let\'s make a controllers to F3.'
  },
  {
    'identifier': '266',
    'text': 'Ryan Mehta: Scaffold this out a bit.'
  },
  {
    'identifier': '267',
    'text': 'Ryan Mehta: So it\'s gonna be post to sign up'
  },
  {
    'identifier': '268',
    'text': 'First response next'
  },
  {
    'identifier': '269',
    'text': 'Ryan Mehta: All right before we forget we should also go to app JS and add this thing here.'
  },
  {
    'identifier': '270',
    'text': 'So API V1.'
  },
  {
    'identifier': '271',
    'text': 'Ryan Mehta: And we will bring in our off controller.'
  },
  {
    'identifier': '272',
    'text': 'Ryan Mehta: Also, before I forget, I\'m going to end PM I Corps, so we don\'t run into any issues when we go and set this up.'
  },
  {
    'identifier': '273',
    'text': 'On our friends.'
  },
  {
    'identifier': '274',
    'text': 'Ryan Mehta: So I\'m going to add course here. I\'m also going to add course takes a few configuration options that we\'re going to want to use here.'
  },
  {
    'identifier': '275',
    'text': 'Ryan Mehta: We\'re going to want to set origin to true and credentials to true.'
  },
  {
    'identifier': '276',
    'text': 'Ryan Mehta: It\'s credentials to true thing means that will accept cookies from the front end, which will need because we\'re going to store our that our users currently logged in and a cookie. So this allows us to store like Accept cookies. The, of course.'
  },
  {
    'identifier': '277',
    'text': 'Ryan Mehta: Alright. So back to our controller. Let\'s split our controller and our service outside by side we\'re going to use this sign up and our controller. I\'m going to import'
  },
  {
    'identifier': '278',
    'text': 'Users for this.'
  },
  {
    'identifier': '279',
    'text': 'Ryan Mehta: Fire'
  },
  {
    'identifier': '280',
    'text': 'Ryan Mehta: Services or service and then we will use'
  },
  {
    'identifier': '281',
    'text': 'Your service.'
  },
  {
    'identifier': '282',
    'text': 'Ryan Mehta: Sign up'
  },
  {
    'identifier': '283',
    'text': 'Ryan Mehta: The user service takes an object with email and password. We\'re expecting the front end to give us back an object with email and password in the body. So I can send it wrecked up body and then we\'re going to get back the user who just signed up.'
  },
  {
    'identifier': '284',
    'text': 'Make sense'
  },
  {
    'identifier': '285',
    'text': 'Ryan Mehta: So use this service, it will automatically hash our password for us and insert the user after we get back that user who just signed up. We want to create a j WT right the J WT is that wristband that allows us to track that the user signed up across multiple requests.'
  },
  {
    'identifier': '286',
    'text': 'Ryan Mehta: And kind of remember this J WT thing.'
  },
  {
    'identifier': '287',
    'text': 'Okay.'
  },
  {
    'identifier': '288',
    'text': 'Ryan Mehta: So let\'s create another service over here called off token.'
  },
  {
    'identifier': '289',
    'text': 'Ryan Mehta: That will be a function'
  },
  {
    'identifier': '290',
    'text': 'Ryan Mehta: That takes a user'
  },
  {
    'identifier': '291',
    'text': 'Ryan Mehta: And create a j WT off token for this user'
  },
  {
    'identifier': '292',
    'text': 'Ryan Mehta: To create a j WT we\'re going to need to install JSON web JSON web token.'
  },
  {
    'identifier': '293',
    'text': 'Ryan Mehta: Which is library that will let us create web tokens JSON web tokens.'
  },
  {
    'identifier': '294',
    'text': 'Ryan Mehta: What\'s important appear at the top.'
  },
  {
    'identifier': '295',
    'text': 'Ryan Mehta: And then down here will construct our token by using J WT sign it\'s expecting us to give it an object.'
  },
  {
    'identifier': '296',
    'text': 'Ryan Mehta: Will give it an object inside of the object will say payload is going to be the user that we want to store in the token. So is our user. And then we also are supposed to give it a secret which will store in our end file.'
  },
  {
    'identifier': '297',
    'text': 'Ryan Mehta: Let\'s make sure that we actually add that to our in the file.'
  },
  {
    'identifier': '298',
    'text': 'Ryan Mehta: So we'
  },
  {
    'identifier': '299',
    'text': 'Ryan Mehta: In our development environment. It doesn\'t matter what we put here, I\'m just going to put secret. We also have salt rounds that we need'
  },
  {
    'identifier': '300',
    'text': 'For'
  },
  {
    'identifier': '301',
    'text': 'Ryan Mehta: In production, you\'re going to change this to something secret during test phase. It doesn\'t matter what this is. Because it\'s not going to be the same value that you use in your production application. It\'s just something fake'
  },
  {
    'identifier': '302',
    'text': 'Alright.'
  },
  {
    'identifier': '303',
    'text': 'Ryan Mehta: Are envious setup.'
  },
  {
    'identifier': '304',
    'text': 'Ryan Mehta: This look good so far.'
  },
  {
    'identifier': '305',
    'text': 'Ryan Mehta: Good.'
  },
  {
    'identifier': '306',
    'text': 'Ron Yonker: So what\'s the sign on the JavaScript.'
  },
  {
    'identifier': '307',
    'text': 'Ryan Mehta: Is created Jake WT for us. This is what output such a WT'
  },
  {
    'identifier': '308',
    'text': 'Ron Yonker: Oh, okay. All right.'
  },
  {
    'identifier': '309',
    'text': 'Ron Yonker: Let\'s off.'
  },
  {
    'identifier': '310',
    'text': 'Here.'
  },
  {
    'identifier': '311',
    'text': 'Ryan Mehta: And then now on the right hand side, we can create our token with user service off token.'
  },
  {
    'identifier': '312',
    'text': 'Ryan Mehta: Pass it to the user. And then we can store a cookie.'
  },
  {
    'identifier': '313',
    'text': 'Ryan Mehta: Will call it session, and then we\'ll give it some options like max age I think isn\'t working.'
  },
  {
    'identifier': '314',
    'text': 'Ryan Mehta: Then we give it the value and then some options like max age we want it to be, I don\'t know 24 hours.'
  },
  {
    'identifier': '315',
    'text': 'Ryan Mehta: So that would be one second times, that\'s a minute. An hour 24 hours.'
  },
  {
    'identifier': '316',
    'text': 'Ryan Mehta: We also want it to be six here.'
  },
  {
    'identifier': '317',
    'text': 'Ryan Mehta: We want it to be over HTTP only and we want the same site to be'
  },
  {
    'identifier': '318',
    'text': 'Ryan Mehta: So construct the cookie. And then finally,'
  },
  {
    'identifier': '319',
    'text': 'Ryan Mehta: Our user'
  },
  {
    'identifier': '320',
    'text': 'Ryan Mehta: If there are any errors will catch that error.'
  },
  {
    'identifier': '321',
    'text': 'Pass it to max.'
  },
  {
    'identifier': '322',
    'text': 'Ryan Mehta: How does this look we\'re missing a few things. But how does it look overall'
  },
  {
    'identifier': '323',
    'text': 'Ryan Mehta: So we construct our token we store the token in a cookie as part of the responses is like attaching the wristband to the user.'
  },
  {
    'identifier': '367',
    'text': 'Ryan Mehta: But let\'s let\'s spin this back end up'
  },
  {
    'identifier': '324',
    'text': 'Ryan Mehta: In this case the user is the browser. So we attach a wristband called session to the user that will expire in 24 hours. So after 24 hours the wristband goes away.'
  },
  {
    'identifier': '325',
    'text': 'Ryan Mehta: Secure here means that they can only make requests to our service over HTTPS.'
  },
  {
    'identifier': '326',
    'text': 'Ryan Mehta: That they have to be on the same side like they don\'t have to be on the same site so we can have one on one on roku.'
  },
  {
    'identifier': '327',
    'text': 'Ryan Mehta: And it\'s only over HTTP, which means a JavaScript can\'t read the cookie on the front end, only the browser will be able to interact with the cookie. This is important.'
  },
  {
    'identifier': '328',
    'text': 'Ryan Mehta: For security reasons, you don\'t want your JavaScript front end to be able to read the cookie and send it to another site. For example, you only want the browser to be able to handle the cookies.'
  },
  {
    'identifier': '329',
    'text': 'Ryan Mehta: Look good so far.'
  },
  {
    'identifier': '330',
    'text': 'Ron Yonker: Yeah, but I\'m a little bit confused. Like how is HTTP only only permitting the browser to read the cookie and have access to it.'
  },
  {
    'identifier': '331',
    'text': 'Ryan Mehta: It\'s a property on the cookie. So if the browser sees that you have HTTP only here, it won\'t make the cookie available to JavaScript on the front end.'
  },
  {
    'identifier': '332',
    'text': 'Ron Yonker: Okay, got it.'
  },
  {
    'identifier': '333',
    'text': 'Alright.'
  },
  {
    'identifier': '334',
    'text': 'Ryan Mehta: So a few things that we should do on the left hand side for this off token piece. We can also give this an options object and we can give it an expires. And so since the cookie over here expires in 24 hours will also make the J WT expire in 24 hours.'
  },
  {
    'identifier': '335',
    'text': 'Ryan Mehta: Partly good'
  },
  {
    'identifier': '336',
    'text': 'Ryan Mehta: There\'s other one other really big piece to this when we send the user online 16 we do not want to send the password hash. We only want to send the ID and the email of the of the user and nothing else.'
  },
  {
    'identifier': '337',
    'text': 'Ryan Mehta: If you had other properties. You might send other things. But we definitely do not want to send the password hash along online 16'
  },
  {
    'identifier': '338',
    'text': 'Ryan Mehta: By default, express whenever you do raise'
  },
  {
    'identifier': '339',
    'text': 'Ryan Mehta: Send.'
  },
  {
    'identifier': '340',
    'text': 'Ryan Mehta: Or red dot JSON.'
  },
  {
    'identifier': '341',
    'text': 'Ryan Mehta: It will automatically call a to JSON method on on this object here.'
  },
  {
    'identifier': '342',
    'text': 'Ryan Mehta: So if we want to change what happens, and we call a red dots and here we can create a to JSON method on our user class and strip away the password hash. So back on our user class, we can create a to JSON method.'
  },
  {
    'identifier': '343',
    'text': 'Ryan Mehta: On our to JSON method, we are going to'
  },
  {
    'identifier': '344',
    'text': 'Ryan Mehta: construct our'
  },
  {
    'identifier': '345',
    'text': 'Ryan Mehta: Object will make a clone of it and then we will delete objects task hash.'
  },
  {
    'identifier': '346',
    'text': 'The object.'
  },
  {
    'identifier': '347',
    'text': 'Ryan Mehta: How does this to JSON thing look'
  },
  {
    'identifier': '348',
    'text': 'Ryan Mehta: Look, okay.'
  },
  {
    'identifier': '349',
    'text': 'Ryan Mehta: All right, so we\'re just stripping away the password hash, pretty much.'
  },
  {
    'identifier': '350',
    'text': 'Ron Yonker: All that as a method on user and off.'
  },
  {
    'identifier': '351',
    'text': 'Ryan Mehta: Yeah, this is a method on user'
  },
  {
    'identifier': '352',
    'text': 'Ryan Mehta: So now when we send the user over here. It\'s not going to have the password hash on it.'
  },
  {
    'identifier': '353',
    'text': 'Ryan Mehta: And express unexpressed is calling this forest by default.'
  },
  {
    'identifier': '354',
    'text': 'Ryan Mehta: Despite itself automatically'
  },
  {
    'identifier': '355',
    'text': 'Ryan Mehta: The good'
  },
  {
    'identifier': '356',
    'text': 'Ron Yonker: Well, I\'m sorry. Wait, so'
  },
  {
    'identifier': '357',
    'text': 'Ron Yonker: Are you overriding the two JSON method that\'s automatically being called and. Is that how it\'s doing automatically'
  },
  {
    'identifier': '358',
    'text': 'Ryan Mehta: Express always tries to call this method. Whenever you read send something'
  },
  {
    'identifier': '359',
    'text': 'Ryan Mehta: Huh, yeah.'
  },
  {
    'identifier': '360',
    'text': 'Ron Yonker: So you\'re just overriding the default like just making it strip off the password.'
  },
  {
    'identifier': '361',
    'text': 'Ryan Mehta: Yeah, it\'s not technically overwritten because classes. By default, don\'t have this but express always checks to see if the object has this method on it and if it does it cause it'
  },
  {
    'identifier': '362',
    'text': 'Ryan Mehta: If it never calls it'
  },
  {
    'identifier': '363',
    'text': 'Okay.'
  },
  {
    'identifier': '364',
    'text': 'Ryan Mehta: All right, I\'m going to use this to Jay something. And one more place backward and we create our token. I\'m also going to call this to JSON.'
  },
  {
    'identifier': '365',
    'text': 'Ryan Mehta: Methods here our payload should just include the users ID and email, not the users ID email and password hash.'
  },
  {
    'identifier': '366',
    'text': 'Ryan Mehta: Look. Okay, let\'s see how it looks. We can actually try it both ways and see what the token looks like in both cases.'
  },
  {
    'identifier': '368',
    'text': 'Ryan Mehta: And try that. That\'s all that we need for this sign up route.'
  },
  {
    'identifier': '369',
    'text': 'Ryan Mehta: Let\'s try to actually sign a user up and see what happens when we go to this route.'
  },
  {
    'identifier': '370',
    'text': 'So good.'
  },
  {
    'identifier': '371',
    'text': 'Ryan Mehta: Alright, so back on the front end, we said that we wanted to go to that route in this function. To do that, we\'re going to construct a service.'
  },
  {
    'identifier': '372',
    'text': 'Ryan Mehta: We\'ll call this one off.'
  },
  {
    'identifier': '373',
    'text': 'Ryan Mehta: And then here we are going to make a request. So we\'re going to export.'
  },
  {
    'identifier': '374',
    'text': 'Ryan Mehta: Post sign up is going to take a user\'s email and their password. It\'s going to make a fetch request to our word local host right now.'
  },
  {
    'identifier': '375',
    'text': 'Ryan Mehta: That API V1.'
  },
  {
    'identifier': '376',
    'text': 'Ryan Mehta: And then it\'s going to be take house method.'
  },
  {
    'identifier': '377',
    'text': 'Ryan Mehta: Headers. We want to make sure that we have content.'
  },
  {
    'identifier': '378',
    'text': 'Ryan Mehta: Creation JSON.'
  },
  {
    'identifier': '379',
    'text': 'Ryan Mehta: We\'re also going to have this thing called credentials include this makes sense. So we\'re sending along cookies and accepting cookies as we\'re making the fetch requests to when I always include all of our credential cookies.'
  },
  {
    'identifier': '380',
    'text': 'Ryan Mehta: Will have a body which will be a string of five version of email and password stuck into an object.'
  },
  {
    'identifier': '381',
    'text': 'Ryan Mehta: And then we\'ll get a response.'
  },
  {
    'identifier': '382',
    'text': 'Ryan Mehta: If'
  },
  {
    'identifier': '383',
    'text': 'Ryan Mehta: If it\'s not okay. Then we\'re going to return.'
  },
  {
    'identifier': '384',
    'text': 'Ryan Mehta: To all my different make this a single week and said, I kind of prefer that right now.'
  },
  {
    'identifier': '385',
    'text': 'Ryan Mehta: I think everything will look pretty much the same. Up until this point.'
  },
  {
    'identifier': '386',
    'text': 'Ryan Mehta: So we\'ll get our JSON.'
  },
  {
    'identifier': '387',
    'text': 'Ryan Mehta: And then we\'ll say'
  },
  {
    'identifier': '388',
    'text': 'Ryan Mehta: Okay, we\'ll throw the JSON.'
  },
  {
    'identifier': '389',
    'text': 'Ryan Mehta: Sign up the post request, we\'re sending JSON, including credentials, which means including the cookies that we have received and keep any cookies that we get back'
  },
  {
    'identifier': '390',
    'text': 'Ryan Mehta: And we\'re going to send an email and password.'
  },
  {
    'identifier': '391',
    'text': 'Ryan Mehta: We\'re going to parse the JSON, if the if the responses and okay, we\'re going to throw an error. Otherwise, we\'re going to return the JSON.'
  },
  {
    'identifier': '392',
    'text': 'Ryan Mehta: In our signup route over here on the left, we\'re going to use this post sign up. We\'ll pass it an email and a password. And for now let\'s just dot ven and console log off of it.'
  },
  {
    'identifier': '393',
    'text': 'Ryan Mehta: See what happens when we'
  },
  {
    'identifier': '394',
    'text': 'Ryan Mehta: When we try this.'
  },
  {
    'identifier': '395',
    'text': 'Ryan Mehta: Look good'
  },
  {
    'identifier': '396',
    'text': 'Ryan Mehta: So here\'s what we\'re connecting the back end. And for and when we click on our button. This function is going to be invoked. So if I put in an email.'
  },
  {
    'identifier': '397',
    'text': 'Ryan Mehta: Test that tests calm and password. Let\'s go to the Network tab and make sure that we\'re actually going to make a request the press, sign up. We kept 500 let\'s check that out.'
  },
  {
    'identifier': '398',
    'text': 'Ryan Mehta: Okay.'
  },
  {
    'identifier': '399',
    'text': 'Ryan Mehta: So we get an error message user service dot sign up is not a function'
  },
  {
    'identifier': '400',
    'text': 'Ryan Mehta: Let\'s go and check that out on the back end. It\'s a user service stop sign up here is not a function'
  },
  {
    'identifier': '401',
    'text': 'Ryan Mehta: It\'s because i mean i i see there\'s a typo over here. Anybody else see it.'
  },
  {
    'identifier': '402',
    'text': 'Ben Waples: Is supposed to be an expert.'
  },
  {
    'identifier': '403',
    'text': 'Ryan Mehta: Yeah, exactly. For missing an s right here module exports.'
  },
  {
    'identifier': '404',
    'text': 'Ryan Mehta: Let\'s try this again. Alright. Sign up 500 Cannot read property zero of undefined.'
  },
  {
    'identifier': '405',
    'text': 'Ryan Mehta: That one.'
  },
  {
    'identifier': '406',
    'text': 'Ryan Mehta: Property zero of undefined. Okay.'
  },
  {
    'identifier': '407',
    'text': 'Up star.'
  },
  {
    'identifier': '408',
    'text': 'Ryan Mehta: That\'s it. Yeah, that\'s what I would guess to I was pretty sure that I did.'
  },
  {
    'identifier': '409',
    'text': 'Ben Waples: Yeah.'
  },
  {
    'identifier': '410',
    'text': 'I turning star.'
  },
  {
    'identifier': '411',
    'text': 'Ben Waples: You\'re missing. I\'m gonna wait on line 15'
  },
  {
    'identifier': '412',
    'text': 'Ryan Mehta: Nice.'
  },
  {
    'identifier': '413',
    'text': 'Ryan Mehta: There\'s this error to'
  },
  {
    'identifier': '414',
    'text': 'Ryan Mehta: Everybody know this one.'
  },
  {
    'identifier': '415',
    'text': 'Jerud Moyer: Favorite'
  },
  {
    'identifier': '416',
    'text': 'Thomas Stussi: I got stuck on that for three and a half hours last night.'
  },
  {
    'identifier': '417',
    'text': 'Ryan Mehta: I get it all this one.'
  },
  {
    'identifier': '418',
    'text': 'Ryan Mehta: That means my'
  },
  {
    'identifier': '419',
    'text': 'Ryan Mehta: My Postgres isn\'t running'
  },
  {
    'identifier': '420',
    'text': 'Ryan Mehta: So let me start Postgres.'
  },
  {
    'identifier': '421',
    'text': 'Ryan Mehta: And'
  },
  {
    'identifier': '422',
    'text': 'Ryan Mehta: Now that Postgres is running. Let\'s start this that\'s'
  },
  {
    'identifier': '423',
    'text': 'Ryan Mehta: Clear this sign up again. Okay. Users does not exist. How do we fix that one.'
  },
  {
    'identifier': '424',
    'text': 'Ryan Mehta: We have any good ideas.'
  },
  {
    'identifier': '425',
    'text': 'Ryan Mehta: I\'m going to open up PG admin.'
  },
  {
    'identifier': '426',
    'text': 'Ryan Mehta: And run our setup sequel, we have, we don\'t have our tables created yet.'
  },
  {
    'identifier': '427',
    'text': 'Ryan Mehta: So we\'re in here, let me connect it to my local'
  },
  {
    'identifier': '428',
    'text': 'Ryan Mehta: Postgres.'
  },
  {
    'identifier': '429',
    'text': 'Ryan Mehta: Let\'s grab our setup sequel.'
  },
  {
    'identifier': '430',
    'text': 'Ryan Mehta: And just drop it into here and run it, that\'ll create our tables for us.'
  },
  {
    'identifier': '431',
    'text': 'Ryan Mehta: And now with some luck.'
  },
  {
    'identifier': '432',
    'text': 'Ryan Mehta: Everything will work just perfect. Can I move this tab right here.'
  },
  {
    'identifier': '433',
    'text': 'Ryan Mehta: All right, let\'s clear this again. Let\'s try again 200. That seems pretty promising. There\'s our users. So we\'re able to sign up now a'
  },
  {
    'identifier': '434',
    'text': 'Ryan Mehta: Little bit of bug fixing. Little bit of air fixing. But now we\'re able to sign up for check out our application cookies.'
  },
  {
    'identifier': '435',
    'text': 'Ryan Mehta: We should hopefully well we don\'t. That\'s no good. We have no cookie yet.'
  },
  {
    'identifier': '436',
    'text': 'Ryan Mehta: Which is troublesome.'
  },
  {
    'identifier': '437',
    'text': 'Ryan Mehta: Let\'s go back to this network call'
  },
  {
    'identifier': '438',
    'text': 'Ryan Mehta: And see if we tried to get a cookie.'
  },
  {
    'identifier': '439',
    'text': 'Ryan Mehta: Yeah, check it out. We have this little yellow thing.'
  },
  {
    'identifier': '440',
    'text': 'Ryan Mehta: This set cookie was blocked because it had the secure attribute, but it was not received over a secure connection. Anybody have any ideas what that might mean'
  },
  {
    'identifier': '441',
    'text': 'Ryan Mehta: So when we put six here, here, it meant that we needed to use HTTPS. So it needs to be over HTTPS McAfee over normal HTTP. By default, the web pack applications that we use only use HTTP not HTTPS. There\'s they\'re not secure connections.'
  },
  {
    'identifier': '442',
    'text': 'Ryan Mehta: Anybody no way to fix this quickly, by any chance, anybody read anything on fixing this.'
  },
  {
    'identifier': '443',
    'text': 'Ryan Mehta: It\'s really nice because I believe the dev server allows us to do.'
  },
  {
    'identifier': '444',
    'text': 'That'
  },
  {
    'identifier': '445',
    'text': 'Ryan Mehta: If we restart web pack after putting HTTPS true on our dev server.'
  },
  {
    'identifier': '446',
    'text': 'Ryan Mehta: Be able to go back here and manually type in HTTPS colon slash slash localhost 7891 actually we scroll up here to you\'ll notice that this now says HTTPS instead of HTTP.'
  },
  {
    'identifier': '447',
    'text': 'Ryan Mehta: We go here. It will tell us that it\'s not secure how HTTPS works is there\'s central authorities that say like your HTTPS connection is valid.'
  },
  {
    'identifier': '448',
    'text': 'Ryan Mehta: We didn\'t pay money for this central authority to validate us, but we\'re pretty sure that we trust ourselves so we can proceed unsafely to this thing.'
  },
  {
    'identifier': '449',
    'text': 'Brooke Perkins (she/her): Is that secure like'
  },
  {
    'identifier': '450',
    'text': 'Brooke Perkins (she/her): That it. Where does it like that secure like that requirement for it to be secure come from. Is that from the browser.'
  },
  {
    'identifier': '451',
    'text': 'Ryan Mehta: That is from the back end.'
  },
  {
    'identifier': '452',
    'text': 'Brooke Perkins (she/her): Oh, secured true. Okay, thank you. Yeah.'
  },
  {
    'identifier': '453',
    'text': 'Ryan Mehta: So I can say only secure connections that will give this cookie to you.'
  },
  {
    'identifier': '454',
    'text': 'Brooke Perkins (she/her): But so if you wanted to be like, I don\'t want to deal with that you could just take that away right'
  },
  {
    'identifier': '455',
    'text': 'Ryan Mehta: Totally, yeah. Gotcha.'
  },
  {
    'identifier': '456',
    'text': 'Ryan Mehta: That\'s let\'s try making another user test one test.'
  },
  {
    'identifier': '457',
    'text': 'Ryan Mehta: Let\'s sign up, we get our two hundreds again free go and look at it.'
  },
  {
    'identifier': '458',
    'text': 'Ryan Mehta: Under headers, we still have a little thing.'
  },
  {
    'identifier': '459',
    'text': 'Ryan Mehta: I\'m so upset. Why would you take out my HTTPS.'
  },
  {
    'identifier': '460',
    'text': 'Ryan Mehta: Okay, well, that\'s kind of upsetting to me okay Breck I like your idea.'
  },
  {
    'identifier': '461',
    'text': 'Ryan Mehta: Let\'s get rid of this.'
  },
  {
    'identifier': '462',
    'text': 'Brooke Perkins (she/her): Let\'s just take it away.'
  },
  {
    'identifier': '463',
    'text': 'Brooke Perkins (she/her): That\'s not how I solve my debugging. Usually, I swear.'
  },
  {
    'identifier': '464',
    'text': 'Ryan Mehta: Let\'s see if that worked.'
  },
  {
    'identifier': '465',
    'text': 'Three.'
  },
  {
    'identifier': '466',
    'text': 'Ryan Mehta: If this works, then we can come up with a good way'
  },
  {
    'identifier': '467',
    'text': 'Ryan Mehta: See, now I think that it has to be secure because of the same site none.'
  },
  {
    'identifier': '468',
    'text': 'Ryan Mehta: So silly. How do we fix this.'
  },
  {
    'identifier': '469',
    'text': 'Ryan Mehta: I think we want that.'
  },
  {
    'identifier': '470',
    'text': 'Ryan Mehta: We want this to be HTTPS.'
  },
  {
    'identifier': '471',
    'text': 'Ryan Mehta: Oh,'
  },
  {
    'identifier': '472',
    'text': 'Ryan Mehta: I know'
  },
  {
    'identifier': '473',
    'text': 'Ryan Mehta: I just realized we put HTTPS at one place, but we never put it in the other place.'
  },
  {
    'identifier': '474',
    'text': 'Ryan Mehta: So back in our service.'
  },
  {
    'identifier': '475',
    'text': 'Ryan Mehta: Is'
  },
  {
    'identifier': '476',
    'text': 'Back over here.'
  },
  {
    'identifier': '477',
    'text': 'Ryan Mehta: This is to be HTTPS also'
  },
  {
    'identifier': '478',
    'text': 'Ryan Mehta: To continue to secure connection from front end back end. And now I forget which test to use around'
  },
  {
    'identifier': '479',
    'text': 'Ryan Mehta: Okay.'
  },
  {
    'identifier': '480',
    'text': 'Ryan Mehta: Let\'s make this sign up request.'
  },
  {
    'identifier': '481',
    'text': 'Ryan Mehta: totally failed.'
  },
  {
    'identifier': '482',
    'text': 'Ryan Mehta: Because the back end.'
  },
  {
    'identifier': '483',
    'text': 'Ryan Mehta: is stupid.'
  },
  {
    'identifier': '484',
    'text': 'Ryan Mehta: This is so annoying to me. How do we do this in dev'
  },
  {
    'identifier': '485',
    'text': 'Ryan Mehta: It\'s kind of annoying to me because this requirement is brand new. You all are the first cohort that have to experience this.'
  },
  {
    'identifier': '486',
    'text': 'Ryan Mehta: Same site issue.'
  },
  {
    'identifier': '487',
    'text': 'Ryan Mehta: And it\'s annoying to me right now. All right. Well, let\'s take a break and well I think of a good way around this thing for our dev environments. Anyways, let\'s come back at 1110'
  },
  {
    'identifier': '488',
    'text': 'Ron Yonker: Sounds good.'
  },
  {
    'identifier': '489',
    'text': 'Ron Yonker: Sounds good.'
  },
  {
    'identifier': '490',
    'text': 'Ryan Mehta: Um, so secure will only be enabled in production.'
  },
  {
    'identifier': '491',
    'text': 'Ryan Mehta: Node automatically sets these environment variables for us. So node and will be production when we actually deploy it to her Roku, it\'ll be devil, we have this in dev like when I\'m running it right now. It\'s a dev'
  },
  {
    'identifier': '492',
    'text': 'Ryan Mehta: And test. This will be test so secure will only be this will only be true in production will have same site none and production or lacks in development.'
  },
  {
    'identifier': '493',
    'text': 'Ryan Mehta: In this case, now we can'
  },
  {
    'identifier': '494',
    'text': 'Ryan Mehta: Up. Well, I\'ve given boy. If we sign up another user we sign up'
  },
  {
    'identifier': '495',
    'text': 'I\'ve already broken it and just a few seconds.'
  },
  {
    'identifier': '496',
    'text': '10'
  },
  {
    'identifier': '497',
    'text': 'Ryan Mehta: Okay we sign up our user, the cookie is good. Now, and we see our session cookie here in the browser.'
  },
  {
    'identifier': '498',
    'text': 'Ryan Mehta: So the fix was just to conditionally you sit here and same site.'
  },
  {
    'identifier': '499',
    'text': 'Ryan Mehta: But good'
  },
  {
    'identifier': '500',
    'text': 'Ryan Mehta: Okay, cool.'
  },
  {
    'identifier': '501',
    'text': 'Ryan Mehta: Next thing that we want to do is login. We want to make sure that a user can log into our site also. So let\'s start off on the front and again'
  },
  {
    'identifier': '502',
    'text': 'Ryan Mehta: We have our signup component'
  },
  {
    'identifier': '503',
    'text': 'Ryan Mehta: We\'re going to make another component called login that will be almost identical to the signup component except will call a login function instead of a signup function.'
  },
  {
    'identifier': '504',
    'text': 'Ryan Mehta: I\'m just going to duplicate these two components. I think you all should if you choose to have authentication on your final project, figure out a way to combine the signup component and the login component'
  },
  {
    'identifier': '505',
    'text': 'Ryan Mehta: I\'m going to copy these so you can see how similar they are'
  },
  {
    'identifier': '506',
    'text': 'Ryan Mehta: My copy. I\'m going to call login and I will change.'
  },
  {
    'identifier': '507',
    'text': 'Ryan Mehta: The component name to login'
  },
  {
    'identifier': '508',
    'text': 'Ryan Mehta: Again, and we\'ll just like step through this thing to see the stuff that we\'re going to change.'
  },
  {
    'identifier': '509',
    'text': 'Ryan Mehta: So instead of the button saying sign up the button, and I was going to say login'
  },
  {
    'identifier': '510',
    'text': 'Ryan Mehta: Instead of bringing in this signup function, we are in our off provider.'
  },
  {
    'identifier': '511',
    'text': 'Ryan Mehta: Going to construct a login function.'
  },
  {
    'identifier': '512',
    'text': 'Ryan Mehta: Which will also take an email and a password.'
  },
  {
    'identifier': '513',
    'text': 'Ryan Mehta: And will call sub login service that will create in a little bit.'
  },
  {
    'identifier': '514',
    'text': 'Ryan Mehta: So will export this login function or off stay also in our hooks.'
  },
  {
    'identifier': '515',
    'text': 'Ryan Mehta: Oops, that\'s our service in this hook. We\'re going to construct another book called us login'
  },
  {
    'identifier': '516',
    'text': 'Ryan Mehta: That will'
  },
  {
    'identifier': '517',
    'text': 'Ryan Mehta: The structure login off of our context.'
  },
  {
    'identifier': '518',
    'text': 'Ryan Mehta: And turn it'
  },
  {
    'identifier': '519',
    'text': 'Ryan Mehta: So then instead of using sign up here, we will use login, which we will get from our login'
  },
  {
    'identifier': '520',
    'text': 'Ryan Mehta: Instead,'
  },
  {
    'identifier': '521',
    'text': 'Ryan Mehta: And that\'s really the entirety of the differences between the two components. So, change the name change the service, change the function that would call here.'
  },
  {
    'identifier': '522',
    'text': 'Ryan Mehta: And change the button text. The rest of it all remains the same kind of see how silly it is to have two components that are almost identical. These for sure can be merged, but I\'ll let you all think about how to merge these two things in your own applications.'
  },
  {
    'identifier': '523',
    'text': 'Ron Yonker: You can just rename it like with a dynamic variable and do a ternary like a conditional render. Couldn\'t you'
  },
  {
    'identifier': '524',
    'text': 'Ryan Mehta: Could I get. I mean, you really want to change how this handled submit function works. Maybe it\'s by sending in a different sending in some props.'
  },
  {
    'identifier': '525',
    'text': 'Yeah.'
  },
  {
    'identifier': '526',
    'text': 'Ryan Mehta: Alright. So back in our off provider. We want to fill in our login. Here we\'re going to fill that in inside of, like, we\'re going to use a service that we construct over here.'
  },
  {
    'identifier': '527',
    'text': 'Ryan Mehta: Before we can construct the service. We need to have a backend route that does the login for us. So we\'re going to have to migrate our way on to the back end.'
  },
  {
    'identifier': '528',
    'text': 'Ryan Mehta: That\'s still the front end onto the back end and construct a login route in order to have a login route we are going to have to have some way to look up a user in our model.'
  },
  {
    'identifier': '529',
    'text': 'Ryan Mehta: So let\'s construct a'
  },
  {
    'identifier': '530',
    'text': 'Ryan Mehta: Another method here called find by email the brand is going to send us a user\'s email. We\'re going to take that email and we want to be able to find a user with that email. So we\'ll get some rows back'
  },
  {
    'identifier': '531',
    'text': 'Ryan Mehta: You\'re going to'
  },
  {
    'identifier': '532',
    'text': 'Ryan Mehta: Wait.'
  },
  {
    'identifier': '533',
    'text': 'Ryan Mehta: We\'re going to do a select star from users were'
  },
  {
    'identifier': '534',
    'text': 'Ryan Mehta: Equals dollar sign one'
  },
  {
    'identifier': '535',
    'text': 'Ryan Mehta: I will say if we don\'t have a rose zero will return know otherwise we\'ll return a new user with rose'
  },
  {
    'identifier': '536',
    'text': 'Ryan Mehta: So will attempt to find the user by their email.'
  },
  {
    'identifier': '537',
    'text': 'Good. Okay.'
  },
  {
    'identifier': '538',
    'text': 'Ryan Mehta: Back in our off controller.'
  },
  {
    'identifier': '539',
    'text': 'Ryan Mehta: We can now find a user by their email, but we also want to check that their password matches.'
  },
  {
    'identifier': '540',
    'text': 'Ryan Mehta: We\'re gonna so we\'re going to add another service that both finds a user by their email and checks her password like verify validates a password.'
  },
  {
    'identifier': '541',
    'text': 'Ryan Mehta: It\'s called this concept.'
  },
  {
    'identifier': '542',
    'text': 'Ryan Mehta: Author eyes.'
  },
  {
    'identifier': '543',
    'text': 'Ryan Mehta: And they could a sink. We\'re going to get past a user\'s email and they\'re clear text passwords.'
  },
  {
    'identifier': '544',
    'text': 'Ryan Mehta: First thing that we\'re going to do is find a user using our user model find by email with their email.'
  },
  {
    'identifier': '545',
    'text': 'Ryan Mehta: If we don\'t get a user back. So if we don\'t have a user'
  },
  {
    'identifier': '546',
    'text': 'Ryan Mehta: We\'re gonna throw a new error invalid.'
  },
  {
    'identifier': '547',
    'text': 'Ryan Mehta: Or password.'
  },
  {
    'identifier': '548',
    'text': 'Ryan Mehta: If we do have a user, then we\'re going to check their password so'
  },
  {
    'identifier': '549',
    'text': 'Ryan Mehta: Password.'
  },
  {
    'identifier': '550',
    'text': 'Ryan Mehta: We\'ll wait we\'re going to use the crypt compare recap be crypt compare takes their plain text password and the hash version of their password.'
  },
  {
    'identifier': '551',
    'text': 'Ryan Mehta: And lets us know if they match. If we don\'t have a valid password.'
  },
  {
    'identifier': '552',
    'text': 'Ryan Mehta: Then we will throw a new error.'
  },
  {
    'identifier': '553',
    'text': 'Ryan Mehta: Invalid'
  },
  {
    'identifier': '554',
    'text': 'Ryan Mehta: Password.'
  },
  {
    'identifier': '555',
    'text': 'Ryan Mehta: If we do find the user and the password is.'
  },
  {
    'identifier': '556',
    'text': 'Ryan Mehta: Valid. Then we\'ll return the user'
  },
  {
    'identifier': '557',
    'text': 'Let\'s make sure we export this'
  },
  {
    'identifier': '558',
    'text': 'Ryan Mehta: Look good'
  },
  {
    'identifier': '559',
    'text': 'Ryan Mehta: Find the user validate the password return the user'
  },
  {
    'identifier': '560',
    'text': 'Ryan Mehta: Cool.'
  },
  {
    'identifier': '561',
    'text': 'Ryan Mehta: All right, back in our controller will add another post route for login'
  },
  {
    'identifier': '562',
    'text': 'Ryan Mehta: This time we\'ll use our user service authorize'
  },
  {
    'identifier': '563',
    'text': 'Ryan Mehta: Will pass it through ref body which will have the user\'s email and they\'re clear text passwords will then get back a user. The user who just logged in.'
  },
  {
    'identifier': '564',
    'text': 'Ryan Mehta: And then we need to do the same exact thing that we did over here pretty much right we need to set a cookie get a token and then send the user'
  },
  {
    'identifier': '565',
    'text': 'Ryan Mehta: I\'m going to extract this logic here into its own function. So we don\'t have to repeat it over and over again. We\'ll call it set'
  },
  {
    'identifier': '566',
    'text': 'Ryan Mehta: session cookie set session cookie will take the rez object and the user'
  },
  {
    'identifier': '567',
    'text': 'Ryan Mehta: And do all of this stuff for us. So back in our signup we can refactor a little bit, you can say set session cookie.'
  },
  {
    'identifier': '568',
    'text': 'Ryan Mehta: User and over here we can set session cookie.'
  },
  {
    'identifier': '569',
    'text': 'User and'
  },
  {
    'identifier': '570',
    'text': 'Our user'
  },
  {
    'identifier': '571',
    'text': 'Ryan Mehta: If there\'s an error will catch the error and pass it to the next middleware.'
  },
  {
    'identifier': '572',
    'text': 'Ryan Mehta: Login route look okay'
  },
  {
    'identifier': '573',
    'text': 'Ryan Mehta: Okay, so we\'re validating that the user\'s email is good, their password is good if both things are good. We\'re setting the session cookie and sending the user back'
  },
  {
    'identifier': '574',
    'text': 'Ryan Mehta: Back on our front end. Now we are prepared to'
  },
  {
    'identifier': '575',
    'text': 'Ryan Mehta: Post login'
  },
  {
    'identifier': '576',
    'text': 'Ryan Mehta: Will do a sink. Also, we\'re going to receive an email and password.'
  },
  {
    'identifier': '577',
    'text': 'Ryan Mehta: And then we\'re going to do something very, very similar to what we did up above. In fact, they\'re almost going to be identical.'
  },
  {
    'identifier': '578',
    'text': 'Ryan Mehta: The only difference is going to be the word sign up or logged in. Right. Everything else about these two are exactly the same. So we could just copy this paste it down here and swap log in here.'
  },
  {
    'identifier': '579',
    'text': 'Ryan Mehta: If we did that, though. We\'ve duplicated a ton of code in the future when we realize that we don\'t actually want to use HTTP localhost. We want to use like an environment variable here or something, we\'re going to have to swap that in two places.'
  },
  {
    'identifier': '580',
    'text': 'Ryan Mehta: And said, I think this is a good time to start thinking about how we can standardize these requests, how we can make all of this logic available to multiple functions multiple requests.'
  },
  {
    'identifier': '581',
    'text': 'Ryan Mehta: What I\'m going to do is in my services. I\'m going to create a new file called request.js'
  },
  {
    'identifier': '582',
    'text': 'Ryan Mehta: Split this over here to the right.'
  },
  {
    'identifier': '583',
    'text': 'Ryan Mehta: And construct'
  },
  {
    'identifier': '584',
    'text': 'Ryan Mehta: Alright, let\'s try to make this as generic as possible. Over here on the right.'
  },
  {
    'identifier': '585',
    'text': 'Ryan Mehta: All right, first piece of generic stuff that we\'re going to do. We\'re going to make it so this path is configure, you can pass whatever path. You want to do that by putting path here.'
  },
  {
    'identifier': '586',
    'text': 'And'
  },
  {
    'identifier': '587',
    'text': 'Ryan Mehta: Placing this part.'
  },
  {
    'identifier': '588',
    'text': 'Ryan Mehta: This is only going to hit our back end that we\'re constructing so it\'s always going to use this right now. Seems like a good time to make this an environment variable also. So let\'s make this process.'
  },
  {
    'identifier': '589',
    'text': 'And API URL.'
  },
  {
    'identifier': '590',
    'text': 'Ryan Mehta: And pop that into our end file.'
  },
  {
    'identifier': '591',
    'text': 'Ryan Mehta: API URL API URL.'
  },
  {
    'identifier': '592',
    'text': 'Oops.'
  },
  {
    'identifier': '593',
    'text': 'Oops, oops, that\'s good.'
  },
  {
    'identifier': '594',
    'text': 'Ryan Mehta: Okay, so we have our dot and now let me restart web pack.'
  },
  {
    'identifier': '595',
    'text': 'Ryan Mehta: Look good so far. So we\'re just kind of making this generic will putting the path here another piece that we want to make more generic is the method here, we should be able to pass post get patch put delete. So we\'ll make the method generic bypassing the method here.'
  },
  {
    'identifier': '596',
    'text': 'Ryan Mehta: The variable.'
  },
  {
    'identifier': '597',
    'text': 'Ryan Mehta: The next thing that we need to do is make sure that we only attach these headers and this body. If we have a good method like only post patch and put can have headers and the body.'
  },
  {
    'identifier': '598',
    'text': 'Right.'
  },
  {
    'identifier': '599',
    'text': 'Ryan Mehta: So for headers. Let\'s say that'
  },
  {
    'identifier': '601',
    'text': 'Ryan Mehta: Can have them right so'
  },
  {
    'identifier': '602',
    'text': 'Ryan Mehta: Method.'
  },
  {
    'identifier': '603',
    'text': 'Ryan Mehta: We\'ll have those otherwise we\'ll have'
  },
  {
    'identifier': '604',
    'text': 'Ryan Mehta: An empty object that\'s kind of a crazy line of code. And there\'s a bit'
  },
  {
    'identifier': '605',
    'text': 'Ryan Mehta: Actually can make it look a bit better. Maybe'
  },
  {
    'identifier': '606',
    'text': 'Ryan Mehta: So if our method is one of these'
  },
  {
    'identifier': '607',
    'text': 'Ryan Mehta: Then we\'re gonna put the content type here otherwise headers is going to be an empty object will do the same for body.'
  },
  {
    'identifier': '608',
    'text': 'Ryan Mehta: So if the body. If the method in is one of those'
  },
  {
    'identifier': '609',
    'text': 'Ryan Mehta: Then we will have our body otherwise.'
  },
  {
    'identifier': '610',
    'text': 'No.'
  },
  {
    'identifier': '611',
    'text': 'No.'
  },
  {
    'identifier': '612',
    'text': 'Ryan Mehta: I kind of makes sense.'
  },
  {
    'identifier': '613',
    'text': 'Ryan Mehta: So conditionally putting the body and the headers object in the fetch.'
  },
  {
    'identifier': '614',
    'text': 'Ryan Mehta: Depending on the method.'
  },
  {
    'identifier': '615',
    'text': 'Ryan Mehta: So if the message is one of post put or patch string a fire body otherwise it\'ll be know if the if the method is one of post put or patch the content type is application JSON. Otherwise, we\'re not specify any headers.'
  },
  {
    'identifier': '616',
    'text': 'Ryan Mehta: The final part that we need here is a body.'
  },
  {
    'identifier': '617',
    'text': 'Ryan Mehta: So,'
  },
  {
    'identifier': '618',
    'text': 'Ryan Mehta: We\'ll put a body here and we will attempt to'
  },
  {
    'identifier': '619',
    'text': 'Ryan Mehta: certify the body.'
  },
  {
    'identifier': '620',
    'text': 'Ryan Mehta: So, so all of these things are now, Pat, we can now pass into the request and we can use this request anywhere to do almost the exact same thing.'
  },
  {
    'identifier': '621',
    'text': 'Ryan Mehta: You notice they didn\'t export this thing, it\'s because I kind of want to make helper functions that use this request. So what I\'m going to do is export constant post which will'
  },
  {
    'identifier': '622',
    'text': 'Ryan Mehta: Be a function that takes path and body and then uses my request function passive path. The method is'
  },
  {
    'identifier': '623',
    'text': 'Export'
  },
  {
    'identifier': '624',
    'text': 'Ryan Mehta: I don\'t like that that path of above is read for'
  },
  {
    'identifier': '625',
    'text': 'Ryan Mehta: So I\'m just making all these helper functions for us to use in the future.'
  },
  {
    'identifier': '626',
    'text': 'Will take'
  },
  {
    'identifier': '627',
    'text': 'Ryan Mehta: Body.'
  },
  {
    'identifier': '628',
    'text': 'Ryan Mehta: The bottom we\'re constructing all of these little'
  },
  {
    'identifier': '629',
    'text': 'Ryan Mehta: Helper request methods that we can use back in our actual service. I\'ll split it out to you had it split'
  },
  {
    'identifier': '630',
    'text': 'Ryan Mehta: Over here on the right, we can replace all of this stuff with one of our functions that we constructed down here. So in this case, post sign up as opposed to API V1 off sign up'
  },
  {
    'identifier': '631',
    'text': 'Ryan Mehta: And it sends it'
  },
  {
    'identifier': '632',
    'text': 'Ryan Mehta: We\'re going to send it as a body.'
  },
  {
    'identifier': '633',
    'text': 'Ryan Mehta: LOT SIMPLER over here on the right now. So this isn\'t a call this method post over here, which takes a path and the body email and password which will make the request fetch for us we can reuse this every time we\'re hitting our back end, which will simplify all of our little'
  },
  {
    'identifier': '634',
    'text': 'Ryan Mehta: service calls'
  },
  {
    'identifier': '635',
    'text': 'Ryan Mehta: The same thing for this one we\'re going to post to API be one off login'
  },
  {
    'identifier': '636',
    'text': 'Ryan Mehta: And then every feature requests will be about the same pick our method pick our path and our body. If we have one'
  },
  {
    'identifier': '637',
    'text': 'Ryan Mehta: Look good'
  },
  {
    'identifier': '638',
    'text': 'Okay.'
  },
  {
    'identifier': '639',
    'text': 'Ryan Mehta: Back in or off provider on login. We want to post login will send it an email and a password. And then for now let\'s just console log what we get back'
  },
  {
    'identifier': '640',
    'text': 'Ryan Mehta: To make sure everything is good. Let\'s go to app JS, in addition to having our signup form. Let\'s also have our login form the signup form will be the top one, the login form will be the bottom one.'
  },
  {
    'identifier': '641',
    'text': 'Ryan Mehta: So back on our front and signup form as this top one login form is the bottom one will use them strategically in the right places in the future. We know that we have a Test. A test that tests com user'
  },
  {
    'identifier': '642',
    'text': 'Ryan Mehta: So if we do this, we should see our network call'
  },
  {
    'identifier': '643',
    'text': 'Ryan Mehta: And we get back user'
  },
  {
    'identifier': '644',
    'text': 'Ryan Mehta: Everything was good. If I put in the wrong password.'
  },
  {
    'identifier': '645',
    'text': 'Ryan Mehta: And tried to login, we get our invalid email or password error message. So the front end in the back end are hooked up correctly right now.'
  },
  {
    'identifier': '646',
    'text': 'Ryan Mehta: That would good'
  },
  {
    'identifier': '647',
    'text': 'Alright.'
  },
  {
    'identifier': '648',
    'text': 'Ryan Mehta: Any questions up until this part.'
  },
  {
    'identifier': '649',
    'text': 'Jerud Moyer: So,'
  },
  {
    'identifier': '650',
    'text': 'Jerud Moyer: You could easily'
  },
  {
    'identifier': '651',
    'text': 'Jerud Moyer: install this on some routes and not others. Right.'
  },
  {
    'identifier': '652',
    'text': 'Ryan Mehta: Yeah, that\'s the last part that we need to do.'
  },
  {
    'identifier': '653',
    'text': 'Cool.'
  },
  {
    'identifier': '654',
    'text': 'Ryan Mehta: So yeah last part. We want some routes that are accessible to everyone and some routes that are only accessible to people who are logged in.'
  },
  {
    'identifier': '655',
    'text': 'Ryan Mehta: To simulate this without building an actual app. Let\'s make a few components here. Let\'s make a'
  },
  {
    'identifier': '656',
    'text': 'Ryan Mehta: Close everything. So we have some'
  },
  {
    'identifier': '657',
    'text': 'Ryan Mehta: meanness here. Let\'s make a home component'
  },
  {
    'identifier': '658',
    'text': 'Ryan Mehta: That will say,'
  },
  {
    'identifier': '659',
    'text': 'Ryan Mehta: Our home.'
  },
  {
    'identifier': '660',
    'text': 'Ryan Mehta: This is public. So we\'ll have a public route.'
  },
  {
    'identifier': '661',
    'text': 'Ryan Mehta: That we will have will be our home component'
  },
  {
    'identifier': '662',
    'text': 'Ryan Mehta: And will also construct the dashboard.'
  },
  {
    'identifier': '663',
    'text': 'Ryan Mehta: There won\'t be any actual information here because we don\'t, we\'re not really building a real app, but we\'ll just have two components that are kind of placeholders, this one will be ah one dashboard. This is right.'
  },
  {
    'identifier': '664',
    'text': 'Ryan Mehta: Okay, so I have one component for private and one component for public will just notify the user, which when they\'re on back in our home or app JS. We are going to use React router DOM.'
  },
  {
    'identifier': '665',
    'text': 'Ryan Mehta: To display these two routes.'
  },
  {
    'identifier': '666',
    'text': 'Ryan Mehta: So let\'s'
  },
  {
    'identifier': '667',
    'text': 'Take'
  },
  {
    'identifier': '668',
    'text': 'Ryan Mehta: Our switch'
  },
  {
    'identifier': '669',
    'text': 'Ryan Mehta: Our well'
  },
  {
    'identifier': '670',
    'text': 'Ryan Mehta: If we\'re at the exact path slash we\'re going to use our home component'
  },
  {
    'identifier': '671',
    'text': 'Ryan Mehta: If we are'
  },
  {
    'identifier': '672',
    'text': 'Actually'
  },
  {
    'identifier': '673',
    'text': 'Ryan Mehta: Sign up components.'
  },
  {
    'identifier': '674',
    'text': 'Ryan Mehta: If we are at the exact path login'
  },
  {
    'identifier': '675',
    'text': 'Ryan Mehta: We will use our logging component'
  },
  {
    'identifier': '676',
    'text': 'Ryan Mehta: Kind of like that structure that we use before I\'m gonna drop the router and index day. Yes. Because that makes testing a little bit easier.'
  },
  {
    'identifier': '677',
    'text': 'Ryan Mehta: Okay so routers here to index JS back in app JS, we have our provider and our switches for the homepage. The signup page and a login page.'
  },
  {
    'identifier': '678',
    'text': 'Ryan Mehta: So we should now see'
  },
  {
    'identifier': '679',
    'text': 'Ryan Mehta: Once we start this thing, Dan.'
  },
  {
    'identifier': '680',
    'text': 'Sarah Rector: Ryan, I think your login misspelled for that.'
  },
  {
    'identifier': '681',
    'text': 'Thank you.'
  },
  {
    'identifier': '682',
    'text': 'Ryan Mehta: So here\'s our homepage, it\'s public, we can go to the sign up'
  },
  {
    'identifier': '683',
    'text': 'Ryan Mehta: Page and the login page so we can log in or sign up in our application.'
  },
  {
    'identifier': '684',
    'text': 'Ryan Mehta: Perfect good everyone'
  },
  {
    'identifier': '685',
    'text': 'Ryan Mehta: Okay.'
  },
  {
    'identifier': '686',
    'text': 'Ryan Mehta: We also want to make another route.'
  },
  {
    'identifier': '687',
    'text': 'Ryan Mehta: Let\'s say that the exact path is dashboard.'
  },
  {
    'identifier': '688',
    'text': 'Ryan Mehta: Is'
  },
  {
    'identifier': '689',
    'text': 'Ryan Mehta: Scored'
  },
  {
    'identifier': '690',
    'text': 'Ryan Mehta: But we only want this route to be accessible when the person is actually lot of dead, so I should be able to go to dashboard.'
  },
  {
    'identifier': '691',
    'text': 'Ryan Mehta: And see that it\'s private. But if I logged out if I get rid of this cookie and destroy my session, I should no longer be able to see this page. It\'s like redirect me to the login page or something. Hey,'
  },
  {
    'identifier': '692',
    'text': 'Ryan Mehta: That makes sense to everyone.'
  },
  {
    'identifier': '693',
    'text': 'Ryan Mehta: Okay.'
  },
  {
    'identifier': '694',
    'text': 'Ryan Mehta: So let\'s get that functionality working'
  },
  {
    'identifier': '695',
    'text': 'Ryan Mehta: Typically what people do in this case is create a new component called private route and private routes job is to first check that the person is logged in, if they\'re not logged in, it kicks them out.'
  },
  {
    'identifier': '696',
    'text': 'Ryan Mehta: So I\'m going to do that same sort of approach in our off folder. I\'m going to make a private without that text file. This is going to be a function component'
  },
  {
    'identifier': '697',
    'text': 'Inside of this component'
  },
  {
    'identifier': '698',
    'text': 'Ryan Mehta: We are going to get props.'
  },
  {
    'identifier': '699',
    'text': 'Ryan Mehta: Just like like normal components we will receive props.'
  },
  {
    'identifier': '700',
    'text': 'Ryan Mehta: We won\'t know what those props are'
  },
  {
    'identifier': '701',
    'text': 'Ryan Mehta: And eventually we\'re going to return a route. So the same route that we get with'
  },
  {
    'identifier': '702',
    'text': 'React router done'
  },
  {
    'identifier': '703',
    'text': 'Ron Yonker: So this is just a container component of protecting five rounds.'
  },
  {
    'identifier': '704',
    'text': 'Ryan Mehta: Yep, it\'s going to do some checks before it returns router.'
  },
  {
    'identifier': '705',
    'text': 'Ryan Mehta: So it does everything that route normally does, except up here before it returns route, it\'s going to check that user is logged in.'
  },
  {
    'identifier': '706',
    'text': 'Ryan Mehta: user is logged in. So if the users logged in, we\'re going to do what rap normally does.'
  },
  {
    'identifier': '707',
    'text': 'Ryan Mehta: User'
  },
  {
    'identifier': '708',
    'text': 'Ryan Mehta: To login page.'
  },
  {
    'identifier': '709',
    'text': 'Ryan Mehta: So we\'re going to go down one of these two paths back in app JS instead of using the normal route. Here we\'re going to use private route when the user is logged in private route behaves just like route does if the user isn\'t logged in, we\'re going to redirect to the login page.'
  },
  {
    'identifier': '710',
    'text': 'Ryan Mehta: That\'s logic kind of makes sense.'
  },
  {
    'identifier': '711',
    'text': 'Ryan Mehta: Okay.'
  },
  {
    'identifier': '712',
    'text': 'Ryan Mehta: Back in or off provider. Over here we have this current user that we can check against'
  },
  {
    'identifier': '713',
    'text': 'Ryan Mehta: Right current user at least eventually will be set something if the user is logged in or it\'ll be set to nothing. If the user isn\'t logged in, we need to gain access to this correct user and the loading state. We\'re going to gain access to those things by adding hooks in our context.'
  },
  {
    'identifier': '714',
    'text': 'Ryan Mehta: Right here. So we have this you sign up hope that gets us our signup function are US login hook that gets us our login function we\'re going to create a user user hook'
  },
  {
    'identifier': '715',
    'text': 'Ryan Mehta: That will grab current user'
  },
  {
    'identifier': '716',
    'text': 'Ryan Mehta: Context.'
  },
  {
    'identifier': '717',
    'text': 'Ryan Mehta: And return current users.'
  },
  {
    'identifier': '718',
    'text': 'Ryan Mehta: Will also construct the hook called'
  },
  {
    'identifier': '719',
    'text': 'Ryan Mehta: offloading'
  },
  {
    'identifier': '720',
    'text': 'Ryan Mehta: Which will the structure loading.'
  },
  {
    'identifier': '721',
    'text': 'Ryan Mehta: News context.'
  },
  {
    'identifier': '722',
    'text': 'Ryan Mehta: So we have two hooks that get us our authentication state back in our private route we will grab those two things. So we\'ll grab our current user'
  },
  {
    'identifier': '723',
    'text': 'Ryan Mehta: And we will grab our loading state.'
  },
  {
    'identifier': '724',
    'text': 'Ryan Mehta: So,'
  },
  {
    'identifier': '725',
    'text': 'Ryan Mehta: If we\'re currently loading. So if we are in a loading state and we\'re going to return some'
  },
  {
    'identifier': '726',
    'text': 'Ryan Mehta: Loading component. At this point, we don\'t know if the users logged in or not. So we can\'t, we can\'t make the decision whether we redirect them to the login page or if we do like direct them to their normal page.'
  },
  {
    'identifier': '727',
    'text': 'Ryan Mehta: After we after they get past this stage we can check if we have a current user'
  },
  {
    'identifier': '728',
    'text': 'Ryan Mehta: If we don\'t have a current user. Then we went to return something else. Anybody know of a way to redirect to the login page with React router down'
  },
  {
    'identifier': '729',
    'text': 'Greg Mall: US history.'
  },
  {
    'identifier': '730',
    'text': 'Ryan Mehta: History is one of them.'
  },
  {
    'identifier': '731',
    'text': 'Ryan Mehta: There\'s actually another thing.'
  },
  {
    'identifier': '732',
    'text': 'Ryan Mehta: That we can use from react router DOM called redirect, but there\'s something sort of like US history, except that lets us return a component that does the redirect will redirect to the landing page.'
  },
  {
    'identifier': '733',
    'text': 'Ryan Mehta: Otherwise, we\'ll do the normal route thing.'
  },
  {
    'identifier': '734',
    'text': 'Jerud Moyer: And not be used with Redux because I was really struggling like trying to redirect essentially like on handle submit some things Redux'
  },
  {
    'identifier': '735',
    'text': 'Ryan Mehta: I can in handle submit. So you have to use the history that push'
  },
  {
    'identifier': '736',
    'text': 'Ryan Mehta: So this is only the only time you can use this sort of thing is if you want to redirect where you would normally return a component'
  },
  {
    'identifier': '737',
    'text': 'Ryan Mehta: There\'s like three'
  },
  {
    'identifier': '738',
    'text': 'Jerud Moyer: Kind of change.'
  },
  {
    'identifier': '739',
    'text': 'Ryan Mehta: Page things that react rather down gives you one is link which is in spots you pay per click right like where you\'d normally play anchor tags.'
  },
  {
    'identifier': '740',
    'text': 'Ryan Mehta: There is history Cush which is in response to like submits'
  },
  {
    'identifier': '741',
    'text': 'Ryan Mehta: And then there\'s three'
  },
  {
    'identifier': '742',
    'text': 'Ryan Mehta: Response to like the page loading.'
  },
  {
    'identifier': '743',
    'text': 'Ryan Mehta: So in this case, there\'s no user interaction here that we can say like history about push on this is a response to the page loading like the page loads, the user isn\'t logged in. So we redirect.'
  },
  {
    'identifier': '744',
    'text': 'Ryan Mehta: History dot pushes in response to some user interaction they click a submit button, they typed into an input form, anything that is normally in a handle handle change and the click handle submit you would use history push and then link is like a link on a pay a tag on a page.'
  },
  {
    'identifier': '745',
    'text': 'These are the three things.'
  },
  {
    'identifier': '746',
    'text': 'We can use'
  },
  {
    'identifier': '747',
    'text': 'Ryan Mehta: All right, let\'s see what happens. Right now, if we go to the dashboard page loading forever, which kind of makes sense because'
  },
  {
    'identifier': '748',
    'text': 'Ryan Mehta: Back in our off provider.'
  },
  {
    'identifier': '749',
    'text': 'Ryan Mehta: Let\'s just stare at this thing for a second, we default to loading and we never take it out of a loading state is always loading right now.'
  },
  {
    'identifier': '750',
    'text': 'Ryan Mehta: Never not loading.'
  },
  {
    'identifier': '751',
    'text': 'Ryan Mehta: Make sense'
  },
  {
    'identifier': '752',
    'text': 'Ryan Mehta: All right. Alright, let\'s fix that a little bit.'
  },
  {
    'identifier': '753',
    'text': 'Ryan Mehta: When we sign up a user instead of just console logging. We\'re then going to get back the user and we\'re going to set our current user to that user that just signed up.'
  },
  {
    'identifier': '754',
    'text': 'Ryan Mehta: And'
  },
  {
    'identifier': '755',
    'text': 'Ryan Mehta: Set loading to false.'
  },
  {
    'identifier': '756',
    'text': 'Ryan Mehta: So when a user signs up we set them as the current user and we\'re no longer loading.'
  },
  {
    'identifier': '757',
    'text': 'Ryan Mehta: On login'
  },
  {
    'identifier': '758',
    'text': 'Ryan Mehta: We\'re also going to get back a user will set the current user to that user who just logged in and we will'
  },
  {
    'identifier': '759',
    'text': 'Ryan Mehta: Set loading to false.'
  },
  {
    'identifier': '760',
    'text': 'Ryan Mehta: Makes sense so either on sign up or site. Sign up or login. We set the current news that the person who just signed up or logged in.'
  },
  {
    'identifier': '761',
    'text': 'Ryan Mehta: Not all good so far. I\'m going to do one other thing in both of these functions. I\'m also'
  },
  {
    'identifier': '762',
    'text': 'Ryan Mehta: Going to push them to the dashboard page once they log in. They don\'t want to sit on the login page actually want to be moved into the dashboard.'
  },
  {
    'identifier': '763',
    'text': 'Ryan Mehta: So to do that, Greg. This is where you would use your suggestion of history.'
  },
  {
    'identifier': '764',
    'text': 'Ryan Mehta: So we\'ll grab history from react router.'
  },
  {
    'identifier': '765',
    'text': 'Ryan Mehta: And then down here, we can'
  },
  {
    'identifier': '766',
    'text': 'Ryan Mehta: Push to the dashboard.'
  },
  {
    'identifier': '767',
    'text': 'Ryan Mehta: So on. Sign up our login. We set the user to ever signed up or logged in, we push them to the dashboard and we set loading to false.'
  },
  {
    'identifier': '768',
    'text': 'Ryan Mehta: So we try to go to the login page.'
  },
  {
    'identifier': '769',
    'text': 'Ryan Mehta: And put in test that test.com and password press login. We get sent to the private dashboard route.'
  },
  {
    'identifier': '770',
    'text': 'Ryan Mehta: That all look good.'
  },
  {
    'identifier': '771',
    'text': 'Ryan Mehta: Um, there\'s one big problem here. Still, the last thing that we have to fix before we\'re done with our I know office so huge. It\'s so huge for so so little payoff why hate off so much'
  },
  {
    'identifier': '772',
    'text': 'Ryan Mehta: We have, like, it takes. There\'s so many moving pieces with off and then at the end of it, you have a login for which every other website has like'
  },
  {
    'identifier': '773',
    'text': 'Ryan Mehta: So we\'re currently logged in, we have our wristband attached to us. But if we refresh this page. We\'re stuck in loading the front end is never were like not verifying that we have the wristband attached to us.'
  },
  {
    'identifier': '774',
    'text': 'Ryan Mehta: If you remember way back when we did off last time we had this verify route that we said the front end would use to see if the user is currently logged in.'
  },
  {
    'identifier': '775',
    'text': 'Ryan Mehta: That\'s what we\'re going to need here to verify the session and switch the user like pass back the currently logged in user from the back end.'
  },
  {
    'identifier': '776',
    'text': 'Ryan Mehta: So on the front end. In addition to these login and signups. We also always want to check. Do I have a wt. And if I do, said whoever owns that Jake WT to the current user'
  },
  {
    'identifier': '777',
    'text': 'Ryan Mehta: So what we actually really want is a use effect.'
  },
  {
    'identifier': '778',
    'text': 'Ryan Mehta: That runs with a component first mounts that verifies the session cookie and sex.'
  },
  {
    'identifier': '779',
    'text': 'Ryan Mehta: User'
  },
  {
    'identifier': '780',
    'text': 'Ryan Mehta: What some way to verify that session cookie that we have stored'
  },
  {
    'identifier': '781',
    'text': 'Ryan Mehta: This is going to happen back on our back end.'
  },
  {
    'identifier': '782',
    'text': 'Ryan Mehta: We\'re going to add another routes here. It\'s going to be get route.'
  },
  {
    'identifier': '783',
    'text': 'Ryan Mehta: For verify'
  },
  {
    'identifier': '784',
    'text': 'Ryan Mehta: And then this verify route we want to check to see if this session cookie is currently set if that session cookie is set than the users logged in and we send them back all of that user information.'
  },
  {
    'identifier': '785',
    'text': 'Ryan Mehta: That makes sense so far.'
  },
  {
    'identifier': '786',
    'text': 'Okay.'
  },
  {
    'identifier': '787',
    'text': 'Ryan Mehta: To verify that the users logged in, we\'re going to make a nother service over here on the left hand side.'
  },
  {
    'identifier': '788',
    'text': 'Ryan Mehta: And we\'ll call this service.'
  },
  {
    'identifier': '789',
    'text': 'Ryan Mehta: Verify'
  },
  {
    'identifier': '790',
    'text': 'Ryan Mehta: Token the verify token service will take the token, the token is what we currently have stored in the cookie. If we look at the browser this value right here is our user token.'
  },
  {
    'identifier': '791',
    'text': 'Ryan Mehta: One really nice thing about this user token. We go to J WT IO.'
  },
  {
    'identifier': '792',
    'text': 'Ryan Mehta: Is it contains all of our users information it'
  },
  {
    'identifier': '793',
    'text': 'Can I use you.'
  },
  {
    'identifier': '794',
    'text': 'Ryan Mehta: So it has our users email all of our users information in the payload of this token.'
  },
  {
    'identifier': '795',
    'text': 'Ryan Mehta: Or we\'re going to do is take that token that stored in the cookie.'
  },
  {
    'identifier': '796',
    'text': 'Ryan Mehta: And verify it. So let me grab the payload.'
  },
  {
    'identifier': '797',
    'text': 'Ryan Mehta: Off of RJ WT we\'re going to verify the token.'
  },
  {
    'identifier': '798',
    'text': 'Ryan Mehta: And pass it our app secret which is and'
  },
  {
    'identifier': '799',
    'text': 'Ryan Mehta: Secret. So we\'re going to check the signature on the token.'
  },
  {
    'identifier': '800',
    'text': 'Ryan Mehta: If all of that is good. Then we\'re going to return the payload.'
  },
  {
    'identifier': '801',
    'text': 'Ryan Mehta: The payload is pretty much just the user'
  },
  {
    'identifier': '802',
    'text': 'Ryan Mehta: This thing makes sense to everyone. So we\'re getting that user that\'s inside of the token.'
  },
  {
    'identifier': '803',
    'text': 'Ryan Mehta: Alright.'
  },
  {
    'identifier': '804',
    'text': 'Ryan Mehta: One more big step, we\'re going to use this verify token thing in a piece of middleware.'
  },
  {
    'identifier': '805',
    'text': 'Ryan Mehta: So we\'re going to write a piece of middleware called and for off.'
  },
  {
    'identifier': '806',
    'text': 'Ryan Mehta: Ensure off is going to exports.'
  },
  {
    'identifier': '807',
    'text': 'Ryan Mehta: Next,'
  },
  {
    'identifier': '808',
    'text': 'Ryan Mehta: Some middleware.'
  },
  {
    'identifier': '809',
    'text': 'Ryan Mehta: This middleware will read the session cookie off of rec cookies.'
  },
  {
    'identifier': '810',
    'text': 'Ryan Mehta: That\'ll give us our session cookie with that session cookie. We are going to get our user using our user service.'
  },
  {
    'identifier': '811',
    'text': 'Ryan Mehta: Dot fair hi token, the session is our token. Right. That\'s the token that stored inside of the cookie.'
  },
  {
    'identifier': '812',
    'text': 'Ryan Mehta: And then we will attach direct user this user and call next'
  },
  {
    'identifier': '813',
    'text': 'Ryan Mehta: That\'s what this middle liberal do so we\'ll grab the session cookie will verify that that session cookies, a valid token will set the user to wreck that user and call next'
  },
  {
    'identifier': '814',
    'text': 'Ryan Mehta: Inside of our verify route and any route that we want to be behind authentication. We are going to use the ensure off middleware.'
  },
  {
    'identifier': '815',
    'text': 'Ryan Mehta: The ensure off middle where we\'ll make sure that this session cookies attached that it\'s a valid cookie.'
  },
  {
    'identifier': '816',
    'text': 'Ryan Mehta: And then return the user'
  },
  {
    'identifier': '817',
    'text': 'Ryan Mehta: At this point, we can just raise that said'
  },
  {
    'identifier': '818',
    'text': 'Sir,'
  },
  {
    'identifier': '819',
    'text': 'Ryan Mehta: That\'ll be the current user who\'s logged in, just sending that back.'
  },
  {
    'identifier': '820',
    'text': 'Ryan Mehta: This look good.'
  },
  {
    'identifier': '821',
    'text': 'Ryan Mehta: Or if it doesn\'t, it\'s like it\'s good enough.'
  },
  {
    'identifier': '822',
    'text': 'Ryan Mehta: Alright.'
  },
  {
    'identifier': '823',
    'text': 'Ryan Mehta: In order to get this to work. We need that cookie parse or thing that\'s a piece of middleware that will need and we will add that to app JS.'
  },
  {
    'identifier': '824',
    'text': 'Ryan Mehta: Added up here.'
  },
  {
    'identifier': '825',
    'text': 'Cookie.'
  },
  {
    'identifier': '826',
    'text': 'Ryan Mehta: Cookie is what allows us to do wreck cookies that session. So as we\'re making requests into this application.'
  },
  {
    'identifier': '827',
    'text': 'Ryan Mehta: We are going to be sending'
  },
  {
    'identifier': '828',
    'text': 'Ryan Mehta: This cookie that we have saved here. This is our red dot set cookies session is this token value. So in our middleware. We are grabbing that token value we\'re verifying that the tokens. Good. If it is good. We are sending back the user'
  },
  {
    'identifier': '829',
    'text': 'Ryan Mehta: User who owns that cookie.'
  },
  {
    'identifier': '830',
    'text': 'Ryan Mehta: We have our verify route.'
  },
  {
    'identifier': '831',
    'text': 'Ryan Mehta: A few small things left on the front end now that we have that verify route in our services. We have another service.'
  },
  {
    'identifier': '832',
    'text': 'Ryan Mehta: Get verify, I guess.'
  },
  {
    'identifier': '833',
    'text': 'Ryan Mehta: Which will get API, the one off verify'
  },
  {
    'identifier': '834',
    'text': 'Ryan Mehta: This will return the currently logged in user if there is one.'
  },
  {
    'identifier': '835',
    'text': 'Ryan Mehta: Back in off provider.'
  },
  {
    'identifier': '836',
    'text': 'Ryan Mehta: Verify the session cookie and sets the current user'
  },
  {
    'identifier': '837',
    'text': 'Ryan Mehta: We can do that with our get verify will then get back the current user will set the current user to whoever owns the J WT attached the browser. And then we\'ll finally'
  },
  {
    'identifier': '838',
    'text': 'Ryan Mehta: Set loading to false.'
  },
  {
    'identifier': '839',
    'text': 'Ryan Mehta: So the flow of this one like to draw a little picture with the browser brought up.'
  },
  {
    'identifier': '840',
    'text': 'Ryan Mehta: We have this session could be stored'
  },
  {
    'identifier': '841',
    'text': 'Ryan Mehta: Right here.'
  },
  {
    'identifier': '842',
    'text': 'Ryan Mehta: What will happen is our front end is this little person they have this session cookie attached to them when they first come to our website. We\'re going to send this session cookie to the back end.'
  },
  {
    'identifier': '843',
    'text': 'Ryan Mehta: Via the verify route.'
  },
  {
    'identifier': '844',
    'text': 'Ryan Mehta: The brat backend will check, is this a valid cookie. Is this a valid session if it is it\'s going to tell them which user, they are'
  },
  {
    'identifier': '845',
    'text': 'Ryan Mehta: who this person is this person has like total amnesia. They have no idea who they are all of their information is stored in their bracelet, the backend then reads the bracelet and tells the user who they are.'
  },
  {
    'identifier': '846',
    'text': 'Ryan Mehta: That\'s really that whole flow. It seems like a simpler and picture, but there\'s a ton of code that makes it happen.'
  },
  {
    'identifier': '847',
    'text': 'Ryan Mehta: So if we look at the code.'
  },
  {
    'identifier': '848',
    'text': 'Ryan Mehta: When the component first loads we verify verify calls this verify route. We\'re going to send the bracelet via the GET request the back ends in a check that the bracelet is good if it is good, they\'re going to tell us what user. We are. We\'re going to set loading to false.'
  },
  {
    'identifier': '849',
    'text': 'Ryan Mehta: On the back end. This is the route that they\'re hitting the verify route first uses this ensure off middleware. The ensure off middleware grabs that bracelet off of the cookie.'
  },
  {
    'identifier': '850',
    'text': 'Ryan Mehta: In there verifies that J WT'
  },
  {
    'identifier': '851',
    'text': 'Ryan Mehta: When it verifies that J WTF returns back the user who owns the J WT the bracelet and then it sets that user to user because we set wreck that user. Over here we have access direct.us over here and we\'re just sending back the user who own fat J WT'
  },
  {
    'identifier': '852',
    'text': 'Ryan Mehta: All of this makes it so'
  },
  {
    'identifier': '853',
    'text': 'Ryan Mehta: When we refresh this page. We now can access this dashboard, because we have a session here.'
  },
  {
    'identifier': '854',
    'text': 'Ryan Mehta: If we clear this session and refresh. We get sent to the loading page.'
  },
  {
    'identifier': '855',
    'text': 'Ryan Mehta: Try to go there loading page login'
  },
  {
    'identifier': '856',
    'text': 'Ryan Mehta: Dashboard refresh dashboard clearer cookie refresh login page.'
  },
  {
    'identifier': '857',
    'text': 'Ryan Mehta: A ton of code to get that functionality, but we have it.'
  },
  {
    'identifier': '858',
    'text': 'Ryan Mehta: Alright, one time just through it and for each piece that we wrote'
  },
  {
    'identifier': '859',
    'text': 'Ryan Mehta: So on the back end. We have three routes that we wrote a sign up route which signs up a user'
  },
  {
    'identifier': '860',
    'text': 'Ryan Mehta: To check out that service really quick. Put it side by side with the route.'
  },
  {
    'identifier': '861',
    'text': 'Ryan Mehta: So on sign up, we'
  },
  {
    'identifier': '862',
    'text': 'Ryan Mehta: Hash the password that the user signed up with and then insert into our database, the user with our email and the hashed password.'
  },
  {
    'identifier': '863',
    'text': 'Ryan Mehta: After they sign up. We set a session cookie which attaches a cookie on session with the author token.'
  },
  {
    'identifier': '864',
    'text': 'Ryan Mehta: Off token here constructs a j WT token, or J WT'
  },
  {
    'identifier': '865',
    'text': 'Ryan Mehta: Inside of the jaded UT, there\'s this object called with a payload key and the actual user who just signed up.'
  },
  {
    'identifier': '866',
    'text': 'Ryan Mehta: This stuff here constructs. Our token that will expire in 24 hours we take that token and attach it as a cookie to the response.'
  },
  {
    'identifier': '867',
    'text': 'Ryan Mehta: So when a user signs up we insert them into the database. We set a j WT in the browser\'s cookie jar and then we send back the user. So now that browser has attached to it a cookie that identifies the user'
  },
  {
    'identifier': '868',
    'text': 'Ryan Mehta: per application.'
  },
  {
    'identifier': '869',
    'text': 'Ryan Mehta: We have this login route the login route. There\'s something very similar to the signup route, but instead of inserting a user, it finds a user by their email.'
  },
  {
    'identifier': '870',
    'text': 'Ryan Mehta: If there is no user with that email errors if there is a user with that email. We checked out their passwords match. If they don\'t air if they do we return the user'
  },
  {
    'identifier': '871',
    'text': 'Ryan Mehta: So at this point, online 30 we know that we have a user with that email and the user passed in the correct password.'
  },
  {
    'identifier': '872',
    'text': 'Ryan Mehta: Because they did those two things we attached that jaded et to the browser and send back the user'
  },
  {
    'identifier': '873',
    'text': 'Ryan Mehta: So whether the user signed up or logged in, they now have a j WT attached to the browser that identifies them.'
  },
  {
    'identifier': '874',
    'text': 'Ryan Mehta: When they come back to her app later they\'re going to go through this verify without the verify route is our way of checking that J WT checking that they have already logged in or signed up.'
  },
  {
    'identifier': '875',
    'text': 'Ryan Mehta: This verify route uses the ensure off middleware that we wrote'
  },
  {
    'identifier': '876',
    'text': 'Ryan Mehta: For CPU.'
  },
  {
    'identifier': '877',
    'text': 'Ryan Mehta: It grabs the session cookie. Here\'s session online for rec cookies session, we put session here because the cookie name that we gave it session over here.'
  },
  {
    'identifier': '878',
    'text': 'Ryan Mehta: So we grabbed that session cookie. The session cookies value is the token, the J WT that we created earlier we verify that that session that that token is good if it is. This is going to give us back the user who created the token.'
  },
  {
    'identifier': '879',
    'text': 'Ryan Mehta: We set that user who either logged in or signed up earlier to wreck user an inner verify route we send back the currently logged in user'
  },
  {
    'identifier': '880',
    'text': 'Ryan Mehta: So anybody at any time can go to this endpoint and check to see if they\'ve already logged in this endpoint will either return nothing if they haven\'t logged in, or we will return the current user who\'s logged in. So this is the way for the front end to check, have I already logged in.'
  },
  {
    'identifier': '881',
    'text': 'Ryan Mehta: On the front end. We have three things really going on in this off provider. The first one is handling sign up. So on sign up'
  },
  {
    'identifier': '882',
    'text': 'Ryan Mehta: We posted a sign up and point. We then get back the current user, which we set in state and then we push the user to the dashboard page and set loading to false.'
  },
  {
    'identifier': '883',
    'text': 'Ryan Mehta: We do the same thing on margin we log the user in by hitting the login route we get back the current user and set that in state we push them to the dashboard and set loading to false.'
  },
  {
    'identifier': '884',
    'text': 'Ryan Mehta: So, these two things are very similar.'
  },
  {
    'identifier': '885',
    'text': 'Ryan Mehta: The third thing that we do on this page is when the component first mounts when our application first loads on the screen. We check to see if the users already logged in UK has this person already logged in, previously did they already have a session cookie.'
  },
  {
    'identifier': '886',
    'text': 'Ryan Mehta: If they do user will be a value will sit like the currently logged in user will set that currently logged in user to state and will set loading to false. If they\'re not logged in this user won\'t be anything. So the current user will be no there\'ll be will be onset.'
  },
  {
    'identifier': '887',
    'text': 'Ryan Mehta: This component or this provider kind of makes sense for the most part.'
  },
  {
    'identifier': '888',
    'text': 'Ryan Mehta: There\'s one other big part on the front end that we did this private route.'
  },
  {
    'identifier': '889',
    'text': 'Ryan Mehta: The private route gets the currently logged in user and whether or not we\'re loading. We need this loading here because when the components first mount. We haven\'t verified that the users logged in or not yet.'
  },
  {
    'identifier': '890',
    'text': 'Ryan Mehta: So as we\'re waiting to check if the users logged in, we\'re in a loading state. So before we get back this verify request. We\'re going to show the user a loading screen we actually see that really quickly when we go to dashboard.'
  },
  {
    'identifier': '891',
    'text': 'Ryan Mehta: can kind of see that blip loading. So before we check to see if the users logged in, we display a loading screen.'
  },
  {
    'identifier': '892',
    'text': 'Ryan Mehta: After this use effect. The verify finishes, we either have a user or we don\'t the person\'s either logged in, or they\'re not if they\'re not logged in, we send them to the login page if they are logged in, we send them to the normal route.'
  },
  {
    'identifier': '893',
    'text': 'Ryan Mehta: And this private route thing is used back in app JS.'
  },
  {
    'identifier': '894',
    'text': 'Ryan Mehta: So App JS, we have private route and private route is used exactly like the normal route. These things are all props. We send those props down to the normal route.'
  },
  {
    'identifier': '895',
    'text': 'Ryan Mehta: To private route works exactly like a normal route except before it does the normal routing a first checks if the users logged in or not.'
  },
  {
    'identifier': '896',
    'text': 'Ryan Mehta: Look good'
  },
  {
    'identifier': '897',
    'text': 'Ron Yonker: Never have to write this frequently'
  },
  {
    'identifier': '898',
    'text': 'Ryan Mehta: You might have to write it for your final projects, but probably never again in your life after that.'
  },
  {
    'identifier': '899',
    'text': 'Ron Yonker: Yeah, a lot of gut. I\'m hearing what you\'re saying. Like, I don\'t see why you would ever want to write this yourself rather than use some sort of library or something proprietary something someone'
  },
  {
    'identifier': '900',
    'text': 'Ryan Mehta: Yeah, totally. We used to use author zero at the end of'
  },
  {
    'identifier': '901',
    'text': 'Ryan Mehta: career track to do this login. The problem without the zeros. It\'s even more complicated, even though it\'s like a third party that does it for you. It ends up being more complicated so'
  },
  {
    'identifier': '902',
    'text': 'Ryan Mehta: It\'s not worth it so much.'
  },
  {
    'identifier': '903',
    'text': 'Jerud Moyer: Can you speak a little bit to how we would integrate this with Redux app.'
  },
  {
    'identifier': '904',
    'text': 'Ryan Mehta: Yeah, I probably wouldn\'t start, I would probably just continue to use the off provider. Even when I read that SAP and then you would just use your like Redux provider around all of this also. So you\'d have both Redux and you\'re off provider state available to all of your, your components.'
  },
  {
    'identifier': '905',
    'text': 'Cool, thanks.'
  },
  {
    'identifier': '906',
    'text': 'Ryan Mehta: Okay, we\'re good with off. You don\'t have to use off on your final project, by the way.'
  },
  {
    'identifier': '907',
    'text': 'Ryan Mehta: But you can if you want'
  },
  {
    'identifier': '908',
    'text': 'Ryan Mehta: Okay, one little thing. I know it\'s like we\'re already into 12 so feels like lunch, but just very quickly.'
  },
  {
    'identifier': '909',
    'text': 'Ryan Mehta: Final projects we\'re going to start them today will meet tomorrow morning at nine, just so we can talk about this stuff like the flow of the week.'
  },
  {
    'identifier': '910',
    'text': 'Ryan Mehta: This week I kind of wanted to talk about it today, but I don\'t want to take any more time or not too much more time.'
  },
  {
    'identifier': '911',
    'text': 'Ryan Mehta: Today is Monday days zero of our'
  },
  {
    'identifier': '912',
    'text': 'Ryan Mehta: Flow of the week today, right now we will post the teams.'
  },
  {
    'identifier': '913',
    'text': 'Ryan Mehta: This afternoon, you\'ll meet with your team discuss team agreement stuff. Talk about ideas.'
  },
  {
    'identifier': '914',
    'text': 'Ryan Mehta: And research any libraries and API\'s that you might need. So it\'s just a tall day discussion with your team about how you want a final project to go and any ideas that you want to work on for final project.'
  },
  {
    'identifier': '915',
    'text': 'Ryan Mehta: Tomorrow, you\'ll pick one of those ideas. So I don\'t think you should pick one today, you should sort of play with the ideas explore them sleep on it and then come back tomorrow and'
  },
  {
    'identifier': '916',
    'text': 'Ryan Mehta: Decide with your group, the idea that you want to work.'
  },
  {
    'identifier': '917',
    'text': 'Ryan Mehta: But yeah, so today Team agreement and discuss the ideas. There\'s no labs are done with labs.'
  },
  {
    'identifier': '918',
    'text': 'Now,'
  },
  {
    'identifier': '919',
    'text': 'Ryan Mehta: Yeah.'
  },
  {
    'identifier': '920',
    'text': 'Annalise: He'
  },
  {
    'identifier': '921',
    'text': 'Ryan Mehta: For final projects, you can do whatever you want. I know that makes it very hard to come up with an idea.'
  },
  {
    'identifier': '922',
    'text': 'Ryan Mehta: Traditionally, people have had react friends and express back ends. So probably you\'ll have something like that. But you\'re free to do whatever you like make whatever you want.'
  },
  {
    'identifier': '923',
    'text': 'Ryan Mehta: During the next like two weeks week and a half of actual coding'
  },
  {
    'identifier': '924',
    'text': 'Ryan Mehta: You can come and talk to us and pitch ideas and we\'ll let you know if it seems like a good idea or something that you can complete in the allotted time'
  },
  {
    'identifier': '925',
    'text': 'Annalise: Other specific like requirements like base requirements that the final project needs like obviously a front end and back end.'
  },
  {
    'identifier': '926',
    'text': 'Ryan Mehta: There, there are none. I mean, you can write a'
  },
  {
    'identifier': '927',
    'text': 'Ryan Mehta: Letter right and only application. If you wanted to our backend only application if you wanted to, but it would have to be compelling like'
  },
  {
    'identifier': '928',
    'text': 'Ryan Mehta: Yeah, I mean, it would be hard to make a front end application that maybe last. That is interesting.'
  },
  {
    'identifier': '929',
    'text': 'Ryan Mehta: And it\'d be hard to make a back end application that users can use'
  },
  {
    'identifier': '930',
    'text': 'Annalise: What I\'m like, have you seen, or what type of projects have you seen be really successful for the final ones in the past.'
  },
  {
    'identifier': '931',
    'text': 'Ryan Mehta: Yeah, that\'s a good question.'
  },
  {
    'identifier': '932',
    'text': 'Annalise: You can get back to me on that.'
  },
  {
    'identifier': '933',
    'text': 'Ryan Mehta: Yeah, well I\'ll post a list of all like a bunch of final do we already post that thing with on the final projects.'
  },
  {
    'identifier': '934',
    'text': 'Annalise: In it.'
  },
  {
    'identifier': '935',
    'text': 'Ryan Mehta: I\'ll post a link in Slack with a list of like final projects that people have worked on in the past and the links that you can go to to see the final project so you can explore'
  },
  {
    'identifier': '936',
    'text': 'Can you maybe give some ideas.'
  },
  {
    'identifier': '937',
    'text': 'Ryan Mehta: Okay. Any final questions to post these killings.'
  },
  {
    'identifier': '938',
    'text': 'Brooke Perkins (she/her): I have a question about labs. I\'m wondering if we\'re gonna have a chance to resubmit anything that we worked on over the weekend.'
  },
  {
    'identifier': '939',
    'text': 'Ryan Mehta: Yeah, you could submit was up until Friday.'
  },
  {
    'identifier': '940',
    'text': 'Brooke Perkins (she/her): Oh, up until Friday, we can. Okay. Oh, thanks. For some reason I thought we were like starting coding this week, but'
  },
  {
    'identifier': '941',
    'text': 'Ryan Mehta: We are. We\'re starting like Wednesday ish coding'
  },
  {
    'identifier': '942',
    'text': 'Ryan Mehta: Officially, we\'re starting Monday.'
  },
  {
    'identifier': '943',
    'text': 'Brooke Perkins (she/her): Okay, so, yeah.'
  },
  {
    'identifier': '944',
    'text': 'Ryan Mehta: All right, any other questions.'
  },
  {
    'identifier': '945',
    'text': 'Ryan Mehta: OK, I will post in our Slack channel.'
  },
  {
    'identifier': '946',
    'text': 'Ryan Mehta: The teams and we can just head to lunch right now where you can meet with your team. If you want to probably get lunch and then me around one everyone'
  },
  {
    'identifier': '947',
    'text': 'Ryan Mehta: Alright, see you all after lunch.'
  },
  {
    'identifier': '948',
    'text': 'Annalise: Thanks.'
  },
  {
    'identifier': '949',
    'text': 'Thanks. Thanks.'
  }
];
