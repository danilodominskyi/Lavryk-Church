const links = document.querySelectorAll('a[data-target]');
const sections = document.querySelectorAll('.home_view, .community_view, .umh_view, .old_hor, .new_hor, .community_of_biblia, .apostol, .rada, .altarers, .sesters, .mariiska_druzhina, .church_leaders_view, .somthing_view, .contacts_view');

const mainNav = document.querySelector('.main-nav');
const navToggle = document.querySelector('.nav-toggle');

function closeMobileNav() {
  mainNav?.classList.remove('is-open');
  if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
}

navToggle?.addEventListener('click', function () {
  if (!mainNav) return;
  const open = mainNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

document.getElementById('site-brand-home')?.addEventListener('click', function (e) {
  e.preventDefault();
  const homeLink = document.querySelector('.menu a[data-target=".home_view"]');
  if (homeLink) homeLink.click();
});

links.forEach((link) => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    links.forEach((l) => l.classList.remove('active'));
    this.classList.add('active');

    sections.forEach((section) => section.classList.add('hidden'));

    const targetSelector = this.getAttribute('data-target');
    const target = document.querySelector(targetSelector);

    if (target) {
      target.classList.remove('hidden');
    }

    // При перемиканні розділів сховуємо "Дивитись всі події"
    resetCommunitySectionsMore();

    closeMobileNav();
  });
});

const overlay = document.getElementById('modal-overlay');
const modalContent = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');

function openPhotoModal(img) {
  if (!img || !modalContent) return;
  modalContent.innerHTML = '';
  const bigImg = document.createElement('img');
  bigImg.src = img.src;
  bigImg.alt = img.alt || 'Розпорядок богослужінь';
  bigImg.className = 'modal-photo';
  modalContent.appendChild(bigImg);
  overlay.classList.add('is-open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (modalContent) modalContent.innerHTML = '';
}

document.addEventListener('click', function (e) {
  const photo = e.target.closest('.schedule-photo img');
  if (!photo) return;
  e.preventDefault();
  e.stopPropagation();
  photo.classList.add('schedule-photo-open');
  openPhotoModal(photo);
});

modalClose?.addEventListener('click', closeModal);
overlay?.addEventListener('click', function (e) {
  if (e.target === overlay) closeModal();
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && overlay?.classList.contains('is-open')) closeModal();
});

function resetUmhVideos() {
  document.querySelectorAll('.umh_view .umh-event-card__poster').forEach((poster) => {
    poster.removeAttribute('hidden');
    poster.style.removeProperty('display');
  });
  document.querySelectorAll('.umh_view .umh-event-card__player-wrap').forEach((wrap) => {
    wrap.setAttribute('hidden', '');
  });
  document.querySelectorAll('.umh_view .umh-event-card__iframe').forEach((iframe) => {
    iframe.removeAttribute('src');
  });
}

/* Події з "головної" сторінки: керуються об'єктами */
const HOME_PAGE_EVENTS = [
  {
    type: 'video',
    photos: [],
    videoUrl: 'https://www.youtube.com/embed/9z6gGJa_tK0?rel=0',
    title: 'Нові учасники',
    text: 'Сьогодні, 21 березня, наша молодіжна християнська спільнота «Українська молодь Христові» при церкві Різдва Пресвятої Богородиці села Лавриків радо поповнилася новими учасниками. Ми щиро прийняли наших кандидатів, ознайомили їх зі структурою та місією спільноти, поділилися планами на майбутнє. Зустріч пройшла в теплій і радісній атмосфері: разом провели цікаві квести, які допомогли краще пізнати одне одного та відчути дух єдності. Цьогоріч до нашої спільноти приєдналося 12 нових учасників. Віримо, що вони принесуть із собою нове натхнення, креативні ідеї та живу енергію, щоб разом ще глибше пізнавати і знаходити Всеблагого Господа. Нехай Господь благословить наш шлях і провадить кожного з нас!',
    date: '22 березня 2026',
    places: { umh: true, old_hor: true },
  },
  {
    type: 'photo',
    photos: [
      'img/1year-umh/photo-1year-umh1.jpg',
      'img/1year-umh/photo-1year-umh2.jpg',
      'img/1year-umh/photo-1year-umh3.jpg',
    ],
    videoUrl: '',
    title: 'Рік УМХ',
    text: 'Слава Ісусу Христу! ми разом відсвяткували перший рік спільноти УМХ Лавриків — рік дружби, спільних справ, щирих розмов, підтримки та крутих подій. За цей час ми стали справжньою командою, навчилися працювати разом, допомагати одне одному й створювати атмосферу, куди хочеться повертатися знову і знову. Дякую кожному, хто є частиною нашої спільноти. Саме люди роблять це місце живим, теплим і особливим. Попереду ще більше зустрічей, ідей, проєктів і спільних перемог. Це тільки початок 💫',
    date: '18 березня 2026',
    places: { umh: true, old_hor: true },
  },
  {
    type: 'photo',
    photos: [
      'img/trevel-unh/photo-trevel-umh1.jpg',
      'img/trevel-unh/photo-trevel-umh2.jpg',
      'img/trevel-unh/photo-trevel-umh3.jpg',
      'img/trevel-unh/photo-trevel-umh4.jpg',
      'img/trevel-unh/photo-trevel-umh5.jpg',
      'img/trevel-unh/photo-trevel-umh6.jpg',
      'img/trevel-unh/photo-trevel-umh7.jpg',
      'img/trevel-unh/photo-trevel-umh8.jpg',
      'img/trevel-unh/photo-trevel-umh9.jpg',
      'img/trevel-unh/photo-trevel-umh10.jpg',
      'img/trevel-unh/photo-trevel-umh11.jpg',
      'img/trevel-unh/photo-trevel-umh12.jpg',
      'img/trevel-unh/photo-trevel-umh13.jpg',
      'img/trevel-unh/photo-trevel-umh14.jpg',
      'img/trevel-unh/photo-trevel-umh15.jpg',
    ],
    videoUrl: '',
    title: 'Поїздка УМХ',
    text: 'Сьогодні наша спільнота УМХ с. Лавриків мали поїздку до Львова Організатором цієї поїздки став наш священник — отець Ігор, за що щиро йому дякуємо. Першою зупинкою стала церква святого Андрія. Після спільної молитви та цікавої екскурсії ми відвідали пам’ятники королю Данилу Галицькому та Тарасу Григоровичу Шевченку. Також мали нагоду помолитися біля статуї Пресвятої Богородиці в центрі Львова, помилуватися величчю та красою Львівського оперного театру й навіть потрапили на сторінки Львівської газети. Наступним важливим місцем нашої подорожі став Гарнізонний храм святих апостолів Петра і Павла, де ми віддали шану полеглим воїнам, молячись за їхні душі та за мир в Україні. Опісля, прогулюючись площею Ринок, ми відвідали Домініканський собор, а згодом смачно пообідали. День продовжився активним відпочинком — катанням на ковзанах та прогулянкою красивою територією.  Усі учасники поїздки отримали багато позитивних емоцій і гарних вражень. Ця подорож стала знаком плідної співпраці молодіжної спільноти УМХ з нашою парафією та селом, а також ще одним кроком до духовного зростання і єдності. Нехай Господь щедро дарує всім мир, благословення та натхнення на добрі справи.',
    date: '30 січня 2026',
    places: { umh: true },
  },
  {
    type: 'video',
    photos: [],
    videoUrl:'https://www.youtube.com/embed/_HGgn8WAVus?rel=0',
    title: 'Вертеп',
    text: 'УМХ Лавриків 2025-2026 вертеп',
    date: '28 грудня 2026',
    places: { umh: true },
  },
  {
    type: 'photo',
    photos: [
      'img/for-dads/photo_for_dads1.jpg',
      'img/for-dads/photo_for_dads2.jpg',
      'img/for-dads/photo_for_dads3.jpg',
      'img/for-dads/photo_for_dads4.jpg',
      'img/for-dads/photo_for_dads5.jpg',
    ],
    videoUrl: '',
    title: 'Привітання татів',
    text: 'Слава Ісусу Христу! Сьогодні наша спільнота щиро вітала всіх чоловіків із Днем батька! Ми висловили вдячність татам, дідусям, наставникам — усім, хто щодня дарує любов, турботу й підтримку. Дякуємо за вашу силу, мудрість і натхнення! Нехай це свято буде сповнене тепла, щирих обіймів і сімейної радості. 💙',
    date: '15 червня 2025',
    places: { umh: true, old_hor: true },
  },
  {
    type: 'photo',
    photos: [
      'img/1-june/june_1.jpg',
      'img/1-june/june_2.jpg',
      'img/1-june/june_3.jpg',
      'img/1-june/june_4.jpg',
      'img/1-june/june_5.jpg',
      'img/1-june/june_6.jpg',
      'img/1-june/june_7.jpg',
      'img/1-june/june_8.jpg',
      'img/1-june/june_9.jpg',
    ],
    videoUrl: '',
    title: '1 червня',
    text: 'Слава Ісусу Христу! Сьогодні наша молодіжна спільнота з радістю підготувала цікавий захід для дітей! Разом ми весело танцювали банс, брали участь у захоплюючих іграх та просто гарно проводили час. Було багато сміху, радості й щирих дитячих емоцій. А після розваг на дітей чекав приємний солодкий сюрприз — який став чудовим завершенням нашого спільного дозвілля. Дякуємо всім, хто долучився!🫶🏻',
    date: '1 червня 2025',
    places: { umh: true, old_hor: true },
  },
  {
    type: 'photo',
    photos: [
      'img/meet-warrior/photo_meet-warrior_1.jpg',
      'img/meet-warrior/photo_meet-warrior_2.jpg',
      'img/meet-warrior/photo_meet-warrior_3.jpg',
      'img/meet-warrior/photo_meet-warrior_4.jpg',
      'img/meet-warrior/photo_meet-warrior_5.jpg',
      'img/meet-warrior/photo_meet-warrior_6.jpg',
    ],
    videoUrl: '',
    title: 'Зустрічаємо Героя',
    text: 'Слава Ісусу Христу. Сьогодні (31.05.2025) наша громада зустрічала загиблого воїна Думича Василя Степановича. З глибоким сумом і вдячністю в серці. Члени нашої молодіжної спільноти стояли обабіч дороги, тримаючи державні прапори. Це був наш тихий, але щирий знак шани — символ памʼяті, підтримки та єдності поколінь. Вічна памʼять Герою. Слава Україні!',
    date: '31 травня 2025',
    places: { umh: true, old_hor: true },
  },
  {
    type: 'photo',
    photos: [
      'img/for-mums/photo_day_mums1.jpg',
      'img/for-mums/photo_day_mums2.jpg',
      'img/for-mums/photo_day_mums3.jpg',
      'img/for-mums/photo_day_mums4.jpg',
      'img/for-mums/photo_day_mums5.jpg',
      'img/for-mums/photo_day_mums6.jpg',
      'img/for-mums/photo_day_mums7.jpg',
      'img/for-mums/photo_day_mums8.jpg',
      'img/for-mums/photo_day_mums9.jpg',
    ],
    videoUrl: '',
    title: 'Привітання матерів',
    text: 'Христос Воскрес! Наша молодіжна спільнота з радістю та натхненням готувалася до святкування Дня матері. З великою любов’ю ми підготували маленькі подарунки для всіх жінок — мам, бабусь, дівчат і навіть найменших дівчаток. Ці символічні презенти — наш спосіб подякувати за тепло, ніжність, турботу та підтримку, які ви щодня даруєте світу. Хай ці невеличкі знаки уваги принесуть вам посмішку і нагадають, як сильно ми вас цінуємо!',
    date: '11 травня 2025',
    places: { umh: true, old_hor: true },
  },
  {
    type: 'video',
    photos: [],
    videoUrl: 'https://www.youtube.com/embed/wX_-Q3PDrdg?rel=0',
    title: 'Христос Воскрес!',
    text: 'Дорогі у христі. Сердечно вітаємо вас від імені молодіжної спільноти нашої церкви! У цей благословенний час дякуємо Богові за можливість бути разом — у вірі та молитві. Нехай Господь благословить кожну вашу справу, дарує мир у серцях і укріплює у вірі. З любов’ю у Христі, УМХ Лавриків🫶🏻',
    date: '20 квітня 2025',
    places: { umh: true, old_hor: true },
  },
  {
    type: 'video',
    photos: [],
    videoUrl: 'https://www.youtube.com/embed/9vwpxmfH94c?rel=0',
    title: 'розважання над гробом Господнім',
    text: 'Слава Ісусу Христу! Наша молодіжна спільнота храму Різдва Пресвятої Богородиці с. Лавриків у молитві душі і серця провадила розважання над гробом Господнім. Цього дня молитву прикрасив дитячий хор, який своєю чистою і щирою піснею додав глибини духовному переживанню.',
    date: '19 квітня 2025',
    places: { umh: true, old_hor: true },
  },
];

/*
  Показ по сторінках через прапорці.
  - Головна сторінка = `.home_view` (прапорці для неї не потрібні: завжди увімкнена).
  - Для НОВИХ об'єктів показ на інших сторінках керується через `places`:
      places: { umh: true, old_hor: true, ... }
*/
const MAIN_PLACE_KEY = 'home';
const OTHER_EVENT_PLACE_KEYS = [
  // `umh_view` тепер працює як інші секції — тільки якщо ти вказав `places.umh = true`
  'umh',
  'old_hor',
  'new_hor',
  'community_of_biblia',
  'apostol',
  'rada',
  'altarers',
  'sesters',
  'mariiska_druzhina',
];

const DEFAULT_EVENT_PLACES_STRICT = {
  [MAIN_PLACE_KEY]: true,
  umh: false,
  old_hor: false,
  new_hor: false,
  community_of_biblia: false,
  apostol: false,
  rada: false,
  altarers: false,
  sesters: false,
  mariiska_druzhina: false,
};

function buildEventPlaceFlags(event) {
  const placesObj = event && typeof event.places === 'object' && event.places !== null ? event.places : null;
  const flags = { ...DEFAULT_EVENT_PLACES_STRICT };

  OTHER_EVENT_PLACE_KEYS.forEach((key) => {
    // Варіант 1: прапорці в `places`
    if (placesObj && Object.prototype.hasOwnProperty.call(placesObj, key)) {
      flags[key] = Boolean(placesObj[key]);
      return;
    }

    // Варіант 2: прапорці напряму (на випадок, якщо так тобі зручніше)
    if (typeof event[key] === 'boolean') flags[key] = event[key];
  });

  flags[MAIN_PLACE_KEY] = true; // головна завжди увімкнена
  return flags;
}

const COMMUNITY_EVENTS = HOME_PAGE_EVENTS.map((event) => {
  const placeFlags = buildEventPlaceFlags(event);
  // `places` не потрібне для рендера, бо потрібні булеві прапорці вже розкладені по ключах.
  const { places, ...rest } = event;
  return { ...placeFlags, ...rest };
});

const COMMUNITY_SECTION_CLASSES = [
  'home_view',
  'umh_view',
  'old_hor',
  'new_hor',
  'community_of_biblia',
  'apostol',
  'rada',
  'altarers',
  'sesters',
  'mariiska_druzhina',
];

const SECTION_CLASS_TO_EVENT_PLACE_KEY = {
  home_view: 'home',
  umh_view: 'umh',
  old_hor: 'old_hor',
  new_hor: 'new_hor',
  community_of_biblia: 'community_of_biblia',
  apostol: 'apostol',
  rada: 'rada',
  altarers: 'altarers',
  sesters: 'sesters',
  mariiska_druzhina: 'mariiska_druzhina',
};

function getYouTubeVideoId(url) {
  if (!url) return '';
  const m = String(url).match(/(?:embed\/|v=|youtu\.be\/)([a-zA-Z0-9_-]{6,})/);
  return m ? m[1] : '';
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function createPhotoCardMarkup(event, eventIndex) {
  const photos = event.photos.map((src) => String(src).trim()).filter(Boolean);
  const slides = photos.length
    ? photos
        .map(
          (src, i) => `<div class="umh-easter-gallery__slide${i === 0 ? ' is-active' : ''}">
            <img src="${escapeHtml(src)}" alt="${escapeHtml(event.title)}" loading="lazy" decoding="async">
          </div>`,
        )
        .join('')
    : `<div class="umh-easter-gallery__slide is-active">
        <img src="" alt="${escapeHtml(event.title)}" loading="lazy" decoding="async">
      </div>`;

  const dots = Array.from({ length: photos.length ? photos.length : 1 }, (_, i) => `<span class="umh-easter-gallery__dot${i === 0 ? ' is-active' : ''}"></span>`)
    .join('');

  return `<article class="umh-event-card" data-event-index="${eventIndex}">
    <div class="umh-event-card__media">
      <div class="umh-easter-gallery" data-current="0" aria-label="Галерея: ${escapeHtml(event.title)}">
        ${slides}
        <div class="umh-easter-gallery__controls" aria-hidden="true">
          <button type="button" class="umh-easter-gallery__arrow umh-easter-gallery__arrow--prev">‹</button>
          <button type="button" class="umh-easter-gallery__arrow umh-easter-gallery__arrow--next">›</button>
        </div>
        <div class="umh-easter-gallery__dots" aria-hidden="true">${dots}</div>
      </div>
    </div>
    <div class="umh-event-card__body">
      <h3 class="umh-event-card__title">${escapeHtml(event.title)}</h3>
      <p class="umh-event-card__desc">${escapeHtml(event.text)}</p>
      <time class="umh-event-card__date" datetime="">${escapeHtml(event.date)}</time>
    </div>
  </article>`;
}

function createVideoCardMarkup(event, eventIndex) {
  const videoId = getYouTubeVideoId(event.videoUrl);
  const poster = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';

  return `<article class="umh-event-card" data-event-index="${eventIndex}">
    <div class="umh-event-card__media">
      <button type="button" class="umh-event-card__poster" aria-label="Відтворити відео">
        <img src="${escapeHtml(poster)}" alt="" width="480" height="360" loading="lazy" decoding="async">
        <span class="umh-event-card__play-fab" aria-hidden="true"></span>
      </button>
      <div class="umh-event-card__player-wrap" hidden>
        <iframe class="umh-event-card__iframe" title="Відео УМХ (YouTube)" data-src="${escapeHtml(event.videoUrl)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    </div>
    <div class="umh-event-card__body">
      <h3 class="umh-event-card__title">${escapeHtml(event.title)}</h3>
      <p class="umh-event-card__desc">${escapeHtml(event.text)}</p>
      <time class="umh-event-card__date" datetime="">${escapeHtml(event.date)}</time>
    </div>
  </article>`;
}

let activeUmhModal = null;

function isValidCommunityPhotoEvent(event) {
  return (
    event.type === 'photo' &&
    Array.isArray(event.photos) &&
    event.photos.length > 0 &&
    (!event.videoUrl || !String(event.videoUrl).trim())
  );
}

function isValidCommunityVideoEvent(event) {
  return (
    event.type === 'video' &&
    typeof event.videoUrl === 'string' &&
    event.videoUrl.trim() &&
    Array.isArray(event.photos) &&
    event.photos.length === 0
  );
}

function renderCommunitySection(sectionClass) {
  const placeKey = SECTION_CLASS_TO_EVENT_PLACE_KEY[sectionClass];
  const main = document.getElementById(`events-main-${sectionClass}`);
  const more = document.getElementById(`events-more-${sectionClass}`);
  const btn = document.getElementById(`events-show-all-${sectionClass}`);
  if (!placeKey || !main || !more || !btn) return;

  const filtered = COMMUNITY_EVENTS.map((event, globalIndex) => ({ event, globalIndex }))
    .filter(({ event }) => event[placeKey] === true)
    .filter(({ event }) => isValidCommunityPhotoEvent(event) || isValidCommunityVideoEvent(event));

  const first = filtered.slice(0, 3);
  const rest = filtered.slice(3);

  main.innerHTML = first
    .map(({ event, globalIndex }) => (event.type === 'photo' ? createPhotoCardMarkup(event, globalIndex) : createVideoCardMarkup(event, globalIndex)))
    .join('');

  more.innerHTML = rest
    .map(({ event, globalIndex }) => (event.type === 'photo' ? createPhotoCardMarkup(event, globalIndex) : createVideoCardMarkup(event, globalIndex)))
    .join('');

  more.classList.add('hidden');
  more.setAttribute('hidden', '');
  btn.classList.remove('is-done');
  btn.style.display = rest.length > 0 ? '' : 'none';
}

function getAutoplayVideoUrl(url) {
  if (!url) return '';
  try {
    const u = new URL(url, window.location.href);
    u.searchParams.set('autoplay', '1');
    u.searchParams.set('mute', '0');
    u.searchParams.set('playsinline', '1');
    u.searchParams.set('rel', '0');
    return u.toString();
  } catch {
    return url;
  }
}

function buildUmhModalMarkup(event, photoIndex) {
  if (event.type === 'video') {
    return `<div class="umh-modal">
      <div class="umh-modal__media">
        <div class="umh-modal__video-wrap">
          <iframe class="umh-modal__iframe" title="Відео УМХ" src="${escapeHtml(getAutoplayVideoUrl(event.videoUrl))}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>
      <div class="umh-modal__info">
        <h3 class="umh-modal__title">${escapeHtml(event.title)}</h3>
        <p class="umh-modal__text">${escapeHtml(event.text)}</p>
        <time class="umh-modal__date" datetime="">${escapeHtml(event.date)}</time>
      </div>
    </div>`;
  }

  const photos = event.photos.map((src) => String(src).trim()).filter(Boolean);
  const total = photos.length || 1;
  const safeIndex = ((photoIndex % total) + total) % total;
  const activeSrc = photos[safeIndex] || '';
  const dots = Array.from({ length: total }, (_, i) => `<span class="umh-modal__dot${i === safeIndex ? ' is-active' : ''}"></span>`).join('');

  return `<div class="umh-modal">
    <div class="umh-modal__media">
      <div class="umh-modal__photo-wrap">
        <img class="umh-modal__photo" src="${escapeHtml(activeSrc)}" alt="${escapeHtml(event.title)}" loading="lazy" decoding="async">
        ${total > 1 ? `<button type="button" class="umh-modal__arrow umh-modal__arrow--prev" aria-label="Попереднє фото">‹</button>
        <button type="button" class="umh-modal__arrow umh-modal__arrow--next" aria-label="Наступне фото">›</button>` : ''}
      </div>
      ${total > 1 ? `<div class="umh-modal__dots" aria-hidden="true">${dots}</div>` : ''}
    </div>
    <div class="umh-modal__info">
      <h3 class="umh-modal__title">${escapeHtml(event.title)}</h3>
      <p class="umh-modal__text">${escapeHtml(event.text)}</p>
      <time class="umh-modal__date" datetime="">${escapeHtml(event.date)}</time>
    </div>
  </div>`;
}

function openUmhEventModal(eventIndex, photoIndex = 0) {
  const event = COMMUNITY_EVENTS[eventIndex];
  if (!event || !modalContent) return;
  activeUmhModal = { eventIndex, photoIndex };
  modalContent.innerHTML = buildUmhModalMarkup(event, photoIndex);
  overlay.classList.add('is-open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function updatePhotoGallery(gallery, nextIndex) {
  const slides = Array.from(gallery.querySelectorAll('.umh-easter-gallery__slide'));
  const dots = Array.from(gallery.querySelectorAll('.umh-easter-gallery__dot'));
  if (!slides.length) return;

  const normalized = (nextIndex + slides.length) % slides.length;
  gallery.dataset.current = String(normalized);
  slides.forEach((slide, i) => slide.classList.toggle('is-active', i === normalized));
  dots.forEach((dot, i) => dot.classList.toggle('is-active', i === normalized));
}

function resetCommunitySectionsMore() {
  COMMUNITY_SECTION_CLASSES.forEach((sectionClass) => {
    const more = document.getElementById(`events-more-${sectionClass}`);
    const btn = document.getElementById(`events-show-all-${sectionClass}`);
    if (!more || !btn) return;
    more.classList.add('hidden');
    more.setAttribute('hidden', '');
    btn.classList.remove('is-done');
  });
}

function initCommunityEvents() {
  // 1) рендер карток по сторінках
  COMMUNITY_SECTION_CLASSES.forEach((sectionClass) => renderCommunitySection(sectionClass));

  // 2) слухачі на "Дивитись всі події"
  COMMUNITY_SECTION_CLASSES.forEach((sectionClass) => {
    const btn = document.getElementById(`events-show-all-${sectionClass}`);
    const more = document.getElementById(`events-more-${sectionClass}`);
    if (!btn || !more) return;

    btn.addEventListener('click', function () {
      more.classList.remove('hidden');
      more.removeAttribute('hidden');
      btn.classList.add('is-done');
    });
  });

  // 3) модалка по кліку на картку/галерею
  COMMUNITY_SECTION_CLASSES.forEach((sectionClass) => {
    const root = document.querySelector(`.${sectionClass}`);
    if (!root) return;

    root.addEventListener('click', function (e) {
      const arrow = e.target.closest('.umh-easter-gallery__arrow');
      if (arrow) {
        const gallery = arrow.closest('.umh-easter-gallery');
        if (!gallery) return;
        const current = Number(gallery.dataset.current || '0');
        const delta = arrow.classList.contains('umh-easter-gallery__arrow--next') ? 1 : -1;
        updatePhotoGallery(gallery, current + delta);
        return;
      }

      const card = e.target.closest('.umh-event-card');
      if (!card) return;

      const eventIndex = Number(card.getAttribute('data-event-index'));
      if (!Number.isFinite(eventIndex)) return;

      const gallery = card.querySelector('.umh-easter-gallery');
      const currentPhoto = gallery ? Number(gallery.dataset.current || '0') : 0;
      openUmhEventModal(eventIndex, currentPhoto);
    });
  });
}

initCommunityEvents();

modalContent?.addEventListener('click', function (e) {
  const arrow = e.target.closest('.umh-modal__arrow');
  if (!arrow || !activeUmhModal) return;
  const event = COMMUNITY_EVENTS[activeUmhModal.eventIndex];
  if (!event || event.type !== 'photo') return;
  const total = event.photos.length || 1;
  const delta = arrow.classList.contains('umh-modal__arrow--next') ? 1 : -1;
  const nextPhotoIndex = (activeUmhModal.photoIndex + delta + total) % total;
  openUmhEventModal(activeUmhModal.eventIndex, nextPhotoIndex);
});

// "Дивитись всі події" обробляються у initCommunityEvents()




