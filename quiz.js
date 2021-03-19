let readlineSync = require("readline-sync")

function print(a) {
  console.log({ a })
}

quiz_content = [
  {
    Q: "Question 1: Le C++ est un:",

    A: [
      { content: "langage", validation: true },
      { content: "compilateur", validation: false }
    ]
  },
  {
    Q: "Question 2: TypeScript est une évolution de Javascript:",

    A: [
      { content: "Vrai", validation: true },
      { content: "Faux", validation: false }
    ]
  }
]

for (const [index, answer] of quiz_content.entries()) {
}

let question_to_present = quiz_content[0]["Q"]
const valid_answers = []

for (const [index, answer] of quiz_content[0]["A"].entries()) {
  print(answer["content"])

  question_to_present += `\n${index + 1}. ${answer["content"]}`
  if (answer["validation"] === true) {
    valid_answers.push(index + 1)
  }
}

question_to_present += "\n\nYour answer:"
const user_answer = readlineSync.question(question_to_present)
user_answer_num = Number(user_answer)
console.log(valid_answers, user_answer_num)
if (valid_answers.includes(user_answer_num)) {
  console.log("Correct answer")
} else {
  console.log("Wrong answer")
}

// for (const el of quiz_content) {
//   const question = quiz_content[0]["Q"]
//   const user_answer = readlineSync.question(question)
// }
