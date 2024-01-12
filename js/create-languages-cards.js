const languages = [
  // {
  //   name: "html",
  //   level: "",
  //   icon_src: "html5",
  // },
  // {
  //   name: "Css",
  //   level: "",
  //   icon_src: "css",
  // },
  // {
  //   name: "Tailwind Css",
  //   level: "",
  //   icon_src: "tailwind",
  // },
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
    name: "React js",
    level: "",
    icon_src: "react",
  },
  { name: "break" },

  {
    name: "Express js",
    level: "",
    icon_src: "express",
  },
  {
    name: "Mongoose",
    level: "",
    icon_src: "mongoose",
  },

  // {
  //   name: "Angular js",
  //   level: "basises",
  //   icon_src: "angular",
  // },
  // {
  //   name: "PHP",
  //   level: "bases",
  //   icon_src: "php",
  // },
  {
    name: "SQL",
    level: "",
    icon_src: "sql",
  },
  { name: "break" },
  {
    name: "Git",
    level: "",
    icon_src: "git",
  },
  {
    name: "Figma",
    level: "",
    icon_src: "figma",
  },
];

const wrapper = document.querySelector(".languages-wrapper");
languages.forEach((language) => {
  if (language.name === "break")
    return (wrapper.innerHTML += '<div class="break"></div>');
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
