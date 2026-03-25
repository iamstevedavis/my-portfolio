import { aiWorkflowHighlights } from "@/lib/data";
import { motion } from "framer-motion";
import MotionWrapper from "./MotionWrapper";
import { GlassCard } from "./ui/glass-card";

export default function AIWorkflowSection() {
  return (
    <section id="ai-workflow" className="py-12 bg-gradient-to-b from-muted/20 to-background">
      <div className="container max-w-4xl mx-auto px-6 md:px-4">
        <MotionWrapper>
          <h2 className="text-2xl font-bold mb-3 text-center md:text-left">
            🤖 AI Workflow
          </h2>
          <p className="text-muted-foreground mb-8 text-center md:text-left">
            Practical AI usage in real engineering delivery — from coding velocity to infrastructure operations.
          </p>
        </MotionWrapper>

        <div className="grid gap-4 md:grid-cols-3">
          {aiWorkflowHighlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              viewport={{ once: true, margin: "-40px" }}
            >
              <GlassCard className="p-4 h-full" hoverEffect>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
