/* chat.js 
 * Ken Downey - kendowney.com@gmail.com
 * Main js file for SimpleChat
 *
 * Since this script is loaded at the end of the HTML document, 
 * no need to wait for the DOM to be ready.
 */
function Person(name, phrases){
	this.name = name,
	this.phrases = phrases,
	this.speak = function(element){
		if(phrases.length > 0){
			element.innerHTML = element.innerHTML + phrases.shift() + '<br/>';
		}
		else {
			// Nothing more to say, stop timer
			clearInterval(timer);
		}
	}
}

// Simulated chat phrases
var User1_phrases = [
           'Hello User 2',
           'How is the weather?',
           'What is your name?',
           'Say something else',
           'very funny',
           'So what now?',
           'Lunch?',
           'OK',
           'me too',
           'my RAM is leaking!'],
    User2_phrases = [
           'Hello User 1',
           'Fine.',
           'User 2',
           'Something else',
           ';-)',
           'you tell me',
           'my capacitors are full already',
           'looking forward to sleep mode',
           'my CPU threads are unraveling',
           'Bye!'
           ];

// Instantiate chat users
var user1 = new Person('User 1', User1_phrases),
    user2 = new Person('User 2', User2_phrases);



// setup event listeners
window.addEventListener("saySomething", converse);

// event handler
var last_speaker = 0;
function converse(){
	var el = document.getElementById("chat_window");	    
	// alternate speaker
	(last_speaker % 2 == 0) ? user1.speak(el) : user2.speak(el);
	// cause target element to scroll
	el.scrollTop = el.scrollHeight;
	last_speaker ++;
}

// start the chat
var timer = window.setInterval( function(){
	window.dispatchEvent(new Event("saySomething"));
}, 1500);