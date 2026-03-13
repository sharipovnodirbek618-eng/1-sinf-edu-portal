const regionSelect = document.getElementById("region");
const districtSelect = document.getElementById("district");
const schoolSelect = document.getElementById("school");
const admissionForm = document.getElementById("admissionForm");
const resultBox = document.getElementById("result");
const lookupBtn = document.getElementById("lookupBtn");
const showAllBtn = document.getElementById("showAllBtn");
const lookupId = document.getElementById("lookupId");
const lookupResult = document.getElementById("lookupResult");
const historyGrid = document.getElementById("historyGrid");

const STORAGE_KEY = "edu_portal_applications";

function populateRegions() {
  Object.keys(schoolData).forEach((region) => {
    const option = document.createElement("option");
    option.value = region;
    option.textContent = region;
    regionSelect.appendChild(option);
  });
}

function resetSelect(select, placeholder) {
  select.innerHTML = "";
  const option = document.createElement("option");
  option.value = "";
  option.textContent = placeholder;
  select.appendChild(option);
}

regionSelect.addEventListener("change", function () {
  const region = this.value;

  resetSelect(districtSelect, region ? "Tumanni tanlang" : "Avval viloyatni tanlang");
  resetSelect(schoolSelect, "Avval tumanni tanlang");
  schoolSelect.disabled = true;

  if (!region) {
    districtSelect.disabled = true;
    return;
  }

  districtSelect.disabled = false;

  Object.keys(schoolData[region]).forEach((district) => {
    const option = document.createElement("option");
    option.value = district;
    option.textContent = district;
    districtSelect.appendChild(option);
  });
});

districtSelect.addEventListener("change", function () {
  const region = regionSelect.value;
  const district = this.value;

  resetSelect(schoolSelect, district ? "Maktabni tanlang" : "Avval tumanni tanlang");

  if (!region || !district) {
    schoolSelect.disabled = true;
    return;
  }

  schoolSelect.disabled = false;

  schoolData[region][district].forEach((school) => {
    const option = document.createElement("option");
    option.value = school;
    option.textContent = school;
    schoolSelect.appendChild(option);
  });
});

function getApplications() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function saveApplications(applications) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
}

function renderHistory() {
  const applications = getApplications().slice().reverse();
  historyGrid.innerHTML = "";

  if (!applications.length) {
    historyGrid.innerHTML = `
      <div class="history-card">
        <h3>Hozircha ariza yo'q</h3>
        <p>Yangi ariza yuborilgandan keyin shu yerda ko'rinadi.</p>
      </div>
    `;
    return;
  }

  applications.slice(0, 6).forEach((item) => {
    const card = document.createElement("div");
    card.className = "history-card";
    card.innerHTML = `
      <h3>${item.applicationId}</h3>
      <p><strong>Bola:</strong> ${item.childName}</p>
      <p><strong>Hudud:</strong> ${item.region}, ${item.district}</p>
      <p><strong>Maktab:</strong> ${item.school}</p>
      <p><strong>Holat:</strong> Qabul qilindi</p>
      <small>${item.createdAt}</small>
    `;
    historyGrid.appendChild(card);
  });
}

admissionForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const application = {
    applicationId: "EDU-" + Math.floor(100000 + Math.random() * 900000),
    region: document.getElementById("region").value.trim(),
    district: document.getElementById("district").value.trim(),
    school: document.getElementById("school").value.trim(),
    childName: document.getElementById("childName").value.trim(),
    birthDate: document.getElementById("birthDate").value,
    gender: document.getElementById("gender").value.trim(),
    parentName: document.getElementById("parentName").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    address: document.getElementById("address").value.trim(),
    message: document.getElementById("message").value.trim(),
    createdAt: new Date().toLocaleString("uz-UZ")
  };

  if (
    !application.region ||
    !application.district ||
    !application.school ||
    !application.childName ||
    !application.birthDate ||
    !application.gender ||
    !application.parentName ||
    !application.phone ||
    !application.address
  ) {
    resultBox.style.display = "block";
    resultBox.style.background = "#ffebee";
    resultBox.style.color = "#b71c1c";
    resultBox.innerHTML = "Iltimos, barcha majburiy maydonlarni to'ldiring.";
    return;
  }

  const phoneRegex = /^[+]?[0-9\s-]{9,20}$/;
  if (!phoneRegex.test(application.phone)) {
    resultBox.style.display = "block";
    resultBox.style.background = "#ffebee";
    resultBox.style.color = "#b71c1c";
    resultBox.innerHTML = "Telefon raqamini to'g'ri kiriting.";
    return;
  }

  const applications = getApplications();
  applications.push(application);
  saveApplications(applications);

  resultBox.style.display = "block";
  resultBox.style.background = "#e8f5e9";
  resultBox.style.color = "#1b5e20";
  resultBox.innerHTML = `
    Ariza muvaffaqiyatli yuborildi!<br><br>
    Ariza raqami: <strong>${application.applicationId}</strong><br>
    Viloyat: ${application.region}<br>
    Tuman / shahar: ${application.district}<br>
    Maktab: ${application.school}<br>
    Bola: ${application.childName}<br>
    Tug'ilgan sana: ${application.birthDate}<br>
    Jinsi: ${application.gender}<br>
    Mas'ul ota-ona: ${application.parentName}<br>
    Telefon: ${application.phone}<br>
    Manzil: ${application.address}<br>
    Qo'shimcha ma'lumot: ${application.message || "Kiritilmagan"}
  `;

  admissionForm.reset();
  districtSelect.disabled = true;
  schoolSelect.disabled = true;
  resetSelect(districtSelect, "Avval viloyatni tanlang");
  resetSelect(schoolSelect, "Avval tumanni tanlang");
  renderHistory();
  resultBox.scrollIntoView({ behavior: "smooth", block: "center" });
});

lookupBtn.addEventListener("click", function () {
  const id = lookupId.value.trim().toUpperCase();
  const applications = getApplications();
  const found = applications.find((item) => item.applicationId === id);

  lookupResult.style.display = "block";

  if (!id) {
    lookupResult.style.background = "#ffebee";
    lookupResult.style.color = "#b71c1c";
    lookupResult.innerHTML = "Avval ariza raqamini kiriting.";
    return;
  }

  if (!found) {
    lookupResult.style.background = "#ffebee";
    lookupResult.style.color = "#b71c1c";
    lookupResult.innerHTML = "Bunday ariza topilmadi.";
    return;
  }

  lookupResult.style.background = "#e8f5e9";
  lookupResult.style.color = "#1b5e20";
  lookupResult.innerHTML = `
    Ariza topildi!<br><br>
    Ariza raqami: <strong>${found.applicationId}</strong><br>
    Bola: ${found.childName}<br>
    Viloyat: ${found.region}<br>
    Tuman / shahar: ${found.district}<br>
    Maktab: ${found.school}<br>
    Holat: Qabul qilindi<br>
    Sana: ${found.createdAt}
  `;
});

showAllBtn.addEventListener("click", function () {
  document.getElementById("tarix").scrollIntoView({ behavior: "smooth" });
});

populateRegions();
renderHistory();
