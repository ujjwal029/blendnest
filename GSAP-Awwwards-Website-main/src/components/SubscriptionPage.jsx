import React, { useState } from 'react'
import styles from '../SubscriptionPage.module.css'

const PLANS = [
  { months: 1, discount: 0 },
  { months: 3, discount: 0.05 },
  { months: 6, discount: 0.1 },
  { months: 12, discount: 0.2 }
]

export default function SubscriptionPage({ productId, basePrice, onSelect }) {
  const [hoveredPlan, setHoveredPlan] = useState(null)
  const currency = new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD', 
    maximumFractionDigits: 2 
  })
  const safeBasePrice = Number(basePrice) || 0

  function handleSubscription(id, months) {
    console.log('handleSubscription called', { id, months })
    if (typeof onSelect === 'function') onSelect(id, months)
  }

  return (
    <div className={styles.container} role="region" aria-label="Subscription plans">
      <div className={styles.bgLayer} />
      <div className={styles.gradientOverlay} />
      
      <header className={styles.header}>
        <div className={styles.headerGlow}>
          <h1 className={styles.title}>Choose Your Plan</h1>
          <div className={styles.titleShimmer} />
        </div>
        <p className={styles.subtitle}>
          Unlock bigger savings with longer commitments. 
          <span className={styles.highlight}>Your journey starts here.</span>
        </p>
      </header>

      <section className={styles.grid} role="list" aria-label="Available subscription plans">
        {PLANS.map((plan, index) => {
          const { months, discount } = plan
          const gross = safeBasePrice * months
          const total = +(gross * (1 - discount)).toFixed(2)
          const savings = +(gross - total).toFixed(2)
          const monthlyEffective = +(total / months).toFixed(2)
          const isBest = months === 12
          const isHovered = hoveredPlan === months

          return (
            <article 
              key={months} 
              className={`${styles.card} ${isBest ? styles.best : ''} ${isHovered ? styles.hovered : ''}`}
              role="listitem"
              aria-labelledby={`plan-${months}`}
              onMouseEnter={() => setHoveredPlan(months)}
              onMouseLeave={() => setHoveredPlan(null)}
              tabIndex={0}
            >
              {isBest && (
                <div className={styles.badge} role="img" aria-label="Best value plan">
                  <span>★</span> Best Value
                </div>
              )}
              
              <div className={styles.cardGlow} />
              
              <h2 
                id={`plan-${months}`} 
                className={styles.planTitle}
                title={`${months}-Month plan — ${currency.format(monthlyEffective)}/month`}
              >
                {months === 1 ? 'Monthly' : `${months} Months`}
              </h2>
              
              <div className={styles.priceBlock}>
                <div className={styles.originalPrice}>
                  <span className={styles.strike}>{currency.format(gross)}</span>
                  {discount > 0 && (
                    <span className={styles.discountBadge}>
                      -{Math.round(discount * 100)}%
                    </span>
                  )}
                </div>
                <div className={styles.total} aria-label={`Total price: ${currency.format(total)}`}>
                  {currency.format(total)}
                </div>
                <div className={styles.perMonth}>
                  <span className={styles.perLabel}>effective</span>
                  {currency.format(monthlyEffective)}/mo
                </div>
              </div>

              <ul className={styles.features} role="list">
                <li>
                  <span className={styles.icon}>📦</span>
                  {months} deliveries
                </li>
                <li>
                  <span className={styles.icon}>⚡</span>
                  Instant access
                </li>
                <li className={styles.savings}>
                  <span className={styles.icon}>💰</span>
                  Save {currency.format(savings)} ({Math.round(discount * 100)}% off)
                </li>
              </ul>

              <div className={styles.actions}>
                <button
                  className={`${styles.selectButton} ${isHovered ? styles.animate : ''}`}
                  onClick={() => handleSubscription(productId, months)}
                  aria-label={`Select ${months} month plan for ${currency.format(total)}`}
                >
                  <span className={styles.buttonInner}>
                    {isHovered ? 'Choose Now' : 'Select Plan'}
                  </span>
                  <div className={styles.buttonShine} />
                </button>
              </div>

              <div className={styles.progressRing} 
                   style={{ '--progress': `${discount * 100}%` }}
                   aria-hidden="true" />
            </article>
          )
        })}
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <small>Prices in USD • Taxes & shipping at checkout • Cancel anytime</small>
          <div className={styles.securityBadges}>
            🔒 Secure • ⚡ Instant • 📱 Mobile
          </div>
        </div>
      </footer>
    </div>
  )
}
