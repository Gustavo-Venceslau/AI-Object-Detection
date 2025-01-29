import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

export const example = [
	{
	  "box": {"height": 503, "left": 50, "top": 400, "width": 195},
	  "class_name": "person",
	  "confidence": 0.9132577180862427
	},
	{
	  "box": {"height": 489, "left": 668, "top": 391, "width": 140},
	  "class_name": "person",
	  "confidence": 0.9127665758132935
	},
	{
	  "box": {"height": 515,  "left": 3, "top": 228,  "width": 805},
	  "class_name": "bus",
	  "confidence": 0.9017127752304077
	},
	{
	  "box": {"height": 452, "left": 223,  "top": 407, "width": 121},
	  "class_name": "person",
	  "confidence": 0.8749434351921082
	}
]

export function ResultsTable() {
	return (
		<Table className="my-10">
				<TableHeader className="">
					<TableRow className="bg-[#2A2A2A]">
						<TableHead className="text-white text-center">Number</TableHead>
						<TableHead className="text-white text-center">Box</TableHead>
						<TableHead className="text-white text-center">ClassName</TableHead>
						<TableHead className="text-center text-white">Confidence</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{example.map((row, index) => (
						<TableRow key={index}>
							<TableCell className="font-medium text-white text-center">{index + 1}</TableCell>
							<TableCell className="font-medium text-white text-center">{`${JSON.stringify(row.box)}`}</TableCell>
							<TableCell className="text-white text-center">{row.class_name}</TableCell>
							<TableCell className="text-center text-white">{row.confidence}</TableCell>
						</TableRow>
					))}
				</TableBody>
		</Table>
	);
}