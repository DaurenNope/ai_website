import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ServiceCard = ({ title, description, features, demoComponent }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const radius = useMotionValue(0);
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    radius.set(Math.sqrt(rect.width ** 2 + rect.height ** 2) / 2.5);
  };

  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, 
    rgba(99, 102, 241, 0.4), transparent 80%)`;

  const { t } = useTranslation();

  return (
    <motion.div 
      className="service-card"
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.03 }}
    >
      <motion.div className="card-glow" style={{ background }} />
      
      <div className="card-content">
        <div className="bot-preview">
          {demoComponent}
        </div>
        
        <div className="service-details">
          <h3>{title}</h3>
          <p className="description">{description}</p>
          
          <div className="features">
            {features.map((feature, i) => (
              <div key={i} className="feature">
                <div className="feature-indicator"></div>
                {feature}
              </div>
            ))}
          </div>
          
          <button className="cta">
            {t('services.demoButton')}
            <div className="cta-pulse"></div>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const { t } = useTranslation();

  // Get translated content
  const translatedServices = [
    t('services.socialMedia', { returnObjects: true }),
    t('services.workflow', { returnObjects: true }),
    t('services.accounting', { returnObjects: true })
  ];

  // Static demo components
  const demoComponents = [
    (
      <div className="social-demo">
        <div className="platform-icon">📱</div>
        <div className="engagement-graph"></div>
      </div>
    ),
    (
      <div className="workflow-demo">
        <div className="node-connection"></div>
      </div>
    ),
    (
      <div className="accounting-demo">
        <div className="ledger-animation"></div>
      </div>
    )
  ];

  // Combine translated content with demo components
  const services = translatedServices.map((service, index) => ({
    ...service,
    demoComponent: demoComponents[index]
  }));

  return (
    <section className="services" id="services">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {t('services.title')}
        </motion.h2>

        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              {...service}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;