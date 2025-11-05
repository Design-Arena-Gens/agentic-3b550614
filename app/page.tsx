'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import styles from './page.module.css'

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0])
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.8])
  const glassBlur = useTransform(smoothProgress, [0, 0.5, 1], [20, 40, 60])

  return (
    <div ref={containerRef} className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.navContent}>
          <div className={styles.logo}>Apple</div>
          <div className={styles.navLinks}>
            <a href="#hero">Home</a>
            <a href="#product">Product</a>
            <a href="#features">Features</a>
            <a href="#experience">Experience</a>
          </div>
        </div>
      </nav>

      <section id="hero" className={styles.hero}>
        <motion.div
          className={styles.heroContent}
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            iPhone 16 Pro
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className={styles.heroSubtitle}
          >
            Titanium. So strong. So light. So Pro.
          </motion.p>
          <motion.button
            className={styles.ctaButton}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn more
          </motion.button>
        </motion.div>
        <div className={styles.heroGradient}></div>
      </section>

      <section id="product" className={styles.productSection}>
        <ScrollSection
          title="Design Excellence"
          description="Crafted from aerospace-grade titanium. The lightest Pro models ever."
          delay={0}
        />
      </section>

      <section className={styles.glassSection}>
        <motion.div
          className={styles.glassCard}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <div className={styles.glassContent}>
            <h2>Liquid Retina Display</h2>
            <p>ProMotion technology with adaptive refresh rates up to 120Hz.</p>
          </div>
        </motion.div>
        <motion.div
          className={styles.glassCard}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <div className={styles.glassContent}>
            <h2>A18 Pro Chip</h2>
            <p>Unprecedented performance. Unbelievable efficiency.</p>
          </div>
        </motion.div>
      </section>

      <section id="features" className={styles.featuresSection}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <h2 className={styles.sectionTitle}>Camera System</h2>
          <div className={styles.featureGrid}>
            <FeatureCard
              title="48MP Main"
              description="Next-generation portraits with Focus and Depth Control"
              icon="📷"
            />
            <FeatureCard
              title="5x Telephoto"
              description="Get closer with our longest optical zoom ever"
              icon="🔭"
            />
            <FeatureCard
              title="Ultra Wide"
              description="Macro photography and expansive landscapes"
              icon="🌄"
            />
          </div>
        </motion.div>
      </section>

      <section id="experience" className={styles.experienceSection}>
        <ParallaxText>
          Innovation • Performance • Design • Excellence •
        </ParallaxText>
      </section>

      <section className={styles.finalSection}>
        <motion.div
          className={styles.finalContent}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <h2>The future is here.</h2>
          <p>Pre-order starting at $999</p>
          <motion.button
            className={styles.finalButton}
            whileHover={{ scale: 1.05, backgroundColor: '#fff', color: '#000' }}
            whileTap={{ scale: 0.95 }}
          >
            Buy now
          </motion.button>
        </motion.div>
      </section>

      <footer className={styles.footer}>
        <p>© 2024 Apple Inc. All rights reserved.</p>
      </footer>
    </div>
  )
}

function ScrollSection({ title, description, delay }: { title: string, description: string, delay: number }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8])

  return (
    <motion.div
      ref={ref}
      className={styles.scrollSection}
      style={{ y, opacity, scale }}
    >
      <h2>{title}</h2>
      <p>{description}</p>
    </motion.div>
  )
}

function FeatureCard({ title, description, icon }: { title: string, description: string, icon: string }) {
  return (
    <motion.div
      className={styles.featureCard}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.3 }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
    >
      <div className={styles.featureIcon}>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </motion.div>
  )
}

function ParallaxText({ children }: { children: string }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const x = useTransform(scrollYProgress, [0, 1], [-200, 200])

  return (
    <div ref={ref} className={styles.parallaxContainer}>
      <motion.div className={styles.parallaxText} style={{ x }}>
        {children.repeat(10)}
      </motion.div>
    </div>
  )
}
