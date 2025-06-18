'use client'

import { ArrowLeft, Calendar, User, Twitter, Facebook, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

export default function ArticleDetailPage() {
  return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/log">
            <Button variant="ghost" size="sm" className="group font-sans">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to The Log
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="font-sans">
              React
            </Badge>
            <Badge variant="secondary" className="font-sans">
              Accessibility
            </Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4 font-sans">Building Accessible React Components</h1>

          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="font-sans">Dec 15, 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="font-sans">By Michael Johnson</span>
            </div>
          </div>

          <div className="border-t border-b py-4 flex justify-between items-center">
            <div className="text-sm font-sans">8 min read</div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Share on Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Share on Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">Share on LinkedIn</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Article Content */}
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

        {/* Author Bio */}
        <div className="bg-muted/30 p-6 rounded-lg mb-12">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xl font-medium">
              MJ
            </div>
            <div>
              <h3 className="font-medium text-lg mb-2 font-sans">Michael Johnson</h3>
              <p className="text-sm text-muted-foreground mb-3 font-serif">
                Frontend developer specializing in React and accessibility. Passionate about creating inclusive web
                experiences and teaching others to do the same.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="h-8 text-xs font-sans">
                  <Twitter className="h-3 w-3 mr-1" />
                  Follow
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-xs font-sans">
                  View all articles
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 font-sans">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <Badge variant="secondary" className="mb-2 font-sans">
                React
              </Badge>
              <h3 className="font-medium mb-1 font-sans">Optimizing React Performance</h3>
              <p className="text-sm text-muted-foreground mb-2 font-serif">
                Deep dive into React performance optimization techniques including memoization, code splitting, and
                bundle analysis.
              </p>
              <div className="text-xs text-muted-foreground font-sans">Dec 8, 2024 • 12 min read</div>
            </div>
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <Badge variant="secondary" className="mb-2 font-sans">
                CSS
              </Badge>
              <h3 className="font-medium mb-1 font-sans">CSS Custom Properties in Practice</h3>
              <p className="text-sm text-muted-foreground mb-2 font-serif">
                Master CSS custom properties (variables) to create maintainable stylesheets and dynamic theming systems.
              </p>
              <div className="text-xs text-muted-foreground font-sans">Dec 5, 2024 • 7 min read</div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold mb-6 font-sans">Comments</h2>

          <div className="space-y-6">
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                  TS
                </div>
                <div>
                  <div className="font-medium font-sans">Taylor Smith</div>
                  <div className="text-xs text-muted-foreground font-sans">3 days ago</div>
                </div>
              </div>
              <p className="text-sm font-serif">
                Great article! I&apos;ve been struggling with making my dropdowns accessible. The example code is really
                helpful. Do you have any recommendations for handling focus when a modal opens?
              </p>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                  RJ
                </div>
                <div>
                  <div className="font-medium font-sans">Robin Jones</div>
                  <div className="text-xs text-muted-foreground font-sans">5 days ago</div>
                </div>
              </div>
              <p className="text-sm font-serif">
                I appreciate the emphasis on semantic HTML. Too often we reach for divs and spans when there are better
                elements available. Would love to see a follow-up article on accessible forms!
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4 font-sans">Add a comment</h3>
              <textarea
                className="w-full p-3 border rounded-md h-32 mb-4 font-serif"
                placeholder="Share your thoughts..."
              ></textarea>
              <Button className="font-sans">Post Comment</Button>
            </div>
          </div>
        </div>
      </div>
  )
}
