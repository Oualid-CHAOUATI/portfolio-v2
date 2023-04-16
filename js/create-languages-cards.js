const languages = [
  {
    name: "html5",
    level: "",
    icon_src: "html5",
  },
  {
    name: "Css 3",
    level: "",
    icon_src: "css",
  },
  {
    name: "Javascript",
    level: "",
    icon_src: "javascript",
  },
  {
    name: "Typescript",
    level: "",
    icon_src: "typescript",
  },
  {
    name: "Tailwind Css",
    level: "",
    icon_src: "tailwind",
  },
  {
    name: "React js",
    level: "",
    icon_src: "react",
  },

  {
    name: "Angular js",
    level: "basics",
    icon_src: "angular",
  },
  {
    name: "PHP",
    level: "basics",
    icon_src: "php",
  },
  {
    name: "SQL",
    level: "",
    icon_src: "sql",
  },

  {
    name: "Figma",
    level: "",
    icon_src: "figma",
  },
  {
    name: "Git",
    level: "",
    icon_src: "git",
  },
];

const wrapper = document.querySelector(".languages-wrapper");
languages.forEach((language) => {
  wrapper.innerHTML += `  <div class="language-wrapper">

<div class="language-sub-wrapper">
    
    <div class="top">
   
    <span></span>
    <span></span>
    <span></span>
</div>


<img src="assets/svgs/langages/tabler-icon-${language.icon_src}.svg" alt="">

</div>
<p class="language-name-level-wrapper">
<span class="language-name">${language.name}</span>
<span class="language-level">${language.level}</span>
</p>
</div>`;
});
