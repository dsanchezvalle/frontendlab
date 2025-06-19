'use client'

import Image from "next/image"

export default function ArticleBody() {
  return (
        <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
          <div className="font-serif">
            <p className="lead text-lg">
            Creating accessible components isn&apos;t just about compliance—it&apos;s about building better user experiences for
            everyone. In this article, we&apos;ll explore practical techniques for building React components that are both
            beautiful and accessible.
            </p>

            <h2 className="font-sans mt-8 mb-4 text-2xl">Why Accessibility Matters</h2>
            <p>
              Web accessibility ensures that people with disabilities can perceive, understand, navigate, and interact
              with websites and tools. For React developers, this means creating components that work with assistive
              technologies and can be used by keyboard-only users.
            </p>
            <p>Beyond the ethical considerations, there are practical reasons to prioritize accessibility:</p>
            <ul>
              <li>It expands your user base</li>
              <li>It improves SEO</li>
              <li>It&apos;s often a legal requirement</li>
              <li>It leads to better overall UX for all users</li>
            </ul>

            <h2 className="font-sans mt-8 mb-4 text-2xl">Key Principles for Accessible Components</h2>
            <p>When building React components, keep these principles in mind:</p>

            <h3 className="font-sans mt-6 mb-3 text-xl">1. Semantic HTML</h3>
            <p>
              Always start with the most appropriate HTML element for the job. React makes it easy to forget that we&apos;re
              still building with HTML, but the right semantic elements provide built-in accessibility features.
            </p>


            <div className="my-6 bg-muted p-4 rounded-md overflow-x-auto">
              <pre className="font-mono text-sm">
                <code>{`// Bad
<div onClick={handleClick}>Click me</div>

// Good
<button onClick={handleClick}>Click me</button>`}</code>
              </pre>
            </div>

            <h3 className="font-sans mt-6 mb-3 text-xl">2. Keyboard Navigation</h3>
            <p>
              Ensure all interactive elements can be accessed and operated using only a keyboard. This includes focus
              management, which is especially important in SPAs.
            </p>

            <div className="my-6 p-4 border rounded-md bg-muted/30">
            <p className="italic text-muted-foreground">
              <strong>Pro tip:</strong> Try navigating your application using only the Tab, Enter, and arrow keys. If
              you can&apos;t access all interactive elements or if the focus order is confusing, you have work to do.
            </p>
            </div>

            <h3 className="font-sans mt-6 mb-3 text-xl">3. ARIA Attributes</h3>
            <p>
              When HTML semantics aren&apos;t enough, ARIA attributes can provide additional context to assistive
              technologies. However, use them judiciously—no ARIA is better than bad ARIA.
            </p>

            <div className="my-6 bg-muted p-4 rounded-md overflow-x-auto">
              <pre className="font-mono text-sm">
                <code>{`<button
  aria-expanded={isOpen}
  aria-controls="dropdown-menu"
  onClick={toggleMenu}
>
  Menu
</button>
<div id="dropdown-menu" hidden={!isOpen}>
  {/* Menu items */}
</div>`}</code>
              </pre>
            </div>

            <h2 className="font-sans mt-8 mb-4 text-2xl">Building an Accessible Dropdown</h2>
            <p>Let&apos;s put these principles into practice by building an accessible dropdown component:</p>

            <div className="my-6 bg-muted p-4 rounded-md overflow-x-auto">
              <pre className="font-mono text-sm">
                <code>{`import React, { useState, useRef, useEffect } from 'react';

function Dropdown({ label, items }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation
  function handleKeyDown(event) {
    switch (event.key) {
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowDown':
        if (isOpen) {
          // Focus first item
          event.preventDefault();
          const firstItem = dropdownRef.current.querySelector('li button');
          firstItem?.focus();
        }
        break;
      default:
        break;
    }
  }

  return (
    <div ref={dropdownRef} onKeyDown={handleKeyDown}>
      <button
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
      </button>
      
      {isOpen && (
        <ul role="menu">
          {items.map((item, index) => (
            <li key={index} role="none">
              <button role="menuitem">{item}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`}</code>
              </pre>
            </div>

            <p>This component includes several accessibility features:</p>
            <ul>
              <li>Proper ARIA attributes to indicate the dropdown behavior</li>
              <li>Keyboard support for opening, navigating, and closing the dropdown</li>
              <li>Click-outside behavior to close the dropdown</li>
              <li>Semantic HTML with appropriate roles</li>
            </ul>

            <div className="my-8 border-l-4 border-primary pl-4 py-2">
              <p className="italic">
                &quot;Accessibility is not a feature. It&apos;s a quality requirement that applies to every feature.&quot;
              </p>
              <p className="text-sm text-muted-foreground mt-2">— Heydon Pickering, Inclusive Design Patterns</p>
            </div>

            <h2 className="font-sans mt-8 mb-4 text-2xl">Testing for Accessibility</h2>
            <p>
              Building accessible components is only half the battle—you also need to test them. Here are some tools
              that can help:
            </p>
            <ul>
              <li>
                <strong>React Testing Library</strong>: Encourages accessible testing practices
              </li>
              <li>
                <strong>axe-core</strong>: Automated accessibility testing
              </li>
              <li>
                <strong>Keyboard navigation testing</strong>: Try using your components without a mouse
              </li>
              <li>
                <strong>Screen reader testing</strong>: NVDA (Windows) or VoiceOver (Mac)
              </li>
            </ul>

            <div className="my-6">
            <Image
              src="/placeholder.svg"
              alt="Screenshot of accessibility testing tools in action"
              width={600}
              height={300}
              className="rounded-md w-full"
            />
              <p className="text-sm text-center text-muted-foreground mt-2">
                Using axe DevTools to identify accessibility issues in a React component
              </p>
            </div>

            <h2 className="font-sans mt-8 mb-4 text-2xl">Common Accessibility Mistakes</h2>
            <p>
              Even with the best intentions, it&apos;s easy to make accessibility mistakes. Here are some common pitfalls to
              avoid:
            </p>

            <table className="my-6 w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="p-2 text-left font-sans">Mistake</th>
                  <th className="p-2 text-left font-sans">Better Approach</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-sans">Using divs for buttons</td>
                  <td className="p-2 font-serif">
                    Use the <code>&lt;button&gt;</code> element
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-sans">Missing form labels</td>
                  <td className="p-2 font-serif">Always associate labels with form controls</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-sans">Poor color contrast</td>
                  <td className="p-2 font-serif">Ensure text meets WCAG contrast guidelines</td>
                </tr>
                <tr>
                  <td className="p-2 font-sans">Relying on color alone</td>
                  <td className="p-2 font-serif">Use additional indicators like icons or patterns</td>
                </tr>
              </tbody>
            </table>

            <h2 className="font-sans mt-8 mb-4 text-2xl">Conclusion</h2>
            <p>
              Building accessible React components requires attention to detail and a commitment to inclusive design
              principles. By starting with semantic HTML, managing focus, using ARIA attributes appropriately, and
              testing thoroughly, you can create components that work for everyone.
            </p>
            <p>
            Remember that accessibility is not a checkbox to tick off—it&apos;s an ongoing process of learning and
            improvement. The extra effort pays off in the form of a better experience for all users, regardless of
            their abilities or how they access your application.
            </p>
          </div>
        </div>
  )
}
