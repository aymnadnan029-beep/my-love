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
  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
}


/* =========================
   الخدمات
========================= */

async function loadServices() {

  const container = document.getElementById("servicesContainer");

  if (!container) return;

  try {

    const { data, error } = await db
      .from("services")
      .select("*")
      .eq("active", true)
      .order("id");

    if (error) {
      console.error("SERVICES ERROR:", error);

      container.innerHTML = `
        <p>تعذر تحميل الخدمات.</p>
      `;

      return;
    }

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

  } catch (err) {

    console.error("SERVICES CRASH:", err);

  }

}


/* =========================
   الأسعار
========================= */

async function loadPrices() {

  const container = document.getElementById("pricesContainer");

  if (!container) return;

  try {

    const { data, error } = await db
      .from("services")
      .select("*")
      .eq("active", true)
      .order("id");

    if (error) {

      console.error("PRICES ERROR:", error);

      return;
    }

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

  } catch (err) {

    console.error("PRICES CRASH:", err);

  }

}


/* =========================
   معرض الصور
========================= */

async function loadGallery() {

  const container =
    document.getElementById("galleryContainer");

  if (!container) {

    console.error(
      "لم يتم العثور على galleryContainer"
    );

    return;
  }


  try {

    console.log("بدأ تحميل معرض الصور...");


    const { data, error } = await db
      .from("gallery")
      .select("id, title, image_url")
      .order("id", {
        ascending: false
      });


    if (error) {

      console.error(
        "GALLERY ERROR:",
        error
      );

      container.innerHTML = `
        <div class="gallery-error">

          <h3>تعذر تحميل معرض الأعمال</h3>

          <p>
            يوجد خطأ في الاتصال بقاعدة البيانات.
          </p>

        </div>
      `;

      return;
    }


    console.log(
      "GALLERY DATA:",
      data
    );


    container.innerHTML = "";


    if (!data || data.length === 0) {

      container.innerHTML = `
        <p>
          لا توجد صور في معرض الأعمال حاليًا.
        </p>
      `;

      return;
    }


    data.forEach(item => {

      if (!item.image_url) {

        console.warn(
          "الصورة بدون رابط:",
          item
        );

        return;
      }


      const galleryItem =
        document.createElement("div");

      galleryItem.className =
        "gallery-item";


      const image =
        document.createElement("img");

      image.src =
        item.image_url;

      image.alt =
        item.title ||
        "حديد للتغليف والحماية";

      image.loading =
        "lazy";


      image.onerror = () => {

        console.error(
          "فشل تحميل الصورة:",
          item.image_url
        );

        galleryItem.innerHTML = `
          <p>
            تعذر تحميل هذه الصورة
          </p>
        `;

      };


      galleryItem.appendChild(image);


      if (item.title) {

        const title =
          document.createElement("h3");

        title.textContent =
          item.title;

        galleryItem.appendChild(title);

      }


      container.appendChild(
        galleryItem
      );

    });


  } catch (err) {

    console.error(
      "GALLERY CRASH:",
      err
    );

    container.innerHTML = `
      <p>
        حدث خطأ أثناء تحميل الصور.
      </p>
    `;

  }

}


/* =========================
   تشغيل الموقع
========================= */

loadServices();

loadPrices();

loadGallery();
