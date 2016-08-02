

var compose = function (args) {
  var fns = arguments;

  return function (result) {
    for (let i = fns.length - 1;i > -1; i--) {
      result = fns[i].call(this, result);
    }

    return result;
  }
}
// The above function iterates over the function list (our arguments) in reverse. The last function to pass in is executed first. Given a single value as the initial input, it'll chain that value between every function call and return the final result.

var sequence = function () {
  var fns = arguments;

  return function (result) {
    for (var i = 0; i < fns.length; i++) {
      result = fns[i].call(this, result);
    }

    return result;
  };
};

//It's very similar to compose, except the arguments are executed in reverse




///////////////////////////////////////////////////
// Functions
//
function getCount(sentence) {
  var words      = (typeof sentence == 'string') ? sentence : '';
  var count      = function (regex) {
    return (words.match(regex) || []).length;
  };
  var vowels     = count(/[aeiou]/ig);
  var consonants = count(/[bcdfghjklmnpqrstvxzwy]/ig);

  return [
    vowels,
    consonants
  ];
}

//
function invertedCase (sentence) {
    var newSentence = [];

    var chars = Array.from(sentence);

    chars.forEach(function (c) {
      if (c.match(/[A-Z]/g)) {
         newSentence.push(c.toLowerCase());
      } else if (c.match(/[a-z]/g)) {
        newSentence.push(c.toUpperCase());
      } else {
        newSentence.push(c);
      }
    });

    return newSentence.join('');
}

//
function reverseWords(sentence) {
  var reversed = sentence
        .split(' ')
        .map(function (word) {
          return word
            .split('')
            .reverse()
            .join('');
        });

  return reversed.join(' ');
}

//
function insertDash (sentence) {
   var newSentence = sentence.split(' ').join('-');
   return newSentence;
}

//
function $beforeVowel (sentence) {
  var newArr = [];

  var newS = Array.from(sentence);

  newS.map(function (c) {
    if (c.match(/[aeiou]/gi)) {
     newArr.push('$' + c);
    } else if (!c.match(/[aeiou]/gi)) {
     newArr.push(c);
    } else {
      newArr.push(c);
    }
  });

  return newArr.join('');
}

//
function addDoubleColon (sentence) {
  var str = sentence.replace(/-/g, '::');
  return(str);
}
//////////////////////////////////////////
const sentence = 'In a time of universal deceit - telling the truth is a revolutionary act';

var weirdString = compose(
  addDoubleColon,
  $beforeVowel,
  insertDash,
  reverseWords,
  invertedCase
);

console.log(`Total vowels and consonants: ${getCount(sentence)}`);
console.log(weirdString(sentence));
