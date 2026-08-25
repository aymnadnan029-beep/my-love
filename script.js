const SUPABASE_URL = "ضع_رابط_مشروعك_هنا";
const SUPABASE_KEY = "ضع_المفتاح_هنا";

const db = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


/* القائمة */

const menuBtn = document.getElementById("menuBtn");
const menu = document.querySelector("nav");

menuBtn.onclick = () => {
  menu.classList.toggle("active");
};


/* الخدمات */

async function loadServices() {

  const { data, error } = await db
    .from("services")
    .select("*")
    .eq("active", true)
    .order("id");

  if (error) {
    console.error(error);
    return;
  }

  const container =
    document.getElementById("servicesContainer");

  container.innerHTML = "";

  data.forEach(service => {

    container.innerHTML += `

      <div class="service-card">

        <h3>${service.name}</h3>

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
            "السلام عليكم، أريد الاستفسار عن " + service.name
          )}"
          target="_blank"
        >
          اطلب الآن
        </a>

      </div>

    `;

  });

}


/* الأسعار */

async function loadPrices() {

  const { data, error } = await db
    .from("services")
    .select("*")
    .eq("active", true)
    .order("id");

  if (error) return;

  const container =
    document.getElementById("pricesContainer");

  container.innerHTML = "";

  data.forEach(service => {

    container.innerHTML += `

      <div class="price-row">

        <strong>
          ${service.name}
        </strong>

        <span>
          ${service.price || "حسب الطلب"} د.ل
        </span>

      </div>

    `;

  });

}


/* الصور */

async function loadGallery() {

  const { data, error } = await db
    .from("gallery")
    .select("*")
    .order("id", { ascending: false });

  if (error) return;

  const container =
    document.getElementById("galleryContainer");

  container.innerHTML = "";

  data.forEach(item => {

    container.innerHTML += `

      <img
        src="${item.image_url}"
        alt="${item.title || "حديد للتغليف والحماية"}"
      >

    `;

  });

}


loadServices();
loadPrices();
loadGallery();
