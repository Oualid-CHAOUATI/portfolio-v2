const circularText = document.querySelector("#circular-text");
const words = circularText.innerHTML.split(" ");

const letters = [];

words.forEach((word, i, words) => {
  const length = words.length;

  const wordLetters = word.split("").map(
    (letter) => `<div class='letter-circular'>
    <span>
    
    ${letter}
    </span>
    
    </div>`
  );
  letters.push(...wordLetters);
  if (i < length)
    letters.push("<div class='letter-circular empty-letter'></div>");
});

circularText.innerHTML = letters.join("");
const spans = circularText
  .querySelectorAll("div")
  .forEach((span, i) => span.style.setProperty("--number", i));
