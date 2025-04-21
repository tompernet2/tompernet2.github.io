const skills = {
  langages: [
    { name: "HTML", category: "Langages", image: "img/logo/html.png" },
    { name: "CSS", category: "Langages", image: "img/logo/css.png" },
    { name: "JavaScript", category: "Langages", image: "img/logo/js.png" },
    { name: "PHP", category: "Langages", image: "img/logo/php.png" },
    { name: "Java", category: "Langages", image: "img/logo/java.png" },
    { name: "C++", category: "Langages", image: "img/logo/c++.png" },
    { name: "Python", category: "Langages", image: "img/logo/python.png" }
  ],
  frameworks: [
    { name: "Node.js", category: "Frameworks", image: "img/logo/node.png" },
    { name: "Vue.js", category: "Frameworks", image: "img/logo/vue.png" },
    { name: "Symfony", category: "Frameworks", image: "img/logo/symfony.png" },
    { name: "JavaFX", category: "Frameworks", image: "img/logo/javafx.png" },
    { name: "WordPress", category: "Frameworks", image: "img/logo/wordpress.png" }
  ],
  bibliotheques: [
    { name: "excel4node", category: "Bibliothèques", image: "img/logo/npm.png" },
    { name: "moment.js", category: "Bibliothèques", image: "img/logo/npm.png" },
    { name: "underscore.js", category: "Bibliothèques", image: "img/logo/npm.png" },
    { name: "wkhtmltopdf.js", category: "Bibliothèques", image: "img/logo/npm.png" }
  ],
  tools: [
    { name: "Git", category: "Outils", image: "img/logo/git.png" },
    { name: "GitHub", category: "Outils", image: "img/logo/github.png" },
    { name: "Figma", category: "Outils", image: "img/logo/figma.png" },
    { name: "NPM", category: "Outils", image: "img/logo/npm.png" },
    { name: "Scene Builder", category: "Outils", image: "img/logo/scenebuilder.png" },
  ]
};
  
  let currentSkillList = [...skills.langages, ...skills.frameworks, ...skills.tools, ...skills.bibliotheques];
  let currentSkillIndex = 0;
  
  function displaySkills(category = "all") {
    const grid = document.getElementById('skills-grid');
    grid.innerHTML = '';
  
    if (category === "all") {
      currentSkillList = [...skills.langages, ...skills.frameworks, ...skills.tools, ...skills.bibliotheques];
    } else {
      currentSkillList = skills[category] || [];
    }
  
    currentSkillList.forEach((skill, index) => {
      const card = document.createElement('div');
      card.className = 'skill-card';
      card.innerHTML = `
        <div class="indexCompetence">${index + 1}</div>
        <img src="${skill.image}" alt="${skill.name}">
        
        <div class="textCompetence">
          <div class="nomCompetence">${skill.name}</div>
          <div class="catogoryCompetence">${skill.category}</div>
        </div>
      `;
      
      card.addEventListener('click', () => {
        currentSkillIndex = index;
        updateBottomBar();
      });
      grid.appendChild(card);
    });
  
    if (currentSkillList.length > 0) {
      updateBottomBar();
    }
  }
  
  function updateBottomBar() {
    const skill = currentSkillList[currentSkillIndex];
    const infoDiv = document.getElementById('selected-skill-info');
    const imgElement = document.getElementById('selected-skill-image');
  
    imgElement.src = skill.image;
  
    infoDiv.innerHTML = `
    <img id="selected-skill-image" src="${skill.image}" alt="${skill.name}">
    <div class="info-barre">
        <div class="barreNom">${skill.name}</div>
        <div class="barreCategorie">${skill.category}</div>    
    </div>
    `;
  }
  
  function setupBottomControls() {
    document.getElementById('prev-btn').addEventListener('click', () => {
      if (currentSkillList.length === 0) return;
      currentSkillIndex = (currentSkillIndex - 1 + currentSkillList.length) % currentSkillList.length;
      updateBottomBar();
    });
  
    document.getElementById('next-btn').addEventListener('click', () => {
      if (currentSkillList.length === 0) return;
      currentSkillIndex = (currentSkillIndex + 1) % currentSkillList.length;
      updateBottomBar();
    });
  }
  
  function setupCategoryMenu() {
    const items = document.querySelectorAll('.menu-item');
    const pageTitle = document.querySelector('.page-title');
  
    items.forEach(item => {
      item.addEventListener('click', () => {
        items.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const category = item.getAttribute('data-category');
  
        const categoryName = item.textContent;
        pageTitle.textContent = categoryName;
  
        displaySkills(category);
      });
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    setupCategoryMenu();
    setupBottomControls();
    displaySkills();
  });
  