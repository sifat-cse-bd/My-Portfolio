import { motion } from 'framer-motion'

export default function SectionHeading({ kicker, title, text }) {
  return <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .55 }} className="mb-12 grid gap-3 md:mb-16 md:grid-cols-[.8fr_1.35fr_1fr] md:gap-8"><p className="font-mono text-[10px] uppercase tracking-[.09em] text-[var(--accent)]">{kicker}</p><h2 className="m-0 text-4xl font-extrabold leading-tight tracking-[-.065em] text-[var(--text)] sm:text-5xl">{title}</h2><p className="max-w-sm text-sm leading-7 text-[var(--muted)]">{text}</p></motion.div>
}
