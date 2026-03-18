document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const element = document.querySelector(targetId);
            if(element) element.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Scroll Reveal Animation (including Typewriter for Flywheel)
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // TYPEWRITER EFFECT FOR THE FLYWHEEL SECTION
                const typeWriters = entry.target.querySelectorAll('.typewriter-text');
                if (typeWriters.length > 0 && !entry.target.classList.contains('typed')) {
                    entry.target.classList.add('typed');
                    typeWriters.forEach((el, index) => {
                        const fullText = el.getAttribute('data-text');
                        el.textContent = '';
                        let i = 0;
                        setTimeout(() => {
                            const interval = setInterval(() => {
                                if (i < fullText.length) {
                                    el.textContent += fullText.charAt(i);
                                    i++;
                                } else {
                                    clearInterval(interval);
                                    el.classList.add('finished-typing'); // Remove cursor
                                }
                            }, 35); // Adjust typing speed here
                        }, index * 1200); // 1.2s delay before the next step starts typing
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-reveal').forEach(section => {
        observer.observe(section);
    });

    // FAQ Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            header.classList.toggle('active');
            const content = header.nextElementSibling;
            if (header.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = 0;
            }
        });
    });

    // Generate Twinkling AI Network with Canvas Spark Connectivity
    const canvas = document.getElementById('hero-network-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        const baseDist = 140; 

        const resize = () => {
            width = canvas.parentElement.clientWidth;
            height = canvas.parentElement.clientHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.2; 
                this.vy = (Math.random() - 0.5) * 0.2;
                this.radius = Math.random() * 2.5 + 1;
                
                // Logic side vs Culture side: AI Blue on Left, Gold on Right
                this.side = this.x < width / 2 ? 'left' : 'right';
                this.baseColor = this.side === 'left' ? '0, 180, 216' : '255, 183, 3'; 
                
                this.pulsePhase = Math.random() * Math.PI * 2;
                this.pulseSpeed = 0.01 + Math.random() * 0.03;

                // Randomizing Connection Reach and Intensity (Weak, Moderate, Strong)
                this.intensity = Math.random() < 0.33 ? 0.3 : (Math.random() < 0.66 ? 0.7 : 1.3);
                this.reach = baseDist * (0.5 + Math.random() * 1.0); // Reach ranges from 70px to 210px
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
                
                if (this.side === 'left' && this.x > width / 2) this.vx -= 0.01;
                if (this.side === 'right' && this.x < width / 2) this.vx += 0.01;

                this.pulsePhase += this.pulseSpeed;
            }

            draw() {
                const alpha = Math.abs(Math.sin(this.pulsePhase)) * 0.7 + 0.3;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${this.baseColor}, ${alpha})`;
                ctx.shadowBlur = 12 * this.intensity; 
                ctx.shadowColor = `rgba(${this.baseColor}, 0.8)`;
                ctx.fill();
            }
        }

        for (let i = 0; i < 75; i++) particles.push(new Particle());

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    if (particles[i].side === particles[j].side) { 
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        const dynamicMaxDist = (particles[i].reach + particles[j].reach) / 2;

                        if (dist < dynamicMaxDist) {
                            const proximityAlpha = (1 - dist / dynamicMaxDist) * 0.6;
                            const sparkPulse = Math.abs(Math.sin(particles[i].pulsePhase * 4 + particles[j].pulsePhase * 4));
                            const combinedIntensity = (particles[i].intensity + particles[j].intensity) / 2;
                            const finalAlpha = proximityAlpha * sparkPulse * combinedIntensity;
                            
                            ctx.beginPath();
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.strokeStyle = `rgba(${particles[i].baseColor}, ${finalAlpha})`;
                            ctx.lineWidth = combinedIntensity * 1.5;
                            ctx.shadowBlur = combinedIntensity * 8;
                            ctx.stroke();
                        }
                    }
                }
            }
            requestAnimationFrame(animate);
        };
        animate();
    }

    // Buffett Sketch Animation Sequence
    const sketches = document.querySelectorAll('.buffett-sketch');
    const pencil = document.querySelector('.shading-pencil');
    if (sketches.length > 0) {
        
        const drawSketch = (index) => {
            // Move active to holding
            sketches.forEach(s => {
                if (s.classList.contains('active')) {
                    s.classList.remove('active');
                    s.classList.add('holding');
                }
            });
            
            // Start wiping new sketch
            sketches[index].classList.remove('holding');
            sketches[index].classList.add('active');
            
            // Trigger pencil animation
            if (pencil) {
                pencil.classList.remove('drawing'); // reset
                void pencil.offsetWidth; // force browser reflow
                pencil.classList.add('drawing');
            }
        };

        const runSequence = () => {
            sketches.forEach(s => {
                s.classList.remove('active');
                s.classList.remove('holding');
            });
            
            drawSketch(0);
            
            setTimeout(() => { drawSketch(1); }, 4000);
            
            setTimeout(() => { drawSketch(2); }, 8000);
            
            // Hold Image 3 visible for the 2-minute pause
        };

        // Start 1st sequence delayed so they see it naturally
        setTimeout(runSequence, 1000);
        
        // Repeat every 132 seconds (12 seconds drawing + 120 second pause)
        setInterval(runSequence, 132000);
    }
    
    // --- CHECKOUT & ENROLLMENT LOGIC ---
    const checkoutModal = document.getElementById('checkout-modal');
    const closeCheckoutBtn = document.querySelector('.hide-checkout');
    const enrollBtns = document.querySelectorAll('.enroll-btn');
    const paymentForm = document.getElementById('payment-form');
    const successMessage = document.getElementById('success-message');
    
    const courseNameEl = document.getElementById('modal-course-name');
    const coursePriceEl = document.getElementById('modal-price');

    let isEnrolling = sessionStorage.getItem('isEnrolling') === 'true';

    enrollBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Disable all future popups because they are enrolling
            isEnrolling = true;
            sessionStorage.setItem('isEnrolling', 'true');
            if (typeof timer10 !== 'undefined' && timer10) clearTimeout(timer10);
            if (typeof timer20 !== 'undefined' && timer20) clearTimeout(timer20);
            
            const m10 = document.getElementById('discount-modal-10');
            const m20 = document.getElementById('discount-modal-20');
            if(m10) m10.classList.remove('show');
            if(m20) m20.classList.remove('show');

            const courseName = e.target.getAttribute('data-course');
            const coursePrice = e.target.getAttribute('data-price');
            
            courseNameEl.textContent = courseName;
            coursePriceEl.textContent = '$' + coursePrice;
            
            paymentForm.classList.remove('hidden');
            successMessage.classList.add('hidden');
            paymentForm.reset();
            
            checkoutModal.classList.add('show');
        });
    });

    closeCheckoutBtn.addEventListener('click', () => {
        checkoutModal.classList.remove('show');
    });

    // --- POP-UP DISCOUNT LOGIC ---
    
    // 10% Offer at exactly 2 Minutes
    let timer10 = setTimeout(() => {
        if (!isEnrolling && !sessionStorage.getItem('seen10')) {
            const el = document.getElementById('discount-modal-10');
            if(el) el.classList.add('show');
            sessionStorage.setItem('seen10', 'true');
        }
    }, 120000); // 120,000 ms = 2 minutes

    // 20% Final Offer at exactly 4 Minutes
    let timer20 = setTimeout(() => {
        if (!isEnrolling && !sessionStorage.getItem('seen20')) {
            const el = document.getElementById('discount-modal-20');
            if(el) el.classList.add('show');
            sessionStorage.setItem('seen20', 'true');
        }
    }, 240000); // 240,000 ms = 4 minutes

    // Exit-Intent trigger for the 20% deal 
    setTimeout(() => {
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY < 5 && !isEnrolling && !sessionStorage.getItem('seen20')) {
                const el = document.getElementById('discount-modal-20');
                if(el) el.classList.add('show');
                sessionStorage.setItem('seen20', 'true');
            }
        });
    }, 60000);

    // Close buttons for discount modals
    document.querySelectorAll('.close-discount').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = e.target.getAttribute('data-target');
            if(targetId) {
                const el = document.getElementById(targetId);
                if(el) el.classList.remove('show');
            }
        });
    });

    // Claim Discount Buttons
    document.querySelectorAll('.claim-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = e.target.getAttribute('data-target');
            if(targetId) {
                const el = document.getElementById(targetId);
                if(el) el.classList.remove('show');
            }
            // Visually scroll them to courses
            const p = document.getElementById('pathways');
            if(p) p.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Window global clicks to close modals
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('show');
        }
    });

    // Simulate Secure Payment
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submit-payment');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Processing Secure Payment...';
        submitBtn.disabled = true;

        // Fake network delay
        setTimeout(() => {
            paymentForm.classList.add('hidden');
            successMessage.classList.remove('hidden');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });

});
