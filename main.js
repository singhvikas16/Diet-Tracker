// Diet Tracker Main JavaScript
class DietTracker {
    constructor() {
        this.currentWeight = 93.0;
        this.targetWeight = 80.0;
        this.dailyCalorieTarget = 1800;
        this.selectedMeals = {
            breakfast: null,
            lunch: null,
            snack: null,
            dinner: null
        };
        this.weightHistory = [];
        this.init();
    }

    init() {
        this.loadData();
        this.initializeTypedText();
        this.updateStats();
        this.setTodayDate();
        this.animateElements();
    }

    loadData() {
        const savedData = localStorage.getItem('dietTrackerData');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.currentWeight = data.currentWeight || 93.0;
            this.weightHistory = data.weightHistory || [];
            this.selectedMeals = data.selectedMeals || {
                breakfast: null,
                lunch: null,
                snack: null,
                dinner: null
            };
        }
    }

    saveData() {
        const data = {
            currentWeight: this.currentWeight,
            weightHistory: this.weightHistory,
            selectedMeals: this.selectedMeals,
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem('dietTrackerData', JSON.stringify(data));
    }

    initializeTypedText() {
        if (document.getElementById('typed-text')) {
            new Typed('#typed-text', {
                strings: [
                    'Welcome, Vikas & Supriya!',
                    'Your Health Journey Starts Here',
                    'From 93kg to 80kg Together',
                    'Healthy Eating Made Simple'
                ],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 2000,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
        }
    }

    setTodayDate() {
        const today = new Date().toISOString().split('T')[0];
        const weightDateInput = document.getElementById('weight-date');
        if (weightDateInput) {
            weightDateInput.value = today;
        }
    }

    updateStats() {
        const weightLost = Math.max(0, 93.0 - this.currentWeight);
        const streakDays = this.calculateStreak();

        // Animate number updates
        this.animateNumber('current-weight', this.currentWeight, 1);
        this.animateNumber('weight-lost', weightLost, 1);
        this.animateNumber('streak-days', streakDays, 0);
    }

    animateNumber(elementId, targetValue, decimals) {
        const element = document.getElementById(elementId);
        if (!element) return;

        const startValue = parseFloat(element.textContent) || 0;
        const increment = (targetValue - startValue) / 50;
        let currentValue = startValue;

        const timer = setInterval(() => {
            currentValue += increment;
            if (Math.abs(currentValue - targetValue) < Math.abs(increment)) {
                currentValue = targetValue;
                clearInterval(timer);
            }
            element.textContent = currentValue.toFixed(decimals);
        }, 20);
    }

    calculateStreak() {
        if (this.weightHistory.length < 2) return 1;
        
        let streak = 1;
        const today = new Date();
        
        for (let i = this.weightHistory.length - 1; i > 0; i--) {
            const currentDate = new Date(this.weightHistory[i].date);
            const previousDate = new Date(this.weightHistory[i - 1].date);
            const dayDiff = (currentDate - previousDate) / (1000 * 60 * 60 * 24);
            
            if (dayDiff <= 2) {
                streak++;
            } else {
                break;
            }
        }
        
        return streak;
    }

    updateCalorieProgress() {
        const totalCalories = this.calculateTotalCalories();
        const progressPercent = Math.min((totalCalories / this.dailyCalorieTarget) * 100, 100);
        
        const progressBar = document.getElementById('calorie-progress');
        const caloriesConsumed = document.getElementById('calories-consumed');
        const calorieStatus = document.getElementById('calorie-status');
        
        if (progressBar && caloriesConsumed && calorieStatus) {
            progressBar.style.width = progressPercent + '%';
            caloriesConsumed.textContent = totalCalories;
            
            const remaining = this.dailyCalorieTarget - totalCalories;
            if (remaining > 0) {
                calorieStatus.textContent = `${remaining} calories remaining for today`;
                calorieStatus.className = 'text-sm text-green-600 text-center';
            } else if (remaining === 0) {
                calorieStatus.textContent = 'Perfect! You\'ve hit your daily target!';
                calorieStatus.className = 'text-sm text-green-600 text-center font-semibold';
            } else {
                calorieStatus.textContent = `You're ${Math.abs(remaining)} calories over target`;
                calorieStatus.className = 'text-sm text-red-600 text-center';
            }
        }
    }

    calculateTotalCalories() {
        let total = 0;
        Object.values(this.selectedMeals).forEach(meal => {
            if (meal && meal.calories) {
                total += meal.calories;
            }
        });
        return total;
    }

    updateSelectedMealsDisplay() {
        const container = document.getElementById('selected-meals');
        if (!container) return;

        const hasSelectedMeals = Object.values(this.selectedMeals).some(meal => meal !== null);
        
        if (!hasSelectedMeals) {
            container.innerHTML = `
                <div class="text-center text-gray-500 py-8">
                    <p>Select your meals above to see your daily plan</p>
                </div>
            `;
            return;
        }

        const mealTypes = ['breakfast', 'lunch', 'snack', 'dinner'];
        const mealEmojis = { breakfast: '🌅', lunch: '🌞', snack: '🍎', dinner: '🌙' };
        
        container.innerHTML = mealTypes.map(type => {
            const meal = this.selectedMeals[type];
            if (!meal) return '';
            
            return `
                <div class="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <div class="flex items-center space-x-4">
                        <span class="text-2xl">${mealEmojis[type]}</span>
                        <div>
                            <div class="font-semibold text-gray-800 capitalize">${type}</div>
                            <div class="text-sm text-gray-600">${meal.name}</div>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="font-bold text-orange">${meal.calories} cal</div>
                        <button onclick="tracker.deselectMeal('${type}')" class="text-xs text-red-500 hover:text-red-700 transition-colors">
                            Remove
                        </button>
                    </div>
                </div>
            `;
        }).filter(html => html !== '').join('');
    }

    selectMeal(mealType, buttonElement) {
        const mealCard = buttonElement.closest('.flex');
        const mealName = mealCard.querySelector('.font-medium').textContent;
        const mealDetails = mealCard.querySelector('.text-sm').textContent;
        const calories = parseInt(mealCard.querySelector('.font-semibold').textContent);
        
        this.selectedMeals[mealType] = {
            name: mealName + ' ' + mealDetails,
            calories: calories
        };

        // Update UI
        this.updateMealButtons(mealType, buttonElement);
        this.updateCalorieProgress();
        this.updateSelectedMealsDisplay();
        this.saveData();

        // Show success animation
        this.showSuccessMessage(`${mealName} added to your ${mealType} plan!`);
    }

    deselectMeal(mealType) {
        this.selectedMeals[mealType] = null;
        this.updateMealButtons(mealType, null);
        this.updateCalorieProgress();
        this.updateSelectedMealsDisplay();
        this.saveData();
    }

    updateMealButtons(mealType, selectedButton) {
        const buttons = document.querySelectorAll(`#${mealType}-options button`);
        buttons.forEach(btn => {
            btn.textContent = 'Select';
            btn.className = 'text-xs bg-green-500 text-white px-2 py-1 rounded mt-1 hover:bg-green-600 transition-colors';
        });

        if (selectedButton && this.selectedMeals[mealType]) {
            selectedButton.textContent = 'Selected';
            selectedButton.className = 'text-xs bg-gray-400 text-white px-2 py-1 rounded mt-1 cursor-not-allowed';
            selectedButton.disabled = true;
        }
    }

    showSuccessMessage(message) {
        // Create and show success notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
        notification.textContent = message;
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);

        // Animate out and remove
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    animateElements() {
        // Animate cards on scroll
        const cards = document.querySelectorAll('.card-hover');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: entry.target,
                        translateY: [50, 0],
                        opacity: [0, 1],
                        duration: 800,
                        easing: 'easeOutQuart',
                        delay: Math.random() * 200
                    });
                }
            });
        });

        cards.forEach(card => observer.observe(card));

        // Animate progress bars
        const progressBars = document.querySelectorAll('.bg-gradient-to-r');
        progressBars.forEach(bar => {
            anime({
                targets: bar,
                scaleX: [0, 1],
                duration: 1500,
                easing: 'easeOutQuart',
                delay: 500
            });
        });
    }

    logWeight() {
        const modal = document.getElementById('weight-modal');
        const weightInput = document.getElementById('weight-input');
        
        if (modal && weightInput) {
            weightInput.value = this.currentWeight;
            modal.classList.remove('hidden');
            
            // Animate modal in
            anime({
                targets: modal.querySelector('.bg-white'),
                scale: [0.8, 1],
                opacity: [0, 1],
                duration: 300,
                easing: 'easeOutQuart'
            });
        }
    }

    closeWeightModal() {
        const modal = document.getElementById('weight-modal');
        if (modal) {
            anime({
                targets: modal.querySelector('.bg-white'),
                scale: [1, 0.8],
                opacity: [1, 0],
                duration: 200,
                easing: 'easeInQuart',
                complete: () => {
                    modal.classList.add('hidden');
                }
            });
        }
    }

    saveWeight() {
        const weightInput = document.getElementById('weight-input');
        const dateInput = document.getElementById('weight-date');
        
        if (weightInput && dateInput) {
            const newWeight = parseFloat(weightInput.value);
            const date = dateInput.value;
            
            if (newWeight && newWeight > 0) {
                this.currentWeight = newWeight;
                this.weightHistory.push({
                    weight: newWeight,
                    date: date,
                    timestamp: new Date().toISOString()
                });
                
                this.updateStats();
                this.saveData();
                this.closeWeightModal();
                this.showSuccessMessage(`Weight logged: ${newWeight}kg on ${date}`);
            } else {
                alert('Please enter a valid weight');
            }
        }
    }
}

// Global functions for HTML onclick handlers
function selectMeal(mealType, button) {
    tracker.selectMeal(mealType, button);
}

function logWeight() {
    tracker.logWeight();
}

function closeWeightModal() {
    tracker.closeWeightModal();
}

function saveWeight() {
    tracker.saveWeight();
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize the tracker when the page loads
let tracker;
document.addEventListener('DOMContentLoaded', () => {
    tracker = new DietTracker();
});

// Handle escape key to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('weight-modal');
        if (modal && !modal.classList.contains('hidden')) {
            tracker.closeWeightModal();
        }
    }
});

// Add some fun easter eggs
document.addEventListener('keydown', (e) => {
    // Konami code for a fun surprise
    if (e.key === 'Enter' && e.ctrlKey && e.shiftKey) {
        const celebration = document.createElement('div');
        celebration.className = 'fixed inset-0 pointer-events-none z-50';
        celebration.innerHTML = '🎉🎊🌟✨🎉🎊🌟✨';
        celebration.style.fontSize = '2rem';
        celebration.style.display = 'flex';
        celebration.style.justifyContent = 'center';
        celebration.style.alignItems = 'center';
        celebration.style.animation = 'bounce 2s infinite';
        document.body.appendChild(celebration);
        
        setTimeout(() => {
            document.body.removeChild(celebration);
        }, 3000);
    }
});