// Muebles Cairo - E-commerce Website JavaScript
// Main application functionality with shopping cart, product management, and checkout

class MueblesCairoApp {
    constructor() {
        this.products = [];
        this.cart = JSON.parse(localStorage.getItem('mueblescairo-cart')) || [];
        this.currentFilter = 'todos';
        this.searchQuery = '';
        this.isLoading = false;
        
        // Exchange rate: 1 USD = 410 CUP
        this.exchangeRate = 410;
        
        // Cuban municipalities in Havana
        this.havanaMunicipalities = [
            'Playa', 'Plaza de la Revolución', 'Centro Habana', 'La Habana Vieja',
            'Regla', 'La Habana del Este', 'Guanabacoa', 'San Miguel del Padrón',
            'Diez de Octubre', 'Cerro', 'Marianao', 'La Lisa', 'Boyeros',
            'Arroyo Naranjo', 'Cotorro'
        ];
        
        this.init();
    }
    
    init() {
        this.initializeProducts();
        this.bindEvents();
        this.renderFeaturedProducts();
        this.renderAllProducts();
        this.updateCartUI();
        this.initializeAnimations();
    }
    
    // Product Data Initialization
    initializeProducts() {
        this.products = [
            {
                id: 1,
                name: 'Silla Mimbre Tradicional',
                category: 'sillas',
                priceUSD: 45,
                image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=400',
                description: 'Silla artesanal de mimbre tejido a mano, perfecta para espacios exteriores e interiores.',
                featured: true
            },
            {
                id: 2,
                name: 'Mesa de Centro Rústica',
                category: 'mesas',
                priceUSD: 120,
                image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=400',
                description: 'Mesa de centro elaborada en madera maciza con acabados naturales.',
                featured: true
            },
            {
                id: 3,
                name: 'Estante Colonial Cubano',
                category: 'estantes',
                priceUSD: 85,
                image: 'https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg?auto=compress&cs=tinysrgb&w=400',
                description: 'Estante de madera con diseño colonial tradicional, ideal para libros y decoración.',
                featured: true
            },
            {
                id: 4,
                name: 'Butaca de Mimbre Premium',
                category: 'sillas',
                priceUSD: 65,
                image: 'https://images.pexels.com/photos/1827054/pexels-photo-1827054.jpeg?auto=compress&cs=tinysrgb&w=400',
                description: 'Butaca cómoda de mimbre con cojines incluidos, perfecta para relajarse.'
            },
            {
                id: 5,
                name: 'Mesa Comedor Familiar',
                category: 'mesas',
                priceUSD: 180,
                image: 'https://images.pexels.com/photos/1099816/pexels-photo-1099816.jpeg?auto=compress&cs=tinysrgb&w=400',
                description: 'Mesa grande de comedor para 6 personas, elaborada en madera noble.'
            },
            {
                id: 6,
                name: 'Jardinera Decorativa',
                category: 'decoracion',
                priceUSD: 35,
                image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=400',
                description: 'Jardinera artesanal para plantas, perfecta para patios y terrazas.'
            },
            {
                id: 7,
                name: 'Silla de Escritorio Ergonómica',
                category: 'sillas',
                priceUSD: 75,
                image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=400',
                description: 'Silla ergonómica de mimbre y madera para escritorio u oficina.'
            },
            {
                id: 8,
                name: 'Librero Artesanal',
                category: 'estantes',
                priceUSD: 95,
                image: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=400',
                description: 'Librero de madera maciza con múltiples compartimientos.'
            },
            {
                id: 9,
                name: 'Mesa de Noche Clásica',
                category: 'mesas',
                priceUSD: 55,
                image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
                description: 'Mesa de noche con cajón, diseño clásico cubano.'
            },
            {
                id: 10,
                name: 'Espejo Decorativo Marco Madera',
                category: 'decoracion',
                priceUSD: 40,
                image: 'https://images.pexels.com/photos/1639729/pexels-photo-1639729.jpeg?auto=compress&cs=tinysrgb&w=400',
                description: 'Espejo con marco artesanal de madera tallada a mano.'
            },
            {
                id: 11,
                name: 'Banco de Mimbre',
                category: 'sillas',
                priceUSD: 50,
                image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=400',
                description: 'Banco largo de mimbre, ideal para entradas y pasillos.'
            },
            {
                id: 12,
                name: 'Florero Artesanal Grande',
                category: 'decoracion',
                priceUSD: 28,
                image: 'https://images.pexels.com/photos/1054222/pexels-photo-1054222.jpeg?auto=compress&cs=tinysrgb&w=400',
                description: 'Florero grande de cerámica con diseños tradicionales cubanos.'
            }
        ];
    }
    
    // Event Binding
    bindEvents() {
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenuBtn.classList.toggle('active');
                mobileMenu.classList.toggle('show');
            });
        }
        
        // Search functionality
        const searchBtn = document.getElementById('searchBtn');
        const searchBar = document.getElementById('searchBar');
        const searchClose = document.getElementById('searchClose');
        const searchInput = document.getElementById('searchInput');
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                searchBar.classList.toggle('show');
                if (searchBar.classList.contains('show')) {
                    searchInput.focus();
                }
            });
        }
        
        if (searchClose) {
            searchClose.addEventListener('click', () => {
                searchBar.classList.remove('show');
                searchInput.value = '';
                this.searchQuery = '';
                this.renderAllProducts();
            });
        }
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase();
                this.renderAllProducts();
            });
        }
        
        // Cart functionality
        const cartBtn = document.getElementById('cartBtn');
        const cartOverlay = document.getElementById('cartOverlay');
        const cartClose = document.getElementById('cartClose');
        
        if (cartBtn) {
            cartBtn.addEventListener('click', () => {
                cartOverlay.classList.add('show');
                this.renderCartItems();
            });
        }
        
        if (cartClose) {
            cartClose.addEventListener('click', () => {
                cartOverlay.classList.remove('show');
            });
        }
        
        if (cartOverlay) {
            cartOverlay.addEventListener('click', (e) => {
                if (e.target === cartOverlay) {
                    cartOverlay.classList.remove('show');
                }
            });
        }
        
        // Product filters
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.getAttribute('data-filter');
                this.setFilter(filter);
            });
        });
        
        // Checkout functionality
        const checkoutBtn = document.getElementById('checkoutBtn');
        const checkoutModal = document.getElementById('checkoutModal');
        const checkoutClose = document.getElementById('checkoutClose');
        const backToCart = document.getElementById('backToCart');
        
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (this.cart.length > 0) {
                    cartOverlay.classList.remove('show');
                    checkoutModal.classList.add('show');
                    this.renderCheckoutSummary();
                }
            });
        }
        
        if (checkoutClose) {
            checkoutClose.addEventListener('click', () => {
                checkoutModal.classList.remove('show');
            });
        }
        
        if (backToCart) {
            backToCart.addEventListener('click', () => {
                checkoutModal.classList.remove('show');
                cartOverlay.classList.add('show');
            });
        }
        
        // Checkout form
        const checkoutForm = document.getElementById('checkoutForm');
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', (e) => this.handleCheckout(e));
        }
        
        // Province change handler
        const provinceSelect = document.querySelector('select[name="province"]');
        const municipalitySelect = document.querySelector('select[name="municipality"]');
        
        if (provinceSelect && municipalitySelect) {
            provinceSelect.addEventListener('change', (e) => {
                if (e.target.value === 'La Habana') {
                    municipalitySelect.disabled = false;
                    this.populateMunicipalities();
                } else {
                    municipalitySelect.disabled = true;
                    municipalitySelect.innerHTML = '<option value="">Seleccionar municipio</option>';
                }
            });
        }
        
        // Contact form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.showSuccessMessage('Mensaje enviado exitosamente. Te contactaremos pronto.');
            });
        }
        
        // Product modal close
        const productModal = document.getElementById('productModal');
        const productClose = document.getElementById('productClose');
        
        if (productClose) {
            productClose.addEventListener('click', () => {
                productModal.classList.remove('show');
            });
        }
        
        if (productModal) {
            productModal.addEventListener('click', (e) => {
                if (e.target === productModal) {
                    productModal.classList.remove('show');
                }
            });
        }
        
        // Success modal
        const successModal = document.getElementById('successModal');
        const successClose = document.getElementById('successClose');
        
        if (successClose) {
            successClose.addEventListener('click', () => {
                successModal.classList.remove('show');
            });
        }
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobileMenu');
                    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
                    if (mobileMenu && mobileMenuBtn) {
                        mobileMenu.classList.remove('show');
                        mobileMenuBtn.classList.remove('active');
                    }
                }
            });
        });
        
        // Window scroll handler for header
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
    }
    
    // Animation Initialization
    initializeAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe elements for animations
        document.querySelectorAll('.product-card, .section-header, .about-text, .contact-info').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });
    }
    
    // Product Rendering
    renderFeaturedProducts() {
        const container = document.getElementById('featuredProducts');
        if (!container) return;
        
        const featuredProducts = this.products.filter(product => product.featured);
        
        container.innerHTML = featuredProducts.map(product => 
            this.createProductCard(product)
        ).join('');
        
        this.bindProductCardEvents(container);
    }
    
    renderAllProducts() {
        const container = document.getElementById('productsGrid');
        if (!container) return;
        
        let filteredProducts = this.products;
        
        // Apply category filter
        if (this.currentFilter !== 'todos') {
            filteredProducts = filteredProducts.filter(product => 
                product.category === this.currentFilter
            );
        }
        
        // Apply search filter
        if (this.searchQuery) {
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(this.searchQuery) ||
                product.description.toLowerCase().includes(this.searchQuery)
            );
        }
        
        if (filteredProducts.length === 0) {
            container.innerHTML = `
                <div class="no-products">
                    <p>No se encontraron productos.</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = filteredProducts.map(product => 
            this.createProductCard(product)
        ).join('');
        
        this.bindProductCardEvents(container);
    }
    
    createProductCard(product) {
        const priceCUP = this.convertToCUP(product.priceUSD);
        
        return `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <div class="product-overlay">
                        <button class="quick-view-btn" onclick="app.showProductDetail(${product.id})">
                            Ver Detalles
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <div class="product-category">${this.getCategoryName(product.category)}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">
                        <span class="price-usd">$${product.priceUSD} USD</span>
                        <span class="price-cup">$${priceCUP} CUP</span>
                    </div>
                    <button class="add-to-cart-btn" onclick="app.addToCart(${product.id})">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L6 5H2"/>
                            <circle cx="9" cy="20" r="1"/>
                            <circle cx="20" cy="20" r="1"/>
                        </svg>
                        Añadir al Carrito
                    </button>
                </div>
            </div>
        `;
    }
    
    bindProductCardEvents(container) {
        // Add click events for product cards
        const productCards = container.querySelectorAll('.product-card');
        productCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('.add-to-cart-btn') || e.target.closest('.quick-view-btn')) {
                    return;
                }
                
                const productId = parseInt(card.getAttribute('data-product-id'));
                this.showProductDetail(productId);
            });
        });
    }
    
    // Product Detail Modal
    showProductDetail(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;
        
        const modal = document.getElementById('productModal');
        const container = document.getElementById('productDetail');
        const priceCUP = this.convertToCUP(product.priceUSD);
        
        container.innerHTML = `
            <div class="product-detail-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-detail-info">
                <div class="product-detail-category">${this.getCategoryName(product.category)}</div>
                <h2>${product.name}</h2>
                <p class="product-detail-description">${product.description}</p>
                <div class="product-detail-price">
                    <span class="price-usd">$${product.priceUSD} USD</span>
                    <span class="price-cup">$${priceCUP} CUP</span>
                </div>
                <div class="delivery-badge">
                    <svg class="delivery-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="1" y="3" width="15" height="13"/>
                        <polygon points="16,8 20,8 23,11 23,16 16,16"/>
                        <circle cx="5.5" cy="18.5" r="2.5"/>
                        <circle cx="18.5" cy="18.5" r="2.5"/>
                    </svg>
                    <span>Entrega <strong>GRATIS</strong> en La Habana</span>
                </div>
                <div class="product-detail-actions">
                    <button class="btn-primary" onclick="app.addToCart(${product.id}); app.closeProductModal();">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L6 5H2"/>
                            <circle cx="9" cy="20" r="1"/>
                            <circle cx="20" cy="20" r="1"/>
                        </svg>
                        Añadir al Carrito
                    </button>
                    <button class="btn-secondary" onclick="app.addToCartAndCheckout(${product.id})">
                        Comprar Ahora
                    </button>
                </div>
            </div>
        `;
        
        modal.classList.add('show');
    }
    
    closeProductModal() {
        const modal = document.getElementById('productModal');
        modal.classList.remove('show');
    }
    
    // Cart Functionality
    addToCart(productId, quantity = 1) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;
        
        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                ...product,
                quantity: quantity
            });
        }
        
        this.saveCart();
        this.updateCartUI();
        this.showCartNotification(product.name);
    }
    
    addToCartAndCheckout(productId) {
        this.addToCart(productId);
        this.closeProductModal();
        
        setTimeout(() => {
            const cartOverlay = document.getElementById('cartOverlay');
            const checkoutModal = document.getElementById('checkoutModal');
            
            cartOverlay.classList.add('show');
            this.renderCartItems();
            
            setTimeout(() => {
                cartOverlay.classList.remove('show');
                checkoutModal.classList.add('show');
                this.renderCheckoutSummary();
            }, 1000);
        }, 500);
    }
    
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
        this.renderCartItems();
    }
    
    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
            this.updateCartUI();
            this.renderCartItems();
        }
    }
    
    renderCartItems() {
        const container = document.getElementById('cartItems');
        if (!container) return;
        
        if (this.cart.length === 0) {
            container.innerHTML = `
                <div class="empty-cart">
                    <p>Tu carrito está vacío</p>
                    <button class="btn-primary" onclick="document.getElementById('cartOverlay').classList.remove('show'); app.scrollToSection('productos')">
                        Ver Productos
                    </button>
                </div>
            `;
            return;
        }
        
        container.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <div class="cart-item-price">$${item.priceUSD} USD / $${this.convertToCUP(item.priceUSD)} CUP</div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="app.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" 
                               onchange="app.updateQuantity(${item.id}, parseInt(this.value))" min="1">
                        <button class="quantity-btn" onclick="app.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        <span class="remove-item" onclick="app.removeFromCart(${item.id})">🗑️</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    updateCartUI() {
        const cartCount = document.getElementById('cartCount');
        const cartTotalUSD = document.getElementById('cartTotalUSD');
        const cartTotalCUP = document.getElementById('cartTotalCUP');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalUSD = this.cart.reduce((sum, item) => sum + (item.priceUSD * item.quantity), 0);
        const totalCUP = this.convertToCUP(totalUSD);
        
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.classList.toggle('show', totalItems > 0);
        }
        
        if (cartTotalUSD) {
            cartTotalUSD.textContent = `$${totalUSD.toFixed(2)}`;
        }
        
        if (cartTotalCUP) {
            cartTotalCUP.textContent = `$${totalCUP}`;
        }
        
        if (checkoutBtn) {
            checkoutBtn.disabled = this.cart.length === 0;
        }
    }
    
    saveCart() {
        localStorage.setItem('mueblescairo-cart', JSON.stringify(this.cart));
    }
    
    showCartNotification(productName) {
        // Create and show a temporary notification
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20,6 9,17 4,12"/>
                </svg>
                <span>${productName} añadido al carrito</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #28A745, #20C997);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Checkout Functionality
    renderCheckoutSummary() {
        const container = document.getElementById('orderSummary');
        const checkoutTotalUSD = document.getElementById('checkoutTotalUSD');
        const checkoutTotalCUP = document.getElementById('checkoutTotalCUP');
        const finalTotalUSD = document.getElementById('finalTotalUSD');
        const finalTotalCUP = document.getElementById('finalTotalCUP');
        
        if (!container) return;
        
        const totalUSD = this.cart.reduce((sum, item) => sum + (item.priceUSD * item.quantity), 0);
        const totalCUP = this.convertToCUP(totalUSD);
        
        container.innerHTML = this.cart.map(item => `
            <div class="order-item">
                <div class="item-info">
                    <div>${item.name}</div>
                    <div class="item-quantity">Cantidad: ${item.quantity}</div>
                </div>
                <div class="item-price">$${(item.priceUSD * item.quantity).toFixed(2)}</div>
            </div>
        `).join('');
        
        if (checkoutTotalUSD) checkoutTotalUSD.textContent = `$${totalUSD.toFixed(2)}`;
        if (checkoutTotalCUP) checkoutTotalCUP.textContent = `$${totalCUP}`;
        if (finalTotalUSD) finalTotalUSD.textContent = `$${totalUSD.toFixed(2)}`;
        if (finalTotalCUP) finalTotalCUP.textContent = `$${totalCUP}`;
    }
    
    populateMunicipalities() {
        const municipalitySelect = document.querySelector('select[name="municipality"]');
        if (!municipalitySelect) return;
        
        municipalitySelect.innerHTML = '<option value="">Seleccionar municipio</option>' +
            this.havanaMunicipalities.map(municipality => 
                `<option value="${municipality}">${municipality}</option>`
            ).join('');
    }
    
    handleCheckout(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!this.validateCheckoutForm(data)) {
            return;
        }
        
        // Calculate totals
        const totalUSD = this.cart.reduce((sum, item) => sum + (item.priceUSD * item.quantity), 0);
        const totalCUP = this.convertToCUP(totalUSD);
        
        // Create WhatsApp message
        const whatsappMessage = this.createWhatsAppMessage(data, totalUSD, totalCUP);
        
        // Send to WhatsApp
        const whatsappUrl = `https://wa.me/5350662019?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
        
        // Clear cart and show success
        this.cart = [];
        this.saveCart();
        this.updateCartUI();
        
        // Close checkout and show success
        document.getElementById('checkoutModal').classList.remove('show');
        document.getElementById('successModal').classList.add('show');
    }
    
    validateCheckoutForm(data) {
        let isValid = true;
        const errors = {};
        
        // Name validation
        if (!data.fullName || data.fullName.trim().length < 2) {
            errors.fullName = 'El nombre debe tener al menos 2 caracteres';
            isValid = false;
        }
        
        // CI validation - exactly 11 digits
        if (!data.ci || !/^\d{11}$/.test(data.ci)) {
            errors.ci = 'El carné de identidad debe tener exactamente 11 dígitos';
            isValid = false;
        }
        
        // Phone validation - exactly 8 digits
        if (!data.phone || !/^\d{8}$/.test(data.phone)) {
            errors.phone = 'El teléfono debe tener exactamente 8 dígitos';
            isValid = false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            errors.email = 'Ingrese un correo electrónico válido';
            isValid = false;
        }
        
        // Address validation
        if (!data.address || data.address.trim().length < 10) {
            errors.address = 'La dirección debe ser más específica';
            isValid = false;
        }
        
        // Province validation
        if (!data.province) {
            errors.province = 'Seleccione una provincia';
            isValid = false;
        }
        
        // Municipality validation
        if (!data.municipality) {
            errors.municipality = 'Seleccione un municipio';
            isValid = false;
        }
        
        // Display errors
        this.displayFormErrors(errors);
        
        return isValid;
    }
    
    displayFormErrors(errors) {
        // Clear previous errors
        document.querySelectorAll('.form-group.error').forEach(group => {
            group.classList.remove('error');
        });
        
        // Display new errors
        Object.keys(errors).forEach(field => {
            const input = document.querySelector(`[name="${field}"]`);
            if (input) {
                const formGroup = input.closest('.form-group');
                const errorMessage = formGroup.querySelector('.error-message');
                
                formGroup.classList.add('error');
                if (errorMessage) {
                    errorMessage.textContent = errors[field];
                }
            }
        });
    }
    
    createWhatsAppMessage(data, totalUSD, totalCUP) {
        const items = this.cart.map(item => 
            `• ${item.name} - Cantidad: ${item.quantity} - $${(item.priceUSD * item.quantity).toFixed(2)} USD`
        ).join('\n');
        
        return `🪑 *NUEVO PEDIDO - MUEBLES CAIRO*

👤 *DATOS DEL CLIENTE:*
Nombre: ${data.fullName}
CI: ${data.ci}
Teléfono: +53 ${data.phone}
Email: ${data.email}

📍 *DIRECCIÓN DE ENTREGA:*
${data.address}
${data.municipality}, ${data.province}

🛍️ *PRODUCTOS:*
${items}

💰 *TOTAL:*
$${totalUSD.toFixed(2)} USD / $${totalCUP} CUP

💳 *MÉTODO DE PAGO:*
${data.paymentMethod === 'efectivo' ? 'Efectivo (Contra entrega)' : 'Transferencia Bancaria'}

🚚 *ENTREGA GRATIS EN LA HABANA*

¡Gracias por elegir Muebles Cairo! 🇨🇺`;
    }
    
    // Utility Functions
    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        // Re-render products
        this.renderAllProducts();
    }
    
    convertToCUP(usdAmount) {
        return (usdAmount * this.exchangeRate).toLocaleString('es-CU');
    }
    
    getCategoryName(category) {
        const categories = {
            'sillas': 'Sillas y Asientos',
            'mesas': 'Mesas',
            'estantes': 'Estantes y Librerías',
            'decoracion': 'Decoración'
        };
        return categories[category] || category;
    }
    
    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    showSuccessMessage(message) {
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20,6 9,17 4,12"/>
                </svg>
                <span>${message}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #28A745, #20C997);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
}

// Global Functions
function scrollToSection(sectionId) {
    app.scrollToSection(sectionId);
}

function filterProducts(category) {
    app.setFilter(category);
}

// Initialize App
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new MueblesCairoApp();
});

// Export for global access
window.app = app;