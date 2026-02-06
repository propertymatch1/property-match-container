/**
 * Manual Touch Target Verification Script
 * 
 * This script can be run in the browser console to verify that all interactive
 * elements meet the 44px minimum touch target requirement.
 * 
 * Usage: Copy and paste this code into the browser console on the tenant dashboard page.
 */

export function verifyTouchTargets(): void {
  console.log('🎯 Starting Touch Target Verification...\n');

  // Find all interactive elements
  const interactiveSelectors = [
    'button',
    'a[href]',
    '[role="button"]',
    '[tabindex="0"]',
    'input[type="button"]',
    'input[type="submit"]',
    'input[type="reset"]'
  ];

  const interactiveElements = document.querySelectorAll(interactiveSelectors.join(', '));
  
  let passCount = 0;
  let failCount = 0;
  const failures: Array<{ element: Element; height: number; width: number }> = [];

  console.log(`Found ${interactiveElements.length} interactive elements to check:\n`);

  interactiveElements.forEach((element, index) => {
    const computedStyle = window.getComputedStyle(element as HTMLElement);
    const rect = element.getBoundingClientRect();
    
    // Get the effective touch target size
    const height = Math.max(
      parseFloat(computedStyle.height) || 0,
      parseFloat(computedStyle.minHeight) || 0,
      rect.height
    );
    
    const width = Math.max(
      parseFloat(computedStyle.width) || 0,
      parseFloat(computedStyle.minWidth) || 0,
      rect.width
    );

    // Check if meets 44px minimum requirement
    const meetsHeightRequirement = height >= 44;
    const meetsWidthRequirement = width >= 44;
    const meetsRequirement = meetsHeightRequirement && meetsWidthRequirement;

    if (meetsRequirement) {
      passCount++;
      console.log(`✅ Element ${index + 1}: ${element.tagName.toLowerCase()}${element.className ? '.' + element.className.split(' ').join('.') : ''} - ${Math.round(height)}px × ${Math.round(width)}px`);
    } else {
      failCount++;
      failures.push({ element, height, width });
      console.log(`❌ Element ${index + 1}: ${element.tagName.toLowerCase()}${element.className ? '.' + element.className.split(' ').join('.') : ''} - ${Math.round(height)}px × ${Math.round(width)}px (TOO SMALL)`);
      
      // Highlight the failing element in the browser
      (element as HTMLElement).style.outline = '3px solid red';
      (element as HTMLElement).style.outlineOffset = '2px';
    }
  });

  console.log(`\n📊 Touch Target Verification Results:`);
  console.log(`✅ Passed: ${passCount} elements`);
  console.log(`❌ Failed: ${failCount} elements`);
  console.log(`📈 Success Rate: ${Math.round((passCount / interactiveElements.length) * 100)}%\n`);

  if (failures.length > 0) {
    console.log('🔍 Failed Elements Details:');
    failures.forEach((failure, index) => {
      console.log(`${index + 1}. ${failure.element.tagName} - ${Math.round(failure.height)}px × ${Math.round(failure.width)}px`);
      console.log(`   Classes: ${failure.element.className || 'none'}`);
      console.log(`   Text: ${failure.element.textContent?.trim().substring(0, 50) || 'no text'}...`);
      console.log('');
    });

    console.log('💡 Tip: Failed elements are highlighted with red outlines in the page.');
    console.log('💡 Run clearHighlights() to remove the red outlines.');
  } else {
    console.log('🎉 All interactive elements meet the 44px minimum touch target requirement!');
  }
}

export function clearHighlights(): void {
  const highlightedElements = document.querySelectorAll('[style*="outline: 3px solid red"]');
  highlightedElements.forEach(element => {
    (element as HTMLElement).style.outline = '';
    (element as HTMLElement).style.outlineOffset = '';
  });
  console.log(`🧹 Cleared highlights from ${highlightedElements.length} elements.`);
}

// Make functions available globally for console use
if (typeof window !== 'undefined') {
  (window as any).verifyTouchTargets = verifyTouchTargets;
  (window as any).clearHighlights = clearHighlights;
}

// Auto-run verification if script is loaded directly
if (typeof window !== 'undefined' && document.readyState === 'complete') {
  console.log('🚀 Touch target verification script loaded. Run verifyTouchTargets() to check the page.');
} else if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    console.log('🚀 Touch target verification script loaded. Run verifyTouchTargets() to check the page.');
  });
}