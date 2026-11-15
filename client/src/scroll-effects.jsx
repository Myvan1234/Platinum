import React from 'react';
import { useEffect, useRef, useState } from 'react';

const selector = '[data-scroll-reveal], .catalog .card, .quick-nav > a';

export function useScrollReveal(pathname) {
  const root = useRef(null);
  useEffect(() => {
    const element = root.current;
    if (!element || !('IntersectionObserver' in window)) return;
    const seen = new WeakSet();
    const intersection = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('scroll-revealed');
        intersection.unobserve(entry.target);
      }
    }, { threshold: 0.12 });

    function observe(node) {
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      const targets = [...node.querySelectorAll(selector)];
      if (node.matches(selector)) targets.unshift(node);
      for (const target of targets) {
        if (seen.has(target)) continue;
        seen.add(target);
        intersection.observe(target);
      }
    }
    observe(element);
    const mutations = new MutationObserver(records => {
      for (const record of records) {
        for (const node of record.addedNodes) observe(node);
        for (const node of record.removedNodes) {
          if (node.nodeType !== Node.ELEMENT_NODE) continue;
          intersection.unobserve(node);
          node.querySelectorAll(selector).forEach(target => intersection.unobserve(target));
        }
      }
    });
    mutations.observe(element, { childList: true, subtree: true });
    return () => { mutations.disconnect(); intersection.disconnect(); };
  }, [pathname]);
  return root;
}

export function CatalogCount({ count, label }) {
  const ref = useRef(null);
  const [value, setValue] = useState(count);
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!('IntersectionObserver' in window) || motion.matches) return;
    let frame;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (motion.matches) return;
      const start = performance.now();
      const tick = time => {
        const progress = Math.min((time - start) / 450, 1);
        setValue(Math.round(count * (1 - (1 - progress) ** 2)));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      setValue(0);
      frame = requestAnimationFrame(tick);
    });
    const stopMotion = () => {
      if (!motion.matches) return;
      cancelAnimationFrame(frame);
      setValue(count);
    };
    motion.addEventListener('change', stopMotion);
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      motion.removeEventListener('change', stopMotion);
    };
  }, [count]);

  return <span className="catalog-count" ref={ref} aria-label={count + ' ' + label}>
    <span aria-hidden="true"><strong>{value}</strong> {label}</span>
  </span>;
}
