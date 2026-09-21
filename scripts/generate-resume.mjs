import fs from 'node:fs'
import path from 'node:path'
import PDFDocument from 'pdfkit'
import { profile, projects, skills } from '../src/data/portfolio.js'

const outputPath = path.resolve('public/resume.pdf')
const doc = new PDFDocument({ size: 'A4', margin: 52, info: { Title: `${profile.name} — Resume`, Author: profile.name } })
fs.mkdirSync(path.dirname(outputPath), { recursive: true })
doc.pipe(fs.createWriteStream(outputPath))

doc.fillColor('#111827').fontSize(26).font('Helvetica-Bold').text(profile.name)
doc.fillColor('#4f46e5').fontSize(11).font('Helvetica').text(profile.role)
doc.moveDown(.4).fillColor('#475569').fontSize(9).text(`${profile.email}  ·  ${profile.location}`)
doc.moveDown(1.2)
section('PROFILE', profile.about)
section('EDUCATION', 'B.Sc. in Computer Science & Engineering\nYour University Name · 2022 — Present')
section('TECHNICAL SKILLS', Object.entries(skills).map(([group, values]) => `${group}: ${values.join(', ')}`).join('\n'))
section('SELECTED PROJECTS', projects.map((project) => `${project.title} — ${project.description}\n${project.tags.join('  ')}\nFeatures: ${project.features.join(', ')}`).join('\n\n'))
section('AVAILABILITY', profile.availability)
doc.end()

function section(title, content) {
  doc.moveDown(.8).fillColor('#4f46e5').fontSize(9).font('Helvetica-Bold').text(title)
  doc.moveDown(.25).fillColor('#334155').fontSize(10).font('Helvetica').text(content, { lineGap: 3 })
}
