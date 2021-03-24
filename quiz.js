// quiz vocabulaire

let readlineSync = require("readline-sync")

function print(a) {
  console.log({ a })
}

quiz_content = [
  {
    Q: "to speak",

    A: [
      { content: "parler", validation: true },
      { content: "écouter", validation: false }
    ]
  },
  {
    Q: "to give",

    A: [
      { content: "donner", validation: true },
      { content: "adapter", validation: false }
    ]
  },

  {
    Q: "to play",

    A: [
      { content: "jouer", validation: true },
      { content: "adapter", validation: false },
      { content: "parler", validation: false }
    ]
  },
  {
    Q: "to think",

    A: [
      { content: "parler", validation: false },
      { content: "réfléchir", validation: true },
      { content: "manger", validation: false }
    ]
  },
  {
    Q: "to believe",

    A: [
      { content: "parler", validation: false },
      { content: "croire", validation: true }
    ]
  }
]

const find_correct_answers = (quiz_content, index) => {
  q = quiz_content[index]
  final_correct = []

  for (const A of q["A"]) {
    if (A["validation"] === true) {
      final_correct.push(A["content"])
    }
  }

  return final_correct
}

const check_valid_input = (user_input, max_input) => {
  user_num = Number(user_input)
  if (isNaN(user_num) || user_num > max_input) {
    msg = `⚠️   Please type a number between 1 and ${max_input}
Your answer: `
    const user_input = readlineSync.question(msg)

    check_valid_input(user_input, max_input)
  } else {
    return user_input
  }
}

const quiz_play = quiz_content => {
  wrong_answers = []
  let msg_init = `\nWelcome to the FRENCH VOCABULARY GAME! 
  You're about to be asked ${quiz_content.length} questions.\n`
  console.log(msg_init)
  for (const [index, answer] of quiz_content.entries()) {
    // build the first part of the question_to_present
    let question_to_present = quiz_content[index]["Q"]
    msg = `Question ${index + 1}: ${question_to_present}\n`
    const valid_answers = []

    // build the second part of the question_to_present
    for (const [i, answer] of quiz_content[index]["A"].entries()) {
      msg += `\n(${i + 1}) ${answer["content"]}`
      if (answer["validation"] === true) {
        valid_answers.push(i + 1)
      }
    }

    msg += "\n\nYour answer:"
    const user_answer = readlineSync.question(msg)

    user_answer_num = Number(user_answer)
    max_input = quiz_content[index]["A"].length

    valid_answer_num = check_valid_input(user_answer_num, max_input)
    if (valid_answers.includes(valid_answer_num)) {
      msg = `
     
         =========================
         ✅ BRAVO! CORRECT ANSWER!
         =========================

         `
    } else {
      msg = `

         =========================
             ❌ WRONG ANSWER
         =========================

         `

      wrong_answers.push(index)
    }

    console.log(msg)
  }

  msg = ""
  if (wrong_answers.length == 0) {
    msg += "Congratulations! You didn't make any errors."
  } else {
    percentage_correct = 100 - (wrong_answers.length * 100) / quiz_content.length
    percentage_rounded = Math.round(percentage_correct)
    msg += `\nYou answered correctly ${percentage_rounded}% of the questions`

    msg += "\nYour errors:"

    for (const q_index of wrong_answers) {
      question = quiz_content[q_index]["Q"]
      msg += `
    ----------------------------------------
    \t Question ${q_index + 1}:\t\t${question}`
      correct_answers = find_correct_answers(quiz_content, q_index)
      msg += ` \n\t correct:\t\t${correct_answers.join("\n")}`
    }
  }

  console.log(msg)
}

quiz_play(quiz_content)
// for (const el of quiz_content) {
//   const question = quiz_content[0]["Q"]
//   const user_answer = readlineSync.question(question)
// }
