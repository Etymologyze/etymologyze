const word = document.getElementById('get-word');
const verb = document.getElementById('ety');
const display = document.getElementById('display-text');

const api_key = "04826c02-e3a0-4592-9f25-c55b62a7f81a"; 

const requestOptions = {
  method: 'GET',
  redirect: 'follow'
}

const wordAndEt = {
  // need to change this for reasons relating to readability...
  word: '',
  et: '',
  pronunciation: '',
  short: '',
  def: ''
}

const cleanOutput = new RegExp("{it}", "g")
const cleanOutputTwo = new RegExp("{/\it}", "g")

const getWord = async(input) => {
  input = word.value;
  const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${input}?key=${api_key}`;
  
  try {

    const response = await fetch(url, requestOptions);
    const result = await response.json();
    const data = await result;
    
    console.log(data)
    
    // the following code is horrible and i apologize to future us for having to maintain this. please forgive me for assaulting your eyeballs.
    wordAndEt.word = data[0].hwi.hw;
    wordAndEt.et = data[0]?.et[0][1];
    wordAndEt.pronunciation = data[0]?.hwi?.prs[0]?.mw;
    wordAndEt.short = data[0]?.shortdef[0];
    wordAndEt.def = data[0]?.shortdef[1];

    wordAndEt.word = wordAndEt.word.replaceAll(cleanOutput, '<em>');
    wordAndEt.et = wordAndEt.et.replaceAll(cleanOutput, '<em>');
    wordAndEt.pronunciation = wordAndEt.pronunciation.replaceAll(cleanOutput, '<em>');
    wordAndEt.short = wordAndEt.short.replaceAll(cleanOutput, '<em>');
    wordAndEt.def = wordAndEt.def.replaceAll(cleanOutput, '<em>');

    wordAndEt.word = wordAndEt.word.replaceAll(cleanOutputTwo, '</em>');
    wordAndEt.et = wordAndEt.et.replaceAll(cleanOutputTwo, '</em>');
    wordAndEt.pronunciation = wordAndEt.pronunciation.replaceAll(cleanOutputTwo, '</em>');
    wordAndEt.short = wordAndEt.short.replaceAll(cleanOutputTwo, '</em>');
    wordAndEt.def = wordAndEt.def.replaceAll(cleanOutputTwo, '</em>');


    display.innerHTML = `<h1>${wordAndEt.word}</h1><p>${wordAndEt.pronunciation}</p>
                         <p>1.) ${wordAndEt.short}<br>2.) ${wordAndEt.def}</p><br>
                         <p>${wordAndEt.et}</p>`;  

    return wordAndEt;

  } catch (err) {
    
    console.log(err);
  }
}

// I am glad I wrapped it in a function, though. I may move it to another file and import it until I have time to clean it up...
const handleKeySubmit = (e) => {
  if (e.key === 'Enter') {
    getWord();
  }
  return false;
}

const handleSubmit = () => {
  getWord();
}

word.addEventListener('keypress', handleKeySubmit, false);
verb.addEventListener('click', handleSubmit, false);
