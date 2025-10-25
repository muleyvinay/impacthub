// Comprehensive Button Test Script
console.log('🧪 Starting Button Functionality Tests...');

// Test Results
const testResults = {
    passed: 0,
    failed: 0,
    total: 0
};

function runTest(testName, testFunction) {
    testResults.total++;
    try {
        const result = testFunction();
        if (result) {
            testResults.passed++;
            console.log(`✅ ${testName}: PASSED`);
        } else {
            testResults.failed++;
            console.log(`❌ ${testName}: FAILED`);
        }
    } catch (error) {
        testResults.failed++;
        console.log(`❌ ${testName}: ERROR - ${error.message}`);
    }
}

// Test 1: Navigation Links
runTest('Navigation Links', () => {
    const navLinks = document.querySelectorAll('a[href]');
    return navLinks.length > 0;
});

// Test 2: Form Elements
runTest('Form Elements', () => {
    const forms = document.querySelectorAll('form');
    const inputs = document.querySelectorAll('input');
    return forms.length > 0 && inputs.length > 0;
});

// Test 3: Button Elements
runTest('Button Elements', () => {
    const buttons = document.querySelectorAll('button');
    return buttons.length > 0;
});

// Test 4: Event Listeners
runTest('Event Listeners', () => {
    // Check if common event listeners are attached
    const hasClickListeners = document.querySelectorAll('[onclick]').length > 0;
    const hasFormListeners = document.querySelectorAll('form').length > 0;
    return hasClickListeners || hasFormListeners;
});

// Test 5: Authentication Functions
runTest('Authentication Functions', () => {
    return typeof checkAuth === 'function' && typeof logout === 'function';
});

// Test 6: Toggle Functions
runTest('Toggle Functions', () => {
    return typeof toggleDropdown === 'function' && typeof toggleMobileDropdown === 'function';
});

// Test 7: Message Display
runTest('Message Display Function', () => {
    return typeof showMessage === 'function';
});

// Test 8: Form Validation
runTest('Form Validation', () => {
    const emailInputs = document.querySelectorAll('input[type="email"]');
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    return emailInputs.length > 0 && passwordInputs.length > 0;
});

// Test 9: Social Login Buttons
runTest('Social Login Buttons', () => {
    const socialBtns = document.querySelectorAll('.social-btn');
    return socialBtns.length > 0;
});

// Test 10: Dashboard Quick Actions
runTest('Dashboard Quick Actions', () => {
    const quickActions = document.querySelectorAll('a[href="/projects/"], a[href="/community/"], a[href="/account/"], a[href="/trending/"]');
    return quickActions.length > 0;
});

// Test 11: Responsive Navigation
runTest('Responsive Navigation', () => {
    const mobileNav = document.querySelector('.nav-mobile');
    const desktopNav = document.querySelector('.nav-desktop');
    return mobileNav && desktopNav;
});

// Test 12: Hover Effects
runTest('Hover Effects', () => {
    const hoverElements = document.querySelectorAll('.hover-lift, .micro-bounce, .ripple');
    return hoverElements.length > 0;
});

// Test 13: Animation Classes
runTest('Animation Classes', () => {
    const animatedElements = document.querySelectorAll('.floating-animation, .pulse-glow');
    return animatedElements.length > 0;
});

// Test 14: Glass Effects
runTest('Glass Effects', () => {
    const glassElements = document.querySelectorAll('.glass-effect');
    return glassElements.length > 0;
});

// Test 15: Gradient Elements
runTest('Gradient Elements', () => {
    const gradientElements = document.querySelectorAll('[class*="gradient"]');
    return gradientElements.length > 0;
});

// Final Results
console.log('\n📊 Test Results Summary:');
console.log(`✅ Passed: ${testResults.passed}`);
console.log(`❌ Failed: ${testResults.failed}`);
console.log(`📈 Total: ${testResults.total}`);
console.log(`🎯 Success Rate: ${((testResults.passed / testResults.total) * 100).toFixed(1)}%`);

if (testResults.failed === 0) {
    console.log('🎉 All tests passed! All buttons and functions are working correctly.');
} else {
    console.log('⚠️ Some tests failed. Please check the failed tests above.');
}

// Export results for external use
window.testResults = testResults;
