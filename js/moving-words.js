let wrappers = document.querySelectorAll(".moving-word:not(.not-text)");

wrappers.forEach((wrapper) => {
  console.log(wrapper);

  let movingWordTxt = wrapper.textContent.trim();
  let words = movingWordTxt.split(" ");

  words = words.map((word) => {
    let letters = word.split("");

    letters = letters.map(
      (letter) => `
    
    <span class='moving-buddy-wrapper'>
    
    <span class="letter moving-buddy">${letter}</span>
    </span>
    `
    );
    word = letters.join("");
    return `<div>${word}</div>`;
  });

  words = words.join("<span class='empty moving-buddy'></span>");

  wrapper.innerHTML = words;

  let letters = document.querySelectorAll(".letter");

  letters.forEach((letter, index) => {
    letter.style.animationDelay = -50 * index + "ms";
  });
});
