import React from 'react'
import styles from './SubscriptionPage.module.css'

interface SubscriptionPageProps {
  productId: string
  basePrice: number // price per month in decimal (e.g., 9.99)
  onSelect?: (productId: string, months: number) => void
}

type Plan = {
  months: number
  discount: number // 0-1
}

const PLANS: Plan[] = [
  { months: 1, discount: 0 },
  { months: 3, discount: 0.05 },
  { months: 6, discount: 0.1 },
  { months: 12, discount: 0.2 }
]

export default function SubscriptionPage({ productId, basePrice, onSelect }: SubscriptionPageProps) {
  const currency = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 })
  const safeBasePrice = Number(basePrice) || 0

  function handleSubscription(productId: string, months: number) {
    // Placeholder for subscription action. Integrate with backend or client routing where needed.
    console.log('handleSubscription called', { productId, months })
    if (onSelect) onSelect(productId, months)
  }

  return (
    <div className={styles.container} role="region" aria-label="Subscription plans">
      <div className={styles.bgLayer} aria-hidden="true" />
      <header className={styles.header}>
        <h1 className={styles.title}>Choose a subscription</h1>
        <p className={styles.subtitle}>Select the plan that fits you best — savings increase with longer subscriptions.</p>
      </header>

      <section className={styles.grid}>
        {PLANS.map((plan) => {
          const { months, discount } = plan
          const gross = safeBasePrice * months
          const total = +(gross * (1 - discount)).toFixed(2)
          const savings = +(gross - total).toFixed(2)
          const monthlyEffective = +(total / months).toFixed(2)
          const isBest = months === 12

          return (
            <article key={months} className={`${styles.card} ${isBest ? styles.best : ''}`} aria-labelledby={`plan-${months}`}>
              {isBest && <div className={styles.badge}>Best Value</div>}
              <h2 id={`plan-${months}`} className={styles.planTitle} title={`${months}-Month plan — ${currency.format(monthlyEffective)}/month`}>{months}-Month{months > 1 ? 's' : ''}</h2>
              <div className={styles.priceBlock}>
                <div className={styles.total}>{currency.format(total)}</div>
                <div className={styles.perMonth}><span className={styles.perLabel}>/month</span> {currency.format(monthlyEffective)}</div>
              </div>

              <ul className={styles.features}>
                <li>{months} monthly deliveries</li>
                <li>{Math.round(discount * 100)}% discount</li>
                <li className={styles.savings}>You save {currency.format(savings)}</li>
              </ul>

              <div className={styles.actions}>
                <button
                  className={styles.selectButton}
                  onClick={() => handleSubscription(productId, months)}
                  aria-label={`Select ${months} month plan`}
                >
                  Select Plan
                </button>
              </div>
            </article>
          )
        })}
      </section>

      <footer className={styles.footer}>
        <small>Prices shown in USD. Taxes and shipping calculated at checkout.</small>
      </footer>
    </div>
  )
}
