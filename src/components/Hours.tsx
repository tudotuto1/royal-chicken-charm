import { motion } from "framer-motion";
import { Clock, MapPin, Phone } from "lucide-react";

const schedule = [
  { day: "Monday", hours: "11:00 AM – 9:00 PM" },
  { day: "Tuesday", hours: "11:00 AM – 9:00 PM" },
  { day: "Wednesday", hours: "11:00 AM – 9:00 PM" },
  { day: "Thursday", hours: "11:00 AM – 9:00 PM" },
  { day: "Friday", hours: "11:00 AM – 11:00 PM" },
  { day: "Saturday", hours: "4:00 PM – 10:00 PM" },
  { day: "Sunday", hours: "3:00 PM – 9:00 PM" },
];

const Hours = () => {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <section id="hours" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-body text-sm uppercase tracking-[0.2em] font-semibold">
              Visit Us
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-10">
              Opening Hours
            </h2>

            <div className="space-y-0">
              {schedule.map((item) => (
                <div
                  key={item.day}
                  className={`flex justify-between items-center py-4 border-b border-border/50 ${
                    item.day === today ? "text-primary font-semibold" : "text-foreground"
                  }`}
                >
                  <span className="font-body flex items-center gap-2">
                    {item.day === today && <Clock className="w-4 h-4" />}
                    {item.day}
                  </span>
                  <span className="font-body text-sm">{item.hours}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact & Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <span className="text-primary font-body text-sm uppercase tracking-[0.2em] font-semibold">
                Find Us
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-10">
                Location
              </h2>
            </div>

            <div className="space-y-6">
              <a
                href="https://maps.google.com/?q=197+Bank+St+Ottawa+ON+K2P+0A6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 group"
              >
                <div className="p-3 bg-muted rounded-xl group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-body font-medium text-foreground">197 Bank St</p>
                  <p className="font-body text-sm text-muted-foreground">Ottawa, ON K2P 0A6</p>
                </div>
              </a>

              <a href="tel:6132313010" className="flex items-start gap-4 group">
                <div className="p-3 bg-muted rounded-xl group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-body font-medium text-foreground">(613) 231-3010</p>
                  <p className="font-body text-sm text-muted-foreground">Call to order</p>
                </div>
              </a>
            </div>

            {/* Embedded Map */}
            <div className="rounded-2xl overflow-hidden shadow-warm border border-border">
              <iframe
                title="Royal Chicken BBQ Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2800.5!2d-75.6935!3d45.4168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s197+Bank+St%2C+Ottawa%2C+ON+K2P+0A6!5e0!3m2!1sen!2sca!4v1"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Services */}
            <div className="flex gap-3">
              <span className="bg-muted text-foreground font-body text-sm px-4 py-2 rounded-full">
                🥡 Takeout
              </span>
              <span className="bg-muted text-foreground font-body text-sm px-4 py-2 rounded-full">
                🛵 Delivery
              </span>
              <span className="bg-muted text-foreground font-body text-sm px-4 py-2 rounded-full">
                🍽️ Dine-in
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hours;
