import { Restraunt } from "../../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";

type Props = {
  restraunt: Restraunt;
};

const RestrauntInfo = ({ restraunt }: Props) => {
  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {restraunt.restrauntName}
        </CardTitle>
        <CardDescription>
          {restraunt.city}, {restraunt.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        {restraunt.cuisines.map((item, index) => (
          <span className="flex">
            <span>{item}</span>
            {index < restraunt.cuisines.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
};

export default RestrauntInfo;