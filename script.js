const SUPABASE_URL = "https://crnhxazqgoekkvsllpdx.supabase.co";
const SUPABASE_KEY = "sb_publishable_GZVbqF23r-iLovNyOa5UcQ__TpFmZFM";

const db = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


/* =========================
   القائمة
========================= */

const menuBtn = document.getElementById("menuBtn");
const menu = document.querySelector("nav");

if (menuBtn && menu) {
  menuBtn.onclick = () => {
    menu.classList.toggle("active");
  };
}


/* =========================
   الخدمات
========================= */

async function loadServices() {

  const { data, error } = await db
    .from("services")
    .select("*")
    .eq("active", true)
    .order("id");

  if (error) {
    console.error("خطأ في تحميل الخدمات:", error);
    return;
  }

  const container =
    document.getElementById("servicesContainer");

  if (!container) return;

  container.innerHTML = "";

  data.forEach(service => {

    container.innerHTML += `

      <div class="service-card">

        <h3>${service.name || ""}</h3>

        <p>
          ${service.description || ""}
        </p>

        <div class="price">
          ${service.price || "اتصل لمعرفة السعر"} د.ل
        </div>

        <br>

        <a
          class="btn primary"
          href="https://wa.me/218920512607?text=${encodeURIComponent(
            "السلام عليكم، أريد الاستفسار عن " +
            (service.name || "")
          )}"
          target="_blank"
        >
          اطلب الآن
        </a>

      </div>

    `;
  });
}


/* =========================
   الأسعار
========================= */

async function loadPrices() {

  const { data, error } = await db
    .from("services")
    .select("*")
    .eq("active", true)
    .order("id");

  if (error) {
    console.error("خطأ في تحميل الأسعار:", error);
    return;
  }

  const container =
    document.getElementById("pricesContainer");

  if (!container) return;

  container.innerHTML = "";

  data.forEach(service => {

    container.innerHTML += `

      <div class="price-row">

        <strong>
          ${service.name || ""}
        </strong>

        <span>
          ${service.price || "حسب الطلب"} د.ل
        </span>

      </div>

    `;
  });
}


/* =========================
   معرض الصور
========================= */

async function loadGallery() {

  const { data, error } = await db
    .from("gallery")
    .select("id, title, image_url")
    .order("id", { ascending: false });

  if (error) {
    console.error("خطأ في تحميل معرض الصور:", error);
    return;
  }

  console.log("صور المعرض:", data);

  const container =
    document.getElementById("galleryContainer");

  if (!container) {
    console.error("لم يتم العثور على galleryContainer");
    return;
  }

  container.innerHTML = "";

  if (!data || data.length === 0) {
    container.innerHTML = `
      <p class="empty-gallery">
        لا توجد صور في معرض الأعمال حاليًا.
      </p>
    `;
    return;
  }

  data.forEach(item => {

    if (!item.image_url) return;

    container.innerHTML += `

      <div class="gallery-item">

        <img
          src="${item.image_url}"
          alt="${item.title || "حديد للتغليف والحماية"}"
          loading="lazy"
        >

        ${
          item.title
            ? `<h3>${item.title}</h3>`
            : ""
        }

      </div>

    `;
  });
}


/* =========================
   تشغيل الموقع
========================= */

loadServices();
loadPrices();
loadGallery();
