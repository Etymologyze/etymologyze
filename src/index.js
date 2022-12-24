const word = document.getElementById('get-word');
const verb = document.getElementById('ety');
const display = document.getElementById('display-text');

const api_key = process.env.API_KEY;

const requestOptions = {
  method: 'GET',
  redirect: 'follow'
}

const wordAndEt = {
  word: '',
  et: ''
}

const getWord = async(input) => {
  input = word.value;
  const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${input}?key=${api_key}`;
  
  try {

    const response = await fetch(url, requestOptions);
    const result = await response.json();
    const data = await result;
    
    console.log(data)
    
    wordAndEt.word = data[0].hwi.hw;
    wordAndEt.et = data[0].et[0][1];

    display.innerHTML = `<h1>${wordAndEt.word}</h1><br><em>${wordAndEt.et}</em>`;  

    return wordAndEt;

  } catch (err) {
    
    console.log(err);
  }
}

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
