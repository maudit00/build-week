
// da tenere 
const proceedButton = document.getElementById("startButton");
const header = document.querySelector(".header");
let footer = document.querySelector(".footer");
let questionFooter = document.getElementById("questionFooter");
const welcomePage = document.getElementById("page1");
questionFooter.style.display = "none";
 const resultPage = document.getElementById("page3");
 const feedbackPage = document.getElementById('page4')
 resultPage.style.display = 'none'
feedbackPage.style.display ='none'
let page2 = document.getElementById("page2");


//da tenere 
proceedButton.addEventListener("click", () => {
  welcomePage.remove();
  cerchio.classList.remove("hidden");
  questionFooter.style.display = "flex";
  questionFooter.style.width = "100%";
  questionFooter.style.justifyContent = "space-between";
  const wrap = document.getElementById("contentWrap");
  let count = 0;
  start(count);
  cloneTemplate(wrap);
});

function start(count) {
  fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy")
    .then((res) => res.json())
    .then((domande) => {
      let easy = domande.results; //tutte le domande in questo array
      let answersGiven = [];
      correctAnswer(easy);
      showQuestions(count);
      function showQuestions(count) {
        const nextButton = document.getElementById("nextButton");
        const wrap = document.getElementById("contentWrap");
        const answerArea =
          document.querySelector("#contentWrap").children[0].lastElementChild;
        let tempCount = count + 1;
        footer.firstElementChild.innerHTML = `Question ${tempCount}<span class="pink"> / ${easy.length}</span>`;
        // disableButton(nextButton)
        questionTitles(easy, count, wrap);
        answerMaker(easy, count, answerArea);
        const answersBtn = document.querySelectorAll(".answer");
        answersBtn.forEach((btn) => {
          btn.addEventListener("click", () => {
            btn.classList.toggle("selectedAnswer");
            let selectedAnswer = document.querySelectorAll(".selectedAnswer");
            console.log(selectedAnswer);
            selectedAnswer.forEach((item) => {
              answersGiven.push(item);
            });
          });
        });
    }
    
    
//da tenere 
        nextButton.addEventListener("click", () => {
          count++;
          if (count == easy.length) {
          page2.remove()
          resultPage.style.display = 'block'
          cerchio.classList.add('hidden')
          footer.style.display = 'block'

          } else {
            showQuestions(count);
          }
        });
      }
    )};


function cloneTemplate(target) {
  const temp = document.getElementById("questionsTemplate");
  const content = temp.content.cloneNode(true);
  target.append(content);
const proceedButton = document.getElementById('proceed')
const header = document.querySelector('.header')
const footer = document.querySelector('.footer')
header.style.display = 'none'
footer.style.display = 'none'

proceedButton.addEventListener('click', () => {
    header.style.display = 'flex'
    footer.style.display = 'flex'
    const wrap = document.getElementById('contentWrap')
    let count = 0
    start(count)
    cloneTemplate(wrap)
})


function start(count) {
    fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy')
        .then(res => res.json())
        .then(domande => {
            let easy = domande.results //tutte le domande in questo array
            let answersGiven = []
            correctAnswer(easy)
            showQuestions(count)
            function showQuestions(count) {
                const nextButton = document.getElementById('nextButton')
                const wrap = document.getElementById('contentWrap')
                const answerArea = document.querySelector('#contentWrap').children[0].lastElementChild
                let tempCount = count + 1
                footer.firstElementChild.innerHTML = `Question ${tempCount}<span class="pink"> / ${easy.length}</span>`
                // disableButton(nextButton)
                questionTitles(easy, count, wrap)
                answerMaker(easy, count, answerArea)
                const answersBtn = document.querySelectorAll('.answer')
                answersBtn.forEach(btn => {
                    btn.addEventListener('click', () => {
                        btn.classList.toggle('selectedAnswer')
                        let selectedAnswer = document.querySelectorAll('.selectedAnswer')
                        console.log(selectedAnswer);
                        selectedAnswer.forEach(item => {
                            answersGiven.push(item)
                        })
                    })
                })
                console.log(answersGiven);

                nextButton.addEventListener('click', () => {
                        count++
                      0
                        if (count == easy.length) {
                            alert('finito')
                        } else {
                            showQuestions(count)
                            
                        }
                })
            }
        })

}




function cloneTemplate(target) {
    const temp = document.getElementById('questionsTemplate')
    const content = temp.content.cloneNode(true)
    target.append(content)
}


function clearArea(element) {
    var nodes = element.childNodes;
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        // if it's a text node, remove it
        if (node.nodeType == Node.TEXT_NODE) {
            node.parentNode.removeChild(node);
            i--; // have to update our incrementor since we just removed a node from childNodes
        } else
            // if it's an element, repeat this process
            if (node.nodeType == Node.ELEMENT_NODE) {
                clearArea(node);
            }
    }
}


function cloneSection(index, target, temp) {
    const children = temp.content.children[index].cloneNode(true)
    target.append(children)
}

function questionTitles(questions, index, target) {
    let firstTitle = target.children[0].children[0]
    let secondTitle = target.children[0].children[1]
    let question = questions[index].question.split(' ')
    let first = question.slice(0, question.length / 2).join(' ')
    let second = question.slice(question.length / 2, question.length).join(' ')
    firstTitle.innerHTML = first
    secondTitle.innerHTML = second
}

function answerMaker(questions, index, target) {
    target.innerHTML = ''
    let arr = [questions[index]['correct_answer']]
    arr = arr.concat(questions[index]['incorrect_answers'])
    shuffleArray(arr)
    for (let i = 0; i <= arr.length - 1; i++) {
        let answer = document.createElement('button')
        answer.classList.add('answer')
        answer.innerHTML = arr[i]
        answer.htmlFor = `answer${i}`
        target.append(answer)
    }
}

function correctAnswer(questions) {
    let correctArr = []
    questions.forEach(item => {
        correctArr.push(item['correct_answer'])
    })
    return correctArr
}

function clearArea(element) {
  var nodes = element.childNodes;
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    // if it's a text node, remove it
    if (node.nodeType == Node.TEXT_NODE) {
      node.parentNode.removeChild(node);
      i--; // have to update our incrementor since we just removed a node from childNodes
    }
    // if it's an element, repeat this process
    else if (node.nodeType == Node.ELEMENT_NODE) {
      clearArea(node);
    }
  }
}

function cloneSection(index, target, temp) {
  const children = temp.content.children[index].cloneNode(true);
  target.append(children);
}

function questionTitles(questions, index, target) {
  let firstTitle = target.children[0].children[0];
  let secondTitle = target.children[0].children[1];
  let question = questions[index].question.split(" ");
  let first = question.slice(0, question.length / 2).join(" ");
  let second = question.slice(question.length / 2, question.length).join(" ");
  firstTitle.innerHTML = first;
  secondTitle.innerHTML = second;
}

function answerMaker(questions, index, target) {
  target.innerHTML = "";
  let arr = [questions[index]["correct_answer"]];
  arr = arr.concat(questions[index]["incorrect_answers"]);
  shuffleArray(arr);
  for (let i = 0; i <= arr.length - 1; i++) {
    let answer = document.createElement("button");
    answer.classList.add("answer");
    answer.innerHTML = arr[i];
    answer.htmlFor = `answer${i}`;
    target.append(answer);
  }
}

function correctAnswer(questions) {
  let correctArr = [];
  questions.forEach((item) => {
    correctArr.push(item["correct_answer"]);
  });
  return correctArr;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function disableButton(btn) {
  btn.disabled = true;
}
function activateButton(btn) {
  btn.disabled = false;
}

