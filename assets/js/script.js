        // LocalStorage keys
        const STORAGE_KEYS = {
            RECENT_VIEWS: 'bacoor_recent_views',
            PREFERENCES: 'bacoor_preferences'
        };

        // Sample News Data
        const newsData = [
            {
                id: 1,
                title: 'New Public Market Opens in Bacoor',
                date: 'February 5, 2026',
                excerpt: 'Mayor inaugurates the newly constructed public market facility, providing better shopping experience for residents.',
                content: 'The City Government of Bacoor officially opened its newest public market facility yesterday, marking a significant milestone in the city\'s infrastructure development. The modern facility features improved sanitation, wider aisles, and better ventilation for vendors and customers.',
                icon: '🏪'
            },
            {
                id: 2,
                title: 'Free Medical Mission This Weekend',
                date: 'February 4, 2026',
                excerpt: 'City Health Office announces free medical and dental services for all Bacoor residents on Saturday and Sunday.',
                content: 'The Bacoor City Health Office will conduct a two-day free medical and dental mission this coming weekend at the City Health Center. Services include general checkup, dental extraction, and free medicines. Senior citizens and PWDs are given priority.',
                icon: '🏥'
            },
            {
                id: 3,
                title: 'Traffic Rerouting Advisory',
                date: 'February 3, 2026',
                excerpt: 'Road construction on Aguinaldo Highway will cause temporary traffic rerouting from February 10-20.',
                content: 'Motorists are advised of temporary traffic rerouting along Aguinaldo Highway due to ongoing road improvement projects. Alternative routes will be clearly marked. The city government apologizes for any inconvenience and appreciates the public\'s understanding.',
                icon: '🚧'
            },
            {
                id: 4,
                title: 'Job Fair for Bacoor Residents',
                date: 'February 2, 2026',
                excerpt: 'Over 50 companies to participate in the quarterly job fair offering various employment opportunities.',
                content: 'The Bacoor City Employment Services Office will host its quarterly job fair on February 15, 2026, at the City Gymnasium. More than 50 local and national companies will be offering various job opportunities for qualified applicants.',
                icon: '💼'
            },
            {
                id: 5,
                title: 'Enhanced Scholarship Program Launched',
                date: 'February 1, 2026',
                excerpt: 'City expands educational assistance program to benefit more deserving students.',
                content: 'Mayor announces the expansion of the city\'s scholarship program, now covering additional courses and increasing the number of beneficiaries. Applications for the upcoming school year will open on March 1, 2026.',
                icon: '🎓'
            },
            {
                id: 6,
                title: 'Waste Segregation Campaign Intensified',
                date: 'January 31, 2026',
                excerpt: 'Environmental Management Office launches information drive on proper waste disposal.',
                content: 'As part of the city\'s commitment to environmental protection, the Environmental Management Office has intensified its waste segregation campaign. Residents are reminded to properly segregate biodegradable and non-biodegradable waste.',
                icon: '♻️'
            }
        ];

        // Departments Data
        const departmentsData = [
            { name: 'Mayor\'s Office', icon: '🏛️', description: 'Executive department' },
            { name: 'City Treasurer', icon: '💰', description: 'Financial services' },
            { name: 'City Health Office', icon: '🏥', description: 'Health programs' },
            { name: 'City Engineer', icon: '🏗️', description: 'Infrastructure projects' },
            { name: 'City Planning', icon: '📐', description: 'Urban development' },
            { name: 'Social Welfare', icon: '🤝', description: 'Social services' },
            { name: 'City Assessor', icon: '📋', description: 'Property assessment' },
            { name: 'Business Permits', icon: '📄', description: 'Licensing office' },
            { name: 'Civil Registrar', icon: '📝', description: 'Civil documents' },
            { name: 'Public Safety', icon: '🚨', description: 'Security & disaster' },
            { name: 'Education Office', icon: '🎓', description: 'Education programs' },
            { name: 'Agriculture', icon: '🌾', description: 'Farming support' }
        ];

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', function() {
            loadNews();
            loadDepartments();
            initializeNavigation();
            initializeFormValidation();
            loadRecentViews();
        });

        // Navigation functionality
        function initializeNavigation() {
            const navLinks = document.querySelectorAll('.nav-link');
            const pages = document.querySelectorAll('.page-content');

            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);

                    // Update active nav link
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');

                    // Show target page
                    pages.forEach(page => {
                        page.classList.remove('active');
                        if (page.id === targetId) {
                            page.classList.add('active');
                            // Scroll to top
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            // Store in recent views
                            storeRecentView(targetId);
                        }
                    });
                });
            });
        }

        // Load news dynamically
        function loadNews() {
            const newsFeed = document.getElementById('news-feed');
            const allNewsFeed = document.getElementById('all-news-feed');
            
            // Show loading
            newsFeed.innerHTML = '<div class="loading"><div class="spinner"></div><p>Loading announcements...</p></div>';
            
            // Simulate loading delay
            setTimeout(() => {
                // Display first 3 news items on home page
                const homeNewsHTML = newsData.slice(0, 3).map(news => createNewsCard(news)).join('');
                newsFeed.innerHTML = homeNewsHTML;

                // Display all news on news page
                const allNewsHTML = newsData.map(news => createNewsCard(news)).join('');
                allNewsFeed.innerHTML = allNewsHTML;
            }, 800);
        }

        // Create news card HTML
        function createNewsCard(news) {
            return `
                <div class="news-card" onclick="openModal(${news.id})">
                    <div class="news-image">${news.icon}</div>
                    <div class="news-content">
                        <div class="news-date">${news.date}</div>
                        <h3>${news.title}</h3>
                        <p>${news.excerpt}</p>
                    </div>
                </div>
            `;
        }

        // Load departments
        function loadDepartments() {
            const deptGrid = document.getElementById('dept-grid');
            const deptHTML = departmentsData.map(dept => `
                <div class="dept-card">
                    <div class="dept-icon">${dept.icon}</div>
                    <h3>${dept.name}</h3>
                    <p>${dept.description}</p>
                </div>
            `).join('');
            deptGrid.innerHTML = deptHTML;
        }

        // Department search functionality
        const deptSearchInput = document.getElementById('dept-search-input');
        if (deptSearchInput) {
            deptSearchInput.addEventListener('input', function(e) {
                const searchTerm = e.target.value.toLowerCase();
                const deptCards = document.querySelectorAll('.dept-card');
                
                deptCards.forEach(card => {
                    const text = card.textContent.toLowerCase();
                    if (text.includes(searchTerm)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        }

        // Modal functions
        function openModal(newsId) {
            const news = newsData.find(n => n.id === newsId);
            if (news) {
                document.getElementById('modal-title').textContent = news.title;
                document.getElementById('modal-body').innerHTML = `
                    <div style="text-align: center; font-size: 4rem; margin-bottom: 1rem;">${news.icon}</div>
                    <div style="color: var(--primary-gold); font-weight: 600; margin-bottom: 1rem;">${news.date}</div>
                    <p style="line-height: 1.8; color: var(--text-gray);">${news.content}</p>
                `;
                document.getElementById('announcement-modal').classList.add('active');
            }
        }

        function closeModal() {
            document.getElementById('announcement-modal').classList.remove('active');
        }

        function openServiceRequest(serviceType = '') {
            const modal = document.getElementById('service-modal');
            modal.classList.add('active');
            
            if (serviceType) {
                document.getElementById('service-type').value = serviceType;
            }
        }

        function closeServiceModal() {
            document.getElementById('service-modal').classList.remove('active');
            document.getElementById('service-form').reset();
            // Remove error states
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('error');
            });
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            const announcementModal = document.getElementById('announcement-modal');
            const serviceModal = document.getElementById('service-modal');
            
            if (event.target === announcementModal) {
                closeModal();
            }
            if (event.target === serviceModal) {
                closeServiceModal();
            }
        }

        // Form validation
        function initializeFormValidation() {
            const contactForm = document.getElementById('contact-form');
            const serviceForm = document.getElementById('service-form');

            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    if (validateForm(this)) {
                        alert('Thank you for your message! We will get back to you soon.');
                        this.reset();
                        document.querySelectorAll('.form-group').forEach(group => {
                            group.classList.remove('error');
                        });
                    }
                });
            }

            if (serviceForm) {
                serviceForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    if (validateForm(this)) {
                        alert('Your service request has been submitted successfully! We will contact you soon.');
                        closeServiceModal();
                    }
                });
            }

            // Real-time validation
            const inputs = document.querySelectorAll('input[required], textarea[required], select[required]');
            inputs.forEach(input => {
                input.addEventListener('blur', function() {
                    validateField(this);
                });
                input.addEventListener('input', function() {
                    if (this.parentElement.classList.contains('error')) {
                        validateField(this);
                    }
                });
            });
        }

        function validateForm(form) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });
            
            return isValid;
        }

        function validateField(field) {
            const formGroup = field.parentElement;
            let isValid = true;

            if (field.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(field.value);
            } else if (field.tagName === 'SELECT') {
                isValid = field.value !== '';
            } else {
                isValid = field.value.trim() !== '';
            }

            if (isValid) {
                formGroup.classList.remove('error');
            } else {
                formGroup.classList.add('error');
            }

            return isValid;
        }

        // LocalStorage functions
        function storeRecentView(pageId) {
            let recentViews = JSON.parse(localStorage.getItem(STORAGE_KEYS.RECENT_VIEWS) || '[]');
            
            // Add to beginning and remove duplicates
            recentViews = [pageId, ...recentViews.filter(id => id !== pageId)];
            
            // Keep only last 5 views
            recentViews = recentViews.slice(0, 5);
            
            localStorage.setItem(STORAGE_KEYS.RECENT_VIEWS, JSON.stringify(recentViews));
        }

        function loadRecentViews() {
            const recentViews = JSON.parse(localStorage.getItem(STORAGE_KEYS.RECENT_VIEWS) || '[]');
            console.log('Recent page views:', recentViews);
        }

        // Save user preferences
        function savePreference(key, value) {
            let preferences = JSON.parse(localStorage.getItem(STORAGE_KEYS.PREFERENCES) || '{}');
            preferences[key] = value;
            localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(preferences));
        }

        function getPreference(key) {
            const preferences = JSON.parse(localStorage.getItem(STORAGE_KEYS.PREFERENCES) || '{}');
            return preferences[key];
        }