const $button = $('#submit')
const $word = $('#text').val()
const $h3 = $('#msg-holder')
const $scoreHolder = $('#score')
const $timerHolder = $('#timer')
const $wordList = $('#used_words')
const $invalidWordList = $('#invalid_words')
const $text = $('#text')

let countdownInit = 0
let score = 0
let dict = []
let validWordList = []
let invalidWordList = []

$button.on('click', async function(e) {
    e.preventDefault();
    
    
    const $word = $('#text').val().toLowerCase();

    let resp = await axios.get('/evaluate', { params: {
        'word': `${$word}`
    }});
    
    if (resp.data['result'] === 'ok') {
        if (dict.includes($word)) {
            alert('Word already used');
    }
        else {
            $h3.text('Valid Word');
            $h3.removeClass('invalid').addClass('valid');
            console.log($word.length);
            score += $word.length;
            $scoreHolder.text(`Score: ${score}`);
            dict.push($word);
            validWordList.push($word);
            readableWords = validWordList.join(' ');
            $wordList.text(`Valid Used Words:  ${readableWords}`);
            $text.val('');
        }}
    else if (resp.data['result'] === 'not-on-board') {
        $h3.text('The word is not on the board');
        $h3.removeClass('valid').addClass('invalid');
        invalidWordList.push($word);
        readableInvalidWords = invalidWordList.join(' ');
        $invalidWordList.text(`Invalid Words: ${readableInvalidWords}`);
        $text.val('');
    }
    else {
        $h3.text('That is not a word');
        $h3.removeClass('valid').addClass('invalid');
        invalidWordList.push($word);
        readableInvalidWords = invalidWordList.join(' ');
        $invalidWordList.text(`Invalid Words: ${readableInvalidWords}`);
        $text.val('');
    }
    if (countdownInit === 0) {
    countdownInit++;
    countdown();
    setTimeout(disable, 60000);
    }

})

async function disable(){
    $button.prop('disabled', true);
    const resp = await axios.post('/played', {score: score});
}

function countdown(){
    let counter = 60;
    const interval = setInterval(() => {
        if (counter > 0) {
        counter --;
        $timerHolder.text(`Time Remaining: ${counter}`)}
    }, 1000);
}