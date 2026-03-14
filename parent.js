[14.03.2026 21:50] Sharipov N: import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
  getDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const schoolData = {
  "Qoraqalpog'iston Respublikasi": {
    "Nukus shahri": ["1-sonli maktab", "2-sonli maktab"],
    "Amudaryo tumani": ["5-sonli maktab"],
    "Beruniy tumani": ["12-sonli maktab"]
  },
  "Andijon viloyati": {
    "Andijon shahri": ["1-sonli maktab", "15-sonli maktab"],
    "Asaka tumani": ["9-sonli maktab", "27-sonli maktab"],
    "Baliqchi tumani": ["3-sonli maktab"]
  },
  "Buxoro viloyati": {
    "Buxoro shahri": ["4-sonli maktab", "10-sonli maktab"],
    "G'ijduvon tumani": ["7-sonli maktab"],
    "Kogon tumani": ["11-sonli maktab"]
  },
  "Jizzax viloyati": {
    "Jizzax shahri": ["2-sonli maktab"],
    "Zomin tumani": ["14-sonli maktab"],
    "G'allaorol tumani": ["6-sonli maktab"]
  },
  "Qashqadaryo viloyati": {
    "Qarshi shahri": ["1-sonli maktab", "8-sonli maktab"],
    "Shahrisabz tumani": ["5-sonli maktab"],
    "Koson tumani": ["9-sonli maktab"]
  },
  "Navoiy viloyati": {
    "Navoiy shahri": ["3-sonli maktab"],
    "Karmana tumani": ["12-sonli maktab"],
    "Xatirchi tumani": ["18-sonli maktab"]
  },
  "Namangan viloyati": {
    "Namangan shahri": ["6-sonli maktab", "21-sonli maktab"],
    "Chust tumani": ["13-sonli maktab"],
    "Pop tumani": ["4-sonli maktab"]
  },
  "Samarqand viloyati": {
    "Samarqand shahri": ["12-sonli maktab", "33-sonli maktab"],
    "Urgut tumani": ["7-sonli maktab", "14-sonli maktab"],
    "Pastdarg'om tumani": ["9-sonli maktab"]
  },
  "Surxondaryo viloyati": {
    "Termiz shahri": ["2-sonli maktab"],
    "Denov tumani": ["11-sonli maktab"],
    "Sherobod tumani": ["5-sonli maktab"]
  },
  "Sirdaryo viloyati": {
    "Guliston shahri": ["1-sonli maktab"],
    "Sirdaryo tumani": ["8-sonli maktab"],
    "Yangiyer shahri": ["3-sonli maktab"]
  },
  "Toshkent viloyati": {
    "Nurafshon shahri": ["4-sonli maktab"],
    "Chirchiq shahri": ["7-sonli maktab"],
    "Zangiota tumani": ["15-sonli maktab"]
  },
  "Farg'ona viloyati": {
    "Farg'ona shahri": ["9-sonli maktab"],
    "Qo'qon shahri": ["5-sonli maktab", "22-sonli maktab"],
    "So'x tumani": ["30-sonli maktab", "17-sonli maktab"]
  },
  "Xorazm viloyati": {
    "Urganch shahri": ["2-sonli maktab"],
    "Xiva tumani": ["6-sonli maktab"],
    "Hazorasp tumani": ["10-sonli maktab"]
  },
  "Toshkent shahri": {
    "Yunusobod tumani": ["45-sonli maktab", "58-sonli maktab", "81-sonli maktab"],
    "Chilonzor tumani": ["120-sonli maktab", "173-sonli maktab"],
    "Olmazor tumani": ["34-sonli maktab"]
  }
};

const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const authResult = document.getElementById("authResult");
const appResult = document.getElementById("appResult");
const messageResult = document.getElementById("messageResult");
const myApplications = document.getElementById("myApplications");
const userEmailBox = document.getElementById("userEmailBox");

const regionSelect = document.getElementById("region");
const districtSelect = document.getElementById("district");
const schoolSelect = document.getElementById("school");
const applicationForm = document.getElementById("applicationForm");

const studentPhoto = document.getElementById("studentPhoto");
const photoPreview = document.getElementById("photoPreview");
const lookupBtn = document.getElementById("lookupBtn");
const lookupId = document.getElementById("lookupId");
const lookupResult = document.getElementById("lookupResult");

const sendMessageBtn = document.getElementById("sendMessageBtn");
let studentPhotoData = "";
[14.03.2026 21:50] Sharipov N: function showBox(el, bg, color, text) {
  el.style.display = "block";
  el.style.background = bg;
  el.style.color = color;
  el.innerHTML = text;
}

function populateRegions() {
  regionSelect.innerHTML = '<option value="">Viloyatni tanlang</option>';
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

studentPhoto.addEventListener("change", function (e) {
  const file = e.target.files[0];

  if (!file) {
    studentPhotoData = "";
    photoPreview.innerHTML = "Rasm tanlanmagan";
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    studentPhotoData = reader.result;
    photoPreview.innerHTML = <img src="${studentPhotoData}" alt="Talaba rasmi">;
  };
  reader.readAsDataURL(file);
});

registerBtn.addEventListener("click", async () => {
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value.trim();

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    showBox(authResult, "#e8f5e9", "#1b5e20", "Ro‘yxatdan o‘tish muvaffaqiyatli.");
  } catch (e) {
    showBox(authResult, "#ffebee", "#b71c1c", e.message);
  }
});

loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  try {
    await signInWithEmailAndPassword(auth, email, password);
    showBox(authResult, "#e8f5e9", "#1b5e20", "Kirish muvaffaqiyatli.");
  } catch (e) {
    showBox(authResult, "#ffebee", "#b71c1c", e.message);
  }
});

logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
});

applicationForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = auth.currentUser;
  if (!user) {
    showBox(appResult, "#ffebee", "#b71c1c", "Avval akkauntga kiring.");
    return;
  }

  const data = {
    parentUid: user.uid,
    parentEmail: user.email,
    childName: document.getElementById("childName").value.trim(),
    birthDate: document.getElementById("birthDate").value,
    gender: document.getElementById("gender").value,
    region: document.getElementById("region").value,
    district: document.getElementById("district").value,
    school: document.getElementById("school").value,
    phone: document.getElementById("phone").value.trim(),
    address: document.getElementById("address").value.trim(),
    status: "Qabul qilindi",
    photo: studentPhotoData || "",
    createdAt: serverTimestamp()
  };
[14.03.2026 21:50] Sharipov N: try {
    const ref = await addDoc(collection(db, "applications"), data);
    showBox(
      appResult,
      "#e8f5e9",
      "#1b5e20",
      Ariza yuborildi.<br>ID: <strong>${ref.id}</strong>
    );

    applicationForm.reset();
    studentPhotoData = "";
    photoPreview.innerHTML = "Rasm tanlanmagan";
    districtSelect.disabled = true;
    schoolSelect.disabled = true;
    resetSelect(districtSelect, "Avval viloyatni tanlang");
    resetSelect(schoolSelect, "Avval tumanni tanlang");
    await loadMyApplications(user.uid);
  } catch (e) {
    showBox(appResult, "#ffebee", "#b71c1c", e.message);
  }
});

lookupBtn.addEventListener("click", async () => {
  const id = lookupId.value.trim();
  const user = auth.currentUser;

  if (!user) {
    showBox(lookupResult, "#ffebee", "#b71c1c", "Avval akkauntga kiring.");
    return;
  }

  if (!id) {
    showBox(lookupResult, "#ffebee", "#b71c1c", "Ariza ID kiriting.");
    return;
  }

  try {
    const snap = await getDoc(doc(db, "applications", id));

    if (!snap.exists()) {
      showBox(lookupResult, "#ffebee", "#b71c1c", "Ariza topilmadi.");
      return;
    }

    const item = snap.data();

    if (item.parentUid !== user.uid) {
      showBox(lookupResult, "#ffebee", "#b71c1c", "Bu ariza sizga tegishli emas.");
      return;
    }

    showBox(
      lookupResult,
      "#e8f5e9",
      "#1b5e20",
      
      Ariza topildi!<br><br>
      <strong>ID:</strong> ${snap.id}<br>
      <strong>Bola:</strong> ${item.childName}<br>
      <strong>Maktab:</strong> ${item.school}<br>
      <strong>Hudud:</strong> ${item.region}, ${item.district}<br>
      <strong>Holat:</strong> ${item.status}
      
    );
  } catch (e) {
    showBox(lookupResult, "#ffebee", "#b71c1c", e.message);
  }
});

sendMessageBtn.addEventListener("click", async () => {
  const user = auth.currentUser;
  if (!user) {
    showBox(messageResult, "#ffebee", "#b71c1c", "Avval akkauntga kiring.");
    return;
  }

  const name = document.getElementById("contactName").value.trim();
  const phone = document.getElementById("contactPhone").value.trim();
  const message = document.getElementById("contactMessage").value.trim();

  if (!name  !phone  !message) {
    showBox(messageResult, "#ffebee", "#b71c1c", "Iltimos, barcha maydonlarni to‘ldiring.");
    return;
  }

  try {
    await addDoc(collection(db, "messages"), {
      parentUid: user.uid,
      parentEmail: user.email,
      name,
      phone,
      message,
      createdAt: serverTimestamp()
    });

    showBox(messageResult, "#e8f5e9", "#1b5e20", "Xabaringiz yuborildi.");
    document.getElementById("contactName").value = "";
    document.getElementById("contactPhone").value = "";
    document.getElementById("contactMessage").value = "";
  } catch (e) {
    showBox(messageResult, "#ffebee", "#b71c1c", e.message);
  }
});

async function loadMyApplications(uid) {
  myApplications.innerHTML = "";
  const q = query(collection(db, "applications"), where("parentUid", "==", uid));
  const snap = await getDocs(q);

  if (snap.empty) {
    myApplications.innerHTML = 
      <div class="history-card">
        <h3>Hozircha ariza yo‘q</h3>
        <p>Yangi ariza yuborilgandan keyin shu yerda ko‘rinadi.</p>
      </div>
    ;
    return;
  }

  snap.forEach((docSnap) => {
    const item = docSnap.data();
    const card = document.createElement("div");
    card.className = "history-card";
    card.innerHTML = 
      <h3>${item.childName}</h3>
      <p><strong>ID:</strong> ${docSnap.id}</p>
      <p><strong>Hudud:</strong> ${item.region}, ${item.district}</p>
      <p><strong>Maktab:</strong> ${item.school}</p>
      <p><strong>Status:</strong> ${item.status}</p>
    ;
    myApplications.appendChild(card);
  });
}

onAuthStateChanged(auth, async (user) => {
[14.03.2026 21:50] Sharipov N: if (user) {
    logoutBtn.style.display = "inline-block";
    userEmailBox.textContent = "Kirish qilingan: " + user.email;
    await loadMyApplications(user.uid);
  } else {
    logoutBtn.style.display = "none";
    userEmailBox.textContent = "";
    myApplications.innerHTML = 
      <div class="history-card">
        <h3>Akkauntga kiring</h3>
        <p>Arizalarni ko‘rish uchun avval login qiling.</p>
      </div>
    ;
  }
});

populateRegions();
