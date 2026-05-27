import { usePageTitle } from "../../hooks";
import { PageHeader, Card, Button } from "../../components/ui";

export default function ExamResultsPage() {
  usePageTitle("Exam Results");
  return (
    <div>
      <PageHeader title="Exam Results" subtitle="Exam Master">
        <Button size="sm">+ Add New</Button>
      </PageHeader>
      <Card>
        <div className="p-10 text-center text-slate-400 text-sm">
          <div className="text-4xl mb-3">🚧</div>
          <p className="font-medium text-slate-600">Exam Results</p>
          <p className="text-xs mt-1">This section is under construction.</p>
        </div>
      </Card>
    </div>
  );
}
