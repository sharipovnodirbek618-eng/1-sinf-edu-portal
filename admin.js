[14.03.2026 21:53] Sharipov N: import { auth, db, ADMIN_EMAIL } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getDocs,
  collection,
  updateDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const adminEmail = document.getElementById("adminEmail");
const adminPassword = document.getElementById("adminPassword");
const loginResult = document.getElementById("loginResult");
const loginSection = document.getElementById("loginSection");
const adminContent = document.getElementById("adminContent");

const appsTable = document.getElementById("appsTableBody");
const messagesTable = document.getElementById("messagesTableBody");
const searchInput = document.getElementById("searchInput");
const refreshBtn = document.getElementById("refreshBtn");

const totalCount = document.getElementById("totalCount");
const newCount = document.getElementById("newCount");
const reviewCount = document.getElementById("reviewCount");
const approvedCount = document.getElementById("approvedCount");

let applicationsCache = [];

function showLoginResult(bg, color, text) {
  loginResult.style.display = "block";
  loginResult.style.background = bg;
  loginResult.style.color = color;
  loginResult.innerHTML = text;
}

function statusClass(status) {
  if (status === "Qabul qilindi") return "status-qabul";
  if (status === "Ko'rib chiqilmoqda") return "status-korib";
  if (status === "Tasdiqlandi") return "status-tasdiq";
  return "status-bekor";
}

function updateCounters(applications) {
  totalCount.textContent = applications.length;
  newCount.textContent = applications.filter(a => a.status === "Qabul qilindi").length;
  reviewCount.textContent = applications.filter(a => a.status === "Ko'rib chiqilmoqda").length;
  approvedCount.textContent = applications.filter(a => a.status === "Tasdiqlandi").length;
}

async function loadApplications() {
  const snap = await getDocs(collection(db, "applications"));
  applicationsCache = [];
  snap.forEach((docSnap) => {
    applicationsCache.push({ id: docSnap.id, ...docSnap.data() });
  });
  renderApplications(searchInput.value);
}

function renderApplications(filter = "") {
  appsTable.innerHTML = "";

  const filtered = applicationsCache.filter((item) => {
    const text = (
      item.id + " " +
      (item.childName || "") + " " +
      (item.region || "") + " " +
      (item.district || "") + " " +
      (item.school || "") + " " +
      (item.parentEmail || "")
    ).toLowerCase();

    return text.includes(filter.toLowerCase());
  });

  if (!filtered.length) {
    appsTable.innerHTML = <tr><td colspan="9">Arizalar topilmadi.</td></tr>;
    updateCounters(applicationsCache);
    return;
  }

  filtered.forEach((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = 
      <td>${item.id}</td>
      <td>${item.photo ? <img src="${item.photo}" class="small-photo" alt="Rasm">` : "—"}</td>
      <td>${item.childName || ""}</td>
      <td>${item.region  ""}<br>${item.district  ""}</td>
      <td>${item.school || ""}</td>
      <td>${item.parentEmail || ""}</td>
      <td>${item.phone || ""}</td>
      <td>
        <span class="status-badge ${statusClass(item.status  "")}">${item.status  ""}</span>
        <br><br>
        <select class="action-select" data-id="${item.id}">
          <option value="Qabul qilindi" ${(item.status === "Qabul qilindi") ? "selected" : ""}>Qabul qilindi</option>
          <option value="Ko'rib chiqilmoqda" ${(item.status === "Ko'rib chiqilmoqda") ? "selected" : ""}>Ko'rib chiqilmoqda</option>
          <option value="Tasdiqlandi" ${(item.status === "Tasdiqlandi") ? "selected" : ""}>Tasdiqlandi</option>
[14.03.2026 21:53] Sharipov N: <option value="Bekor qilindi" ${(item.status === "Bekor qilindi") ? "selected" : ""}>Bekor qilindi</option>
        </select>
      </td>
      <td><button class="small-btn small-danger" data-id="${item.id}">O'chirish</button></td>
    ;
    appsTable.appendChild(tr);
  });

  updateCounters(applicationsCache);

  document.querySelectorAll(".action-select").forEach((el) => {
    el.addEventListener("change", async () => {
      await updateDoc(doc(db, "applications", el.dataset.id), {
        status: el.value
      });
      await loadApplications();
    });
  });

  document.querySelectorAll(".small-danger").forEach((el) => {
    el.addEventListener("click", async () => {
      const ok = confirm("Bu arizani o‘chirmoqchimisiz?");
      if (!ok) return;
      await deleteDoc(doc(db, "applications", el.dataset.id));
      await loadApplications();
    });
  });
}

async function loadMessages() {
  messagesTable.innerHTML = "";
  const snap = await getDocs(collection(db, "messages"));

  if (snap.empty) {
    messagesTable.innerHTML = <tr><td colspan="4">Hozircha xabar yo‘q.</td></tr>;
    return;
  }

  snap.forEach((docSnap) => {
    const item = docSnap.data();
    const tr = document.createElement("tr");
    tr.innerHTML = 
      <td>${item.name || ""}</td>
      <td>${item.phone || ""}</td>
      <td>${item.parentEmail || ""}</td>
      <td>${item.message || ""}</td>
    `;
    messagesTable.appendChild(tr);
  });
}

loginBtn.addEventListener("click", async () => {
  const email = adminEmail.value.trim();
  const password = adminPassword.value.trim();

  if (email !== ADMIN_EMAIL) {
    showLoginResult("#ffebee", "#b71c1c", "Bu email admin email emas.");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    showLoginResult("#e8f5e9", "#1b5e20", "Admin kabinetiga kirildi.");
  } catch (e) {
    showLoginResult("#ffebee", "#b71c1c", e.message);
  }
});

logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
});

searchInput.addEventListener("input", () => {
  renderApplications(searchInput.value);
});

refreshBtn.addEventListener("click", async () => {
  await loadApplications();
  await loadMessages();
});

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    loginSection.style.display = "flex";
    adminContent.style.display = "none";
    logoutBtn.style.display = "none";
    return;
  }

  if (user.email !== ADMIN_EMAIL) {
    await signOut(auth);
    return;
  }

  loginSection.style.display = "none";
  adminContent.style.display = "block";
  logoutBtn.style.display = "inline-block";
  await loadApplications();
  await loadMessages();
});
