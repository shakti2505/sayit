import React from "react";
import { Card } from "../ui/card";

interface CardProps {
  // define your props here
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<CardProps> = ({
  icon,
  title,
  description,
}: CardProps) => {
  return (
    <Card className="p-6 bg-card">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  );
};

export default FeatureCard;
