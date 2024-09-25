import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ReportCard: React.FC<ReportCardProps> = ({ title, value }) => (
  <Card className="py-5 rounded-xl text-center bg-muted/50 hover:bg-background transition-all delay-75 group/number">
    <CardHeader className="space-y-0 pb-2">
      <CardTitle className="text-3xl lg:text-6xl font-bold text-green-500">
        {value}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-sm font-medium lg:pt-4">{title}</div>
    </CardContent>
  </Card>
);

export default ReportCard;
