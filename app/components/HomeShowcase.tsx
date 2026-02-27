'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  Alert,
  Button,
  Checkbox,
  CookieSettingsLink,
  Input,
  Label,
  Modal,
  Radio,
  Select,
  Spinner,
  Textarea,
} from '@drkaachen/design-system-ui'

const serviceHighlights = [
  {
    title: 'Blutspende',
    text: 'Aktuelle Termine, Voraussetzungen und Ablauf fuer Spenderinnen und Spender.',
  },
  {
    title: 'Erste Hilfe',
    text: 'Kursangebote fuer Privatpersonen, Unternehmen und Bildungseinrichtungen.',
  },
  {
    title: 'Ehrenamt',
    text: 'Schneller Einstieg in lokale Bereitschaften und soziale Projekte.',
  },
]

const topicOptions = [
  { value: 'blutspende', label: 'Blutspende' },
  { value: 'erste-hilfe', label: 'Erste Hilfe Kurs' },
  { value: 'ehrenamt', label: 'Ehrenamt' },
  { value: 'spende', label: 'Spenden und Foerderung' },
]

const contactModeOptions = [
  { value: 'email', label: 'E-Mail' },
  { value: 'phone', label: 'Telefon' },
]

/**
 * Interactive homepage showcase using all reusable UI primitives from the design system.
 */
export default function HomeShowcase() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [topic, setTopic] = useState('')
  const [message, setMessage] = useState('')
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [contactMode, setContactMode] = useState('email')

  const canSubmit = useMemo(() => {
    return name.trim().length > 1 && email.includes('@') && topic.length > 0 && privacyAccepted
  }, [email, name, privacyAccepted, topic])

  /**
   * Simulates a contact request and demonstrates loading and feedback components.
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canSubmit) {
      setShowWarning(true)
      setShowSuccess(false)
      return
    }

    setShowWarning(false)
    setShowSuccess(false)
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 900))

    setIsSubmitting(false)
    setShowSuccess(true)
  }

  return (
    <div className="page">
      <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
        <section style={{ marginBottom: '2rem' }}>
          <Alert variant="info" title="Template-Vorschau">
            Diese Startseite demonstriert die wichtigsten UI-Bausteine aus
            <code> @drkaachen/design-system-ui </code>
            in einem realistischen DRK-Seitenaufbau.
          </Alert>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h1 className="page__title">DRK Kreisverband Aachen e. V.</h1>
          <p>
            Menschen helfen, Gesellschaft staerken: Diese Beispielseite zeigt, wie eine moderne
            DRK-Website mit klaren Inhalten, zugaenglicher Navigation und DSGVO-konformen Defaults
            aussehen kann.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <Button asChild>
              <Link href="#angebote">Unsere Angebote</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="#kontakt">Kontakt aufnehmen</Link>
            </Button>
            <Button variant="outline" onClick={() => setIsModalOpen(true)}>
              Einsatzbericht ansehen
            </Button>
          </div>
        </section>

        <section id="angebote" style={{ marginBottom: '2.5rem' }}>
          <h2>Unsere Angebote im Ueberblick</h2>
          <div
            style={{
              display: 'grid',
              gap: '1rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              marginTop: '1rem',
            }}
          >
            {serviceHighlights.map((item) => (
              <article
                key={item.title}
                style={{ border: '1px solid #ddd', borderRadius: 8, padding: '1rem' }}
              >
                <h3 style={{ marginTop: 0 }}>{item.title}</h3>
                <p>{item.text}</p>
                <Button size="sm" variant="outline" asChild>
                  <a href="#kontakt">Mehr erfahren</a>
                </Button>
              </article>
            ))}
          </div>
        </section>

        <section id="kontakt" style={{ marginBottom: '2rem' }}>
          <h2>Kontakt und Beratung</h2>
          <p>
            Nutzen Sie das Formular als Ausgangspunkt fuer Anfrage-, Termin- oder
            Beratungsprozesse.
          </p>

          {showWarning && (
            <div style={{ marginTop: '1rem' }}>
              <Alert variant="warning" title="Bitte Eingaben pruefen">
                Mindestens Name, gueltige E-Mail, Thema und Datenschutz-Einwilligung sind
                erforderlich.
              </Alert>
            </div>
          )}

          {showSuccess && (
            <div style={{ marginTop: '1rem' }}>
              <Alert variant="success" title="Anfrage erfasst">
                Vielen Dank! Die Beispiel-Anfrage wurde erfolgreich verarbeitet.
              </Alert>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
            <div style={{ display: 'grid', gap: '0.75rem', maxWidth: 720 }}>
              <div>
                <Label htmlFor="contact-name" required hint="Bitte vollstaendigen Namen angeben.">
                  Name
                </Label>
                <Input
                  id="contact-name"
                  fullWidth
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Max Mustermann"
                  error={showWarning && name.trim().length <= 1}
                />
              </div>

              <div>
                <Label htmlFor="contact-email" required hint="Antwort erfolgt an diese Adresse.">
                  E-Mail
                </Label>
                <Input
                  id="contact-email"
                  type="email"
                  fullWidth
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="name@beispiel.de"
                  error={showWarning && !email.includes('@')}
                />
              </div>

              <div>
                <Label htmlFor="contact-topic" required>
                  Thema
                </Label>
                <Select
                  id="contact-topic"
                  fullWidth
                  value={topic}
                  onChange={(event) => setTopic(event.target.value)}
                  options={topicOptions}
                  placeholder="Bitte waehlen"
                  error={showWarning && topic.length === 0}
                />
              </div>

              <div>
                <Label required>Bevorzugter Kontaktweg</Label>
                <Radio
                  name="contact-mode"
                  value={contactMode}
                  onChange={(event) => setContactMode(event.target.value)}
                  options={contactModeOptions}
                />
              </div>

              <div>
                <Label htmlFor="contact-message" hint="Optional: kurze Beschreibung Ihres Anliegens.">
                  Nachricht
                </Label>
                <Textarea
                  id="contact-message"
                  fullWidth
                  rows={5}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Wie koennen wir helfen?"
                />
              </div>

              <Checkbox
                id="privacy-consent"
                checked={privacyAccepted}
                onChange={(event) => setPrivacyAccepted(event.target.checked)}
                label="Ich habe die Datenschutzerklaerung gelesen und stimme der Verarbeitung meiner Angaben zu."
                hint="Sie koennen Ihre Cookie-Praeferenzen jederzeit anpassen."
                error={showWarning && !privacyAccepted}
              />

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Spinner size="sm" aria-label="Anfrage wird gesendet" />
                      <span style={{ marginLeft: '0.5rem' }}>Wird gesendet...</span>
                    </>
                  ) : (
                    'Anfrage senden'
                  )}
                </Button>

                <Button variant="outline" type="button" onClick={() => setIsModalOpen(true)}>
                  Hilfe zum Formular
                </Button>

                <CookieSettingsLink />
              </div>
            </div>
          </form>
        </section>

        <section style={{ marginBottom: '1rem' }}>
          <Alert variant="error" title="Notfallhinweis">
            Bei akuten medizinischen Notfaellen bitte direkt den Rettungsdienst unter 112
            kontaktieren.
          </Alert>
        </section>

        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} title="Beispiel: Einsatzbericht">
          <p>
            Dieses Modal zeigt, wie sich Detailinhalte oder Einsatzmeldungen praesentieren lassen.
            Die Komponente unterstuetzt Fokus-Management und Tastaturbedienung fuer barrierefreie
            Nutzung.
          </p>
          <p style={{ marginTop: '1rem' }}>
            Gesendeter Kontaktweg im Formular: <strong>{contactMode === 'phone' ? 'Telefon' : 'E-Mail'}</strong>
          </p>
          <div style={{ marginTop: '1rem' }}>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Schliessen
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  )
}
