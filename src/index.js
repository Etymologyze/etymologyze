const word = document.getElementById('get-word');
const verb = document.getElementById('ety');
const display = document.getElementById('display-text');

const api_key = "04826c02-e3a0-4592-9f25-c55b62a7f81a"; 

const requestOptions = {
  method: 'GET',
  redirect: 'follow'
}

const wordAndEt = {
  word: '',
  et: '',
  pronunciation: '',
  short: '',
  def: ''
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
    wordAndEt.et = data[0]?.et[0][1];
    wordAndEt.pronunciation = data[0]?.hwi?.prs[0]?.mw;
    wordAndEt.short = data[0]?.shortdef[0];
    wordAndEt.def = data[0]?.shortdef[1];

    display.innerHTML = `<h1>${wordAndEt.word}</h1><p>${wordAndEt.pronunciation}</p>
                         <p>1.) ${wordAndEt.short}<br>2.) ${wordAndEt.def}</p><br>
                         <em>${wordAndEt.et}</em>`;  

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
