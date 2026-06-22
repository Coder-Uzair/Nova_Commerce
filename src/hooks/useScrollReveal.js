// Shared Framer Motion variants for scroll-reveal animations.
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const stagger = (delay = 0.08) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay } },
});

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export const viewportOnce = { once: true, amount: 0.2 };
