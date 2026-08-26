/* =====================================================
   SUPABASE
===================================================== */

const SUPABASE_URL = "ضع Project URL هنا";

const SUPABASE_KEY =
"sb_publishable_GZVbqF23r-iLovNyOa5UcQ__TpFmZFM";


const db = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


/* =====================================================
   القائمة
===================================================== */

const menuBtn =
document.getElementById("menuBtn");

const menu =
document.getElementById("menu");


if (menuBtn && menu) {

  menuBtn.addEventListener("click", () => {

    menu.classList.toggle("active");

  });

}


/* إغلاق القائمة عند الضغط على رابط */

document.querySelectorAll("#menu a")
.forEach(link => {

  link.addEventListener("click", () => {

    menu.classList.remove("active");

  });

});


/* =====================================================
   الخدمات
===================================================== */

async function loadServices() {

  const container =
  document.getElementById("servicesContainer");


  if (!container) return;


  const { data, error } = await db

    .from("services")

    .select("*")

    .eq("active", true)

    .order("id");


  if (error) {

    console.error(
      "خطأ في تحميل الخدمات:",
      error
    );

    container.innerHTML = `

      <div class="loading">

        تعذر تحميل الخدمات حالياً.

      </div>

    `;

    return;

  }


  if (!data || data.length === 0) {

    container.innerHTML = `

      <div class="loading">

        لا توجد خدمات حالياً.

      </div>

    `;

    return;

  }


  container.innerHTML = "";


  data.forEach(service => {

    const name =
    service.name || "خدمة";


    const description =
    service.description || "";


    const price =
    service.price || "حسب الطلب";


    const whatsappText =
    encodeURIComponent(

      "السلام عليكم، أريد الاستفسار عن " +
      name

    );


    container.innerHTML += `

      <div class="service-card">

        <h3>
          ${name}
        </h3>

        <p>
          ${description}
        </p>

        <div class="price">
          ${price} د.ل
        </div>

        <a
          class="btn primary"
          href="https://wa.me/218920512607?text=${whatsappText}"
          target="_blank"
          rel="noopener"
        >
          اطلب الآن
        </a>

      </div>

    `;

  });

}


/* =====================================================
   الأسعار
===================================================== */

async function loadPrices() {

  const container =
  document.getElementById("pricesContainer");


  if (!container) return;


  const { data, error } = await db

    .from("services")

    .select("*")

    .eq("active", true)

    .order("id");


  if (error) {

    console.error(
      "خطأ في تحميل الأسعار:",
      error
    );

    container.innerHTML = `

      <div class="loading">

        تعذر تحميل الأسعار حالياً.

      </div>

    `;

    return;

  }


  if (!data || data.length === 0) {

    container.innerHTML = `

      <div class="loading">

        لا توجد أسعار مضافة حالياً.

      </div>

    `;

    return;

  }


  container.innerHTML = "";


  data.forEach(service => {

    container.innerHTML += `

      <div class="price-row">

        <strong>
          ${service.name || "خدمة"}
        </strong>

        <span>
          ${service.price || "حسب الطلب"} د.ل
        </span>

      </div>

    `;

  });

}


/* =====================================================
   معرض الصور
===================================================== */

async function loadGallery() {

  const container =
  document.getElementById("galleryContainer");


  if (!container) return;


  const { data, error } = await db

    .from("gallery")

    .select("*")

    .order("id", {
      ascending: false
    });


  if (error) {

    console.error(
      "خطأ في تحميل معرض الصور:",
      error
    );

    container.innerHTML = `

      <div class="loading">

        تعذر تحميل الصور.

      </div>

    `;

    return;

  }


  console.log(
    "صور معرض الأعمال:",
    data
  );


  if (!data || data.length === 0) {

    container.innerHTML = `

      <div class="loading">

        لا توجد صور في المعرض حالياً.

      </div>

    `;

    return;

  }


  container.innerHTML = "";


  data.forEach(item => {

    if (!item.image_url) return;


    const image =
    document.createElement("img");


    image.src =
    item.image_url;


    image.alt =
    item.title ||
    "حديد للتغليف والحماية";


    image.loading =
    "lazy";


    image.onerror =
    function() {

      console.error(
        "فشل تحميل الصورة:",
        item.image_url
      );

      this.style.display =
      "none";

    };


    container.appendChild(image);

  });

}


/* =====================================================
   تشغيل الموقع
===================================================== */

async function startWebsite() {

  console.log(
    "بدأ تشغيل موقع حديد..."
  );


  await loadServices();

  await loadPrices();

  await loadGallery();


  console.log(
    "تم تحميل الموقع."
  );

}


startWebsite();
