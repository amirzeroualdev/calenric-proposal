// Menu Data (Hardcoded in JS, no JSON)
const menuItems = [
    {
        name: 'Croissant',
        price: '2.50€',
        description: 'Croissant cruixent i flonjo, fet amb mantega fresca.',
        category: 'dolcos',
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
        name: 'Ensaimada',
        price: '3.00€',
        description: 'Ensaimada mallorquina suau, polvoritzada amb sucre.',
        category: 'dolcos',
        image: 'https://images.unsplash.com/photo-1607478900766-efe13248b125?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
        name: 'Coca de crema',
        price: '4.50€',
        description: 'Coca tradicional amb crema catalana i fruita confitada.',
        category: 'dolcos',
        image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
        name: 'Pa de pessic',
        price: '1.80€',
        description: 'Pa de pessic suau, ideal per a esmorzars lleugers.',
        category: 'dolcos',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
        name: 'Pastís de xocolata',
        price: '5.00€',
        description: 'Pastís de xocolata negra amb cobertura de ganache.',
        category: 'dolcos',
        image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
        name: 'Pastís de formatge',
        price: '4.80€',
        description: 'Pastís de formatge cremós amb base de galeta.',
        category: 'dolcos',
        image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
        name: 'Cafè',
        price: '1.50€',
        description: 'Cafè exprés torrat a la nostra botiga.',
        category: 'begudes',
        image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
        name: 'Tallat',
        price: '2.00€',
        description: 'Cafè amb llet, perfecte per començar el dia.',
        category: 'begudes',
        image: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
        name: 'Suc natural',
        price: '2.50€',
        description: 'Suc de taronja fresc, sense sucres afegits.',
        category: 'begudes',
        image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
];

// Load Menu Items
function loadMenu(filter = 'tot') {
    const menuGrid = document.getElementById('menu-grid');
    menuGrid.innerHTML = '';
    const filteredItems = filter === 'tot' ? menuItems : menuItems.filter(item => item.category === filter);
    filteredItems.forEach((item, index) => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <span class="price">${item.price}</span>
        `;
        menuGrid.appendChild(menuItem);
        // Staggered animation
        setTimeout(() => menuItem.classList.add('show'), index * 100);
    });
}

// Menu Filtering
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        loadMenu(btn.dataset.filter);
    });
});

// Initial Load
loadMenu();

// Dark Mode Toggle with localStorage
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme');
if (savedTheme) body.classList.add(savedTheme);
themeToggle.textContent = body.classList.contains('dark') ? '☀️' : '🌙';
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    const currentTheme = body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
    themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = body.classList.contains('dark') ? 'rgba(26, 26, 26, 0.95)' : 'rgba(255, 248, 225, 0.95)';
    } else {
        navbar.style.background = body.classList.contains('dark') ? 'rgba(26, 26, 26, 0.9)' : 'rgba(255, 248, 225, 0.9)';
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu
        const navLinks = document.querySelector('.nav-links');
        if (navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            document.getElementById('hamburger').classList.remove('open');
        }
    });
});

// Active Nav Link on Scroll
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) link.classList.add('active');
    });
});

// Scroll Reveal Animations
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => observer.observe(section));

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinksMenu = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
    navLinksMenu.classList.toggle('open');
    hamburger.classList.toggle('open');
    hamburger.querySelectorAll('span').forEach((span, index) => {
        if (hamburger.classList.contains('open')) {
            span.style.transform = index === 0 ? 'rotate(45deg) translate(5px, 5px)' :
                                  index === 1 ? 'opacity: 0' :
                                  'rotate(-45deg) translate(7px, -6px)';
        } else {
            span.style.transform = 'none';
            span.style.opacity = '1';
        }
    });
});

// Torna a dalt Button
const tornaDalt = document.getElementById('torna-dalt');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        tornaDalt.classList.add('show');
    } else {
        tornaDalt.classList.remove('show');
    }
});
tornaDalt.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Contact Form Validation
const contactForm = document.getElementById('contact-form');
const formMessages = document.getElementById('form-messages');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formMessages.innerHTML = '';
    const nom = document.getElementById('nom').value.trim();
    const email = document.getElementById('email').value.trim();
    const missatge = document.getElementById('missatge').value.trim();
    let isValid = true;

    if (!nom) {
        showError('El nom és obligatori.');
        isValid = false;
    }
    if (!email) {
        showError('El correu electrònic és obligatori.');
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        showError('Introdueix un correu electrònic vàlid.');
        isValid = false;
    }
    if (!missatge) {
        showError('El missatge és obligatori.');
        isValid = false;
    }

    if (isValid) {
        showSuccess('Missatge enviat correctament!');
        contactForm.reset();
    }
});

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    formMessages.appendChild(errorDiv);
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success';
    successDiv.textContent = message;
    formMessages.appendChild(successDiv);
}
// WhatsApp Number Validation
const whatsappNumber = "34972600277";
if(!/^\d{9,15}$/.test(whatsappNumber)){
    console.error("Invalid WhatsApp number format");
}
