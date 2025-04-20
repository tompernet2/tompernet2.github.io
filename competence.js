const skills = {
    langages: [
      { name: "JavaScript", category: "langages", image: "img/logo.png" },
      { name: "Python", category: "langages", image: "img/logo.png" },
    ],
    frameworks: [
      { name: "React", category: "frameworks", image: "img/logo.png" },
      { name: "Vue.js", category: "frameworks", image: "img/logo.png" },
    ],
    tools: [
      { name: "Git", category: "tools", image: "img/logo.png" },
      { name: "Docker", category: "tools", image: "img/logo.png" },
    ]
  };
  
  let currentSkillList = [...skills.langages, ...skills.frameworks, ...skills.tools];
  let currentSkillIndex = 0;
  
  function displaySkills(category = "all") {
    const grid = document.getElementById('skills-grid');
    grid.innerHTML = '';
  
    if (category === "all") {
      currentSkillList = [...skills.langages, ...skills.frameworks, ...skills.tools];
    } else {
      currentSkillList = skills[category] || [];
    }
  
    currentSkillList.forEach((skill, index) => {
      const card = document.createElement('div');
      card.className = 'skill-card';
      card.innerHTML = `
        <img src="${skill.image}" alt="${skill.name}">
        <div class="nomCompetence">${skill.name}</div>
        <div class="catogoryCompetence">${skill.category}</div>
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
        <div>${skill.name}</div>
        <div>${skill.category}</div>    
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
  